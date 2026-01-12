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
  // 1) Workspace (tenant)
  const workspace = await prisma.workspace.upsert({
    where: { id: 'ws_demo' },
    update: { name: 'Demo Workspace' },
    create: { id: 'ws_demo', name: 'Demo Workspace' }
  });

  // 2) User
  const user = await prisma.user.upsert({
    where: { email: 'demo@gravity.local' },
    update: { name: 'Demo User' },
    create: { email: 'demo@gravity.local', name: 'Demo User' }
  });

  // 3) Membership (connects user <-> workspace)
  await prisma.membership.upsert({
    where: { id: 'm_demo' },
    update: { workspaceId: workspace.id, userId: user.id, role: 'OWNER' },
    create: { id: 'm_demo', workspaceId: workspace.id, userId: user.id, role: 'OWNER' }
  });

  // 4) Nouns to tag (create at least one Source + Requirement)
  // Use upsert so rerunning seed doesn't create duplicates.
  const source = await prisma.source.upsert({
    where: { id: 'src_demo_1' },
    update: {
      title: 'Demo Source: IDEA Part B Guidance',
      type: 'URL',
      url: 'https://example.com/idea-guidance',
      notes: 'Placeholder URL for demo seed'
    },
    create: {
      id: 'src_demo_1',
      workspaceId: workspace.id,
      title: 'Demo Source: IDEA Part B Guidance',
      type: 'URL',
      url: 'https://example.com/idea-guidance',
      notes: 'Placeholder URL for demo seed'
    }
  });

  const requirement = await prisma.requirement.upsert({
    where: { id: 'req_demo_1' },
    update: {
      title: 'Maintain IDEA Part B compliance evidence',
      status: 'ACTIVE',
      priority: 'HIGH',
      ownerId: user.id
    },
    create: {
      id: 'req_demo_1',
      workspaceId: workspace.id,
      title: 'Maintain IDEA Part B compliance evidence',
      status: 'ACTIVE',
      priority: 'HIGH',
      ownerId: user.id
    }
  });

  // 5) Tags (unique per workspace by name)
  // IMPORTANT: this assumes you added @@unique([workspaceId, name]) on Tag.
  const tagIdea = await prisma.tag.upsert({
    where: { workspaceId_name: { workspaceId: workspace.id, name: 'IDEA' } },
    update: { color: '#2563eb' },
    create: { workspaceId: workspace.id, name: 'IDEA', color: '#2563eb' }
  });

  const tagFY2026 = await prisma.tag.upsert({
    where: { workspaceId_name: { workspaceId: workspace.id, name: 'FY2026' } },
    update: { color: '#16a34a' },
    create: { workspaceId: workspace.id, name: 'FY2026', color: '#16a34a' }
  });

  // 6) Tag assignments (attach tags to entities)
  // Use createMany + skipDuplicates so reruns are safe.
  await prisma.tagAssignment.createMany({
    data: [
      {
        workspaceId: workspace.id,
        tagId: tagIdea.id,
        entityType: 'SOURCE',
        entityId: source.id
      },
      {
        workspaceId: workspace.id,
        tagId: tagFY2026.id,
        entityType: 'REQUIREMENT',
        entityId: requirement.id
      }
    ],
    skipDuplicates: true
  });

  console.log('Seed OK', {
    workspaceId: workspace.id,
    userId: user.id,
    sourceId: source.id,
    requirementId: requirement.id,
    tags: [tagIdea.name, tagFY2026.name]
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });


