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
