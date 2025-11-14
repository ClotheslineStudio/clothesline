/**
 * Z-index tokens for the Clothesline UI system.
 * zIndexScale = raw atomic stacking values
 * zIndexSemantic = usage-based mapping (names → scale keys)
 */

export type ZIndexScaleKey =
  | '0'
  | '1'
  | '10'
  | '50'
  | '100'
  | '200'
  | '500'
  | '1000'
  | '2000'
  | '5000'
  | 'max';

export const zIndexScale: Record<ZIndexScaleKey, string> = {
  '0': '0',
  '1': '1',
  '10': '10',
  '50': '50',
  '100': '100',
  '200': '200',
  '500': '500',
  '1000': '1000',
  '2000': '2000',
  '5000': '5000',
  'max': '9999',
};

export type ZIndexSemanticKey =
  | 'background'
  | 'surface'
  | 'floating'
  | 'dropdown'
  | 'popover'
  | 'tooltip'
  | 'sticky-header'
  | 'modal'
  | 'dialog'
  | 'toast'
  | 'notification'
  | 'overlay'
  | 'accessibility-overlay'
  | 'critical';

export const zIndexSemantic: Record<ZIndexSemanticKey, ZIndexScaleKey> = {
  background: '0',
  surface: '1',
  floating: '10',
  dropdown: '100',
  popover: '200',
  tooltip: '500',
  'sticky-header': '500',
  modal: '1000',
  dialog: '1000',
  toast: '2000',
  notification: '2000',
  overlay: '5000',
  'accessibility-overlay': '5000',
  critical: 'max',
};

export const zIndexTokens = {
  scale: zIndexScale,
  semantic: zIndexSemantic,
};

