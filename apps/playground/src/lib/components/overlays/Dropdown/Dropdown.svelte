<script lang="ts">
  import { onMount, onDestroy } from 'svelte';

  export let open = false;
  export let align: 'start' | 'end' = 'start';
  export let placement: 'bottom' | 'top' = 'bottom';
  export let id: string = `dropdown-${Math.random().toString(36).slice(2)}`;

  let triggerEl: HTMLButtonElement;
  let menuEl: HTMLDivElement;

  function toggle() {
    open = !open;
  }

  function close() {
    open = false;
  }

  function handleDocumentClick(event: MouseEvent) {
    if (
      menuEl &&
      !menuEl.contains(event.target as Node) &&
      !triggerEl.contains(event.target as Node)
    ) {
      close();
    }
  }

  function handleItemKeydown(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      close();
      triggerEl.focus();
    }
  }

  onMount(() => {
    document.addEventListener('click', handleDocumentClick);
  });

  onDestroy(() => {
    document.removeEventListener('click', handleDocumentClick);
  });
</script>

<div
  class="cl-dropdown"
  data-align={align}
  data-placement={placement}
>
  <button
    bind:this={triggerEl}
    class="cl-dropdown-trigger"
    aria-haspopup="menu"
    aria-controls={id}
    aria-expanded={open}
    on:click={toggle}
    type="button"
  >
    <slot name="trigger">Toggle</slot>
  </button>

  {#if open}
    <div
      class="cl-dropdown-menu"
      bind:this={menuEl}
      role="menu"
      id={id}
      aria-orientation="vertical"
      tabindex="0"
      on:keydown={handleItemKeydown}
    >
      <slot />
    </div>
  {/if}
</div>

<style>
  .cl-dropdown-menu {
    background: var(--dropdown-bg, var(--background-panel));
    border: var(--dropdown-border, 1px solid var(--border-default-color));
    border-radius: var(--dropdown-radius, var(--radius-interactive));
    box-shadow: var(--dropdown-shadow, 0 2px 6px rgba(0, 0, 0, 0.1));
    padding: var(--dropdown-padding, var(--spacing-2) 0);
    min-width: var(--dropdown-min-width, 10rem);
    z-index: 1000;
    position: absolute;
  }

  .cl-dropdown[data-align='start'] .cl-dropdown-menu {
    left: 0;
  }

  .cl-dropdown[data-align='end'] .cl-dropdown-menu {
    right: 0;
  }

  .cl-dropdown[data-placement='bottom'] .cl-dropdown-menu {
    top: 100%;
    margin-top: var(--dropdown-spacing, var(--spacing-2));
  }

  .cl-dropdown[data-placement='top'] .cl-dropdown-menu {
    bottom: 100%;
    margin-bottom: var(--dropdown-spacing, var(--spacing-2));
  }

</style>



