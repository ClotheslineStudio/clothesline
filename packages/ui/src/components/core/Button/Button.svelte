<!-- packages/ui/src/components/core/Button/Button.svelte -->
<script lang="ts">
  export let type: 'button' | 'submit' | 'reset' = 'button';
  export let variant: 'solid' | 'outline' | 'ghost' | 'link' = 'solid';
  export let size: 'sm' | 'md' | 'lg' = 'md';
  export let color:
    | 'primary'
    | 'secondary'
    | 'success'
    | 'warning'
    | 'error'
    | 'info'
    | 'neutral' = 'primary';

  export let disabled = false;
  export let loading = false;

  // Optional link props
  export let href: string | undefined = undefined;
  export let target: string | undefined = undefined;
  export let rel: string | undefined = undefined;
  export let ariaLabel: string | undefined = undefined;

  // loading behaves like disabled for interaction
  $: isDisabled = disabled || loading;

  const baseClass = 'cl-button';
  $: colorClass = `${baseClass}--color-${color}`;
  $: variantClass = `${baseClass}--variant-${variant}`;
  $: sizeClass = `${baseClass}--size-${size}`;
</script>

<svelte:element
  this={href ? 'a' : 'button'}
  {...$$restProps}
  type={href ? undefined : type}
  href={isDisabled ? undefined : href}
  target={href && !isDisabled ? target : undefined}
  rel={href && !isDisabled ? rel : undefined}
  aria-label={ariaLabel}
  aria-disabled={isDisabled ? 'true' : undefined}
  aria-busy={loading ? 'true' : undefined}
  tabindex={href && isDisabled ? -1 : undefined}
  class={`${baseClass} ${colorClass} ${variantClass} ${sizeClass}`}
  disabled={href ? undefined : isDisabled}
>
  <slot name="icon-left" />
  <slot />
  <slot name="icon-right" />
</svelte:element>

<style>
  /* ==========================================================================
     Clothesline Button (Option A)
     - Role mapping stays inside the component CSS
     - Actual paint properties consume ONLY --button-* tokens
     - Role classes set internal role sources (--cl-*)
     - Variant classes map role sources -> active --button-* token set
  ========================================================================== */

  /* ------------------------------------------
     1) Role sources (internal variables)
     These MUST be containers for fill and on-colors for text.
  ------------------------------------------ */

  .cl-button {
    /* Defaults (primary) */
    --cl-fill: var(--primary, var(--color-primary-600-vis, var(--color-primary-500-vis)));
    --cl-fill-hover: var(--primary-hover, var(--color-primary-700-vis, var(--color-primary-600-vis)));
    --cl-fill-active: var(--primary-active, var(--color-primary-800-vis, var(--color-primary-700-vis)));

    --cl-on-fill: var(--on-primary, var(--color-surface-50-vis));

    /* Subtle containers for outline/ghost hover */
    --cl-subtle: var(--primary-subtle, var(--color-primary-100-vis));
    --cl-subtle-hover: var(--primary-subtle-hover, var(--color-primary-150-vis, var(--cl-subtle)));
    --cl-subtle-active: var(--primary-subtle-active, var(--color-primary-200-vis, var(--cl-subtle-hover)));

    /* Neutral interaction fallback (used for disabled border, etc.) */
    --cl-border: var(--border-default, transparent);
  }

  .cl-button--color-primary {
    --cl-fill: var(--primary, var(--color-primary-600-vis, var(--color-primary-500-vis)));
    --cl-fill-hover: var(--primary-hover, var(--color-primary-700-vis, var(--color-primary-600-vis)));
    --cl-fill-active: var(--primary-active, var(--color-primary-800-vis, var(--color-primary-700-vis)));
    --cl-on-fill: var(--on-primary, var(--color-surface-50-vis));
    --cl-subtle: var(--primary-subtle, var(--color-primary-100-vis));
    --cl-subtle-hover: var(--primary-subtle-hover, var(--color-primary-150-vis, var(--cl-subtle)));
    --cl-subtle-active: var(--primary-subtle-active, var(--color-primary-200-vis, var(--cl-subtle-hover)));
  }

  .cl-button--color-secondary {
    --cl-fill: var(--secondary, var(--color-secondary-600-vis, var(--color-secondary-500-vis)));
    --cl-fill-hover: var(--secondary-hover, var(--color-secondary-700-vis, var(--color-secondary-600-vis)));
    --cl-fill-active: var(--secondary-active, var(--color-secondary-800-vis, var(--color-secondary-700-vis)));
    --cl-on-fill: var(--on-secondary, var(--color-surface-50-vis));
    --cl-subtle: var(--secondary-subtle, var(--color-secondary-100-vis));
    --cl-subtle-hover: var(--secondary-subtle-hover, var(--color-secondary-150-vis, var(--cl-subtle)));
    --cl-subtle-active: var(--secondary-subtle-active, var(--color-secondary-200-vis, var(--cl-subtle-hover)));
  }

  .cl-button--color-success {
    --cl-fill: var(--success, var(--color-success-600-vis, var(--color-success-500-vis)));
    --cl-fill-hover: var(--success-hover, var(--color-success-700-vis, var(--color-success-600-vis)));
    --cl-fill-active: var(--success-active, var(--color-success-800-vis, var(--color-success-700-vis)));
    --cl-on-fill: var(--on-success, var(--color-surface-50-vis));
    --cl-subtle: var(--success-subtle, var(--color-success-100-vis));
    --cl-subtle-hover: var(--success-subtle-hover, var(--color-success-150-vis, var(--cl-subtle)));
    --cl-subtle-active: var(--success-subtle-active, var(--color-success-200-vis, var(--cl-subtle-hover)));
  }

  .cl-button--color-warning {
    --cl-fill: var(--warning, var(--color-warning-600-vis, var(--color-warning-500-vis)));
    --cl-fill-hover: var(--warning-hover, var(--color-warning-700-vis, var(--color-warning-600-vis)));
    --cl-fill-active: var(--warning-active, var(--color-warning-800-vis, var(--color-warning-700-vis)));
    /* warning often needs dark text in light themes; rely on your semantic on-warning */
    --cl-on-fill: var(--on-warning, var(--color-surface-950-vis));
    --cl-subtle: var(--warning-subtle, var(--color-warning-100-vis));
    --cl-subtle-hover: var(--warning-subtle-hover, var(--color-warning-150-vis, var(--cl-subtle)));
    --cl-subtle-active: var(--warning-subtle-active, var(--color-warning-200-vis, var(--cl-subtle-hover)));
  }

  .cl-button--color-error {
    --cl-fill: var(--error, var(--color-error-600-vis, var(--color-error-500-vis)));
    --cl-fill-hover: var(--error-hover, var(--color-error-700-vis, var(--color-error-600-vis)));
    --cl-fill-active: var(--error-active, var(--color-error-800-vis, var(--color-error-700-vis)));
    --cl-on-fill: var(--on-error, var(--color-surface-50-vis));
    --cl-subtle: var(--error-subtle, var(--color-error-100-vis));
    --cl-subtle-hover: var(--error-subtle-hover, var(--color-error-150-vis, var(--cl-subtle)));
    --cl-subtle-active: var(--error-subtle-active, var(--color-error-200-vis, var(--cl-subtle-hover)));
  }

  .cl-button--color-info {
    --cl-fill: var(--info, var(--color-info-600-vis, var(--color-info-500-vis)));
    --cl-fill-hover: var(--info-hover, var(--color-info-700-vis, var(--color-info-600-vis)));
    --cl-fill-active: var(--info-active, var(--color-info-800-vis, var(--color-info-700-vis)));
    --cl-on-fill: var(--on-info, var(--color-surface-50-vis));
    --cl-subtle: var(--info-subtle, var(--color-info-100-vis));
    --cl-subtle-hover: var(--info-subtle-hover, var(--color-info-150-vis, var(--cl-subtle)));
    --cl-subtle-active: var(--info-subtle-active, var(--color-info-200-vis, var(--cl-subtle-hover)));
  }

  .cl-button--color-neutral {
    --cl-fill: var(--neutral, var(--color-neutral-700-vis, var(--color-neutral-600-vis)));
    --cl-fill-hover: var(--neutral-hover, var(--color-neutral-800-vis, var(--color-neutral-700-vis)));
    --cl-fill-active: var(--neutral-active, var(--color-neutral-900-vis, var(--color-neutral-800-vis)));
    --cl-on-fill: var(--on-neutral, var(--color-surface-50-vis));
    --cl-subtle: var(--neutral-subtle, var(--color-neutral-100-vis));
    --cl-subtle-hover: var(--neutral-subtle-hover, var(--color-neutral-150-vis, var(--cl-subtle)));
    --cl-subtle-active: var(--neutral-subtle-active, var(--color-neutral-200-vis, var(--cl-subtle-hover)));
  }

  /* ------------------------------------------
     2) Variant maps: role sources -> active --button-* tokens
     IMPORTANT: properties below consume ONLY --button-* tokens
  ------------------------------------------ */

  /* SOLID (default) */
  .cl-button--variant-solid {
    --button-bg: var(--cl-fill);
    --button-text: var(--cl-on-fill);
    --button-bg-hover: var(--cl-fill-hover);
    --button-bg-active: var(--cl-fill-active);

    --button-border-color: var(--button-border-color, transparent);
  }

  /* OUTLINE */
  .cl-button--variant-outline {
    --button-bg: var(--button-outline-bg, transparent);
    --button-text: var(--button-outline-text, var(--cl-fill));
    --button-bg-hover: var(--button-outline-bg-hover, var(--cl-subtle-hover));
    --button-bg-active: var(--button-outline-bg-active, var(--cl-subtle-active));

    --button-border-color: var(--button-outline-border-color, var(--cl-fill));
  }

  /* GHOST */
  .cl-button--variant-ghost {
    --button-bg: var(--button-ghost-bg, transparent);
    --button-text: var(--button-ghost-text, var(--cl-fill));
    --button-bg-hover: var(--button-ghost-bg-hover, var(--cl-subtle-hover));
    --button-bg-active: var(--button-ghost-bg-active, var(--cl-subtle-active));

    --button-border-color: transparent;
  }

  /* LINK */
  .cl-button--variant-link {
    --button-bg: var(--button-link-bg, transparent);
    --button-text: var(--button-link-text, var(--cl-fill));
    --button-bg-hover: var(--button-link-bg-hover, transparent);
    --button-bg-active: var(--button-link-bg-active, transparent);

    --button-border-color: transparent;
  }

  /* ------------------------------------------
     3) Base button: consumes ONLY --button-* tokens
  ------------------------------------------ */

  .cl-button {
    /* layout */
    display: inline-flex;
    align-items: center;
    justify-content: center;
    white-space: nowrap;
    user-select: none;

    gap: var(--button-gap, var(--spacing-2));

    /* typography */
    font-family: var(--type-button-family);
    font-weight: var(--type-button-weight);
    text-transform: var(--type-button-transform);
    font-size: var(--type-button-size);
    line-height: var(--type-button-leading);
    letter-spacing: var(--type-button-tracking);

    /* sizing */
    padding: var(--button-padding-y, var(--spacing-2)) var(--button-padding-x, var(--spacing-4));
    border-radius: var(--button-radius, var(--radius-interactive));

    /* paint */
    background: var(--button-bg, var(--cl-fill));
    color: var(--button-text, var(--cl-on-fill));

    border-width: var(--button-border-width, var(--border-width-interactive, var(--border-1, 1px)));
    border-style: var(--button-border-style, solid);
    border-color: var(--button-border-color, transparent);

    /* elevation / motion */
    box-shadow: var(--button-shadow, var(--elevation-1));
    transform: translateY(0);
    cursor: pointer;

    transition: var(--button-transition, background-color 150ms ease-out);
  }

  /* Hover / Active */
  .cl-button:hover:not([aria-disabled="true"]):not([disabled]) {
    background: var(--button-bg-hover, var(--button-bg));
    border-color: var(--button-border-color-hover, var(--button-border-color));
    box-shadow: var(--button-shadow-hover, var(--button-shadow));
  }

  .cl-button:active:not([aria-disabled="true"]):not([disabled]) {
    background: var(--button-bg-active, var(--button-bg-hover, var(--button-bg)));
    border-color: var(--button-border-color-active, var(--button-border-color-hover, var(--button-border-color)));
    box-shadow: var(--button-shadow-active, var(--elevation-0, none));
    transform: translateY(var(--button-press-translate, 1px));
  }

  /* Focus */
  .cl-button:focus-visible {
    outline: var(--button-focus-ring-width, var(--focus-width, 2px)) solid
      var(--button-focus-ring-color, var(--focus-color, var(--color-primary-400-vis)));
    outline-offset: var(--button-focus-ring-offset, var(--focus-offset, 2px));
  }

  /* Disabled */
  .cl-button[aria-disabled="true"],
  .cl-button[disabled] {
    cursor: not-allowed;
    pointer-events: none;

    background: var(--button-bg-disabled, var(--surface-disabled, var(--color-surface-300-vis)));
    border-color: var(--button-border-color-disabled, var(--border-disabled, var(--color-surface-400-vis)));
    color: var(--button-text-disabled, var(--on-surface-muted));

    opacity: var(--button-disabled-opacity, var(--opacity-disabled, 0.38));

    box-shadow: var(--elevation-0, none);
    transform: none;
    text-decoration: none;
  }

  /* ------------------------------------------
     4) Sizes (keep simple; later you can move into tokens)
  ------------------------------------------ */

  .cl-button--size-sm {
    padding: var(--spacing-1) var(--spacing-3);
    font-size: var(--type-scale-sm);
    gap: var(--spacing-1);
  }

  .cl-button--size-md {
    padding: var(--button-padding-y, var(--spacing-2)) var(--button-padding-x, var(--spacing-4));
    font-size: var(--type-button-size);
    gap: var(--button-gap, var(--spacing-2));
  }

  .cl-button--size-lg {
    padding: var(--spacing-3) var(--spacing-5);
    font-size: var(--type-scale-lg);
    gap: var(--spacing-2);
  }

  /* Link variant polish */
  .cl-button--variant-link {
    padding-inline: 0;
    gap: var(--spacing-1);
    text-decoration: var(--button-link-text-decoration, var(--anchor-decoration, underline));
  }

  .cl-button--variant-link:hover:not([aria-disabled="true"]):not([disabled]) {
    color: var(--button-link-text-hover, var(--cl-fill-hover));
    text-decoration: var(--button-link-text-decoration-hover, var(--anchor-decoration-hover, underline));
  }

  /* Reduced motion */
  @media (prefers-reduced-motion: reduce) {
    .cl-button {
      transition: none;
    }
  }
</style>















