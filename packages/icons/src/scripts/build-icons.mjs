import fs from 'fs/promises';
import path from 'path';
import fg from 'fast-glob';
import { optimize } from 'svgo';
import { fileURLToPath, pathToFileURL } from 'url';

// ---------------- Paths ----------------
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PKG_ROOT = path.resolve(__dirname, '..', '..');

const DIST_DIR  = path.join(PKG_ROOT, 'dist');
const ICONS_DIR = path.join(PKG_ROOT, 'src', 'svg');
const OUT_DIR   = path.join(PKG_ROOT, 'src', 'components');

const INDEX_TS  = path.join(PKG_ROOT, 'src', 'index.ts');
const INDEX_JS  = path.join(DIST_DIR, 'index.js');
const META_DIR  = path.join(PKG_ROOT, 'src', 'meta');

const STRIP_PREFIXES = ['icon-'];

const svgoCfgUrl = pathToFileURL(path.join(PKG_ROOT, 'svgo.config.mjs')).href;
const SVGO_CFG = (await import(svgoCfgUrl)).default;

const VARIANTS = /** @type const */ (['stroke','filled','duotone','animated']);
const VAR_SUFFIXES = {
  stroke: ['','-stroke','-line'],
  filled: ['-filled','-solid'],
  duotone: ['-duotone','-duo','-two'],
  animated: ['-anim','-animated']
};

// ------------- Helpers -----------------
function toPascalCase(name) {
  return name.replace(/(^\w|[-_]\w)/g, (m) => m.replace(/[-_]/, '').toUpperCase());
}
function normalizeName(base) {
  for (const p of STRIP_PREFIXES) if (base.startsWith(p)) return base.slice(p.length);
  return base;
}
function parseNameParts(filePath) {
  const base = path.basename(filePath, '.svg');
  const dir  = path.basename(path.dirname(filePath));
  let icon = base;
  let variant = VARIANTS.includes(dir) ? dir : 'stroke';
  for (const v of VARIANTS) {
    for (const suf of VAR_SUFFIXES[v]) {
      if (suf && base.endsWith(suf)) {
        icon = base.slice(0, -suf.length);
        variant = v;
        break;
      }
    }
  }
  return { icon: normalizeName(icon), variant };
}

// ---------- Sanitize / Parse -----------
function normalizeSvg(optimized, file) {
  let out = optimized;
  // remove white background rects
  out = out.replace(/<rect[^>]*\sfill=["']#?fff(?:fff)?["'][^>]*>\s*<\/rect>/gi, '');
  out = out.replace(/<rect[^>]*\sfill=["']white["'][^>]*>\s*<\/rect>/gi, '');
  // strip defs (clipPaths when exporting frames)
  out = out.replace(/<defs[\s\S]*?<\/defs>/gi, '');
  // unwrap single clip-path wrappers
  out = out.replace(/<g[^>]*\bclip-path=("[^"]*"|'[^']*')[^>]*>([\s\S]*?)<\/g>/gi, '$2');
  // ensure viewBox; remove width/height
  const hadViewBox = /viewBox\s*=\s*["']\s*0\s+0\s+24\s+24\s*["']/i.test(out);
  out = out.replace(/<svg([^>]*)>/i, (_m, attrs) => {
    let a = attrs
      .replace(/\s(width|height)\s*=\s*["'][^"']*["']/gi, '')
      .replace(/\s{2,}/g, ' ');
    if (!/viewBox\s*=/.test(a)) a = `${a} viewBox="0 0 24 24"`;
    return `<svg${a}>`;
  });
  if (!hadViewBox) console.info(`ℹ️ normalized viewBox for ${file}`);
  return out;
}
function extractInner(svg) {
  return svg.replace(/^.*?<svg[^>]*>/s, '').replace(/<\/svg>\s*$/s, '');
}

// remove per-node stroke props so wrapper/group controls width/cap/join
const STRIP_STROKE_PROPS_RE =
  /\sstroke(?:-width|-linecap|-linejoin|-miterlimit|-dasharray|-dashoffset)?=(["'])(?:(?!\1).)*\1/gi;
const STRIP_STYLE_STROKE_RE =
  /\sstyle=(["'])[^"']*(?:stroke(?:-width)?\s*:[^;"']+;?)[^"']*\1/gi;

function sanitizeStrokeInner(inner) {
  let out = inner
    .replace(/\sstroke=(["'])(?:(?!\1).)*\1/gi, '')
    .replace(STRIP_STROKE_PROPS_RE, '')
    .replace(STRIP_STYLE_STROKE_RE, '')
    .replace(/\sfill=(["'])(?!none\1)(?:(?!\1).)*\1/gi, '');
  return out;
}
function sanitizeFilledInner(inner) {
  let out = inner
    .replace(/\sstroke=(["'])(?:(?!\1).)*\1/gi, '')
    .replace(STRIP_STROKE_PROPS_RE, '')
    .replace(STRIP_STYLE_STROKE_RE, '')
    .replace(/\sfill=(["'])(?!none\1)(?:(?!\1).)*\1/gi, ' fill="currentColor"')
    .replace(/<(path|rect|circle|ellipse|polygon|polyline)\b(?![^>]*\sfill=)/gi, '<$1 fill="currentColor"');
  return out;
}

// --- NEW ---
// Duotone Tone2 Sanitizer: removes all fills so group <g fill="..."> controls color
function sanitizeTone2(inner) {
  return inner
    .replace(/\sfill=(["'])(?:(?!\1).)*\1/gi, '')
    .replace(/style=(["'])(?:(?!\1).)*fill[^;"']+;?[^"']*\1/gi, '')
    .trim();
}

// ---- Duotone overlap fix (stroke ring vs fill circle) ----
function parseCircleAttrs(tag) {
  const get = (n) => {
    const m = tag.match(new RegExp(`\\b${n}=["']([^"']+)["']`, 'i'));
    return m ? m[1] : undefined;
  };
  return {
    cx: get('cx'), cy: get('cy'), r: get('r'),
    strokeWidth: get('stroke-width'), transform: get('transform')
  };
}
function replaceCircleR(tag, newR) {
  return tag.replace(/\br=["'][^"']+["']/, `r="${newR}"`);
}
/** Shrink tone2 circle if it matches tone1 stroked circle center/radius */
function fixDuotoneOverlap(tone1Raw, tone2Raw, { eps = 0.02, tolerance = 0.2, defaultStroke = 2 } = {}) {
  const t1Circles = tone1Raw.match(/<circle\b[^>]*>/gi) || [];
  const stroked = t1Circles.find(c => /stroke=/i.test(c) || /stroke-width=/i.test(c));
  if (!stroked) return tone2Raw;

  const s = parseCircleAttrs(stroked);
  const cx = parseFloat(s.cx ?? 'NaN');
  const cy = parseFloat(s.cy ?? 'NaN');
  const rStroke = parseFloat(s.r ?? 'NaN');
  const sw = parseFloat(s.strokeWidth ?? `${defaultStroke}`);
  if (!isFinite(cx) || !isFinite(cy) || !isFinite(rStroke) || !isFinite(sw)) return tone2Raw;

  const t2Circles = tone2Raw.match(/<circle\b[^>]*>/gi) || [];
  let adjusted = tone2Raw;
  for (const tag of t2Circles) {
    if (/fill=["'](?!none)/i.test(tag)) {
      const p = parseCircleAttrs(tag);
      const cx2 = parseFloat(p.cx ?? 'NaN');
      const cy2 = parseFloat(p.cy ?? 'NaN');
      const r2  = parseFloat(p.r ?? 'NaN');
      if (Math.abs(cx2 - cx) <= tolerance && Math.abs(cy2 - cy) <= tolerance && Math.abs(r2 - rStroke) <= tolerance) {
        const newR = (rStroke - sw / 2 - eps).toFixed(3);
        adjusted = adjusted.replace(tag, replaceCircleR(tag, newR));
        break;
      }
    }
  }
  adjusted = adjusted.replace(/\stransform=["']rotate\([^"']+\)["']/gi, '');
  return adjusted;
}

// Prefer content inside a property frame like id="Property 1=duotone"
function extractFrame(inner, frameIdRegex = /Property\s*1\s*=\s*duotone/i) {
  const re = new RegExp(`<g[^>]*\\bid=(["'])([^"']*)\\1[^>]*>([\\s\\S]*?)<\\/g>`, 'gi');
  let match;
  while ((match = re.exec(inner))) {
    const id = match[2];
    if (frameIdRegex.test(id)) return match[3];
  }
  return null;
}

function extractTagById(inner, id) {
  const gRe = new RegExp(`<g[^>]*\\bid=(["'])${id}\\1[^>]*>([\\s\\S]*?)<\\/g>`, 'i');
  const gm = inner.match(gRe);
  if (gm) return { kind: 'group', html: gm[2] };

  const tagName = '(?:path|circle|rect|ellipse|polygon|polyline|line)';
  const singleRe = new RegExp(`(<${tagName}[^>]*\\bid=(["'])${id}\\2[^>]*\\/?>)`, 'i');
  const sm = inner.match(singleRe);
  if (sm) return { kind: 'single', html: sm[1] };

  return null;
}

function extractDuotone(inner) {
  const framed = extractFrame(inner) || inner;

  const t1 = extractTagById(framed, 'tone1');
  const t2 = extractTagById(framed, 'tone2');

  if (t1 || t2) {
    let tone1Raw = t1 ? t1.html : '';
    let tone2Raw = t2 ? t2.html : '';

    tone2Raw = fixDuotoneOverlap(tone1Raw, tone2Raw);

    return {
      tone1: sanitizeStrokeInner(tone1Raw),
      tone2: sanitizeFilledInner(tone2Raw).replace(/\sstroke=(["'])(?:(?!\1).)*\1/gi, '')
    };
  }

  const SHAPE = '(?:path|circle|rect|ellipse|polygon|polyline|line)';
  const fillRE   = new RegExp(`<${SHAPE}\\b[^>]*\\sfill=(["'])(?!none\\1)[^>]*>`, 'gi');
  const strokeRE = new RegExp(`<${SHAPE}\\b[^>]*\\sstroke=(["']).*?>`, 'gi');

  const tone2Parts = [];
  let rest = framed;
  rest = rest.replace(fillRE, (m) => { tone2Parts.push(m); return ''; });

  const tone1Parts = [];
  rest = rest.replace(strokeRE, (m) => { tone1Parts.push(m); return ''; });

  if (tone1Parts.length === 0 && tone2Parts.length === 0) {
    return { tone1: sanitizeStrokeInner(framed), tone2: '' };
  }

  let t1Raw = tone1Parts.join('\n');
  let t2Raw = tone2Parts.join('\n');
  t2Raw = fixDuotoneOverlap(t1Raw, t2Raw);

  return {
    tone1: sanitizeStrokeInner(t1Raw),
    tone2: sanitizeFilledInner(t2Raw).replace(/\sstroke=(["'])(?:(?!\1).)*\1/gi, '')
  };
}

// ---------- Metadata helpers ----------
function defaultMeta(base, CompName, { hasStroke, hasFilled, hasDuotone }) {
  const variants = [];
  if (hasStroke) variants.push('stroke');
  if (hasFilled) variants.push('filled');
  if (hasDuotone) variants.push('duotone');

  return {
    name: base,
    displayName: CompName,
    description: '',
    keywords: [],
    categories: [],
    variants,
    sizes: [24],
    version: '0.1.0',
    author: 'Clothesline Studio',
    changelog: []
  };
}

async function loadMeta(base, CompName, flags) {
  const defaults = defaultMeta(base, CompName, flags);
  const metaPath = path.join(META_DIR, `${base}.json`);

  try {
    const raw = await fs.readFile(metaPath, 'utf8');
    const userMeta = JSON.parse(raw);
    return { ...defaults, ...userMeta };
  } catch (_err) {
    console.warn(`⚠️ No metadata for ${base}, using defaults.`);
    return defaults;
  }
}

// ------------- Svelte template -------------
function wrapSvelte({ strokeInner, filledInner, duoTone1, duoTone2, hasStroke, hasFilled, hasDuotone }) {
  return `<!-- AUTO-GENERATED. DO NOT EDIT. -->
<script lang="ts">
  export let size: number = 24;
  export let absoluteStrokeWidth: boolean = false;
  export let strokeWidth: number = 2;

  export let primaryColor: string = "currentColor";
  export let secondaryColor: string = "currentColor";

  export let variant: "stroke" | "filled" | "duotone" | "animated" = "stroke";
  export let ariaLabel: string | undefined = undefined;

  $: svgSize = typeof size === "number" ? size : parseFloat(size as any);

  $: resolvedStroke =
    absoluteStrokeWidth
      ? strokeWidth
      : (strokeWidth / 24) * svgSize;

  const LINECAP = "round";
  const LINEJOIN = "round";
</script>

<svg
  xmlns="http://www.w3.org/2000/svg"
  width={svgSize}
  height={svgSize}
  viewBox="0 0 24 24"
  fill="none"
  stroke-linecap={LINECAP}
  stroke-linejoin={LINEJOIN}
  aria-label={ariaLabel}
  aria-hidden={ariaLabel ? undefined : "true"}
  shape-rendering="geometricPrecision"
>
  {#if variant === "filled"${hasFilled ? '' : ' && false'}}
    <g fill="currentColor" stroke="none" style={"color:" + primaryColor}>
      ${filledInner || ''}
    </g>

  {:else if variant === "duotone"${hasDuotone ? '' : ' && false'}}
    ${duoTone2 && duoTone2.trim()
      ? `<g fill="currentColor" stroke="none" style={"color:" + secondaryColor}>
      ${duoTone2}
    </g>`
      : ''}

    <g fill="none" stroke={primaryColor} stroke-width={resolvedStroke}>
      ${duoTone1 || ''}
    </g>

  {:else}
    <g fill="none" stroke={primaryColor} stroke-width={resolvedStroke}>
      ${strokeInner || ''}
    </g>
  {/if}
</svg>
`;
}


function buildSvgVariants(options) {
  const {
    strokeInner,
    filledInner,
    duoTone1,
    duoTone2,
    hasStroke,
    hasFilled,
    hasDuotone
  } = options;

  const baseAttrs = [
    'xmlns="http://www.w3.org/2000/svg"',
    'width="24"',
    'height="24"',
    'viewBox="0 0 24 24"',
    'fill="none"',
    'shape-rendering="geometricPrecision"',
    'stroke-linecap="round"',
    'stroke-linejoin="round"',
    'aria-hidden="true"'
  ].join(' ');

  const strokeSvg =
    hasStroke && strokeInner && strokeInner.trim()
      ? `<svg ${baseAttrs}>
  <g fill="none" stroke="currentColor" stroke-width="2">
    ${strokeInner}
  </g>
</svg>`
      : '';

  const filledSvg =
    hasFilled && filledInner && filledInner.trim()
      ? `<svg ${baseAttrs}>
  <g fill="currentColor" stroke="none">
    ${filledInner}
  </g>
</svg>`
      : '';

  const duotoneSvg =
    hasDuotone && (duoTone1 && duoTone1.trim() || duoTone2 && duoTone2.trim())
      ? `<svg ${baseAttrs}>
  ${
    duoTone2 && duoTone2.trim()
      ? `<g fill="currentColor" stroke="none">
    ${duoTone2}
  </g>`
      : ''
  }

  <g fill="none" stroke="currentColor" stroke-width="2">
    ${duoTone1}
  </g>
</svg>`
      : '';

  const result = {
    stroke: strokeSvg
  };

  if (filledSvg) {
    result.filled = filledSvg;
  }

  if (duotoneSvg) {
    result.duotone = duotoneSvg;
  }

  return result;
}








// ---------------- Main -----------------
async function main() {
  await fs.mkdir(OUT_DIR, { recursive: true });
  await fs.mkdir(DIST_DIR, { recursive: true });

  const files = await fg(['src/svg/**/*.svg'], { cwd: PKG_ROOT, absolute: true });
  console.log(`build-icons: searching in ${ICONS_DIR}, found ${files.length} SVGs`);

  if (files.length === 0) {
    console.warn(`No SVGs found in ${ICONS_DIR}`);

    const emptyTs = `// AUTO-GENERATED. Do not edit by hand.

export const iconRegistry = {} as const;

export type IconName = keyof typeof iconRegistry;
`;

    const emptyJs = `// AUTO-GENERATED. Do not edit by hand.

export const iconRegistry = {};
`;

    await fs.writeFile(INDEX_TS, emptyTs, 'utf8');
    await fs.writeFile(INDEX_JS, emptyJs, 'utf8');
    return;
  }

  const map = new Map();

  for (const absPath of files) {
    const rel = path.relative(ICONS_DIR, absPath);
    const { icon: baseName, variant } = parseNameParts(absPath);
    const raw = await fs.readFile(absPath, 'utf8');

    let { data: optimized } = optimize(raw, { path: absPath, ...SVGO_CFG });
    optimized = normalizeSvg(optimized, rel);

    const innerRaw = extractInner(optimized);

    if (!map.has(baseName)) {
      map.set(baseName, { stroke: '', filled: '', duotone: { tone1: '', tone2: '' }, animated: '' });
    }
    const entry = map.get(baseName);

    if (variant === 'duotone') {
      const { tone1, tone2 } = extractDuotone(innerRaw);
      entry.duotone = { tone1, tone2 };
    } else if (variant === 'filled') {
      entry.filled = sanitizeFilledInner(innerRaw);
    } else if (variant === 'animated') {
      entry.animated = sanitizeStrokeInner(innerRaw);
    } else {
      entry.stroke = sanitizeStrokeInner(innerRaw);
    }
  }

  const imports = [];
  const exportsArr = [];
  const registry = [];

  for (const [base, data] of map.entries()) {
    const Comp = toPascalCase(base);
    const outFile = path.join(OUT_DIR, `${Comp}.svelte`);

    const hasStroke = Boolean(data.stroke && data.stroke.trim());
    const hasFilled = Boolean(data.filled && data.filled.trim());
    const hasDuotone = Boolean(
      (data.duotone?.tone1 && data.duotone.tone1.trim()) ||
      (data.duotone?.tone2 && data.duotone.tone2.trim())
    );

    const strokeInner = hasStroke
      ? data.stroke
      : sanitizeStrokeInner(data.filled || data.duotone?.tone1 || '');
    const filledInner = hasFilled ? data.filled : '';
    const duoTone1 = hasDuotone ? (data.duotone.tone1 || '') : '';
    const duoTone2 = hasDuotone ? sanitizeTone2(data.duotone.tone2 || '') : '';

    const svelte = wrapSvelte({
      strokeInner,
      filledInner,
      duoTone1,
      duoTone2,
      hasStroke,
      hasFilled,
      hasDuotone
    });
    const svgVariants = buildSvgVariants({
  strokeInner,
  filledInner,
  duoTone1,
  duoTone2,
  hasStroke,
  hasFilled,
  hasDuotone
});


    await fs.writeFile(outFile, svelte, 'utf8');

    const meta = await loadMeta(base, Comp, { hasStroke, hasFilled, hasDuotone });

    imports.push(`import ${Comp} from './components/${Comp}.svelte';`);
    exportsArr.push(Comp);
    registry.push(
  `  "${base}": { component: ${Comp}, meta: ${JSON.stringify(meta)}, svg: ${JSON.stringify(svgVariants)} }`
);

  }

  const indexTs = `// AUTO-GENERATED. Do not edit by hand.
${imports.join('\n')}

export { ${exportsArr.join(', ')} };

export const iconRegistry = {
${registry.join(',\n')}
} as const;

export type IconName = keyof typeof iconRegistry;
`;

  const indexJs = `// AUTO-GENERATED. Do not edit by hand.
${imports.join('\n')}

export { ${exportsArr.join(', ')} };

export const iconRegistry = {
${registry.join(',\n')}
};
`;

  await fs.writeFile(INDEX_TS, indexTs, 'utf8');
  await fs.writeFile(INDEX_JS, indexJs, 'utf8');

  console.log(`✅ Built ${map.size} icons → components (+ registry with meta).`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

