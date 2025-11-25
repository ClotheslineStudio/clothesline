// src/lib/types/icon.ts
export type IconVariant = 'outline' | 'solid' | 'duotone';
export type IconSize = 16 | 24 | 32;

export interface IconMeta {
  name: string;
  displayName: string;
  categories: string[];
  keywords: string[];
  variants: IconVariant[];
  sizes: IconSize[];
  version: string;
  description?: string;
}
