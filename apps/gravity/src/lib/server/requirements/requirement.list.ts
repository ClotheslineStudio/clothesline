import type { PrismaClient } from '$lib/generated/prisma/client';
import { Prisma, RequirementStatus, RequirementPriority } from '$lib/generated/prisma/client';

import type { AppError } from '$lib/validation/appError';
import { validationError } from '$lib/validation/appError';

import {
  RequirementListQuerySchema,
  normalizeQueryDate,
  type RequirementListQuery
} from '$lib/validation/requirements.list';

type Ok<T> = { ok: true; data: T };
type Err = { ok: false; error: AppError };
type Result<T> = Ok<T> | Err;

function toFieldErrors(zodError: unknown): Record<string, string> {
  const out: Record<string, string> = {};
  const issues = (zodError as { issues?: Array<{ path: unknown[]; message: string }> })?.issues ?? [];
  for (const i of issues) {
    const key = Array.isArray(i.path) && i.path.length ? String(i.path[0]) : 'form';
    if (!out[key]) out[key] = i.message;
  }
  return out;
}

export async function listRequirements(
  prisma: PrismaClient,
  workspaceId: string,
  raw: Record<string, string>
): Promise<
  Result<{
    items: Array<{
      id: string;
      workspaceId: string;
      title: string;
      body: string | null;
      status: RequirementStatus;
      priority: RequirementPriority;
      ownerId: string | null;
      dueDate: Date | null;
      archivedAt: Date | null;
      createdAt: Date;
      updatedAt: Date;
    }>;
    limit: number;
    offset: number;
    nextOffset: number | null;
  }>
> {
  const parsed = RequirementListQuerySchema.safeParse(raw);
  if (!parsed.success) {
    return { ok: false, error: validationError('Validation failed.', toFieldErrors(parsed.error)) };
  }

  const q: RequirementListQuery = parsed.data;

  const dueAfter = normalizeQueryDate(q.dueAfter);
  const dueBefore = normalizeQueryDate(q.dueBefore);

  const where: Prisma.RequirementWhereInput = { workspaceId };

  if (!q.includeArchived) where.archivedAt = null;

  if (q.status?.length) where.status = { in: q.status.map(s => RequirementStatus[s as keyof typeof RequirementStatus]) };
  if (q.priority?.length) where.priority = { in: q.priority.map(p => RequirementPriority[p as keyof typeof RequirementPriority]) };
  if (q.ownerId) where.ownerId = q.ownerId;

  if (dueAfter || dueBefore) {
    where.dueDate = {
      ...(dueAfter ? { gte: dueAfter } : {}),
      ...(dueBefore ? { lte: dueBefore } : {})
    };
  }

  const dir: Prisma.SortOrder = q.dir;

  const orderBy: Prisma.RequirementOrderByWithRelationInput[] =
    q.sort === 'createdAt'
      ? [{ createdAt: dir }, { id: dir }]
      : q.sort === 'dueDate'
        ? [{ dueDate: dir }, { id: dir }]
        : q.sort === 'priority'
          ? [{ priority: dir }, { id: dir }]
          : [{ status: dir }, { id: dir }];

  const items = await prisma.requirement.findMany({
    where,
    orderBy,
    take: q.limit,
    skip: q.offset,
    select: {
      id: true,
      workspaceId: true,
      title: true,
      body: true,
      status: true,
      priority: true,
      ownerId: true,
      dueDate: true,
      archivedAt: true,
      createdAt: true,
      updatedAt: true
    }
  });

  const nextOffset = items.length === q.limit ? q.offset + items.length : null;

  return { ok: true, data: { items, limit: q.limit, offset: q.offset, nextOffset } };
}
