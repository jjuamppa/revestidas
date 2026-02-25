import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Product } from './entities/product.entity';
import { Image } from './entities/image.entity';
import { User } from './entities/user.entity';

const isProd = process.env.NODE_ENV === 'production';

const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DATABASE_HOST || 'localhost',
  port: parseInt(process.env.DATABASE_PORT || '5432', 10),
  username: process.env.DATABASE_USER || 'postgres',
  password: process.env.DATABASE_PASSWORD || 'postgres',
  database: process.env.DATABASE_NAME || 'revestidas',
  entities: isProd ? ['dist/entities/*.js'] : [Product, Image, User],
  migrations: isProd ? ['dist/migrations/*.js'] : ['src/migrations/*.ts'],
  synchronize: false,
});

export default AppDataSource;
