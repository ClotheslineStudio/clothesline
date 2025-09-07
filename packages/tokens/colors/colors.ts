import { generateOklchRamp } from './oklch.js';

export const roleHues = {
  primary: 260,   // purple
  secondary: 220, // blue
  tertiary: 180,  // teal
  success: 145,   // green
  warning: 75,    // yellow
  error: 25,      // red
  info: 200,      // light blue
  accent: 310,    // pink
  neutral: 270,   // gray-violet
  surface: 0      // grayscale
} as const;

export const chromaDefaults = {
  surface: 0.01,
  neutral: 0.03
} as const;

export const colorRoles = Object.keys(roleHues) as (keyof typeof roleHues)[];
export const colorShades = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950] as const;


export const colorRamps: Record<string, string[]> = {};

for (const [role, hue] of Object.entries(roleHues)) {
  const chroma = chromaDefaults[role as keyof typeof chromaDefaults] ?? 0.09;
  colorRamps[role] = generateOklchRamp(hue, chroma);
}

// 🔥 REMOVE the "if" temporarily — run it unconditionally
for (const [role, ramp] of Object.entries(colorRamps)) {
  console.log(`🎨 ${role}`);
  ramp.forEach((color, i) => {
    console.log(`  ${[50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950][i]} → ${color}`);
  });
  console.log();
}
