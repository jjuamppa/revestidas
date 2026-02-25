import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { AdminProductsController } from './admin-products.controller';
import { Product } from '../entities/product.entity';
import { Image } from '../entities/image.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Image]), AuthModule],
  providers: [ProductsService],
  controllers: [ProductsController, AdminProductsController]
})
export class ProductsModule {}
