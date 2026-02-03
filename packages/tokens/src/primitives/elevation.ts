/**
 * Elevation (shadow) tokens for the Clothesline UI system.
 *
 * Contract:
 * - elevationScale: raw shadow layers (theme-agnostic)
 * - elevationSemantic: semantic usage → elevation scale key
 *
 * Rules:
 * - No var()
 * - No theme-coupled colors (themes may override later via a style layer if needed)
 * - Stable keys (do not rename without a migration plan)
 */

export type ElevationScaleKey = '0' | '1' | '2' | '3' | '4' | '6' | '8' | '12';

export const elevationScale: Record<ElevationScaleKey, string> = {
  '0': 'none',

  '1': '0px 1px 2px rgba(0 0 0 / 0.06)',
  '2': '0px 1px 3px rgba(0 0 0 / 0.10), 0px 1px 2px rgba(0 0 0 / 0.06)',

  '3': '0px 2px 4px rgba(0 0 0 / 0.10), 0px 2px 3px rgba(0 0 0 / 0.08)',
  '4': '0px 4px 8px rgba(0 0 0 / 0.12), 0px 2px 4px rgba(0 0 0 / 0.08)',

  '6': '0px 6px 12px rgba(0 0 0 / 0.14), 0px 3px 6px rgba(0 0 0 / 0.10)',
  '8': '0px 8px 16px rgba(0 0 0 / 0.16), 0px 4px 8px rgba(0 0 0 / 0.12)',
  '12': '0px 12px 24px rgba(0 0 0 / 0.18), 0px 6px 12px rgba(0 0 0 / 0.14)'
};

export type ElevationSemanticKey =
  | 'none'
  | 'hairline'
  | 'card'
  | 'navbar'
  | 'menu'
  | 'popover'
  | 'toast'
  | 'dialog'
  | 'modal'
  | 'highest';

export const elevationSemantic: Record<ElevationSemanticKey, ElevationScaleKey> = {
  none: '0',
  hairline: '1',
  card: '2',
  navbar: '3',
  menu: '3',
  popover: '4',
  toast: '6',
  dialog: '8',
  modal: '12',
  highest: '12'
};
