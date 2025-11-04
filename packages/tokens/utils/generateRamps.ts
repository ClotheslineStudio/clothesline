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

  // how far we let L wander from the seed
  const upRange = Math.min(0.4, 1 - baseL);     // how much lighter
  const downRange = Math.min(0.4, baseL);       // how much darker

  // shape curve (–1 → +1) mapped to your 11 steps
  const curve = [-1.0, -0.8, -0.6, -0.4, -0.2, 0, 0.2, 0.4, 0.6, 0.8, 1.0];

  const Cpeak = Math.max(0.03, baseC); // preserve some chroma for low-C seeds

  rampNames.forEach((step, i) => {
    if (step === 500) {
      out[step] = toOklchCss(seed);
      return;
    }

    // map -1..1 to 0..1 lightness
    const t = curve[i];
    const lShift = t > 0 ? t * upRange : t * downRange;
    const l = clamp01(baseL + lShift);

    // chroma tapers off toward ends of ramp
    const c = Cpeak * (1 - Math.pow(Math.abs(t), 1.5));

    let col: OklchColor = { mode: "oklch", l, c, h: baseH };
    col = snapToGamut(col, "srgb");
    out[step] = toOklchCss(col);
  });

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






