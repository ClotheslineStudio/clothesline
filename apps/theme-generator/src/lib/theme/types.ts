export const BUILTIN_ROLES = [
  'primary',
  'secondary',
  'tertiary',
  'accent',
  'success',
  'warning',
  'error',
  'info',
  'neutral'
] as const;

export type BuiltinRole = (typeof BUILTIN_ROLES)[number];
export type Role = string;

export const DEFAULT_RAMP_STEPS = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950] as const;
export type RampStep = (typeof DEFAULT_RAMP_STEPS)[number];

export type OklchSeed = {
  l: number;
  c: number;
  h: number;
};

export type ThemeDraft = {
  name: string;
  seeds: Record<string, OklchSeed>;
  roleOrder: string[];
  rampSteps: number[];
  backgrounds: Record<string, string>;
  spacing: Record<string, string>;
  edges: Record<string, string>;
  typography: Record<string, string>;
};

export type RampColors = Record<string, Record<number, string>>;

export type GeneratedTheme = {
  rampColors: RampColors;
  previewVars: Record<string, string>;
  cssText: string;
  tsSnippet: string;
};

export type TonalPairResult = {
  name: string;
  foreground: string;
  background: string;
  ratio: number;
};

export type AccessibilityMetrics = {
  score: number;
  pairResults: TonalPairResult[];
  badges: {
    aaBody: { pass: number; total: number };
    aaLarge: { pass: number; total: number };
    aaaBody: { pass: number; total: number };
    aaaLarge: { pass: number; total: number };
    tonalPairs: { count: number };
    cbAlerts: { count: number };
  };
};
