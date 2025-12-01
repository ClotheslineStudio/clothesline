import type { ComponentType } from 'svelte';

// What the UI can choose from
export type IconStyle = 'stroke' | 'filled' | 'duotone' | 'animated';

// What an icon actually *supports* in its metadata
// (usually just the drawable styles, not 'animated' yet)
export type IconVariant = 'stroke' | 'filled' | 'duotone';

export type IconSize = 16 | 24 | 32;

export interface IconMeta {
  name: string;
  displayName: string;
  categories: readonly string[];
  keywords: readonly string[];
  variants: readonly IconVariant[];
  sizes: readonly IconSize[];
  version: string;
  description?: string;
}

export interface IconRecord extends IconMeta {
  contributors: string[];
  author: string;
  updatedAt: string | number | Date;
  component: ComponentType;
}
