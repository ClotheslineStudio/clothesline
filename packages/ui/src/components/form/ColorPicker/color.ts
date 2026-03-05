export type OklchColor = {
  l: number;
  c: number;
  h: number;
  a: number;
};

export type RgbColor = {
  r: number;
  g: number;
  b: number;
  a: number;
};

export type HslColor = {
  h: number;
  s: number;
  l: number;
  a: number;
};

const DEFAULT_OKLCH: OklchColor = { l: 0.64, c: 0.18, h: 270, a: 1 };

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function normalizeHue(h: number) {
  const hue = h % 360;
  return hue < 0 ? hue + 360 : hue;
}

function srgbToLinear(v: number) {
  return v <= 0.04045 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
}

function linearToSrgb(v: number) {
  if (v <= 0.0031308) return 12.92 * v;
  return 1.055 * Math.pow(v, 1 / 2.4) - 0.055;
}

export function srgbToOklch(r: number, g: number, b: number, a = 1): OklchColor {
  const lr = srgbToLinear(r);
  const lg = srgbToLinear(g);
  const lb = srgbToLinear(b);

  const l = Math.cbrt(0.4122214708 * lr + 0.5363325363 * lg + 0.0514459929 * lb);
  const m = Math.cbrt(0.2119034982 * lr + 0.6806995451 * lg + 0.1073969566 * lb);
  const s = Math.cbrt(0.0883024619 * lr + 0.2817188376 * lg + 0.6299787005 * lb);

  const L = 0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s;
  const A = 1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s;
  const B = 0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s;

  return {
    l: clamp(L, 0, 1),
    c: Math.max(0, Math.sqrt(A * A + B * B)),
    h: normalizeHue((Math.atan2(B, A) * 180) / Math.PI),
    a: clamp(a, 0, 1)
  };
}

export function oklchToSrgb(color: OklchColor) {
  const hRad = (normalizeHue(color.h) * Math.PI) / 180;
  const A = color.c * Math.cos(hRad);
  const B = color.c * Math.sin(hRad);

  const l = color.l + 0.3963377774 * A + 0.2158037573 * B;
  const m = color.l - 0.1055613458 * A - 0.0638541728 * B;
  const s = color.l - 0.0894841775 * A - 1.291485548 * B;

  const l3 = l * l * l;
  const m3 = m * m * m;
  const s3 = s * s * s;

  const rLin = 4.0767416621 * l3 - 3.3077115913 * m3 + 0.2309699292 * s3;
  const gLin = -1.2684380046 * l3 + 2.6097574011 * m3 - 0.3413193965 * s3;
  const bLin = -0.0041960863 * l3 - 0.7034186147 * m3 + 1.707614701 * s3;

  return {
    r: clamp(linearToSrgb(rLin), 0, 1),
    g: clamp(linearToSrgb(gLin), 0, 1),
    b: clamp(linearToSrgb(bLin), 0, 1),
    a: clamp(color.a, 0, 1)
  };
}

function componentToHex(value: number) {
  const clamped = Math.round(clamp(value, 0, 1) * 255);
  return clamped.toString(16).padStart(2, '0');
}

export function oklchToHex(color: OklchColor, includeAlpha = false) {
  const srgb = oklchToSrgb(color);
  const hex =
    `#${componentToHex(srgb.r)}${componentToHex(srgb.g)}${componentToHex(srgb.b)}` +
    (includeAlpha || srgb.a < 1 ? componentToHex(srgb.a) : '');
  return hex.toUpperCase();
}

export function oklchToRgb255(color: OklchColor): RgbColor {
  const srgb = oklchToSrgb(color);
  return {
    r: Math.round(srgb.r * 255),
    g: Math.round(srgb.g * 255),
    b: Math.round(srgb.b * 255),
    a: clamp(srgb.a, 0, 1)
  };
}

export function rgb255ToOklch(color: RgbColor): OklchColor {
  return srgbToOklch(
    clamp(color.r / 255, 0, 1),
    clamp(color.g / 255, 0, 1),
    clamp(color.b / 255, 0, 1),
    clamp(color.a, 0, 1)
  );
}

function srgbToHsl(r: number, g: number, b: number): { h: number; s: number; l: number } {
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2;
  if (max === min) return { h: 0, s: 0, l };

  const d = max - min;
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  let h = 0;
  if (max === r) h = (g - b) / d + (g < b ? 6 : 0);
  else if (max === g) h = (b - r) / d + 2;
  else h = (r - g) / d + 4;
  h /= 6;
  return { h: h * 360, s, l };
}

function hue2rgb(p: number, q: number, t: number) {
  let x = t;
  if (x < 0) x += 1;
  if (x > 1) x -= 1;
  if (x < 1 / 6) return p + (q - p) * 6 * x;
  if (x < 1 / 2) return q;
  if (x < 2 / 3) return p + (q - p) * (2 / 3 - x) * 6;
  return p;
}

function hslToSrgb(h: number, s: number, l: number) {
  const hh = normalizeHue(h) / 360;
  const ss = clamp(s, 0, 1);
  const ll = clamp(l, 0, 1);
  if (ss === 0) return { r: ll, g: ll, b: ll };

  const q = ll < 0.5 ? ll * (1 + ss) : ll + ss - ll * ss;
  const p = 2 * ll - q;
  return {
    r: hue2rgb(p, q, hh + 1 / 3),
    g: hue2rgb(p, q, hh),
    b: hue2rgb(p, q, hh - 1 / 3)
  };
}

export function oklchToHsl(color: OklchColor): HslColor {
  const srgb = oklchToSrgb(color);
  const hsl = srgbToHsl(srgb.r, srgb.g, srgb.b);
  return { h: normalizeHue(hsl.h), s: clamp(hsl.s, 0, 1), l: clamp(hsl.l, 0, 1), a: clamp(srgb.a, 0, 1) };
}

export function hslToOklch(color: HslColor): OklchColor {
  const srgb = hslToSrgb(color.h, color.s, color.l);
  return srgbToOklch(srgb.r, srgb.g, srgb.b, clamp(color.a, 0, 1));
}

function parseOklchString(input: string): OklchColor | null {
  const trimmed = input.trim();
  const match = trimmed.match(
    /^oklch\(\s*([0-9.]+%?)\s+([0-9.]+)\s+([0-9.]+)(?:deg)?(?:\s*\/\s*([0-9.]+%?))?\s*\)$/i
  );
  if (!match) return null;

  const lRaw = match[1];
  const cRaw = Number(match[2]);
  const hRaw = Number(match[3]);
  const aRaw = match[4];

  const l = lRaw.endsWith('%') ? Number(lRaw.slice(0, -1)) / 100 : Number(lRaw);
  const a = aRaw
    ? aRaw.endsWith('%')
      ? Number(aRaw.slice(0, -1)) / 100
      : Number(aRaw)
    : 1;

  if (
    Number.isNaN(l) ||
    Number.isNaN(cRaw) ||
    Number.isNaN(hRaw) ||
    Number.isNaN(a) ||
    !Number.isFinite(l) ||
    !Number.isFinite(cRaw) ||
    !Number.isFinite(hRaw) ||
    !Number.isFinite(a)
  ) {
    return null;
  }

  return {
    l: clamp(l, 0, 1),
    c: Math.max(0, cRaw),
    h: normalizeHue(hRaw),
    a: clamp(a, 0, 1)
  };
}

function parseHex(input: string) {
  const hex = input.trim().replace('#', '');
  if (![3, 4, 6, 8].includes(hex.length)) return null;

  const expanded =
    hex.length === 3 || hex.length === 4
      ? hex
          .split('')
          .map((ch) => ch + ch)
          .join('')
      : hex;

  const withAlpha = expanded.length === 6 ? `${expanded}ff` : expanded;
  const value = Number.parseInt(withAlpha, 16);
  if (Number.isNaN(value)) return null;

  return {
    r: ((value >> 24) & 255) / 255,
    g: ((value >> 16) & 255) / 255,
    b: ((value >> 8) & 255) / 255,
    a: (value & 255) / 255
  };
}

function parseRgbString(input: string) {
  const match = input
    .trim()
    .match(/^rgba?\(\s*([0-9.]+)\s*[, ]\s*([0-9.]+)\s*[, ]\s*([0-9.]+)(?:\s*[,/]\s*([0-9.]+))?\s*\)$/i);
  if (!match) return null;

  const r = Number(match[1]);
  const g = Number(match[2]);
  const b = Number(match[3]);
  const a = match[4] !== undefined ? Number(match[4]) : 1;
  if ([r, g, b, a].some((n) => Number.isNaN(n) || !Number.isFinite(n))) return null;

  return {
    r: clamp(r / 255, 0, 1),
    g: clamp(g / 255, 0, 1),
    b: clamp(b / 255, 0, 1),
    a: clamp(a, 0, 1)
  };
}

export function colorStringToOklch(input: string | undefined | null): OklchColor {
  if (!input) return { ...DEFAULT_OKLCH };

  const fromOklch = parseOklchString(input);
  if (fromOklch) return fromOklch;

  const fromHex = parseHex(input);
  if (fromHex) return srgbToOklch(fromHex.r, fromHex.g, fromHex.b, fromHex.a);

  const fromRgb = parseRgbString(input);
  if (fromRgb) return srgbToOklch(fromRgb.r, fromRgb.g, fromRgb.b, fromRgb.a);

  return { ...DEFAULT_OKLCH };
}

export function oklchToCss(color: OklchColor) {
  const l = clamp(color.l, 0, 1);
  const c = Math.max(0, color.c);
  const h = normalizeHue(color.h);
  const a = clamp(color.a, 0, 1);
  return a < 1
    ? `oklch(${l.toFixed(4)} ${c.toFixed(4)} ${h.toFixed(2)} / ${a.toFixed(3)})`
    : `oklch(${l.toFixed(4)} ${c.toFixed(4)} ${h.toFixed(2)})`;
}

