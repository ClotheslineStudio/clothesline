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
  const workspace = await prisma.workspace.upsert({
    where: { id: 'ws_demo' },
    update: { name: 'Demo Workspace' },
    create: { id: 'ws_demo', name: 'Demo Workspace' }
  });

  const user = await prisma.user.upsert({
    where: { email: 'demo@gravity.local' },
    update: { name: 'Demo User' },
    create: { email: 'demo@gravity.local', name: 'Demo User' }
  });

  await prisma.membership.upsert({
    where: { id: 'm_demo' },
    update: { workspaceId: workspace.id, userId: user.id, role: 'OWNER' },
    create: { id: 'm_demo', workspaceId: workspace.id, userId: user.id, role: 'OWNER' }
  });

  console.log('Seed OK', { workspaceId: workspace.id, userId: user.id });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

