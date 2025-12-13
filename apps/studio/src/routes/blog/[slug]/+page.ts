import { error } from '@sveltejs/kit';

export async function load({ params }) {
  const { slug } = params;

  try {
    const post = await import(`../../../lib/content/blog/${slug}.md`);
    return {
      content: post.default,
      metadata: post.metadata
    };
  } catch {
    throw error(404, `Project not found: ${slug}`);
  }
}
