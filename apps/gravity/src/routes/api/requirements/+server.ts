import { prisma } from '$lib/server/prisma';
import { ok, badRequest } from '$lib/server/http';
import { createRequirement } from '$lib/server/requirements/requirement.server';

const ws = (url: URL) => url.searchParams.get('workspaceId') ?? 'ws_demo';

const STATUS = new Set(['DRAFT', 'ACTIVE', 'BLOCKED', 'DONE']);
const PRIORITY = new Set(['LOW', 'MEDIUM', 'HIGH', 'CRITICAL']);

interface ErrorResponse {
  message: string;
}

function parseIntSafe(v: string | null, fallback: number) {
  const n = Number.parseInt(v ?? '', 10);
  return Number.isFinite(n) ? n : fallback;
}

function parseDateParam(v: string | null) {
  if (!v) return null;
  const d = new Date(v);
  return Number.isNaN(d.getTime()) ? null : d;
}

export async function GET({ url }: { url: URL }) {
  const workspaceId = ws(url);

  const view = url.searchParams.get('view')?.trim() || 'all';

  const status = url.searchParams.get('status')?.trim() || null;
  const priority = url.searchParams.get('priority')?.trim() || null;
  const ownerId = url.searchParams.get('ownerId')?.trim() || null;

  const dueAfterRaw = url.searchParams.get('dueAfter');
  const dueBeforeRaw = url.searchParams.get('dueBefore');

  const limit = Math.min(Math.max(parseIntSafe(url.searchParams.get('limit'), 50), 1), 200);
  const offset = Math.max(parseIntSafe(url.searchParams.get('offset'), 0), 0);

  const dueAfter = parseDateParam(dueAfterRaw);
  const dueBefore = parseDateParam(dueBeforeRaw);

  if (dueAfterRaw && !dueAfter) {
    return badRequest({ message: 'Invalid dueAfter date.' } as ErrorResponse);
  }
  if (dueBeforeRaw && !dueBefore) {
    return badRequest({ message: 'Invalid dueBefore date.' } as ErrorResponse);
  }

  // Base where (match your list behavior: workspace-scoped, not archived)
  const where: Record<string, unknown> = {
    workspaceId,
    archivedAt: null
  };

  if (status && STATUS.has(status)) where.status = status;
  if (priority && PRIORITY.has(priority)) where.priority = priority;
  if (ownerId) where.ownerId = ownerId;

  if (dueAfter || dueBefore) {
    where.dueDate = {};
    const dueDateFilter = where.dueDate as Record<string, Date>;
    if (dueAfter) dueDateFilter.gte = dueAfter;
    if (dueBefore) dueDateFilter.lte = dueBefore;
  }

  // Needs planning = Requirements with NO implementing tasks
  if (view === 'needs-planning') {
    const planned = await prisma.edge.findMany({
      where: {
        workspaceId,
        type: 'IMPLEMENTS',
        fromType: 'REQUIREMENT',
        toType: 'TASK'
      },
      select: { fromId: true },
      distinct: ['fromId']
    });

    const plannedIds = planned.map((e) => e.fromId);

    // If there are planned requirements, exclude them. If none, all requirements are unplanned.
    if (plannedIds.length) {
      where.id = { notIn: plannedIds };
    }
  }

  const rows = await prisma.requirement.findMany({
    where,
    select: {
      id: true,
      title: true,
      status: true,
      priority: true,
      ownerId: true,
      owner: { select: { id: true, name: true, email: true } },
      dueDate: true,
      createdAt: true
    },
    orderBy: { createdAt: 'desc' },
    skip: offset,
    take: limit
  });

  const items = rows.map((r) => ({
    id: r.id,
    title: r.title,
    status: String(r.status),
    priority: String(r.priority),
    ownerId: r.ownerId ?? null,
    owner: r.owner
      ? { id: r.owner.id, name: r.owner.name ?? null, email: r.owner.email ?? null }
      : null,
    dueDate: r.dueDate ? r.dueDate.toISOString() : null,
    createdAt: r.createdAt.toISOString()
  }));

  const nextOffset = items.length === limit ? offset + limit : null;

  return ok(
    {
      ok: true,
      items,
      limit,
      offset,
      nextOffset
    },
    200
  );
}

export async function POST({ request, url }: { request: Request; url: URL }) {
  const input = await request.json().catch(() => ({}));
  const res = await createRequirement(prisma, ws(url), input);

  if (!res.ok) return badRequest(res.error);

  return ok({ id: res.data.id }, 200);
}




