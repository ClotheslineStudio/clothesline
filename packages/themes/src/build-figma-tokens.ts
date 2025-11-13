// packages/themes/src/build-figma-tokens.ts
import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';

// Colors
import { generateRampFromSeed, RAMP_STEPS as rampNames } from '../../tokens/utils/generateRamps.js';

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
const ROLES = [
  'primary','secondary','tertiary',
  'success','warning','error','info',
  'accent','neutral','surface'
] as const;
type RoleName = typeof ROLES[number];

type Step = (typeof rampNames)[number];
const SHADE_ORDER     = rampNames as Step[];
const SHADE_ORDER_REV = [...SHADE_ORDER].reverse() as Step[];

function flipRampForDark(r: Record<Step,string>) {
  const out = {} as Record<Step,string>;
  for (let i=0;i<SHADE_ORDER.length;i++) {
    out[SHADE_ORDER[i]] = r[SHADE_ORDER_REV[i]];
  }
  return out;
}

function coerceToOklch(input: any, fallbackHue = 0): OklchColor | null {
  if (input == null) return null;
  if (typeof input === 'string') {
    const o: any = toOklch(input);
    return o && typeof o.l === 'number'
      ? { mode: 'oklch', l: o.l, c: o.c ?? 0, h: o.h ?? fallbackHue, alpha: o.alpha }
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
    if (input.seed !== undefined)   return coerceToOklch(input.seed, fallbackHue);
    if (input.value !== undefined)  return coerceToOklch(input.value, fallbackHue);
    const o: any = toOklch(input);
    return o && typeof o.l === 'number'
      ? { mode:'oklch', l:o.l, c:o.c ?? 0, h:o.h ?? fallbackHue, alpha:o.alpha }
      : null;
  }
  return null;
}

function getRoleSeed(theme: ThemeConfig, mode: ThemeMode, role: RoleName): OklchColor | null {
  // Always prefer explicit OKLCH seeds first
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
    const l = (theme as any).seeds?.[role]?.l ?? 0.64; // uses seed’s L if available
    return { mode: 'oklch', l, c, h };
  }

  // string color
  if (typeof seedNode === 'string') {
    const o = toOklch(seedNode);
    if (o && typeof o.l === 'number') return { mode: 'oklch', l: o.l, c: o.c, h: o.h };
  }

  // structured light/dark object
  if (typeof seedNode === 'object') {
    const pick = seedNode[mode] ?? seedNode.light ?? seedNode.dark;
    if (pick) return getRoleSeed({ seeds: { [role]: pick } } as any, mode, role);
  }

  return null;
}


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

const __dirname  = path.dirname(fileURLToPath(import.meta.url));
const outDir     = path.resolve(__dirname, '../dist/figma');
const repoDir    = path.resolve(__dirname, '../tokens');

// Build a single multi-set file + $themes so light/dark become modes
function buildFile() {
  const file: any = {
    $description: 'Clothesline color tokens for Tokens Studio (one set per theme+mode) + $themes for Figma modes',
    $metadata: {
      tokenSetOrder: THEMES.flatMap(t => [`${t.name}.light`, `${t.name}.dark`])
    }
  };

  // color sets
  for (const theme of THEMES) {
    for (const mode of ['light','dark'] as ThemeMode[]) {
      const set: any = { color: {} };
      for (const role of ROLES) {
        const seed = getRoleSeed(theme, mode, role);
        if (!seed) continue;
        let ramp = generateRampFromSeed(seed) as Record<Step,string>;
        if (mode === 'dark') ramp = flipRampForDark(ramp);
        set.color[role] = Object.fromEntries(
          rampNames.map(step => [step, { $type:'color', $value: ramp[step] }])
        );
      }
      file[`${theme.name}.${mode}`] = set;
    }
  }

  // $themes: same name, two modes → Tokens Studio pushes as one collection with modes
  file.$themes = THEMES.flatMap(t => ([
    {
      name: t.name,
      mode: 'Light',
      group: t.name.replace(/(^|\s)\S/g, s => s.toUpperCase()),
      selectedTokenSets: { [`${t.name}.light`]: 'enabled' }
    },
    {
      name: t.name,
      mode: 'Dark',
      group: t.name.replace(/(^|\s)\S/g, s => s.toUpperCase()),
      selectedTokenSets: { [`${t.name}.dark`]: 'enabled' }
    }
  ]));

  return file;
}

async function run() {
  await fs.ensureDir(outDir);
  await fs.ensureDir(repoDir);
  const file = buildFile();
  const distFile = path.join(outDir, 'colors.tokens.json');
  const repoFile = path.join(repoDir, 'colors.tokens.json');
  await fs.outputJson(distFile, file, { spaces: 2 });
  await fs.outputJson(repoFile, file, { spaces: 2 });
  console.log('✨ Wrote color tokens with $themes (modes).');
}

run().catch(err => {
  console.error('Figma color tokens build failed:', err);
  process.exit(1);
});


