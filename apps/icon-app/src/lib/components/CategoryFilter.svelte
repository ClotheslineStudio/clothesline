<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import type { IconRecord } from '$lib/types/icon';

  export let icons: IconRecord[] = [];

  const dispatch = createEventDispatcher();

  // Reactive category list
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


<!-- Sidebar category list -->
<div class="category-container">
  <button
    class="category-btn {selected === null ? 'active' : ''}"
    on:click={() => selectCategory(null)}>
    All
    <span>{icons.length}</span>
  </button>

  {#each categories as c}
    <button
      class="category-btn {selected === c.category ? 'active' : ''}"
      on:click={() => selectCategory(c.category)}>
      {c.category}
      <span>{c.count}</span>
    </button>
  {/each}
</div>

<style>
  .category-container {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  .category-btn {
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 2rem;
    padding: 0.5rem 0.75rem;
    border-radius: 0.5rem;
    background: var(--surface-100, #f3f3f3);
    font-size: 0.875rem;
    cursor: pointer;
    transition: background 0.15s;
  }

  .category-btn:hover {
    background: var(--surface-200, #e7e7e7);
  }

  .category-btn.active {
    background: var(--accent-100, #dfe9ff);
    color: var(--accent-900, #1a49c4);
  }

  .category-btn span {
    opacity: 0.7;
  }
</style>

