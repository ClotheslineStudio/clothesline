// packages/tokens/src/button.ts
// Semantic, mode-aware button tokens.
//
// Expected inputs already provided by your system:
//  - role ramps:      --color-<role>-<step>-vis
//  - on-colors:       --on-primary, --on-surface, --on-surface-muted, --on-surface-strong
//  - foundations:     --radius-interactive, --spacing-*, --motion-*, --focus-color, --focus-width, --focus-offset
//  - elevations:      --elevation-1, --elevation-2, ...

export const buttonTokens = {
  /* ========================================
   * Base (solid, primary role)
   * ====================================== */

  // Paint
  'button-bg': 'var(--color-primary-500-vis)',
  'button-text': 'var(--on-primary)',
  'button-bg-hover': 'var(--color-primary-600-vis)',
  'button-bg-active': 'var(--color-primary-700-vis)',

  /* Border (split into width/style/color so themes can “skin” treatment) */
  'button-border-width': 'var(--border-width-interactive, var(--border-1, 1px))',
  'button-border-style': 'solid',
  'button-border-color': 'var(--color-primary-600-vis)',
  'button-border-color-hover': 'var(--color-primary-700-vis)',
  'button-border-color-active': 'var(--color-primary-700-vis)',
  'button-border-color-disabled': 'var(--color-surface-400-vis)',

  // Back-compat single-string border tokens (keep until all components migrate)
  'button-border': 'var(--button-border-width) var(--button-border-style) var(--button-border-color)',
  'button-border-hover':
    'var(--button-border-width) var(--button-border-style) var(--button-border-color-hover)',
  'button-border-active':
    'var(--button-border-width) var(--button-border-style) var(--button-border-color-active)',
  'button-border-disabled':
    'var(--button-border-width) var(--button-border-style) var(--button-border-color-disabled)',

  /* Disabled */
  'button-bg-disabled': 'var(--color-surface-300-vis)',
  'button-text-disabled': 'var(--on-surface-muted)',
  'button-disabled-opacity': 'var(--opacity-disabled, 0.38)',

  /* Shape & spacing */
  'button-radius': 'var(--radius-interactive)',
  'button-padding-x': 'var(--spacing-4)',
  'button-padding-y': 'var(--spacing-2)',
  'button-gap': 'var(--spacing-2)',

  /* Elevation / pressed behavior */
  'button-shadow': 'var(--elevation-1, 0px 1px 2px rgba(0 0 0 / 0.06))',
  'button-shadow-hover': 'var(--elevation-2, 0px 1px 3px rgba(0 0 0 / 0.10))',
  'button-shadow-active': 'var(--elevation-0, none)',
  'button-press-translate': '0px', // pixel skins can set to 1px

  /* Focus ring (honor focus-ring-* if you add them; default to your foundations) */
  'button-focus-ring-color': 'var(--focus-ring-color, var(--focus-color, var(--color-primary-400-vis)))',
  'button-focus-ring-width': 'var(--focus-ring-width, var(--focus-width, 2px))',
  'button-focus-ring-offset': 'var(--focus-ring-offset, var(--focus-offset, 2px))',
  'button-focus-ring-offset-color': 'var(--ring-offset-color, var(--color-surface-50-vis))',

  /* Motion */
  'button-transition': [
    'background-color var(--motion-duration-fast, 150ms) var(--motion-ease, ease-in-out)',
    'color var(--motion-duration-fast, 150ms) var(--motion-ease, ease-in-out)',
    'border-color var(--motion-duration-fast, 150ms) var(--motion-ease, ease-in-out)',
    'box-shadow var(--motion-duration-fast, 150ms) var(--motion-ease, ease-in-out)',
    'transform var(--motion-duration-fast, 150ms) var(--motion-ease, ease-in-out)'
  ].join(', '),

  /* Optional “skin/treatment” hooks (pixel/bevel/etc.) */
  'button-bevel-highlight': 'transparent',
  'button-bevel-shadow': 'transparent',

  /* ========================================
   * Outline variant
   * ====================================== */

  'button-outline-bg': 'transparent',
  'button-outline-text': 'var(--on-surface-strong, var(--on-surface))',

  'button-outline-border-color': 'var(--color-primary-400-vis)',
  'button-outline-border':
    'var(--button-border-width) var(--button-border-style) var(--button-outline-border-color)',

  'button-outline-bg-hover': 'var(--color-primary-50-vis)',
  'button-outline-bg-active': 'var(--color-primary-100-vis)',
  'button-outline-border-color-hover': 'var(--color-primary-500-vis)',
  'button-outline-border-color-active': 'var(--color-primary-600-vis)',

  'button-outline-border-hover':
    'var(--button-border-width) var(--button-border-style) var(--button-outline-border-color-hover)',
  'button-outline-border-active':
    'var(--button-border-width) var(--button-border-style) var(--button-outline-border-color-active)',

  /* ========================================
   * Ghost variant
   * ====================================== */

  'button-ghost-bg': 'transparent',
  'button-ghost-text': 'var(--on-surface-strong, var(--on-surface))',
  'button-ghost-border': 'var(--button-border-width) solid transparent',

  'button-ghost-bg-hover': 'var(--color-primary-50-vis)',
  'button-ghost-bg-active': 'var(--color-primary-100-vis)',
  'button-ghost-border-hover': 'var(--button-border-width) solid transparent',
  'button-ghost-border-active': 'var(--button-border-width) solid transparent',

  /* ========================================
   * Link variant
   * ====================================== */

  'button-link-bg': 'transparent',
  'button-link-border': 'var(--button-border-width) solid transparent',
  'button-link-text': 'var(--anchor-color, var(--color-primary-600-vis))',
  'button-link-text-hover': 'var(--anchor-color-hover, var(--color-primary-700-vis))',
  'button-link-bg-hover': 'transparent',
  'button-link-bg-active': 'transparent',

  'button-link-text-decoration': 'var(--anchor-decoration, underline)',
  'button-link-text-decoration-hover': 'var(--anchor-decoration-hover, underline)'
} as const;


