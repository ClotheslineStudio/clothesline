/**
 * Typography design tokens for the Clothesline UI system.
 * These support base, heading, and anchor text styling.
 * Can be fully overridden by themes (e.g. to apply custom fonts).
 */

export const typographyTokens = {
  // Global scaling factor
  "--text-scaling": "1.067",

  // Base font
  "--base-font-family": "system-ui, sans-serif",
  "--base-font-size": "1rem", // default: 16px
  "--base-line-height": "1.5",
  "--base-font-weight": "400",
  "--base-font-style": "normal",
  "--base-letter-spacing": "0em",
  "--base-font-color": "var(--color-surface-950)",
  "--base-font-color-dark": "var(--color-surface-50)",

  // Headings
  "--heading-font-family": "inherit",
  "--heading-font-weight": "700",
  "--heading-font-style": "normal",
  "--heading-letter-spacing": "inherit",
  "--heading-font-color": "inherit",
  "--heading-font-color-dark": "inherit",

  // Anchor (link) text
  "--anchor-font-color": "var(--color-primary-500)",
  "--anchor-font-color-dark": "var(--color-primary-500)",
  "--anchor-font-family": "inherit",
  "--anchor-font-size": "inherit",
  "--anchor-line-height": "inherit",
  "--anchor-font-weight": "inherit",
  "--anchor-font-style": "inherit",
  "--anchor-letter-spacing": "inherit",
  "--anchor-text-decoration": "none",
  "--anchor-text-decoration-hover": "underline",
  "--anchor-text-decoration-active": "none",
  "--anchor-text-decoration-focus": "none",

  "--code-font-family": "monospace",
  "--font-size-sm": "0.875rem",
  "--font-size-lg": "1.25rem",
  "--font-weight-semibold": "600",
  "--font-weight-light": "300",
  "--text-muted": "var(--color-surface-700)",
  "--text-disabled": "var(--color-surface-500)",
};
