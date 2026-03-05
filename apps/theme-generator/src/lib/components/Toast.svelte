<script lang="ts">
  let {
    show,
    message = 'Saved successfully'
  }: {
    show: boolean;
    message?: string;
  } = $props();
</script>

{#if show}
  <div class="toast surface-card" role="status" aria-live="polite">{message}</div>
{/if}

<style>
  .toast {
    position: fixed;
    right: 1rem;
    bottom: 1rem;
    z-index: 30;
    padding: 0.65rem 0.85rem;
    font-size: 0.82rem;
    font-weight: 600;
    background: color-mix(in oklab, var(--color-success-100) 88%, transparent);
    color: var(--color-success-800);
  }
</style>