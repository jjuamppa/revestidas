import { DataSource } from 'typeorm';
import { User } from '../src/entities/user.entity';
import * as bcrypt from 'bcryptjs';
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
  const repo = dataSource.getRepository(User);
  const exists = await repo.findOneBy({ email: 'admin@revestidas.local' });
  if (!exists) {
    const pw = await bcrypt.hash('revestidas123', 10);
    const u = repo.create({ email: 'admin@revestidas.local', passwordHash: pw });
    await repo.save(u);
    console.log('Admin user created: admin@revestidas.local / revestidas123');
  } else {
    console.log('Admin already exists');
  }
  await dataSource.destroy();
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
