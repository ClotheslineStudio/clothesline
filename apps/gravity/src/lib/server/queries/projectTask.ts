import type { PrismaClient } from '$lib/generated/prisma/client';

export async function projectsByWorkspace(prisma: PrismaClient, workspaceId: string) {
  return prisma.project.findMany({
    where: { workspaceId },
    orderBy: { createdAt: 'desc' }
  });
}

export async function tasksByWorkspace(prisma: PrismaClient, workspaceId: string) {
  return prisma.task.findMany({
    where: { workspaceId },
    orderBy: { createdAt: 'desc' }
  });
}
