import type { ThemeDraft } from './types';
import { BUILTIN_ROLES } from './types';

export const defaultThemeDraft: ThemeDraft = {
  name: 'studio-custom',
  seeds: {
    primary: { l: 0.64, c: 0.18, h: 252 },
    secondary: { l: 0.66, c: 0.14, h: 198 },
    tertiary: { l: 0.67, c: 0.12, h: 282 },
    accent: { l: 0.7, c: 0.2, h: 330 },
    success: { l: 0.72, c: 0.16, h: 152 },
    warning: { l: 0.8, c: 0.14, h: 92 },
    error: { l: 0.62, c: 0.2, h: 24 },
    info: { l: 0.7, c: 0.16, h: 236 },
    neutral: { l: 0.62, c: 0.03, h: 250 }
  },
  roleOrder: [...BUILTIN_ROLES],
  rampSteps: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950],
  backgrounds: {
    bodyLight: 'surface-100',
    bodyDark: 'surface-950',
    panelLight: 'surface-50',
    panelDark: 'surface-900'
  },
  spacing: {
    scale: 'base'
  },
  edges: {
    radiusBase: '10',
    ringWidth: '2'
  },
  typography: {
    scale: '1.25',
    fontFamily: 'system-ui, sans-serif'
  }
};
