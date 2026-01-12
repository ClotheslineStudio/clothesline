import type { PrismaClient } from '$lib/generated/prisma/client';

export async function requirementsBySource(prisma: PrismaClient, args: {
  workspaceId: string;
  sourceId: string;
}) {
  const edges = await prisma.edge.findMany({
    where: {
      workspaceId: args.workspaceId,
      type: 'DERIVED_FROM',
      fromType: 'REQUIREMENT',
      toType: 'SOURCE',
      toId: args.sourceId
    },
    select: { fromId: true }
  });

  const requirementIds = edges.map((e) => e.fromId);
  if (requirementIds.length === 0) return [];

  return prisma.requirement.findMany({
    where: { workspaceId: args.workspaceId, id: { in: requirementIds } },
    orderBy: { createdAt: 'asc' }
  });
}

export async function tasksByRequirement(prisma: PrismaClient, args: {
  workspaceId: string;
  requirementId: string;
}) {
  const edges = await prisma.edge.findMany({
    where: {
      workspaceId: args.workspaceId,
      type: 'IMPLEMENTS',
      fromType: 'TASK',
      toType: 'REQUIREMENT',
      toId: args.requirementId
    },
    select: { fromId: true }
  });

  const taskIds = edges.map((e) => e.fromId);
  if (taskIds.length === 0) return [];

  return prisma.task.findMany({
    where: { workspaceId: args.workspaceId, id: { in: taskIds } },
    orderBy: { createdAt: 'asc' }
  });
}

/**
 * “Unplanned requirements” = requirements that have NO IMPLEMENTS edges pointing to them.
 * i.e., no Task -> Requirement IMPLEMENTS
 */
export async function unplannedRequirements(prisma: PrismaClient, args: {
  workspaceId: string;
}) {
  const implementedEdges = await prisma.edge.findMany({
    where: {
      workspaceId: args.workspaceId,
      type: 'IMPLEMENTS',
      fromType: 'TASK',
      toType: 'REQUIREMENT'
    },
    select: { toId: true }
  });

  const implementedRequirementIds = new Set(implementedEdges.map((e) => e.toId));

  const all = await prisma.requirement.findMany({
    where: { workspaceId: args.workspaceId },
    orderBy: { createdAt: 'asc' }
  });

  return all.filter((r) => !implementedRequirementIds.has(r.id));
}

/**
 * “Missing evidence” = requirements that have NO PROVIDES_EVIDENCE_FOR edges pointing to them.
 * i.e., no Evidence -> Requirement PROVIDES_EVIDENCE_FOR
 */
export async function requirementsMissingEvidence(prisma: PrismaClient, args: {
  workspaceId: string;
}) {
  const evidenceEdges = await prisma.edge.findMany({
    where: {
      workspaceId: args.workspaceId,
      type: 'PROVIDES_EVIDENCE_FOR',
      fromType: 'EVIDENCE',
      toType: 'REQUIREMENT'
    },
    select: { toId: true }
  });

  const evidencedRequirementIds = new Set(evidenceEdges.map((e) => e.toId));

  const all = await prisma.requirement.findMany({
    where: { workspaceId: args.workspaceId },
    orderBy: { createdAt: 'asc' }
  });

  return all.filter((r) => !evidencedRequirementIds.has(r.id));
}
