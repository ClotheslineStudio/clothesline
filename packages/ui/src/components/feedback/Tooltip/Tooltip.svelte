<script lang="ts">
  import { onMount, onDestroy } from 'svelte';

  export let text = '';
  export let position: 'top' | 'bottom' | 'left' | 'right' = 'top';
  export let className = '';

  let open = false;
  let anchorEl: HTMLElement | null = null;
  let tipEl: HTMLElement | null = null;

  const gap = 8; // px
  let coords = { top: 0, left: 0 };

  function show() { open = true; queueMicrotask(updatePosition); }
  function hide() { open = false; }

  function updatePosition() {
    if (!anchorEl || !tipEl) return;
    const a = anchorEl.getBoundingClientRect();
    const t = tipEl.getBoundingClientRect();

    let top = 0, left = 0;
    switch (position) {
      case 'top':
        top = a.top - t.height - gap;
        left = a.left + a.width / 2 - t.width / 2;
        break;
      case 'bottom':
        top = a.bottom + gap;
        left = a.left + a.width / 2 - t.width / 2;
        break;
      case 'left':
        top = a.top + a.height / 2 - t.height / 2;
        left = a.left - t.width - gap;
        break;
      case 'right':
        top = a.top + a.height / 2 - t.height / 2;
        left = a.right + gap;
        break;
    }
    // keep on screen a bit
    const vw = window.innerWidth, vh = window.innerHeight;
    left = Math.max(4, Math.min(left, vw - t.width - 4));
    top  = Math.max(4, Math.min(top,  vh - t.height - 4));
    coords = { top, left };
  }

  const listeners: [string, EventListenerOrEventListenerObject, boolean][] = [
    ['scroll', updatePosition, true],
    ['resize', updatePosition, true]
  ];

  onMount(() => {
    for (const [evt, fn, cap] of listeners) window.addEventListener(evt, fn as any, cap);
  });
  onDestroy(() => {
    for (const [evt, fn, cap] of listeners) window.removeEventListener(evt, fn as any, cap);
  });

  const tipId = `tip-${Math.random().toString(36).slice(2)}`;
</script>

<span
  bind:this={anchorEl}
  class="cl-tooltip-anchor {className}"
  on:mouseenter={show}
  on:mouseleave={hide}
  on:focus={show}
  on:blur={hide}
  aria-describedby={text ? tipId : undefined}
  role="button"
  tabindex="0"
>
  <slot />
</span>

{#if text && open}
  <div
    bind:this={tipEl}
    id={tipId}
    role="tooltip"
    class="cl-tooltip"
    style={`position:fixed; top:${coords.top}px; left:${coords.left}px;`}
  >
    {text}
  </div>
{/if}

<style>
  .cl-tooltip-anchor { display: inline-flex; position: relative; }
  .cl-tooltip {
    background-color: var(--tooltip-bg, #333);
    color: var(--color-surface-0, #fff);
    padding: 0.25rem 0.5rem;
    font-size: 0.75rem;
    border-radius: var(--radius-sm, 0.25rem);
    pointer-events: none;
    z-index: 1000; /* above preview borders */
    box-shadow: 0 2px 8px rgba(0,0,0,.2);
    max-width: min(280px, 90vw);
    white-space: nowrap;
  }
</style>

