import { NestFactory } from '@nestjs/core';
import { json } from 'body-parser';
import { AppModule } from './app.module';
import * as express from 'express';
import * as cookieParser from 'cookie-parser';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(json({ limit: '10mb' }));
  app.use(cookieParser());
  app.enableCors();

  // serve uploaded images from /uploads
  const server = app.getHttpAdapter().getInstance() as express.Express;
  server.use('/uploads', express.static(join(process.cwd(), 'uploads')));

  const port = process.env.PORT || 4000;
  await app.listen(port);
  console.log(`API running on http://localhost:${port}/api`);
}

bootstrap();
