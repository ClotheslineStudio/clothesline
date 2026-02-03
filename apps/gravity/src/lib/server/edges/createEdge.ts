import type { PrismaClient, EdgeType, EntityType } from '$lib/generated/prisma/client';
import { assertValidEdge } from './validateEdge';

export type CreateEdgeInput = {
  workspaceId: string;
  type: EdgeType;
  fromType: EntityType;
  fromId: string;
  toType: EntityType;
  toId: string;
};

export async function createEdge(prisma: PrismaClient, input: CreateEdgeInput) {
  // Enforce rules BEFORE writing
  assertValidEdge({
    type: input.type,
    fromType: input.fromType,
    toType: input.toType,
    fromId: input.fromId,
    toId: input.toId
  });

  return prisma.edge.create({ data: input });
}
