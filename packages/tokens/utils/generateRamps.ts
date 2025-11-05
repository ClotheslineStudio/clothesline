/**
 * ===============================================================
 * Clothesline Tokens — generateRamps.ts (updated)
 * ===============================================================
 * Purpose:
 *   Generate smooth, perceptually balanced OKLCH color ramps.
 *   Prevents pure white/black clipping and supports adaptive
 *   range + future accessibility variants.
 */

import { snapToGamut } from "./snapToGamut.js";
import type { OklchColor } from "./colorEngine.js";
import { toOklchCss } from "./toCssColor.js";
import { rampNames } from "../colors/oklch.js";
export { rampNames as RAMP_STEPS } from "../colors/oklch.js";
export type Step = (typeof rampNames)[number];

/* ===========================================================
   Baseline shape references
   =========================================================== */

const L_PLAN: Record<Step, number> = {
  50: 0.985, 100: 0.960, 200: 0.900, 300: 0.800, 400: 0.720,
  500: 0.640, 600: 0.560, 700: 0.480, 800: 0.400, 900: 0.320, 950: 0.260
};

const L_PLAN_SURFACE: Record<Step, number> = {
  ...L_PLAN, 50: 0.992, 100: 0.968
};

const C_SHAPE_PUNCH: Record<Step, number> = {
  50: 0.04, 100: 0.06, 200: 0.09, 300: 0.12, 400: 0.14,
  500: 0.15, 600: 0.14, 700: 0.12, 800: 0.10, 900: 0.08, 950: 0.06
};

const C_CAPS_NEUTRAL: Record<Step, number> = {
  50: 0.000, 100: 0.000, 200: 0.003, 300: 0.006, 400: 0.008,
  500: 0.012, 600: 0.012, 700: 0.010, 800: 0.008, 900: 0.006, 950: 0.006
};

const NEAR_ZERO = 0.0005;
const NEUTRAL_THRESHOLD = 0.03;

/* ===========================================================
   Utility helpers
   =========================================================== */

function clamp01(x: number) {
  return Math.max(0, Math.min(1, x));
}

/** Adaptive clamp that prevents 0 or 1 */
function safeClamp(l: number, seedL = 0.64) {
  // narrower range for extreme seeds so ramps stay visible
  const range = 0.75;
  const min = Math.max(0.04, seedL - range / 2);
  const max = Math.min(0.96, seedL + range / 2);
  return Math.min(max, Math.max(min, l));
}

/** Adjusts contrast ( >1 = more contrast, <1 = lower ) */
export function adjustContrast(seed: OklchColor, factor = 1.1): OklchColor {
  let l = 0.5 + (seed.l - 0.5) * factor;
  return { ...seed, l: safeClamp(l), c: seed.c * factor };
}

/** Limit chroma depending on lightness to stay inside sRGB */
function limitChromaByLightness(L: number, C: number): number {
  const C_limit =
    L > 0.90 ? 0.04 :
    L > 0.80 ? 0.06 :
    L > 0.70 ? 0.10 :
    L > 0.50 ? 0.14 :
    0.18;
  return Math.min(Math.max(0, C), C_limit);
}

/** Optional small lift for dark-mode */
export function adjustForDark(color: OklchColor): OklchColor {
  return { ...color, l: Math.min(1, color.l * 1.05), c: color.c * 1.08 };
}

/* ===========================================================
   Main generator
   =========================================================== */

export function generateRampFromSeed(seed: OklchColor): Record<Step, string> {
  const baseL = seed.l ?? 0.64;
  const baseC = seed.c ?? 0.12;
  const baseH = seed.h ?? 0;
  const out: Record<Step, string> = {};

  const steps = rampNames.length;
  const midIndex = Math.floor(steps / 2);

  // ranges – allow more distance toward light for dark seeds
  const upRange = Math.min(0.55, 1 - baseL * 0.6);
  const downRange = Math.min(0.55, baseL * 0.9);

  // slightly steeper ease for better separation near ends
  const ease = (x: number) =>
    x < 0.5
      ? 0.5 * Math.pow(2 * x, 1.6)
      : 1 - 0.5 * Math.pow(2 * (1 - x), 1.6);

  for (let i = 0; i < steps; i++) {
    // reverse so 50 = light, 950 = dark
    const j = steps - 1 - i;
    const step = rampNames[i];

    if (j === midIndex) {
      out[step] = toOklchCss(snapToGamut(seed, "srgb"));
      continue;
    }

    const t = (j - midIndex) / midIndex; // -1 → 1
    const sign = Math.sign(t);
    const amt = Math.abs(t);

    // perceptual lightness curve anchored on seed
    const deltaL = ease(amt) * (sign > 0 ? upRange : -downRange);
    const l = safeClamp(baseL + deltaL, baseL);

    // chroma behaviour
    const chromaFalloff = Math.exp(-3.2 * Math.pow(amt, 1.3));
    const lightBias = l > baseL ? 1 + 0.55 * (l - baseL) : 1;
    const darkBias  = l < baseL ? 1 - 0.25 * (baseL - l) : 1;
    const cTarget   = baseC * chromaFalloff * lightBias * darkBias;

    // relaxed limiter – keep hue visible even at high L
    const cLimit =
      l > 0.95 ? 0.12 :
      l > 0.90 ? 0.14 :
      l > 0.80 ? 0.16 :
      l > 0.65 ? 0.18 :
      l > 0.50 ? 0.19 :
      0.20;

    const c = Math.min(cTarget, cLimit);

    const col: OklchColor = snapToGamut({ mode: "oklch", l, c, h: baseH }, "srgb");
    out[step] = toOklchCss(col);
  }

  return out;
}









/* ===========================================================
   Placeholder for future vision-mode transforms
   =========================================================== */

export function simulateVision(color: OklchColor, type: 'deuteranopia'|'protanopia'|'tritanopia'|'mono'): OklchColor {
  // basic grayscale fallback for now; full matrix in figma build
  if (type === 'mono') {
    return { ...color, c: 0 };
  }
  return color;
}

/* ===========================================================
   Back-compat export
   =========================================================== */
export const generateColorRamps = generateRampFromSeed;






