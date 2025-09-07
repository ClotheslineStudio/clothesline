<script>
  import { createEventDispatcher, onMount } from 'svelte';

  // Props (JS)
  /** @type {boolean | undefined} */
  export let open = undefined;           // controlled or undefined
  export let defaultOpen = false;        // uncontrolled initial
  export let align = 'center';           // 'start' | 'center' | 'end'
  export let placement = 'bottom';       // 'top' | 'bottom' | 'left' | 'right'
  export let offset = 8;
  export let arrow = true;
  export let role = 'dialog';            // 'dialog' | 'tooltip' (panel role only)
  export let ariaLabel = 'Popover';
  export let closeOnInteractOutside = true;
  export let trapFocus = false;
  export const portal = false;           // reserved for future portal impl
  export let zIndex = '';

  const dispatch = createEventDispatcher();
  /** @type {HTMLElement | null} */
  let triggerEl = null;
  /** @type {HTMLElement | null} */
  let panelEl = null;
  let isOpen = open ?? defaultOpen;
  /** @type {HTMLElement | null} */
  let lastFocused = null;

  $: if (open !== undefined) isOpen = open;

  /**
   * @param {boolean} val
   */
  function setOpen(val) {
    if (open === undefined) isOpen = val; // uncontrolled only mutates internal
    dispatch(val ? 'open' : 'close');
    dispatch('toggle', { open: val });
    if (val) {
      lastFocused = document.activeElement instanceof HTMLElement ? document.activeElement : null;
      if (trapFocus) queueMicrotask(() => panelEl && panelEl.focus());
    } else {
      if (lastFocused && lastFocused.focus) lastFocused.focus();
    }
  }

  function toggle() { setOpen(!isOpen); }

  /**
   * @param {MouseEvent} e
   */
function onDocumentClick(e) {
    if (!isOpen || !closeOnInteractOutside) return;

    const t = e.target;
    // Narrow to a DOM Node; bail if not one (e.g., SVGAnimatedString edge cases)
    if (!(t instanceof Node)) return;

    if (panelEl && panelEl.contains(t)) return;
    if (triggerEl && triggerEl.contains(t)) return;

    setOpen(false);
    dispatch('interactOutside');
  }

  /**
   * @param {KeyboardEvent} e
   */
  function onKeydown(e) {
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

  // Valid aria-haspopup mapping (tooltip isn’t allowed → use "true" as string)
  $: hasPopup = role === 'dialog' ? 'dialog' : 'true';

  // Style strings to avoid nested template parsing weirdness
  $: rootStyle = zIndex ? `--popover-z:${zIndex};` : '';
  $: panelStyle = `--offset:${offset}px;`;
</script>

<div class="cl-popover" data-align={align} data-placement={placement} style={rootStyle}>
  <button
    type="button"
    bind:this={triggerEl}
    on:click={toggle}
    aria-haspopup={role === 'dialog' ? 'dialog' : 'menu'}
    aria-expanded={isOpen}
    aria-label={ariaLabel}
    class="cl-popover-trigger"
  >
    <slot name="trigger" />
  </button>

  {#if isOpen}
    <div
      bind:this={panelEl}
      role={role}
      aria-label={ariaLabel}
      class="cl-popover-panel"
      {...(trapFocus && role === 'dialog' ? { tabindex: 0 } : {})}
      style={panelStyle}
    >
      {#if arrow}
        <div class="cl-popover-arrow" data-placement={placement} aria-hidden="true"></div>
      {/if}
      <slot />
    </div>
  {/if}
</div>

<style>
  .cl-popover { position: relative; display: inline-block; }

  .cl-popover-panel {
    position: absolute;
    min-width: 12rem;
    max-width: min(90vw, 28rem);
    background: var(--popover-bg, var(--background-panel));
    border: var(--popover-border, 1px solid var(--border-default-color));
    border-radius: var(--popover-radius, var(--radius-interactive));
    box-shadow: var(--popover-shadow, 0 8px 20px rgba(0,0,0,0.12));
    padding: var(--popover-padding, var(--spacing-5));
    z-index: var(--popover-z, 1000);
    outline: none;
  }

  /* Placement */
  .cl-popover[data-placement="bottom"] .cl-popover-panel { top: calc(100% + var(--offset, 8px)); left: 50%; transform: translateX(-50%); }
  .cl-popover[data-placement="top"]    .cl-popover-panel { bottom: calc(100% + var(--offset, 8px)); left: 50%; transform: translateX(-50%); }
  .cl-popover[data-placement="left"]   .cl-popover-panel { right: calc(100% + var(--offset, 8px)); top: 50%; transform: translateY(-50%); }
  .cl-popover[data-placement="right"]  .cl-popover-panel { left: calc(100% + var(--offset, 8px)); top: 50%; transform: translateY(-50%); }

  /* Align (cross-axis) */
  .cl-popover[data-placement="top"][data-align="start"]    .cl-popover-panel,
  .cl-popover[data-placement="bottom"][data-align="start"] .cl-popover-panel { left: 0; transform: none; }
  .cl-popover[data-placement="top"][data-align="end"]      .cl-popover-panel,
  .cl-popover[data-placement="bottom"][data-align="end"]   .cl-popover-panel { right: 0; left: auto; transform: none; }

  .cl-popover[data-placement="left"][data-align="start"]   .cl-popover-panel { top: 0; transform: none; }
  .cl-popover[data-placement="left"][data-align="end"]     .cl-popover-panel { bottom: 0; top: auto; transform: none; }
  .cl-popover[data-placement="right"][data-align="start"]  .cl-popover-panel { top: 0; transform: none; }
  .cl-popover[data-placement="right"][data-align="end"]    .cl-popover-panel { bottom: 0; top: auto; transform: none; }

  /* Arrow */
  .cl-popover-arrow {
    width: 0; height: 0; position: absolute;
    border: calc(var(--popover-arrow-size, 8px)) solid transparent;
  }
  .cl-popover[data-placement="bottom"] .cl-popover-arrow {
    top: calc(-1 * var(--popover-arrow-size, 8px));
    left: 50%; transform: translateX(-50%);
    border-bottom-color: var(--background-panel);
  }
  .cl-popover[data-placement="top"] .cl-popover-arrow {
    bottom: calc(-1 * var(--popover-arrow-size, 8px));
    left: 50%; transform: translateX(-50%);
    border-top-color: var(--background-panel);
  }
  .cl-popover[data-placement="left"] .cl-popover-arrow {
    right: calc(-1 * var(--popover-arrow-size, 8px));
    top: 50%; transform: translateY(-50%);
    border-left-color: var(--background-panel);
  }
  .cl-popover[data-placement="right"] .cl-popover-arrow {
    left: calc(-1 * var(--popover-arrow-size, 8px));
    top: 50%; transform: translateY(-50%);
    border-right-color: var(--background-panel);
  }
</style>
