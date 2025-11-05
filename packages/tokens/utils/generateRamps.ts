import { snapToGamut } from "./snapToGamut.js";
import type { OklchColor } from "./colorEngine.js";
import { toOklchCss } from "./toCssColor.js";
import { rampNames } from "../colors/oklch.js";
export { rampNames as RAMP_STEPS } from "../colors/oklch.js";
export type Step = (typeof rampNames)[number];

/**
 * ===============================================================
 * OKLCH Balanced Ramp Generator
 * ===============================================================
 * Grounded in perceptual best practices:
 *  - Constant hue (tiny optional drift for warmth/coolness balance)
 *  - Smooth exponential lightness curve (~0.98 → 0.10)
 *  - Chroma peaks mid-ramp, tapered at both extremes
 *  - Clamp to sRGB gamut safely via snapToGamut()
 * ===============================================================
 */

/** Target normalized lightness plan (perceptual spacing, 50→950) */
const L_TARGET: Record<Step, number> = {
  50: 0.97, 100: 0.92, 200: 0.84, 300: 0.74, 400: 0.64,
  500: 0.54, 600: 0.44, 700: 0.34, 800: 0.24, 900: 0.15, 950: 0.08
};

/**
 * Chroma curve — near 0 at ends, peak around midrange.
 * Keeps color lively but avoids muddy mids.
 */
function chromaForStep(baseC: number, step: Step): number {
  const position = rampNames.indexOf(step) / (rampNames.length - 1);
  // bell-shaped curve: low on ends, strong in middle
  const bell = Math.exp(-3.5 * Math.pow(position - 0.5, 2));
  const bias = position < 0.5
    ? 0.5 + 0.5 * position // gentle lift in lights
    : 1 - 0.3 * (position - 0.5) * 2; // slight taper in darks
  const c = baseC * bell * bias * 1.15;
  return Math.max(0, c);
}

/**
 * Optional hue drift — helps certain hues (yellows, blues) avoid dirtiness.
 * Subtle 1–2° shifts through ramp are perceptually invisible but keep tone natural.
 */
function hueForStep(baseH: number, step: Step): number {
  const position = rampNames.indexOf(step) / (rampNames.length - 1);
  // shift slightly cooler (negative) in lights, warmer (+) in darks
  return baseH + (position - 0.5) * 2.0;
}

/**
 * Main generator — produces smooth, perceptually even OKLCH ramps.
 */
export function generateRampFromSeed(seed: OklchColor): Record<Step, string> {
  const baseL = seed.l ?? 0.5;
  const baseC = seed.c ?? 0.1;
  const baseH = seed.h ?? 0;

  const out: Record<Step, string> = {};
  const mid = L_TARGET[500];
  const diff = baseL - mid;
  const scale = 1 + (baseL - 0.45) * 0.5; // subtle scaling for high/low seeds

  for (const step of rampNames) {
    // adjust lightness shape so that 500 aligns with seed.l
    let L = baseL + (L_TARGET[step] - mid) * scale;
    L = Math.min(0.985, Math.max(0.05, L));

    // apply chroma & hue logic
    const C = chromaForStep(baseC, step);
    const H = hueForStep(baseH, step);

    // snap into gamut
    const col = snapToGamut({ mode: "oklch", l: L, c: C, h: H }, "srgb");
    out[step] = toOklchCss(col);
  }

  return out;
}









