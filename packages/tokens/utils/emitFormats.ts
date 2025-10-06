// packages/tokens/utils/emitFormats.ts
import { rampNames } from '../colors/oklch.js';
import { generateRampFromSeed } from './generateRamps.js';
import { toOklch, toRgb, toP3, hex as toHex } from './colorEngine.js';
import type { OklchColor } from './colorEngine.js';

type Formats = {
  oklch: string;            // "oklch(…)"
  hex: string;              // "#rrggbb"
  rgb: string;              // "rgb(255, 200, 100)"
  displayP3: string;        // "color(display-p3 0.812345 0.633333 0.102938)"
};

export type RampFormats = Record<(typeof rampNames)[number], Formats>;

/** Build a gamut-safe ramp and expand each step to hex/rgb/P3 for docs & apps. */
export function rampFormatsFromSeed(seed: OklchColor): RampFormats {
  const safe = generateRampFromSeed(seed); // {50:"oklch(...)", ...}
  const out = {} as RampFormats;

  for (const step of rampNames) {
    const oklchStr = safe[step];
    const ok = toOklch(oklchStr) as OklchColor;

    // sRGB forms
    const rgb = toRgb(ok) as any; // { r,g,b } 0..1
    const hex = toHex(rgb);
    const rgbCss = `rgb(${Math.round(rgb.r * 255)}, ${Math.round(rgb.g * 255)}, ${Math.round(rgb.b * 255)})`;

    // Display-P3 (progressive enhancement)
    const p3 = toP3(ok) as any; // { r,g,b } 0..1
    const p3Css = `color(display-p3 ${clamp01(p3.r)} ${clamp01(p3.g)} ${clamp01(p3.b)})`;

    out[step] = { oklch: oklchStr, hex, rgb: rgbCss, displayP3: p3Css };
  }
  return out;
}

function clamp01(v: number) {
  const x = Math.max(0, Math.min(1, v));
  return x.toFixed(6);
}
