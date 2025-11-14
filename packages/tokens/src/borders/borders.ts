/**
 * Border and outline tokens for the Clothesline UI system.
 *
 * Split into:
 * - borderScale: raw width values (px)
 * - borderSemantic: mappings from semantic names → border scale keys
 * - borderTokens: style-level tokens (colors, rings, transitions, etc.)
 */

/** Raw border width scale (primitive) */
export type BorderScaleKey = '0' | '1' | '2' | '4';

export const borderScale: Record<BorderScaleKey, string> = {
  '0': '0px',
  '1': '1px',
  '2': '2px',
  '4': '4px',
};

/**
 * Semantic mappings for widths.
 * Keys match the CSS variable names *without* the leading `--`.
 * The build step will output:
 *
 *   --border-subtle: var(--border-1);
 *   --border-strong: var(--border-2);
 *   --default-border-width: var(--border-1);
 *   --default-divide-width: var(--border-1);
 *   --default-ring-width: var(--border-2);
 *   --border-focus-width: var(--border-2);
 *   --border-emphasis-thick: var(--border-4);
 */
export type BorderSemanticKey =
  | 'default-border-width'
  | 'default-divide-width'
  | 'default-ring-width'
  | 'border-subtle'
  | 'border-strong'
  | 'border-interactive'
  | 'border-card'
  | 'border-divider'
  | 'border-accent'
  | 'border-focus-width'
  | 'border-emphasis-thick';

export const borderSemantic: Record<BorderSemanticKey, BorderScaleKey> = {
  // core system defaults
  'default-border-width': '1',
  'default-divide-width': '1',
  'default-ring-width': '2',

  // semantic usage
  'border-subtle': '1',
  'border-strong': '2',
  'border-interactive': '1',
  'border-card': '1',
  'border-divider': '1',
  'border-accent': '2',

  // focus + emphasis
  'border-focus-width': '2',
  'border-emphasis-thick': '4',
};

/**
 * Style-level tokens (colors, rings, transitions, etc.)
 * These are already CSS-ready and get spread into baseTokens.
 * Keys are CSS var names without `--`; the build step will prefix them.
 */
export const borderTokens = {
  // Focus ring system
  'ring-color': 'var(--color-primary-500)',
  'ring-offset-width': '1px',
  'ring-offset-color': 'var(--color-surface-50)',

  // Border colors for states
  'border-default-color': 'var(--color-surface-300)',
  'border-muted-color': 'var(--color-surface-200)',
  'border-disabled': 'var(--color-surface-200)',
  'border-hover': 'var(--color-primary-300)',
  'border-active': 'var(--color-primary-500)',
  'border-focus': 'var(--color-primary-500)',
  'border-error': 'var(--color-error-500)',
  'border-warning': 'var(--color-warning-500)',
  'border-success': 'var(--color-success-500)',
  'border-info': 'var(--color-info-500)',

  // Advanced UI border ideas
  'ring-glow':
    '0 0 0 3px color-mix(in oklch, var(--color-primary-500) 40%, transparent)',
  'border-inspect': 'dashed',
  'border-inset': 'inset 0 0 0 var(--border-1) var(--border-muted-color)',

  // Animation and transition states
  'border-transition': 'border-color 0.2s ease, outline 0.2s ease',
  'border-radius-animation': '0.2s ease-in-out',

  // Accessibility & vision modifiers
  'border-contrast-high': 'var(--color-surface-900)',
  'ring-contrast-high': 'var(--color-primary-300)',
  'ring-disabled': 'transparent',
};


