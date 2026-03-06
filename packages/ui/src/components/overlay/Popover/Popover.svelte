<script lang="ts">
  import { createEventDispatcher, onMount } from 'svelte';

  export let open: boolean | undefined = undefined;
  export let defaultOpen = false;
  export let align: 'start' | 'center' | 'end' = 'center';
  export let placement: 'top' | 'bottom' | 'left' | 'right' = 'bottom';
  export let offset = 8;
  export let role: 'dialog' | 'menu' | 'tooltip' = 'dialog';
  export let ariaLabel = 'Popover';
  export let closeOnInteractOutside = true;
  export let className = '';

  const dispatch = createEventDispatcher<{ open: void; close: void; toggle: { open: boolean } }>();
  let triggerEl: HTMLElement | null = null;
  let panelEl: HTMLElement | null = null;
  let isOpen = open ?? defaultOpen;

  $: if (open !== undefined) isOpen = open;

  function setOpen(value: boolean) {
    if (open === undefined) isOpen = value;
    dispatch(value ? 'open' : 'close');
    dispatch('toggle', { open: value });
  }

  function onDocumentClick(e: MouseEvent) {
    if (!isOpen || !closeOnInteractOutside) return;
    if (!(e.target instanceof Node)) return;
    if (panelEl?.contains(e.target) || triggerEl?.contains(e.target)) return;
    setOpen(false);
  }

  function onKeydown(e: KeyboardEvent) {
    if (e.key === 'Escape' && isOpen) {
      e.stopPropagation();
      setOpen(false);
    }
  }

  onMount(() => {
    document.addEventListener('click', onDocumentClick);
    document.addEventListener('keydown', onKeydown);
    return () => {
      document.removeEventListener('click', onDocumentClick);
      document.removeEventListener('keydown', onKeydown);
    };
  });
</script>

<div class={`cl-popover ${className}`.trim()} data-align={align} data-placement={placement}>
  <button
    type="button"
    bind:this={triggerEl}
    class="cl-popover__trigger"
    aria-haspopup={role === 'tooltip' ? 'true' : role}
    aria-expanded={isOpen}
    aria-label={ariaLabel}
    on:click={() => setOpen(!isOpen)}
  >
    <slot name="trigger" />
  </button>

  {#if isOpen}
    <div
      bind:this={panelEl}
      role={role}
      aria-label={ariaLabel}
      class="cl-popover__panel"
      style={`--offset:${offset}px;`}
    >
      <slot />
    </div>
  {/if}
</div>

<style>
  .cl-popover {
    position: relative;
    display: inline-block;
  }

  .cl-popover__trigger {
    background: none;
    border: 0;
    padding: 0;
    color: inherit;
    font: inherit;
  }

  .cl-popover__panel {
    position: absolute;
    min-width: 12rem;
    max-width: min(90vw, 28rem);
    background: var(--background-panel, var(--color-surface-50));
    border: var(--border-width-default, 1px) solid var(--border-default-color, var(--color-surface-300));
    border-radius: var(--radius-interactive, 0.5rem);
    box-shadow: var(--shadow-md, 0 8px 20px rgb(0 0 0 / 0.12));
    padding: var(--spacing-4, 1rem);
    z-index: var(--z-overlay, 1100);
    color: var(--base-font-color, var(--color-surface-950));
  }

  .cl-popover[data-placement='bottom'] .cl-popover__panel {
    top: calc(100% + var(--offset, 8px));
    left: 50%;
    transform: translateX(-50%);
  }
  .cl-popover[data-placement='top'] .cl-popover__panel {
    bottom: calc(100% + var(--offset, 8px));
    left: 50%;
    transform: translateX(-50%);
  }
  .cl-popover[data-placement='left'] .cl-popover__panel {
    right: calc(100% + var(--offset, 8px));
    top: 50%;
    transform: translateY(-50%);
  }
  .cl-popover[data-placement='right'] .cl-popover__panel {
    left: calc(100% + var(--offset, 8px));
    top: 50%;
    transform: translateY(-50%);
  }

  .cl-popover[data-placement='top'][data-align='start'] .cl-popover__panel,
  .cl-popover[data-placement='bottom'][data-align='start'] .cl-popover__panel {
    left: 0;
    transform: none;
  }
  .cl-popover[data-placement='top'][data-align='end'] .cl-popover__panel,
  .cl-popover[data-placement='bottom'][data-align='end'] .cl-popover__panel {
    left: auto;
    right: 0;
    transform: none;
  }
</style>
