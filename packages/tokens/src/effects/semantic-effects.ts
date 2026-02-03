/**
 * Semantic Effects Tokens (theme-agnostic defaults)
 * Emits:
 * - Glass knobs + derived surface-glass recipes
 * - Glow knobs
 * - Background overlay knobs + recipe
 */

export const semanticEffectsTokens = {
  glass: {
    enabled: '1',
    blur: 'var(--blur-16)',
    saturate: '1.25',
    contrast: '1.05',
    brightness: '1.05',
    'tint-pct': '18%',
    'border-pct': '35%',
    'highlight-alpha': '0.18',
    'noise-alpha': '0.04',
    shadow: 'var(--elevation-4)',
    'border-width': 'var(--border-1)',
    'border-style': 'solid',
    'backdrop-filter':
      'blur(var(--glass-blur)) saturate(var(--glass-saturate)) contrast(var(--glass-contrast)) brightness(var(--glass-brightness))'
  },

  surface: {
    glass: {
      bg: 'color-mix(in oklab, var(--fill-surface) var(--glass-tint-pct), transparent)',
      'border-color':
        'color-mix(in oklab, var(--border-color-default) var(--glass-border-pct), transparent)',
      text: 'var(--on-surface)',
      border: 'var(--glass-border-width) var(--glass-border-style) var(--surface-glass-border-color)',
      shadow: 'var(--glass-shadow)'
    }
  },

  glow: {
    color: 'var(--color-primary-400-vis)',
    alpha: '0.35',
    blur: 'var(--blur-16)',
    spread: '0px'
  },

  background: {
    'overlay-alpha': '0',
    'overlay-color': 'var(--background-app)',
    overlay:
      'linear-gradient(0deg, color-mix(in oklab, var(--background-overlay-color) calc(var(--background-overlay-alpha) * 100%), transparent), color-mix(in oklab, var(--background-overlay-color) calc(var(--background-overlay-alpha) * 100%), transparent))'
  }
} as const;
