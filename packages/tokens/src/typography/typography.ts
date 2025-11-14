/**
 * Typography tokens for the Clothesline UI system.
 *
 * Structure:
 * 1. typeScale       — font-size scale tokens (raw values)
 * 2. typeLineHeight  — line-height scale tokens
 * 3. typeTracking    — letter-spacing (tracking) scale tokens
 * 4. typeWeights     — font-weight scale
 * 5. typeFamilies    — default font stacks (theme-overridable)
 * 6. typeRoles       — semantic text roles (body, heading, label, code)
 * 7. typographyTokens — component-level text tokens (muted, disabled, etc.)
 *
 * These **do not** contain CSS variables or var().
 * The theme builder is responsible for emitting --type-* CSS variables.
 */

/* ============================================================
   1. Font-size scale (industry standard + Tailwind compatible)
   ============================================================ */
export const typeScale = {
  xs:  "0.75rem",  // 12px
  sm:  "0.875rem", // 14px
  md:  "1rem",     // 16px
  lg:  "1.125rem", // 18px
  xl:  "1.25rem",  // 20px
  "2xl": "1.5rem",   // 24px
  "3xl": "1.875rem", // 30px
  "4xl": "2.25rem",  // 36px
  "5xl": "3rem",     // 48px
  "6xl": "3.75rem",  // 60px
};


/* ============================================================
   2. Line-height scale (tight → relaxed)
   ============================================================ */
export const typeLineHeight = {
  tight:   "1.1",
  normal:  "1.5",
  relaxed: "1.75",
};


/* ============================================================
   3. Tracking scale (letter-spacing)
   ============================================================ */
export const typeTracking = {
  tight: "-0.01em",
  normal: "0em",
  wide: "0.02em",
};


/* ============================================================
   4. Font weights
   ============================================================ */
export const typeWeights = {
  thin:      "100",
  light:     "300",
  normal:    "400",
  medium:    "500",
  semibold:  "600",
  bold:      "700",
  black:     "900",
};


/* ============================================================
   5. Font families (theme-overridable)
   ============================================================ */
export const typeFamilies = {
  body:    "system-ui, sans-serif",
  heading: "inherit",         // Themes override this
  mono:    "ui-monospace, monospace",
};


/* ============================================================
   6. Semantic type roles (No CSS variables here)
   ------------------------------------------------------------
   These map type size/weight/leading/tracking to semantic roles.
   The builder will generate variables like:
     --type-body-size
     --type-heading-weight
     --type-label-leading
   ============================================================ */
export const typeRoles = {
  body: {
    size: "md",
    weight: "normal",
    leading: "normal",
    tracking: "normal",
    family: "body",
    transform: "none",
  },

  heading: {
    size: "xl",
    weight: "bold",
    leading: "tight",
    tracking: "tight",
    family: "heading",
    transform: "none",
  },

  subheading: {
    size: "lg",
    weight: "semibold",
    leading: "tight",
    tracking: "normal",
    family: "heading",
    transform: "none",
  },

  // New: big hero type
  display: {
    size: "3xl",
    weight: "bold",
    leading: "tight",
    tracking: "tight",
    family: "heading",
    transform: "none",
  },

  // New: tiny all-caps above headings
  overline: {
    size: "xs",
    weight: "medium",
    leading: "normal",
    tracking: "wide",
    family: "body",
    transform: "uppercase",
  },

  // New: small descriptive text
  caption: {
    size: "xs",
    weight: "normal",
    leading: "normal",
    tracking: "normal",
    family: "body",
    transform: "none",
  },

  label: {
    size: "sm",
    weight: "medium",
    leading: "normal",
    tracking: "normal",
    family: "body",
    transform: "uppercase", // you can flip this later if you want
  },

  // New: semantic "link" role (pairs with anchor color tokens)
  link: {
    size: "md",
    weight: "normal",
    leading: "normal",
    tracking: "normal",
    family: "body",
    transform: "none",
  },

  // New: button text role (if you want it)
  button: {
    size: "sm",
    weight: "semibold",
    leading: "normal",
    tracking: "normal",
    family: "body",
    transform: "none", // or "uppercase" if you want that style
  },

  code: {
    size: "sm",
    weight: "normal",
    leading: "normal",
    tracking: "normal",
    family: "mono",
    transform: "none",
  },
};

/* ============================================================
   7. Component-level typography tokens
   ------------------------------------------------------------
   These reference color tokens (resolved later by theme build).
   ============================================================ */
export const typographyTokens = {
  "text-muted":    "var(--color-surface-700)",
  "text-disabled": "var(--color-surface-500)",

  "anchor-color":         "var(--color-primary-600-vis)",
  "anchor-color-hover":   "var(--color-primary-700-vis)",
  "anchor-decoration":     "underline",
  "anchor-decoration-hover":"none",

  "code-font-family": "var(--font-mono)",
};
