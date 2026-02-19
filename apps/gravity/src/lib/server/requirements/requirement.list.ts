import type { PrismaClient } from '$lib/generated/prisma/client';
import type { AppError } from '$lib/validation/appError';
import { validationError } from '$lib/validation/appError';

type Ok<T> = { ok: true; data: T };
type Err = { ok: false; error: AppError };
type Result<T> = Ok<T> | Err;

type OwnerMini = { id: string; name?: string | null; email?: string | null };

export type RequirementListItem = {
  id: string;
  title: string;
  status: string;
  priority: string;
  ownerId: string | null;
  owner?: OwnerMini | null;
  dueDate: string | null;
  createdAt: string;
};

export type RequirementListResponse = {
  ok: true;
  items: RequirementListItem[];
  limit: number;
  offset: number;
  nextOffset: number | null;
};

function asInt(v: unknown, fallback: number) {
  const n = Number(v);
  return Number.isFinite(n) && n >= 0 ? Math.floor(n) : fallback;
}

function asStr(v: unknown): string | null {
  if (typeof v !== 'string') return null;
  const t = v.trim();
  return t.length ? t : null;
}

export async function listRequirements(
  prisma: PrismaClient,
  workspaceId: string,
  raw: Record<string, string>
): Promise<Result<RequirementListResponse>> {
  if (!workspaceId) {
    return { ok: false, error: validationError('Validation failed.', { workspaceId: 'Missing workspaceId' }) };
  }

  const view = asStr(raw.view); // 'needs-planning' | null

  const status = asStr(raw.status);
  const priority = asStr(raw.priority);
  const ownerId = asStr(raw.ownerId);

  const dueAfter = asStr(raw.dueAfter);
  const dueBefore = asStr(raw.dueBefore);

  const limit = asInt(raw.limit, 50);
  const offset = asInt(raw.offset, 0);

  // Base where
  const where: Record<string, unknown> = {
    workspaceId,
    archivedAt: null
  };

  if (status) where.status = status;
  if (priority) where.priority = priority;
  if (ownerId) where.ownerId = ownerId;

  if (dueAfter || dueBefore) {
    where.dueDate = {};
    if (dueAfter) (where.dueDate as Record<string, unknown>).gte = new Date(dueAfter);
    if (dueBefore) (where.dueDate as Record<string, unknown>).lte = new Date(dueBefore);
  }

  // ✅ Needs planning = Requirements with NO implementing tasks
  if (view === 'needs-planning') {
    const edges = await prisma.edge.findMany({
      where: {
        workspaceId,
        type: 'IMPLEMENTS',
        OR: [
          // Task -> Requirement (most common)
          { toType: 'REQUIREMENT' },
          // Requirement -> Task (if you modeled it the other way)
          { fromType: 'REQUIREMENT' }
        ]
      },
      select: { fromType: true, fromId: true, toType: true, toId: true }
    });

    const plannedReqIds = new Set<string>();
    for (const e of edges) {
      if (e.toType === 'REQUIREMENT') plannedReqIds.add(e.toId);
      if (e.fromType === 'REQUIREMENT') plannedReqIds.add(e.fromId);
    }

    where.id = { notIn: Array.from(plannedReqIds) };
  }

  const rows = await prisma.requirement.findMany({
    where,
    orderBy: { createdAt: 'desc' },
    skip: offset,
    take: limit + 1,
    select: {
      id: true,
      title: true,
      status: true,
      priority: true,
      ownerId: true,
      owner: { select: { id: true, name: true, email: true } },
      dueDate: true,
      createdAt: true
    }
  });

  const hasMore = rows.length > limit;
  const sliced = hasMore ? rows.slice(0, limit) : rows;

  return {
    ok: true,
    data: {
      ok: true,
      items: sliced.map((r) => ({
        id: r.id,
        title: r.title,
        status: String(r.status),
        priority: String(r.priority),
        ownerId: r.ownerId ?? null,
        owner: r.owner ?? null,
        dueDate: r.dueDate ? r.dueDate.toISOString() : null,
        createdAt: r.createdAt.toISOString()
      })),
      limit,
      offset,
      nextOffset: hasMore ? offset + limit : null
    }
  };
}

