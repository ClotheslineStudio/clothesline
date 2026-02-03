// packages/themes/src/build-formats.ts
import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';

// Prefer the clean subpath; if your editor complains, switch to the relative fallback:
// import { rampFormatsFromSeed, rampNames } from '../../tokens/colors/index.js';
// Removed duplicate import; all imports must be at the top level.

import type { ThemeConfig } from '../types.ts';
import type { OklchColor } from '../../../tokens/utils/colorEngine.js';
import { toOklch } from '../../../tokens/utils/colorEngine.js';

// Theme configs (same list you use in build.ts)
import { clotheslineTheme } from '../../configs/clothesline.ts';
import { timberlineTheme }   from '../../configs/timberline.ts';
import { nightMarketTheme }  from '../../configs/night-market.ts';
import { retrogradeTheme }   from '../../configs/retrograde.ts';
import { tidalGlassTheme }   from '../../configs/tidal-glass.ts';
import { copperSunTheme }    from '../../configs/copper-sun.ts';
import { milkywayTheme }     from '../../configs/milkyway.ts';
import { bigSkyTheme }       from '../../configs/bigsky.ts';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const pkgRoot = path.resolve(__dirname, '../..'); // …/packages/themes
const distDir = path.join(pkgRoot, 'dist', 'formats');


type ThemeMode = 'light' | 'dark';
const ROLES = [
  'primary','secondary','tertiary',
  'success','warning','error','info',
  'accent','neutral','surface'
] as const;
type RoleName = typeof ROLES[number];

import { generateRampFromSeed, RAMP_STEPS as rampNames } from '../../../tokens/utils/generateRamps.js';

/** Coerce various config shapes into an OKLCH seed. (Copied from build.ts pattern) */
type Step = (typeof rampNames)[number];

const SHADE_ORDER = rampNames as Step[];
const SHADE_ORDER_REV = [...SHADE_ORDER].reverse() as Step[];

function flipOneRamp<T extends Record<Step, string>>(r: T): T {
  const out = {} as T;
  for (let i = 0; i < SHADE_ORDER.length; i++) {
    const lightStep = SHADE_ORDER[i];
    const darkStep  = SHADE_ORDER_REV[i];
    (out as any)[lightStep] = r[darkStep];
  }
  return out;
}

function flipFormatsForDark(formats: Record<string, Record<Step, string>>) {
  const out: typeof formats = {};
  for (const k of Object.keys(formats)) out[k] = flipOneRamp(formats[k] as any);
  return out;
}

function getRoleSeed(theme: ThemeConfig, mode: ThemeMode, role: RoleName): OklchColor | null {
  const node: any =
    (theme as any).seeds?.[role] ??
    (theme as any).roles?.[role] ??
    (theme as any)[role] ??
    (theme as any).colors?.[role] ??
    null;

  function coerceToOklch(input: any, fallbackHue = 0): OklchColor | null {
    if (input == null) return null;

    if (typeof input === 'string') {
      const o: any = toOklch(input);
      if (o && typeof o.l === 'number') {
        return { mode: 'oklch', l: o.l, c: o.c ?? 0, h: o.h ?? fallbackHue, alpha: o.alpha };
      }
      return null;
    }
    if (typeof input === 'number') {
      return { mode: 'oklch', l: 0.64, c: 0.12, h: input };
    }
    if (typeof input === 'object') {
      if (typeof input.hue === 'number') {
        const h = input.hue;
        const c = typeof input.chroma === 'number' ? input.chroma : 0.12;
        return { mode: 'oklch', l: 0.64, c, h };
      }
      if (input.mode === 'oklch' && typeof input.l === 'number') {
        return { mode: 'oklch', l: input.l, c: input.c ?? 0, h: input.h ?? fallbackHue, alpha: input.alpha };
      }
      if (typeof input.l === 'number' && typeof input.c === 'number') {
        return { mode: 'oklch', l: input.l, c: input.c, h: input.h ?? fallbackHue, alpha: input.alpha };
      }
      if (input.light !== undefined || input.dark !== undefined) {
        const pick = input[mode] ?? input.light ?? input.dark;
        const hGuess = typeof input.hue === 'number' ? input.hue : fallbackHue;
        return coerceToOklch(pick, hGuess);
      }
      if (input.seed?.light !== undefined || input.seed?.dark !== undefined) {
        const pick = input.seed[mode] ?? input.seed.light ?? input.seed.dark;
        return coerceToOklch(pick, fallbackHue);
      }
      if (input.seed !== undefined) return coerceToOklch(input.seed, fallbackHue);
      if (input.value !== undefined) return coerceToOklch(input.value, fallbackHue);

      const o: any = toOklch(input);
      if (o && typeof o.l === 'number') {
        return { mode: 'oklch', l: o.l, c: o.c ?? 0, h: o.h ?? fallbackHue, alpha: o.alpha };
      }
    }
    return null;
  }

  const seed = coerceToOklch(node);
  if (!seed) {
    console.warn(`[formats] No seed for role "${role}" in "${(theme as any).name}" (${mode}).`);
  }
  return seed;
}

async function writeFormats(theme: ThemeConfig) {
  const out: any = {
    name: theme.name,
    steps: rampNames,
    light: {},
    dark: {}
  };

  for (const mode of ['light', 'dark'] as const) {
    for (const role of ROLES) {
      const seed = getRoleSeed(theme, mode, role);
      if (!seed) continue;
      const ramp = generateRampFromSeed(seed);
      const fmts = { hex: ramp } as Record<string, Record<Step, string>>;
      out[mode][role] = mode === 'dark' ? flipFormatsForDark(fmts) : fmts;
    }
  }

  const file = path.join(distDir, `${theme.name}-formats.json`);
  await fs.outputJson(file, out, { spaces: 2 });
  console.log(`✅ Wrote ${path.relative(process.cwd(), file)}`);
}

async function run() {
  const themes: ThemeConfig[] = [
    clotheslineTheme,
    timberlineTheme,
    nightMarketTheme,
    retrogradeTheme,
    tidalGlassTheme,
    copperSunTheme,
    milkywayTheme,
    bigSkyTheme
  ];
  await fs.ensureDir(distDir);
  for (const t of themes) {
    // Optional: only write light by default. Currently writes both light & dark.
    await writeFormats(t);
  }
  console.log('✨ Formats done.');
}

run().catch(err => {
  console.error('Formats build failed:', err);
  process.exit(1);
});
