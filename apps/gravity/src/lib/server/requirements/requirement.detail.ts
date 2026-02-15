import type { PrismaClient } from '$lib/generated/prisma/client';

import type { AppError } from '$lib/validation/appError';
import { notFoundError, validationError } from '$lib/validation/appError';

type Ok<T> = { ok: true; data: T };
type Err = { ok: false; error: AppError };
type Result<T> = Ok<T> | Err;

export type RequirementDetail = {
  id: string;
  title: string;
  description: string | null; // Requirement.body
  status: string;
  priority: string;
  ownerId: string | null;
  owner: { id: string } | null; // minimal; expand later once we confirm User fields
  dueDate: Date | null;
  archivedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
};

export async function getRequirementDetail(
  prisma: PrismaClient,
  workspaceId: string,
  id: string
): Promise<Result<RequirementDetail>> {
  if (!id) {
    return { ok: false, error: validationError('Validation failed.', { id: 'Missing requirement id' }) };
  }

  const r = await prisma.requirement.findFirst({
    where: { id, workspaceId }, // ✅ workspace scoping
    select: {
      id: true,
      title: true,
      body: true,
      status: true,
      priority: true,
      ownerId: true,
      owner: { select: { id: true } },
      dueDate: true,
      archivedAt: true,
      createdAt: true,
      updatedAt: true
    }
  });

  if (!r) return { ok: false, error: notFoundError('Requirement not found.') };

  return {
    ok: true,
    data: {
      id: r.id,
      title: r.title,
      description: r.body ?? null,
      status: r.status,
      priority: r.priority,
      ownerId: r.ownerId ?? null,
      owner: r.owner ?? null,
      dueDate: r.dueDate ?? null,
      archivedAt: r.archivedAt ?? null,
      createdAt: r.createdAt,
      updatedAt: r.updatedAt
    }
  };
}

/* -------------------------------------------------------------------------------------------------
 * Requirement detail page data (core + loop sections)
 * ------------------------------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------------------------------
 * Requirement detail page data (core + loop sections)
 * ------------------------------------------------------------------------------------------------- */

export type RelatedId = { id: string };

export type SourceSummary = {
  id: string;
  title: string;
  type: string; // SourceType enum at runtime (URL | PDF)
  url: string | null;
  createdAt: Date;
};

export type RequirementDetailPageData = RequirementDetail & {
  sources: SourceSummary[];
  tasks: RelatedId[];
  pages: RelatedId[];
  evidence: RelatedId[];
};

// Match schema.prisma enums
type EdgeRelType = 'DERIVED_FROM' | 'IMPLEMENTS' | 'DOCUMENTS' | 'PROVIDES_EVIDENCE_FOR';
type NodeType = 'REQUIREMENT' | 'SOURCE' | 'TASK' | 'PROJECT' | 'PAGE' | 'EVIDENCE';

function uniq(ids: string[]) {
  return Array.from(new Set(ids));
}

function pickIds(
  edges: Array<{ type: string; toType: string; toId: string }>,
  rel: EdgeRelType,
  toType: NodeType
) {
  return uniq(edges.filter((e) => e.type === rel && e.toType === toType).map((e) => e.toId));
}

/**
 * Page loader helper: Requirement core fields + related section data
 *
 * Assumes Edge model fields:
 * - workspaceId, type
 * - fromType, fromId
 * - toType, toId
 */
export async function getRequirementDetailPageData(
  prisma: PrismaClient,
  workspaceId: string,
  id: string
): Promise<Result<RequirementDetailPageData>> {
  const base = await getRequirementDetail(prisma, workspaceId, id);
  if (!base.ok) return base;

  const edges = await prisma.edge.findMany({
    where: {
      workspaceId,
      fromType: 'REQUIREMENT' as NodeType,
      fromId: id
    },
    select: {
      type: true,
      toType: true,
      toId: true
    }
  });

  const sourceIds = pickIds(edges, 'DERIVED_FROM', 'SOURCE');
  const taskIds = pickIds(edges, 'IMPLEMENTS', 'TASK');
  const pageIds = pickIds(edges, 'DOCUMENTS', 'PAGE');
  const evidenceIds = pickIds(edges, 'PROVIDES_EVIDENCE_FOR', 'EVIDENCE');

  const [sources, tasks, pages, evidence] = await Promise.all([
    sourceIds.length
      ? prisma.source.findMany({
          where: { workspaceId, id: { in: sourceIds } },
          select: { id: true, title: true, type: true, url: true, createdAt: true },
          orderBy: { createdAt: 'desc' }
        })
      : [],
    taskIds.length
      ? prisma.task.findMany({ where: { workspaceId, id: { in: taskIds } }, select: { id: true } })
      : [],
    pageIds.length
      ? prisma.page.findMany({ where: { workspaceId, id: { in: pageIds } }, select: { id: true } })
      : [],
    evidenceIds.length
      ? prisma.evidence.findMany({ where: { workspaceId, id: { in: evidenceIds } }, select: { id: true } })
      : []
  ]);

  return {
    ok: true,
    data: {
      ...base.data,
      sources,
      tasks,
      pages,
      evidence
    }
  };
}

