// packages/themes/src/build.ts
import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';

import { generateColorRamps } from '../../tokens/utils/generateRamps.ts';
import { baseTokens } from '../../tokens/src/index.js';
import type { ThemeConfig } from './types.ts';

// Theme configs (single-source, no variants)
import { clotheslineTheme } from '../configs/clothesline.ts';
import { timberlineTheme }   from '../configs/timberline.ts';
import { nightMarketTheme }  from '../configs/night-market.ts';
import { retrogradeTheme }   from '../configs/retrograde.ts';
import { tidalGlassTheme }   from '../configs/tidal-glass.ts';
import { copperSunTheme }    from '../configs/copper-sun.ts';
import { milkywayTheme }     from '../configs/milkyway.ts';

type ThemeMode = 'light' | 'dark';
const SHADES = [50,100,200,300,400,500,600,700,800,900,950] as const;

// Shades & families we actually adjust for vision (keep lean)
const VISION_SHADE_STEPS = [300, 400, 500, 600] as const;
const VISION_FAMILIES    = ['primary', 'success', 'warning', 'error', 'info'] as const;

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir   = path.resolve(__dirname, '../dist');
const modesCssPath = path.resolve(__dirname, './modes.css');

function toCSSVars(obj: Record<string, string>): string {
  return Object.entries(obj)
    .map(([k, v]) => `  ${k.startsWith('--') ? k : `--${k}`}: ${v};`)
    .join('\n');
}

/**
 * Emit base ramp + contrast companion (-ct) + vision alias (-vis)
 * - base:   --color-role-600
 * - -ct:    mixed toward black by --k-ct (derived from --contrast-factor in modes.css)
 * - -vis:   defaults to -ct; vision layer can repoint/override if you want that path
 */
// packages/themes/src/build.ts
function roleVars(theme: ThemeConfig, mode: ThemeMode): string {
  const ramps = generateColorRamps(theme, mode);
  const pole = mode === 'dark' ? 'white' : 'black'; // ⬅️ flip target in dark

  const lines: string[] = [];
  for (const [role, colors] of Object.entries(ramps)) {
    (colors as string[]).forEach((color, i) => {
      const shade = SHADES[i];
      const base = `--color-${role}-${shade}`;
      lines.push(
        `  ${base}: ${color};`,
        // use mode-specific pole; magnitude still comes from --k-ct
        `  ${base}-ct: color-mix(in oklab, var(${base}) calc(100% - var(--k-ct)), ${pole} var(--k-ct));`,
        `  ${base}-vis: var(${base}-ct);`
      );
    });
  }
  return lines.join('\n');
}

/** Small helper for vision blocks: read from -ct, write to the base var */
function oklchFromCT(varName: string, exprL: string, exprC: string, exprH: string) {
  return `  ${varName}: oklch(from var(${varName}-ct) ${exprL} ${exprC} ${exprH});`;
}

/**
 * Vision modes (protanopia, deuteranopia, tritanopia, monochrome)
 * - Append once per theme file, AFTER light/dark so we adjust the contrast-mixed values.
 * - We only touch key families & shades commonly used by components for a minimal delta.
 */
function renderVision(): string {
  const protan: string[] = [];
  const deutan: string[] = [];
  const tritan: string[] = [];
  const mono:   string[] = [];

  // PROTANOPIA
  // Primary: +H, -C (small); Error: away from red, -C; Success/Info: +L for separation
  for (const shade of VISION_SHADE_STEPS) {
    protan.push(oklchFromCT(`--color-primary-${shade}`, 'L', 'calc(C * 0.85)', 'calc(H + 12deg)'));
  }
  for (const shade of [400, 500, 600] as const) {
    protan.push(oklchFromCT(`--color-error-${shade}`, 'L', 'calc(C * 0.80)', 'calc(H - 18deg)'));
  }
  for (const shade of [400, 500, 600] as const) {
    protan.push(oklchFromCT(`--color-success-${shade}`, 'calc(L + 5%)', 'C', 'H'));
  }
  for (const shade of [400, 500] as const) {
    protan.push(oklchFromCT(`--color-info-${shade}`, 'calc(L + 3%)', 'C', 'H'));
  }

  // DEUTERANOPIA
  // Success: +H, -C, +L; Primary: slight +H, -C; Warning: -H a touch
  for (const shade of [400, 500, 600] as const) {
    deutan.push(oklchFromCT(`--color-success-${shade}`, 'calc(L + 6%)', 'calc(C * 0.70)', 'calc(H + 18deg)'));
  }
  for (const shade of [400, 500] as const) {
    deutan.push(oklchFromCT(`--color-primary-${shade}`, 'L', 'calc(C * 0.88)', 'calc(H + 8deg)'));
  }
  for (const shade of [400, 500] as const) {
    deutan.push(oklchFromCT(`--color-warning-${shade}`, 'calc(L + 2%)', 'C', 'calc(H - 8deg)'));
  }

  // TRITANOPIA
  // Info: -C, -H, +L; Warning: +H, ~-C, +L; Primary: counter -H for separation
  for (const shade of [400, 500] as const) {
    tritan.push(oklchFromCT(`--color-info-${shade}`, 'calc(L + 6%)', 'calc(C * 0.70)', 'calc(H - 18deg)'));
  }
  for (const shade of [400, 500] as const) {
    tritan.push(oklchFromCT(`--color-warning-${shade}`, 'calc(L + 4%)', 'calc(C * 0.75)', 'calc(H + 18deg)'));
  }
  for (const shade of [400, 500] as const) {
    tritan.push(oklchFromCT(`--color-primary-${shade}`, 'L', 'calc(C * 0.88)', 'calc(H - 8deg)'));
  }

  // MONOCHROME – semantic families to grayscale (neutrals/surfaces are already near gray)
  for (const family of VISION_FAMILIES) {
    for (const shade of VISION_SHADE_STEPS) {
      mono.push(oklchFromCT(`--color-${family}-${shade}`, 'L', '0', 'H'));
    }
  }

  return `
/* =========================
   Vision Modes (stacked)
   ========================= */
html[data-vision='protanopia'] {
${protan.join('\n')}
}
html[data-vision='deuteranopia'] {
${deutan.join('\n')}
}
html[data-vision='tritanopia'] {
${tritan.join('\n')}
}
html[data-vision='monochrome'] {
${mono.join('\n')}
}
`.trim();
}

/** Per-theme CSS generator (light + dark + vision), single file output */
function themeCSS(theme: ThemeConfig): string {
  const tokens = toCSSVars(baseTokens);

  const light = `
/* Theme: ${theme.name}, Mode: light */
html[data-theme='${theme.name}'][data-mode='light'] {
  /* Map --contrast-factor (1.0–1.4) to a safe darken percent (0%–25%) */
  --k-ct: clamp(0%, calc((var(--contrast-factor, 1) - 1) * 120%), 25%);
${roleVars(theme, 'light')}
${tokens}
}`;

  const dark = `
/* Theme: ${theme.name}, Mode: dark */
html[data-theme='${theme.name}'][data-mode='dark'] {
  /* Same mapping for dark mode (adjust per-theme as needed) */
  --k-ct: clamp(0%, calc((var(--contrast-factor, 1) - 1) * 120%), 25%);
${roleVars(theme, 'dark')}
${tokens}
}`;

  const vision = renderVision();

  return `${light}\n\n${dark}\n\n${vision}\n`;
}

/** Write one CSS file per theme */
async function buildTheme(theme: ThemeConfig) {
  const css = themeCSS(theme);
  const file = path.join(distDir, `${theme.name}.css`);
  await fs.outputFile(file, css);
  console.log(`✅ Built ${path.relative(process.cwd(), file)}`);
}

/** Copy modes.css (holds attribute-driven knobs like --contrast-factor presets) */
async function copyModes() {
  const dest = path.join(distDir, 'modes.css');
  if (await fs.pathExists(modesCssPath)) {
    await fs.copy(modesCssPath, dest);
    console.log(`✅ Copied ${path.relative(process.cwd(), dest)}`);
  } else {
    console.warn('⚠️  modes.css not found beside build.ts. Create packages/themes/src/modes.css and re-run.');
  }
}

/** Emit themes manifest for consumers/docs */
async function writeManifest(themes: ThemeConfig[]) {
  const manifest = themes.map(t => ({
    name: t.name,
    roles: t.roles,
    defaults: t.modes?.defaults ?? { mode: 'light' },
    presets:  t.modes?.presets ?? {}
  }));
  const file = path.join(distDir, 'themes.json');
  await fs.outputJson(file, manifest, { spaces: 2 });
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
  ];

  await fs.ensureDir(distDir);
  await Promise.all(themes.map(buildTheme));
  await copyModes();
  await writeManifest(themes);

  console.log('✨ Done.');
}

run().catch(err => {
  console.error('Build failed:', err);
  process.exit(1);
});









