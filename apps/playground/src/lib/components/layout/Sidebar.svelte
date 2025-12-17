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
    
    color: var(--on-surface);

    font-family: var(--base-font-family, var(--type-body-family));
    font-size: var(--base-font-size, var(--type-body-size));
    line-height: var(--base-line-height, var(--type-body-leading));
    letter-spacing: var(--base-letter-spacing, var(--type-body-tracking));

    width: 16rem;
    height: 100%;
    overflow-y: auto;

    padding: var(--spacing-8);
    display: flex;
    flex-direction: column;
    gap: var(--spacing-8);

    border-right: var(--border-width-default) solid
      color-mix(in oklab, var(--on-surface) var(--opacity-border), transparent);
  }


  /* GROUP HEADER */
  .group-header {
    display: flex;
    align-items: center;
    gap: var(--spacing-6);
    width: 100%;

    padding: var(--spacing-3) var(--spacing-2);

    color: var(--on-surface-strong);
    font-weight: var(--type-weight-semibold);

    background: none;
    border: none;
    cursor: pointer;
    text-align: left;

    border-radius: var(--radius-interactive);
    opacity: 0.92;

    transition:
      opacity var(--motion-duration-fast) var(--motion-ease),
      background var(--motion-duration-fast) var(--motion-ease);
  }

  .group-header:hover {
    opacity: 1;
    background: color-mix(in oklab, var(--on-surface) var(--opacity-hover), transparent);
  }

  .group-header:focus-visible {
    outline: var(--focus-width) solid
      color-mix(in oklab, var(--on-surface) var(--opacity-focus), transparent);
    outline-offset: var(--focus-offset-2);
  }

  .group-header :global(.chev) {
    width: 1rem;
    height: 1rem;
    transition: transform 0.18s ease;
    color: var(--on-surface-muted);
  }

  /* LIST */
  .list {
    margin: var(--spacing-1) 0 var(--spacing-3);
    padding: var(--spacing-2) 0;
    list-style: none;
  }

  .link {
    display: block;
    padding: var(--spacing-2) var(--spacing-2);
    padding-left: var(--spacing-4);

    text-decoration: none;
    color: var(--on-surface);
    opacity: 0.92;

    border-radius: var(--radius-interactive);
    font-size: var(--type-body-size);

    transition:
      opacity var(--motion-duration-fast) var(--motion-ease),
      background var(--motion-duration-fast) var(--motion-ease);
  }

  .link:hover {
    opacity: 1;
    background: color-mix(in oklab, var(--on-surface) var(--opacity-hover), transparent);
  }

  .link:focus-visible {
    outline: var(--focus-width) solid
      color-mix(in oklab, var(--on-surface) var(--opacity-focus), transparent);
    outline-offset: var(--focus-offset-2);
  }

  .link.active {
    opacity: 1;
    color: var(--on-surface-strong);
    font-weight: var(--type-weight-medium);
    background: color-mix(in oklab, var(--on-surface) var(--opacity-active), transparent);
  }

  .group + .group {
    margin-top: var(--spacing-3);
  }
</style>









