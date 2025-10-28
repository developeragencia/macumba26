import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class RecommendationsService {
  constructor(private prisma: PrismaService) {}

  async getRecommendations(userId: string, limit: number = 10) {
    // Get user's order history
    const orders = await this.prisma.order.findMany({
      where: { userId },
      include: {
        items: {
          include: {
            product: {
              select: {
                categoryId: true,
                tags: true,
              },
            },
          },
        },
      },
      take: 10,
      orderBy: { createdAt: 'desc' },
    });

    // Extract categories and tags from user's purchases
    const categories = new Set<string>();
    const tags = new Set<string>();

    orders.forEach((order) => {
      order.items.forEach((item) => {
        if (item.product.categoryId) {
          categories.add(item.product.categoryId);
        }
        item.product.tags.forEach((tag) => tags.add(tag));
      });
    });

    // Find similar products
    const recommendations = await this.prisma.product.findMany({
      where: {
        OR: [
          { categoryId: { in: Array.from(categories) } },
          { tags: { hasSome: Array.from(tags) } },
        ],
        isActive: true,
        isApproved: true,
      },
      take: limit,
      include: {
        vendor: {
          select: {
            id: true,
            storeName: true,
            storeSlug: true,
            storeLogo: true,
          },
        },
        category: true,
      },
      orderBy: [{ rating: 'desc' }, { views: 'desc' }],
    });

    return recommendations;
  }

  async getTrendingProducts(limit: number = 10) {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    return this.prisma.product.findMany({
      where: {
        isActive: true,
        isApproved: true,
        createdAt: {
          gte: sevenDaysAgo,
        },
      },
      take: limit,
      include: {
        vendor: {
          select: {
            id: true,
            storeName: true,
            storeSlug: true,
            storeLogo: true,
          },
        },
        category: true,
      },
      orderBy: [{ views: 'desc' }, { rating: 'desc' }],
    });
  }
}

