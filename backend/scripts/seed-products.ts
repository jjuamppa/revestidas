import { DataSource } from 'typeorm';
import { Product } from '../src/entities/product.entity';
import { Image } from '../src/entities/image.entity';
import { join } from 'path';

async function run() {
  const dataSource = new DataSource({
    type: 'postgres',
    host: process.env.DATABASE_HOST || 'localhost',
    port: parseInt(process.env.DATABASE_PORT || '5432', 10),
    username: process.env.DATABASE_USER || 'postgres',
    password: process.env.DATABASE_PASSWORD || 'postgres',
    database: process.env.DATABASE_NAME || 'revestidas',
    entities: [join(__dirname, '..', 'src', 'entities', '*.ts')],
    synchronize: true,
  });

  await dataSource.initialize();
  const repo = dataSource.getRepository(Product);

  const existing = await repo.count();
  if (existing > 0) {
    console.log('Products already exist, skipping seeding');
    await dataSource.destroy();
    return;
  }

  const sampleImages = ['/assets/principal.png', '/assets/reve.jpg'];

  for (let i = 1; i <= 9; i++) {
    const p = new Product();
    p.title = `Producto de ejemplo ${i}`;
    p.description = `Descripción breve para el producto ${i}`;
    p.price = (19.99 + i).toFixed(2);
    p.images = [
      Object.assign(new Image(), { filename: `sample-${i}.png`, url: sampleImages[i % sampleImages.length], orderIndex: 0 }),
    ];
    await repo.save(p as any);
  }

  console.log('Seeded sample products');
  await dataSource.destroy();
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
