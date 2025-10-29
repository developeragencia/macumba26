import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as cookieParser from 'cookie-parser';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // CORS configuration
  app.enableCors({
    origin: process.env.FRONTEND_URL || true,
    credentials: true,
  });

  // Global pipes
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );

  // Cookie parser
  app.use(cookieParser());

  // Global prefix for API routes
  app.setGlobalPrefix('api');

  // Health check endpoint
  app.getHttpAdapter().get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  // Serve Next.js frontend in production
  if (process.env.NODE_ENV === 'production') {
    const frontendPath = join(__dirname, '..', 'frontend');
    app.useStaticAssets(join(frontendPath, 'public'));
    app.useStaticAssets(join(frontendPath, '.next', 'static'), {
      prefix: '/_next/static/',
    });
    
    // Serve Next.js pages
    app.getHttpAdapter().get('*', (req, res, next) => {
      // Skip API routes
      if (req.url.startsWith('/api')) {
        return next();
      }
      // Serve Next.js
      const { createServer } = require('http');
      const { parse } = require('url');
      const next = require('next');
      
      const nextApp = next({
        dev: false,
        dir: frontendPath,
      });
      const handle = nextApp.getRequestHandler();
      
      nextApp.prepare().then(() => {
        handle(req, res, parse(req.url, true));
      });
    });
  }

  const port = process.env.PORT || 3000;
  await app.listen(port, '0.0.0.0');

  console.log(`🚀 Application is running on: http://localhost:${port}`);
  console.log(`📡 API: http://localhost:${port}/api`);
  console.log(`🎨 Frontend: http://localhost:${port}`);
}

bootstrap();
