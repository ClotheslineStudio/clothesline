/**
 * Blur scale tokens (raw).
 * Emits: --blur-0, --blur-2, ... --blur-32
 */

export type BlurScaleKey = '0' | '2' | '4' | '8' | '12' | '16' | '24' | '32';

export const blurScale: Record<BlurScaleKey, string> = {
  '0': '0px',
  '2': '2px',
  '4': '4px',
  '8': '8px',
  '12': '12px',
  '16': '16px',
  '24': '24px',
  '32': '32px'
};

export const blurTokens = {
  scale: blurScale
};
