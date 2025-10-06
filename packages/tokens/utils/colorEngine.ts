import {
  converter,
  formatHex,
  toGamut,
  useMode,
  modeRgb,
  modeP3,
  modeOklab,
  modeOklch,
} from 'culori';

let initialized = false;
function init() {
  if (initialized) return;
  // Register built-in modes before creating helpers
  useMode(modeRgb);
  useMode(modeP3);
  useMode(modeOklab);
  useMode(modeOklch);
  initialized = true;
}
init();

// Converters (create after init)
export const toRgb   = converter('rgb');
export const toP3    = converter('p3');
export const toOklch = converter('oklch');

export const hex = formatHex;

// Gamut mappers (v4): returns a color IN the dest space
export const toSrgbGamut = toGamut('rgb', 'oklch'); // → { mode:'rgb', ... }
export const toP3Gamut   = toGamut('p3',  'oklch'); // → { mode:'p3',  ... }

// Minimal OKLCH type for our code
export type OklchColor = {
  mode: 'oklch';
  l: number;      // 0..1
  c: number;      // ≥ 0
  h?: number;     // degrees
  alpha?: number; // 0..1
};

