// Serialize a Culori OKLCH color to a CSS color string.
import type { OklchColor } from './colorEngine.js';

export function toOklchCss(c: OklchColor): string {
  // OKLCH in CSS uses percentages for L and 'deg' for hue
  const l = Math.max(0, Math.min(1, c.l)) * 100; // 0–100%
  const chroma = Math.max(0, c.c);
  const h = (c.h ?? 0);
  if (c.alpha !== undefined && c.alpha !== 1) {
    return `oklch(${l.toFixed(3)}% ${chroma.toFixed(5)} ${h.toFixed(2)}deg / ${c.alpha})`;
  }
  return `oklch(${l.toFixed(3)}% ${chroma.toFixed(5)} ${h.toFixed(2)}deg)`;
}
