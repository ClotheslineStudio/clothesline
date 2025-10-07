// Build ONE Tokens Studio JSON with:
//  - "global" (radius, spacing) extracted from @clothesline/tokens baseTokens (flat CSS var map)
//  - one set per theme+mode (colors): "<theme>.<mode>"
// Writes to BOTH: dist/figma/tokens.json and tokens/tokens.json

import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';

import { generateColorRampFromSeed, rampNames } from '@clothesline/tokens/colors';
import { baseTokens } from '@clothesline/tokens';

import type { ThemeConfig } from './types.ts';
import type { OklchColor } from '../../tokens/utils/colorEngine.js';
import { toOklch } from '../../tokens/utils/colorEngine.js';

// Themes (same ones you use in build.ts)
import { clotheslineTheme } from '../configs/clothesline.ts';
import { timberlineTheme }   from '../configs/timberline.ts';
import { nightMarketTheme }  from '../configs/night-market.ts';
import { retrogradeTheme }   from '../configs/retrograde.ts';
import { tidalGlassTheme }   from '../configs/tidal-glass.ts';
import { copperSunTheme }    from '../configs/copper-sun.ts';
import { milkywayTheme }     from '../configs/milkyway.ts';
import { bigSkyTheme }       from '../configs/bigsky.ts';

type ThemeMode = 'light' | 'dark';
const ROLES = ['primary','secondary','tertiary','success','warning','error','info','accent','neutral','surface'] as const;
type RoleName = typeof ROLES[number];

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDist   = path.resolve(__dirname, '../dist/figma');
const outRepo   = path.resolve(__dirname, '../tokens');
const MERGED    = 'tokens.json';

const THEMES: ThemeConfig[] = [
  clotheslineTheme,
  timberlineTheme,
  nightMarketTheme,
  retrogradeTheme,
  tidalGlassTheme,
  copperSunTheme,
  milkywayTheme,
  bigSkyTheme
];

/* ---------------- helpers ---------------- */
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
      const h = input.hue, c = typeof input.chroma === 'number' ? input.chroma : 0.12;
      return { mode: 'oklch', l: 0.64, c, h };
    }
    if (input.mode === 'oklch' && typeof input.l === 'number') {
      return { mode: 'oklch', l: input.l, c: input.c ?? 0, h: input.h ?? fallbackHue, alpha: input.alpha };
    }
    if (typeof input.l === 'number' && typeof input.c === 'number') {
      return { mode: 'oklch', l: input.l, c: input.c, h: input.h ?? fallbackHue, alpha: input.alpha };
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

// DTCG "dimension" tokens from a flat CSS var map (e.g. '--radius-md': '0.5rem')
function emitDimensionsFromCssVars(varsObj: Record<string, string>, prefix: string) {
  const out: Record<string, any> = {};

  const set = (root: any, parts: string[], val: any) => {
    let node = root;
    for (let i = 0; i < parts.length - 1; i++) {
      node[parts[i]] ||= {};
      node = node[parts[i]];
    }
    node[parts[parts.length - 1]] = val;
  };

  for (const [k, v] of Object.entries(varsObj)) {
    if (k === prefix) {
      // exact match → put under "base"
      set(out, ['base'], { $type: 'dimension', $value: String(v) });
      continue;
    }
    if (k.startsWith(prefix + '-')) {
      // strip the prefix and split remainder by '-' to build a path
      const slug = k.slice((prefix + '-').length);
      if (!slug) continue;
      const parts = slug.split('-').filter(Boolean);
      set(out, parts, { $type: 'dimension', $value: String(v) });
    }
  }
  return out;
}

/* --------------- builders --------------- */

function buildGlobalSet() {
  const global: any = {};
  const vars = baseTokens as unknown as Record<string, string>;

  const radius = emitDimensionsFromCssVars(vars, '--radius');
  if (Object.keys(radius).length) global.radius = radius;

  const spacing = emitDimensionsFromCssVars(vars, '--spacing');
  if (Object.keys(spacing).length) global.spacing = spacing;

  // Add more categories later by prefix, e.g.:
  // const sizes = emitDimensionsFromCssVars(vars, '--size');
  // if (Object.keys(sizes).length) global.size = sizes;

  return global;
}

function buildThemeModeSet(theme: ThemeConfig, mode: ThemeMode) {
  const set: any = { color: {} };
  for (const role of ROLES) {
    const src: any = (theme as any).roles?.[role] ?? (theme as any)[role] ?? (theme as any).colors?.[role] ?? null;
    const seed = coerceToOklch(src);
    if (!seed) continue;
    let ramp = generateColorRampFromSeed(seed) as Record<Step, string>; // {50:'oklch(...)',...}
    if (mode === 'dark') ramp = flipRampForDark(ramp);
    const roleObj: Record<string, any> = {};
    for (const step of rampNames) roleObj[step] = { $type: 'color', $value: ramp[step] };
    set.color[role] = roleObj;
  }
  return set;
}

/* ------------------- run ------------------- */

async function run() {
  await fs.ensureDir(outDist);
  await fs.ensureDir(outRepo);

  const file: any = {
    $description: 'Clothesline tokens (merged sets for Tokens Studio single-file sync)',
    $metadata: {
      tokenSetOrder: ['global', ...THEMES.flatMap(t => [`${t.name}.light`, `${t.name}.dark`])]
    },
    global: buildGlobalSet()
  };

  for (const theme of THEMES) {
    file[`${theme.name}.light`] = buildThemeModeSet(theme, 'light');
    file[`${theme.name}.dark`]  = buildThemeModeSet(theme, 'dark');
  }

  const distFile = path.join(outDist, MERGED);
  const repoFile = path.join(outRepo, MERGED);
  await fs.outputJson(distFile, file, { spaces: 2 });
  await fs.outputJson(repoFile, file, { spaces: 2 });

  console.log(`✅ Wrote ${path.relative(process.cwd(), distFile)}`);
  console.log(`✅ Wrote ${path.relative(process.cwd(), repoFile)}`);
}

run().catch(err => {
  console.error('Figma merged build failed:', err);
  process.exit(1);
});

