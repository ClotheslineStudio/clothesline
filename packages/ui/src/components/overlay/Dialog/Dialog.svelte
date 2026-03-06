<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  export let open = false;
  export let closeOnBackdrop = true;
  export let closeOnEscape = true;
  export let labelledBy: string | undefined = undefined;
  export let describedBy: string | undefined = undefined;
  export let className = '';

  const dispatch = createEventDispatcher<{ close: void; open: void; }>();

  $: if (open) dispatch('open');

  function closeDialog() {
    if (!open) return;
    open = false;
    dispatch('close');
  }

  function onBackdropClick(event: MouseEvent) {
    if (!closeOnBackdrop) return;
    if (event.target === event.currentTarget) closeDialog();
  }

  function onKeydown(event: KeyboardEvent) {
    if (closeOnEscape && event.key === 'Escape') {
      event.stopPropagation();
      closeDialog();
    }
  }
</script>

{#if open}
  <div class="cl-dialog-backdrop" on:click={onBackdropClick} on:keydown={onKeydown} role="presentation">
    <div
      class={`cl-dialog ${className}`.trim()}
      role="dialog"
      aria-modal="true"
      aria-labelledby={labelledBy}
      aria-describedby={describedBy}
      tabindex="0"
    >
      <slot />
    </div>
  </div>
{/if}

<style>
  .cl-dialog-backdrop {
    position: fixed;
    inset: 0;
    background: color-mix(in oklab, var(--color-surface-950) 45%, transparent);
    display: grid;
    place-items: center;
    z-index: var(--z-overlay, 1100);
    padding: var(--spacing-6, 1.5rem);
  }

  .cl-dialog {
    width: min(100%, 40rem);
    max-height: min(90vh, 48rem);
    overflow: auto;
    border-radius: var(--radius-card, var(--radius-lg, 0.75rem));
    border: var(--border-width-default, 1px) solid var(--border-default-color, var(--color-surface-300));
    background: var(--background-panel, var(--color-surface-50));
    color: var(--base-font-color, var(--color-surface-950));
    box-shadow: var(--shadow-lg, 0 14px 30px rgb(0 0 0 / 0.2));
    padding: var(--spacing-5, 1rem);
  }

  .cl-dialog:focus-visible {
    outline: var(--focus-width, 2px) solid var(--focus-color, var(--color-primary-500));
    outline-offset: var(--focus-offset, 2px);
  }
</style>
