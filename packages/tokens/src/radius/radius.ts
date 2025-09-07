/**
 * Border radius tokens for the Clothesline UI system.
 * Includes scale-based values and semantic aliases for components and accessibility.
 */

export const radiusTokens = {
  // Scale
  '--radius-none': '0px',
  '--radius-xs': '0.125rem',   // 2px
  '--radius-sm': '0.25rem',    // 4px
  '--radius-md': '0.375rem',   // 6px
  '--radius-lg': '0.5rem',     // 8px
  '--radius-xl': '0.75rem',    // 12px
  '--radius-2xl': '1rem',      // 16px
  '--radius-3xl': '1.5rem',    // 24px
  '--radius-full': '9999px',   // round/pill

  // Semantic tokens (usage-based)
  '--radius-base': 'var(--radius-md)',         // General use
  '--radius-container': 'var(--radius-lg)',    // Panels, modals
  '--radius-interactive': 'var(--radius-sm)',  // Buttons, inputs
  '--radius-avatar': 'var(--radius-full)',     // Default = round
  '--radius-badge': 'var(--radius-full)',      // Small badges/pills
  '--radius-card': 'var(--radius-lg)',         // Cards and elevated blocks
  '--radius-tooltip': 'var(--radius-sm)',      // Tooltips and micro surfaces

  // Accessibility-focused
  '--radius-focus-ring': '2px',                // Focus outline shape
  '--radius-touch-target': 'var(--radius-lg)', // Roundedness for large tap areas
};

