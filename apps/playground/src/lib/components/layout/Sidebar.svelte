<script lang="ts">
  import { page } from '$app/stores';
  import { derived } from 'svelte/store';
  import ChevronRight from 'lucide-svelte/icons/chevron-right';

  export let routes: { title: string; path: string }[] = [];
  export let defaultGroupsOpen = false;

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

  let open: Record<string, boolean> = {};

  $: {
    const entries = Array.from($grouped.entries());
    const next: Record<string, boolean> = { ...open };

    for (const [section] of entries) {
      if (next[section] === undefined) next[section] = defaultGroupsOpen;
    }

    for (const key of Object.keys(next)) {
      if (!entries.some(([section]) => section === key)) delete next[key];
    }

    open = next;
  }

  function toggle(section: string) {
    open = { ...open, [section]: !open[section] };
  }
</script>

<nav class="sidebar" aria-label="Sidebar navigation">
  <div class="sidebar__scroll">
    {#each Array.from($grouped.entries()) as [section, items] (section)}
      <section class="group">
        <button
          class="group-header"
          type="button"
          aria-expanded={open[section] ? 'true' : 'false'}
          on:click={() => toggle(section)}
        >
          <ChevronRight
            class="chev"
            style={`transform: rotate(${open[section] ? 90 : 0}deg);`}
            aria-hidden="true"
          />
          <span>{section}</span>
        </button>

        {#if open[section]}
          <ul class="list">
            {#each items as item (item.path)}
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
  </div>
</nav>

<style>
  /* ==========================================================================
     Sidebar token contract (local defaults)
     - Prefer layout semantics.
     - Fall back to spacing scale so it works before/without layout tokens.
     ========================================================================== */
  .sidebar {
    /* Geometry is owned by AppShell. Sidebar is content-only. */
    height: 100%;
    min-height: 0;
    min-width: 0;

    /* Core spacing semantics */
    --sidebar-inset: var(--layout-inset, var(--spacing-6));
    --sidebar-gap: var(--layout-gap, var(--spacing-4));

    /* Section rhythm */
    --sidebar-group-gap: var(--sidebar-gap);
    --sidebar-group-header-gap: var(--spacing-6, 1.25rem); /* icon-to-label spacing */
    --sidebar-group-header-py: var(--spacing-3, 0.5rem);
    --sidebar-group-header-px: var(--spacing-2, 0.25rem);

    /* Link sizing */
    --sidebar-link-py: var(--spacing-2, 0.25rem);
    --sidebar-link-px: var(--spacing-2, 0.25rem);
    --sidebar-link-indent: var(--spacing-4, 0.75rem);

    /* Typography */
    color: var(--on-surface);
    font-family: var(--base-font-family, var(--type-body-family));
    font-size: var(--base-font-size, var(--type-body-size));
    line-height: var(--base-line-height, var(--type-body-leading));
    letter-spacing: var(--base-letter-spacing, var(--type-body-tracking));

    /* No padding/border here—AppShell sidebar wrapper should control that */
    padding: 0;
    border: 0;

    display: flex;
    flex-direction: column;
  }

  /* Scroll region: this is what you wanted (“side scroll to menu”) */
  .sidebar__scroll {
    flex: 1;
    min-height: 0;
    overflow: auto;

    display: flex;
    flex-direction: column;
    gap: var(--sidebar-group-gap);

    /* If AppShell padding is removed later, this keeps sidebar usable */
    padding: 0;

    /* Prevent accidental horizontal scrollbar; links truncate by default */
    min-width: 0;
  }

  /* GROUP HEADER */
  .group-header {
    display: flex;
    align-items: center;
    gap: var(--sidebar-group-header-gap);
    width: 100%;

    padding: var(--sidebar-group-header-py) var(--sidebar-group-header-px);

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
    background: color-mix(in oklab, var(--on-surface) calc(var(--opacity-hover) * 100%), transparent);
  }

  .group-header:focus-visible {
    outline: var(--focus-width) solid
      color-mix(in oklab, var(--on-surface) calc(var(--opacity-focus) * 100%), transparent);
    outline-offset: var(--focus-offset-2);
  }

  .group-header :global(.chev) {
    width: 1rem;
    height: 1rem;
    transition: transform 0.18s ease;
    color: var(--on-surface-muted);
    flex: 0 0 auto;
  }

  /* LIST */
  .list {
    margin: var(--spacing-1, 0.125rem) 0 var(--spacing-3, 0.5rem);
    padding: var(--spacing-2, 0.25rem) 0;
    list-style: none;
  }

  .link {
    display: block;
    padding: var(--sidebar-link-py) var(--sidebar-link-px);
    padding-left: var(--sidebar-link-indent);

    text-decoration: none;
    color: var(--on-surface);
    opacity: 0.92;

    border-radius: var(--radius-interactive);
    font-size: var(--type-body-size);

    /* Default: truncate instead of horizontal scroll */
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    transition:
      opacity var(--motion-duration-fast) var(--motion-ease),
      background var(--motion-duration-fast) var(--motion-ease);
  }

  .link:hover {
    opacity: 1;
    background: color-mix(in oklab, var(--on-surface) calc(var(--opacity-hover) * 100%), transparent);
  }

  .link:focus-visible {
    outline: var(--focus-width) solid
      color-mix(in oklab, var(--on-surface) calc(var(--opacity-focus) * 100%), transparent);
    outline-offset: var(--focus-offset-2);
  }

  .link.active {
    opacity: 1;
    color: var(--on-surface-strong);
    font-weight: var(--type-weight-medium);
    background: color-mix(in oklab, var(--on-surface) calc(var(--opacity-active) * 100%), transparent);
  }

  .group + .group {
    margin-top: var(--spacing-3, 0.5rem);
  }
</style>










