import type { PrismaClient } from '$lib/generated/prisma/client';
import { Prisma } from '$lib/generated/prisma/client';
import type { ZodError } from 'zod';

import type { AppError } from '$lib/validation/appError';
import { notFoundError, validationError } from '$lib/validation/appError';
import { LinkDerivedFromSchema } from '$lib/validation/edges';

type Ok<T> = { ok: true; data: T };
type Err = { ok: false; error: AppError };
type Result<T> = Ok<T> | Err;

function toFieldErrors(zodError: ZodError): Record<string, string> {
  const out: Record<string, string> = {};
  const issues = zodError.issues ?? [];
  for (const i of issues) {
    const key = Array.isArray(i.path) && i.path.length ? String(i.path[0]) : 'form';
    if (!out[key]) out[key] = i.message;
  }
  return out;
}

export async function linkRequirementToSourceDerivedFrom(
  prisma: PrismaClient,
  workspaceId: string,
  requirementId: string,
  input: unknown
): Promise<
  Result<{
    created: boolean;
    edge: { id: string };
    derivedSources: Array<{
      id: string;
      title: string;
      type: string;
      url: string | null;
      createdAt: Date;
      updatedAt: Date;
    }>;
  }>
> {
  if (!requirementId) {
    return { ok: false, error: validationError('Validation failed.', { id: 'Missing requirement id' }) };
  }

  const parsed = LinkDerivedFromSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, error: validationError('Validation failed.', toFieldErrors(parsed.error)) };
  }

  const { sourceId } = parsed.data;

  // 1) Workspace consistency check (mismatch treated as not-found)
  const [req, src] = await Promise.all([
    prisma.requirement.findFirst({
      where: { id: requirementId, workspaceId },
      select: { id: true }
    }),
    prisma.source.findFirst({
      where: { id: sourceId, workspaceId },
      select: { id: true }
    })
  ]);

  if (!req) return { ok: false, error: notFoundError('Requirement not found.') };
  if (!src) return { ok: false, error: notFoundError('Source not found.') };

  // 2) Idempotent dedupe: return existing edge if present
  const existing = await prisma.edge.findFirst({
    where: {
      workspaceId,
      type: 'DERIVED_FROM',
      fromType: 'REQUIREMENT',
      fromId: requirementId,
      toType: 'SOURCE',
      toId: sourceId
    },
    select: { id: true }
  });

  let created = false;
  let edgeId: string;

  if (existing) {
    edgeId = existing.id;
  } else {
    try {
      const createdEdge = await prisma.edge.create({
        data: {
          workspaceId,
          type: 'DERIVED_FROM',
          fromType: 'REQUIREMENT',
          fromId: requirementId,
          toType: 'SOURCE',
          toId: sourceId
        },
        select: { id: true }
      });
      created = true;
      edgeId = createdEdge.id;
    } catch (e) {
      // Defensive: if two requests race, unique constraint may trigger.
      // Treat as idempotent success: load the edge and continue.
      if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === 'P2002') {
        const again = await prisma.edge.findFirst({
          where: {
            workspaceId,
            type: 'DERIVED_FROM',
            fromType: 'REQUIREMENT',
            fromId: requirementId,
            toType: 'SOURCE',
            toId: sourceId
          },
          select: { id: true }
        });

        if (!again) {
          return { ok: false, error: validationError('Failed to create edge.', { form: 'Duplicate edge conflict.' }) };
        }

        edgeId = again.id;
      } else {
        throw e;
      }
    }
  }

  // 3) Return updated list of derived sources (Sources linked via DERIVED_FROM)
  const edges = await prisma.edge.findMany({
    where: {
      workspaceId,
      type: 'DERIVED_FROM',
      fromType: 'REQUIREMENT',
      fromId: requirementId,
      toType: 'SOURCE'
    },
    orderBy: { createdAt: 'desc' },
    select: { toId: true }
  });

  const sourceIds = edges.map((x) => x.toId);
  const sources = sourceIds.length
    ? await prisma.source.findMany({
        where: { workspaceId, id: { in: sourceIds } },
        select: { id: true, title: true, type: true, url: true, createdAt: true, updatedAt: true }
      })
    : [];

  // Preserve edge order
  const byId = new Map(sources.map((s) => [s.id, s]));
  const derivedSources = sourceIds.map((id) => byId.get(id)).filter(Boolean) as typeof sources;

  return { ok: true, data: { created, edge: { id: edgeId }, derivedSources } };
}
