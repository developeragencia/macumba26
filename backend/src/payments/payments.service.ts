import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';
import mercadopago from 'mercadopago';
import { OrdersService } from '../orders/orders.service';

@Injectable()
export class PaymentsService {
  private stripe: Stripe;

  constructor(
    private configService: ConfigService,
    private ordersService: OrdersService,
  ) {
    // Initialize Stripe
    this.stripe = new Stripe(this.configService.get('STRIPE_SECRET_KEY'), {
      apiVersion: '2023-10-16',
    });

    // Initialize Mercado Pago - Commented out due to API changes
    // mercadopago.configure({
    //   access_token: this.configService.get('MERCADO_PAGO_ACCESS_TOKEN'),
    // });
  }

  async createPixPayment(orderId: string, amount: number) {
    // Pix payment logic - generate QR code
    const pixData = {
      orderId,
      amount,
      qrCode: `pix-qr-code-${orderId}`,
      pixKey: 'shopping-da-macumba@pix.com.br',
      expiresAt: new Date(Date.now() + 30 * 60 * 1000), // 30 minutes
    };

    return pixData;
  }

  async createStripePayment(orderId: string, amount: number) {
    const paymentIntent = await this.stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convert to cents
      currency: 'brl',
      metadata: { orderId },
    });

    return {
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
    };
  }

  async createMercadoPagoPayment(orderId: string, amount: number, description: string) {
    const preference = {
      items: [
        {
          title: description,
          unit_price: amount,
          quantity: 1,
        },
      ],
      back_urls: {
        success: `${this.configService.get('FRONTEND_URL')}/payment/success`,
        failure: `${this.configService.get('FRONTEND_URL')}/payment/failure`,
        pending: `${this.configService.get('FRONTEND_URL')}/payment/pending`,
      },
      auto_return: 'approved',
      external_reference: orderId,
    };

    // Mercado Pago API temporarily disabled
    return { init_point: '', preference_id: orderId };
  }

  async handleStripeWebhook(signature: string, payload: any) {
    try {
      const event = this.stripe.webhooks.constructEvent(
        payload,
        signature,
        this.configService.get('STRIPE_WEBHOOK_SECRET'),
      );

      if (event.type === 'payment_intent.succeeded') {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        const orderId = paymentIntent.metadata.orderId;

        await this.ordersService.updatePaymentStatus(orderId, 'APPROVED', paymentIntent.id);
      }

      return { received: true };
    } catch (err) {
      throw new Error(`Webhook Error: ${err.message}`);
    }
  }

  async handleMercadoPagoWebhook(data: any) {
    const { type, data: paymentData } = data;

    if (type === 'payment') {
      // Mercado Pago API temporarily disabled
      // const payment = await mercadopago.payment.findById(paymentData.id);
      // const orderId = payment.body.external_reference;
      // if (payment.body.status === 'approved') {
      //   await this.ordersService.updatePaymentStatus(orderId, 'APPROVED', String(payment.body.id));
      // }
    }

    return { received: true };
  }
}

