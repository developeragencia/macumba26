import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async create(vendorId: string, createProductDto: CreateProductDto) {
    // Check vendor subscription limits
    const vendor = await this.prisma.vendor.findUnique({
      where: { id: vendorId },
      include: { subscription: true },
    });

    if (!vendor) {
      throw new NotFoundException('Vendor not found');
    }

    const productCount = await this.prisma.product.count({
      where: { vendorId, isActive: true },
    });

    if (productCount >= vendor.subscription.productLimit) {
      throw new ForbiddenException(
        `Product limit reached for ${vendor.subscription.plan} plan. Upgrade to add more products.`,
      );
    }

    // Generate unique slug
    const baseSlug = createProductDto.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    let slug = baseSlug;
    let counter = 1;

    while (await this.prisma.product.findUnique({ where: { slug } })) {
      slug = `${baseSlug}-${counter}`;
      counter++;
    }

    return this.prisma.product.create({
      data: {
        ...createProductDto,
        slug,
        vendorId,
      },
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
    });
  }

  async findAll(filters: any = {}) {
    const {
      page = 1,
      limit = 20,
      categoryId,
      vendorId,
      minPrice,
      maxPrice,
      search,
      sortBy = 'createdAt',
      sortOrder = 'desc',
      featured,
    } = filters;

    const skip = (page - 1) * limit;

    const where: any = {
      isActive: true,
      isApproved: true,
    };

    if (categoryId) where.categoryId = categoryId;
    if (vendorId) where.vendorId = vendorId;
    if (featured !== undefined) where.isFeatured = featured === 'true';

    if (minPrice || maxPrice) {
      where.price = {};
      if (minPrice) where.price.gte = parseFloat(minPrice);
      if (maxPrice) where.price.lte = parseFloat(maxPrice);
    }

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
        { tags: { has: search } },
      ];
    }

    const [products, total] = await Promise.all([
      this.prisma.product.findMany({
        where,
        skip,
        take: parseInt(limit),
        include: {
          vendor: {
            select: {
              id: true,
              storeName: true,
              storeSlug: true,
              storeLogo: true,
              rating: true,
            },
          },
          category: true,
        },
        orderBy: { [sortBy]: sortOrder },
      }),
      this.prisma.product.count({ where }),
    ]);

    return {
      data: products,
      meta: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(total / parseInt(limit)),
      },
    };
  }

  async findOne(id: string) {
    const product = await this.prisma.product.findUnique({
      where: { id },
      include: {
        vendor: {
          select: {
            id: true,
            storeName: true,
            storeSlug: true,
            storeLogo: true,
            rating: true,
            totalSales: true,
          },
        },
        category: true,
        reviews: {
          take: 10,
          include: {
            user: {
              select: {
                id: true,
                name: true,
                avatar: true,
              },
            },
          },
          orderBy: { createdAt: 'desc' },
        },
      },
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    // Increment views
    await this.prisma.product.update({
      where: { id },
      data: { views: { increment: 1 } },
    });

    return product;
  }

  async findBySlug(slug: string) {
    const product = await this.prisma.product.findUnique({
      where: { slug },
      include: {
        vendor: {
          select: {
            id: true,
            storeName: true,
            storeSlug: true,
            storeLogo: true,
            rating: true,
          },
        },
        category: true,
        reviews: {
          take: 10,
          include: {
            user: {
              select: {
                id: true,
                name: true,
                avatar: true,
              },
            },
          },
          orderBy: { createdAt: 'desc' },
        },
      },
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    // Increment views
    await this.prisma.product.update({
      where: { slug },
      data: { views: { increment: 1 } },
    });

    return product;
  }

  async update(id: string, vendorId: string, updateProductDto: UpdateProductDto) {
    const product = await this.prisma.product.findFirst({
      where: { id, vendorId },
    });

    if (!product) {
      throw new NotFoundException('Product not found or unauthorized');
    }

    return this.prisma.product.update({
      where: { id },
      data: updateProductDto,
      include: {
        vendor: {
          select: {
            id: true,
            storeName: true,
            storeSlug: true,
          },
        },
        category: true,
      },
    });
  }

  async delete(id: string, vendorId: string) {
    const product = await this.prisma.product.findFirst({
      where: { id, vendorId },
    });

    if (!product) {
      throw new NotFoundException('Product not found or unauthorized');
    }

    // Soft delete
    await this.prisma.product.update({
      where: { id },
      data: { isActive: false },
    });

    return { message: 'Product deleted successfully' };
  }

  async getFeaturedProducts(limit: number = 10) {
    return this.prisma.product.findMany({
      where: {
        isActive: true,
        isApproved: true,
        isFeatured: true,
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
      orderBy: { views: 'desc' },
    });
  }

  async getRelatedProducts(productId: string, limit: number = 6) {
    const product = await this.prisma.product.findUnique({
      where: { id: productId },
      select: { categoryId: true },
    });

    if (!product) {
      return [];
    }

    return this.prisma.product.findMany({
      where: {
        categoryId: product.categoryId,
        id: { not: productId },
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
          },
        },
        category: true,
      },
      orderBy: { views: 'desc' },
    });
  }
}

