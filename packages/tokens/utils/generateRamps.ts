import { snapToGamut } from "./snapToGamut.js";
import type { OklchColor } from "./colorEngine.js";
import { toOklchCss } from "./toCssColor.js";
import { rampNames } from "../colors/oklch.js";
export { rampNames as RAMP_STEPS } from "../colors/oklch.js";
export type Step = (typeof rampNames)[number];

/**
 * ===============================================================
 * Skeleton-style OKLCH ramp generator
 * ===============================================================
 * Based on Skeleton's measured Timberline ramps:
 *   - Fixed lightness targets (non-symmetric sigmoid)
 *   - Nearly constant chroma until deep shadows
 *   - Optional subtle hue drift in shadows
 * ===============================================================
 */

const L_PLAN: Record<Step, number> = {
  50: 0.84, 100: 0.76, 200: 0.69, 300: 0.61, 400: 0.53,
  500: 0.45, 600: 0.39, 700: 0.32, 800: 0.25, 900: 0.18, 950: 0.06
};

/**
 * Chroma stays flat through midrange (to about 500–600),
 * then falls toward zero linearly.
 */
function chromaShape(baseC: number, step: Step): number {
  const ratio =
    step <= 500 ? 1 :
    step === 600 ? 0.9 :
    step === 700 ? 0.7 :
    step === 800 ? 0.45 :
    step === 900 ? 0.25 :
    step === 950 ? 0.0 : 1;
  return baseC * ratio;
}

/**
 * Optional hue drift: slightly cooler in shadows.
 */
function hueShift(baseH: number, step: Step): number {
  if (step <= 500) return baseH;
  const delta =
    step === 600 ? 0.5 :
    step === 700 ? 0.8 :
    step === 800 ? 1.0 :
    step === 900 ? 1.2 :
    step === 950 ? 1.5 :
    0;
  return baseH + delta;
}

/**
 * Main generator — matches Skeleton ramp behavior.
 */
export function generateRampFromSeed(seed: OklchColor): Record<Step, string> {
  const baseL = seed.l ?? 0.45;
  const baseC = seed.c ?? 0.09;
  const baseH = seed.h ?? 150;
  const out: Record<Step, string> = {};

  for (const step of rampNames) {
    const l = L_PLAN[step];
    const c = chromaShape(baseC, step);
    const h = hueShift(baseH, step);

    let col: OklchColor = { mode: "oklch", l, c, h };
    col = snapToGamut(col, "srgb");
    out[step] = toOklchCss(col);
  }

  return out;
}







