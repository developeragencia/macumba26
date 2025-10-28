import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CartService {
  constructor(private prisma: PrismaService) {}

  async getCart(userId: string) {
    const cartItems = await this.prisma.cartItem.findMany({
      where: { userId },
      include: {
        product: {
          include: {
            vendor: {
              select: {
                id: true,
                storeName: true,
                storeSlug: true,
              },
            },
          },
        },
      },
    });

    const total = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

    return {
      items: cartItems,
      total,
      itemCount: cartItems.reduce((sum, item) => sum + item.quantity, 0),
    };
  }

  async addToCart(userId: string, productId: string, quantity: number = 1) {
    const existingItem = await this.prisma.cartItem.findUnique({
      where: {
        userId_productId: {
          userId,
          productId,
        },
      },
    });

    if (existingItem) {
      return this.prisma.cartItem.update({
        where: { id: existingItem.id },
        data: {
          quantity: existingItem.quantity + quantity,
        },
        include: {
          product: true,
        },
      });
    }

    return this.prisma.cartItem.create({
      data: {
        userId,
        productId,
        quantity,
      },
      include: {
        product: true,
      },
    });
  }

  async updateQuantity(userId: string, itemId: string, quantity: number) {
    return this.prisma.cartItem.update({
      where: {
        id: itemId,
        userId,
      },
      data: { quantity },
      include: {
        product: true,
      },
    });
  }

  async removeFromCart(userId: string, itemId: string) {
    await this.prisma.cartItem.delete({
      where: {
        id: itemId,
        userId,
      },
    });

    return { message: 'Item removed from cart' };
  }

  async clearCart(userId: string) {
    await this.prisma.cartItem.deleteMany({
      where: { userId },
    });

    return { message: 'Cart cleared' };
  }
}

