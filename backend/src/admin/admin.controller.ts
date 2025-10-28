import { Controller, Get, Put, Param, Query, UseGuards, ParseIntPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AdminService } from './admin.service';
import { Roles } from '../auth/decorators/roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';

@Controller('admin')
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Roles('ADMIN')
export class AdminController {
  constructor(private adminService: AdminService) {}

  @Get('dashboard')
  async getDashboardStats() {
    return this.adminService.getDashboardStats();
  }

  @Get('users')
  async getAllUsers(
    @Query('page', ParseIntPipe) page: number = 1,
    @Query('limit', ParseIntPipe) limit: number = 20,
  ) {
    return this.adminService.getAllUsers(page, limit);
  }

  @Put('vendors/:id/approve')
  async approveVendor(@Param('id') vendorId: string) {
    return this.adminService.approveVendor(vendorId);
  }

  @Put('products/:id/approve')
  async approveProduct(@Param('id') productId: string) {
    return this.adminService.approveProduct(productId);
  }

  @Put('users/:id/toggle-status')
  async toggleUserStatus(@Param('id') userId: string) {
    return this.adminService.toggleUserStatus(userId);
  }
}

