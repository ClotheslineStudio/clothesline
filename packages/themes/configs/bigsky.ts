// packages/themes/configs/bigsky.ts
import type { ThemeConfig } from 'src/types.js';

const roles = {
  primary:   { hue: 230, chroma: 0.14 }, // clear-sky blue
  secondary: { hue: 180, chroma: 0.10 }, // blue-green
  tertiary:  { hue:  60, chroma: 0.08 }, // sunlight yellow
  success:   { hue: 140, chroma: 0.09 },
  warning:   { hue:  50, chroma: 0.10 },
  error:     { hue:  10, chroma: 0.09 },
  info:      { hue: 200, chroma: 0.11 },
  accent:    { hue: 280, chroma: 0.12 }, // wildflower purple
  neutral:   { hue: 240, chroma: 0.03 },
  surface:   { hue: 210, chroma: 0.01 }  // snowy blue‑white
} as const;

/**
 * Big Sky — base palette plus optional mode guidance.
 * - No baked-in contrast/vision variants. Those are runtime via attributes + modes.css.
 * - You can still define presets (one-click states) and tiny deltas (variable overrides) here.
 */
export const bigSkyTheme: ThemeConfig = {
  name: 'bigsky',
  roles,

  modes: {
    // Default starting state when someone picks this theme
    defaults: {
      mode: 'light',         // light/dark palettes are both emitted; this is just the default
      vision: 'none',
      contrast: 'normal',
      typescale: 1.0,
      ui: [],
      motor: [],
      focus: true            // opt-in stronger :focus-visible by default (nice for demos)
    },

    // Optional one-click presets for your builder
    presets: {
      // Good “accessibility-first” preset
      accessible: { contrast: 'high', typescale: 1.1, ui: ['simplified'], motor: ['kbd'] },
      // A reading-focused preset
      reading:    { reading: 'dyslexia', typescale: 1.08, motion: 'reduced', focus: true },
      // A dark showcase preset
      night:      { mode: 'dark', contrast: 'normal', dev: ['grid'] }
    },

    // Optional tiny CSS var/utility deltas (keep these minimal!)
    deltas: {
      contrast: {
        high: { vars: { '--focus-ring': 'oklch(82% 0.25 230)' } },
        // custom: documentElement.style.setProperty('--contrast-factor', n) at runtime
      },
      // Example: if you want mono to slightly raise neutral separation in this theme only
      vision: {
        mono: { vars: { '--neutral-boost': 0.02 }, note: 'Used by generator to widen neutral steps' }
      },
      // Keyboard mode: stronger outlines in this theme
      motor: {
        kbd: { selectors: [":focus-visible"], note: 'See modes.css for the actual outline rule' }
      }
    }
  }
};

