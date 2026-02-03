import { prisma } from '$lib/server/prisma';
import { getSourceFile } from '$lib/server/storage';
import { Readable } from 'node:stream';

export async function GET({ params }: { params: { id: string } }) {
  const source = await prisma.source.findUnique({ where: { id: params.id } });

  if (!source || source.type !== 'PDF' || !source.fileStorageKey) {
    return new Response('Not found', { status: 404 });
  }

  const { stream } = await getSourceFile(source.fileStorageKey);

  // Convert Node stream to Web stream (avoids `any`)
  const body = Readable.toWeb(stream) as ReadableStream<Uint8Array>;

  return new Response(body, {
    headers: {
      'Content-Type': source.fileMimeType ?? 'application/pdf',
      'Content-Disposition': `inline; filename="${source.fileOriginalName ?? 'source.pdf'}"`
    }
  });
}

