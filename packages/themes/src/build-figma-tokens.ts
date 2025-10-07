// packages/themes/src/build-figma-tokens.ts
import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';

// If your editor complains about the subpath import, use the relative fallback:
// import { generateColorRampFromSeed, rampNames } from '../../tokens/colors/index.js';
import { generateColorRampFromSeed, rampNames } from '@clothesline/tokens/colors';

import type { ThemeConfig } from './types.ts';
import type { OklchColor } from '../../tokens/utils/colorEngine.js';
import { toOklch } from '../../tokens/utils/colorEngine.js';

// Theme configs
import { clotheslineTheme } from '../configs/clothesline.ts';
import { timberlineTheme }   from '../configs/timberline.ts';
import { nightMarketTheme }  from '../configs/night-market.ts';
import { retrogradeTheme }   from '../configs/retrograde.ts';
import { tidalGlassTheme }   from '../configs/tidal-glass.ts';
import { copperSunTheme }    from '../configs/copper-sun.ts';
import { milkywayTheme }     from '../configs/milkyway.ts';
import { bigSkyTheme }       from '../configs/bigsky.ts';

type ThemeMode = 'light' | 'dark';
const ROLES = [
  'primary','secondary','tertiary',
  'success','warning','error','info',
  'accent','neutral','surface'
] as const;
type RoleName = typeof ROLES[number];

const __dirname  = path.dirname(fileURLToPath(import.meta.url));
const figmaDist  = path.resolve(__dirname, '../dist/figma'); // build output
const figmaRepo  = path.resolve(__dirname, '../tokens');     // committed for plugin Pull
const OUT_DIRS   = [figmaDist, figmaRepo];

/* -------------------------------- helpers --------------------------------- */

type Step = (typeof rampNames)[number];
const SHADE_ORDER = rampNames as Step[];
const SHADE_ORDER_REV = [...SHADE_ORDER].reverse() as Step[];

function flipRampForDark(ramp: Record<Step, string>): Record<Step, string> {
  const out = {} as Record<Step, string>;
  for (let i = 0; i < SHADE_ORDER.length; i++) {
    const lightStep = SHADE_ORDER[i];
    const darkStep  = SHADE_ORDER_REV[i];
    out[lightStep] = ramp[darkStep];
  }
  return out;
}



function coerceToOklch(input: any, fallbackHue = 0): OklchColor | null {
  if (input == null) return null;

  if (typeof input === 'string') {
    const o: any = toOklch(input);
    return o && typeof o.l === 'number'
      ? { mode: 'oklch', l: o.l, c: o.c ?? 0, h: o.h ?? fallbackHue, alpha: o.alpha }
      : null;
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
      const pick = input.light ?? input.dark;
      const hGuess = typeof input.hue === 'number' ? input.hue : fallbackHue;
      return coerceToOklch(pick, hGuess);
    }
    if (input.seed?.light !== undefined || input.seed?.dark !== undefined) {
      const pick = input.seed.light ?? input.seed.dark;
      return coerceToOklch(pick, fallbackHue);
    }
    if (input.seed !== undefined) return coerceToOklch(input.seed, fallbackHue);
    if (input.value !== undefined) return coerceToOklch(input.value, fallbackHue);

    const o: any = toOklch(input);
    return o && typeof o.l === 'number'
      ? { mode: 'oklch', l: o.l, c: o.c ?? 0, h: o.h ?? fallbackHue, alpha: o.alpha }
      : null;
  }
  return null;
}

function getRoleSeed(theme: ThemeConfig, _mode: ThemeMode, role: RoleName): OklchColor | null {
  const node: any =
    (theme as any).roles?.[role] ??
    (theme as any)[role] ??
    (theme as any).colors?.[role] ??
    null;

  const seed = coerceToOklch(node);
  if (!seed) {
    console.warn(`[figma] No seed for role "${role}" in "${(theme as any).name}".`);
  }
  return seed;
}

/* ------------------------------ main writer -------------------------------- */

async function writeThemeTokens(theme: ThemeConfig, mode: ThemeMode) {
  const out: any = {
    $description: `Clothesline "${theme.name}" – ${mode} mode`,
    color: {}
  };

  for (const role of ROLES) {
    const seed = getRoleSeed(theme, mode, role);
    if (!seed) continue;

    let ramp = generateColorRampFromSeed(seed) as Record<Step, string>;
    if (mode === 'dark') ramp = flipRampForDark(ramp);
    const roleObj: Record<string, any> = {};
    for (const step of rampNames) {
      roleObj[step] = { $type: 'color', $value: ramp[step] };
    }
    out.color[role] = roleObj;
  }

  const filename = `${theme.name}.${mode}.tokens.json`;
  for (const dir of OUT_DIRS) {
    await fs.outputJson(path.join(dir, filename), out, { spaces: 2 });
  }
  console.log(`✅ Wrote ${theme.name}.${mode}.tokens.json → dist/figma + tokens`);
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

  await Promise.all(OUT_DIRS.map(d => fs.ensureDir(d)));

  for (const t of themes) {
    await writeThemeTokens(t, 'light');
    await writeThemeTokens(t, 'dark');
  }

  console.log('✨ Figma color tokens generated.');
}

run().catch(err => {
  console.error('Figma tokens build failed:', err);
  process.exit(1);
});

