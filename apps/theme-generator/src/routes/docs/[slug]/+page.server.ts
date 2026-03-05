import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { getDocBySlug, getDocsNav } from '$lib/docs/content';

export const load: PageServerLoad = async ({ params }) => {
  const doc = getDocBySlug(params.slug);
  if (!doc) throw error(404, 'Document not found');

  const nav = getDocsNav();
  const index = nav.findIndex((item) => item.slug === doc.slug);
  const prev = index > 0 ? nav[index - 1] : null;
  const next = index >= 0 && index < nav.length - 1 ? nav[index + 1] : null;

  return { doc, prev, next };
};
