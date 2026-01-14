import { MAX_SOURCE_FILE_BYTES } from '$lib/constants/uploads';
import { saveSourceFile } from '$lib/server/storage';

export async function POST({ request }) {
  const form = await request.formData();
  const file = form.get('file');

  if (!(file instanceof File)) {
    return new Response('Missing file', { status: 400 });
  }

  if (file.size > MAX_SOURCE_FILE_BYTES) {
    return new Response('File too large', { status: 413 });
  }

  // If you want PDF-only right now:
  if (file.type !== 'application/pdf') {
    return new Response('Only PDFs are supported', { status: 415 });
  }

  const stored = await saveSourceFile(file);
  return Response.json(stored);
}
