/**
 * Typography tokens for the Clothesline UI system.
 *
 * This module is intentionally CSS-free: it exports raw values and semantic role
 * definitions that the theme builder can transform into `--type-*` CSS variables.
 *
 * Contents:
 * 1) Primitives
 *    - typeScale       : font-size scale
 *    - typeLineHeight  : line-height scale
 *    - typeTracking    : letter-spacing scale
 *    - typeWeights     : font-weight scale
 *    - typeFamilies    : font stacks
 *    - typographyPrimitives : convenience aggregate export
 *
 * 2) Semantic roles
 *    - typeRoles       : role presets that reference primitive keys
 *    - typographyRoles : alias export for readability
 */

/* ============================================================
   1) Primitives
   ============================================================ */

/**
 * Font-size scale (Tailwind-compatible naming).
 * Values are expressed in `rem` for consistent scaling.
 */
export const typeScale = {
  xs: '0.75rem', // 12px
  sm: '0.875rem', // 14px
  md: '1rem', // 16px
  lg: '1.125rem', // 18px
  xl: '1.25rem', // 20px
  '2xl': '1.5rem', // 24px
  '3xl': '1.875rem', // 30px
  '4xl': '2.25rem', // 36px
  '5xl': '3rem', // 48px
  '6xl': '3.75rem' // 60px
} as const;

/**
 * Line-height scale (tight → relaxed).
 * Unitless values are recommended for predictable inheritance.
 */
export const typeLineHeight = {
  tight: '1.1',
  normal: '1.5',
  relaxed: '1.75'
} as const;

/**
 * Tracking scale (letter-spacing).
 * Uses `em` so spacing scales with font-size.
 */
export const typeTracking = {
  tight: '-0.01em',
  normal: '0em',
  wide: '0.02em'
} as const;

/**
 * Font weight scale.
 * Values are numeric strings (100–900) for direct CSS emission.
 */
export const typeWeights = {
  thin: '100',
  light: '300',
  normal: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
  black: '900'
} as const;

/**
 * Font stacks.
 * These can be overridden by themes, but the keys remain stable.
 */
export const typeFamilies = {
  body: 'system-ui, sans-serif',
  heading: 'inherit',
  mono: 'ui-monospace, monospace'
} as const;

/**
 * Convenience export bundling all primitive typography scales.
 */
export const typographyPrimitives = {
  scale: typeScale,
  leading: typeLineHeight,
  tracking: typeTracking,
  weights: typeWeights,
  families: typeFamilies
} as const;

/* ============================================================
   2) Semantic roles
   ============================================================ */

/**
 * Semantic role presets map readable role names (body, heading, etc.)
 * to primitive keys (size/weight/leading/tracking/family) plus transform.
 *
 * The theme builder can emit:
 * - --type-{role}-size      -> var(--type-scale-*)
 * - --type-{role}-weight    -> var(--type-weight-*)
 * - --type-{role}-leading   -> var(--type-leading-*)
 * - --type-{role}-tracking  -> var(--type-tracking-*)
 * - --type-{role}-family    -> var(--type-family-*)
 * - --type-{role}-transform -> literal CSS keyword (e.g., none, uppercase)
 */
export const typeRoles = {
  body: {
    size: 'md',
    weight: 'normal',
    leading: 'normal',
    tracking: 'normal',
    family: 'body',
    transform: 'none'
  },

  heading: {
    size: 'xl',
    weight: 'bold',
    leading: 'tight',
    tracking: 'tight',
    family: 'heading',
    transform: 'none'
  },

  subheading: {
    size: 'lg',
    weight: 'semibold',
    leading: 'tight',
    tracking: 'normal',
    family: 'heading',
    transform: 'none'
  },

  display: {
    size: '3xl',
    weight: 'bold',
    leading: 'tight',
    tracking: 'tight',
    family: 'heading',
    transform: 'none'
  },

  overline: {
    size: 'xs',
    weight: 'medium',
    leading: 'normal',
    tracking: 'wide',
    family: 'body',
    transform: 'uppercase'
  },

  caption: {
    size: 'xs',
    weight: 'normal',
    leading: 'normal',
    tracking: 'normal',
    family: 'body',
    transform: 'none'
  },

  label: {
    size: 'sm',
    weight: 'medium',
    leading: 'normal',
    tracking: 'normal',
    family: 'body',
    transform: 'uppercase'
  },

  link: {
    size: 'md',
    weight: 'normal',
    leading: 'normal',
    tracking: 'normal',
    family: 'body',
    transform: 'none'
  },

  button: {
    size: 'sm',
    weight: 'semibold',
    leading: 'normal',
    tracking: 'normal',
    family: 'body',
    transform: 'none'
  },

  code: {
    size: 'sm',
    weight: 'normal',
    leading: 'normal',
    tracking: 'normal',
    family: 'mono',
    transform: 'none'
  }
} as const;

/**
 * Alias export for readability in consuming code.
 */
export const typographyRoles = typeRoles;

/* ============================================================
   Flattened primitive token map
   ------------------------------------------------------------
   This is a normalized key/value map intended for build pipelines
   that consume a single token dictionary (e.g., baseTokens).
   ============================================================ */

const prefixMap = (prefix: string, obj: Record<string, string>) =>
  Object.fromEntries(Object.entries(obj).map(([k, v]) => [`${prefix}${k}`, v]));

export const typographyTokens = {
  // scale
  ...prefixMap('type-scale-', typeScale),
  // leading
  ...prefixMap('type-leading-', typeLineHeight),
  // tracking
  ...prefixMap('type-tracking-', typeTracking),
  // weights
  ...prefixMap('type-weight-', typeWeights),
  // families
  ...prefixMap('type-family-', typeFamilies)
} as const;