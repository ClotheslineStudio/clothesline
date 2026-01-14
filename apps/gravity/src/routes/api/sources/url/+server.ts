import { prisma } from '$lib/server/prisma';

/**
 * Validates URL format for v1.
 * - Requires http/https
 * - Returns a normalized URL string (URL.href)
 */
function validateAndNormalizeUrl(input: string): string {
  const raw = (input ?? '').trim();

  if (!raw) {
    throw new Error('URL is required.');
  }

  let parsed: URL;
  try {
    parsed = new URL(raw);
  } catch {
    throw new Error('Invalid URL format. Include https:// (or http://).');
  }

  if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') {
    throw new Error('URL must start with http:// or https://');
  }

  return parsed.href;
}

type PostBody = {
  workspaceId?: string;
  title?: string;
  url?: string;
};

export async function POST({ request }) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return new Response('Request body must be valid JSON.', { status: 400 });
  }

  const { workspaceId = '', title = '', url = '' } = body as PostBody;
  const workspaceIdTrimmed = workspaceId.trim();
  const titleTrimmed = title.trim();
  const urlInput = url.trim();

  if (!workspaceIdTrimmed) {
    return new Response('workspaceId is required.', { status: 400 });
  }

  // v1: title is required (per your note)
  if (!titleTrimmed) {
    return new Response('title is required for v1.', { status: 400 });
  }

  let normalizedUrl: string;
  try {
    normalizedUrl = validateAndNormalizeUrl(urlInput);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Invalid URL.';
    return new Response(message, { status: 400 });
  }

  try {
    const source = await prisma.source.create({
      data: {
        workspaceId: workspaceIdTrimmed,
        title: titleTrimmed,
        type: 'URL',
        url: normalizedUrl,

        // Ensure file fields are null for URL Sources
        fileStorageKey: null,
        fileOriginalName: null,
        fileMimeType: null,
        fileSizeBytes: null,

        notes: null
      }
    });

    return Response.json(source);
  } catch (err) {
    // Keep error mapping simple for v1; expand later
    console.error('[POST /api/sources/url] db create failed', err);
    return new Response('Failed to create Source.', { status: 500 });
  }
}
