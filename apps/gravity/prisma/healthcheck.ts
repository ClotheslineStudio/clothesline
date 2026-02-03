import dotenv from 'dotenv';
dotenv.config({ override: true });

import { PrismaClient } from '../src/lib/generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

const connectionString = process.env.DATABASE_URL;
if (!connectionString) throw new Error('DATABASE_URL is not set');

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString })
});

async function main() {
  await prisma.$queryRaw`SELECT 1`;
  console.log('DB health: OK');
}

main()
  .catch((e) => {
    console.error('DB health: FAILED');
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });



