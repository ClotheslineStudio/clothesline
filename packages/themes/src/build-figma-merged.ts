// packages/themes/src/build-figma-merged.ts
// Builds ONE Tokens Studio JSON (tokens.json) with:
//  - global (spacing, borderRadius, borderWidth, sizing, opacity, fontSizes, fontWeights, lineHeights, letterSpacing)
//  - synthesized spacing semantics (stack/grid/form/nav/section + gap.*)
//  - one color set per theme+mode: "<theme>.<mode>"
//  - $themes so light/dark become modes of the same collection
//
// Writes to BOTH: dist/figma/tokens.json and tokens/tokens.json

import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';

import { generateColorRampFromSeed, rampNames } from '@clothesline/tokens/colors';
import { baseTokens } from '@clothesline/tokens';

import type { ThemeConfig } from './types.ts';
import type { OklchColor } from '../../tokens/utils/colorEngine.js';
import { toOklch } from '../../tokens/utils/colorEngine.js';

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

type Step = (typeof rampNames)[number];
const SHADE_ORDER     = rampNames as Step[];
const SHADE_ORDER_REV = [...SHADE_ORDER].reverse() as Step[];

function flipRampForDark(r: Record<Step,string>) {
  const out = {} as Record<Step,string>;
  for (let i=0;i<SHADE_ORDER.length;i++) out[SHADE_ORDER[i]] = r[SHADE_ORDER_REV[i]];
  return out;
}

function setPath(root: any, parts: string[], val: any) {
  let node = root;
  for (let i = 0; i < parts.length - 1; i++) {
    node[parts[i]] ||= {};
    node = node[parts[i]];
  }
  node[parts[parts.length - 1]] = val;
}

function coerceToOklch(input: any, fallbackHue = 0): OklchColor | null {
  if (input == null) return null;
  if (typeof input === 'string') {
    const o: any = toOklch(input);
    return o && typeof o.l === 'number'
      ? { mode:'oklch', l:o.l, c:o.c ?? 0, h:o.h ?? fallbackHue, alpha:o.alpha }
      : null;
  }
  if (typeof input === 'number') return { mode:'oklch', l:0.64, c:0.12, h:input };
  if (typeof input === 'object') {
    if (typeof input.hue === 'number')
      return { mode:'oklch', l:0.64, c: typeof input.chroma==='number'?input.chroma:0.12, h: input.hue };
    if (input.mode === 'oklch' && typeof input.l === 'number')
      return { mode:'oklch', l:input.l, c:input.c ?? 0, h:input.h ?? fallbackHue, alpha: input.alpha };
    if (typeof input.l === 'number' && typeof input.c === 'number')
      return { mode:'oklch', l:input.l, c:input.c, h:input.h ?? fallbackHue, alpha: input.alpha };
    if (input.seed?.light !== undefined || input.seed?.dark !== undefined)
      return coerceToOklch(input.seed.light ?? input.seed.dark, fallbackHue);
    if (input.seed !== undefined)  return coerceToOklch(input.seed, fallbackHue);
    if (input.value !== undefined) return coerceToOklch(input.value, fallbackHue);
    const o: any = toOklch(input);
    return o && typeof o.l === 'number'
      ? { mode:'oklch', l:o.l, c:o.c ?? 0, h:o.h ?? fallbackHue, alpha:o.alpha }
      : null;
  }
  return null;
}



const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDist   = path.resolve(__dirname, '../dist/figma');
const outRepo   = path.resolve(__dirname, '../tokens');
const MERGED    = 'tokens.json';

/** Build nested objects from CSS var maps using a prefix and DTCG $type */
function emitFromCssVars(
  varsObj: Record<string,string>,
  opts: { prefix: string; type: string; renameRoot?: string }
) {
  const out: Record<string, any> = {};
  const _setPath = (root: any, parts: string[], val: any) => {
    let node = root;
    for (let i=0;i<parts.length-1;i++) {
      node[parts[i]] ||= {};
      node = node[parts[i]];
    }
    node[parts[parts.length-1]] = val;
  };
  for (const [k, v] of Object.entries(varsObj)) {
    if (!k.startsWith(opts.prefix)) continue;
    const slug = k.slice(opts.prefix.length).replace(/^\-/, '');
    const parts = slug ? slug.split('-').filter(Boolean) : ['base'];
    _setPath(out, parts, { $type: opts.type, $value: String(v) });
  }
  return opts.renameRoot ? { [opts.renameRoot]: out } : out;
}



/** Map your CSS variables → DTCG categories for Figma Variables */
function buildGlobalSet() {
  const vars = baseTokens as unknown as Record<string,string>;
  const global: any = {};

  // Core scales
  Object.assign(global, emitFromCssVars(vars, { prefix: '--spacing',     type: 'spacing',      renameRoot: 'spacing' }));
  Object.assign(global, emitFromCssVars(vars, { prefix: '--radius',      type: 'borderRadius', renameRoot: 'borderRadius' }));
  Object.assign(global, emitFromCssVars(vars, { prefix: '--border',      type: 'borderWidth',  renameRoot: 'borderWidth' }));
  Object.assign(global, emitFromCssVars(vars, { prefix: '--size',        type: 'sizing',       renameRoot: 'sizing' }));
  Object.assign(global, emitFromCssVars(vars, { prefix: '--opacity',     type: 'opacity',      renameRoot: 'opacity' }));

  // Typography scales
  Object.assign(global, emitFromCssVars(vars, { prefix: '--font-size',      type: 'fontSizes',     renameRoot: 'fontSizes' }));
  Object.assign(global, emitFromCssVars(vars, { prefix: '--line-height',    type: 'lineHeights',   renameRoot: 'lineHeights' }));
  Object.assign(global, emitFromCssVars(vars, { prefix: '--font-weight',    type: 'fontWeights',   renameRoot: 'fontWeights' }));
  Object.assign(global, emitFromCssVars(vars, { prefix: '--letter-spacing', type: 'letterSpacing', renameRoot: 'letterSpacing' }));

  // Synthesized spacing semantics (references to the spacing scale)
  global.spacing ||= {};
  const spacingRefs: Record<string,string> = {
    'semantic.stack':   '{spacing.5}',
    'semantic.grid':    '{spacing.4}',
    'semantic.form':    '{spacing.4}',
    'semantic.nav':     '{spacing.3}',
    'semantic.section': '{spacing.8}',
    'gap.small':        '{spacing.2}',
    'gap.base':         '{spacing.3}',
    'gap.large':        '{spacing.6}'
  };
  for (const [dotPath, ref] of Object.entries(spacingRefs)) {
    const parts = ['spacing', ...dotPath.split('.')];
    setPath(global, parts, { $type: 'spacing', $value: ref });
  }

  // Scaling (Numbers)
{
  const map: Record<string, string> = {
    '--text-scaling': 'text',
    '--ui-scaling': 'ui',
    '--icon-scaling': 'icon',
    '--density-scaling': 'density',
    '--scaling-xs': 'xs',
    '--scaling-sm': 'sm',
    '--scaling-md': 'md',
    '--scaling-lg': 'lg',
    '--scaling-xl': 'xl',
    '--tap-target-scale': 'tapTarget',
    '--focus-ring-scale': 'focusRing',
    '--control-height-multiplier': 'controlHeight',
  };
  const root = (global.scales ||= {});
  for (const [cssVar, key] of Object.entries(map)) {
    const val = (vars as any)[cssVar];
    if (val != null) setPath(root, [key], { $type: 'number', $value: String(val) });
  }
}
// Helper to convert duration strings like "200ms" or "0.2s" to milliseconds as number
function toMsNumber(val: string): number | null {
  if (val.endsWith('ms')) return parseFloat(val);
  if (val.endsWith('s')) return parseFloat(val) * 1000;
  const num = parseFloat(val);
  return isNaN(num) ? null : num;
}

// Motion (duration as Number ms; easing as String)
{
  const motionRoot = (global.motion ||= {});
  const durRoot = (motionRoot.duration ||= {});
  const durations: Record<string, string> = {
    '--motion-duration-fast': 'fast',
    '--motion-duration-base': 'base',
    '--motion-duration-slow': 'slow',
  };
  for (const [cssVar, key] of Object.entries(durations)) {
    const raw = (vars as any)[cssVar];
    const ms = raw != null ? toMsNumber(String(raw)) : null;
    if (ms != null) setPath(durRoot, [key], { $type: 'number', $value: ms });
  }
  const ease = (vars as any)['--motion-ease'];
  if (ease != null) setPath(motionRoot, ['ease'], { $type: 'string', $value: String(ease) });
  const scale = (vars as any)['--motion-scale'];
  if (scale != null) setPath(motionRoot, ['scale'], { $type: 'number', $value: String(scale) });
}
// Control sizing (Numbers) e.g. --size-control-sm/md/lg
{
  const ctrlRoot = (global.sizing ||= {});
  const control = (ctrlRoot.control ||= {});
  const sizeVars = Object.entries(vars).filter(([k]) => k.startsWith('--size-control-'));
  for (const [k, v] of sizeVars) {
    const name = k.replace('--size-control-', ''); // sm|md|lg...
    setPath(control, [name], { $type: 'sizing', $value: String(v) });
  }
}


  return global;
}

function buildThemeModeSet(theme: ThemeConfig, mode: ThemeMode) {
  const set: any = { color: {} };
  for (const role of ROLES) {
    const src: any = (theme as any).roles?.[role] ?? (theme as any)[role] ?? (theme as any).colors?.[role] ?? null;
    const seed = coerceToOklch(src);
    if (!seed) continue;
    let ramp = generateColorRampFromSeed(seed) as Record<Step,string>;
    if (mode === 'dark') ramp = flipRampForDark(ramp);
    set.color[role] = Object.fromEntries(
      rampNames.map(step => [step, { $type:'color', $value: ramp[step] }])
    );
  }
  return set;
}

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

  // $themes → light/dark as modes; include global as enabled so it pushes to Figma
  file.$themes = THEMES.flatMap(t => ([
    {
      name: t.name,
      mode: 'Light',
      group: t.name.replace(/(^|\s)\S/g, s => s.toUpperCase()),
      selectedTokenSets: { global: 'enabled', [`${t.name}.light`]: 'enabled' }
    },
    {
      name: t.name,
      mode: 'Dark',
      group: t.name.replace(/(^|\s)\S/g, s => s.toUpperCase()),
      selectedTokenSets: { global: 'enabled', [`${t.name}.dark`]: 'enabled' }
    }
  ]));

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



