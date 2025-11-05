// ============================================================================
// Clothesline Theme Builder — Clean Unified Version
// ============================================================================

import fs from "fs-extra";
import path from "path";
import { fileURLToPath } from "url";

// Tokens + utilities
import { baseTokens } from "../../tokens/src/index.js";
import type { ThemeConfig } from "./types.ts";
import type { OklchColor } from "../../tokens/utils/colorEngine.js";
import { toOklch } from "../../tokens/utils/colorEngine.js";
import { generateRampFromSeed } from "../../tokens/utils/generateRamps.js";

// Theme configs
import { clotheslineTheme } from "../configs/clothesline.ts";
import { timberlineTheme } from "../configs/timberline.ts";
import { nightMarketTheme } from "../configs/night-market.ts";
import { retrogradeTheme } from "../configs/retrograde.ts";
import { tidalGlassTheme } from "../configs/tidal-glass.ts";
import { copperSunTheme } from "../configs/copper-sun.ts";
import { milkywayTheme } from "../configs/milkyway.ts";
import { bigSkyTheme } from "../configs/bigsky.ts";

// ============================================================================
// Setup
// ============================================================================
type ThemeMode = "light" | "dark";
type Step = 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | 950;
const SHADES: Step[] = [50,100,200,300,400,500,600,700,800,900,950];
const SHADE_ORDER_REV: Step[] = [...SHADES].reverse() as Step[];

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir   = path.resolve(__dirname, "../dist");
const modesCssPath = path.resolve(__dirname, "./modes.css");

// ============================================================================
// 1. Flip a ramp for dark mode
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
// 2. Read seed color from theme config
// ============================================================================
const ROLES = [
  "primary","secondary","tertiary",
  "success","warning","error","info",
  "accent","neutral","surface"
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

  if (typeof seedNode.l === "number" && typeof seedNode.c === "number" && typeof seedNode.h === "number") {
    return { mode: "oklch", l: seedNode.l, c: seedNode.c, h: seedNode.h };
  }

  if (typeof seedNode.hue === "number") {
    const h = seedNode.hue;
    const c = typeof seedNode.chroma === "number" ? seedNode.chroma : 0.12;
    const l = (theme as any).seeds?.[role]?.l ?? 0.64;
    return { mode: "oklch", l, c, h };
  }

  if (typeof seedNode === "string") {
    const o = toOklch(seedNode);
    if (o && typeof o.l === "number") return { mode: "oklch", l: o.l, c: o.c, h: o.h };
  }

  return null;
}

// ============================================================================
// 3. Build all ramps from seeds
// ============================================================================
function rampsForTheme(theme: ThemeConfig, mode: ThemeMode): Record<string, Record<Step, string>> {
  const result: Record<string, Record<Step, string>> = {};
  for (const role of ROLES) {
    const seed = getRoleSeed(theme, mode, role);
    if (!seed) continue;

    const ramp = generateRampFromSeed(seed);
    result[role] = mode === "dark" ? flipRampForDark(ramp) : ramp;
  }
  return result;
}

// ============================================================================
// 4. Compose CSS variables
// ============================================================================
function toCSSVars(obj: Record<string, string>): string {
  return Object.entries(obj)
    .map(([k, v]) => `  ${k.startsWith("--") ? k : `--${k}`}: ${v};`)
    .join("\n");
}

function roleVars(theme: ThemeConfig, mode: ThemeMode): string {
  const ramps = rampsForTheme(theme, mode);
  const pole = mode === "dark" ? "white" : "black";
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
  return lines.join("\n");
}

// ============================================================================
// 5. On-color tokens
// ============================================================================
function onVars(mode: ThemeMode) {
  return mode === "light"
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

// ============================================================================
// 6. Build theme CSS
// ============================================================================
function themeCSS(theme: ThemeConfig): string {
  const tokens = toCSSVars(baseTokens);
  const light = `
html[data-theme='${theme.name}'][data-mode='light'] {
  --k-ct: clamp(0%, calc((var(--contrast-factor,1) - 1) * 120%), 25%);
${roleVars(theme, "light")}
${tokens}
${onVars("light")}
}`;
  const dark = `
html[data-theme='${theme.name}'][data-mode='dark'] {
  --k-ct: clamp(0%, calc((var(--contrast-factor,1) - 1) * 120%), 25%);
${roleVars(theme, "dark")}
${tokens}
${onVars("dark")}
}`;
  return `${light}\n\n${dark}\n`;
}

// ============================================================================
// 7. Build + output files
// ============================================================================
async function buildTheme(theme: ThemeConfig) {
  const css = themeCSS(theme);
  const file = path.join(distDir, `${theme.name}.css`);
  await fs.outputFile(file, css);
  console.log(`✅ Built ${path.relative(process.cwd(), file)}`);
}

async function copyModes() {
  const dest = path.join(distDir, "modes.css");
  if (await fs.pathExists(modesCssPath)) await fs.copy(modesCssPath, dest);
}

async function writeManifest(themes: ThemeConfig[]) {
  const manifest = themes.map(t => ({
    name: t.name,
    roles: t.roles,
    defaults: t.modes?.defaults ?? { mode: "light" },
    presets: t.modes?.presets ?? {}
  }));
  const file = path.join(distDir, "themes.json");
  await fs.outputJson(file, manifest, { spaces: 2 });
}

// ============================================================================
// 8. Run build
// ============================================================================
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

  console.log("✨ Done.");
}

run().catch(err => {
  console.error("Build failed:", err);
  process.exit(1);
});











