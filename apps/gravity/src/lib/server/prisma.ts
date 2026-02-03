import { PrismaClient } from '$lib/generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { env } from '$env/dynamic/private';

// Prevent creating many PrismaClient instances during HMR in dev
const globalForPrisma = globalThis as unknown as {
  prisma?: PrismaClient;
};

const connectionString = env.DATABASE_URL;
if (!connectionString) {
  throw new Error('DATABASE_URL is missing. Check apps/gravity/.env');
}

const adapter = new PrismaPg({ connectionString });

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter,
    log: ['warn', 'error']
  });

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

