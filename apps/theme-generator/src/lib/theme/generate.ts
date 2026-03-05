import { colorShades, generateColorRampFromSeed } from '@clothesline/tokens/colors';

import type { GeneratedTheme, RampColors, Role, ThemeDraft } from './types';

type Step = (typeof colorShades)[number];

function slugifyThemeName(name: string): string {
  return (
    name
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '') || 'custom-theme'
  );
}

function roleList(draft: ThemeDraft): Role[] {
  const seedKeys = Object.keys(draft.seeds);
  return [...draft.roleOrder, ...seedKeys].filter((role, idx, arr) => arr.indexOf(role) === idx && Boolean(draft.seeds[role]));
}

function toOklchPercent(color: string): number {
  const match = color.match(/oklch\(([0-9.]+)%/i);
  if (!match) return 50;
  return Number(match[1]);
}

function pickContrastShades(ramp: Record<number, string>): { light: number; dark: number } {
  let light = 50;
  let dark = 950;
  let maxL = -1;
  let minL = 200;

  for (const shade of colorShades) {
    const color = ramp[shade];
    if (!color) continue;
    const lightness = toOklchPercent(color);
    if (lightness > maxL) {
      maxL = lightness;
      light = shade;
    }
    if (lightness < minL) {
      minL = lightness;
      dark = shade;
    }
  }

  return { light, dark };
}

function buildRampColors(draft: ThemeDraft): RampColors {
  const ramps: RampColors = {};
  const stepSet = new Set(draft.rampSteps);
  const roles = roleList(draft);

  for (const role of roles) {
    const seed = draft.seeds[role];
    if (!seed) continue;

    const generated = generateColorRampFromSeed({
      mode: 'oklch',
      l: seed.l,
      c: seed.c,
      h: seed.h
    });

    const roleRamp: Record<number, string> = {};
    for (const step of colorShades) {
      const key = Number(step);
      if (stepSet.size > 0 && !stepSet.has(key)) continue;
      roleRamp[key] = generated[step] ?? generated[500 as Step];
    }
    ramps[role] = roleRamp;
  }

  if (!ramps.surface && ramps.neutral) {
    ramps.surface = { ...ramps.neutral };
  }

  return ramps;
}

function seedObjectText(draft: ThemeDraft): string {
  return roleList(draft)
    .map((role) => {
      const seed = draft.seeds[role];
      return `    ${role}: { l: ${seed.l.toFixed(3)}, c: ${seed.c.toFixed(3)}, h: ${seed.h.toFixed(1)} }`;
    })
    .join(',\n');
}

function tokenToColorRef(token: string | undefined, fallback: string): string {
  const value = (token ?? fallback).trim();
  const match = value.match(/^([a-z-]+)-(\d{2,3})$/i);
  if (!match) return value;

  const role = match[1] === 'surface' ? 'surface' : match[1];
  const step = match[2];
  return `var(--color-${role}-${step})`;
}

function tokenToSpacingRef(token: string | undefined, fallback: string): string {
  const value = (token ?? fallback).trim();
  if (value.startsWith('--')) return `var(${value})`;
  if (/^[a-z-]+\d*$/i.test(value)) return `var(--${value})`;
  return value;
}

function buildPreviewVars(draft: ThemeDraft): Record<string, string> {
  const radiusBase = Number(draft.edges.radiusBase ?? '10');
  const ringWidth = Number(draft.edges.ringWidth ?? '2');
  const safeRadius = Number.isFinite(radiusBase) ? radiusBase : 10;
  const safeRing = Number.isFinite(ringWidth) ? ringWidth : 2;
  const spacingScale = draft.spacing.scale ?? 'base';
  const fontScale = draft.typography.scale ?? '1.25';

  const previewGap =
    spacingScale === 'tight' ? '0.65rem' : spacingScale === 'loose' ? '1.15rem' : '0.9rem';

  return {
    '--base-font-color': 'var(--color-surface-950)',
    '--base-font-color-dark': 'var(--color-surface-50)',
    '--base-font-family': draft.typography.fontFamily ?? 'system-ui, sans-serif',
    '--base-font-size': 'var(--type-body-size)',
    '--base-line-height': 'var(--type-body-leading)',
    '--base-font-weight': 'var(--type-body-weight)',
    '--base-letter-spacing': 'var(--type-body-tracking)',
    '--heading-font-color': 'var(--color-surface-950)',
    '--heading-font-color-dark': 'var(--color-surface-50)',
    '--heading-font-family': 'var(--type-heading-family)',
    '--heading-font-weight': 'var(--type-heading-weight)',
    '--heading-letter-spacing': 'var(--type-heading-tracking)',
    '--anchor-font-color': 'var(--anchor-color)',
    '--anchor-font-color-dark': 'var(--anchor-color)',
    '--anchor-text-decoration': 'var(--anchor-decoration)',
    '--anchor-text-decoration-hover': 'var(--anchor-decoration-hover)',
    '--anchor-text-decoration-focus': 'var(--anchor-decoration-hover)',
    '--spacing': tokenToSpacingRef(
      draft.spacing.scale === 'tight' ? 'spacing-3' : draft.spacing.scale === 'loose' ? 'spacing-5' : 'spacing-4',
      'spacing-4'
    ),
    '--radius-base': `${safeRadius}px`,
    '--radius-container': `${safeRadius + 4}px`,
    '--default-border-width': 'var(--border-width-default)',
    '--default-divide-width': 'var(--border-width-divider)',
    '--default-ring-width': `${safeRing}px`,
    '--body-background-color': tokenToColorRef(draft.backgrounds.bodyLight, 'surface-100'),
    '--body-background-color-dark': tokenToColorRef(draft.backgrounds.bodyDark, 'surface-950'),
    '--background-app-light': tokenToColorRef(draft.backgrounds.bodyLight, 'surface-100'),
    '--background-app-dark': tokenToColorRef(draft.backgrounds.bodyDark, 'surface-950'),
    '--background-panel-light': tokenToColorRef(draft.backgrounds.panelLight, 'surface-50'),
    '--background-panel-dark': tokenToColorRef(draft.backgrounds.panelDark, 'surface-900'),
    '--radius-sm': `${Math.max(2, safeRadius - 4)}px`,
    '--radius-md': `${Math.max(4, safeRadius - 2)}px`,
    '--radius-lg': `${safeRadius}px`,
    '--radius-xl': `${safeRadius + 4}px`,
    '--radius-card': `${safeRadius}px`,
    '--radius-interactive': `${Math.max(4, safeRadius - 2)}px`,
    '--button-radius': `${Math.max(4, safeRadius - 2)}px`,
    '--radius-avatar': '9999px',
    '--button-focus-ring-width': `${safeRing}px`,
    '--text-scaling': fontScale,
    '--tg-preview-gap': previewGap,
    '--tg-preview-font-scale': fontScale
  };
}

function buildCssText(draft: ThemeDraft, rampColors: RampColors): string {
  const slug = slugifyThemeName(draft.name);
  const previewVars = buildPreviewVars(draft);
  const roles = roleList(draft);
  if (!roles.includes('surface') && rampColors.surface) roles.push('surface');

  const lines: string[] = [];
  const relLines: string[] = [];

  lines.push(`html[data-theme='${slug}'] {`);
  lines.push('');
  lines.push('  /* ========================================');
  lines.push('     FOUNDATION (PER THEME)');
  lines.push('  ======================================== */');
  for (const [name, value] of Object.entries(previewVars)) {
    lines.push(`  ${name}: ${value};`);
  }
  lines.push('');
  lines.push('');
  lines.push('  /* ========================================');
  lines.push('     COLOR RAMPS');
  lines.push('  ======================================== */');

  for (const role of roles) {
    const ramp = rampColors[role];
    if (!ramp) continue;

    const picks = pickContrastShades(ramp);
    lines.push(`  --color-${role}-contrast-light: var(--color-${role}-${picks.light}-vis);`);
    lines.push(`  --color-${role}-contrast-dark: var(--color-${role}-${picks.dark}-vis);`);
    lines.push('');

    for (const step of colorShades) {
      const color = ramp[step];
      if (!color) continue;
      lines.push(`  --color-${role}-${step}: ${color};`);
      lines.push(
        `  --color-${role}-${step}-ct: color-mix(in oklab, var(--color-${role}-${step}) calc(100% - var(--k-ct)), var(--ct-pole) var(--k-ct));`
      );
      lines.push(`  --color-${role}-${step}-vis: var(--color-${role}-${step}-ct);`);
      relLines.push(`  --color-${role}-${step}-vis: oklch(from var(--color-${role}-${step}-ct) l c h);`);
    }
    lines.push('');
  }

  if (relLines.length) {
    lines.push('@supports (color: oklch(from white l c h)) {');
    for (const line of relLines) lines.push(`  ${line}`);
    lines.push('}');
  }

  lines.push('');
  lines.push('}');
  return `${lines.join('\n')}\n`;
}

function buildTypeSnippet(draft: ThemeDraft): string {
  const roleOrder = roleList(draft);
  return `import { defineTheme } from '@clothesline/themes';\n\nexport default defineTheme({\n  name: '${slugifyThemeName(draft.name)}',\n  seeds: {\n${seedObjectText(draft)}\n  },\n  roleOrder: ${JSON.stringify(roleOrder, null, 2).replace(/\n/g, '\n  ')},\n  backgrounds: ${JSON.stringify(draft.backgrounds, null, 2).replace(/\n/g, '\n  ')},\n  spacing: ${JSON.stringify(draft.spacing, null, 2).replace(/\n/g, '\n  ')},\n  edges: ${JSON.stringify(draft.edges, null, 2).replace(/\n/g, '\n  ')},\n  typography: ${JSON.stringify(draft.typography, null, 2).replace(/\n/g, '\n  ')}\n});\n`;
}

export function generateThemeArtifacts(draft: ThemeDraft): GeneratedTheme {
  const rampColors = buildRampColors(draft);
  const previewVars = buildPreviewVars(draft);
  const cssText = buildCssText(draft, rampColors);
  const tsSnippet = buildTypeSnippet(draft);

  return { rampColors, previewVars, cssText, tsSnippet };
}
