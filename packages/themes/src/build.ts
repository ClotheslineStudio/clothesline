// packages/themes/src/build.ts
// ============================================================================
// Clothesline Theme Builder (clean fixed version)
// ============================================================================

import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';

import { baseTokens } from '../../tokens/src/index.js';
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
type Step = 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | 950;
const SHADES: Step[] = [50,100,200,300,400,500,600,700,800,900,950];
const SHADE_ORDER_REV: Step[] = [...SHADES].reverse() as Step[];

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir   = path.resolve(__dirname, '../dist');
const modesCssPath = path.resolve(__dirname, './modes.css');

// ============================================================================
// 1. Local helper to reverse a ramp for dark mode
// ============================================================================
function flipRampForDark(ramp: Record<Step, string>): Record<Step, string> {
  const out = {} as Record<Step, string>;
  for (let i = 0; i < SHADES.length; i++) {
    const lightStep = SHADES[i];
    const darkStep  = SHADE_ORDER_REV[i];
    out[lightStep] = ramp[darkStep];
  }
  return out;
}

// ============================================================================
// 2. Inline seed-anchored ramp generator (no external confusion)
// ============================================================================
function clamp01(x: number) { return Math.max(0, Math.min(1, x)); }
function limitChromaByLightness(L: number, C: number): number {
  const C_limit = L > 0.90 ? 0.04 : L > 0.80 ? 0.05 : L > 0.70 ? 0.09 : 0.16;
  return Math.min(Math.max(0, C), C_limit);
}
function lockHueIfUseful(snapped: OklchColor, L: number, baseHue: number): OklchColor {
  if (L <= 0.80) return { ...snapped, h: baseHue };
  return snapped;
}

const L_PLAN: Record<Step, number> = {
  50: 0.985, 100: 0.960, 200: 0.900, 300: 0.800, 400: 0.720,
  500: 0.640, 600: 0.560, 700: 0.480, 800: 0.400, 900: 0.320, 950: 0.260
};
const L_PLAN_SURFACE: Record<Step, number> = { ...L_PLAN, 50: 0.992, 100: 0.968 };
const C_SHAPE_PUNCH: Record<Step, number> = {
  50: 0.04, 100: 0.06, 200: 0.09, 300: 0.12, 400: 0.14,
  500: 0.15, 600: 0.14, 700: 0.12, 800: 0.10, 900: 0.08, 950: 0.06
};
const C_CAPS_NEUTRAL: Record<Step, number> = {
  50: 0.000, 100: 0.000, 200: 0.003, 300: 0.006, 400: 0.008,
  500: 0.012, 600: 0.012, 700: 0.010, 800: 0.008, 900: 0.006, 950: 0.006
};

const NEAR_ZERO = 0.0005;
const NEUTRAL_THRESHOLD = 0.03;

function generateRampFromSeed(seed: OklchColor): Record<Step, string> {
  const baseL = typeof seed.l === 'number' ? seed.l : 0.64;
  const baseC = typeof seed.c === 'number' ? seed.c : 0.12;
  const baseH = typeof seed.h === 'number' ? seed.h : 0;

  const isSurface = baseC <= NEAR_ZERO;
  const isNeutral = !isSurface && baseC < NEUTRAL_THRESHOLD;

  const lPlan = isSurface ? L_PLAN_SURFACE : L_PLAN;
  const cRef  = isSurface ? C_CAPS_NEUTRAL : (isNeutral ? C_CAPS_NEUTRAL : C_SHAPE_PUNCH);
  const Lmid  = lPlan[500];
  const CrefPeak = 0.15;

  const out = {} as Record<Step, string>;
  for (const step of SHADES) {
    if (step === 500) {
      out[step] = `oklch(${(baseL*100).toFixed(2)}% ${baseC.toFixed(4)} ${baseH.toFixed(2)})`;
      continue;
    }
    const Ldelta = lPlan[step] - Lmid;
    const L = clamp01(baseL + Ldelta * 0.95);
    const cScale = CrefPeak ? baseC / CrefPeak : 0;
    const Craw   = cRef[step] * cScale;
    const C      = limitChromaByLightness(L, Craw);

    let col: OklchColor = { mode: 'oklch', l: L, c: C, h: baseH };
    col = lockHueIfUseful(col, L, baseH);
    out[step] = `oklch(${(col.l*100).toFixed(2)}% ${col.c.toFixed(4)} ${col.h?.toFixed(2) ?? 0})`;
  }
  return out;
}

// ============================================================================
// 3. Read seeds from theme configs
// ============================================================================
const ROLES = [
  'primary','secondary','tertiary',
  'success','warning','error','info',
  'accent','neutral','surface'
] as const;
type RoleName = typeof ROLES[number];

function getRoleSeed(theme: ThemeConfig, mode: ThemeMode, role: RoleName): OklchColor | null {
  const seedNode: any =
    (theme as any).seeds?.[role] ??
    (theme as any).roles?.[role] ??
    (theme as any)[role] ??
    (theme as any).colors?.[role] ??
    null;

  if (!seedNode) return null;

  // true OKLCH seed
  if (typeof seedNode.l === 'number' && typeof seedNode.c === 'number' && typeof seedNode.h === 'number') {
    return { mode: 'oklch', l: seedNode.l, c: seedNode.c, h: seedNode.h };
  }

  // fallback {hue, chroma}
  if (typeof seedNode.hue === 'number') {
    const h = seedNode.hue;
    const c = typeof seedNode.chroma === 'number' ? seedNode.chroma : 0.12;
    const l = (theme as any).seeds?.[role]?.l ?? 0.64;
    return { mode: 'oklch', l, c, h };
  }

  // string color
  if (typeof seedNode === 'string') {
    const o = toOklch(seedNode);
    if (o && typeof o.l === 'number') return { mode: 'oklch', l: o.l, c: o.c, h: o.h };
  }

  return null;
}

// ============================================================================
// 4. Build ramps and write CSS
// ============================================================================
function rampsForTheme(theme: ThemeConfig, mode: ThemeMode): Record<string, Record<Step, string>> {
  const result: Record<string, Record<Step, string>> = {};
  for (const role of ROLES) {
    const seed = getRoleSeed(theme, mode, role);
    if (!seed) continue;
    // DEBUG: show the seed we're actually using
if (role === 'primary' && mode === 'light') {
  console.log('DEBUG seed check →', {
    theme: theme.name,
    role,
    l: seed.l,
    c: seed.c,
    h: seed.h
  });
}

    const ramp = generateRampFromSeed(seed);
    result[role] = mode === 'dark' ? flipRampForDark(ramp) : ramp;
  }
  return result;
}

function toCSSVars(obj: Record<string, string>): string {
  return Object.entries(obj).map(([k,v]) => `  ${k.startsWith('--') ? k : `--${k}`}: ${v};`).join('\n');
}

function roleVars(theme: ThemeConfig, mode: ThemeMode): string {
  const ramps = rampsForTheme(theme, mode);
  const pole = mode === 'dark' ? 'white' : 'black';
  const lines: string[] = [];
  for (const role of Object.keys(ramps)) {
    const ramp = ramps[role] as Record<Step, string>;
    for (const shade of SHADES) {
      const val = ramp[shade];
      lines.push(
        `  --color-${role}-${shade}: ${val};`,
        `  --color-${role}-${shade}-ct: color-mix(in oklab, var(--color-${role}-${shade}) calc(100% - var(--k-ct)), ${pole} var(--k-ct));`,
        `  --color-${role}-${shade}-vis: var(--color-${role}-${shade}-ct);`
      );
    }
  }
  return lines.join('\n');
}

// ============================================================================
// 5. Compose the final CSS
// ============================================================================
function onVars(mode: ThemeMode) {
  return mode === 'light'
    ? `--on-primary: var(--color-surface-50);
--on-secondary: var(--color-surface-50);
--on-tertiary: var(--color-surface-50);
--on-success: var(--color-surface-50);
--on-warning: var(--color-surface-950);
--on-error: var(--color-surface-50);
--on-info: var(--color-surface-50);`
    : `--on-primary: var(--color-surface-950);
--on-secondary: var(--color-surface-950);
--on-tertiary: var(--color-surface-950);
--on-success: var(--color-surface-950);
--on-warning: var(--color-surface-950);
--on-error: var(--color-surface-950);
--on-info: var(--color-surface-950);`;
}

function themeCSS(theme: ThemeConfig): string {
  const tokens = toCSSVars(baseTokens);
  const light = `
html[data-theme='${theme.name}'][data-mode='light'] {
  --k-ct: clamp(0%, calc((var(--contrast-factor,1) - 1) * 120%), 25%);
${roleVars(theme,'light')}
${tokens}
${onVars('light')}
}`;
  const dark = `
html[data-theme='${theme.name}'][data-mode='dark'] {
  --k-ct: clamp(0%, calc((var(--contrast-factor,1) - 1) * 120%), 25%);
${roleVars(theme,'dark')}
${tokens}
${onVars('dark')}
}`;
  return `${light}\n\n${dark}\n`;
}

async function buildTheme(theme: ThemeConfig) {
  const css = themeCSS(theme);
  const file = path.join(distDir, `${theme.name}.css`);
  await fs.outputFile(file, css);
  console.log(`✅ Built ${path.relative(process.cwd(), file)}`);
}

async function copyModes() {
  const dest = path.join(distDir, 'modes.css');
  if (await fs.pathExists(modesCssPath)) await fs.copy(modesCssPath, dest);
}

async function writeManifest(themes: ThemeConfig[]) {
  const manifest = themes.map(t => ({
    name: t.name,
    roles: t.roles,
    defaults: t.modes?.defaults ?? { mode:'light' },
    presets: t.modes?.presets ?? {}
  }));
  const file = path.join(distDir, 'themes.json');
  await fs.outputJson(file, manifest, { spaces:2 });
}

async function run() {
  const themes: ThemeConfig[] = [
    clotheslineTheme, timberlineTheme, nightMarketTheme,
    retrogradeTheme, tidalGlassTheme, copperSunTheme,
    milkywayTheme, bigSkyTheme
  ];
  await fs.ensureDir(distDir);
  await Promise.all(themes.map(buildTheme));
  await copyModes();
  await writeManifest(themes);
  console.log('✨ Done.');
}

run().catch(err => { console.error('Build failed:', err); process.exit(1); });












