import { prisma } from '$lib/server/prisma';
import { saveSourceFile } from '$lib/server/storage';
import { validatePdfFile } from '$lib/validation/sources';

const DEFAULT_LIMIT = 50;
const MAX_LIMIT = 200;

type ApiErrorCode = 'VALIDATION' | 'STORAGE' | 'DB';

function jsonError(status: number, code: ApiErrorCode, message: string) {
  return Response.json(
    {
      ok: false,
      error: { code, message }
    },
    { status }
  );
}

function jsonOk(payload: Record<string, unknown>) {
  return Response.json({ ok: true, ...payload });
}

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
    return jsonError(400, 'VALIDATION', 'workspaceId is required.');
  }

  const typeRaw = url.searchParams.get('type');
  const type = parseType(typeRaw);
  if (typeRaw && !type) {
    return jsonError(400, 'VALIDATION', 'type must be PDF or URL.');
  }

  const limit = parseLimit(url.searchParams.get('limit'));

  try {
    const sources = await prisma.source.findMany({
      where: {
        workspaceId,
        ...(type ? { type } : {})
      },
      orderBy: { createdAt: 'desc' },
      take: limit
    });

    return jsonOk({
      workspaceId,
      count: sources.length,
      limit,
      type,
      sources
    });
  } catch (err) {
    console.error('[GET /api/sources] query failed', err);
    return jsonError(500, 'DB', 'Failed to load Sources.');
  }
}

/**
 * POST /api/sources (PDF upload)
 * form-data: workspaceId, title?, file
 */
export async function POST({ request }) {
  let form: FormData;

  try {
    form = await request.formData();
  } catch (err) {
    console.error('[POST /api/sources] formData parse failed', err);
    return jsonError(400, 'VALIDATION', 'Request must be multipart form-data.');
  }

  const workspaceId = String(form.get('workspaceId') ?? '').trim();
  const title = String(form.get('title') ?? '').trim();

  if (!workspaceId) return jsonError(400, 'VALIDATION', 'workspaceId is required.');

  const file = form.get('file');
  if (!(file instanceof File)) return jsonError(400, 'VALIDATION', 'file is required.');

  // Server-side guardrails
   const v = validatePdfFile(file);
  if (!v.ok) {
    const status = v.code === 'PAYLOAD_TOO_LARGE' ? 413 : 415;
    return jsonError(status, 'VALIDATION', v.message);
  }


  // Store file
  let stored: { storageKey: string; originalName: string; mimeType: string; sizeBytes: number };
  try {
    stored = await saveSourceFile(file);
  } catch (err) {
    console.error('[POST /api/sources] storage save failed', err);
    return jsonError(500, 'STORAGE', 'Failed to store uploaded file.');
  }

  // Create DB record
  try {
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

    return jsonOk({ source });
  } catch (err) {
    console.error('[POST /api/sources] db create failed', err);
    return jsonError(500, 'DB', 'Failed to create Source record.');
  }
}


