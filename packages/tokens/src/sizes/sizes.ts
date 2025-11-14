/**
 * Size tokens for the Clothesline UI system.
 *
 * These define:
 * - element dimensions (control heights, inputs, buttons)
 * - fixed size steps (xs → xl)
 * - container widths
 * - semantic layout sizes
 *
 * All values are raw. The build step converts them to:
 *
 *   --size-1
 *   --size-sm
 *   --size-control-md
 *   --size-container-lg
 *
 * No CSS variables or `var()` here — pure token data.
 */

/** Base size scale (numeric, consistent with spacing/radius) */
export type SizeScaleKey =
  | '0'
  | '1'
  | '2'
  | '3'
  | '4'
  | '6'
  | '8'
  | '10'
  | '12'
  | '16'
  | '20'
  | '24';

export const sizeScale: Record<SizeScaleKey, string> = {
  '0':  '0rem',
  '1':  '0.25rem',   // 4px
  '2':  '0.5rem',    // 8px
  '3':  '0.75rem',   // 12px
  '4':  '1rem',      // 16px
  '6':  '1.5rem',    // 24px
  '8':  '2rem',      // 32px
  '10': '2.5rem',    // 40px
  '12': '3rem',      // 48px
  '16': '4rem',      // 64px
  '20': '5rem',      // 80px
  '24': '6rem',      // 96px
};

/** Semantic size names → scale keys */
export type SizeSemanticKey =
  | 'xs'
  | 'sm'
  | 'md'
  | 'lg'
  | 'xl'
  | 'control-sm'
  | 'control-md'
  | 'control-lg'
  | 'avatar-sm'
  | 'avatar-md'
  | 'avatar-lg'
  | 'container-sm'
  | 'container-md'
  | 'container-lg';

export const sizeSemantic: Record<SizeSemanticKey, SizeScaleKey> = {
  // generic
  xs: '2',  // 0.5rem (8px)
  sm: '3',  // 0.75rem
  md: '4',  // 1rem
  lg: '6',  // 1.5rem
  xl: '8',  // 2rem

  // UI controls (buttons/inputs)
  'control-sm': '8',   // 2rem height
  'control-md': '10',  // 2.5rem (default)
  'control-lg': '12',  // 3rem

  // media: avatar sizes
  'avatar-sm': '8',    // 2rem (32px)
  'avatar-md': '12',   // 3rem
  'avatar-lg': '16',   // 4rem

  // layout containers (ideal for cards, sections)
  'container-sm': '16', // 4rem
  'container-md': '20', // 5rem
  'container-lg': '24', // 6rem
};

/** Combined export */
export const sizeTokens = {
  scale: sizeScale,
  semantic: sizeSemantic,
};
