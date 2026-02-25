import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Product } from './product.entity';

@Entity({ name: 'images' })
export class Image {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  filename: string;

  @Column()
  url: string;

  @Column({ default: 0 })
  orderIndex: number;

  @ManyToOne(() => Product, (product) => product.images, { onDelete: 'CASCADE' })
  product: Product;
}
