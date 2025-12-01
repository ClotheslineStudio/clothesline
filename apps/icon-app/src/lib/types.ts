// apps/icon-app/src/lib/types.ts
export type IconVariant = 'stroke' | 'filled' | 'duotone';

export interface IconMeta {
  name: string;             // "bug"
  displayName: string;      // "Bug"
  description?: string;
  keywords: string[];
  categories: string[];
  variants: IconVariant[];
  sizes: number[];          // [16, 24, 32]
  version: string;          // "1.2.0"
  updatedAt: string;        // ISO string
  author: string;           // "@clotheslinestudio"
  contributors?: string[];  // ["@ui-wizard", "@svg-master"]
  changelogUrl?: string;
}

export interface IconItem {
  meta: IconMeta;
  // Svelte component for the icon
  component: typeof import('svelte').SvelteComponent;
  // optional prebuilt code snippets
  svelteUsage?: string;
  svgSource?: string;
}
