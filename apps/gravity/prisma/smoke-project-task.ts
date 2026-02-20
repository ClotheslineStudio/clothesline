import type { PrismaClient } from '@prisma/client';

export async function smokeProjectTaskQueries(prisma: PrismaClient, workspaceId: string) {
  await prisma.project.findMany({
    where: { workspaceId },
    orderBy: { createdAt: 'desc' }
  });

  await prisma.task.findMany({
    where: { workspaceId },
    orderBy: { createdAt: 'desc' }
  });
}
