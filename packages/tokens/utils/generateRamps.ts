// packages/tokens/utils/generateRamps.ts

// Update the import path below if the types file is located elsewhere
import type { ThemeConfig, ThemeMode } from '../../themes/src/types.ts';

export function generateColorRamps(theme: ThemeConfig, mode: ThemeMode): Record<string, string[]> {
  const lightnessSteps = mode === 'light'
    ? [97.5, 95, 90, 82, 70, 55, 45, 35, 25, 15, 7]
    : [15, 20, 30, 40, 50, 60, 70, 80, 88, 94, 97];

  const ramps: Record<string, string[]> = {};

  for (const [role, colorDef] of Object.entries(theme.roles) as [string, { hue: number; chroma: number }][]) {
    const { hue, chroma } = colorDef;
    ramps[role] = lightnessSteps.map(l => `oklch(${l}% ${chroma} ${hue}deg)`);
  }

  return ramps;
}
