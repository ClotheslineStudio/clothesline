// packages/themes/src/build-figma-merged.ts
// ===============================================================
// Builds ONE Tokens Studio JSON (tokens.json) with:
//  • global token sets (spacing, sizing, typography, etc.)
//  • one color set per theme+mode: "<theme>.<mode>"
//  • $themes mapping so light/dark become modes in Tokens Studio
// ===============================================================

import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';

import { generateRampFromSeed, RAMP_STEPS as rampNames } from '../../tokens/utils/generateRamps.js';
import { baseTokens } from '@clothesline/tokens';
import type { ThemeConfig } from './types.ts';
import type { OklchColor } from '../../tokens/utils/colorEngine.js';
import { toOklch } from '../../tokens/utils/colorEngine.js';

// Theme imports
import { clotheslineTheme } from '../configs/clothesline.ts';
import { timberlineTheme }   from '../configs/timberline.ts';
import { nightMarketTheme }  from '../configs/night-market.ts';
import { retrogradeTheme }   from '../configs/retrograde.ts';
import { tidalGlassTheme }   from '../configs/tidal-glass.ts';
import { copperSunTheme }    from '../configs/copper-sun.ts';
import { milkywayTheme }     from '../configs/milkyway.ts';
import { bigSkyTheme }       from '../configs/bigsky.ts';

// ---------------------------------------------------------------
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

const ROLES = [
  'primary','secondary','tertiary',
  'success','warning','error','info',
  'accent','neutral','surface'
] as const;
type ThemeMode = 'light' | 'dark';
type RoleName = typeof ROLES[number];
type Step = (typeof rampNames)[number];

const SHADE_ORDER     = rampNames as Step[];
const SHADE_ORDER_REV = [...SHADE_ORDER].reverse() as Step[];

function flipRampForDark(r: Record<Step, string>) {
  const out = {} as Record<Step, string>;
  for (let i = 0; i < SHADE_ORDER.length; i++) {
    out[SHADE_ORDER[i]] = r[SHADE_ORDER_REV[i]];
  }
  return out;
}

// ---------------------------------------------------------------
// Correct seed extractor (matches working build-figma-tokens.ts)
// ---------------------------------------------------------------
function getRoleSeed(theme: ThemeConfig, mode: ThemeMode, role: RoleName): OklchColor | null {
  const node: any =
    (theme as any).seeds?.[role] ??
    (theme as any).roles?.[role] ??
    (theme as any)[role] ??
    (theme as any).colors?.[role] ??
    null;

  if (!node) return null;

  // Direct OKLCH object
  if (typeof node.l === 'number' && typeof node.c === 'number' && typeof node.h === 'number') {
    return { mode: 'oklch', l: node.l, c: node.c, h: node.h };
  }

  // Hue/chroma object
  if (typeof node.hue === 'number') {
    const h = node.hue;
    const c = typeof node.chroma === 'number' ? node.chroma : 0.12;
    const l = (theme as any).seeds?.[role]?.l ?? 0.64;
    return { mode: 'oklch', l, c, h };
  }

  // String color
  if (typeof node === 'string') {
    const o = toOklch(node);
    if (o && typeof o.l === 'number') return { mode: 'oklch', l: o.l, c: o.c, h: o.h };
  }

  // Nested light/dark
  if (typeof node === 'object') {
    const pick = node[mode] ?? node.light ?? node.dark;
    if (pick) return getRoleSeed({ seeds: { [role]: pick } } as any, mode, role);
  }

  return null;
}

// ---------------------------------------------------------------
// Utilities
// ---------------------------------------------------------------
function setPath(root: any, parts: string[], val: any) {
  let node = root;
  for (let i = 0; i < parts.length - 1; i++) {
    node[parts[i]] ||= {};
    node = node[parts[i]];
  }
  node[parts[parts.length - 1]] = val;
}

/** Build nested objects from CSS var maps using a prefix and DTCG $type */
function emitFromCssVars(vars: Record<string,string>, opts: { prefix: string; type: string; renameRoot?: string }) {
  const out: Record<string, any> = {};
  for (const [k, v] of Object.entries(vars)) {
    if (!k.startsWith(opts.prefix)) continue;
    const slug = k.slice(opts.prefix.length).replace(/^\-/, '');
    const parts = slug ? slug.split('-').filter(Boolean) : ['base'];
    setPath(out, parts, { $type: opts.type, $value: String(v) });
  }
  return opts.renameRoot ? { [opts.renameRoot]: out } : out;
}

/** Global token extraction (spacing, radius, typography, etc.) */
function buildGlobalSet() {
  const vars = baseTokens as unknown as Record<string, string>;
  const global: any = {};

  Object.assign(global, emitFromCssVars(vars, { prefix: '--spacing', type: 'spacing', renameRoot: 'spacing' }));
  Object.assign(global, emitFromCssVars(vars, { prefix: '--radius', type: 'borderRadius', renameRoot: 'borderRadius' }));
  Object.assign(global, emitFromCssVars(vars, { prefix: '--border', type: 'borderWidth', renameRoot: 'borderWidth' }));
  Object.assign(global, emitFromCssVars(vars, { prefix: '--size', type: 'sizing', renameRoot: 'sizing' }));
  Object.assign(global, emitFromCssVars(vars, { prefix: '--opacity', type: 'opacity', renameRoot: 'opacity' }));
  Object.assign(global, emitFromCssVars(vars, { prefix: '--font-size', type: 'fontSizes', renameRoot: 'fontSizes' }));
  Object.assign(global, emitFromCssVars(vars, { prefix: '--line-height', type: 'lineHeights', renameRoot: 'lineHeights' }));
  Object.assign(global, emitFromCssVars(vars, { prefix: '--font-weight', type: 'fontWeights', renameRoot: 'fontWeights' }));
  Object.assign(global, emitFromCssVars(vars, { prefix: '--letter-spacing', type: 'letterSpacing', renameRoot: 'letterSpacing' }));

  return global;
}

// ---------------------------------------------------------------
// Build per-theme color token sets
// ---------------------------------------------------------------
function buildThemeModeSet(theme: ThemeConfig, mode: ThemeMode) {
  const set: any = { color: {} };
  for (const role of ROLES) {
    const seed = getRoleSeed(theme, mode, role);
    if (!seed) continue;
    let ramp = generateRampFromSeed(seed) as Record<Step, string>;
    if (mode === 'dark') ramp = flipRampForDark(ramp);
    set.color[role] = Object.fromEntries(
      rampNames.map((step: Step) => [step, { $type: 'color', $value: ramp[step] }])
    );
  }
  return set;
}

// ---------------------------------------------------------------
// Run build
// ---------------------------------------------------------------
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDist   = path.resolve(__dirname, '../dist/figma');
const outRepo   = path.resolve(__dirname, '../tokens');
const MERGED    = 'tokens.json';

async function run() {
  await fs.ensureDir(outDist);
  await fs.ensureDir(outRepo);

  const file: any = {
    $description: 'Clothesline tokens (merged) for Tokens Studio',
    $metadata: {
      tokenSetOrder: ['global', ...THEMES.flatMap(t => [`${t.name}.light`, `${t.name}.dark`])]
    },
    global: buildGlobalSet()
  };

  for (const theme of THEMES) {
    file[`${theme.name}.light`] = buildThemeModeSet(theme, 'light');
    file[`${theme.name}.dark`]  = buildThemeModeSet(theme, 'dark');
  }

  file.$themes = THEMES.flatMap(t => [
  {
    name: t.name,
    group: t.name.replace(/(^|\s)\S/g, s => s.toUpperCase()),
    mode: "Light",
    selectedTokenSets: { global: "enabled", [`${t.name}.light`]: "enabled" }
  },
  {
    name: t.name,
    group: t.name.replace(/(^|\s)\S/g, s => s.toUpperCase()),
    mode: "Dark",
    selectedTokenSets: { global: "enabled", [`${t.name}.dark`]: "enabled" }
  }
]);

  const distFile = path.join(outDist, MERGED);
  const repoFile = path.join(outRepo, MERGED);
  await fs.outputJson(distFile, file, { spaces: 2 });
  await fs.outputJson(repoFile,  file, { spaces: 2 });

  console.log(`✅ Wrote ${path.relative(process.cwd(), distFile)}`);
  console.log(`✅ Wrote ${path.relative(process.cwd(), repoFile)}`);
}

run().catch(err => {
  console.error('Figma merged build failed:', err);
  process.exit(1);
});




