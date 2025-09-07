<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  /** Public props */
  export let type: 'button' | 'submit' | 'reset' = 'button';
  export let variant: 'solid' | 'outline' | 'ghost' | 'link' = 'solid';
  export let size: 'sm' | 'md' | 'lg' = 'md';
  /** Color = role name; resolved with --color-${color}-*-vis */
  export let color: string = 'primary';
  export let disabled = false;
  export let loading = false;

  // ✅ make optionals truly optional for TS
  export let ariaLabel: string | undefined = undefined;

  // Link props (if `href` is present it renders <a>)
  export let href: string | undefined = undefined;
  export let target:
    | '_self' | '_blank' | '_parent' | '_top'
    | (string & {}) | undefined = undefined;
  export let rel: string | undefined = undefined;

  const dispatch = createEventDispatcher<{ click: MouseEvent }>();

  /** Compute style variables from role + variant + size */
  $: styleVars = computeStyleVars({ color, variant, size });

  type Ctx = { color: string; variant: typeof variant; size: typeof size };

  function tone(role: string, shade: number) {
    return `var(--color-${role}-${shade}-vis)`;
  }

  function computeStyleVars({ color, variant, size }: Ctx) {
    // Role tones (vision/contrast aware via -vis)
    const t100 = tone(color, 100);
    const t400 = tone(color, 400);
    const t500 = tone(color, 500);
    const t600 = tone(color, 600);
    const t700 = tone(color, 700);

    // Defaults (solid)
    let bg       = t500;
    let text     = 'var(--color-surface-50)';
    let bgHover  = t600;
    let border   = `1px solid ${t600}`;
    let deco     = 'none';

    if (variant === 'outline') {
      bg      = 'transparent';
      text    = t700;
      bgHover = t100;
      border  = `1px solid ${t400}`;
    } else if (variant === 'ghost') {
      bg      = 'transparent';
      text    = t700;
      bgHover = t100;
      border  = `1px solid transparent`;
    } else if (variant === 'link') {
      bg      = 'transparent';
      text    = t600;
      bgHover = 'transparent';
      border  = `1px solid transparent`;
      deco    = 'underline';
    }

    // Sizes
    let py = '0.5rem', px = '0.75rem', fs = '0.9375rem', gap = '0.5rem';
    if (size === 'sm') { py = '0.375rem'; px = '0.625rem'; fs = '0.875rem'; gap = '0.4rem'; }
    if (size === 'lg') { py = '0.75rem';  px = '1rem';    fs = '1rem';     gap = '0.6rem'; }

    // Allow theme overrides with --button-* first; fall back to our computed vars
     return `
    --cl-btn-bg: ${bg};
    --cl-btn-bg-hover: ${bgHover};
    --cl-btn-text: ${text};
    --cl-btn-border: ${border};
    --cl-btn-radius: var(--button-radius, var(--radius-interactive, 0.25rem));
    --cl-btn-shadow: var(--button-shadow, 0 1px 2px rgba(0,0,0,.05));
    --cl-btn-py: ${py};
    --cl-btn-px: ${px};
    --cl-btn-fs: ${fs};
    --cl-btn-gap: ${gap};
    --cl-btn-deco: ${deco};

    /* ✅ Pin per-instance values onto the theme tokens locally */
    --button-bg: var(--cl-btn-bg);
    --button-bg-hover: var(--cl-btn-bg-hover);
    --button-text: var(--cl-btn-text);
    --button-border: var(--cl-btn-border);

    /* Disabled fallbacks (themes may override globally; local still wins) */
    --cl-btn-bg-disabled: var(--button-bg-disabled, var(--color-surface-300));
    --cl-btn-text-disabled: var(--button-text-disabled, var(--color-surface-600));
    --cl-btn-border-disabled: var(--button-border-disabled, 1px solid var(--color-surface-400));
  `;
}

  const isLink = () => !!href;

  function onClick(e: MouseEvent) {
    if (disabled || loading) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }
    dispatch('click', e);
  }
</script>

<svelte:options accessors={true} />

<!-- Root element: <a> when href is given; otherwise <button> -->
<svelte:element
  this={isLink() ? 'a' : 'button'}
  class="cl-button"
  data-variant={variant}
  data-size={size}
  data-color={color}
  data-loading={loading ? '' : undefined}
  aria-label={ariaLabel}
  aria-busy={loading ? 'true' : undefined}
  aria-disabled={(disabled || loading) ? 'true' : undefined}
  disabled={!isLink() && (disabled || loading) ? true : undefined}
  href={isLink() && !(disabled || loading) ? href : undefined}
  target={isLink() && !(disabled || loading) ? target : undefined}
  rel={isLink() && !(disabled || loading) ? rel : undefined}
  on:click={onClick}
  type={!isLink() ? type : undefined}
  style={styleVars}
  {...$$restProps}
>
  <span class="cl-button__inner">
    <span class="cl-button__icon cl-button__icon--left" aria-hidden="true">
      <slot name="icon-left" />
    </span>

    <span class="cl-button__label">
      <slot />
    </span>

    <span class="cl-button__icon cl-button__icon--right" aria-hidden="true">
      {#if loading}
        <span class="cl-button__spinner"></span>
      {:else}
        <slot name="icon-right" />
      {/if}
    </span>
  </span>
</svelte:element>

<style>
  .cl-button {
    /* Theme overrides first; computed fallbacks second */
    --_bg: var(--cl-btn-bg, var(--button-bg));
    --_bg-hover: var(--cl-btn-bg-hover, var(--button-bg-hover));
    --_text: var(--cl-btn-text, var(--button-text));
    --_border: var(--cl-btn-border, var(--button-border));
    --_radius: var(--button-radius, var(--cl-btn-radius));
    --_shadow: var(--button-shadow, var(--cl-btn-shadow));

    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: var(--cl-btn-gap);
    padding: var(--cl-btn-py) var(--cl-btn-px);
    font: inherit;
    font-size: var(--cl-btn-fs);
    line-height: 1.2;
    text-decoration: var(--cl-btn-deco);
    color: var(--_text);
    background: var(--_bg);
    border: var(--_border);
    border-radius: var(--_radius);
    box-shadow: var(--_shadow);
    cursor: pointer;
    user-select: none;
    transition:
      background-color 120ms ease,
      color 120ms ease,
      border-color 120ms ease,
      box-shadow 120ms ease,
      opacity 120ms ease;
  }

  .cl-button:hover {
    background: var(--_bg-hover);
  }

  .cl-button:focus-visible {
    outline: max(2px, 0.12rem) solid var(--focus-ring, var(--ring-color, oklch(72% .2 230)));
    outline-offset: 2px;
  }

  /* Disabled / Loading */
  .cl-button[aria-disabled='true'] {
    cursor: not-allowed;
    pointer-events: none;
    background: var(--cl-btn-bg-disabled);
    color: var(--cl-btn-text-disabled);
    border: var(--cl-btn-border-disabled);
  }

  /* Link variant tweaks: visually text-like */
  .cl-button[data-variant='link'] {
    padding: 0;
    border: 0;
    box-shadow: none;
    background: transparent;
  }
  .cl-button[data-variant='link']:hover {
    text-decoration: underline;
  }

  /* Inner layout */
  .cl-button__inner {
    display: inline-flex;
    align-items: center;
    gap: var(--cl-btn-gap);
  }
  .cl-button__icon {
    display: inline-flex;
    width: 1.1em;
    height: 1.1em;
  }
  .cl-button__icon:empty { display: none; }

  /* Spinner */
  .cl-button__spinner {
    display: inline-block;
    width: 1em;
    height: 1em;
    border: 2px solid currentColor;
    border-bottom-color: transparent;
    border-radius: 50%;
    animation: cl-spin 0.75s linear infinite;
  }
  @keyframes cl-spin { to { transform: rotate(360deg); } }
</style>