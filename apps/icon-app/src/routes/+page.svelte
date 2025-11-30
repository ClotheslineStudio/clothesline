<script lang="ts">
  import Customizer from '$lib/components/Customizer.svelte';
  import CategoryFilter from '$lib/components/CategoryFilter.svelte';
  import { iconRegistry } from '../../../../packages/icons/src/index';
  import { selectedIcon } from '$lib/state/selectedIcon';
  import { openPanel } from '$lib/state/panel';

  import type { IconRecord, IconStyle } from '$lib/types/icon';

  let search = '';
  let style: IconStyle = 'stroke';
  let color = '#6381F8';
  let secondaryColor = '#6381F8';
  let strokeWidth = 2;
  let size = 24;
  let absoluteStroke = false;
  let selectedCategory: string | null = null;
  let mode = 'light';

  /** Build an array from registry */
  const allIcons: IconRecord[] = Object.entries(iconRegistry).map(([_, entry]) => ({
    ...entry.meta,
    component: entry.component
  }));

  /** Filtering logic */
  $: filteredIcons =
    allIcons.filter((icon) => {
      if (selectedCategory && !icon.categories.includes(selectedCategory)) {
        return false;
      }
      if (search.length > 0) {
        const q = search.toLowerCase();
        return (
          icon.name.toLowerCase().includes(q) ||
          icon.displayName.toLowerCase().includes(q) ||
          icon.keywords.some((kw) => kw.toLowerCase().includes(q))
        );
      }
      return true;
    });

  function selectIcon(icon: IconRecord) {
    selectedIcon.set(icon);
    openPanel();
  }

  $: panelOpen = $selectedIcon !== null;
</script>

<style>
  .icon-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
    gap: 1rem;
  }
</style>

<div class="flex h-full w-full overflow-hidden">

  <!-- LEFT SIDEBAR -->
  <aside class="hidden md:flex w-72 flex-col border-r border-neutral-200 bg-neutral-50 shrink-0 max-h-screen overflow-y-auto">
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

    <div class="mt-4 px-4">
      <h2 class="text-xs font-semibold mb-2">Categories</h2>

      <CategoryFilter
        icons={allIcons}
        on:change={(e) => (selectedCategory = e.detail.category)}
      />
    </div>
  </aside>


  <!-- MAIN CONTENT -->
  <main class="flex-1 flex flex-col overflow-hidden">

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
                strokeWidth={strokeWidth}
                absoluteStrokeWidth={absoluteStroke}
                primaryColor={color}
                secondaryColor={style === 'duotone' ? secondaryColor : color}
                variant={style}
              />
            </div>
          </button>
        {/each}
      </div>
    </section>

  </main>


  <!-- RIGHT PANEL -->
  <aside
    class="
      fixed right-0 top-[calc(56px)]
      w-96 h-[calc(100vh-56px)]
      bg-neutral-50 border-l border-neutral-200 shadow-xl
      overflow-y-auto z-40
      transform transition-transform duration-300 ease-in-out
    "
    class:translate-x-full={!$selectedIcon}
    class:translate-x-0={$selectedIcon}
  >
    <button
      class="absolute right-3 top-3 text-neutral-500 hover:text-neutral-700"
      on:click={() => selectedIcon.set(null)}
    >
      ✕
    </button>

    {#if $selectedIcon}
      <div class="p-6 flex flex-col gap-6">

        <header class="flex flex-col gap-2">
          <h2 class="text-lg font-semibold">{$selectedIcon.displayName}</h2>
          <p class="text-xs text-neutral-500">
            Version {$selectedIcon.version}
          </p>
        </header>

        <!-- BIG PREVIEW -->
        <div class="border rounded-lg p-6 bg-white flex items-center justify-center">
          <svelte:component
            this={$selectedIcon.component}
            size={64}
            strokeWidth={strokeWidth}
            absoluteStrokeWidth={absoluteStroke}
            primaryColor={color}
            secondaryColor={style === 'duotone' ? secondaryColor : color}
            variant={style}
          />
        </div>

        <!-- KEYWORDS -->
        <section>
          <h3 class="text-xs font-semibold mb-2">Keywords</h3>
          <div class="flex flex-wrap gap-2">
            {#each $selectedIcon.keywords as kw}
              <span class="px-2 py-1 text-xs bg-neutral-200 rounded">{kw}</span>
            {/each}
          </div>
        </section>

        <!-- CATEGORIES -->
        <section>
          <h3 class="text-xs font-semibold mb-2">Categories</h3>
          <div class="flex flex-wrap gap-2">
            {#each $selectedIcon.categories as cat}
              <span class="px-2 py-1 text-xs bg-neutral-200 rounded">{cat}</span>
            {/each}
          </div>
        </section>

      </div>
    {/if}
  </aside>

</div>




