import { browser } from '$app/environment';

import type { AccessibilityMetrics, RampColors, TonalPairResult } from './types';

type RGB = { r: number; g: number; b: number };

const fallbackMetrics: AccessibilityMetrics = {
  score: 0,
  pairResults: [],
  badges: {
    aaBody: { pass: 0, total: 0 },
    aaLarge: { pass: 0, total: 0 },
    aaaBody: { pass: 0, total: 0 },
    aaaLarge: { pass: 0, total: 0 },
    tonalPairs: { count: 0 },
    cbAlerts: { count: 0 }
  }
};

let scratchEl: HTMLSpanElement | null = null;

function ensureScratch(): HTMLSpanElement | null {
  if (!browser) return null;
  if (scratchEl) return scratchEl;

  const el = document.createElement('span');
  el.style.position = 'absolute';
  el.style.left = '-9999px';
  el.style.top = '-9999px';
  el.style.visibility = 'hidden';
  document.body.appendChild(el);
  scratchEl = el;
  return scratchEl;
}

function parseRgbString(rgb: string): RGB | null {
  const parts = rgb.match(/\d+(?:\.\d+)?/g);
  if (!parts || parts.length < 3) return null;
  return {
    r: Number(parts[0]),
    g: Number(parts[1]),
    b: Number(parts[2])
  };
}

function colorToRgb(color: string): RGB | null {
  const el = ensureScratch();
  if (!el) return null;

  el.style.color = color;
  const computed = getComputedStyle(el).color;
  return parseRgbString(computed);
}

function toLinearChannel(value: number): number {
  const normalized = value / 255;
  if (normalized <= 0.03928) return normalized / 12.92;
  return ((normalized + 0.055) / 1.055) ** 2.4;
}

function relativeLuminance(rgb: RGB): number {
  const r = toLinearChannel(rgb.r);
  const g = toLinearChannel(rgb.g);
  const b = toLinearChannel(rgb.b);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function contrastRatio(foreground: string, background: string): number {
  const fg = colorToRgb(foreground);
  const bg = colorToRgb(background);
  if (!fg || !bg) return 1;

  const l1 = relativeLuminance(fg);
  const l2 = relativeLuminance(bg);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

function bestTextOn(background: string): string {
  const whiteRatio = contrastRatio('#ffffff', background);
  const blackRatio = contrastRatio('#111111', background);
  return whiteRatio >= blackRatio ? '#ffffff' : '#111111';
}

function createPair(name: string, foreground: string, background: string): TonalPairResult {
  return {
    name,
    foreground,
    background,
    ratio: contrastRatio(foreground, background)
  };
}

function passCount(pairs: TonalPairResult[], threshold: number): number {
  return pairs.filter((pair) => pair.ratio >= threshold).length;
}

export function computeAccessibilityMetrics(ramps: RampColors): AccessibilityMetrics {
  if (!browser) return fallbackMetrics;

  const primaryRole = ramps.primary ? 'primary' : (Object.keys(ramps)[0] ?? 'primary');
  const secondaryRole = ramps.secondary ? 'secondary' : (Object.keys(ramps)[1] ?? primaryRole);
  const accentRole = ramps.accent ? 'accent' : (Object.keys(ramps)[2] ?? primaryRole);
  const neutralRole = ramps.neutral ? 'neutral' : primaryRole;

  const surface = ramps[neutralRole]?.[100] ?? ramps[neutralRole]?.[50] ?? '#f5f7fb';
  const background = ramps[neutralRole]?.[50] ?? ramps[neutralRole]?.[100] ?? '#ffffff';
  const bodyText = ramps[neutralRole]?.[900] ?? '#111111';
  const primary = ramps[primaryRole]?.[500] ?? '#3b82f6';
  const secondary = ramps[secondaryRole]?.[500] ?? '#64748b';
  const accent = ramps[accentRole]?.[500] ?? '#8b5cf6';

  const pairs: TonalPairResult[] = [
    createPair('Text on surface', bodyText, surface),
    createPair('Text on primary', bestTextOn(primary), primary),
    createPair('Text on secondary', bestTextOn(secondary), secondary),
    createPair('Text on accent', bestTextOn(accent), accent),
    createPair('Surface on background', surface, background)
  ];

  const total = pairs.length;
  const aaBodyPass = passCount(pairs, 4.5);
  const aaLargePass = passCount(pairs, 3);
  const aaaBodyPass = passCount(pairs, 7);
  const aaaLargePass = passCount(pairs, 4.5);
  const allChecks = total * 4;
  const score = Math.round(((aaBodyPass + aaLargePass + aaaBodyPass + aaaLargePass) / allChecks) * 100);

  return {
    score,
    pairResults: pairs,
    badges: {
      aaBody: { pass: aaBodyPass, total },
      aaLarge: { pass: aaLargePass, total },
      aaaBody: { pass: aaaBodyPass, total },
      aaaLarge: { pass: aaaLargePass, total },
      tonalPairs: { count: total },
      cbAlerts: { count: 0 }
    }
  };
}
