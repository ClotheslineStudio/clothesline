// ============================================================================
// Clothesline Theme Builder — Clean Unified Version (with dynamic vision)
// ============================================================================

import fs from "fs-extra";
import path from "node:path";
import { fileURLToPath } from "node:url";

// Tokens + utilities
import { baseTokens, semanticColorTokens } from "../../tokens/src/index.js";
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

// Spacing
import {
  spacingScale,
  spacingSemantic,
} from "../../tokens/src/spacing/spacing.ts";

// Radius
import {
  radiusScale,
  radiusSemantic,
  type RadiusScaleKey,
  type RadiusSemanticKey,
} from "../../tokens/src/radius/radius.ts";

// Scaling + motion
import {
  componentScaling,
  motionDurations,
  motionEase,
  motionScale,
  scalingBase,
  scalingPresets,
} from "../../tokens/src/scaling/scaling.ts";

// Sizes
import { sizeScale, sizeSemantic } from "../../tokens/src/sizes/sizes.ts";

// Borders
import {
  borderScale,
  borderSemantic,
} from "../../tokens/src/borders/borders.ts";

// Typography
import {
  typeFamilies,
  typeLineHeight,
  typeRoles,
  typeScale,
  typeTracking,
  typeWeights,
} from "../../tokens/src/typography/typography.ts";

// Opacity
import {
  opacityScale,
  opacitySemantic,
  type OpacityScaleKey,
  type OpacitySemanticKey,
} from "../../tokens/src/primitives/opacity.ts";

// Z-index
import {
  zIndexScale,
  zIndexSemantic,
  type ZIndexScaleKey,
  type ZIndexSemanticKey,
} from "../../tokens/src/primitives/z-index.ts";

// Elevation
import {
  elevationScale,
  elevationSemantic,
  type ElevationScaleKey,
  type ElevationSemanticKey,
} from "../../tokens/src/primitives/elevation.ts";

import { textTokens } from "../../tokens/src/text/text.ts";
import { linkTokens } from "../../tokens/src/link/link.ts";

import { focusScale, focusSemantic } from "../../tokens/src/focus/focus.ts";

// ============================================================================
// Helpers
// ============================================================================
function filterBaseTokensForComponents(tokens: Record<string, any>) {
  const omitPrefixes = [
    "spacing-",
    "radius-",
    "size-",
    "type-",
    "opacity-",
    "z-",
    "elevation-",
    // If you're emitting TEXT/LINK as their own sections:
    "text-",
    "anchor-",

    // IMPORTANT: only omit border WIDTH tokens (emitted elsewhere)
    "border-width-",

    // If focus primitives/semantic are emitted in their own section:
    // (keep this OFF if you still want focus style tokens inside BASE TOKENS)
    // "focus-",
  ];

  const omitExact = new Set(["border-0", "border-1", "border-2", "border-4"]);

  const out: Record<string, any> = {};
  for (const [k, v] of Object.entries(tokens)) {
    if (omitExact.has(k)) continue;
    if (omitPrefixes.some((p) => k.startsWith(p))) continue;
    out[k] = v;
  }
  return out;
}

function textVars(): string {
  return toCSSVars(textTokens as any);
}

function linkVars(): string {
  return toCSSVars(linkTokens as any);
}

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

const SHADES: Step[] = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];
const SHADE_ORDER_REV: Step[] = [...SHADES].reverse() as Step[];

function pickContrastShades(ramp: Record<Step, string>): { light: Step; dark: Step } {
  let light: Step = 50;
  let dark: Step = 950;

  let maxL = -1;
  let minL = 2;

  for (const shade of SHADES) {
    const parsed = toOklch(ramp[shade]);
    if (!parsed) continue;

    if (parsed.l > maxL) {
      maxL = parsed.l;
      light = shade;
    }
    if (parsed.l < minL) {
      minL = parsed.l;
      dark = shade;
    }
  }

  return { light, dark };
}


const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distRoot = path.resolve(__dirname, "../dist");
const cssDir = path.join(distRoot, "css");
const cssThemesDir = path.join(cssDir, "themes");
const manifestDir = path.join(distRoot, "manifest");
const modesCssPath = path.resolve(__dirname, "./modes.css");

const ROLES = [
  "primary",
  "secondary",
  "tertiary",
  "success",
  "warning",
  "error",
  "info",
  "accent",
  "neutral",
  "surface",
] as const;

type RoleName = (typeof ROLES)[number];

// ============================================================================
// 1. Flip a ramp for dark mode
// ============================================================================

function flipRampForDark(ramp: Record<Step, string>): Record<Step, string> {
  const out = {} as Record<Step, string>;
  for (let i = 0; i < SHADES.length; i++) {
    const lightStep = SHADES[i];
    const darkStep = SHADE_ORDER_REV[i];
    out[lightStep] = ramp[darkStep];
  }
  return out;
}

// ============================================================================
// 2. Read seed color from theme config
// ============================================================================

function getRoleSeed(
  theme: ThemeConfig,
  mode: ThemeMode,
  role: RoleName
): OklchColor | null {
  // Special handling for surface: allow seeds.surface.light/dark
  const seedGroup = (theme as any).seeds?.[role];

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

  const seedNode: any =
    (theme as any).seeds?.[role] ??
    (theme as any).roles?.[role] ??
    (theme as any)[role] ??
    (theme as any).colors?.[role] ??
    null;

  if (!seedNode) return null;

  // { l, c, h }
  if (
    typeof seedNode.l === "number" &&
    typeof seedNode.c === "number" &&
    typeof seedNode.h === "number"
  ) {
    return { mode: "oklch", l: seedNode.l, c: seedNode.c, h: seedNode.h };
  }

  // { hue, chroma }
  if (typeof seedNode.hue === "number") {
    const h = seedNode.hue;
    const c = typeof seedNode.chroma === "number" ? seedNode.chroma : 0.12;
    const l =
      (theme as any).seeds?.[role]?.l ??
      (theme as any).seeds?.[role]?.light?.l ??
      0.64;

    return { mode: "oklch", l, c, h };
  }

  // "#hex" or "oklch(...)"
  if (typeof seedNode === "string") {
    const o = toOklch(seedNode);
    if (o && typeof o.l === "number") {
      return { mode: "oklch", l: o.l, c: o.c, h: o.h };
    }
  }

  return null;
}

// ============================================================================
// 3. Build all ramps from seeds
// ============================================================================

function rampsForTheme(
  theme: ThemeConfig,
  mode: ThemeMode
): Record<string, Record<Step, string>> {
  const result: Record<string, Record<Step, string>> = {};

  for (const role of ROLES) {
    const seed = getRoleSeed(theme, mode, role);
    if (!seed) continue;

    const ramp = generateRampFromSeed(seed);

    if (role === "surface") {
      const surfaceSeeds = (theme as any).seeds?.surface;
      const hasExplicitDarkSeed =
        surfaceSeeds && typeof surfaceSeeds === "object" && surfaceSeeds.dark;

      result[role] =
        mode === "dark" && !hasExplicitDarkSeed ? flipRampForDark(ramp) : ramp;

      continue;
    }

    result[role] = ramp;
  }

  return result;
}

// ============================================================================
// 4. Generic CSS var flattening + grouping
// ============================================================================

function toCSSVars(
  obj: Record<string, string | Record<string, string | Record<string, string>>>
): string {
  const entries: [string, string][] = [];

  function flattenObject(node: any, prefix = ""): void {
    for (const [key, value] of Object.entries(node)) {
      const fullKey = prefix ? `${prefix}-${key}` : key;

      if (typeof value === "string") {
        entries.push([fullKey, value]);
      } else if (typeof value === "object" && value !== null) {
        flattenObject(value, fullKey);
      }
    }
  }

  flattenObject(obj);

  const groups: Record<string, [string, string][]> = {};

  for (const [key, value] of entries) {
    const withoutPrefix = key.startsWith("--") ? key.slice(2) : key;
    const prefix = withoutPrefix.split("-")[0] || "misc";
    if (!groups[prefix]) groups[prefix] = [];
    groups[prefix].push([key, value]);
  }

  const groupNames = Object.keys(groups).sort();

  const blocks = groupNames.map((group) => {
    const collator = new Intl.Collator("en", {
      numeric: true,
      sensitivity: "base",
    });

    const lines = groups[group]
      .sort((a, b) => collator.compare(a[0], b[0]))
      .map(([k, v]) => `  ${k.startsWith("--") ? k : `--${k}`}: ${v};`)
      .join("\n");

    return `  /* ${group.toUpperCase()} */\n${lines}`;
  });

  return blocks.join("\n\n");
}

// ============================================================================
// 5. Role color vars (base + contrast + vision-adjusted)
// ============================================================================

function roleVars(theme: ThemeConfig, mode: ThemeMode): string {
  const ramps = rampsForTheme(theme, mode);
  const pole = mode === "dark" ? "white" : "black";

  const base: string[] = [];
  const rel: string[] = [];

 for (const role of Object.keys(ramps)) {
  const ramp = ramps[role] as Record<Step, string>;

  // ✅ Add these two vars per role (Skeleton-style)
  const picks = pickContrastShades(ramp);
  base.push(`  --color-${role}-contrast-light: var(--color-${role}-${picks.light}-vis);`);
  base.push(`  --color-${role}-contrast-dark: var(--color-${role}-${picks.dark}-vis);`);
  base.push("");

  for (const shade of SHADES) {

      const value = ramp[shade];

      base.push(`  --color-${role}-${shade}: ${value};`);

      base.push(
        `  --color-${role}-${shade}-ct: color-mix(in oklab, var(--color-${role}-${shade}) calc(100% - var(--k-ct)), ${pole} var(--k-ct));`
      );

      base.push(`  --color-${role}-${shade}-vis: var(--color-${role}-${shade}-ct);`);

      rel.push(
        `  --color-${role}-${shade}-vis: oklch(from var(--color-${role}-${shade}-ct) l c h);`
      );
    }
    base.push("");
  }

  base.push(
    `@supports (color: oklch(from white l c h)) {\n${rel.join("\n")}\n}`
  );

  return base.join("\n").trimEnd();
}



// ============================================================================
// 5b. Vision defaults (per-role base values for -vis)
// ============================================================================

function visionDefaults(): string {
  return ROLES.map(
    (role) =>
      `  --vision-${role}-l-shift: 0%;
  --vision-${role}-c-scale: 1;
  --vision-${role}-h-shift: 0deg;`
  ).join("\n");
}


// ============================================================================
// 6. Spacing tokens
// ============================================================================

function spacingVars(): string {
  const out: Record<string, string> = {};

  for (const key in spacingScale) {
    out[`spacing-${key}`] = spacingScale[key as keyof typeof spacingScale];
  }

  for (const key in spacingSemantic) {
    const scaleKey = spacingSemantic[key as keyof typeof spacingSemantic];
    out[`spacing-${key}`] = `var(--spacing-${scaleKey})`;
  }

  return toCSSVars(out);
}

// ============================================================================
// 7. Radius tokens
// ============================================================================

function radiusVars(): string {
  const out: Record<string, string> = {};

  // Base scale
  for (const key in radiusScale) {
    out[`radius-${key}`] = radiusScale[key as RadiusScaleKey];
  }

  // Semantic aliases
  for (const key in radiusSemantic) {
    const semanticKey = key as RadiusSemanticKey;
    const scaleKey = radiusSemantic[semanticKey];

    // Avoid overriding the raw scale var (e.g. full -> full)
    if (semanticKey === scaleKey) continue;

    out[`radius-${semanticKey}`] = `var(--radius-${scaleKey})`;
  }

  return toCSSVars(out);
}

// ============================================================================
// 8. Scaling + motion tokens
// ============================================================================

function scalingVars(): string {
  const out: Record<string, string> = {};

  // Base scaling: text/ui/icon/density
  for (const key in scalingBase) {
    out[`${key}-scaling`] = scalingBase[key as keyof typeof scalingBase];
  }

  // Preset tiers
  for (const key in scalingPresets) {
    out[`scaling-${key}`] = scalingPresets[key as keyof typeof scalingPresets];
  }

  // Motion scale + durations + easing
  out["motion-scale"] = motionScale;

  for (const key in motionDurations) {
    out[`motion-duration-${key}`] =
      motionDurations[key as keyof typeof motionDurations];
  }

  out["motion-ease"] = motionEase;

  // Component-level scaling
  for (const key in componentScaling) {
    out[`${key}-scale`] =
      componentScaling[key as keyof typeof componentScaling];
  }

  return toCSSVars(out);
}

// ============================================================================
// 9. Size tokens
// ============================================================================

function sizeVars(): string {
  const out: Record<string, string> = {};

  for (const key in sizeScale) {
    out[`size-${key}`] = sizeScale[key as keyof typeof sizeScale];
  }

  for (const key in sizeSemantic) {
    const scaleKey = sizeSemantic[key as keyof typeof sizeSemantic];
    out[`size-${key}`] = `var(--size-${scaleKey})`;
  }

  return toCSSVars(out);
}

// ============================================================================
// 10. Border width tokens
// ============================================================================

function borderVars(): string {
  const out: Record<string, string> = {};

  for (const key in borderScale) {
    out[`border-${key}`] = borderScale[key as keyof typeof borderScale];
  }

  for (const key in borderSemantic) {
    const scaleKey = borderSemantic[key as keyof typeof borderSemantic];
    out[key] = `var(--border-${scaleKey})`;
  }

  return toCSSVars(out);
}

// ============================================================================
// 11. Typography tokens
// ============================================================================

function typographyVars(): string {
  const out: Record<string, string> = {};

  // Scale
  for (const key in typeScale) {
    out[`type-scale-${key}`] = typeScale[key as keyof typeof typeScale];
  }

  // Line height
  for (const key in typeLineHeight) {
    out[`type-leading-${key}`] =
      typeLineHeight[key as keyof typeof typeLineHeight];
  }

  // Tracking
  for (const key in typeTracking) {
    out[`type-tracking-${key}`] =
      typeTracking[key as keyof typeof typeTracking];
  }

  // Weights
  for (const key in typeWeights) {
    out[`type-weight-${key}`] = typeWeights[key as keyof typeof typeWeights];
  }

  // Families
  for (const key in typeFamilies) {
    out[`type-family-${key}`] = typeFamilies[key as keyof typeof typeFamilies];
  }

  // Semantic roles
  for (const role in typeRoles) {
    const config = typeRoles[role as keyof typeof typeRoles];

    out[`type-${role}-size`] = `var(--type-scale-${config.size})`;
    out[`type-${role}-weight`] = `var(--type-weight-${config.weight})`;
    out[`type-${role}-leading`] = `var(--type-leading-${config.leading})`;
    out[`type-${role}-tracking`] = `var(--type-tracking-${config.tracking})`;
    out[`type-${role}-family`] = `var(--type-family-${config.family})`;
    out[`type-${role}-transform`] = config.transform;
  }

  return toCSSVars(out);
}

// ============================================================================
// 12. Opacity tokens
// ============================================================================

function opacityVars(): string {
  const out: Record<string, string> = {};

  // 1) Emit primitives (scale) exactly once
  for (const key in opacityScale) {
    out[`opacity-${key}`] = opacityScale[key as OpacityScaleKey];
  }

  // 2) Emit semantic aliases, but NEVER overwrite an existing primitive token
  for (const key in opacitySemantic) {
    const cssKey = `opacity-${key}`;

    // If this semantic name collides with a primitive name (e.g. "disabled", "backdrop"),
    // do not overwrite the primitive value with a self-referencing var().
    if (cssKey in out) continue;

    const scaleKey = opacitySemantic[key as OpacitySemanticKey];
    out[cssKey] = `var(--opacity-${scaleKey})`;
  }

  return toCSSVars(out);
}

// ============================================================================
// 13. Z-index tokens
// ============================================================================

function zIndexVars(): string {
  const out: Record<string, string> = {};

  // primitives (scale)
  for (const key in zIndexScale) {
    out[`z-${key}`] = zIndexScale[key as ZIndexScaleKey];
  }

  // semantic aliases
  for (const key in zIndexSemantic) {
    const scaleKey = zIndexSemantic[key as ZIndexSemanticKey];
    out[`z-${key}`] = `var(--z-${scaleKey})`;
  }

  return toCSSVars(out);
}

// ============================================================================
// X. Focus tokens (width + offset)
// ============================================================================

function focusVars(): string {
  const out: Record<string, string> = {};

  // primitives (scale)
  for (const key in focusScale) {
    out[`focus-${key}`] = focusScale[key as keyof typeof focusScale];
  }

  // semantic aliases (IMPORTANT: do NOT double-prefix "focus-")
  for (const key in focusSemantic) {
    const scaleKey = focusSemantic[key as keyof typeof focusSemantic];

    // scaleKey may be "2" or "offset-2"
    const ref = scaleKey.startsWith("offset-")
      ? `var(--focus-${scaleKey})`
      : `var(--focus-${scaleKey})`;

    out[key] = ref;
  }

  return toCSSVars(out);
}

// ============================================================================
// 14. Elevation (shadow) tokens
// ============================================================================

function elevationVars(): string {
  const out: Record<string, string> = {};

  for (const key in elevationScale) {
    out[`elevation-${key}`] = elevationScale[key as ElevationScaleKey];
  }

  for (const key in elevationSemantic) {
    const scaleKey = elevationSemantic[key as ElevationSemanticKey];
    out[`elevation-${key}`] = `var(--elevation-${scaleKey})`;
  }

  return toCSSVars(out);
}

// ============================================================================
// 15. On-color tokens
// ============================================================================

function onVars(mode: ThemeMode): string {
  return mode === "light"
    ? `  --on-primary: var(--color-surface-50);
  --on-secondary: var(--color-surface-50);
  --on-tertiary: var(--color-surface-50);
  --on-success: var(--color-surface-50);
  --on-warning: var(--color-surface-950);
  --on-error: var(--color-surface-50);
  --on-info: var(--color-surface-50);`
    : `  --on-primary: var(--color-surface-950);
  --on-secondary: var(--color-surface-950);
  --on-tertiary: var(--color-surface-950);
  --on-success: var(--color-surface-950);
  --on-warning: var(--color-surface-950);
  --on-error: var(--color-surface-950);
  --on-info: var(--color-surface-950);`;
}

// ============================================================================
// 16. Build theme CSS
// ============================================================================

function themeCSS(theme: ThemeConfig): string {
  const baseTokensCss = toCSSVars(
    filterBaseTokensForComponents(baseTokens as any)
  );

const light = `
html[data-theme='${theme.name}'][data-mode='light'] {
${section("COLOR RAMPS", roleVars(theme, "light"))}
}
`;

const dark = `
html[data-theme='${theme.name}'][data-mode='dark'] {
${section("COLOR RAMPS", roleVars(theme, "dark"))}
}
`;


  return light + dark;
}

function foundationsCSS(): string {
  return `
/* ============================================================================
   Clothesline Foundations (global, theme-agnostic)
============================================================================ */
html {
${section("SPACING", spacingVars())}
${section("RADIUS", radiusVars())}
${section("SIZE", sizeVars())}
${section("BORDERS", borderVars())}
${section("FOCUS", focusVars())}
${section("SCALING & MOTION", scalingVars())}
${section("TYPOGRAPHY", typographyVars())}
${section("TEXT", textVars())}
${section("LINK", linkVars())}
${section("OPACITY", opacityVars())}
${section("Z-INDEX", zIndexVars())}
${section("ELEVATION", elevationVars())}
}

/* Defaults that should not be duplicated per-theme */
html[data-mode='light'],
html[data-mode='dark']{
  --k-ct: clamp(0%, calc((var(--contrast-factor, 1) - 1) * 120%), 25%);
}

/* Vision defaults can be global; modes.css can still override per vision mode */
html{
${section("VISION DEFAULTS", visionDefaults())}
}
`;
}

function componentsCSS(): string {
  const baseTokensCss = toCSSVars(
    filterBaseTokensForComponents(baseTokens as any)
  );

  return `
/* ============================================================================
   Clothesline Component Tokens (global contract)
============================================================================ */
html{
${section("BASE TOKENS", baseTokensCss)}
}
`;
}

function semanticColorsCSS(): string {
  const lightVars = toCSSVars((semanticColorTokens as any).light);
  const darkVars = toCSSVars((semanticColorTokens as any).dark);

  return `
/* ============================================================================
   Clothesline Semantic Color Layer (global, theme-agnostic)
   - References theme-provided ramps + contrast picks.
============================================================================ */

html[data-mode='light']{
${lightVars}
}

html[data-mode='dark']{
${darkVars}
}
`;
}


// ============================================================================
// 17. Build + output files
// ============================================================================

async function buildTheme(theme: ThemeConfig) {
  const css = themeCSS(theme);
  const file = path.join(cssThemesDir, `${theme.name}.css`);

  await fs.outputFile(file, css);
  console.log(`Built ${path.relative(process.cwd(), file)}`);
}

async function copyModes() {
  const dest = path.join(cssDir, "modes.css");


  if (await fs.pathExists(modesCssPath)) {
    await fs.copy(modesCssPath, dest);
  }
}

async function writeManifest(themes: ThemeConfig[]) {
  const manifest = themes.map((t) => ({
    name: t.name,
    roles: t.roles,
    defaults: t.modes?.defaults ?? { mode: "light" },
    presets: t.modes?.presets ?? {},
  }));
  const file = path.join(manifestDir, "themes.json");

  await fs.outputJson(file, manifest, { spaces: 2 });
}

// ============================================================================
// 18. Run build
// ============================================================================

async function run() {
  const themes: ThemeConfig[] = [
    clotheslineTheme,
    timberlineTheme,
    nightMarketTheme,
    retrogradeTheme,
    tidalGlassTheme,
    copperSunTheme,
    milkywayTheme,
    bigSkyTheme,
  ];

  await fs.ensureDir(cssThemesDir);
await fs.ensureDir(manifestDir);
// formats dir is handled by build-formats.ts already

 await fs.outputFile(path.join(cssDir, "foundations.css"), foundationsCSS());
await fs.outputFile(path.join(cssDir, "semantic-colors.css"), semanticColorsCSS());
await fs.outputFile(path.join(cssDir, "components.css"), componentsCSS());


  await Promise.all(themes.map(buildTheme));
  await copyModes();
  await writeManifest(themes);
  

  console.log("Done.");
}

run().catch((err) => {
  console.error("Build failed:", err);
  process.exit(1);
});
