<script lang="ts">
  import { page } from '$app/stores';
  import { derived } from 'svelte/store';
  
  import ChevronRight from 'lucide-svelte/icons/chevron-right';


  // rest of your sidebar logic...

  export let routes: { title: string; path: string }[] = [];

  const groupedRoutes = derived(page, () => {
    const map = new Map<string, typeof routes>();
    for (const { title, path } of routes) {
      const [group] = path.replace(/^\//, '').split('/');
      const section = group.charAt(0).toUpperCase() + group.slice(1);
      if (!map.has(section)) map.set(section, []);
      map.get(section)!.push({ title, path });
    }
    return map;
  });

  // Track open/closed state per section — start fully collapsed
  let collapsed: Record<string, boolean> = {};

  $: {
    for (const section of Array.from($groupedRoutes.keys())) {
      if (collapsed[section] === undefined) collapsed[section] = true;
    }
  }

  function toggle(section: string) {
    collapsed[section] = !collapsed[section];
  }
</script>

<nav class="sidebar">
  {#each Array.from($groupedRoutes.entries()) as [section, items]}
    <div class="section">
      <button class="header" on:click={() => toggle(section)}>
        <ChevronRight
          class="chevron"
          style="transform: rotate({collapsed[section] ? 0 : 90}deg);"
        />
        {section}
      </button>

      {#if !collapsed[section]}
        <ul class="list">
          {#each items as item}
            <li>
              <a href={item.path} class="link">{item.title}</a>
            </li>
          {/each}
        </ul>
      {/if}
    </div>
  {/each}
</nav>

<style>
  .sidebar {
    width: 16rem;
    min-height: 100vh;
    padding: var(--spacing-5);
    background: var(--sidebar-bg);
    border-right: 1px solid var(--sidebar-border);
  }

  .section + .section {
    margin-top: var(--spacing-6);
  }

  .header {
    width: 100%;
    display: flex;
    align-items: center;
    gap: var(--spacing-2);
    padding: var(--spacing-2) 0;
    font-weight: 600;
    background: none;
    border: none;
    color: var(--sidebar-header-color);
    cursor: pointer;
  }

  :global(.chevron) {
    width: 1rem;
    height: 1rem;
    transition: transform 0.2s ease;
    margin-right: var(--spacing-2);
    flex-shrink: 0;
  }

  .list {
    margin: var(--spacing-2) 0 var(--spacing-4);
    padding: 0 0 0 var(--spacing-4); /* Indent sublist */
    list-style: none;
  }

  .link {
    display: block;
    padding: var(--spacing-1) 0;
    color: var(--sidebar-link-color);
    text-decoration: none;
  }

  .link:hover {
    text-decoration: underline;
  }
</style>


