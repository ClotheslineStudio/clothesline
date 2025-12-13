import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async () => {
  const modules = import.meta.glob('/src/lib/content/docs/*.md', { eager: true });

  const docs = Object.entries(modules).map(([path, module]: [string, any]) => {
    const slug = path.split('/').pop()?.replace('.md', '');

    return {
      slug,
      title: module.metadata?.title ?? slug
    };
  });

  return { docs };
};
