import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SubscriptionsService {
  constructor(private prisma: PrismaService) {}

  private planLimits = {
    FREE: { productLimit: 5, price: 0 },
    PRO: { productLimit: 100, price: 29.9 },
    PREMIUM: { productLimit: -1, price: 99.9 }, // -1 = unlimited
  };

  async getVendorSubscription(vendorId: string) {
    const subscription = await this.prisma.subscription.findUnique({
      where: { vendorId },
      include: {
        vendor: true,
      },
    });

    if (!subscription) {
      throw new NotFoundException('Subscription not found');
    }

    return subscription;
  }

  async upgradePlan(vendorId: string, plan: 'PRO' | 'PREMIUM') {
    const limits = this.planLimits[plan];

    return this.prisma.subscription.update({
      where: { vendorId },
      data: {
        plan,
        productLimit: limits.productLimit,
        status: 'ACTIVE',
        endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
      },
    });
  }

  async cancelSubscription(vendorId: string) {
    return this.prisma.subscription.update({
      where: { vendorId },
      data: {
        status: 'CANCELLED',
        autoRenew: false,
      },
    });
  }

  async checkAndUpdateExpiredSubscriptions() {
    const expiredSubs = await this.prisma.subscription.findMany({
      where: {
        endDate: {
          lte: new Date(),
        },
        status: 'ACTIVE',
      },
    });

    await Promise.all(
      expiredSubs.map((sub) =>
        this.prisma.subscription.update({
          where: { id: sub.id },
          data: {
            status: 'EXPIRED',
            plan: 'FREE',
            productLimit: 5,
          },
        }),
      ),
    );

    return { updated: expiredSubs.length };
  }
}

