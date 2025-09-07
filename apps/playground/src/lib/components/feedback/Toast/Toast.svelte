<script lang="ts">
  export let type: 'info' | 'success' | 'warning' | 'error' = 'info';
  export let dismissible: boolean = true;
  export let duration: number = 4000; // auto-dismiss after ms
  export let className: string = '';

  let visible = true;
  let timer: ReturnType<typeof setTimeout>;

  function close() {
    visible = false;
    clearTimeout(timer);
  }

  if (duration > 0) {
    timer = setTimeout(close, duration);
  }
</script>

{#if visible}
  <div class={`cl-toast cl-toast-${type} ${className}`} role="status" aria-live="polite">
    <slot />
    {#if dismissible}
      <button class="cl-toast-close" on:click={close} aria-label="Dismiss">×</button>
    {/if}
  </div>
{/if}

<style>
  .cl-toast {
    position: relative;
    padding: 0.75rem 1rem;
    border-radius: var(--radius-md, 0.5rem);
    font-size: var(--font-size-sm, 0.875rem);
    font-weight: 500;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    box-shadow: var(--shadow-md, 0 2px 6px rgba(0, 0, 0, 0.1));
    border: 1px solid transparent;
  }

  .cl-toast-info {
    background-color: var(--color-info-100, #e0f2fe);
    color: var(--color-info-900, #083344);
    border-color: var(--color-info-200, #bae6fd);
  }

  .cl-toast-success {
    background-color: var(--color-success-100, #dcfce7);
    color: var(--color-success-900, #064e3b);
    border-color: var(--color-success-200, #bbf7d0);
  }

  .cl-toast-warning {
    background-color: var(--color-warning-100, #fef9c3);
    color: var(--color-warning-900, #713f12);
    border-color: var(--color-warning-200, #fde68a);
  }

  .cl-toast-error {
    background-color: var(--color-error-100, #fee2e2);
    color: var(--color-error-900, #7f1d1d);
    border-color: var(--color-error-200, #fecaca);
  }

  .cl-toast-close {
    margin-left: auto;
    background: none;
    border: none;
    font-size: 1rem;
    line-height: 1;
    cursor: pointer;
    color: inherit;
  }
</style>
