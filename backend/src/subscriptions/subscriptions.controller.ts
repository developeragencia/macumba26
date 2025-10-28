import { Controller, Get, Post, Body, UseGuards, Param } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { SubscriptionsService } from './subscriptions.service';

@Controller('subscriptions')
@UseGuards(AuthGuard('jwt'))
export class SubscriptionsController {
  constructor(private subscriptionsService: SubscriptionsService) {}

  @Get('vendor/:vendorId')
  async getVendorSubscription(@Param('vendorId') vendorId: string) {
    return this.subscriptionsService.getVendorSubscription(vendorId);
  }

  @Post('upgrade')
  async upgradePlan(@Body() body: { vendorId: string; plan: 'PRO' | 'PREMIUM' }) {
    return this.subscriptionsService.upgradePlan(body.vendorId, body.plan);
  }

  @Post('cancel')
  async cancelSubscription(@Body('vendorId') vendorId: string) {
    return this.subscriptionsService.cancelSubscription(vendorId);
  }
}

