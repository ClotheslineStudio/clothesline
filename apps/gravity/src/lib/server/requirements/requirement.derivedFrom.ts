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

function readSourceId(
	input: unknown
): { ok: true; sourceId: string } | { ok: false; error: AppError } {
	const sourceIds =
		input &&
		typeof input === 'object' &&
		Array.isArray((input as { sourceIds?: unknown[] }).sourceIds)
			? (input as { sourceIds: unknown[] }).sourceIds
			: undefined;

	if (sourceIds) {
		if (sourceIds.length === 0) {
			return {
				ok: false,
				error: validationError('Please select at least one source.', {
					sourceIds: 'Please select a source to link.'
				})
			};
		}

		const first = sourceIds.find((value) => typeof value === 'string' && value.trim().length > 0);
		if (!first || typeof first !== 'string') {
			return {
				ok: false,
				error: validationError('Please select at least one source.', {
					sourceIds: 'Please select a source to link.'
				})
			};
		}

		return { ok: true, sourceId: first.trim() };
	}

	const parsed = LinkDerivedFromSchema.safeParse(input);
	if (!parsed.success) {
		return {
			ok: false,
			error: validationError('Please fix the highlighted fields.', toFieldErrors(parsed.error))
		};
	}

	return { ok: true, sourceId: parsed.data.sourceId };
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
		return {
			ok: false,
			error: validationError('Please fix the highlighted fields.', { id: 'Missing requirement id' })
		};
	}

	const parsedInput = readSourceId(input);
	if (!parsedInput.ok) {
		return { ok: false, error: parsedInput.error };
	}

	const { sourceId } = parsedInput;

	const [reqAnyWorkspace, srcAnyWorkspace] = await Promise.all([
		prisma.requirement.findUnique({
			where: { id: requirementId },
			select: { id: true, workspaceId: true }
		}),
		prisma.source.findUnique({ where: { id: sourceId }, select: { id: true, workspaceId: true } })
	]);

	if (!reqAnyWorkspace) return { ok: false, error: notFoundError('Requirement not found.') };
	if (reqAnyWorkspace.workspaceId !== workspaceId) {
		return {
			ok: false,
			error: validationError('Requirement is in a different workspace.', {
				sourceIds: 'Different workspace.'
			})
		};
	}

	if (!srcAnyWorkspace) return { ok: false, error: notFoundError('Source not found.') };
	if (srcAnyWorkspace.workspaceId !== workspaceId) {
		return {
			ok: false,
			error: validationError('Source is in a different workspace.', {
				sourceIds: 'Different workspace.'
			})
		};
	}

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

	if (existing) {
		return {
			ok: false,
			error: validationError('Already linked.', { sourceIds: 'This source is already linked.' })
		};
	}

	let edgeId: string;

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
		edgeId = createdEdge.id;
	} catch (e) {
		if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === 'P2002') {
			return {
				ok: false,
				error: validationError('Already linked.', { sourceIds: 'This source is already linked.' })
			};
		}

		console.error('[linkRequirementToSourceDerivedFrom] failed to create edge', e);
		return { ok: false, error: validationError('Unable to link source. Please try again.') };
	}

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

	const byId = new Map(sources.map((s) => [s.id, s]));
	const derivedSources = sourceIds.map((id) => byId.get(id)).filter(Boolean) as typeof sources;

	return { ok: true, data: { created: true, edge: { id: edgeId }, derivedSources } };
}
