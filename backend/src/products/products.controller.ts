import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ProductsService } from './products.service';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from '../prisma/prisma.service';

@Controller('products')
export class ProductsController {
  constructor(
    private productsService: ProductsService,
    private prisma: PrismaService,
  ) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async create(@CurrentUser() user: any, @Body() createProductDto: CreateProductDto) {
    // Get vendor ID from user
    const vendor = await this.prisma.vendor.findUnique({
      where: { userId: user.id },
    });

    if (!vendor) {
      throw new Error('You must be a vendor to create products');
    }

    return this.productsService.create(vendor.id, createProductDto);
  }

  @Get()
  async findAll(@Query() filters: any) {
    return this.productsService.findAll(filters);
  }

  @Get('featured')
  async getFeatured(@Query('limit') limit?: string) {
    return this.productsService.getFeaturedProducts(limit ? parseInt(limit) : 10);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.productsService.findOne(id);
  }

  @Get('slug/:slug')
  async findBySlug(@Param('slug') slug: string) {
    return this.productsService.findBySlug(slug);
  }

  @Get(':id/related')
  async getRelated(@Param('id') id: string, @Query('limit') limit?: string) {
    return this.productsService.getRelatedProducts(id, limit ? parseInt(limit) : 6);
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'))
  async update(
    @Param('id') id: string,
    @CurrentUser() user: any,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    const vendor = await this.prisma.vendor.findUnique({
      where: { userId: user.id },
    });

    if (!vendor) {
      throw new Error('Vendor not found');
    }

    return this.productsService.update(id, vendor.id, updateProductDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  async delete(@Param('id') id: string, @CurrentUser() user: any) {
    const vendor = await this.prisma.vendor.findUnique({
      where: { userId: user.id },
    });

    if (!vendor) {
      throw new Error('Vendor not found');
    }

    return this.productsService.delete(id, vendor.id);
  }
}

