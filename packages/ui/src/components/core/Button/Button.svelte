<script lang="ts">
  import type { SvelteComponent } from 'svelte';

  export let type: 'button' | 'submit' | 'reset' = 'button';
  export let variant: 'solid' | 'outline' | 'ghost' | 'link' = 'solid';
  export let size: 'sm' | 'md' | 'lg' = 'md';
  export let color: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info' | 'neutral' = 'primary';
  export let disabled: boolean = false;
  export let loading: boolean = false;

  export let href: string | undefined;
  export let target: string | undefined;
  export let rel: string | undefined;
  export let ariaLabel: string | undefined;

  /**
   * Compute inline CSS variables for this button instance.
   * Uses theme tokens: --button-*, --on-*, --on-surface-*
   */
  function computeStyleVars() {
    // role ramp helpers
    const base = `var(--color-${color}-500-vis)`;
    const hover = `var(--color-${color}-600-vis)`;
    const border = `1px solid var(--color-${color}-600-vis)`;

    // defaults (solid)
    let bg = base;
    let fg = `var(--on-${color}, var(--button-text))`; // ✅ on-color
    let bgHover = hover;
    let borderColor = border;
    let deco = 'none';

    if (variant === 'outline') {
      bg = 'transparent';
      fg = 'var(--on-surface-strong)';
      bgHover = `var(--color-${color}-100-vis)`;
      borderColor = `1px solid var(--color-${color}-400-vis)`;
    } else if (variant === 'ghost') {
      bg = 'transparent';
      fg = 'var(--on-surface-strong)';
      bgHover = `var(--color-${color}-100-vis)`;
      borderColor = '1px solid transparent';
    } else if (variant === 'link') {
      bg = 'transparent';
      fg = `var(--color-${color}-600-vis)`;
      bgHover = 'transparent';
      borderColor = '1px solid transparent';
      deco = 'underline';
    }

    // sizing
    const sizes = {
      sm: { px: 'var(--spacing-3)', py: 'var(--spacing-1)', fs: 'var(--text-sm)', gap: 'var(--spacing-1)' },
      md: { px: 'var(--spacing-4)', py: 'var(--spacing-2)', fs: 'var(--text-base)', gap: 'var(--spacing-2)' },
      lg: { px: 'var(--spacing-5)', py: 'var(--spacing-3)', fs: 'var(--text-lg)', gap: 'var(--spacing-2)' }
    };
    const { px, py, fs, gap } = sizes[size];

    return `
      --cl-btn-bg: ${bg};
      --cl-btn-bg-hover: ${bgHover};
      --cl-btn-fg: ${fg};
      --cl-btn-border: ${borderColor};
      --cl-btn-deco: ${deco};

      --cl-btn-px: ${px};
      --cl-btn-py: ${py};
      --cl-btn-fs: ${fs};
      --cl-btn-gap: ${gap};
    `;
  }
</script>

<svelte:element
  this={href ? 'a' : 'button'}
  type={href ? undefined : type}
  href={href}
  target={target}
  rel={rel}
  aria-label={ariaLabel}
  aria-disabled={disabled || loading}
  aria-busy={loading}
  class="cl-button"
  style={computeStyleVars()}
  disabled={href ? undefined : disabled}
>
  <slot name="icon-left" />
  <slot />
  <slot name="icon-right" />
</svelte:element>

<style>
  .cl-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: var(--cl-btn-gap);

    font-size: var(--cl-btn-fs);
    font-weight: 500;
    text-decoration: var(--cl-btn-deco);

    padding: var(--cl-btn-py) var(--cl-btn-px);
    border-radius: var(--button-radius, var(--radius-interactive));
    box-shadow: var(--button-shadow);

    color: var(--cl-btn-fg, var(--button-text));
    background: var(--cl-btn-bg, var(--button-bg));
    border: var(--cl-btn-border, var(--button-border));

    transition: background 0.15s, color 0.15s, border-color 0.15s;
    cursor: pointer;
  }

  .cl-button:hover:not([aria-disabled='true']) {
    background: var(--cl-btn-bg-hover, var(--button-bg-hover));
  }

  .cl-button:focus-visible {
    outline: 2px solid var(--focus-ring, var(--color-primary-500-vis));
    outline-offset: 2px;
  }

  /* Disabled state */
  .cl-button[aria-disabled='true'] {
    cursor: not-allowed;
    background: var(--button-bg-disabled);
    color: var(--button-text-disabled);
    border: var(--button-border-disabled, 1px solid var(--color-surface-400));
    text-decoration: none;
  }
</style>







