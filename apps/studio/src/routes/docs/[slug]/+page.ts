import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import type { ComponentType } from 'svelte';

const docs = import.meta.glob('/src/lib/content/docs/*.md');

export const load: PageLoad = async ({ params }) => {
  const { slug } = params;

  const match = Object.entries(docs).find(([path]) => path.includes(`/${slug}.md`));

  if (!match) {
    throw error(404, 'Document not found');
  }

  const [_, resolver] = match;
  const post = await resolver() as { default: ComponentType; metadata?: Record<string, any> };

  return {
    content: post.default as ComponentType,
    metadata: post.metadata ?? {}
  };
};







