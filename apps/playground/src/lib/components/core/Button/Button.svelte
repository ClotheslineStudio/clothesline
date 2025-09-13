<script lang="ts">
  export let type: 'button' | 'submit' | 'reset' = 'button';
  export let variant: 'solid' | 'outline' | 'ghost' | 'link' = 'solid';
  export let size: 'sm' | 'md' | 'lg' = 'md';
  export let color:
    | 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info' | 'neutral' = 'primary';
  export let disabled = false;
  export let loading = false;

  // ✅ make optionals truly optional for TS by giving defaults
  export let href: string | undefined = undefined;
  export let target: '_self' | '_blank' | '_parent' | '_top' | (string & {}) | undefined = undefined;
  export let rel: string | undefined = undefined;

  // For icon-only cases; optional
  export let ariaLabel: string | undefined = undefined;

  function styleVars() {
    const role = color;
    const map = {
      solid: {
        bg: `var(--button-bg, var(--color-${role}-500-vis))`,
        text: `var(--button-text, var(--on-${role}))`,
        bgHover: `var(--button-bg-hover, var(--color-${role}-600-vis))`,
        border: `var(--button-border, 1px solid var(--color-${role}-600-vis))`,
        deco: 'none'
      },
      outline: {
        bg: `var(--button-outline-bg)`,
        text: `var(--button-outline-text)`,
        bgHover: `var(--button-outline-bg-hover)`,
        border: `var(--button-outline-border)`,
        deco: 'none'
      },
      ghost: {
        bg: `var(--button-ghost-bg)`,
        text: `var(--button-ghost-text)`,
        bgHover: `var(--button-ghost-bg-hover)`,
        border: `var(--button-ghost-border)`,
        deco: 'none'
      },
      link: {
        bg: `var(--button-link-bg)`,
        text: `var(--button-link-text)`,
        bgHover: `var(--button-link-bg-hover)`,
        border: `var(--button-link-border)`,
        deco: `var(--button-link-text-decoration, underline)`
      }
    } as const;

    const { bg, text, bgHover, border, deco } = map[variant];
    const sizes = {
      sm: { px: 'var(--spacing-3)', py: 'var(--spacing-1)', fs: 'var(--text-sm)', gap: 'var(--spacing-1)' },
      md: { px: 'var(--spacing-4)', py: 'var(--spacing-2)', fs: 'var(--text-base)', gap: 'var(--spacing-2)' },
      lg: { px: 'var(--spacing-5)', py: 'var(--spacing-3)', fs: 'var(--text-lg)', gap: 'var(--spacing-2)' }
    } as const;
    const { px, py, fs, gap } = sizes[size];

    return `
      --cl-btn-bg: ${bg};
      --cl-btn-bg-hover: ${bgHover};
      --cl-btn-fg: ${text};
      --cl-btn-border: ${border};
      --cl-btn-deco: ${deco};
      --cl-btn-px: ${px};
      --cl-btn-py: ${py};
      --cl-btn-fs: ${fs};
      --cl-btn-gap: ${gap};
    `;
  }

  const isLink = () => !!href;
</script>

<!-- ✅ accept and forward unknown props like aria-* / data-* -->
<svelte:element
  this={isLink() ? 'a' : 'button'}
  type={isLink() ? undefined : type}
  href={isLink() && !(disabled || loading) ? href : undefined}
  target={isLink() && !(disabled || loading) ? target : undefined}
  rel={isLink() && !(disabled || loading) ? rel : undefined}
  aria-label={ariaLabel}
  aria-disabled={(disabled || loading) ? 'true' : undefined}
  aria-busy={loading ? 'true' : undefined}
  class="cl-button"
  style={styleVars()}
  disabled={!isLink() && (disabled || loading) ? true : undefined}
  {...$$restProps}
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

    color: var(--cl-btn-fg);
    background: var(--cl-btn-bg);
    border: var(--cl-btn-border);

    transition: background 0.15s, color 0.15s, border-color 0.15s;
    cursor: pointer;
  }
  .cl-button:hover:not([aria-disabled='true']) { background: var(--cl-btn-bg-hover); }

  .cl-button:focus-visible {
    outline: 2px solid var(--focus-ring, var(--color-primary-500-vis));
    outline-offset: 2px;
  }

  .cl-button[aria-disabled='true'] {
    cursor: not-allowed;
    background: var(--button-bg-disabled);
    color: var(--button-text-disabled);
    border: var(--button-border-disabled, 1px solid var(--color-surface-400));
    text-decoration: none;
  }
</style>

