import { config } from 'dotenv';
import { resolve, join } from 'path';
config({ path: resolve(__dirname, '../../.env') });

import { DataSource } from 'typeorm';
import { User } from '../src/entities/user.entity';
import * as bcrypt from 'bcryptjs';

async function run() {
  const dataSource = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432', 10),
    username: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASS || 'postgres',
    database: process.env.DB_NAME || 'revestidas',
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
