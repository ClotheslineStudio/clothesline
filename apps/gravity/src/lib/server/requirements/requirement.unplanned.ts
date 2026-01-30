import type { PrismaClient } from '$lib/generated/prisma/client';
import { Prisma } from '$lib/generated/prisma/client';

import type { AppError } from '$lib/validation/appError';
import { validationError } from '$lib/validation/appError';

type Ok<T> = { ok: true; data: T };
type Err = { ok: false; error: AppError };
type Result<T> = Ok<T> | Err;

type RequirementRow = {
  id: string;
  workspaceId: string;
  title: string;
  body: string | null;
  status: string;
  priority: string;
  ownerId: string | null;
  dueDate: Date | null;
  archivedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
};

export type UnplannedRequirementsResponse = {
  items: RequirementRow[];
  limit: number;
  offset: number;
  nextOffset: number | null;
};

function csv(raw: string | null): string[] | undefined {
  if (!raw) return undefined;
  const vals = raw
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
  return vals.length ? vals : undefined;
}

function parseIntParam(raw: string | null, fallback: number): number {
  if (!raw) return fallback;
  const n = Number(raw);
  if (!Number.isFinite(n)) return fallback;
  return Math.trunc(n);
}

function parseDateParam(raw: string | null): Date | null | undefined {
  if (raw === null) return undefined;
  const v = raw.trim();
  if (!v) return undefined;

  // accept YYYY-MM-DD or full ISO
  const isYMD = /^\d{4}-\d{2}-\d{2}$/.test(v);
  const d = isYMD ? new Date(`${v}T12:00:00.000Z`) : new Date(v);
  if (Number.isNaN(d.getTime())) return null; // explicit invalid
  return d;
}

export async function getUnplannedRequirements(
  prisma: PrismaClient,
  url: URL
): Promise<Result<UnplannedRequirementsResponse>> {
  const workspaceId = url.searchParams.get('workspaceId') ?? 'ws_demo';

  const status = csv(url.searchParams.get('status'));
  const priority = csv(url.searchParams.get('priority'));
  const ownerId = url.searchParams.get('ownerId')?.trim() || undefined;

  const dueAfter = parseDateParam(url.searchParams.get('dueAfter'));
  if (dueAfter === null) {
    return { ok: false, error: validationError('Validation failed.', { dueAfter: 'Invalid date format' }) };
  }
  const dueBefore = parseDateParam(url.searchParams.get('dueBefore'));
  if (dueBefore === null) {
    return { ok: false, error: validationError('Validation failed.', { dueBefore: 'Invalid date format' }) };
  }

  const includeArchived = (url.searchParams.get('includeArchived') ?? '').toLowerCase() === 'true';

  const limitRaw = parseIntParam(url.searchParams.get('limit'), 50);
  const offsetRaw = parseIntParam(url.searchParams.get('offset'), 0);

  const limit = Math.max(1, Math.min(limitRaw, 100)); // hard cap guardrail
  const offset = Math.max(0, offsetRaw);

  // Build WHERE fragments safely
  const whereParts: Prisma.Sql[] = [
    Prisma.sql`r."workspaceId" = ${workspaceId}`,
    Prisma.sql`NOT EXISTS (
      SELECT 1
      FROM "Edge" e
      WHERE e."workspaceId" = r."workspaceId"
        AND e."type" = 'IMPLEMENTS'
        AND e."fromType" = 'TASK'
        AND e."toType" = 'REQUIREMENT'
        AND e."toId" = r."id"
    )`
  ];

  if (!includeArchived) whereParts.push(Prisma.sql`r."archivedAt" IS NULL`);
  if (status?.length) whereParts.push(Prisma.sql`r."status" IN (${Prisma.join(status)})`);
  if (priority?.length) whereParts.push(Prisma.sql`r."priority" IN (${Prisma.join(priority)})`);
  if (ownerId) whereParts.push(Prisma.sql`r."ownerId" = ${ownerId}`);
  if (dueAfter) whereParts.push(Prisma.sql`r."dueDate" >= ${dueAfter}`);
  if (dueBefore) whereParts.push(Prisma.sql`r."dueDate" <= ${dueBefore}`);

  // Fetch limit+1 to determine nextOffset without COUNT
  const q = Prisma.sql`
    SELECT
      r."id",
      r."workspaceId",
      r."title",
      r."body",
      r."status",
      r."priority",
      r."ownerId",
      r."dueDate",
      r."archivedAt",
      r."createdAt",
      r."updatedAt"
    FROM "Requirement" r
    WHERE ${Prisma.join(whereParts, ' AND ')}
    ORDER BY r."createdAt" DESC
    LIMIT ${limit + 1}
    OFFSET ${offset}
  `;

  const rows = await prisma.$queryRaw<RequirementRow[]>(q);

  const hasMore = rows.length > limit;
  const items = hasMore ? rows.slice(0, limit) : rows;
  const nextOffset = hasMore ? offset + limit : null;

  return { ok: true, data: { items, limit, offset, nextOffset } };
}
