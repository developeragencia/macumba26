import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private transporter;

  constructor(private configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
      host: this.configService.get('SMTP_HOST'),
      port: this.configService.get('SMTP_PORT'),
      secure: false,
      auth: {
        user: this.configService.get('SMTP_USER'),
        pass: this.configService.get('SMTP_PASSWORD'),
      },
    });
  }

  async sendVerificationEmail(email: string, name: string) {
    const frontendUrl = this.configService.get('FRONTEND_URL');
    const token = ''; // Generate verification token

    const mailOptions = {
      from: `"Shopping da Macumba" <${this.configService.get('SMTP_USER')}>`,
      to: email,
      subject: '✨ Verifique seu Email - Shopping da Macumba',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: linear-gradient(135deg, #1a0033 0%, #4a0e7a 100%); padding: 40px; border-radius: 10px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #ffd700; margin: 0; font-size: 32px;">🕯️ Shopping da Macumba</h1>
          </div>
          <div style="background: white; padding: 30px; border-radius: 8px;">
            <h2 style="color: #4a0e7a; margin-top: 0;">Olá, ${name}! 👋</h2>
            <p style="color: #333; line-height: 1.6;">
              Bem-vindo(a) ao <strong>Shopping da Macumba</strong>, o maior marketplace de produtos espirituais e místicos!
            </p>
            <p style="color: #333; line-height: 1.6;">
              Para ativar sua conta, clique no botão abaixo:
            </p>
            <div style="text-align: center; margin: 30px 0;">
              <a href="${frontendUrl}/verify-email?token=${token}" 
                 style="background: linear-gradient(135deg, #ffd700 0%, #ff8c00 100%); 
                        color: #1a0033; 
                        padding: 15px 40px; 
                        text-decoration: none; 
                        border-radius: 25px; 
                        font-weight: bold;
                        display: inline-block;">
                Verificar Email
              </a>
            </div>
            <p style="color: #666; font-size: 12px; margin-top: 30px;">
              Se você não criou esta conta, ignore este email.
            </p>
          </div>
          <div style="text-align: center; margin-top: 20px; color: #ffd700; font-size: 12px;">
            © 2024 Shopping da Macumba. Todos os direitos reservados.
          </div>
        </div>
      `,
    };

    try {
      await this.transporter.sendMail(mailOptions);
      console.log(`✅ Verification email sent to ${email}`);
    } catch (error) {
      console.error('❌ Error sending verification email:', error);
    }
  }

  async sendPasswordResetEmail(email: string, name: string, token: string) {
    const frontendUrl = this.configService.get('FRONTEND_URL');

    const mailOptions = {
      from: `"Shopping da Macumba" <${this.configService.get('SMTP_USER')}>`,
      to: email,
      subject: '🔐 Redefinir Senha - Shopping da Macumba',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: linear-gradient(135deg, #1a0033 0%, #4a0e7a 100%); padding: 40px; border-radius: 10px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #ffd700; margin: 0; font-size: 32px;">🕯️ Shopping da Macumba</h1>
          </div>
          <div style="background: white; padding: 30px; border-radius: 8px;">
            <h2 style="color: #4a0e7a; margin-top: 0;">Olá, ${name}!</h2>
            <p style="color: #333; line-height: 1.6;">
              Você solicitou a redefinição de senha. Clique no botão abaixo para criar uma nova senha:
            </p>
            <div style="text-align: center; margin: 30px 0;">
              <a href="${frontendUrl}/reset-password?token=${token}" 
                 style="background: linear-gradient(135deg, #ffd700 0%, #ff8c00 100%); 
                        color: #1a0033; 
                        padding: 15px 40px; 
                        text-decoration: none; 
                        border-radius: 25px; 
                        font-weight: bold;
                        display: inline-block;">
                Redefinir Senha
              </a>
            </div>
            <p style="color: #999; font-size: 14px;">
              Este link expira em 1 hora.
            </p>
            <p style="color: #666; font-size: 12px; margin-top: 30px;">
              Se você não solicitou esta redefinição, ignore este email.
            </p>
          </div>
        </div>
      `,
    };

    try {
      await this.transporter.sendMail(mailOptions);
      console.log(`✅ Password reset email sent to ${email}`);
    } catch (error) {
      console.error('❌ Error sending password reset email:', error);
    }
  }

  async sendOrderConfirmation(email: string, orderData: any) {
    const mailOptions = {
      from: `"Shopping da Macumba" <${this.configService.get('SMTP_USER')}>`,
      to: email,
      subject: `✅ Pedido Confirmado #${orderData.orderNumber}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>Pedido Confirmado!</h2>
          <p>Olá, ${orderData.customerName}!</p>
          <p>Seu pedido foi confirmado e está sendo processado.</p>
          <h3>Detalhes do Pedido:</h3>
          <p><strong>Número:</strong> ${orderData.orderNumber}</p>
          <p><strong>Total:</strong> R$ ${orderData.total.toFixed(2)}</p>
        </div>
      `,
    };

    try {
      await this.transporter.sendMail(mailOptions);
    } catch (error) {
      console.error('❌ Error sending order confirmation email:', error);
    }
  }
}

