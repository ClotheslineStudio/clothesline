// ============================================================================
// Clothesline Theme Builder — Clean Unified Version
// ============================================================================

import fs from "fs-extra";
import path from "node:path";
import { fileURLToPath } from "node:url";

// Tokens + utilities
import { baseTokens } from "../../tokens/src/index.js";
import type { ThemeConfig } from "./types.ts";
import type { OklchColor } from "../../tokens/utils/colorEngine.js";
import { toOklch } from "../../tokens/utils/colorEngine.js";
import { generateRampFromSeed } from "../../tokens/utils/generateRamps.js";
import { renderVision } from "./utils/renderVision.js";


// Theme configs
import { clotheslineTheme } from "../configs/clothesline.ts";
import { timberlineTheme } from "../configs/timberline.ts";
import { nightMarketTheme } from "../configs/night-market.ts";
import { retrogradeTheme } from "../configs/retrograde.ts";
import { tidalGlassTheme } from "../configs/tidal-glass.ts";
import { copperSunTheme } from "../configs/copper-sun.ts";
import { milkywayTheme } from "../configs/milkyway.ts";
import { bigSkyTheme } from "../configs/bigsky.ts";
import { spacingScale, spacingSemantic } from "../../tokens/src/spacing/spacing.ts";
import { radiusScale, radiusSemantic, type RadiusScaleKey, type RadiusSemanticKey } from "node_modules/@clothesline/tokens/src/radius/radius.ts";
import { componentScaling, motionDurations, motionEase, motionScale, scalingBase, scalingPresets } from "node_modules/@clothesline/tokens/src/scaling/scaling.ts";
import { sizeScale, sizeSemantic } from "node_modules/@clothesline/tokens/src/sizes/sizes.ts";
import { borderScale, borderSemantic } from "node_modules/@clothesline/tokens/src/borders/borders.ts";
import { typeFamilies, typeLineHeight, typeRoles, typeScale, typeTracking, typeWeights, typographyTokens } from "node_modules/@clothesline/tokens/src/typography/typography.ts";

function section(title: string, content: string): string {
  if (!content.trim()) return "";
  return `
  /* ========================================
     ${title}
  ======================================== */
${content}
`;
}


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
  // -------------------------------------------------------------
  // 1. Special handling for "surface" role with light/dark seeds
  // -------------------------------------------------------------
  const seedGroup = (theme as any).seeds?.[role];

  // seeds.surface = { light: {...}, dark: {...} }
  if (role === "surface" && seedGroup && typeof seedGroup === "object") {
    const surfaceSeed = mode === "light" ? seedGroup.light : seedGroup.dark;

    if (surfaceSeed && typeof surfaceSeed.l === "number") {
      return {
        mode: "oklch",
        l: surfaceSeed.l,
        c: surfaceSeed.c,
        h: surfaceSeed.h,
      };
    }
  }

  // -------------------------------------------------------------
  // 2. Standard theme roles or seeds
  // -------------------------------------------------------------
  const seedNode: any =
    (theme as any).seeds?.[role] ??
    (theme as any).roles?.[role] ??
    (theme as any)[role] ??
    (theme as any).colors?.[role] ??
    null;

  if (!seedNode) return null;

  // seedNode = { l, c, h }
  if (typeof seedNode.l === "number" && typeof seedNode.c === "number" && typeof seedNode.h === "number") {
    return { mode: "oklch", l: seedNode.l, c: seedNode.c, h: seedNode.h };
  }

  // seedNode = { hue, chroma }
  if (typeof seedNode.hue === "number") {
    const h = seedNode.hue;
    const c = typeof seedNode.chroma === "number" ? seedNode.chroma : 0.12;
    const l =
      (theme as any).seeds?.[role]?.l ??
      (theme as any).seeds?.[role]?.light?.l ?? // fallback support
      0.64;

    return { mode: "oklch", l, c, h };
  }

  // seedNode = "#hex" or "oklch(...)" string
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

    if (role === "surface") {
      // Surface ramp is identical in both modes
      result[role] = ramp;
    } else {
      // Other roles flip in dark mode
      result[role] = mode === "dark"
        ? flipRampForDark(ramp)
        : ramp;
    }
  }

  return result;
}


// ============================================================================
// 4. Compose CSS variables
// ============================================================================
function toCSSVars(obj: Record<string, string | Record<string, string | Record<string, string>>>): string {
  const entries: [string, string][] = [];
  
  function flattenObject(obj: any, prefix = ""): void {
    for (const [key, value] of Object.entries(obj)) {
      const fullKey = prefix ? `${prefix}-${key}` : key;
      
      if (typeof value === "string") {
        entries.push([fullKey, value]);
      } else if (typeof value === "object" && value !== null) {
        flattenObject(value, fullKey);
      }
    }
  }
  
  flattenObject(obj);

  // 2) Group by prefix (before the first "-")
  const groups: Record<string, [string, string][]> = {};

  for (const [key, value] of entries) {
    const withoutPrefix = key.startsWith("--") ? key.slice(2) : key;
    const prefix = withoutPrefix.split("-")[0] || "misc"; // e.g. "spacing", "radius", "type", "background"
    if (!groups[prefix]) groups[prefix] = [];
    groups[prefix].push([key, value]);
  }

  // 3) Build blocks: sorted group names, sorted keys inside each
  const groupNames = Object.keys(groups).sort(); // alphabetic group order

  const blocks = groupNames.map((group) => {
    const lines = groups[group]
      .sort((a, b) => a[0].localeCompare(b[0])) // sort vars inside the group
      .map(([k, v]) => `  ${k.startsWith("--") ? k : `--${k}`}: ${v};`)
      .join("\n");

    return `  /* ${group.toUpperCase()} */\n${lines}`;
  });

  // 4) Join all groups with a blank line between them
  return blocks.join("\n\n");
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
// 5. Spacingtokens
// ============================================================================
function spacingVars() {
  const out: Record<string, string> = {};

  // Base scale
  for (const key in spacingScale) {
    out[`spacing-${key}`] = spacingScale[key as keyof typeof spacingScale];
  }

  // Semantic tokens
  for (const key in spacingSemantic) {
    const scaleKey = spacingSemantic[key as keyof typeof spacingSemantic];
    out[`spacing-${key}`] = `var(--spacing-${scaleKey})`;
  }

  return toCSSVars(out);
}

// ============================================================================
// 6. Radius tokens
// ============================================================================
function radiusVars(): string {
  const out: Record<string, string> = {};

  // base scale: --radius-1, --radius-2, etc.
  for (const key in radiusScale) {
    out[`radius-${key}`] = radiusScale[key as RadiusScaleKey];
  }

  // semantic: --radius-sm, --radius-card, etc.
  for (const key in radiusSemantic) {
    const scaleKey = radiusSemantic[key as RadiusSemanticKey];
    out[`radius-${key}`] = `var(--radius-${scaleKey})`;
  }

  return toCSSVars(out);
}

// ============================================================================
// 7. Scaling + motion tokens
// ============================================================================
function scalingVars(): string {
  const out: Record<string, string> = {};

  // Base scaling: text/ui/icon/density
  for (const key in scalingBase) {
    // --text-scaling, --ui-scaling, etc.
    out[`${key}-scaling`] = scalingBase[key as keyof typeof scalingBase];
  }

  // Preset tiers: --scaling-xs, --scaling-md, etc.
  for (const key in scalingPresets) {
    out[`scaling-${key}`] = scalingPresets[key as keyof typeof scalingPresets];
  }

  // Motion scale: --motion-scale
  out[`motion-scale`] = motionScale;

  // Motion durations: --motion-duration-fast, etc.
  for (const key in motionDurations) {
    out[`motion-duration-${key}`] = motionDurations[key as keyof typeof motionDurations];
  }

  // Motion easing: --motion-ease
  out[`motion-ease`] = motionEase;

  // Component-level scaling: --tap-target-scale, etc.
  for (const key in componentScaling) {
    out[`${key}-scale`] = componentScaling[key as keyof typeof componentScaling];
  }

  return toCSSVars(out);
}

// ============================================================================
// 8. Size tokens
// ============================================================================
function sizeVars(): string {
  const out: Record<string, string> = {};

  // base sizes: --size-0, --size-1, ...
  for (const key in sizeScale) {
    out[`size-${key}`] = sizeScale[key as keyof typeof sizeScale];
  }

  // semantic sizes: --size-sm, --size-control-md, ...
  for (const key in sizeSemantic) {
    const scaleKey = sizeSemantic[key as keyof typeof sizeSemantic];
    out[`size-${key}`] = `var(--size-${scaleKey})`;
  }

  return toCSSVars(out);
}

// ============================================================================
// 9. Border width tokens
// ============================================================================
function borderVars(): string {
  const out: Record<string, string> = {};

  // Base scale: --border-0, --border-1, ...
  for (const key in borderScale) {
    out[`border-${key}`] = borderScale[key as keyof typeof borderScale];
  }

  // Semantic widths: use keys directly as CSS var names
  for (const key in borderSemantic) {
    const scaleKey = borderSemantic[key as keyof typeof borderSemantic];
    // Example: key = "border-subtle" → --border-subtle: var(--border-1);
    out[key] = `var(--border-${scaleKey})`;
  }

  return toCSSVars(out);
}

// ============================================================================
// 10. Typography tokens
// ============================================================================
function typographyVars(): string {
  const out: Record<string, string> = {};

  // ------------------------------------------------------------
  // 1. Font-size scale → --type-scale-sm: 0.875rem;
  // ------------------------------------------------------------
  for (const key in typeScale) {
    out[`type-scale-${key}`] = typeScale[key as keyof typeof typeScale];
  }

  // ------------------------------------------------------------
  // 2. Line-height scale → --type-leading-tight: 1.1;
  // ------------------------------------------------------------
  for (const key in typeLineHeight) {
    out[`type-leading-${key}`] = typeLineHeight[key as keyof typeof typeLineHeight];
  }

  // ------------------------------------------------------------
  // 3. Tracking scale → --type-tracking-tight: -0.01em;
  // ------------------------------------------------------------
  for (const key in typeTracking) {
    out[`type-tracking-${key}`] = typeTracking[key as keyof typeof typeTracking];
  }

  // ------------------------------------------------------------
  // 4. Font weight scale → --type-weight-bold: 700;
  // ------------------------------------------------------------
  for (const key in typeWeights) {
    out[`type-weight-${key}`] = typeWeights[key as keyof typeof typeWeights];
  }

  // ------------------------------------------------------------
  // 5. Font families → --type-family-body: system-ui;
  // ------------------------------------------------------------
  for (const key in typeFamilies) {
    out[`type-family-${key}`] = typeFamilies[key as keyof typeof typeFamilies];
  }

  // ------------------------------------------------------------
  // 6. Semantic text roles (body, heading, label, etc.)
  //
  // Produces:
  //   --type-body-size: var(--type-scale-md);
  //   --type-body-weight: var(--type-weight-normal);
  //   --type-body-leading: var(--type-leading-normal);
  //   --type-body-tracking: var(--type-tracking-normal);
  //   --type-body-family: var(--type-family-body);
  //   --type-body-transform: none;
  // ------------------------------------------------------------
  for (const role in typeRoles) {
    const config = typeRoles[role as keyof typeof typeRoles];

    out[`type-${role}-size`]     = `var(--type-scale-${config.size})`;
    out[`type-${role}-weight`]   = `var(--type-weight-${config.weight})`;
    out[`type-${role}-leading`]  = `var(--type-leading-${config.leading})`;
    out[`type-${role}-tracking`] = `var(--type-tracking-${config.tracking})`;
    out[`type-${role}-family`]   = `var(--type-family-${config.family})`;

    // text-transform is a direct value, not from the primitives
    out[`type-${role}-transform`] = config.transform;
  }

  // ------------------------------------------------------------
  // 7. Component-level typography tokens (CSS-ready)
  //
  // Example:
  //   "anchor-color" → --anchor-color: var(--color-primary-600-vis);
  // ------------------------------------------------------------
  for (const key in typographyTokens) {
    out[key] = typographyTokens[key as keyof typeof typographyTokens];
  }

  return toCSSVars(out);
}

// ============================================================================
// OPACITY tokens
// ============================================================================
import {
  opacityScale,
  opacitySemantic,
  type OpacityScaleKey,
  type OpacitySemanticKey,
} from "../../tokens/src/primitives/opacity.ts";

function opacityVars(): string {
  const out: Record<string, string> = {};

  // Base scale: --opacity-0, --opacity-10, etc.
  for (const key in opacityScale) {
    out[`opacity-${key}`] = opacityScale[key as OpacityScaleKey];
  }

  // Semantic tokens: --opacity-hover, --opacity-disabled, etc.
  for (const key in opacitySemantic) {
    const scaleKey = opacitySemantic[key as OpacitySemanticKey];
    out[`opacity-${key}`] = `var(--opacity-${scaleKey})`;
  }

  return toCSSVars(out);
}

// ============================================================================
// Z-INDEX tokens
// ============================================================================
import {
  zIndexScale,
  zIndexSemantic,
  type ZIndexScaleKey,
  type ZIndexSemanticKey,
} from "../../tokens/src/primitives/z-index.ts";

function zIndexVars(): string {
  const out: Record<string, string> = {};

  // Raw scale → --z-0, --z-1, --z-10, ...
  for (const key in zIndexScale) {
    out[`z-${key}`] = zIndexScale[key as ZIndexScaleKey];
  }

  // Semantic → --z-modal, --z-dropdown, --z-critical, etc.
  for (const key in zIndexSemantic) {
    const scaleKey = zIndexSemantic[key as ZIndexSemanticKey];
    out[`z-${key}`] = `var(--z-${scaleKey})`;
  }

  return toCSSVars(out);
}

// ============================================================================
// ELEVATION (shadows) tokens
// ============================================================================
import {
  elevationScale,
  elevationSemantic,
  type ElevationScaleKey,
  type ElevationSemanticKey,
} from "../../tokens/src/primitives/elevation.ts";

function elevationVars(): string {
  const out: Record<string, string> = {};

  // Raw scale → --elevation-1, --elevation-2, etc.
  for (const key in elevationScale) {
    out[`elevation-${key}`] = elevationScale[key as ElevationScaleKey];
  }

  // Semantic → --elevation-card: var(--elevation-2);
  for (const key in elevationSemantic) {
    const scaleKey = elevationSemantic[key as ElevationSemanticKey];
    out[`elevation-${key}`] = `var(--elevation-${scaleKey})`;
  }

  return toCSSVars(out);
}


// ============================================================================
// 11. On-color tokens
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
// 12. Build theme CSS
// ============================================================================
function themeCSS(theme: ThemeConfig): string {
  const tokens = toCSSVars(baseTokens);
  const light = `
html[data-theme='${theme.name}'][data-mode='light'] {
  --k-ct: clamp(0%, calc((var(--contrast-factor,1) - 1) * 120%), 25%);
${section("COLOR RAMPS", roleVars(theme, "light"))}
${section("SPACING", spacingVars())}
${section("RADIUS", radiusVars())}
${section("SIZE", sizeVars())}
${section("BORDERS", borderVars())}
${section("TYPOGRAPHY", typographyVars())}
${section("OPACITY", opacityVars())}
${section("Z-INDEX", zIndexVars())}
${section("ELEVATION", elevationVars())}
${section("BASE TOKENS", tokens)}
${section("ON-COLOR ROLES", onVars("light"))}

}`;
  const dark = `
html[data-theme='${theme.name}'][data-mode='dark'] {
  --k-ct: clamp(0%, calc((var(--contrast-factor,1) - 1) * 120%), 25%);
${section("COLOR RAMPS", roleVars(theme, "dark"))}
${section("SPACING", spacingVars())}
${section("RADIUS", radiusVars())}
${section("SIZE", sizeVars())}
${section("BORDERS", borderVars())}
${section("TYPOGRAPHY", typographyVars())}
${section("OPACITY", opacityVars())}
${section("Z-INDEX", zIndexVars())}
${section("ELEVATION", elevationVars())}
${section("BASE TOKENS", tokens)}
${section("ON-COLOR ROLES", onVars("dark"))}

}`;
  const vision = renderVision();
return `${light}\n\n${dark}\n\n${vision}\n`;

}

// ============================================================================
// 13. Build + output files
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











