// apps/icon-app/src/routes/+page.ts
import type { PageLoad } from './$types';

// TEMP: direct workspace import.
// Later we can switch to: import { iconRegistry } from '@clothesline/icons';
import { iconRegistry } from '../../../../packages/icons/src';

type IconEntry = {
  meta?: {
    name?: string;
    displayName?: string;
    description?: string;
    keywords?: string[];
    categories?: string[];
    variants?: string[];
    sizes?: number[];
    version?: string;
    author?: string;
    changelog?: unknown[];
  };
  component?: unknown;
};

export const load: PageLoad = () => {
  const icons = Object.entries(iconRegistry).map(([key, entry]: [string, unknown]) => {
    const iconEntry = entry as IconEntry;
    const meta = iconEntry.meta ?? {};

    return {
      // use meta.name if present, otherwise fall back to the key
      name: meta.name ?? key,
      displayName: meta.displayName ?? key,
      description: meta.description ?? '',
      keywords: meta.keywords ?? [],
      categories: meta.categories ?? [],
      variants: meta.variants ?? [],
      sizes: meta.sizes ?? [24],
      version: meta.version ?? '0.1.0',
      author: meta.author ?? 'Clothesline Studio',
      changelog: meta.changelog ?? [],
      // Svelte component – we don't try to type this strictly right now
      component: (iconEntry.component)
    };
  });

  // Sort alphabetically by displayName (falls back to name)
  icons.sort((a, b) => {
    const aName = (a.displayName ?? a.name).toLowerCase();
    const bName = (b.displayName ?? b.name).toLowerCase();
    return aName.localeCompare(bName);
  });

  return { icons };
};



