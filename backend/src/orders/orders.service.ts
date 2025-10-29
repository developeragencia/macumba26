import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { EmailService } from '../email/email.service';

@Injectable()
export class OrdersService {
  constructor(
    private prisma: PrismaService,
    private emailService: EmailService,
  ) {}

  async create(userId: string, createOrderDto: CreateOrderDto) {
    const { items, shippingAddress, paymentMethod, ...orderData } = createOrderDto;

    // Generate order number
    const orderNumber = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

    // Group items by vendor
    const itemsByVendor = items.reduce(
      (acc, item) => {
        const { vendorId } = item;
        if (!acc[vendorId]) acc[vendorId] = [];
        acc[vendorId].push(item);
        return acc;
      },
      {} as Record<string, any[]>,
    );

    // Create separate orders for each vendor
    const orders = await Promise.all(
      Object.entries(itemsByVendor).map(async ([vendorId, vendorItems]) => {
        const subtotal = vendorItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
        const total = subtotal + orderData.shippingCost - orderData.discount + orderData.tax;

        const order = await this.prisma.order.create({
          data: {
            userId,
            vendorId,
            orderNumber: `${orderNumber}-${vendorId.substr(0, 4)}`,
            paymentMethod: paymentMethod as any,
            shippingAddress,
            subtotal,
            total,
            ...orderData,
            items: {
              create: vendorItems.map((item) => ({
                productId: item.productId,
                quantity: item.quantity,
                price: item.price,
                total: item.price * item.quantity,
              })),
            },
          },
          include: {
            items: {
              include: {
                product: true,
              },
            },
            vendor: true,
            user: true,
          },
        });

        // Update product stock
        await Promise.all(
          vendorItems.map((item) =>
            this.prisma.product.update({
              where: { id: item.productId },
              data: {
                stock: {
                  decrement: item.quantity,
                },
              },
            }),
          ),
        );

        return order;
      }),
    );

    // Send confirmation email
    if (orders.length > 0) {
      // Email will be sent after user data is loaded
      // await this.emailService.sendOrderConfirmation(orders[0].user.email, {
      //   orderNumber: orders[0].orderNumber,
      //   customerName: orders[0].user.name,
        total: orders.reduce((sum, order) => sum + order.total, 0),
      });
    }

    return orders;
  }

  async findUserOrders(userId: string, page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;

    const [orders, total] = await Promise.all([
      this.prisma.order.findMany({
        where: { userId },
        skip,
        take: limit,
        include: {
          items: {
            include: {
              product: {
                select: {
                  id: true,
                  name: true,
                  images: true,
                  slug: true,
                },
              },
            },
          },
          vendor: {
            select: {
              id: true,
              storeName: true,
              storeSlug: true,
            },
          },
        },
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.order.count({ where: { userId } }),
    ]);

    return {
      data: orders,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: string, userId: string) {
    const order = await this.prisma.order.findFirst({
      where: { id, userId },
      include: {
        items: {
          include: {
            product: true,
          },
        },
        vendor: true,
      },
    });

    if (!order) {
      throw new NotFoundException('Order not found');
    }

    return order;
  }

  async updateStatus(id: string, status: string) {
    return this.prisma.order.update({
      where: { id },
      data: { status: status as any },
    });
  }

  async updatePaymentStatus(id: string, paymentStatus: string, paymentId?: string) {
    return this.prisma.order.update({
      where: { id },
      data: {
        paymentStatus: paymentStatus as any,
        paymentId,
      },
    });
  }
}

