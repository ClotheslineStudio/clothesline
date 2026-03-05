import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { getDocsNav } from '$lib/docs/content';

export const load: PageServerLoad = async () => {
  const docs = getDocsNav();
  if (docs.length > 0) {
    throw redirect(307, `/docs/${docs[0].slug}`);
  }
  return {};
};
