<script lang="ts">
  import Customizer from '$lib/components/Customizer.svelte';
  import { iconRegistry } from '../../../../packages/icons/src/index.ts';
  import { selectedIcon } from '$lib/state/selectedIcon';
  import { openPanel } from '$lib/state/panel';
  import type { IconRecord, IconStyle } from '$lib/types/icon';

  let search = '';

  // Customizer state
  let style: IconStyle = 'stroke';
  let color = '#6381F8';
  let secondaryColor = '#6381F8';
  let strokeWidth = 2;
  let size = 24;
  let absoluteStroke = false;

  // Build array from registry
  const allIcons: IconRecord[] = Object.entries(iconRegistry).map(([_, entry]) => ({
    ...entry.meta,
    component: entry.component
  }));

  // Filtered list
  $: filteredIcons =
    search.length > 0
      ? allIcons.filter((icon) => {
          const n = search.toLowerCase();
          return (
            icon.name.toLowerCase().includes(n) ||
            icon.displayName.toLowerCase().includes(n) ||
            icon.keywords.some((kw) => kw.toLowerCase().includes(n))
          );
        })
      : allIcons;

  function selectIcon(icon: IconRecord) {
    selectedIcon.set(icon);
    openPanel();
  }
</script>


<style>
  .icon-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
    gap: 1rem;
  }
</style>

<!-- ========================================================= -->
<!-- ROOT CONTAINER (3-column layout)                         -->
<!-- ========================================================= -->
<div class="flex h-full w-full overflow-hidden">

  <!-- ===================================================== -->
  <!-- LEFT SIDEBAR                                          -->
  <!-- ===================================================== -->
 <!-- LEFT SIDEBAR -->
<aside class="hidden md:flex w-72 flex-col border-r border-neutral-200 bg-neutral-50 shrink-0">
  <div class="px-4 py-4 border-b border-neutral-200">
    <h1 class="text-base font-semibold">Clothesline Icons</h1>
    <p class="text-xs text-neutral-500 mt-1">
      Browse, search, and inspect your icon set.
    </p>
  </div>

  <div class="p-4">
    <Customizer
      bind:style
      bind:color
      bind:secondaryColor
      bind:strokeWidth
      bind:size
      bind:absolute={absoluteStroke}
    />
  </div>

  <!-- later: categories can go below here -->
</aside>


  <!-- ===================================================== -->
  <!-- MAIN CONTENT (grid section)                           -->
  <!-- ===================================================== -->
  <main class="flex-1 flex flex-col overflow-hidden">

    <!-- Header inside content -->
    <header class="flex items-center justify-between px-4 py-3 border-b border-neutral-200 bg-white">
      <div class="flex flex-col">
        <span class="text-sm font-medium">Icon Explorer</span>
        <span class="text-xs text-neutral-500">{filteredIcons.length} icons</span>
      </div>

      <div class="w-64">
        <input
          bind:value={search}
          placeholder="Search icons…"
          class="w-full px-3 py-1.5 rounded-md border border-neutral-300 text-sm"
        />
      </div>
    </header>

    <!-- ICON GRID -->
    <section class="flex-1 overflow-auto p-4">
      <div class="icon-grid">
        {#each filteredIcons as icon}
          <button
            on:click={() => selectIcon(icon)}
            class="border border-neutral-300 rounded-lg p-3 text-left bg-white hover:bg-neutral-100 transition"
          >
            <div class="text-sm font-medium truncate mb-2">{icon.displayName}</div>
            <div class="flex items-center justify-center h-10">
 <svelte:component
  this={icon.component}
  size={size}
  primaryColor={color}
  secondaryColor={style === 'duotone' ? secondaryColor : color}
  strokeWidth={strokeWidth}
  absoluteStrokeWidth={absoluteStroke}
  variant={style}
/>




            </div>
          </button>
        {/each}
      </div>
    </section>

  </main>

  <!-- ===================================================== -->
  <!-- RIGHT PANEL                                           -->
  <!-- ===================================================== -->
  <aside class="hidden lg:flex w-80 flex-col border-l border-neutral-200 bg-neutral-50 shrink-0">

    {#if $selectedIcon}
      <div class="p-4 overflow-auto flex-1 space-y-4">

        <h2 class="text-base font-semibold">{$selectedIcon.displayName}</h2>
        <p class="text-sm text-neutral-600">{$selectedIcon.description ?? 'No description.'}</p>

        <div class="border border-neutral-300 rounded-lg p-4 flex items-center justify-center bg-white">
          <svelte:component
  this={$selectedIcon.component}
  size={size}
  strokeWidth={absoluteStroke ? strokeWidth : undefined}
  color={color}
  secondaryColor={style === 'duotone' ? secondaryColor : undefined}
  variant={style}
/>

        </div>

        <div>
          <h3 class="text-xs font-semibold mb-1">Keywords</h3>
          <div class="flex flex-wrap gap-1">
            {#each $selectedIcon.keywords as kw}
              <span class="text-xs px-2 py-0.5 rounded bg-neutral-200">{kw}</span>
            {/each}
          </div>
        </div>

        <div>
          <h3 class="text-xs font-semibold mb-1">Categories</h3>
          <div class="flex flex-wrap gap-1">
            {#each $selectedIcon.categories as cat}
              <span class="text-xs px-2 py-0.5 rounded bg-neutral-200">{cat}</span>
            {/each}
          </div>
        </div>

      </div>
    {/if}

  </aside>

</div>



