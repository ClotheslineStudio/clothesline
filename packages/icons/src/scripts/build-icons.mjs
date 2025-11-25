import fs from 'fs/promises';
import path from 'path';
import fg from 'fast-glob';
import { optimize } from 'svgo';
import { fileURLToPath, pathToFileURL } from 'url';

// ---------------- Paths ----------------
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PKG_ROOT = path.resolve(__dirname, '..', '..');

const ICONS_DIR = path.join(PKG_ROOT, 'src', 'svg');
const OUT_DIR   = path.join(PKG_ROOT, 'src', 'components');
const INDEX_TS  = path.join(PKG_ROOT, 'src', 'index.ts');
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
  // remove pointless rotate on circles
  adjusted = adjusted.replace(/\stransform=["']rotate\([^"']+\)["']/gi, '');
  return adjusted;
}

// Prefer content inside a property frame like id="Property 1=duotone"
function extractFrame(inner, frameIdRegex = /Property\s*1\s*=\s*duotone/i) {
  const re = new RegExp(`<g[^>]*\\bid=(["'])([^"']*)\\1[^>]*>([\\s\\S]*?)<\\/g>`, 'gi');
  let match;
  while ((match = re.exec(inner))) {
    const id = match[2];
    if (frameIdRegex.test(id)) return match[3]; // inner HTML of the frame
  }
  return null;
}

function extractTagById(inner, id) {
  // 1) container group
  const gRe = new RegExp(`<g[^>]*\\bid=(["'])${id}\\1[^>]*>([\\s\\S]*?)<\\/g>`, 'i');
  const gm = inner.match(gRe);
  if (gm) return { kind: 'group', html: gm[2] };

  // 2) any single element (path|circle|rect|ellipse|polygon|polyline|line)
  const tagName = '(?:path|circle|rect|ellipse|polygon|polyline|line)';
  const singleRe = new RegExp(`(<${tagName}[^>]*\\bid=(["'])${id}\\2[^>]*\\/?>)`, 'i');
  const sm = inner.match(singleRe);
  if (sm) return { kind: 'single', html: sm[1] };

  return null;
}

function extractDuotone(inner) {
  // 🔎 If exported from a Figma property frame, focus on that frame first
  const framed = extractFrame(inner) || inner;

  const t1 = extractTagById(framed, 'tone1');
  const t2 = extractTagById(framed, 'tone2');

  if (t1 || t2) {
    let tone1Raw = t1 ? t1.html : '';
    let tone2Raw = t2 ? t2.html : '';

    // Fix stroke/fill overlap (circle ring vs fill) then sanitize
    tone2Raw = fixDuotoneOverlap(tone1Raw, tone2Raw);

    return {
      tone1: sanitizeStrokeInner(tone1Raw),
      tone2: sanitizeFilledInner(tone2Raw).replace(/\sstroke=(["'])(?:(?!\1).)*\1/gi, '')
    };
  }

  // ---- Fallback: split by paint (still use the framed region) ----
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
    name: base,             // "add-plus"
    displayName: CompName,  // "AddPlus" (you can pretty this later if you want)
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
  return `<!-- AUTO-GENERATED. Do not edit by hand. -->
<script lang="ts">
  export let size: number | string = 24;
  export let strokeWidth: number | string | undefined = undefined;
  export let variant: 'stroke' | 'filled' | 'duotone' | 'animated' = 'stroke';

  // semantic roles
  export let role:
    | 'default'
    | 'muted'
    | 'primary'
    | 'success'
    | 'warning'
    | 'error'
    | 'info' = 'default';

  export let secondaryRole:
    | 'default'
    | 'muted'
    | 'primary'
    | 'success'
    | 'warning'
    | 'error'
    | 'info' = 'muted';

  export let className: string = '';
  export let ariaLabel: string = 'icon';
  export let title: string | undefined = undefined;

  const colorByRole = {
    default: 'var(--icon)',
    muted: 'var(--icon-muted)',
    primary: 'var(--icon-primary)',
    success: 'var(--icon-success)',
    warning: 'var(--icon-warning)',
    error: 'var(--icon-error)',
    info: 'var(--icon-info)'
  } as const;

  const fillByRole = {
    default: 'var(--icon-fill)',
    muted: 'var(--icon-fill-muted)',
    primary: 'var(--icon-fill-primary)',
    success: 'var(--icon-fill-success)',
    warning: 'var(--icon-fill-warning)',
    error: 'var(--icon-fill-error)',
    info: 'var(--icon-fill-info)'
  } as const;

  $: effectiveStrokeWidth = strokeWidth ?? 'var(--icon-stroke)';
</script>

<svg
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 24 24"
  width={size}
  height={size}
  fill="none"
  stroke="currentColor"
  stroke-width={effectiveStrokeWidth}
  stroke-linecap="var(--icon-stroke-linecap)"
  stroke-linejoin="var(--icon-stroke-linejoin)"
  aria-label={ariaLabel}
  role="img"
  class={className}
  style="color: {colorByRole[role]}"
  shape-rendering="geometricPrecision"
  {...$$restProps}
>
  {#if title}<title>{title}</title>{/if}

  {#if variant === 'filled' && ${hasFilled ? 'true' : 'false'}}
    <g fill="currentColor" stroke="none" style="color:{fillByRole[role]}">
      ${filledInner}
    </g>

  {:else if variant === 'duotone' && ${hasDuotone ? 'true' : 'false'}}
    ${Boolean(duoTone2 && duoTone2.trim())
      ? `<g class="tone2" fill="currentColor" stroke="none" style="color:var(--icon-duotone-2)">
      ${duoTone2}
    </g>`
      : ''
    }

    <g class="tone1"
       style="color:var(--icon-duotone-1); paint-order: stroke fill"
       stroke="currentColor"
       stroke-width={effectiveStrokeWidth}>
      ${duoTone1}
    </g>

  {:else}
    <!-- Stroke (default/fallback) -->
    <g stroke="currentColor" stroke-width={effectiveStrokeWidth}>
      ${strokeInner}
    </g>
  {/if}
</svg>
`;
}

// ---------------- Main -----------------
async function main() {
  await fs.mkdir(OUT_DIR, { recursive: true });

  const files = await fg(['**/*.svg'], { cwd: ICONS_DIR, absolute: true });
  if (files.length === 0) {
    console.warn(`No SVGs found in ${ICONS_DIR}`);
    await fs.writeFile(
      INDEX_TS,
      `// AUTO-GENERATED
export const iconRegistry = {} as const;
export type IconName = keyof typeof iconRegistry;
`
    );
    return;
  }

  /** Map: baseName → { stroke?: string, filled?: string, duotone?: {tone1:string,tone2:string}, animated?: string } */
  const map = new Map();

  for (const absPath of files) {
    const rel = path.relative(ICONS_DIR, absPath);
    const { icon: baseName, variant } = parseNameParts(absPath);
    const raw = await fs.readFile(absPath, 'utf8');

    // Optimize via SVGO
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

    // Fallbacks if variants are missing: use stroke geometry
    const strokeInner = hasStroke ? data.stroke : sanitizeStrokeInner(data.filled || data.duotone?.tone1 || '');
    const filledInner = hasFilled ? data.filled : '';
    const duoTone1 = hasDuotone ? (data.duotone.tone1 || '') : '';
    const duoTone2 = hasDuotone ? (data.duotone.tone2 || '') : '';

    const svelte = wrapSvelte({
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
    registry.push(`  "${base}": { component: ${Comp}, meta: ${JSON.stringify(meta)} }`);
  }

  const index = `// AUTO-GENERATED. Do not edit by hand.
${imports.join('\n')}

export { ${exportsArr.join(', ')} };

export const iconRegistry = {
${registry.join(',\n')}
} as const;

export type IconName = keyof typeof iconRegistry;
`;
  await fs.writeFile(INDEX_TS, index, 'utf8');

  console.log(`✅ Built ${map.size} icons → components (+ registry with meta).`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

