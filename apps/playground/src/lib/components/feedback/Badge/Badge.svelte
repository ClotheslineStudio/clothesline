<script lang="ts">
  export let color: string = 'primary'; // semantic: primary, secondary, success, warning, error, etc.
  export let size: 'sm' | 'md' | 'lg' = 'md';
  export let className: string = '';
</script>

<span
  class={`cl-badge cl-badge-${color} cl-badge-${size} ${className}`}
>
  <slot />
</span>

<style>
  .cl-badge {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    line-height: 1;
    white-space: nowrap;
    border-radius: var(--radius-full, 9999px);
    padding: 0.25em 0.5em;
    background-color: var(--badge-bg, var(--color-primary-100, #eef));
    color: var(--badge-text, var(--color-primary-900, #112));
    font-size: var(--font-size-sm, 0.75rem);
    border: 1px solid var(--badge-border, transparent);
  }

  /* Sizes */
  .cl-badge-sm {
    font-size: var(--font-size-xs, 0.625rem);
    padding: 0.15em 0.4em;
  }

  .cl-badge-md {
    font-size: var(--font-size-sm, 0.75rem);
    padding: 0.25em 0.5em;
  }

  .cl-badge-lg {
    font-size: var(--font-size-base, 0.875rem);
    padding: 0.35em 0.75em;
  }

  /* Semantic color variants with CSS variable fallbacks */
  .cl-badge-primary {
    --badge-bg: var(--color-primary-100, #eef);
    --badge-text: var(--color-primary-900, #112);
  }

  .cl-badge-secondary {
    --badge-bg: var(--color-secondary-100, #f3f4f6);
    --badge-text: var(--color-secondary-900, #1f2937);
  }

  .cl-badge-success {
    --badge-bg: var(--color-success-100, #dcfce7);
    --badge-text: var(--color-success-800, #166534);
  }

  .cl-badge-warning {
    --badge-bg: var(--color-warning-100, #fef9c3);
    --badge-text: var(--color-warning-800, #854d0e);
  }

  .cl-badge-error {
    --badge-bg: var(--color-error-100, #fee2e2);
    --badge-text: var(--color-error-800, #991b1b);
  }

  .cl-badge-info {
    --badge-bg: var(--color-info-100, #e0f2fe);
    --badge-text: var(--color-info-800, #075985);
  }
</style>