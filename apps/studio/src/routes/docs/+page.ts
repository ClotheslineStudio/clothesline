import type { PageLoad } from './$types';

export const load = (async () => {
  // Use the $lib alias so this works regardless of cwd
  const modules = import.meta.glob('$lib/content/docs/*.md', { eager: true });

  const docs = Object.entries(modules)
    .map(([path, module]: [string, any]) => {
      const slug = path.split('/').pop()?.replace('.md', '');

      if (!slug) return null;

      const title = module.metadata?.title ?? slug;

      return { slug, title };
    })
    .filter((doc): doc is { slug: string; title: string } => doc !== null)
    .sort((a, b) => a.title.localeCompare(b.title));

  return { docs };
}) satisfies PageLoad;


