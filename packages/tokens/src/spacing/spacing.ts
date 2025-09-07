/**
 * Spacing tokens for the Clothesline UI system.
 * Based on a consistent step scale, plus semantic tokens for layout patterns,
 * component gaps, and accessibility-aware spacing adjustments.
 */

export const spacingTokens = {
  // Base scale (atomic values)
  '--spacing-0': '0rem',
  '--spacing-1': '0.125rem',   // 2px
  '--spacing-2': '0.25rem',    // 4px
  '--spacing-3': '0.5rem',     // 8px
  '--spacing-4': '0.75rem',    // 12px
  '--spacing-5': '1rem',       // 16px
  '--spacing-6': '1.25rem',    // 20px
  '--spacing-7': '1.5rem',     // 24px
  '--spacing-8': '2rem',       // 32px
  '--spacing-9': '2.5rem',     // 40px
  '--spacing-10': '3rem',      // 48px
  '--spacing-12': '4rem',      // 64px
  '--spacing-16': '6rem',      // 96px
  '--spacing-20': '8rem',      // 128px
  '--spacing-24': '12rem',     // 192px

  // Semantic layout spacing
  '--spacing': 'var(--spacing-3)',           // default UI element spacing
  '--spacing-sm': 'var(--spacing-2)',
  '--spacing-md': 'var(--spacing-4)',
  '--spacing-lg': 'var(--spacing-6)',
  '--spacing-xl': 'var(--spacing-8)',

  // Semantic layout patterns
  '--stack-spacing': 'var(--spacing-5)',     // vertical spacing in stacked layout
  '--grid-gap': 'var(--spacing-4)',          // default grid gap
  '--form-spacing': 'var(--spacing-4)',      // input group spacing
  '--nav-spacing': 'var(--spacing-3)',       // space between nav links
  '--section-spacing': 'var(--spacing-8)',   // top/bottom layout spacing

  // Accessibility / density overrides
  '--spacing-touch': 'var(--spacing-5)',     // larger spacing for tap targets
  '--spacing-compact': 'var(--spacing-2)',   // dense layouts
  '--spacing-comfy': 'var(--spacing-6)',     // relaxed UIs

  // Motion/density-aware scale (paired with --density-scaling)
  '--gap-small': 'var(--spacing-2)',
  '--gap-base': 'var(--spacing-3)',
  '--gap-large': 'var(--spacing-6)',
};

