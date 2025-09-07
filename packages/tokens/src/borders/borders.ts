/**
 * Border and outline design tokens for the Clothesline UI system.
 * Covers base widths, semantic border usage, accessibility rings,
 * and advanced UI decoration modes (glow, inspection, edge states).
 */

export const borderTokens = {
  // Scale
  '--border-0': '0px',
  '--border-1': '1px',
  '--border-2': '2px',
  '--border-4': '4px',

  // Core system defaults
  '--default-border-width': 'var(--border-1)',
  '--default-divide-width': 'var(--border-1)',
  '--default-ring-width': 'var(--border-2)',

  // Semantic usage
  '--border-subtle': 'var(--border-1)',       // low-emphasis separators
  '--border-strong': 'var(--border-2)',       // section edges, modal borders
  '--border-interactive': 'var(--border-1)',  // inputs, buttons, toggles
  '--border-card': 'var(--border-1)',         // surface outlines
  '--border-divider': 'var(--border-1)',      // navs, tables, forms
  '--border-accent': 'var(--border-2)',       // special borders (e.g. avatar ring)

  // Focus ring system
  '--border-focus-width': 'var(--border-2)',
  '--ring-color': 'var(--color-primary-500)',
  '--ring-offset-width': '1px',
  '--ring-offset-color': 'var(--color-surface-50)',

  // Border colors for states
  '--border-default-color': 'var(--color-surface-300)',
  '--border-muted-color': 'var(--color-surface-200)',
  '--border-disabled': 'var(--color-surface-200)',
  '--border-hover': 'var(--color-primary-300)',
  '--border-active': 'var(--color-primary-500)',
  '--border-focus': 'var(--color-primary-500)',
  '--border-error': 'var(--color-error-500)',
  '--border-warning': 'var(--color-warning-500)',
  '--border-success': 'var(--color-success-500)',
  '--border-info': 'var(--color-info-500)',

  // Advanced UI border ideas
  '--ring-glow': '0 0 0 3px color-mix(in oklch, var(--color-primary-500) 40%, transparent)', // onboarding / spotlight effect
  '--border-inspect': 'dashed', // visual debugging or design view
  '--border-emphasis-thick': 'var(--border-4)',
  '--border-inset': 'inset 0 0 0 var(--border-1) var(--border-muted-color)',

  // Animation and transition states
  '--border-transition': 'border-color 0.2s ease, outline 0.2s ease',
  '--border-radius-animation': '0.2s ease-in-out',

  // Accessibility & vision modifiers
  '--border-contrast-high': 'var(--color-surface-900)',
  '--ring-contrast-high': 'var(--color-primary-300)',
  '--ring-disabled': 'transparent',
};


