import { prisma } from '$lib/server/prisma';
import { MAX_SOURCE_FILE_BYTES } from '$lib/constants/uploads';
import { saveSourceFile } from '$lib/server/storage';

const DEFAULT_LIMIT = 50;
const MAX_LIMIT = 200;

function parseLimit(value: string | null): number {
  if (!value) return DEFAULT_LIMIT;
  const n = Number(value);
  if (!Number.isFinite(n) || n <= 0) return DEFAULT_LIMIT;
  return Math.min(Math.floor(n), MAX_LIMIT);
}

function parseType(value: string | null): 'PDF' | 'URL' | null {
  if (!value) return null;
  return value === 'PDF' || value === 'URL' ? value : null;
}

/**
 * GET /api/sources?workspaceId=...&type=PDF|URL&limit=50
 */
export async function GET({ url }) {
  const workspaceId = url.searchParams.get('workspaceId')?.trim();
  if (!workspaceId) {
    return new Response('workspaceId is required.', { status: 400 });
  }

  const typeRaw = url.searchParams.get('type');
  const type = parseType(typeRaw);
  if (typeRaw && !type) {
    return new Response('type must be PDF or URL.', { status: 400 });
  }

  const limit = parseLimit(url.searchParams.get('limit'));

  const sources = await prisma.source.findMany({
    where: {
      workspaceId,
      ...(type ? { type } : {})
    },
    orderBy: { createdAt: 'desc' },
    take: limit
  });

  return Response.json({
    workspaceId,
    count: sources.length,
    limit,
    type,
    sources
  });
}

export async function POST({ request }) {
  const form = await request.formData();
  const workspaceId = String(form.get('workspaceId') ?? '').trim();
  const title = String(form.get('title') ?? '').trim();

  if (!workspaceId) return new Response('Missing workspaceId', { status: 400 });

  const file = form.get('file');
  if (!(file instanceof File)) return new Response('Missing file', { status: 400 });

  if (file.size > MAX_SOURCE_FILE_BYTES) return new Response('File too large', { status: 413 });
  if (file.type !== 'application/pdf') return new Response('Only PDFs are supported', { status: 415 });

  const stored = await saveSourceFile(file);

  const source = await prisma.source.create({
    data: {
      workspaceId,
      title: title || stored.originalName,
      type: 'PDF',
      url: null,

      fileStorageKey: stored.storageKey,
      fileOriginalName: stored.originalName,
      fileMimeType: stored.mimeType,
      fileSizeBytes: stored.sizeBytes
    }
  });

  return Response.json(source);
}



