import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly repo: Repository<Product>,
  ) {}

  findAll(): Promise<Product[]> {
    return this.repo.find({ order: { createdAt: 'DESC' } });
  }

  findOne(id: string): Promise<Product | null> {
    return this.repo.findOneBy({ id });
  }

  create(product: Partial<Product>) {
    const p = this.repo.create(product);
    return this.repo.save(p);
  }
}
