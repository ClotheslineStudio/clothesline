<script lang="ts">
  import { page } from '$app/stores';
  import { derived, get } from 'svelte/store';
  import ChevronRight from 'lucide-svelte/icons/chevron-right';

  export let routes: { title: string; path: string }[] = [];
  export let stickyTop = 64; // px offset under header (tweak to your AppBar height)

  const STORAGE_KEY = 'cl_sidebar_state';

  // Group + sort routes by first path segment
  const groupedRoutes = derived(page, ($page) => {
    const map = new Map<string, { title: string; path: string }[]>();
    for (const { title, path } of routes) {
      const [group] = path.replace(/^\//, '').split('/');
      const section = group ? group[0].toUpperCase() + group.slice(1) : 'Misc';
      if (!map.has(section)) map.set(section, []);
      map.get(section)!.push({ title, path });
    }
    // sort items inside each group
    for (const [k, arr] of map.entries()) {
      arr.sort((a, b) => a.title.localeCompare(b.title));
      map.set(k, arr);
    }
    // stable order for groups
    return new Map([...map.entries()].sort((a, b) => a[0].localeCompare(b[0])));
  });

  // Collapsed state per section
  let collapsed: Record<string, boolean> = {};

  // Restore persisted state
  if (typeof localStorage !== 'undefined') {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) collapsed = JSON.parse(raw);
    } catch {}
  }

  // Ensure keys exist; open the section that contains the current path
  $: {
    const currentPath = get(page).url.pathname;
    for (const section of Array.from(get(groupedRoutes).keys())) {
      if (collapsed[section] === undefined) {
        collapsed[section] = true;
      }
      const items = get(groupedRoutes).get(section) || [];
      if (items.some((it) => it.path === currentPath)) {
        collapsed[section] = false; // auto-open current section
      }
    }
  }

  // Persist on change
  $: typeof localStorage !== 'undefined' && localStorage.setItem(STORAGE_KEY, JSON.stringify(collapsed));

  function toggle(section: string) {
    collapsed[section] = !collapsed[section];
  }

  function isActive(path: string, current: string) {
    return current === path;
  }
</script>

<nav
  class="sidebar"
  style={`--sticky-top:${stickyTop}px`}
  aria-label="Section navigation"
>
  {#each Array.from($groupedRoutes.entries()) as [section, items]}
    <section class="section">
      <button
        class="header"
        on:click={() => toggle(section)}
        aria-controls={`section-${section}`}
        aria-expanded={!collapsed[section]}
      >
        <ChevronRight
          class="chevron"
          style="transform: rotate({collapsed[section] ? 0 : 90}deg);"
          aria-hidden="true"
        />
        <span class="header-text">{section}</span>
      </button>

      {#if !collapsed[section]}
        <ul class="list" id={`section-${section}`}>
          {#each items as item}
            {#key item.path}
              <li>
                <a
                  href={item.path}
                  class="link"
                  class:active={isActive(item.path, $page.url.pathname)}
                  aria-current={isActive(item.path, $page.url.pathname) ? 'page' : undefined}
                >
                  <span class="rail" aria-hidden="true"></span>
                  <span class="label">{item.title}</span>
                </a>
              </li>
            {/key}
          {/each}
        </ul>
      {/if}
    </section>
  {/each}
</nav>

<style>
  .sidebar {
    /* theme-aware fallbacks */
    --sb-bg: var(--color-surface-50, #fff);
    --sb-border: var(--color-surface-300, #e6e6e6);
    --sb-head: var(--on-surface-strong);
    --sb-link: var(--on-surface);
    --sb-muted: var(--on-surface-muted);
    --sb-accent: var(--color-secondary-500-vis);
    --sb-accent-50: var(--color-secondary-50);

    position: sticky;
    top: var(--sticky-top, 1004px);
    align-self: start;
    width: 16rem;
    max-height: calc(100vh - var(--sticky-top, 100px));
    overflow: auto;

    padding: var(--spacing-5, 1.25rem);
    background: var(--sb-bg);
    border-right: 0px solid var(--sb-border);
    border-radius: 0 0px 0px 0;
  }

  .section + .section { margin-top: var(--spacing-4, 1rem); }

  .header {
    width: 100%;
    display: flex;
    align-items: center;
    gap: .375rem;
    padding: .375rem 0;
    font-weight: 700;
    letter-spacing: .01em;
    background: none;
    border: none;
    color: var(--sb-head);
    cursor: pointer;
    border-radius: 8px;
  }
  .header:focus-visible {
    outline: 2px solid var(--color-info-500, #06b6d4);
    outline-offset: 2px;
  }
  .header-text { font-size: .875rem; }

  :global(.chevron) {
    width: 1rem;
    height: 1rem;
    transition: transform 0.18s ease;
    flex-shrink: 0;
  }

  .list {
    margin: .25rem 0 .75rem;
    padding: 0;
    list-style: none;
  }

  .link {
    position: relative;
    display: flex;
    align-items: center;
    gap: .5rem;
    padding: .35rem .5rem .35rem .25rem;
    color: var(--sb-link);
    text-decoration: none;
    border-radius: 8px;
    line-height: 1.15;
  }
  .link:hover {
    background: color-mix(in oklab, var(--sb-accent-50) 55%, transparent);
    text-decoration: none;
  }

  /* Left accent rail (hidden by default, visible on active) */
  .link .rail {
    width: 3px;
    height: 1.1rem;
    border-radius: 3px;
    background: transparent;
    translate: 0 1px;
  }

  .link.active {
    background: color-mix(in oklab, var(--sb-accent) 14%, transparent);
    color: var(--sb-link);
    font-weight: 700;
  }
  .link.active .rail {
    background: var(--sb-accent);
    box-shadow: 0 0 0 2px color-mix(in oklab, var(--sb-accent) 25%, transparent);
  }

  .link:focus-visible {
    outline: 2px solid var(--color-info-500, #06b6d4);
    outline-offset: 2px;
  }

  /* Subtle indent for items */
  .label { padding-left: .25rem; }

  /* Scrollbar (WebKit) */
  .sidebar::-webkit-scrollbar { width: 10px; }
  .sidebar::-webkit-scrollbar-thumb {
    background: color-mix(in oklab, var(--sb-border) 80%, var(--sb-head));
    border-radius: 999px;
  }
  .sidebar::-webkit-scrollbar-track { background: transparent; }

  @media (max-width: 1024px) {
    .sidebar { width: 100%; border-right: 0; border-bottom: 1px solid var(--sb-border); border-radius: 0; }
  }
</style>



