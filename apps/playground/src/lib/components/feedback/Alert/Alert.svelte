<script lang="ts">
  export let variant: 'info' | 'success' | 'warning' | 'error' = 'info';
  export let title: string = '';
  export let message: string = '';
  export let className = '';
</script>

<div
  class="cl-alert cl-alert-{variant} {className}"
  role="alert"
  aria-live="polite"
>
  <slot name="icon" />
  <div class="cl-alert-content">
    {#if title}
      <div class="cl-alert-title">{title}</div>
    {/if}
    {#if message}
      <div class="cl-alert-message">{message}</div>
    {/if}
    <slot />
  </div>
</div>

<style>
  .cl-alert {
    display: flex;
    align-items: start;
    gap: 0.75rem;
    padding: var(--spacing-4, 1rem);
    border: 1px solid;
    border-radius: var(--radius-md, 0.375rem);
    background-color: var(--color-surface-50, #f9f9f9);
    font-size: 0.875rem;
    line-height: 1.25;
  }

  .cl-alert-content {
    display: flex;
    flex-direction: column;
  }

  .cl-alert-title {
    font-weight: 600;
    color: var(--base-font-color, #111);
  }

  .cl-alert-message {
    color: var(--muted-font-color, #555);
  }

  /* Variants */
  .cl-alert-info {
    background-color: var(--color-info-50, #e0f2fe);
    border-color: var(--color-info-200, #90cdf4);
    color: var(--color-info-800, #1e40af);
  }

  .cl-alert-success {
    background-color: var(--color-success-50, #ecfdf5);
    border-color: var(--color-success-200, #86efac);
    color: var(--color-success-800, #065f46);
  }

  .cl-alert-warning {
    background-color: var(--color-warning-50, #fffbeb);
    border-color: var(--color-warning-200, #fde68a);
    color: var(--color-warning-800, #92400e);
  }

  .cl-alert-error {
    background-color: var(--color-error-50, #fef2f2);
    border-color: var(--color-error-200, #fca5a5);
    color: var(--color-error-800, #991b1b);
  }
</style>
