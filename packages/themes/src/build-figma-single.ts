// packages/themes/src/build-figma-single.ts
// ===============================================================
// Builds ONE Tokens Studio JSON (tokens.json) containing:
//  • global tokens (from baseTokens)
//  • <theme>.light color ramps
//  • <theme>.dark  color ramps
// No modes, no $themes, no paid features required.
// Output goes to: packages/themes/tokens/tokens.json
// ===============================================================

import fs from "fs-extra";
import path from "node:path";
import { fileURLToPath } from "node:url";

import type { ThemeConfig } from "./types.ts";
import { generateRampFromSeed, RAMP_STEPS as rampNames } from "../../tokens/utils/generateRamps.js";
import { toOklch } from "../../tokens/utils/colorEngine.js";
import { baseTokens } from "@clothesline/tokens";

// ===============================================================
// Theme imports
// ===============================================================
import { clotheslineTheme } from "../configs/clothesline.ts";
import { timberlineTheme }   from "../configs/timberline.ts";
import { nightMarketTheme }  from "../configs/night-market.ts";
import { retrogradeTheme }   from "../configs/retrograde.ts";
import { tidalGlassTheme }   from "../configs/tidal-glass.ts";
import { copperSunTheme }    from "../configs/copper-sun.ts";
import { milkywayTheme }     from "../configs/milkyway.ts";
import { bigSkyTheme }       from "../configs/bigsky.ts";

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
  "primary", "secondary", "tertiary",
  "success", "warning", "error", "info",
  "accent", "neutral", "surface"
] as const;

type ThemeMode = "light" | "dark";
type RoleName  = (typeof ROLES)[number];
type Step      = (typeof rampNames)[number];

const STEPS = rampNames as Step[];
const STEPS_REV = [...STEPS].reverse() as Step[];

// ===============================================================
// Flip for dark mode
// ===============================================================
function flipRamp(ramp: Record<Step,string>) {
  const out: any = {};
  STEPS.forEach((step, i) => {
    out[step] = ramp[STEPS_REV[i]];
  });
  return out;
}

// ===============================================================
// Coerce seed (minimal + stable)
// ===============================================================
function getSeed(theme: ThemeConfig, role: string, mode: ThemeMode) {
  const src: any = theme.seeds?.[role as keyof typeof theme.seeds];
  if (!src) return null;

  const pick = src[mode] ?? src;

  if (pick?.l !== undefined) return pick;

  if (typeof pick === "string") return toOklch(pick);

  return null;
}

// ===============================================================
// Build a colorset (<theme>.<mode>)
// ===============================================================
function buildColorSet(theme: ThemeConfig, mode: ThemeMode) {
  const out: any = { color: {} };

  for (const role of ROLES) {
    const seed = getSeed(theme, role, mode);
    if (!seed) continue;

    let ramp = generateRampFromSeed(seed);
    if (mode === "dark") ramp = flipRamp(ramp);

    out.color[role] = Object.fromEntries(
      STEPS.map(step => [
        step,
        { $type: "color", $value: ramp[step] }
      ])
    );
  }

  return out;
}

// ===============================================================
// Convert baseTokens → Tokens Studio global set
// ===============================================================
function setPath(root: any, parts: string[], val: any) {
  let node = root;
  for (let i = 0; i < parts.length - 1; i++) {
    node[parts[i]] ||= {};
    node = node[parts[i]];
  }
  node[parts[parts.length - 1]] = val;
}

function emitVars(vars: Record<string,string>, prefix: string, type: string, rename: string) {
  const out: any = {};

  for (const [key, val] of Object.entries(vars)) {
    if (!key.startsWith(prefix)) continue;

    const slug = key.slice(prefix.length).replace(/^-/, "");
    const parts = slug ? slug.split("-") : ["base"];

    setPath(out, parts, {
      $type: type,
      $value: val
    });
  }

  return { [rename]: out };
}

function buildGlobalSet() {
  const vars = baseTokens as unknown as Record<string,string>;
  const global: any = {};

  Object.assign(global, emitVars(vars, "--spacing",  "spacing",       "spacing"));
  Object.assign(global, emitVars(vars, "--radius",   "borderRadius",  "radius"));
  Object.assign(global, emitVars(vars, "--border",   "borderWidth",   "border"));
  Object.assign(global, emitVars(vars, "--size",     "sizing",        "size"));
  Object.assign(global, emitVars(vars, "--opacity",  "opacity",       "opacity"));
  Object.assign(global, emitVars(vars, "--font-size","fontSizes",     "fontSize"));
  Object.assign(global, emitVars(vars, "--line-height","lineHeights","lineHeight"));
  Object.assign(global, emitVars(vars, "--font-weight","fontWeights","fontWeight"));
  Object.assign(global, emitVars(vars, "--letter-spacing","letterSpacing","tracking"));

  return global;
}

// ===============================================================
// Output location (CORRECTED)
// ===============================================================
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outFile = path.resolve(__dirname, "../tokens/tokens.json");

// ===============================================================
// Build
// ===============================================================
async function run() {
  const file: any = {
    $description: "Clothesline Tokens (single file importable into Tokens Studio)",
    $metadata: {
      tokenSetOrder: [
        "global",
        ...THEMES.flatMap(t => [`${t.name}.light`, `${t.name}.dark`])
      ]
    },
    global: buildGlobalSet()
  };

  for (const theme of THEMES) {
    file[`${theme.name}.light`] = buildColorSet(theme, "light");
    file[`${theme.name}.dark`]  = buildColorSet(theme, "dark");
  }

  await fs.ensureDir(path.dirname(outFile));
  await fs.outputJson(outFile, file, { spaces: 2 });

  console.log("✓ Wrote", outFile);
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
