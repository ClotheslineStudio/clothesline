/**
 * Popover design tokens
 *
 * These are semantic variables mapped to theme tokens (colors, spacing, borders, shadows).
 * They can be overridden per theme/mode by the theme generator.
 */

export const popoverTokens = {
  // Container
  'popover-bg': 'var(--color-surface-50)',              // background of popover
  'popover-border': 'var(--border-subtle)',             // border style
  'popover-radius': 'var(--radius-md)',                 // border radius
  'popover-shadow': 'var(--shadow-lg)',                 // shadow for popover
  'popover-min-width': '12rem',                         // minimum width

  // Spacing
  'popover-padding-y': 'var(--spacing-4)',              // vertical padding for content
  'popover-padding-x': 'var(--spacing-4)',              // horizontal padding for content
  'popover-gap': 'var(--spacing-2)',                    // gap between items or sections

  // Header/Text
  'popover-title-color': 'var(--color-surface-900)',    // title text color
  'popover-text-color': 'var(--color-surface-800)',     // body text color

  // Z-index
  'popover-z-index': '50',                              // layering above other content
};
