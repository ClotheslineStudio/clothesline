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

  export let href: string | undefined;
  export let target: string | undefined;
  export let rel: string | undefined;
  export let ariaLabel: string | undefined;

  const baseClass = 'cl-button';

  $: colorClass = `${baseClass}--color-${color}`;
  $: variantClass = `${baseClass}--variant-${variant}`;
  $: sizeClass = `${baseClass}--size-${size}`;
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
  class={`${baseClass} ${colorClass} ${variantClass} ${sizeClass}`}
  disabled={href ? undefined : disabled}
>
  <slot name="icon-left" />
  <slot />
  <slot name="icon-right" />
</svelte:element>

<style>
  /* Base button, all variants */
  .cl-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: var(--spacing-2);

    font-family: var(--type-button-family, var(--type-family-body));
    font-weight: var(--type-button-weight, var(--type-weight-semibold));
    text-transform: var(--type-button-transform, none);
    font-size: var(--type-button-size, var(--type-scale-sm));
    line-height: var(--type-button-leading, var(--type-leading-normal));
    letter-spacing: var(--type-button-tracking, var(--type-tracking-normal));

    padding: var(--spacing-2) var(--spacing-4);
    border-radius: var(--radius-interactive);
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);

    /* solid primary as safe default */
    background-color: var(--color-primary-500);
    color: var(--on-primary);
    border: 1px solid var(--color-primary-600);

    cursor: pointer;
    white-space: nowrap;

    transition:
      background-color var(--motion-duration-fast, 150ms)
        var(--motion-ease, ease-in-out),
      color var(--motion-duration-fast, 150ms)
        var(--motion-ease, ease-in-out),
      border-color var(--motion-duration-fast, 150ms)
        var(--motion-ease, ease-in-out),
      transform var(--motion-duration-fast, 150ms)
        var(--motion-ease, ease-in-out);
  }

  .cl-button:hover:not([aria-disabled='true']) {
    background-color: var(--color-primary-600-vis);
  }

  .cl-button:focus-visible {
    outline-width: var(--border-focus-width, var(--border-2));
    outline-style: solid;
    outline-color: var(--border-focus, var(--color-primary-500));
    outline-offset: var(--ring-offset-width, 2px);
  }

  .cl-button[aria-disabled='true'] {
    cursor: not-allowed;
    background-color: var(--color-surface-300);
    color: var(--on-surface-muted);
    border: 1px solid var(--color-surface-400);
    text-decoration: none;
    box-shadow: none;
    opacity: var(--opacity-disabled, 0.4);
  }

  /* =========================
     Sizes
     ========================= */

  .cl-button--size-sm {
    padding: var(--spacing-1) var(--spacing-3);
    font-size: var(--type-scale-sm);
    gap: var(--spacing-1);
  }

  .cl-button--size-md {
    padding: var(--spacing-2) var(--spacing-4);
    font-size: var(--type-button-size, var(--type-scale-sm));
    gap: var(--spacing-2);
  }

  .cl-button--size-lg {
    padding: var(--spacing-3) var(--spacing-5);
    font-size: var(--type-scale-lg);
    gap: var(--spacing-2);
  }

  /* =========================
     Color roles (solid base)
     ========================= */

  .cl-button--color-primary {
    background-color: var(--color-primary-500);
    border-color: var(--color-primary-600);
    color: var(--on-primary);
  }

  .cl-button--color-secondary {
    background-color: var(--color-secondary-500);
    border-color: var(--color-secondary-600);
    color: var(--on-secondary, var(--on-primary));
  }

  .cl-button--color-success {
    background-color: var(--color-success-500);
    border-color: var(--color-success-600);
    color: var(--on-success, var(--on-primary));
  }

  .cl-button--color-warning {
    background-color: var(--color-warning-500);
    border-color: var(--color-warning-600);
    color: var(--on-warning, var(--on-surface-strong));
  }

  .cl-button--color-error {
    background-color: var(--color-error-500);
    border-color: var(--color-error-600);
    color: var(--on-error, var(--on-primary));
  }

  .cl-button--color-info {
    background-color: var(--color-info-500);
    border-color: var(--color-info-600);
    color: var(--on-info, var(--on-primary));
  }

  .cl-button--color-neutral {
    background-color: var(--color-surface-800);
    border-color: var(--color-surface-900);
    color: var(--color-surface-50);
  }

  .cl-button--color-primary:hover:not([aria-disabled='true']) {
    background-color: var(--color-primary-600);
  }
  .cl-button--color-secondary:hover:not([aria-disabled='true']) {
    background-color: var(--color-secondary-600);
  }
  .cl-button--color-success:hover:not([aria-disabled='true']) {
    background-color: var(--color-success-600);
  }
  .cl-button--color-warning:hover:not([aria-disabled='true']) {
    background-color: var(--color-warning-600);
  }
  .cl-button--color-error:hover:not([aria-disabled='true']) {
    background-color: var(--color-error-600);
  }
  .cl-button--color-info:hover:not([aria-disabled='true']) {
    background-color: var(--color-info-600);
  }
  .cl-button--color-neutral:hover:not([aria-disabled='true']) {
    background-color: var(--color-surface-900);
  }

  /* =========================
     Variants
     ========================= */

  /* solid = default */

  .cl-button--variant-outline {
    background-color: transparent;
    color: var(--on-surface-strong);
    border-color: var(--color-primary-400);
  }

  .cl-button--variant-outline:hover:not([aria-disabled='true']) {
    background-color: var(--color-primary-100);
  }

  .cl-button--variant-ghost {
    background-color: transparent;
    color: var(--on-surface-strong);
    border-color: transparent;
    box-shadow: none;
  }

  .cl-button--variant-ghost:hover:not([aria-disabled='true']) {
    background-color: var(--color-primary-100);
  }

  .cl-button--variant-link {
    background-color: transparent;
    color: var(--anchor-color, var(--color-primary-600));
    text-decoration: var(--anchor-decoration, underline);
    border-color: transparent;
    box-shadow: none;
    padding-inline: 0;
    gap: var(--spacing-1);
  }

  .cl-button--variant-link:hover:not([aria-disabled='true']) {
    text-decoration: var(--anchor-decoration-hover, none);
    background-color: transparent;
  }
</style>











