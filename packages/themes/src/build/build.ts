// ============================================================================
// Clothesline Theme Builder — Split Foundations vs Semantics vs Semantic Colors
// - foundations.css: scales only
// - semantic.css: NON-COLOR semantic aliases + structural/global helpers (no color decisions)
// - semantic-colors.css: semantic COLOR layer (mode-dependent where applicable)
// - components.css: component contract tokens only (baseTokens minus global semantics)
//
// NOTE:
// Background/panel/border-color defaults are currently authored in modes.css.
// This builder avoids re-emitting those same color semantics in semantic.css.
// ============================================================================

import fs from "fs-extra";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { baseTokens, semanticColorTokens } from "../../../tokens/src/index.js";


import type { ThemeConfig } from "../types.ts";
import type { OklchColor } from "../../../tokens/utils/colorEngine.js";
import { toOklch } from "../../../tokens/utils/colorEngine.js";
import { generateRampFromSeed } from "../../../tokens/utils/generateRamps.js";

// Theme configs
import { clotheslineTheme } from "../../configs/clothesline.ts";
import { timberlineTheme } from "../../configs/timberline.ts";
import { nightMarketTheme } from "../../configs/night-market.ts";
import { retrogradeTheme } from "../../configs/retrograde.ts";
import { tidalGlassTheme } from "../../configs/tidal-glass.ts";
import { copperSunTheme } from "../../configs/copper-sun.ts";
import { milkywayTheme } from "../../configs/milkyway.ts";
import { bigSkyTheme } from "../../configs/bigsky.ts";

// Scales + semantics
import { spacingScale, spacingSemantic } from "../../../tokens/src/spacing/spacing.ts";

import {
  radiusScale,
  radiusSemantic,
  type RadiusScaleKey,
  type RadiusSemanticKey,
} from "../../../tokens/src/radius/radius.ts";

import {
  componentScaling,
  motionDurations,
  motionEase,
  motionScale,
  scalingBase,
  scalingPresets,
} from "../../../tokens/src/scaling/scaling.ts";

import { sizeScale, sizeSemantic } from "../../../tokens/src/sizes/sizes.ts";

import { borderScale, borderSemantic } from "../../../tokens/src/borders/borders.ts";

import {
  typeFamilies,
  typeLineHeight,
  typeRoles,
  typeScale,
  typeTracking,
  typeWeights,
} from "../../../tokens/src/typography/typography.ts";

import {
  opacityScale,
  opacitySemantic,
  type OpacityScaleKey,
  type OpacitySemanticKey,
} from "../../../tokens/src/primitives/opacity.ts";

import {
  zIndexScale,
  zIndexSemantic,
  type ZIndexScaleKey,
  type ZIndexSemanticKey,
} from "../../../tokens/src/primitives/z-index.ts";

import {
  elevationScale,
  elevationSemantic,
  type ElevationScaleKey,
  type ElevationSemanticKey,
} from "../../../tokens/src/primitives/elevation.ts";

import { textTokens } from "../../../tokens/src/text/text.ts";
import { linkTokens } from "../../../tokens/src/link/link.ts";

import { focusScale, focusSemantic } from "../../../tokens/src/focus/focus.ts";

import {
  layoutContainerScale,
  layoutContainerSemantic,
  layoutSpacingSemantic,
  type LayoutContainerScaleKey,
  type LayoutContainerSemanticKey,
} from "../../../tokens/src/primitives/layout.ts";

import { blurScale, type BlurScaleKey } from "../../../tokens/src/primitives/blur.ts";
import { semanticEffectsTokens } from "../../../tokens/src/effects/semantic-effects.ts";

// ============================================================================
// Helpers
// ============================================================================

const collator = new Intl.Collator("en", { numeric: true, sensitivity: "base" });

function section(title: string, content: string): string {
  if (!content.trim()) return "";
  return `
  /* ========================================
     ${title}
  ======================================== */
${content}
`;
}

function toKebabCase(input: string): string {
  return input.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
}

/** Flatten nested token objects into [key,value] pairs like "foo-bar-baz" -> "..." */
function flattenEntries(obj: Record<string, any>): [string, string][] {
  const entries: [string, string][] = [];

  function walk(node: any, prefix = ""): void {
    for (const [k, v] of Object.entries(node)) {
      const key = prefix ? `${prefix}-${k}` : k;
      if (typeof v === "string") entries.push([key, v]);
      else if (v && typeof v === "object") walk(v, key);
    }
  }

  walk(obj);
  return entries;
}

/** Normalize to CSS var key (ensures it starts with --) */
function asCssVarKey(k: string): string {
  return k.startsWith("--") ? k : `--${k}`;
}

/** Sorted list output (no grouping) */
function toCSSVarsSorted(obj: Record<string, any>): string {
  const entries = flattenEntries(obj)
    .map(([k, v]) => [asCssVarKey(k), v] as [string, string])
    .sort((a, b) => collator.compare(a[0], b[0]));

  return entries.map(([k, v]) => `  ${k}: ${v};`).join("\n");
}

/** Grouped output by first prefix (alert-*, button-*, etc.) */
function toCSSVarsGroupedByPrefix(
  obj: Record<string, any>,
  opts?: { groupOrder?: string[] }
): string {
  const entries = flattenEntries(obj).map(([k, v]) => [asCssVarKey(k), v] as [string, string]);

  const groups: Record<string, [string, string][]> = {};
  for (const [k, v] of entries) {
    const without = k.startsWith("--") ? k.slice(2) : k;
    const group = without.split("-")[0] || "misc";
    (groups[group] ??= []).push([k, v]);
  }

  const groupNames = Object.keys(groups);

  const order = opts?.groupOrder?.length ? new Map(opts.groupOrder.map((g, i) => [g, i])) : null;

  groupNames.sort((a, b) => {
    if (order) {
      const ai = order.has(a) ? (order.get(a) as number) : Number.POSITIVE_INFINITY;
      const bi = order.has(b) ? (order.get(b) as number) : Number.POSITIVE_INFINITY;
      if (ai !== bi) return ai - bi;
    }
    return collator.compare(a, b);
  });

  const blocks: string[] = [];

  for (const g of groupNames) {
    const lines = groups[g]
      .sort((a, b) => collator.compare(a[0], b[0]))
      .map(([k, v]) => `  ${k}: ${v};`)
      .join("\n");

    blocks.push(`  /* ${g.toUpperCase()} */\n${lines}`);
  }

  return blocks.join("\n\n");
}

// ============================================================================
// Setup
// ============================================================================

type ThemeMode = "light" | "dark";
type Step = 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | 950;

const SHADES: Step[] = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];
const SHADE_ORDER_REV: Step[] = [...SHADES].reverse() as Step[];

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

function flipRampForDark(ramp: Record<Step, string>): Record<Step, string> {
  const out = {} as Record<Step, string>;
  for (let i = 0; i < SHADES.length; i++) {
    out[SHADES[i]] = ramp[SHADE_ORDER_REV[i]];
  }
  return out;
}

function getRoleSeed(theme: ThemeConfig, mode: ThemeMode, role: RoleName): OklchColor | null {
  const seedGroup = (theme as any).seeds?.[role];

  if (role === "surface" && seedGroup && typeof seedGroup === "object") {
    const surfaceSeed = mode === "light" ? seedGroup.light : seedGroup.dark;
    if (surfaceSeed && typeof surfaceSeed.l === "number") {
      return { mode: "oklch", l: surfaceSeed.l, c: surfaceSeed.c, h: surfaceSeed.h };
    }
  }

  const seedNode: any =
    (theme as any).seeds?.[role] ??
    (theme as any).roles?.[role] ??
    (theme as any)[role] ??
    (theme as any).colors?.[role] ??
    null;

  if (!seedNode) return null;

  if (
    typeof seedNode.l === "number" &&
    typeof seedNode.c === "number" &&
    typeof seedNode.h === "number"
  ) {
    return { mode: "oklch", l: seedNode.l, c: seedNode.c, h: seedNode.h };
  }

  if (typeof seedNode.hue === "number") {
    const h = seedNode.hue;
    const c = typeof seedNode.chroma === "number" ? seedNode.chroma : 0.12;
    const l = (theme as any).seeds?.[role]?.l ?? (theme as any).seeds?.[role]?.light?.l ?? 0.64;
    return { mode: "oklch", l, c, h };
  }

  if (typeof seedNode === "string") {
    const o = toOklch(seedNode);
    if (o && typeof o.l === "number") return { mode: "oklch", l: o.l, c: o.c, h: o.h };
  }

  return null;
}

function rampsForTheme(theme: ThemeConfig, mode: ThemeMode): Record<string, Record<Step, string>> {
  const result: Record<string, Record<Step, string>> = {};

  for (const role of ROLES) {
    const seed = getRoleSeed(theme, mode, role);
    if (!seed) continue;

    const ramp = generateRampFromSeed(seed);

    if (role === "surface") {
      const surfaceSeeds = (theme as any).seeds?.surface;
      const hasExplicitDarkSeed = surfaceSeeds && typeof surfaceSeeds === "object" && surfaceSeeds.dark;
      result[role] = mode === "dark" && !hasExplicitDarkSeed ? flipRampForDark(ramp) : ramp;
      continue;
    }

    result[role] = ramp;
  }

  return result;
}

function roleVars(theme: ThemeConfig): string {
  const ramps = rampsForTheme(theme, "light");
  const base: string[] = [];
  const rel: string[] = [];

  for (const role of Object.keys(ramps)) {
    const ramp = ramps[role] as Record<Step, string>;

    const picks = pickContrastShades(ramp);
    base.push(`  --color-${role}-contrast-light: var(--color-${role}-${picks.light}-vis);`);
    base.push(`  --color-${role}-contrast-dark: var(--color-${role}-${picks.dark}-vis);`);
    base.push("");

    for (const shade of SHADES) {
      base.push(`  --color-${role}-${shade}: ${ramp[shade]};`);
      base.push(
        `  --color-${role}-${shade}-ct: color-mix(in oklab, var(--color-${role}-${shade}) calc(100% - var(--k-ct)), var(--ct-pole) var(--k-ct));`
      );
      base.push(`  --color-${role}-${shade}-vis: var(--color-${role}-${shade}-ct);`);

      rel.push(`  --color-${role}-${shade}-vis: oklch(from var(--color-${role}-${shade}-ct) l c h);`);
    }

    base.push("");
  }

  base.push(`@supports (color: oklch(from white l c h)) {\n${rel.join("\n")}\n}`);
  return base.join("\n").trimEnd();
}

function visionDefaults(): string {
  return ROLES.map(
    (role) => `  --vision-${role}-l-shift: 0%;
  --vision-${role}-c-scale: 1;
  --vision-${role}-h-shift: 0deg;`
  ).join("\n");
}

// ============================================================================
// Global-from-base extraction
// - Omit bg/border/ring/etc from components.css (contract stays clean)
// - Only emit NON-COLOR helpers from baseTokens into semantic.css
// ============================================================================

function isGlobalSemanticFromBaseToken(key: string): boolean {
  const GLOBAL_PREFIXES = [
    "background-",
    "bg-",
    "surface-",
    "border-",
    "border-color-",
    "ring-",
    "outline-",
    "divide-",
    "contrast-",
    "ct-",
  ];

  // Border WIDTH scale tokens are handled by foundations/borders
  if (key.startsWith("border-width-")) return false;

  return GLOBAL_PREFIXES.some((p) => key.startsWith(p));
}

/**
 * semantic.css should NOT own color decisions.
 * We only allow structural helpers from baseTokens (e.g., border-inset, border-transition).
 */
function isNonColorSemanticFromBaseToken(key: string): boolean {
  // Hard excludes: color semantic families
  const EXCLUDE_PREFIXES = [
    "background-",
    "bg-",
    "surface-",
    "border-color-",
    "text-",
    "link-",
    "anchor-",
    "focus-ring-",
  ];
  if (EXCLUDE_PREFIXES.some((p) => key.startsWith(p))) return false;

  if (key.startsWith("border-width-")) return false;

  // Allow only structural/helper prefixes
  const ALLOW_PREFIXES = ["border-", "ring-", "outline-", "divide-", "contrast-", "ct-"];
  return ALLOW_PREFIXES.some((p) => key.startsWith(p));
}

function extractNonColorSemanticFromBaseTokens(tokens: Record<string, any>) {
  const out: Record<string, any> = {};
  for (const [k, v] of Object.entries(tokens)) {
    if (isNonColorSemanticFromBaseToken(k)) out[k] = v;
  }
  return out;
}

function filterBaseTokensForComponents(tokens: Record<string, any>) {
  const omitPrefixes = [
    // scales or semantic layers emitted elsewhere
    "spacing-",
    "radius-",
    "size-",
    "type-",
    "opacity-",
    "z-",
    "elevation-",
    "layout-",
    "focus-",

    // these are emitted in semantic-colors.css (color semantics)
    "text-",
    "anchor-",
    "link-",

    // border-width scale emitted in foundations.css
    "border-width-",
  ];

  const omitExact = new Set(["border-0", "border-1", "border-2", "border-4"]);

  const out: Record<string, any> = {};
  for (const [k, v] of Object.entries(tokens)) {
    if (omitExact.has(k)) continue;
    if (omitPrefixes.some((p) => k.startsWith(p))) continue;

    // IMPORTANT: strip bg/border/etc global semantics
    if (isGlobalSemanticFromBaseToken(k)) continue;

    out[k] = v;
  }
  return out;
}

// ============================================================================
// Foundation var map (per-theme overrides/escape hatches)
// ============================================================================

type ThemeVarValue = string | number | { light: string | number; dark: string | number };
type ThemeVarMap = Record<`--${string}`, ThemeVarValue>;

function emitThemeVarMap(map: ThemeVarMap | undefined): string {
  if (!map) return "";
  const lines: string[] = [];

  for (const [k, v] of Object.entries(map)) {
    if (v && typeof v === "object" && "light" in v && "dark" in v) {
      lines.push(`  ${k}: ${v.light};`);
      lines.push(`  ${k}-dark: ${v.dark};`);
    } else {
      lines.push(`  ${k}: ${v as any};`);
    }
  }

  return lines.join("\n");
}

function foundationVarMap(theme: ThemeConfig): ThemeVarMap {
  const f = theme.foundation ?? {};
  const out: ThemeVarMap = {};

  if (f.textScaling != null) out["--text-scaling"] = f.textScaling as any;

  const base = f.base ?? {};
  if (base.color) out["--base-font-color"] = base.color as any;
  if (base.family) out["--base-font-family"] = base.family as any;
  if (base.size) out["--base-font-size"] = base.size as any;
  if (base.lineHeight) out["--base-line-height"] = base.lineHeight as any;
  if (base.weight) out["--base-font-weight"] = base.weight as any;
  if (base.style) out["--base-font-style"] = base.style as any;
  if (base.letterSpacing) out["--base-letter-spacing"] = base.letterSpacing as any;

  const heading = f.heading ?? {};
  if (heading.color) out["--heading-font-color"] = heading.color as any;
  if (heading.family) out["--heading-font-family"] = heading.family as any;
  if (heading.weight) out["--heading-font-weight"] = heading.weight as any;
  if (heading.style) out["--heading-font-style"] = heading.style as any;
  if (heading.letterSpacing) out["--heading-letter-spacing"] = heading.letterSpacing as any;

  const a = f.anchor ?? {};
  if (a.color) out["--anchor-font-color"] = a.color as any;
  if (a.family) out["--anchor-font-family"] = a.family as any;
  if (a.textDecoration) out["--anchor-text-decoration"] = a.textDecoration as any;
  if (a.textDecorationHover) out["--anchor-text-decoration-hover"] = a.textDecorationHover as any;
  if (a.textDecorationActive) out["--anchor-text-decoration-active"] = a.textDecorationActive as any;
  if (a.textDecorationFocus) out["--anchor-text-decoration-focus"] = a.textDecorationFocus as any;

  if (f.spacingUnit) out["--spacing"] = f.spacingUnit as any;

  const r = f.radii ?? {};
  if (r.base) out["--radius-base"] = r.base as any;
  if (r.container) out["--radius-container"] = r.container as any;

  const b = f.borders ?? {};
  if (b.defaultBorderWidth) out["--default-border-width"] = b.defaultBorderWidth as any;
  if (b.defaultDivideWidth) out["--default-divide-width"] = b.defaultDivideWidth as any;
  if (b.defaultRingWidth) out["--default-ring-width"] = b.defaultRingWidth as any;

  if (f.bodyBackgroundColor) out["--body-background-color"] = f.bodyBackgroundColor as any;

  Object.assign(out, f.vars ?? {});
  Object.assign(out, theme.vars ?? {});
  return out;
}

// ============================================================================
// Token emitters
// ============================================================================

// SCALES ONLY (foundations.css)
function blurScaleVars() {
  const out: Record<string, string> = {};
  for (const k in blurScale) out[`blur-${k}`] = blurScale[k as BlurScaleKey];
  return toCSSVarsSorted(out);
}

function spacingScaleVars() {
  const out: Record<string, string> = {};
  for (const k in spacingScale) out[`spacing-${k}`] = spacingScale[k as keyof typeof spacingScale];
  return toCSSVarsSorted(out);
}

function radiusScaleVars() {
  const out: Record<string, string> = {};
  for (const k in radiusScale) out[`radius-${k}`] = radiusScale[k as RadiusScaleKey];
  return toCSSVarsSorted(out);
}

function sizeScaleVars() {
  const out: Record<string, string> = {};
  for (const k in sizeScale) out[`size-${k}`] = sizeScale[k as keyof typeof sizeScale];
  return toCSSVarsSorted(out);
}

function borderScaleVars() {
  const out: Record<string, string> = {};
  for (const k in borderScale) out[`border-${k}`] = borderScale[k as keyof typeof borderScale];
  return toCSSVarsSorted(out);
}

function focusScaleVars() {
  const out: Record<string, string> = {};
  for (const k in focusScale) out[`focus-${k}`] = focusScale[k as keyof typeof focusScale];
  return toCSSVarsSorted(out);
}

function scalingScaleVars() {
  const out: Record<string, string> = {};
  for (const k in scalingBase) out[`${k}-scaling`] = scalingBase[k as keyof typeof scalingBase];

  out["motion-scale"] = motionScale;
  for (const k in motionDurations) out[`motion-duration-${k}`] = motionDurations[k as keyof typeof motionDurations];

  return toCSSVarsSorted(out);
}

function typographyScaleVars() {
  const out: Record<string, string> = {};
  for (const k in typeScale) out[`type-scale-${k}`] = typeScale[k as keyof typeof typeScale];
  for (const k in typeLineHeight) out[`type-leading-${k}`] = typeLineHeight[k as keyof typeof typeLineHeight];
  for (const k in typeTracking) out[`type-tracking-${k}`] = typeTracking[k as keyof typeof typeTracking];
  for (const k in typeWeights) out[`type-weight-${k}`] = typeWeights[k as keyof typeof typeWeights];
  for (const k in typeFamilies) out[`type-family-${k}`] = typeFamilies[k as keyof typeof typeFamilies];
  return toCSSVarsSorted(out);
}

function opacityScaleVars() {
  const out: Record<string, string> = {};
  for (const k in opacityScale) out[`opacity-${k}`] = opacityScale[k as OpacityScaleKey];
  return toCSSVarsSorted(out);
}

function zIndexScaleVars() {
  const out: Record<string, string> = {};
  for (const k in zIndexScale) out[`z-${k}`] = String(zIndexScale[k as ZIndexScaleKey]);
  return toCSSVarsSorted(out);
}

function elevationScaleVars() {
  const out: Record<string, string> = {};
  for (const k in elevationScale) out[`elevation-${k}`] = elevationScale[k as ElevationScaleKey];
  return toCSSVarsSorted(out);
}

function layoutScaleVars() {
  const out: Record<string, string> = {};
  for (const k in layoutContainerScale) out[`layout-container-${k}`] = layoutContainerScale[k as LayoutContainerScaleKey];
  return toCSSVarsSorted(out);
}

// GLOBAL SEMANTICS (semantic.css) — NON-COLOR ONLY
function spacingSemanticVars() {
  const out: Record<string, string> = {};
  for (const k in spacingSemantic) {
    const scaleKey = spacingSemantic[k as keyof typeof spacingSemantic];
    out[`spacing-${k}`] = `var(--spacing-${scaleKey})`;
  }
  return toCSSVarsSorted(out);
}

function radiusSemanticVars() {
  const out: Record<string, string> = {};
  for (const k in radiusSemantic) {
    const semanticKey = k as RadiusSemanticKey;
    const scaleKey = radiusSemantic[semanticKey];
    if (semanticKey === scaleKey) continue;
    out[`radius-${semanticKey}`] = `var(--radius-${scaleKey})`;
  }
  return toCSSVarsSorted(out);
}

function sizeSemanticVars() {
  const out: Record<string, string> = {};
  for (const k in sizeSemantic) out[`size-${k}`] = `var(--size-${sizeSemantic[k as keyof typeof sizeSemantic]})`;
  return toCSSVarsSorted(out);
}

function borderSemanticVars() {
  const out: Record<string, string> = {};
  for (const k in borderSemantic) out[k] = `var(--border-${borderSemantic[k as keyof typeof borderSemantic]})`;
  return toCSSVarsSorted(out);
}

function focusSemanticVars() {
  const out: Record<string, string> = {};
  for (const k in focusSemantic) out[k] = `var(--focus-${focusSemantic[k as keyof typeof focusSemantic]})`;
  return toCSSVarsSorted(out);
}

function typographySemanticVars() {
  const out: Record<string, string> = {};
  for (const role in typeRoles) {
    const cfg = typeRoles[role as keyof typeof typeRoles];
    out[`type-${role}-size`] = `var(--type-scale-${cfg.size})`;
    out[`type-${role}-weight`] = `var(--type-weight-${cfg.weight})`;
    out[`type-${role}-leading`] = `var(--type-leading-${cfg.leading})`;
    out[`type-${role}-tracking`] = `var(--type-tracking-${cfg.tracking})`;
    out[`type-${role}-family`] = `var(--type-family-${cfg.family})`;
    out[`type-${role}-transform`] = cfg.transform;
  }
  return toCSSVarsSorted(out);
}

function opacitySemanticVars() {
  const out: Record<string, string> = {};
  for (const k in opacitySemantic) {
    const cssKey = `opacity-${k}`;
    const scaleKey = opacitySemantic[k as OpacitySemanticKey];
    out[cssKey] = `var(--opacity-${scaleKey})`;
  }
  return toCSSVarsSorted(out);
}

function zIndexSemanticVars() {
  const out: Record<string, string> = {};
  for (const k in zIndexSemantic) out[`z-${k}`] = `var(--z-${zIndexSemantic[k as ZIndexSemanticKey]})`;
  return toCSSVarsSorted(out);
}

function elevationSemanticVars() {
  const out: Record<string, string> = {};
  for (const k in elevationSemantic) out[`elevation-${k}`] = `var(--elevation-${elevationSemantic[k as ElevationSemanticKey]})`;
  return toCSSVarsSorted(out);
}

function layoutSemanticVars() {
  const out: Record<string, string> = {};

  for (const k in layoutContainerSemantic) {
    const semanticKey = k as LayoutContainerSemanticKey;
    const scaleKey = layoutContainerSemantic[semanticKey];
    out[`layout-container-${semanticKey}`] = `var(--layout-container-${scaleKey})`;
  }

  for (const k in layoutSpacingSemantic) {
    const cssKey = toKebabCase(k);
    const spacingKey = layoutSpacingSemantic[k as keyof typeof layoutSpacingSemantic];
    out[`layout-${cssKey}`] = `var(--spacing-${spacingKey})`;
  }

  return toCSSVarsSorted(out);
}

function scalingSemanticVars() {
  const out: Record<string, string> = {};

  for (const k in scalingPresets) out[`scaling-${k}`] = scalingPresets[k as keyof typeof scalingPresets];

  for (const k in componentScaling) out[`${k}-scale`] = componentScaling[k as keyof typeof componentScaling];

  out["motion-ease"] = motionEase;

  return toCSSVarsSorted(out);
}

// ============================================================================
// CSS builders
// ============================================================================

function themeCSS(theme: ThemeConfig): string {
  const foundationCss = emitThemeVarMap(foundationVarMap(theme));

  return `
html[data-theme='${theme.name}'] {
${section("FOUNDATION (PER THEME)", foundationCss)}
${section("COLOR RAMPS", roleVars(theme))}
}
`.trimStart();
}

function foundationsCSS(): string {
  return `
/* ============================================================================
   Clothesline Foundations (global, theme-agnostic)
   SCALES ONLY
============================================================================ */
html {
${section("BLUR SCALE", blurScaleVars())}
${section("BORDER WIDTH SCALE", borderScaleVars())}
${section("ELEVATION SCALE", elevationScaleVars())}
${section("FOCUS SCALE", focusScaleVars())}
${section("LAYOUT CONTAINER SCALE", layoutScaleVars())}
${section("OPACITY SCALE", opacityScaleVars())}
${section("RADIUS SCALE", radiusScaleVars())}
${section("SCALING & MOTION SCALES", scalingScaleVars())}
${section("SIZE SCALE", sizeScaleVars())}
${section("SPACING SCALE", spacingScaleVars())}
${section("TYPOGRAPHY SCALES", typographyScaleVars())}
${section("Z-INDEX SCALE", zIndexScaleVars())}
}
`.trimStart();
}

function semanticCSS(): string {
  const globalNonColorFromBase = toCSSVarsGroupedByPrefix(
    extractNonColorSemanticFromBaseTokens(baseTokens as any)
  );

  return `
/* ============================================================================
   Clothesline Semantics (global, theme-agnostic)
   - NON-COLOR semantic aliases
   - Structural/global helpers only (no color decisions)
============================================================================ */
html {
${section("GLOBAL NON-COLOR HELPERS (FROM BASE TOKENS)", globalNonColorFromBase)}
${section("BORDER SEMANTICS", borderSemanticVars())}
${section("ELEVATION SEMANTICS", elevationSemanticVars())}
${section("FOCUS SEMANTICS", focusSemanticVars())}
${section("LAYOUT SEMANTICS", layoutSemanticVars())}
${section("OPACITY SEMANTICS", opacitySemanticVars())}
${section("RADIUS SEMANTICS", radiusSemanticVars())}
${section("SCALING SEMANTICS", scalingSemanticVars())}
${section("SIZE SEMANTICS", sizeSemanticVars())}
${section("SPACING SEMANTICS", spacingSemanticVars())}
${section("TYPOGRAPHY SEMANTICS", typographySemanticVars())}
${section("Z-INDEX SEMANTICS", zIndexSemanticVars())}
}

/* Global defaults that are not scales */
html[data-mode='light'],
html[data-mode='dark'] {
  --k-ct: clamp(0%, calc((var(--contrast-factor, 1) - 1) * 120%), 25%);
}

/* Vision defaults can be global; modes.css can still override per vision mode */
html {
${section("VISION DEFAULTS", visionDefaults())}
}
`.trimStart();
}

function semanticColorsCSS(): string {
  const lightVars = toCSSVarsSorted((semanticColorTokens as any).light);
  const darkVars = toCSSVarsSorted((semanticColorTokens as any).dark);

  return `
/* ============================================================================
   Clothesline Semantic Color Layer (global, theme-agnostic)
   - References theme-provided ramps + contrast picks.
============================================================================ */
html[data-mode='light'] {
${lightVars}
}

html[data-mode='dark'] {
${darkVars}
}
`.trimStart();
}



function componentsCSS(): string {
  const componentOnly = filterBaseTokensForComponents(baseTokens as any);

  // Optional: provide a groupOrder if you want a fixed ordering.
  const grouped = toCSSVarsGroupedByPrefix(componentOnly);

  return `
/* ============================================================================
   Clothesline Component Tokens (global contract)
   - Component-only tokens
   - Global semantics are intentionally excluded (see semantic.css + semantic-colors.css + modes.css)
============================================================================ */
html {
${section("COMPONENT TOKENS", grouped)}
}
`.trimStart();
}

function semanticEffectsCSS(): string {
  const vars = toCSSVarsSorted(semanticEffectsTokens as any);

  return `
/* ============================================================================
   Clothesline Semantic Effects (global, theme-agnostic)
============================================================================ */
html {
${vars}
}
`.trimStart();
}


// ============================================================================
// Output wiring
// ============================================================================

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const pkgRoot = path.resolve(__dirname, "../..");
const distRoot = path.join(pkgRoot, "dist");

const cssDir = path.join(distRoot, "css");
const cssThemesDir = path.join(cssDir, "themes");
const manifestDir = path.join(distRoot, "manifest");

const modesCssPath = path.join(pkgRoot, "src", "css", "modes.css");

async function buildTheme(theme: ThemeConfig) {
  const css = themeCSS(theme);
  const file = path.join(cssThemesDir, `${theme.name}.css`);
  await fs.outputFile(file, css);
  console.log(`Built ${path.relative(process.cwd(), file)}`);
}

async function copyModes() {
  const dest = path.join(cssDir, "modes.css");
  if (await fs.pathExists(modesCssPath)) await fs.copy(modesCssPath, dest);
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

  await fs.outputFile(path.join(cssDir, "foundations.css"), foundationsCSS());
  await fs.outputFile(path.join(cssDir, "semantic.css"), semanticCSS());
  await fs.outputFile(path.join(cssDir, "semantic-colors.css"), semanticColorsCSS());
  await fs.outputFile(path.join(cssDir, "semantic-effects.css"), semanticEffectsCSS());
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



