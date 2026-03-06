import { error } from '@sveltejs/kit';
import { docsBySlug } from '$lib/docs/registry';
import { highlightCode } from '$lib/server/highlight';

export async function load({ params }) {
  const item = docsBySlug.get(params.slug);
  if (!item || item.slug === 'introduction') {
    throw error(404, 'Component page not found');
  }

  const highlightedCode = await highlightCode(item.code, 'svelte');

  return { item, highlightedCode };
}

