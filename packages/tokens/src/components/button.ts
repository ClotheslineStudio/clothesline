// packages/tokens/src/button.ts
// These tokens are semantic and mode-aware through the theme variables
// (expects --on-*, --on-surface-* to be defined in the theme CSS).

export const buttonTokens = {
  /* ===== Base (solid, primary role) ===== */
  'button-bg': 'var(--color-primary-500-vis)',
  'button-text': 'var(--on-primary)',                   // ✅ on-color
  'button-bg-hover': 'var(--color-primary-600-vis)',
  'button-border': '1px solid var(--color-primary-600-vis)',

  /* Disabled */
  'button-bg-disabled': 'var(--color-surface-300)',
  'button-text-disabled': 'var(--on-surface-muted)',    // ✅ mode-aware muted fg
  'button-border-disabled': '1px solid var(--color-surface-400)',

  /* Shape & spacing */
  'button-radius': 'var(--radius-interactive)',
  'button-padding-x': 'var(--spacing-4)',
  'button-padding-y': 'var(--spacing-2)',
  'button-shadow': '0 1px 2px rgba(0,0,0,0.05)',

  /* ===== Outline variant ===== */
  'button-outline-bg': 'transparent',
  'button-outline-text': 'var(--on-surface-strong)',    // ✅ readable in both modes
  'button-outline-bg-hover': 'var(--color-primary-100-vis)',
  'button-outline-border': '1px solid var(--color-primary-400-vis)',

  /* ===== Ghost variant ===== */
  'button-ghost-bg': 'transparent',
  'button-ghost-text': 'var(--on-surface-strong)',      // ✅ readable in both modes
  'button-ghost-bg-hover': 'var(--color-primary-100-vis)',
  'button-ghost-border': '1px solid transparent',

  /* ===== Link variant ===== */
  'button-link-bg': 'transparent',
  'button-link-text': 'var(--color-primary-600-vis)',   // brand-colored text
  'button-link-bg-hover': 'transparent',
  'button-link-border': '1px solid transparent',
  'button-link-text-decoration': 'underline'
};

