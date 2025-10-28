import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.category.findMany({
      where: { isActive: true, parentId: null },
      include: {
        subCategories: {
          where: { isActive: true },
        },
      },
      orderBy: { name: 'asc' },
    });
  }

  async findOne(id: string) {
    const category = await this.prisma.category.findUnique({
      where: { id },
      include: {
        subCategories: {
          where: { isActive: true },
        },
        parent: true,
      },
    });

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    return category;
  }

  async findBySlug(slug: string) {
    const category = await this.prisma.category.findUnique({
      where: { slug },
      include: {
        subCategories: {
          where: { isActive: true },
        },
        parent: true,
      },
    });

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    return category;
  }

  async getProductsByCategory(categoryId: string, page: number = 1, limit: number = 20) {
    const skip = (page - 1) * limit;

    // Get all subcategory IDs
    const category = await this.prisma.category.findUnique({
      where: { id: categoryId },
      include: { subCategories: true },
    });

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    const categoryIds = [categoryId, ...category.subCategories.map((c) => c.id)];

    const [products, total] = await Promise.all([
      this.prisma.product.findMany({
        where: {
          categoryId: { in: categoryIds },
          isActive: true,
          isApproved: true,
        },
        skip,
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
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.product.count({
        where: {
          categoryId: { in: categoryIds },
          isActive: true,
          isApproved: true,
        },
      }),
    ]);

    return {
      category,
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

