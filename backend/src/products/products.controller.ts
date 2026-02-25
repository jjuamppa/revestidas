import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from '../entities/product.entity';

@Controller('api/products')
export class ProductsController {
  constructor(private readonly service: ProductsService) {}

  @Get()
  getAll(): Promise<Product[]> {
    return this.service.findAll();
  }

  @Get(':id')
  getOne(@Param('id') id: string): Promise<Product | null> {
    return this.service.findOne(id);
  }

  @Post()
  create(@Body() body: Partial<Product>) {
    return this.service.create(body);
  }
}
