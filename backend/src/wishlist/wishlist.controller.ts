import { Controller, Get, Post, Delete, Body, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { WishlistService } from './wishlist.service';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

@Controller('wishlist')
@UseGuards(AuthGuard('jwt'))
export class WishlistController {
  constructor(private wishlistService: WishlistService) {}

  @Get()
  async getWishlist(@CurrentUser() user: any) {
    return this.wishlistService.getWishlist(user.id);
  }

  @Post()
  async addToWishlist(@CurrentUser() user: any, @Body('productId') productId: string) {
    return this.wishlistService.addToWishlist(user.id, productId);
  }

  @Delete()
  async removeFromWishlist(@CurrentUser() user: any, @Body('productId') productId: string) {
    return this.wishlistService.removeFromWishlist(user.id, productId);
  }
}

