import type { PrismaClient } from '$lib/generated/prisma/client';

import type { AppError } from '$lib/validation/appError';
import { notFoundError, validationError } from '$lib/validation/appError';

type Ok<T> = { ok: true; data: T };
type Err = { ok: false; error: AppError };
type Result<T> = Ok<T> | Err;

type SourceMini = { id: string; title: string; type: string; createdAt: Date };
type TaskMini = { id: string; title: string; type: 'TASK'; createdAt: Date };
type PageMini = { id: string; title: string; type: 'PAGE'; createdAt: Date };
type EvidenceMini = { id: string; title: string; type: string; createdAt: Date };

export type RequirementRelated = {
  sources: SourceMini[];
  tasks: TaskMini[];
  pages: PageMini[];
  evidence: EvidenceMini[];
};

function reorderById<T extends { id: string }>(rows: T[], ids: string[]): T[] {
  const byId = new Map(rows.map((r) => [r.id, r]));
  return ids.map((id) => byId.get(id)).filter(Boolean) as T[];
}

export async function getRequirementRelated(
  prisma: PrismaClient,
  workspaceId: string,
  requirementId: string
): Promise<Result<RequirementRelated>> {
  if (!requirementId) {
    return { ok: false, error: validationError('Validation failed.', { id: 'Missing requirement id' }) };
  }

  // Requirement must exist in workspace (archived is allowed; detail page might show it)
  const req = await prisma.requirement.findFirst({
    where: { id: requirementId, workspaceId },
    select: { id: true }
  });
  if (!req) return { ok: false, error: notFoundError('Requirement not found.') };

  // ---- Derived Sources (Requirement -> Source)
  const sourceEdges = await prisma.edge.findMany({
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
  const sourceIds = sourceEdges.map((e) => e.toId);

  const sourcesRaw =
    sourceIds.length > 0
      ? await prisma.source.findMany({
          where: { workspaceId, id: { in: sourceIds } },
          select: { id: true, title: true, type: true, createdAt: true }
        })
      : [];
  const sources = reorderById(sourcesRaw, sourceIds).map((s) => ({
    id: s.id,
    title: s.title,
    type: s.type,
    createdAt: s.createdAt
  }));

  // ---- Implementing Tasks (Task -> Requirement)
  const taskEdges = await prisma.edge.findMany({
    where: {
      workspaceId,
      type: 'IMPLEMENTS',
      fromType: 'TASK',
      toType: 'REQUIREMENT',
      toId: requirementId
    },
    orderBy: { createdAt: 'desc' },
    select: { fromId: true }
  });
  const taskIds = taskEdges.map((e) => e.fromId);

  const tasksRaw =
    taskIds.length > 0
      ? await prisma.task.findMany({
          where: { workspaceId, id: { in: taskIds } },
          select: { id: true, title: true, createdAt: true }
        })
      : [];
  const tasks = reorderById(tasksRaw, taskIds).map((t) => ({
    id: t.id,
    title: t.title,
    type: 'TASK' as const,
    createdAt: t.createdAt
  }));

  // ---- Documentation Pages (Page -> Requirement)
  const pageEdges = await prisma.edge.findMany({
    where: {
      workspaceId,
      type: 'DOCUMENTS',
      fromType: 'PAGE',
      toType: 'REQUIREMENT',
      toId: requirementId
    },
    orderBy: { createdAt: 'desc' },
    select: { fromId: true }
  });
  const pageIds = pageEdges.map((e) => e.fromId);

  const pagesRaw =
    pageIds.length > 0
      ? await prisma.page.findMany({
          where: { workspaceId, id: { in: pageIds } },
          select: { id: true, title: true, createdAt: true }
        })
      : [];
  const pages = reorderById(pagesRaw, pageIds).map((p) => ({
    id: p.id,
    title: p.title,
    type: 'PAGE' as const,
    createdAt: p.createdAt
  }));

  // ---- Evidence (Evidence -> Requirement)
  const evidenceEdges = await prisma.edge.findMany({
    where: {
      workspaceId,
      type: 'PROVIDES_EVIDENCE_FOR',
      fromType: 'EVIDENCE',
      toType: 'REQUIREMENT',
      toId: requirementId
    },
    orderBy: { createdAt: 'desc' },
    select: { fromId: true }
  });
  const evidenceIds = evidenceEdges.map((e) => e.fromId);

  const evidenceRaw =
    evidenceIds.length > 0
      ? await prisma.evidence.findMany({
          where: { workspaceId, id: { in: evidenceIds } },
          select: { id: true, title: true, type: true, createdAt: true }
        })
      : [];
  const evidence = reorderById(evidenceRaw, evidenceIds).map((ev) => ({
    id: ev.id,
    title: ev.title,
    type: ev.type,
    createdAt: ev.createdAt
  }));

  return { ok: true, data: { sources, tasks, pages, evidence } };
}
