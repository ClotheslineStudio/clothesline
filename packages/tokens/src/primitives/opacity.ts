/**
 * Opacity tokens for the Clothesline UI system.
 * opacityScale = atomic values (raw numbers)
 * opacitySemantic = semantic names → scale keys
 */

export type OpacityScaleKey =
  | '0'
  | '5'
  | '10'
  | '20'
  | '30'
  | '40'
  | '50'
  | '60'
  | '70'
  | '80'
  | '90'
  | '100'
  | 'hover'
  | 'focus'
  | 'active'
  | 'pressed'
  | 'drag'
  | 'disabled'
  | 'disabledContainer'
  | 'divider'
  | 'border'
  | 'shadow'
  | 'surfaceRaised'
  | 'surfaceOverlay'
  | 'surfaceMuted'
  | 'scrim1'
  | 'scrim2'
  | 'scrim3'
  | 'backdrop';

export const opacityScale: Record<OpacityScaleKey, string> = {
  '0': '0',
  '5': '0.05',
  '10': '0.10',
  '20': '0.20',
  '30': '0.30',
  '40': '0.40',
  '50': '0.50',
  '60': '0.60',
  '70': '0.70',
  '80': '0.80',
  '90': '0.90',
  '100': '1',

  hover: '0.08',
  focus: '0.12',
  active: '0.16',
  pressed: '0.18',
  drag: '0.24',

  disabled: '0.38',
  disabledContainer: '0.12',

  divider: '0.12',
  border: '0.15',
  shadow: '0.18',

  surfaceRaised: '0.04',
  surfaceOverlay: '0.08',
  surfaceMuted: '0.12',

  scrim1: '0.20',
  scrim2: '0.32',
  scrim3: '0.46',
  backdrop: '0.60',
};

export type OpacitySemanticKey =
  | 'interactive-hover'
  | 'interactive-focus'
  | 'interactive-active'
  | 'interactive-pressed'
  | 'interactive-drag'
  | 'disabled'
  | 'disabled-container'
  | 'surface-raised'
  | 'surface-overlay'
  | 'surface-muted'
  | 'scrim-light'
  | 'scrim-medium'
  | 'scrim-strong'
  | 'backdrop';

export const opacitySemantic: Record<OpacitySemanticKey, OpacityScaleKey> = {
  'interactive-hover': 'hover',
  'interactive-focus': 'focus',
  'interactive-active': 'active',
  'interactive-pressed': 'pressed',
  'interactive-drag': 'drag',
  disabled: 'disabled',
  'disabled-container': 'disabledContainer',

  'surface-raised': 'surfaceRaised',
  'surface-overlay': 'surfaceOverlay',
  'surface-muted': 'surfaceMuted',

  'scrim-light': 'scrim1',
  'scrim-medium': 'scrim2',
  'scrim-strong': 'scrim3',
  backdrop: 'backdrop',
};

export const opacityTokens = {
  scale: opacityScale,
  semantic: opacitySemantic,
};


