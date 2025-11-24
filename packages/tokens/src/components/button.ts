// packages/tokens/src/button.ts
// Semantic, mode-aware button tokens.
// These expect the theme to define:
//  - role ramps:      --color-<role>-<step>-vis
//  - on-colors:       --on-primary, --on-surface, --on-surface-muted
//  - radius/spacing:  --radius-interactive, --spacing-*
//  - focus ring:      --focus-ring-color, --focus-ring-width, --focus-ring-offset

export const buttonTokens = {
  /* ========================================
   * Base (solid, primary role)
   * ====================================== */

  // Default state
  'button-bg': 'var(--color-primary-500-vis)',
  'button-text': 'var(--on-primary)',
  'button-border': '1px solid var(--color-primary-600-vis)',

  // Hover / active
  'button-bg-hover': 'var(--color-primary-600-vis)',
  'button-bg-active': 'var(--color-primary-700-vis)',
  'button-border-hover': '1px solid var(--color-primary-700-vis)',
  'button-border-active': '1px solid var(--color-primary-700-vis)',

  /* Disabled (use neutral/surface ramp + muted on-surface text) */
  'button-bg-disabled': 'var(--color-surface-300-vis)',
  'button-text-disabled': 'var(--on-surface-muted)',
  'button-border-disabled': '1px solid var(--color-surface-400-vis)',

  /* Shape & spacing */
  'button-radius': 'var(--radius-interactive)',
  'button-padding-x': 'var(--spacing-4)',
  'button-padding-y': 'var(--spacing-2)',
  'button-gap': 'var(--spacing-2)', // icon + label gap

  /* Elevation / motion */
  'button-shadow': 'var(--elevation-low, 0 1px 2px rgba(0,0,0,0.05))',
  'button-shadow-hover': 'var(--elevation-medium, 0 2px 4px rgba(0,0,0,0.08))',
  'button-transition':
    'background-color 150ms ease-out, color 150ms ease-out, border-color 150ms ease-out, box-shadow 150ms ease-out, transform 100ms ease-out',

  /* Focus ring (delegated to theme but wired here) */
  'button-focus-ring-color': 'var(--focus-ring-color, var(--color-primary-400-vis))',
  'button-focus-ring-width': 'var(--focus-ring-width, 2px)',
  'button-focus-ring-offset': 'var(--focus-ring-offset, 2px)',

  /* ========================================
   * Outline variant
   * ====================================== */

  'button-outline-bg': 'transparent',
  'button-outline-text': 'var(--on-surface-strong, var(--on-surface))',
  'button-outline-border': '1px solid var(--color-primary-400-vis)',

  'button-outline-bg-hover': 'var(--color-primary-50-vis)',
  'button-outline-bg-active': 'var(--color-primary-100-vis)',
  'button-outline-border-hover': '1px solid var(--color-primary-500-vis)',
  'button-outline-border-active': '1px solid var(--color-primary-600-vis)',

  /* ========================================
   * Ghost variant
   * ====================================== */

  'button-ghost-bg': 'transparent',
  'button-ghost-text': 'var(--on-surface-strong, var(--on-surface))',
  'button-ghost-border': '1px solid transparent',

  // Use a soft primary tint for hover; still mode-aware via -vis
  'button-ghost-bg-hover': 'var(--color-primary-50-vis)',
  'button-ghost-bg-active': 'var(--color-primary-100-vis)',
  'button-ghost-border-hover': '1px solid transparent',
  'button-ghost-border-active': '1px solid transparent',

  /* ========================================
   * Link variant
   * ====================================== */

  'button-link-bg': 'transparent',
  'button-link-text': 'var(--color-primary-600-vis)',
  'button-link-text-hover': 'var(--color-primary-700-vis)',
  'button-link-bg-hover': 'transparent',
  'button-link-bg-active': 'transparent',
  'button-link-border': '1px solid transparent',

  // Keep underline behavior semantic so themes can override (e.g. WCAG prefs)
  'button-link-text-decoration': 'underline',
  'button-link-text-decoration-hover': 'underline',
};


