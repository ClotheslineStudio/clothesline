<script>
  import { onMount } from 'svelte';
  import AccessibilityPanel from './AccessibilityPanel.svelte';
  import { writable } from 'svelte/store';
  import { Accessibility } from '@clothesline/icons';

  const showPanel = writable(false);
</script>

<div style="position: fixed; bottom: var(--spacing-4, 1rem); right: var(--spacing-4, 1rem); z-index: 50;">
  <button
    on:click={() => showPanel.update(v => !v)}
    style="
      background: var(--color-accent-500, #f59e42);
      color: var(--on-accent, #fff);
      font-weight: var(--base-font-weight, 600);
      width: 3rem;
      height: 3rem;
      border-radius: 50%;
      box-shadow: var(--elevation-2, 0 4px 12px rgba(0,0,0,0.10));
      transition: background 0.2s;
      border: none;
      outline: none;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      padding: 0;
    "
    on:mouseover={(e) => e.currentTarget.style.background = 'var(--color-accent-600, #ea580c)'}
    on:mouseout={(e) => e.currentTarget.style.background = 'var(--color-accent-500, #f59e42)'}
    on:focus={(e) => e.currentTarget.style.background = 'var(--color-accent-600, #ea580c)'}
    on:blur={(e) => e.currentTarget.style.background = 'var(--color-accent-500, #f59e42)'}
    aria-label="Accessibility options"
  >
    <Accessibility style="height: 1.5rem; width: 1.5rem;" />
  </button>

  {#if $showPanel}
    <AccessibilityPanel on:close={() => showPanel.set(false)} />
  {/if}
</div>
