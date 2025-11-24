<script lang="ts">
  import { page } from '$app/stores';
  import { derived, get } from 'svelte/store';
  import ChevronRight from 'lucide-svelte/icons/chevron-right';

  export let routes: { title: string; path: string }[] = [];

  // Group by first segment
  const grouped = derived(page, () => {
    const map = new Map<string, { title: string; path: string }[]>();

    for (const r of routes) {
      const seg = r.path.replace(/^\//, '').split('/')[0] || 'Misc';
      const section = seg.toUpperCase();

      if (!map.has(section)) map.set(section, []);
      map.get(section)!.push(r);
    }

    return map;
  });

  // Collapsed state
  let collapsed: Record<string, boolean> = {};

  function toggle(section: string) {
    collapsed[section] = !collapsed[section];
  }
</script>

<nav class="sidebar">
  {#each Array.from($grouped.entries()) as [section, items]}
    <section class="group">
      <button class="group-header" on:click={() => toggle(section)}>
        <ChevronRight
          class="chev"
          style={`transform: rotate(${collapsed[section] ? 0 : 90}deg);`}
        />
        <span>{section}</span>
      </button>

      {#if !collapsed[section]}
        <ul class="list">
          {#each items as item}
            <li>
              <a
                href={item.path}
                class="link"
                class:active={$page.url.pathname === item.path}
              >
                {item.title}
              </a>
            </li>
          {/each}
        </ul>
      {/if}
    </section>
  {/each}
</nav>

<style>
  .sidebar {
    background: var(--sidebar-bg);
    border-right: none;
    padding: var(--spacing-8);
    gap: var(--spacing-8);
    width: 16rem;
    height: 100%;
    overflow-y: auto;
    font-family: var(--type-body-family);
  }

  /* GROUP HEADER */
  .group-header {
    display: flex;
    align-items: center;
    gap: var(--spacing-6);
    width: 100%;
    padding: var(--spacing-3) 0;
    color: var(--sidebar-header-color);
    font-weight: var(--type-weight-semibold);
    background: none;
    border: none;
    cursor: pointer;
    text-align: left;
  }

  .group-header :global(.chev) {
    width: 1rem;
    height: 1rem;
    transition: transform 0.18s ease;
    color: var(--text-muted);
  }

  /* LIST */
  .list {
    margin: var(--spacing-1) 0 var(--spacing-3);
    padding: var(spacing-2) 0;
    list-style: none;
  }

  .link {
    display: block;
    padding: var(--spacing-2) 0;
    padding-left: var(--spacing-4);
    text-decoration: none;
    color: var(--sidebar-link-color);
    border-radius: var(--radius-sm);
    font-size: var(--type-scale-base);
  }

  .link:hover {
    color: var(--base-font-color);
  }

  .link.active {
    color: var(--base-font-color);
    font-weight: var(--type-weight-medium);
  }

  .group + .group {
    margin-top: var(--spacing-3);
  }
</style>








