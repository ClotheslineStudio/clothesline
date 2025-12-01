<script lang="ts">
  import Customizer from '$lib/components/Customizer.svelte';
  import CategoryFilter from '$lib/components/CategoryFilter.svelte';
  import { iconRegistry } from '@clothesline/icons';

  import IconDetailPanel from '$lib/components/IconDetailPanel.svelte';
  import type { IconRecord, IconStyle } from '$lib/types/icon';

  // Search + filters
  let search = '';
  let selectedCategory: string | null = null;

  // Icon rendering options
  let style: IconStyle = 'stroke';
  let color = '#6381F8';
  let secondaryColor = '#6381F8';
  let strokeWidth = 2;
  let size = 24;
  let absoluteStroke = false;

  // Selected icon for right panel
  let selected: IconRecord | null = null;

  // Build array from registry (runtime data)
  const allIcons: IconRecord[] = Object.values(iconRegistry).map((entry) => ({
    ...entry.meta,
    component: entry.component,
    contributors: 'contributors' in entry.meta ? (entry.meta.contributors as string[]) : [],
    updatedAt: 'updatedAt' in entry.meta ? (entry.meta as any).updatedAt : ''
  }));

  // Filtering logic
  $: filteredIcons =
    allIcons.filter((icon) => {
      if (selectedCategory && !icon.categories.includes(selectedCategory)) {
        return false;
      }

      const trimmed = search.trim();
      if (trimmed.length > 0) {
        const q = trimmed.toLowerCase();
        return (
          icon.name.toLowerCase().includes(q) ||
          icon.displayName.toLowerCase().includes(q) ||
          icon.keywords.some((kw) => kw.toLowerCase().includes(q))
        );
      }
      return true;
    });

  function selectIcon(icon: IconRecord) {
    selected = icon;
  }

  function closePanel() {
    selected = null;
  }

  $: panelOpen = selected !== null;
</script>

<style>
  /* Icon grid: fixed-width cards, no outer “panel” */
  .icon-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(90px, 90px));
    gap: var(--spacing-3, 0.75rem);
    justify-content: flex-start;
    align-content: flex-start;
  }
</style>

<div class="flex gap-6">
  <!-- LEFT SIDEBAR (its own scroll, not wrapping the grid) -->
  <aside
    class="
      hidden md:flex
      w-72 shrink-0 flex-col
      border-r border-[color:var(--color-surface-200)]
      bg-[color:var(--color-surface-50)]
      h-[calc(100vh-56px)] sticky top-[56px]
      overflow-y-auto
      pt-[var(--spacing-4,1rem)]
      pb-[var(--spacing-6,1.5rem)]
    "
  >
    <div class="px-[var(--spacing-4,1rem)]">
      <Customizer
        bind:style
        bind:color
        bind:secondaryColor
        bind:strokeWidth
        bind:size
        bind:absolute={absoluteStroke}
      />
    </div>

    <div class="mt-6 px-[var(--spacing-4,1rem)]">
      <h2 class="text-xs font-semibold mb-2 text-[color:var(--color-surface-700)]">
        Categories
      </h2>

      <CategoryFilter
        icons={allIcons}
        on:change={(e) => (selectedCategory = e.detail.category)}
      />
    </div>
  </aside>

  <!-- MAIN CONTENT (normal page scroll) -->
  <main class="flex-1">
    <!-- Local header -->
    <header
      class="
        mb-4
        flex items-center justify-between
        border-b border-[color:var(--color-surface-200)]
        pb-[var(--spacing-3,0.75rem)]
      "
    >
      <div class="flex flex-col">
        <span class="text-sm font-medium text-[color:var(--color-surface-900)]">
          Icon Explorer
        </span>
        <span class="text-xs text-[color:var(--color-surface-600)]">
          {filteredIcons.length} icons
        </span>
      </div>

      <div class="w-64">
        <input
          bind:value={search}
          placeholder="Search icons…"
          class="
            w-full
            px-[var(--spacing-3,0.75rem)]
            py-[var(--spacing-2,0.5rem)]
            rounded-md
            border border-[color:var(--color-surface-300)]
            bg-[color:var(--color-surface-0,#ffffff)]
            text-sm
            focus:outline-none
            focus-visible:ring-2
            focus-visible:ring-[color:var(--color-primary-500-vis)]
            focus-visible:ring-offset-1
          "
        />
      </div>
    </header>

    <!-- ICON GRID (no internal scroll, page scrolls instead) -->
    <section class="pb-[var(--spacing-10,2.5rem)]">
      <div class="icon-grid">
        {#each filteredIcons as icon}
          <button
            type="button"
            on:click={() => selectIcon(icon)}
            class="
              group relative
              flex h-16 w-16 items-center justify-center
              rounded-lg
              border border-[color:var(--color-surface-200)]
              bg-[color:var(--color-surface-0,#ffffff)]
              hover:bg-[color:var(--color-surface-100)]
              transition
            "
          >
            <svelte:component
              this={icon.component}
              size={size}
              strokeWidth={strokeWidth}
              absoluteStrokeWidth={absoluteStroke}
              primaryColor={color}
              secondaryColor={style === 'duotone' ? secondaryColor : color}
              variant={style}
            />

            <!-- Tooltip with icon name -->
            <div
              class="
                pointer-events-none
                absolute left-1/2 top-full mt-1
                -translate-x-1/2
                whitespace-nowrap
                rounded-md px-2 py-1
                bg-[color:var(--color-surface-900)]
                text-[11px] text-[color:var(--color-surface-50)]
                opacity-0 group-hover:opacity-100
                shadow-lg
              "
            >
              {icon.displayName}
            </div>
          </button>
        {/each}
      </div>
    </section>
  </main>

  <!-- RIGHT DETAIL PANEL (unchanged behavior) -->
  <aside
    class="
      fixed right-0 top-[56px]
      w-lg h-[calc(100vh-56px)]
      bg-[color:var(--color-surface-50)]
      border-l border-[color:var(--color-surface-200)]
      shadow-xl
      overflow-y-auto z-40
      transform transition-transform duration-300 ease-in-out
    "
    class:translate-x-full={!panelOpen}
    class:translate-x-0={panelOpen}
  >
    <button
      class="absolute right-3 top-3 text-[color:var(--color-surface-600)] hover:text-[color:var(--color-surface-900)]"
      type="button"
      on:click={closePanel}
    >
      ✕
    </button>

    {#if selected}
      <IconDetailPanel
        icon={selected}
        {style}
        {color}
        {secondaryColor}
        {strokeWidth}
        {size}
        {absoluteStroke}
      />
    {/if}
  </aside>
</div>








