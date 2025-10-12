import { writable, derived } from 'svelte/store';

// helpers
const clamp = (n: number, min: number, max: number) => Math.min(Math.max(n, min), max);
const round = (n: number, d = 2) => Math.round(n * 10 ** d) / 10 ** d;
const oklch = (l: number, c: number, h: number) => `oklch(${round(l, 3)}% ${round(c, 4)} ${round(h, 2)}deg)`;
const onColorFor = (l: number) => (l < 55 ? 'oklch(20% 0 0deg)' : 'oklch(98% 0 0deg)');

// ramp builder (matches the canvas logic)
export function buildRamp(params: { hue: number; chroma: number; mode: 'light' | 'dark'; contrast: number }) {
  const { hue, chroma, mode, contrast } = params;
  const base = [98,95,90,83,75,66,56,46,36,26];
  const dark = [12,16,22,30,40,50,60,70,80,88];
  const Ls = mode === 'dark' ? dark : base;
  const contrasted = Ls.map((L, i) => {
    const k = (contrast - 1) * 22;
    const adj = i < 5 ? L - k : L + k;
    return clamp(adj, 6, 99);
  });
  const Cs = contrasted.map((_, i) => {
    const t = i / 9;
    const falloff = 1 - Math.abs(t - 0.5) * 1.1;
    return round(chroma * clamp(falloff, 0.45, 1));
  });
  const steps = [50,100,200,300,400,500,600,700,800,900];
  return steps.map((lev, i) => ({ level: lev, l: contrasted[i], val: oklch(contrasted[i], Cs[i], hue) }));
}

export const roles = ['primary','secondary','accent','neutral','surface','success','warning','error'] as const;
export type RoleKey = typeof roles[number];

export const theme = writable({
  name: 'Clothesline',
  mode: 'light' as 'light' | 'dark',
  contrast: 1.0,
  seeds: {
    primary:   { hue: 252, chroma: 0.13 },
    secondary: { hue: 200, chroma: 0.10 },
    accent:    { hue: 310, chroma: 0.14 },
    neutral:   { hue: 250, chroma: 0.03 },
    surface:   { hue: 240, chroma: 0.01 },
    success:   { hue: 150, chroma: 0.10 },
    warning:   { hue: 70,  chroma: 0.11 },
    error:     { hue: 15,  chroma: 0.11 }
  }
});

export const system = writable({
  // typography
  fontStack: 'Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Arial',
  baseFontPx: 16,
  typeRatio: 1.25,
  // spacing
  spaceBase: 4,
  spaceSteps: 10,
  // radii
  radiusBase: 8,
  radiusScale: 1.25
});

export const ramps = derived(theme, ($t) => {
  const out: Record<RoleKey, {level:number; l:number; val:string}[]> = {} as Record<RoleKey, {level:number; l:number; val:string}[]>;
  [...roles].forEach((r) => {
    const { hue, chroma } = $t.seeds[r];
    out[r] = buildRamp({ hue, chroma, mode: $t.mode, contrast: $t.contrast });
  });
  return out;
});

// CSS var emission for the preview scope
export const cssVars = derived([theme, system, ramps], ([$t, $s, $ramps]) => {
  const vars: Record<string, string | number> = {
    '--contrast-factor': String($t.contrast),
    '--font-family': $s.fontStack,
    '--fs-base': `${$s.baseFontPx}px`,
    '--lh-tight': 1.2, '--lh-normal': 1.5, '--lh-relaxed': 1.7
  };

  // type scale
  const up = (n: number) => $s.baseFontPx * $s.typeRatio ** n;
  const dn = (n: number) => $s.baseFontPx / $s.typeRatio ** n;
  Object.assign(vars, {
    '--fs-xs': `${round(dn(2),2)}px`,
    '--fs-sm': `${round(dn(1),2)}px`,
    '--fs-lg': `${round(up(1),2)}px`,
    '--fs-xl': `${round(up(2),2)}px`,
    '--fs-2xl': `${round(up(3),2)}px`,
  });

  // spacing
  for (let i = 0; i <= $s.spaceSteps; i++) {
    vars[`--space-${i}`] = `${round($s.spaceBase * i,2)}px`;
  }
  vars['--pad-card'] = 'var(--space-4)';
  vars['--pad-page'] = 'var(--space-6)';

  // radii
  const sm = round($s.radiusBase / $s.radiusScale, 2);
  const md = round($s.radiusBase, 2);
  const lg = round($s.radiusBase * $s.radiusScale, 2);
  const xl = round(lg * $s.radiusScale, 2);
  const x2 = round(xl * $s.radiusScale, 2);
  Object.assign(vars, {
    '--radius-sm': `${sm}px`,
    '--radius-md': `${md}px`,
    '--radius-lg': `${lg}px`,
    '--radius-xl': `${xl}px`,
    '--radius-2xl': `${x2}px`,
    '--radius-full': '9999px'
  });

  // colors
  [...roles].forEach((rk) => {
    $ramps[rk].forEach(({ level, l, val }) => {
      vars[`--color-${rk}-${level}`] = val;
      vars[`--on-${rk}-${level}`]   = onColorFor(l);
    });
    const mid = $ramps[rk][5];
    vars[`--${rk}`] = mid.val;
    vars[`--on-${rk}`] = onColorFor(mid.l);
  });

  // surface shorthands
  vars['--color-surface-50']  = $ramps.surface[0].val;
  vars['--color-surface-100'] = $ramps.surface[1].val;
  vars['--on-surface-50']     = onColorFor($ramps.surface[0].l);
  vars['--on-surface-100']    = onColorFor($ramps.surface[1].l);

  return vars;
});
