import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsModule } from './products/products.module';
import { AuthModule } from './auth/auth.module';
import { Product } from './entities/product.entity';
import { Image } from './entities/image.entity';
import { User } from './entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST || 'localhost',
      port: parseInt(process.env.DATABASE_PORT || '5432', 10),
      username: process.env.DATABASE_USER || 'postgres',
      password: process.env.DATABASE_PASSWORD || 'postgres',
      database: process.env.DATABASE_NAME || 'revestidas',
      entities: [Product, Image, User],
      synchronize: true
    }),
    ProductsModule,
    AuthModule
  ],
})
export class AppModule {}
