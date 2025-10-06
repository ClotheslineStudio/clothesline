// Minimal Culori v4 surface that we actually use.
// Delete when your toolchain picks up official types.

declare module 'culori' {
  export type ColorMode = unknown;
  export type Color = unknown;

  // core
  export function converter(mode: 'rgb' | 'p3' | 'oklch' | 'oklab'): (c: unknown) => any;
  export function formatHex(c: unknown): string;

  // gamut utilities
  export function inGamut(mode?: 'rgb' | 'p3'): (c: unknown) => boolean;
  export function clampChroma(mode?: 'oklch' | 'lch' | 'oklab' | 'lab'): (c: unknown) => any;
  export function toGamut(
    dest?: 'rgb' | 'p3',
    mode?: 'oklch' | 'lch',
    delta?: any | null,
    jnd?: number
  ): (c: unknown) => any;

  // mode registry
  export function useMode(modeDef: ColorMode): (c: unknown) => any;

  // built-in modes
  export const modeRgb: ColorMode;
  export const modeP3: ColorMode;
  export const modeOklab: ColorMode;
  export const modeOklch: ColorMode;
}

