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
import { bigSkyTheme }      from '../configs/bigsky.ts';

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
 * - -ct:    mixed toward black/white by --k-ct (derived from --contrast-factor in modes.css)
 * - -vis:   defaults to -ct; vision layer can repoint/override if you want that path
 */
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

/** Semantic foregrounds, aliases, and utilities emitted per mode */
function onVars(mode: 'light' | 'dark') {
  // In your system, surface ramps flip lightness in dark mode.
  // Using the same indices gives correct contrast in both modes.
  const roleOnLight = `
--on-primary:   var(--color-surface-50);
--on-secondary: var(--color-surface-50);
--on-tertiary:  var(--color-surface-50);
--on-success:   var(--color-surface-50);
--on-warning:   var(--color-surface-950); /* yellow needs dark text */
--on-error:     var(--color-surface-50);
--on-info:      var(--color-surface-50);`;

  const roleOnDark = `
--on-primary:   var(--color-surface-950);
--on-secondary: var(--color-surface-950);
--on-tertiary:  var(--color-surface-950);
--on-success:   var(--color-surface-950);
--on-warning:   var(--color-surface-950);
--on-error:     var(--color-surface-950);
--on-info:      var(--color-surface-950);`;

  return `
/* ===== Semantic foregrounds ===== */
--on-surface-strong: var(--color-surface-950);
--on-surface:        var(--color-surface-900);
--on-surface-muted:  var(--color-surface-700);
--on-surface-subtle: var(--color-surface-600);
--on-surface-disabled: var(--color-surface-500);
${mode === 'light' ? roleOnLight : roleOnDark}

/* ===== Aliases used by docs/components ===== */
--color-border-default: var(--border-default-color);
--color-border-subtle:  var(--border-muted-color);
--color-text-strong:    var(--on-surface-strong);
--color-text-muted:     var(--on-surface-muted);

/* ===== Focus/shadow/size fallbacks ===== */
--focus-ring: 2px solid var(--color-info-500-vis);
--focus-offset: 1px;

--shadow-sm: 0 1px 2px rgba(0,0,0,.08);
--shadow-md: 0 4px 12px rgba(0,0,0,.10);
--shadow-lg: 0 8px 24px rgba(0,0,0,.12);

--size-control-sm: 2.25rem;
--size-control-md: 2.5rem;
--size-control-lg: 2.75rem;
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
${onVars('light')}
}`;

  const dark = `
/* Theme: ${theme.name}, Mode: dark */
html[data-theme='${theme.name}'][data-mode='dark'] {
  /* Same mapping for dark mode (adjust per-theme as needed) */
  --k-ct: clamp(0%, calc((var(--contrast-factor, 1) - 1) * 120%), 25%);
${roleVars(theme, 'dark')}
${tokens}
${onVars('dark')}
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
    bigSkyTheme
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










