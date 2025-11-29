<script lang="ts">
  import Customizer from '$lib/components/Customizer.svelte';
  import { iconRegistry } from '../../../../packages/icons/src/index.ts';
  import { selectedIcon } from '$lib/state/selectedIcon';
  import { openPanel } from '$lib/state/panel';
  import type { IconRecord, IconStyle } from '$lib/types/icon';
  import CategoryFilter from '$lib/components/CategoryFilter.svelte';

  let search = '';

  // Customizer state
  let style: IconStyle = 'stroke';
  let color = '#6381F8';
  let secondaryColor = '#6381F8';
  let strokeWidth = 2;
  let size = 24;
  let absoluteStroke = false;
  let selectedCategory: string | null = null;
  let mode = 'light';

  // Build array from registry
  const allIcons: IconRecord[] = Object.entries(iconRegistry).map(([_, entry]) => ({
    ...entry.meta,
    component: entry.component
  }));

  console.log('selectedCategory:', selectedCategory);
console.log('example icon categories:', allIcons[0].categories);

  // Filtered list
$: filteredIcons = allIcons
  .filter((icon) => {
    // ---- CATEGORY FILTER ----
    if (selectedCategory && !icon.categories.includes(selectedCategory)) {
      return false;
    }

    // ---- SEARCH FILTER ----
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

<!-- ========================================================= -->
<!-- ROOT CONTAINER (3-column layout)                         -->
<!-- ========================================================= -->
<div class="flex h-full w-full overflow-hidden">

  <!-- ===================================================== -->
  <!-- LEFT SIDEBAR                                          -->
  <!-- ===================================================== -->
 <!-- LEFT SIDEBAR -->
<aside
  class="hidden md:flex w-72 flex-col border-r border-neutral-200 bg-neutral-50 shrink-0
         max-h-screen overflow-y-auto"
>
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
  <!-- RIGHT PANEL (slides in/out) -->
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

  <!-- Close -->
  <button
    class="absolute right-3 top-3 text-neutral-500 hover:text-neutral-700"
    on:click={() => selectedIcon.set(null)}
  >
    ✕
  </button>

  {#if $selectedIcon}
<div
  class="
    flex flex-col
    p-(--spacing-6)
    gap-(--spacing-6)
    text-(--type-body-size)
  "
>

  <!-- HEADER -->
  <header class="flex flex-col gap-(--spacing-2)">
    <h2 class="text-(--type-heading-size) font-(--type-heading-weight)">
      {$selectedIcon.displayName}
    </h2>

    <p class="text-(--type-caption-size)">
      Version {$selectedIcon.version}
    </p>

    <p class="text-(--type-caption-size)">
      Updated 3 days ago
    </p>

    <!-- svelte-ignore a11y_invalid_attribute -->
    <a href="#" class="text-(--anchor-color) underline">
      Changelog
    </a>

    <!-- Keywords -->
    <div class="flex overflow-x-auto gap-(--spacing-2) pt-(--spacing-2)">
      {#each $selectedIcon.keywords as kw}
        <span
          class="
            px-2 py-1 text-xs
            [background:var(--color-surface-200)]
            rounded-(--radius-badge)
            whitespace-nowrap
          "
        >
          {kw}
        </span>
      {/each}
    </div>

    <!-- Categories -->
    <div class="flex flex-wrap gap-(--spacing-2)">
      {#each $selectedIcon.categories as cat}
        <span
          class="
            px-3 py-1 text-xs font-medium
            [background:var(--color-primary-100-vis)]
            text-(--color-primary-700-vis)
            rounded-(--radius-badge)
          "
        >
          {cat}
        </span>
      {/each}
    </div>
  </header>

  <!-- PREVIEW PANEL -->
  <section
    class="
      relative
      [background:var(--preview-bg)]
      [border:1px_solid_var(--preview-border)]
      rounded-(--radius-card)
      p-(--spacing-8)
      flex items-center justify-center
    "
  >
    <!-- Light/Dark toggle -->
    <button
      on:click={() => mode = mode === 'light' ? 'dark' : 'light'}
      class="
        absolute top-3 right-3
        p-2
        rounded-(--radius-interactive)
        [background:var(--color-surface-0)]
        shadow
      "
    >
      {mode === 'light' ? '🌙' : '☀️'}
    </button>

    <svelte:component
      this={$selectedIcon.component}
      size={64}
      variant={style}
      primaryColor={color}
      secondaryColor={style === 'duotone' ? secondaryColor : color}
      strokeWidth={strokeWidth}
      absoluteStrokeWidth={absoluteStroke}
    />
  </section>

  <!-- SIZE SELECTOR -->
  <section class="flex flex-col gap-(--spacing-2)">
    <h3 class="text-(--type-label-size) font-(--type-label-weight)">
      Sizes
    </h3>

    <div class="flex gap-(--spacing-3)">
      {#each [16, 24, 32, 48] as s}
      <button
        on:click={() => size = s}
        class="
          p-3
          flex items-center justify-center
          [border:1px_solid_var(--border-muted-color)]
          rounded-(--radius-card)
          bg-white hover:[background:var(--color-surface-100)]
        "
      >
        <svelte:component
          this={$selectedIcon.component}
          size={s}
          variant={style}
          primaryColor={color}
          secondaryColor={style === 'duotone' ? secondaryColor : color}
          strokeWidth={strokeWidth}
          absoluteStrokeWidth={absoluteStroke}
        />
      </button>
      {/each}
    </div>
  </section>

  <!-- COPY BUTTONS -->
  <section class="flex gap-(--spacing-4)">
    <button
      class="
        flex-1 py-2
        [border:1px_solid_var(--border-default-color)]
        rounded-(--radius-interactive)
        hover:[background:var(--color-surface-100)]
      "
    >
      Copy SVG
    </button>

    <button
      class="
        flex-1 py-2
        [border:1px_solid_var(--border-default-color)]
        rounded-(--radius-interactive)
        hover:[background:var(--color-surface-100)]
      "
    >
      Copy Svelte
    </button>
  </section>

  <!-- CODE BLOCK -->
  <section class="flex flex-col gap-(--spacing-2)">
    <h3 class="text-(--type-label-size) font-(--type-label-weight)">
      Svelte Usage
    </h3>

    <pre
      class="
        [background:var(--preview-code-bg)]
        text-(--preview-code-color)
        rounded-(--radius-card)
        p-(--preview-code-padding)
        text-sm font-mono overflow-x-auto
      "
    >
&lt;script&gt;
  import &#123; {$selectedIcon.displayName} &#125; from '@clothesline/icons';
&lt;/script&gt;

&lt;{$selectedIcon.displayName} size=&#123;24&#125; strokeWidth=&#123;2&#125; /&gt;
    </pre>
  </section>

  <!-- AUTHORS / CONTRIBUTORS -->
  <section
    class="
      grid grid-cols-2
      gap-(--spacing-6)
      [border-top:1px_solid_var(--border-muted-color)]
      pt-(--spacing-4)
    "
  >
    <!-- Author -->
    <div>
      <h4 class="font-semibold mb-2">Author</h4>
      <div class="flex items-center gap-(--spacing-2)">
        <img src="/avatars/clothesline.png" class="w-8 h-8 rounded-full" alt="clotheslinestudio avatar" />
        <a class="underline" href="https://github.com/clotheslinestudio">
          @clotheslinestudio
        </a>
      </div>
    </div>

    <!-- Contributors -->
    <div>
      <h4 class="font-semibold mb-2">Contributors</h4>

      <div class="flex items-center gap-(--spacing-2)">
        <img src="/avatars/ui-wizard.png" class="w-8 h-8 rounded-full" alt="ui-wizard avatar" />
        <a class="underline" href="https://github.com/ui-wizard">
          @ui-wizard
        </a>
      </div>

      <div class="flex items-center gap-(--spacing-2)">
        <img src="/avatars/svg-master.png" class="w-8 h-8 rounded-full" alt="svg-master avatar" />
        <a class="underline" href="https://github.com/svg-master">
          @svg-master
        </a>
      </div>
    </div>
  </section>

</div>
{/if}


</aside>



</div>



