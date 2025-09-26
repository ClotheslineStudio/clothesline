// packages/icons/src/scripts/build-icons.mjs
import fs from 'fs/promises';
import path from 'path';
import fg from 'fast-glob';
import { optimize } from 'svgo';
import { fileURLToPath, pathToFileURL } from 'url';

// --- Paths ---------------------------------------------------------------
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PKG_ROOT = path.resolve(__dirname, '..', '..');

const ICONS_DIR = path.join(PKG_ROOT, 'src', 'svg');
const OUT_DIR   = path.join(PKG_ROOT, 'src', 'components');
const INDEX_TS  = path.join(PKG_ROOT, 'src', 'index.ts');

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

// --- Helpers -------------------------------------------------------------
function toPascalCase(name) {
  return name.replace(/(^\w|[-_]\w)/g, (m) => m.replace(/[-_]/, '').toUpperCase());
}
function normalizeName(base) {
  for (const p of STRIP_PREFIXES) if (base.startsWith(p)) return base.slice(p.length);
  return base;
}
function parseNameParts(filePath) {
  // supports .../stroke/sun.svg or .../sun-duotone.svg
  const base = path.basename(filePath, '.svg');
  const dir  = path.basename(path.dirname(filePath));
  let icon = base;
  let variant = VARIANTS.includes(dir) ? dir : 'stroke';

  // detect by filename suffix
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

// --- Sanitize / Parse ----------------------------------------------------
function normalizeSvg(optimized, file) {
  let out = optimized;

  // remove white background rects
  out = out.replace(/<rect[^>]*\sfill=["']#?fff(?:fff)?["'][^>]*>\s*<\/rect>/gi, '');
  out = out.replace(/<rect[^>]*\sfill=["']white["'][^>]*>\s*<\/rect>/gi, '');

  // strip defs (commonly only clipPaths when exporting frames)
  out = out.replace(/<defs[\s\S]*?<\/defs>/gi, '');

  // unwrap single clip-path group wrappers
  out = out.replace(/<g[^>]*\bclip-path=("[^"]*"|'[^']*')[^>]*>([\s\S]*?)<\/g>/gi, '$2');

  // ensure viewBox, remove width/height on root
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

/** Strip per-node stroke and any fill that isn't 'none' (stroke variant) */
function sanitizeStrokeInner(inner) {
  let out = inner.replace(/\sstroke=(["'])(?:(?!\1).)*\1/gi, '');
  out = out.replace(/\sfill=(["'])(?!none\1)(?:(?!\1).)*\1/gi, '');
  return out;
}
/** For filled variant: drop strokes; normalize non-none fills to currentColor */
function sanitizeFilledInner(inner) {
  let out = inner.replace(/\sstroke=(["'])(?:(?!\1).)*\1/gi, '');
  out = out.replace(/\sfill=(["'])(?!none\1)(?:(?!\1).)*\1/gi, ' fill="currentColor"');
  // ensure a fill on shapes lacking one
  out = out.replace(/<(path|rect|circle|ellipse|polygon|polyline)\b(?![^>]*\sfill=)/gi, '<$1 fill="currentColor"');
  return out;
}

/** Extract duotone by id="tone1"/"tone2"; fallback to paint-based split */
function extractDuotone(inner) {
  const byId = (id) => {
    const re = new RegExp(`<g[^>]*\\bid=(["'])${id}\\1[^>]*>([\\s\\S]*?)<\\/g>`, 'i');
    const m = inner.match(re);
    return m ? m[2] : '';
  };
  let tone1 = byId('tone1');
  let tone2 = byId('tone2');

  if (tone1 || tone2) {
    return {
      tone1: sanitizeStrokeInner(tone1 || ''),
      tone2: sanitizeFilledInner(tone2 || '').replace(/\sstroke=(["'])(?:(?!\1).)*\1/gi, '')
    };
  }

  // No ids? auto-split by paint
  const SHAPE = '(?:path|circle|rect|ellipse|polygon|polyline|line)';
  const fillRE   = new RegExp(`<${SHAPE}\\b[^>]*\\sfill=(["'])(?!none\\1)[^>]*>`, 'gi');
  const strokeRE = new RegExp(`<${SHAPE}\\b[^>]*\\sstroke=(["']).*?>`, 'gi');

  const tone2Parts = [];
  let rest = inner;
  rest = rest.replace(fillRE, (m) => { tone2Parts.push(m); return ''; });

  const tone1Parts = [];
  rest = rest.replace(strokeRE, (m) => { tone1Parts.push(m); return ''; });

  if (tone1Parts.length === 0 && tone2Parts.length === 0) {
    return { tone1: sanitizeStrokeInner(inner), tone2: '' };
  }

  tone1 = sanitizeStrokeInner(tone1Parts.join('\n'));
  tone2 = sanitizeFilledInner(tone2Parts.join('\n')).replace(/\sstroke=(["'])(?:(?!\1).)*\1/gi, '');
  return { tone1, tone2 };
}

// --- Svelte template -------------------------------------------------------
function wrapSvelte({ strokeInner, filledInner, duoTone1, duoTone2, hasStroke, hasFilled, hasDuotone }) {
  return `<!-- AUTO-GENERATED. Do not edit by hand. -->
<script lang="ts">
  export let size: number | string = 24;
  /** If not provided, uses var(--cl-icon-stroke) so HC mode can thicken automatically */
  export let strokeWidth: number | string | undefined = undefined;

  export let variant: 'stroke' | 'filled' | 'duotone' | 'animated' = 'stroke';

  export let role: 'default' | 'muted' | 'primary' | 'success' | 'warning' | 'error' = 'default';
  /** Used for duotone secondary layer; defaults to 'muted' */
  export let secondaryRole: 'default' | 'muted' | 'primary' | 'success' | 'warning' | 'error' = 'muted';

  export let className: string = '';
  export let ariaLabel: string = 'icon';
  export let title: string | undefined = undefined;

  const colorByRole = {
    default: 'var(--cl-icon)',
    muted: 'var(--cl-icon-muted)',
    primary: 'var(--cl-icon-primary)',
    success: 'var(--cl-icon-success)',
    warning: 'var(--cl-icon-warning)',
    error: 'var(--cl-icon-error)'
  } as const;

  $: effectiveStrokeWidth = strokeWidth ?? 'var(--cl-icon-stroke)';
</script>

<svg
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 24 24"
  width={size}
  height={size}
  fill="none"
  stroke="currentColor"
  stroke-width={effectiveStrokeWidth}
  stroke-linecap="round"
  stroke-linejoin="round"
  aria-label={ariaLabel}
  role="img"
  class={className}
  style="color: {colorByRole[role]}"
  {...$$restProps}
>
  {#if title}<title>{title}</title>{/if}

  {#if variant === 'filled' && ${hasFilled ? 'true' : 'false'}}
    <g fill="currentColor" stroke="none">
      ${filledInner}
    </g>

  {:else if variant === 'duotone' && ${hasDuotone ? 'true' : 'false'}}
    <g class="tone1" style="color:{colorByRole[role]}">
      ${duoTone1}
    </g>
    {#if ${Boolean(duoTone2 && duoTone2.trim()).toString()}}
      <g class="tone2" style="color:{colorByRole[secondaryRole]}">
        <g fill="currentColor" stroke="none">
          ${duoTone2}
        </g>
      </g>
    {/if}

  {:else}
    <!-- Stroke (default/fallback) -->
    ${strokeInner}
  {/if}
</svg>
`;
}

// --- Main ------------------------------------------------------------------
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
      // For now, animated uses stroke geometry; animations handled by app CSS
      entry.animated = sanitizeStrokeInner(innerRaw);
    } else {
      entry.stroke = sanitizeStrokeInner(innerRaw);
    }
  }

  const imports = [];
  const exports = [];
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

    imports.push(`import ${Comp} from './components/${Comp}.svelte';`);
    exports.push(Comp);
    registry.push(`  "${base}": ${Comp}`);
  }

  const index = `// AUTO-GENERATED. Do not edit by hand.
${imports.join('\n')}

export { ${exports.join(', ')} };

export const iconRegistry = {
${registry.join(',\n')}
} as const;

export type IconName = keyof typeof iconRegistry;
`;
  await fs.writeFile(INDEX_TS, index, 'utf8');

  console.log(`✅ Built ${map.size} icons → components (+ registry).`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});



