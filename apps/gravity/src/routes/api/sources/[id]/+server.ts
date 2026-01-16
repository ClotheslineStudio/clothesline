import { prisma } from '$lib/server/prisma';

export async function GET({ params, url }) {
  const workspaceId = url.searchParams.get('workspaceId')?.trim();
  if (!workspaceId) {
    return new Response('workspaceId is required.', { status: 400 });
  }

  const id = params.id?.trim();
  if (!id) {
    return new Response('Source id is required.', { status: 400 });
  }

  // Scope by workspace + id to prevent cross-workspace access.
  const source = await prisma.source.findFirst({
    where: { id, workspaceId }
  });

  if (!source) {
    return new Response('Not found', { status: 404 });
  }

  // Includes:
  // - basic metadata: id, workspaceId, title, type, notes, createdAt, updatedAt
  // - url for URL sources
  // - file* fields for PDF sources
  return Response.json(source);
}
