import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateVendorDto } from './dto/create-vendor.dto';
import { UpdateVendorDto } from './dto/update-vendor.dto';

@Injectable()
export class VendorsService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, createVendorDto: CreateVendorDto) {
    // Check if user already has a vendor account
    const existingVendor = await this.prisma.vendor.findUnique({
      where: { userId },
    });

    if (existingVendor) {
      throw new ConflictException('User already has a vendor account');
    }

    // Check if store slug is available
    const slugExists = await this.prisma.vendor.findUnique({
      where: { storeSlug: createVendorDto.storeSlug },
    });

    if (slugExists) {
      throw new ConflictException('Store slug already taken');
    }

    // Create vendor
    const vendor = await this.prisma.vendor.create({
      data: {
        userId,
        ...createVendorDto,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            avatar: true,
          },
        },
      },
    });

    // Create free subscription
    await this.prisma.subscription.create({
      data: {
        vendorId: vendor.id,
        plan: 'FREE',
        productLimit: 5,
      },
    });

    return vendor;
  }

  async findAll(page: number = 1, limit: number = 20, isApproved?: boolean) {
    const skip = (page - 1) * limit;

    const where = isApproved !== undefined ? { isApproved, isActive: true } : { isActive: true };

    const [vendors, total] = await Promise.all([
      this.prisma.vendor.findMany({
        where,
        skip,
        take: limit,
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              avatar: true,
            },
          },
          subscription: true,
        },
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.vendor.count({ where }),
    ]);

    return {
      data: vendors,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: string) {
    const vendor = await this.prisma.vendor.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
            avatar: true,
          },
        },
        subscription: true,
        products: {
          where: { isActive: true, isApproved: true },
          take: 10,
          orderBy: { createdAt: 'desc' },
        },
      },
    });

    if (!vendor) {
      throw new NotFoundException('Vendor not found');
    }

    return vendor;
  }

  async findBySlug(slug: string) {
    const vendor = await this.prisma.vendor.findUnique({
      where: { storeSlug: slug },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            avatar: true,
          },
        },
        subscription: true,
      },
    });

    if (!vendor) {
      throw new NotFoundException('Vendor not found');
    }

    return vendor;
  }

  async findByUserId(userId: string) {
    return this.prisma.vendor.findUnique({
      where: { userId },
      include: {
        subscription: true,
      },
    });
  }

  async update(id: string, userId: string, updateVendorDto: UpdateVendorDto) {
    const vendor = await this.prisma.vendor.findFirst({
      where: { id, userId },
    });

    if (!vendor) {
      throw new NotFoundException('Vendor not found or unauthorized');
    }

    // Check if new slug is available
    if (updateVendorDto.storeSlug && updateVendorDto.storeSlug !== vendor.storeSlug) {
      const slugExists = await this.prisma.vendor.findUnique({
        where: { storeSlug: updateVendorDto.storeSlug },
      });

      if (slugExists) {
        throw new ConflictException('Store slug already taken');
      }
    }

    return this.prisma.vendor.update({
      where: { id },
      data: updateVendorDto,
      include: {
        subscription: true,
      },
    });
  }

  async getDashboardStats(vendorId: string) {
    const [totalProducts, totalOrders, totalRevenue, recentOrders] = await Promise.all([
      this.prisma.product.count({
        where: { vendorId, isActive: true },
      }),
      this.prisma.order.count({
        where: { vendorId },
      }),
      this.prisma.order.aggregate({
        where: {
          vendorId,
          paymentStatus: 'APPROVED',
        },
        _sum: {
          total: true,
        },
      }),
      this.prisma.order.findMany({
        where: { vendorId },
        take: 10,
        orderBy: { createdAt: 'desc' },
        include: {
          user: {
            select: {
              name: true,
              email: true,
            },
          },
          items: {
            include: {
              product: {
                select: {
                  name: true,
                  images: true,
                },
              },
            },
          },
        },
      }),
    ]);

    return {
      totalProducts,
      totalOrders,
      totalRevenue: totalRevenue._sum.total || 0,
      recentOrders,
    };
  }

  async getVendorProducts(vendorId: string, page: number = 1, limit: number = 20) {
    const skip = (page - 1) * limit;

    const [products, total] = await Promise.all([
      this.prisma.product.findMany({
        where: { vendorId },
        skip,
        take: limit,
        include: {
          category: true,
        },
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.product.count({
        where: { vendorId },
      }),
    ]);

    return {
      data: products,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }
}

