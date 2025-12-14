/**
 * Size tokens for the Clothesline UI system.
 *
 * Sizes represent “physical” UI dimensions (lengths), such as:
 * - control heights (inputs/buttons)
 * - avatar/media sizes
 * - container/layout sizing steps
 * - tiered semantic steps (xs → xl)
 *
 * Contract:
 * - No `var()` references
 * - No theme/mode logic
 * - Raw CSS length values only (prefer `rem`)
 *
 * Build output examples:
 *   --size-4: 1rem;
 *   --size-md: var(--size-4);
 *   --size-control-md: var(--size-10);
 */

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

/**
 * Raw size scale (primitives).
 * Keys are stable numeric steps; values are raw lengths.
 */
export const sizeScale: Record<SizeScaleKey, string> = {
  '0': '0rem',
  '1': '0.25rem', // 4px
  '2': '0.5rem', // 8px
  '3': '0.75rem', // 12px
  '4': '1rem', // 16px
  '6': '1.5rem', // 24px
  '8': '2rem', // 32px
  '10': '2.5rem', // 40px
  '12': '3rem', // 48px
  '16': '4rem', // 64px
  '20': '5rem', // 80px
  '24': '6rem', // 96px
} as const;

export type SizeSemanticKey =
  // generic tiers
  | 'xs'
  | 'sm'
  | 'md'
  | 'lg'
  | 'xl'
  // controls (heights)
  | 'control-sm'
  | 'control-md'
  | 'control-lg'
  // media (avatars)
  | 'avatar-xs'
  | 'avatar-sm'
  | 'avatar-md'
  | 'avatar-lg'
  | 'avatar-xl'
  // layout containers
  | 'container-sm'
  | 'container-md'
  | 'container-lg';

export const sizeSemantic: Record<SizeSemanticKey, SizeScaleKey> = {
  // tiers
  xs: '2',
  sm: '3',
  md: '4',
  lg: '6',
  xl: '8',

  // control heights
  'control-sm': '8',
  'control-md': '10',
  'control-lg': '12',

  // avatars/media (aligned to Avatar component: xs=1.5, sm=2, md=2.5, lg=3, xl=4)
  'avatar-xs': '6',   // 1.5rem
  'avatar-sm': '8',   // 2rem
  'avatar-md': '10',  // 2.5rem
  'avatar-lg': '12',  // 3rem
  'avatar-xl': '16',  // 4rem

  // containers/layout
  'container-sm': '16',
  'container-md': '20',
  'container-lg': '24',
} as const;

/**
 * Convenience export (NOT for baseTokens spreading).
 * Use `sizeScale` + `sizeSemantic` as the contract inputs for the builder.
 */
export const sizeTokens = {
  scale: sizeScale,
  semantic: sizeSemantic,
} as const;

export type { SizeSemanticKey as SizeSemanticTokenKey };
