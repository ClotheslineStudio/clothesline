import type { ComponentType } from 'svelte';

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
  component: ComponentType;
}
