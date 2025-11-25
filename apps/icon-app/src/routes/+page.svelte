<script lang="ts">
  import { iconRegistry } from '../../../../packages/icons/src/index.ts';

  let selected: typeof allIcons[0] | null = null;
  let search = '';

  // Build an array of metadata objects from the registry
  const allIcons = Object.entries(iconRegistry).map(([name, entry]) => ({
    ...entry.meta,
    component: entry.component
  }));

  // Search filter
  $: filteredIcons = search
    ? allIcons.filter((icon) => {
        const needle = search.toLowerCase();
        return (
          icon.name.toLowerCase().includes(needle) ||
          icon.displayName.toLowerCase().includes(needle) ||
          icon.keywords.some((k) => k.toLowerCase().includes(needle))
        );
      })
    : allIcons;

  function selectIcon(icon: typeof allIcons[0]) {
    selected = icon;
  }
</script>

<style>
  .icon-grid {
    grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  }
</style>

<div class="min-h-screen flex bg-slate-950 text-slate-50">

  <!-- Sidebar -->
  <aside class="hidden md:flex w-64 flex-col border-r border-slate-800 bg-slate-950/80">
    <div class="px-4 py-4 border-b border-slate-800">
      <h1 class="text-lg font-semibold tracking-tight">Clothesline Icons</h1>
      <p class="text-xs text-slate-400 mt-1">
        Browse, search, and inspect your icon set.
      </p>
    </div>
  </aside>

  <!-- Main Column -->
  <div class="flex-1 flex flex-col">

    <!-- Header -->
    <header class="border-b border-slate-800 bg-slate-950/80 backdrop-blur flex items-center gap-4 px-4 py-3">
      <div class="flex-1">
        <div class="text-sm font-medium">Icon Explorer</div>
        <div class="text-xs text-slate-400">
          {filteredIcons.length} icons
        </div>
      </div>

      <div class="w-72">
        <label class="relative block">
          <span class="sr-only">Search icons</span>
          <span class="pointer-events-none absolute inset-y-0 left-2 flex items-center text-xs text-slate-400">
            🔍
          </span>
          <input
            bind:value={search}
            placeholder="Search…"
            class="w-full pl-7 pr-3 py-1.5 rounded-md bg-slate-900 border border-slate-700 text-xs outline-none focus:border-slate-400"
          />
        </label>
      </div>
    </header>

    <!-- Content -->
    <main class="flex-1 flex overflow-hidden">

      <!-- Icon Grid -->
      <section class="flex-1 overflow-auto p-4">
        <div class="grid gap-3 icon-grid">

          {#each filteredIcons as icon}
            <button
              on:click={() => selectIcon(icon)}
              type="button"
              class="group flex flex-col rounded-xl border p-3 text-left transition
              {selected?.name === icon.name
                ? 'border-sky-400 bg-slate-900'
                : 'border-slate-800 bg-slate-950/80 hover:border-slate-400/80 hover:bg-slate-900/80'
              }"
            >
              <div class="flex items-center justify-between mb-2 text-xs">
                <span class="font-medium truncate">{icon.displayName}</span>
                <span class="text-[0.65rem] text-slate-500">v{icon.version}</span>
              </div>

              <!-- Icon Preview -->
              <div class="flex items-center justify-center h-12 text-white">
                <svelte:component this={icon.component} size={32} />
              </div>

              <div class="flex items-center justify-between text-[0.65rem] text-slate-500">
                <span>{icon.variants.join(', ')}</span>
                <span>{icon.sizes.join(', ')} px</span>
              </div>
            </button>
          {/each}

        </div>
      </section>

      <!-- Detail Panel -->
      <aside class="hidden lg:block w-[360px] border-l border-slate-800 bg-slate-950/90">

        {#if selected}
          <div class="h-full flex flex-col px-4 py-4 gap-4 text-xs">

            <header class="space-y-1">
              <div class="flex items-center justify-between gap-2">
                <h2 class="text-sm font-semibold truncate">{selected.displayName}</h2>
                <span class="text-[0.65rem] text-slate-500">v{selected.version}</span>
              </div>
              <p class="text-slate-400">
                {selected.description ?? 'No description.'}
              </p>
            </header>

            <!-- Big preview -->
            <div class="rounded-lg border border-slate-800 bg-slate-900 flex items-center justify-center aspect-square">
              <svelte:component this={selected.component} size={96} />
            </div>

            <!-- Meta -->
            <section class="space-y-2 mt-2">
              <div>
                <span class="block text-slate-400 mb-1 font-medium">Keywords</span>
                <div class="flex flex-wrap gap-1">
                  {#each selected.keywords as kw}
                    <span class="px-1.5 py-0.5 bg-slate-800 rounded text-[0.6rem]">{kw}</span>
                  {/each}
                </div>
              </div>

              <div>
                <span class="block text-slate-400 mb-1 font-medium">Categories</span>
                <div class="flex flex-wrap gap-1">
                  {#each selected.categories as cat}
                    <span class="px-1.5 py-0.5 bg-slate-800 rounded text-[0.6rem]">{cat}</span>
                  {/each}
                </div>
              </div>
            </section>

            <!-- Code snippet -->
            <section class="mt-auto pt-2 border-t border-slate-800 space-y-2">
              <span class="text-[0.7rem] font-medium text-slate-400">Usage</span>
              <div class="rounded-md bg-slate-900 border border-slate-800 px-2 py-2 font-mono text-[0.65rem] text-slate-300 overflow-x-auto">
                &lt;Icon name="{selected.name}" /&gt;
              </div>
            </section>

          </div>

        {:else}

          <div class="h-full flex items-center justify-center text-xs text-slate-500 px-4 text-center">
            Select an icon to view details.
          </div>

        {/if}

      </aside>

    </main>

  </div>
</div>

