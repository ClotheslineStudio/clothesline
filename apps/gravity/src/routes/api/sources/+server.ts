import { prisma } from '$lib/server/prisma';
import { MAX_SOURCE_FILE_BYTES } from '$lib/constants/uploads';
import { saveSourceFile } from '$lib/server/storage';

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


