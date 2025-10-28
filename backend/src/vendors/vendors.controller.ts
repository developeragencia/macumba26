import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Param,
  Query,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { VendorsService } from './vendors.service';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { CreateVendorDto } from './dto/create-vendor.dto';
import { UpdateVendorDto } from './dto/update-vendor.dto';

@Controller('vendors')
export class VendorsController {
  constructor(private vendorsService: VendorsService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async create(@CurrentUser() user: any, @Body() createVendorDto: CreateVendorDto) {
    return this.vendorsService.create(user.id, createVendorDto);
  }

  @Get()
  async findAll(
    @Query('page', ParseIntPipe) page: number = 1,
    @Query('limit', ParseIntPipe) limit: number = 20,
    @Query('approved') approved?: string,
  ) {
    const isApproved = approved === 'true' ? true : approved === 'false' ? false : undefined;
    return this.vendorsService.findAll(page, limit, isApproved);
  }

  @Get('my-store')
  @UseGuards(AuthGuard('jwt'))
  async getMyStore(@CurrentUser() user: any) {
    return this.vendorsService.findByUserId(user.id);
  }

  @Get('my-store/dashboard')
  @UseGuards(AuthGuard('jwt'))
  async getDashboardStats(@CurrentUser() user: any) {
    const vendor = await this.vendorsService.findByUserId(user.id);
    if (!vendor) {
      throw new Error('Vendor not found');
    }
    return this.vendorsService.getDashboardStats(vendor.id);
  }

  @Get('my-store/products')
  @UseGuards(AuthGuard('jwt'))
  async getMyProducts(
    @CurrentUser() user: any,
    @Query('page', ParseIntPipe) page: number = 1,
    @Query('limit', ParseIntPipe) limit: number = 20,
  ) {
    const vendor = await this.vendorsService.findByUserId(user.id);
    if (!vendor) {
      throw new Error('Vendor not found');
    }
    return this.vendorsService.getVendorProducts(vendor.id, page, limit);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.vendorsService.findOne(id);
  }

  @Get('slug/:slug')
  async findBySlug(@Param('slug') slug: string) {
    return this.vendorsService.findBySlug(slug);
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'))
  async update(
    @Param('id') id: string,
    @CurrentUser() user: any,
    @Body() updateVendorDto: UpdateVendorDto,
  ) {
    return this.vendorsService.update(id, user.id, updateVendorDto);
  }
}

