/**
 * Opacity tokens for the Clothesline UI system.
 *
 * Mental model:
 * - Ramp: generic numeric helpers (0–100)
 * - States: interaction opacity constants (hover/pressed/etc.)
 * - Surface: subtle elevation/overlay effects on surfaces
 * - Scrims: page-level dimmers behind modals/drawers
 * - Utility: common effect opacity (divider/border/shadow)
 *
 * Rules:
 * - All primitives are raw strings ("0.08", "1") — no var()
 * - Kebab-case keys only (so emitted CSS is consistent)
 * - Semantic aliases map to a primitive key
 */

/* ---------------------------------------------
   1) Primitive ramp (0–100)
---------------------------------------------- */
export type OpacityRampKey =
  | "0"
  | "5"
  | "10"
  | "20"
  | "30"
  | "40"
  | "50"
  | "60"
  | "70"
  | "80"
  | "90"
  | "100";

export const opacityRamp: Record<OpacityRampKey, string> = {
  "0": "0",
  "5": "0.05",
  "10": "0.10",
  "20": "0.20",
  "30": "0.30",
  "40": "0.40",
  "50": "0.50",
  "60": "0.60",
  "70": "0.70",
  "80": "0.80",
  "90": "0.90",
  "100": "1"
} as const;

/* ---------------------------------------------
   2) Primitive state constants (interaction)
---------------------------------------------- */
export type OpacityStateKey =
  | "hover"
  | "focus"
  | "active"
  | "pressed"
  | "drag"
  | "disabled"
  | "disabled-container";

export const opacityState: Record<OpacityStateKey, string> = {
  hover: "0.08",
  focus: "0.12",
  active: "0.16",
  pressed: "0.18",
  drag: "0.24",
  disabled: "0.38",
  "disabled-container": "0.12"
} as const;

/* ---------------------------------------------
   3) Primitive surface effects
---------------------------------------------- */
export type OpacitySurfaceKey =
  | "surface-raised"
  | "surface-overlay"
  | "surface-muted";

export const opacitySurface: Record<OpacitySurfaceKey, string> = {
  "surface-raised": "0.04",
  "surface-overlay": "0.08",
  "surface-muted": "0.12"
} as const;

/* ---------------------------------------------
   4) Primitive scrims (modal/drawer backdrops)
---------------------------------------------- */
export type OpacityScrimKey =
  | "scrim-1"
  | "scrim-2"
  | "scrim-3"
  | "backdrop";

export const opacityScrim: Record<OpacityScrimKey, string> = {
  "scrim-1": "0.20",
  "scrim-2": "0.32",
  "scrim-3": "0.46",
  backdrop: "0.60"
} as const;

/* ---------------------------------------------
   5) Primitive utility constants
---------------------------------------------- */
export type OpacityUtilityKey = "divider" | "border" | "shadow";

export const opacityUtility: Record<OpacityUtilityKey, string> = {
  divider: "0.12",
  border: "0.15",
  shadow: "0.18"
} as const;

/* ---------------------------------------------
   6) Flat primitive export (used by build.ts)
   NOTE: This keeps your existing build loop intact.
---------------------------------------------- */
export type OpacityScaleKey =
  | OpacityRampKey
  | OpacityStateKey
  | OpacitySurfaceKey
  | OpacityScrimKey
  | OpacityUtilityKey;

export const opacityScale: Record<OpacityScaleKey, string> = {
  ...opacityRamp,
  ...opacityState,
  ...opacityUtility,
  ...opacitySurface,
  ...opacityScrim
} as const;

/* ---------------------------------------------
   7) Semantic aliases (what components should prefer)
---------------------------------------------- */
export type OpacitySemanticKey =
  | "interactive-hover"
  | "interactive-focus"
  | "interactive-active"
  | "interactive-pressed"
  | "interactive-drag"
  | "scrim-light"
  | "scrim-medium"
  | "scrim-strong";

export const opacitySemantic: Record<OpacitySemanticKey, OpacityScaleKey> = {
  "interactive-hover": "hover",
  "interactive-focus": "focus",
  "interactive-active": "active",
  "interactive-pressed": "pressed",
  "interactive-drag": "drag",

  "scrim-light": "scrim-1",
  "scrim-medium": "scrim-2",
  "scrim-strong": "scrim-3"
} as const;

export const opacityTokens = {
  scale: opacityScale,
  semantic: opacitySemantic
} as const;

