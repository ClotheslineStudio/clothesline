/**
 * Dropdown design tokens
 *
 * These are semantic variables mapped to theme tokens (colors, spacing, borders, shadows).
 * They can be overridden per theme/mode by the theme generator.
 */

export const dropdownTokens = {
  // Container
  'dropdown-bg': 'var(--color-surface-50)',              // background of dropdown menu
  'dropdown-border': 'var(--border-subtle)',             // border style for dropdown
  'dropdown-radius': 'var(--radius-md)',                 // border radius
  'dropdown-shadow': 'var(--shadow-lg)',                  // menu shadow
  'dropdown-min-width': '10rem',                         // minimum width

  // Spacing
  'dropdown-padding-y': 'var(--spacing-2)',              // vertical padding for container
  'dropdown-padding-x': 'var(--spacing-0)',              // horizontal padding for container
  'dropdown-gap': 'var(--spacing-1)',                    // gap between items

  // Item styling
  'dropdown-item-padding-y': 'var(--spacing-2)',         // vertical padding for items
  'dropdown-item-padding-x': 'var(--spacing-4)',         // horizontal padding for items
  'dropdown-item-color': 'var(--color-surface-900)',     // text color for items
  'dropdown-item-bg-hover': 'var(--color-primary-50)',  // background on hover
  'dropdown-item-color-hover': 'var(--color-primary-900)', // text color on hover
  'dropdown-item-bg-active': 'var(--color-primary-100)', // background on active
  'dropdown-item-color-active': 'var(--color-primary-900)', // text color on active

  // Z-index
  'dropdown-z-index': '50',                              // layering above other content
};
