/**
 * Spacing tokens
 *
 * - spacingScale: atomic spacing steps (raw values)
 * - spacingSemantic: intent-based aliases referencing spacingScale
 *
 * Rules:
 * - No var() usage in primitives.
 * - Semantic values must reference a spacingScale key.
 * - Semantic keys should be kebab-case to match emitted CSS.
 */

export type SpacingScaleKey =
  | '0'
  | '1'
  | '2'
  | '3'
  | '4'
  | '5'
  | '6'
  | '7'
  | '8'
  | '9'
  | '10'
  | '12'
  | '16'
  | '20'
  | '24';

export const spacingScale: Record<SpacingScaleKey, string> = {
  '0': '0rem',
  '1': '0.125rem', // 2px
  '2': '0.25rem',  // 4px
  '3': '0.5rem',   // 8px
  '4': '0.75rem',  // 12px
  '5': '1rem',     // 16px
  '6': '1.25rem',  // 20px
  '7': '1.5rem',   // 24px
  '8': '2rem',     // 32px
  '9': '2.5rem',   // 40px
  '10': '3rem',    // 48px
  '12': '4rem',    // 64px
  '16': '6rem',    // 96px
  '20': '8rem',    // 128px
  '24': '12rem',   // 192px
};

export type SpacingSemanticKey =
  // generic tiers
  | 'base'
  | 'sm'
  | 'md'
  | 'lg'
  | 'xl'
  // layout patterns
  | 'stack'
  | 'grid-gap'
  | 'form'
  | 'nav'
  | 'section'
  // density / accessibility
  | 'touch'
  | 'compact'
  | 'comfy'
  // component gaps
  | 'gap-small'
  | 'gap-base'
  | 'gap-large';

export const spacingSemantic: Record<SpacingSemanticKey, SpacingScaleKey> = {
  // generic tiers
  base: '3',
  sm: '2',
  md: '4',
  lg: '6',
  xl: '8',

  // layout patterns
  stack: '5',
  'grid-gap': '4',
  form: '4',
  nav: '3',
  section: '8',

  // density / accessibility
  touch: '5',
  compact: '2',
  comfy: '6',

  // component gaps
  'gap-small': '2',
  'gap-base': '3',
  'gap-large': '6',
};

export const spacingTokens = {
  scale: spacingScale,
  semantic: spacingSemantic
};


