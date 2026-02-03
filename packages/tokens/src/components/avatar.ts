/**
 * Avatar tokens (CSS-ready).
 *
 * Contract:
 * - CSS-ready values only (may use var()).
 * - Do NOT define raw sizes here; sizes come from sizes.ts semantic tokens.
 * - Do NOT invent colors; reference existing system roles/ramps.
 *
 * Depends on:
 * - sizes.ts generating: --size-avatar-xs/sm/md/lg/xl
 * - borders.ts generating: --border-1
 * - border color tokens generating: --border-color-muted
 * - theme color roles generating: --color-surface-200-vis, --on-surface-strong, etc.
 */

export const avatarTokens = {
  /* Base visuals */
  'avatar-bg': 'var(--color-surface-200-vis)',
  'avatar-text': 'var(--on-surface-strong)',
  'avatar-border': 'var(--border-1) solid var(--border-color-muted)',

  /* Sizes (semantic only; sourced from sizes.ts) */
  'avatar-size-xs': 'var(--size-avatar-xs)',
  'avatar-size-sm': 'var(--size-avatar-sm)',
  'avatar-size-md': 'var(--size-avatar-md)',
  'avatar-size-lg': 'var(--size-avatar-lg)',
  'avatar-size-xl': 'var(--size-avatar-xl)',

  /* Status indicators */
  'avatar-status-online': 'var(--color-success-500-vis)',
  'avatar-status-offline': 'var(--color-neutral-400-vis)'
} as const;

export type AvatarTokenKey = keyof typeof avatarTokens;



