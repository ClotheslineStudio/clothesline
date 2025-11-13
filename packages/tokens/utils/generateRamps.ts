import { interpolate } from 'culori/fn';

import { snapToGamut } from "./snapToGamut.js";
import type { OklchColor } from "./colorEngine.js";
import { toOklchCss } from "./toCssColor.js";
import { rampNames } from "../colors/oklch.js";
export { rampNames as RAMP_STEPS } from "../colors/oklch.js";
export type Step = (typeof rampNames)[number];

/**
 * ===============================================================
 * Skeleton-style OKLCH ramp generator (pure OKLCH, no chroma.js)
 * ===============================================================
 * Mimics Skeleton's seedColor logic:
 *   - brightens and darkens seed color to create anchor points
 *   - interpolates 11 OKLCH samples between light→mid→dark
 *   - clamps to sRGB gamut for web-safe export
 * ===============================================================
 */

/**
 * Adjust lightness and chroma while keeping hue stable.
 */
function adjustLCH(
  color: OklchColor,
  { lDelta = 0, cMult = 1 }: { lDelta?: number; cMult?: number }
): OklchColor {
  const l = Math.max(0.03, Math.min(0.98, color.l + lDelta));
  const c = Math.max(0, color.c * cMult);
  return { mode: "oklch", l, c, h: color.h };
}

/**
 * Main generator: produces Skeleton-like OKLCH ramps.
 */
export function generateRampFromSeed(seed: OklchColor): Record<Step, string> {
  const base: OklchColor = {
    mode: "oklch",
    l: seed.l ?? 0.5,
    c: seed.c ?? 0.1,
    h: seed.h ?? 0,
  };

  // Equivalent to Skeleton’s seedColor brighten/darken(2.5)
  const light = adjustLCH(base, { lDelta: +0.32, cMult: 0.65 }); // brighten
  const dark  = adjustLCH(base, { lDelta: -0.35, cMult: 0.7 });  // darken

  // Interpolate through [light → mid → dark] in OKLCH
  const interpolateOKLCH = interpolate([light, base, dark], "oklch");
  const out: Record<Step, string> = {};

  // Even spacing for 11 shades (50–950)
  for (let i = 0; i < rampNames.length; i++) {
    const t = i / (rampNames.length - 1); // normalized 0–1
    const raw = interpolateOKLCH(t) as OklchColor;
    const snapped = snapToGamut(raw, "srgb");
    out[rampNames[i]] = toOklchCss(snapped);
  }

  return out;
}










