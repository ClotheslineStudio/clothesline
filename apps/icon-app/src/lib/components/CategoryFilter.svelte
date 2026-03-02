<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import type { IconRecord } from '$lib/types/icon';

  export let icons: IconRecord[] = [];

  const dispatch = createEventDispatcher();

  let categories: { category: string; count: number }[] = [];
  let selected: string | null = null;

  $: {
    const map: Record<string, number> = {};

    for (const icon of icons) {
      for (const cat of icon.categories ?? []) {
        map[cat] = (map[cat] || 0) + 1;
      }
    }

    categories = Object.entries(map)
      .map(([category, count]) => ({ category, count }))
      .sort((a, b) => a.category.localeCompare(b.category));
  }

  function selectCategory(category: string | null) {
    selected = category;
    dispatch('change', { category });
  }
</script>

<div class="category-container">
  <button
    class="category-btn {selected === null ? 'active' : ''}"
    type="button"
    on:click={() => selectCategory(null)}
  >
    All
    <span>{icons.length}</span>
  </button>

  {#each categories as c}
    <button
      class="category-btn {selected === c.category ? 'active' : ''}"
      type="button"
      on:click={() => selectCategory(c.category)}
    >
      {c.category}
      <span>{c.count}</span>
    </button>
  {/each}
</div>

<style>
  .category-container {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-gap-small, var(--spacing-2));
  }

  .category-btn {
    display: flex;
    justify-content: space-between;
    align-items: center;

    width: 100%;
    height: var(--size-control-sm, 2rem);

    padding-inline: var(--spacing-3, 0.75rem);
    padding-block: var(--spacing-2, 0.5rem);

    border-radius: var(--radius-md, 0.5rem);
    border: 1px solid var(--border-color-default, var(--color-surface-300-vis, #cbd5e1));

    background: var(--background-panel, var(--color-surface-100-vis, #f3f4f6));
    color: var(--on-surface, var(--color-surface-900-vis, #111827));

    font-family: var(--type-body-family, system-ui, sans-serif);
    font-size: var(--type-label-size, 0.875rem);
    font-weight: var(--type-weight-medium, 500);

    cursor: pointer;
    transition:
      background-color var(--motion-duration-fast, 150ms) var(--motion-ease, ease-in-out),
      color var(--motion-duration-fast, 150ms) var(--motion-ease, ease-in-out),
      transform 100ms ease-out;
  }

  .category-btn:hover {
    background: color-mix(in oklab, var(--background-panel, #f3f4f6) 86%, var(--on-surface, #111827) 6%);
  }

  .category-btn.active {
    background: var(--primary-subtle, var(--color-primary-100-vis, #dbeafe));
    color: var(--on-surface-strong, var(--color-surface-950-vis, #0f172a));
    border-color: var(--primary, var(--color-primary-500-vis, #3b82f6));
  }

  .category-btn span {
    opacity: 0.85;
    font-size: var(--type-caption-size, 0.75rem);
    color: var(--on-surface-muted, var(--color-surface-700-vis, #475569));
  }
</style>


