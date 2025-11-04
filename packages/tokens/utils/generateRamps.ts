// packages/tokens/utils/generateRamps.ts
/**
 * ===============================================================
 * Clothesline Tokens — generateRamps.ts
 * ===============================================================
 * Purpose:
 *   Generate smooth, perceptually balanced OKLCH color ramps
 *   for light and dark themes. Uses your OKLCH seed as the
 *   centerpoint (500) and builds gradients around it.
 *
 * Goals:
 *   1. Keep ramps inside sRGB gamut.
 *   2. Preserve hue constancy across steps.
 *   3. Keep 500 == exact seed color.
 *   4. Support neutral/surface detection via chroma.
 */

import { snapToGamut } from "./snapToGamut.js";
import type { OklchColor } from "./colorEngine.js";
import { toOklchCss } from "./toCssColor.js";
import { rampNames } from "../colors/oklch.js";
export { rampNames as RAMP_STEPS } from "../colors/oklch.js";
export type Step = (typeof rampNames)[number];

/* ===========================================================
   Baseline lightness & chroma shapes
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
   Helpers
   =========================================================== */

function clamp01(x: number) {
  return Math.max(0, Math.min(1, x));
}

function limitChromaByLightness(L: number, C: number): number {
  const C_limit =
    L > 0.90 ? 0.04 :
    L > 0.80 ? 0.05 :
    L > 0.70 ? 0.09 :
    0.16;
  return Math.min(Math.max(0, C), C_limit);
}

function lockHueIfUseful(snapped: OklchColor, L: number, baseHue: number): OklchColor {
  if (L <= 0.80) return { ...snapped, h: baseHue };
  return snapped;
}

/** optional small lift for dark-mode */
export function adjustForDark(color: OklchColor): OklchColor {
  return { ...color, l: Math.min(1, color.l * 1.05), c: color.c * 1.08 };
}

/* ===========================================================
   Main generator (seed-anchored)
   =========================================================== */

/**
 * Generate a smooth, gamut-safe ramp around a seed color.
 * Step 500 == exact seed.
 */
export function generateRampFromSeed(seed: OklchColor): Record<Step, string> {
  const baseL = typeof seed.l === "number" ? seed.l : 0.64;
  const baseC = typeof seed.c === "number" ? seed.c : 0.12;
  const baseH = typeof seed.h === "number" ? seed.h : 0;

  const isSurface = baseC <= NEAR_ZERO;
  const isNeutral = !isSurface && baseC < NEUTRAL_THRESHOLD;

  const lPlan = isSurface ? L_PLAN_SURFACE : L_PLAN;
  const cRef = isSurface ? C_CAPS_NEUTRAL : (isNeutral ? C_CAPS_NEUTRAL : C_SHAPE_PUNCH);

  const LmidPlan = lPlan[500];
  const CrefPeak = 0.15;

  const out = {} as Record<Step, string>;

  for (const step of rampNames) {
    // lock exact seed on 500
    if (step === 500) {
      out[step] = toOklchCss({ mode: "oklch", l: baseL, c: baseC, h: baseH });
      continue;
    }

    // Lightness shape centered on seed
    const Ldelta = lPlan[step] - LmidPlan;
    const L = clamp01(baseL + Ldelta * 0.95);

    // Chroma shape scaled to seed
    const cScale = CrefPeak > 0 ? baseC / CrefPeak : 0;
    const Craw = cRef[step] * cScale;
    const C = limitChromaByLightness(L, Craw);

    // Compose + gamut-safe + hue-locked
    let col: OklchColor = { mode: "oklch", l: L, c: C, h: baseH };
    col = snapToGamut(col, "srgb");
    col = lockHueIfUseful(col, L, baseH);

    out[step] = toOklchCss(col);
  }

  return out;
}

/* ===========================================================
   Back-compat export
   =========================================================== */
export const generateColorRamps = generateRampFromSeed;





