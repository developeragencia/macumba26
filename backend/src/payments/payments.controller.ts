import { Controller, Post, Body, Headers, RawBodyRequest, Req } from '@nestjs/common';
import { PaymentsService } from './payments.service';

@Controller('payments')
export class PaymentsController {
  constructor(private paymentsService: PaymentsService) {}

  @Post('pix')
  async createPixPayment(@Body() body: { orderId: string; amount: number }) {
    return this.paymentsService.createPixPayment(body.orderId, body.amount);
  }

  @Post('stripe')
  async createStripePayment(@Body() body: { orderId: string; amount: number }) {
    return this.paymentsService.createStripePayment(body.orderId, body.amount);
  }

  @Post('mercadopago')
  async createMercadoPagoPayment(
    @Body() body: { orderId: string; amount: number; description: string },
  ) {
    return this.paymentsService.createMercadoPagoPayment(
      body.orderId,
      body.amount,
      body.description,
    );
  }

  @Post('webhooks/stripe')
  async handleStripeWebhook(@Headers('stripe-signature') signature: string, @Req() req: any) {
    return this.paymentsService.handleStripeWebhook(signature, req.body);
  }

  @Post('webhooks/mercadopago')
  async handleMercadoPagoWebhook(@Body() data: any) {
    return this.paymentsService.handleMercadoPagoWebhook(data);
  }
}

