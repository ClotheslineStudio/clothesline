/**
 * Spacing tokens for the Clothesline UI system.
 *
 * - `spacingScale` is the atomic step scale (raw values only).
 * - `spacingSemantic` defines semantic spacing/gaps that reference the scale.
 *
 * Build step is responsible for turning these into CSS custom properties like:
 *   --spacing-0, --spacing-1, --spacing-md, --gap-base, etc.
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
  // generic spacing scale
  | 'base'
  | 'sm'
  | 'md'
  | 'lg'
  | 'xl'
  // layout patterns
  | 'stack'
  | 'gridGap'
  | 'form'
  | 'nav'
  | 'section'
  // accessibility / density
  | 'touch'
  | 'compact'
  | 'comfy'
  // motion / density gaps
  | 'gap-small'
  | 'gap-base'
  | 'gap-large';

export const spacingSemantic: Record<SpacingSemanticKey, SpacingScaleKey> = {
  // Semantic layout spacing (mapped to the base scale)
  base: '3', // default UI element spacing
  sm: '2',
  md: '4',
  lg: '6',
  xl: '8',

  // Semantic layout patterns
  stack: '5',   // vertical spacing in stacked layout
  gridGap: '4', // default grid gap
  form: '4',    // input group spacing
  nav: '3',     // space between nav links
  section: '8', // top/bottom layout spacing

  // Accessibility / density overrides
  touch: '5',   // larger spacing for tap targets
  compact: '2', // dense layouts
  comfy: '6',   // relaxed UIs

  // Motion/density-aware gaps
  'gap-small': '2',
  'gap-base': '3',
  'gap-large': '6',
};

/**
 * Export in a single object if your build step expects that.
 */
export const spacingTokens = {
  scale: spacingScale,
  semantic: spacingSemantic,
};

