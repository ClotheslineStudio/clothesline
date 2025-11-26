<script lang="ts">
  import { iconRegistry } from '../../../../packages/icons/src/index.ts';
  import { selectedIcon } from '$lib/state/selectedIcon';
  import { openPanel } from '$lib/state/panel';

  export let sidebar;
  export let right;

  let search = '';

  const allIcons = Object.entries(iconRegistry).map(([_, entry]) => ({
    ...entry.meta,
    component: entry.component
  }));

  $: filteredIcons =
    search.length
      ? allIcons.filter((i) => i.name.toLowerCase().includes(search.toLowerCase()))
      : allIcons;

  function selectIcon(icon: typeof allIcons[0]) {
    selectedIcon.set(icon);
    openPanel();
  }

  // provide sidebar fragment
  sidebar = () => `
    <h1 class="text-lg font-semibold mb-1">Clothesline Icons</h1>
    <p class="text-sm text-neutral-600">Browse, search, and inspect.</p>
  `;

  // provide right panel fragment
  right = () => $selectedIcon ? `
    <h2 class="text-base font-semibold mb-2">${$selectedIcon.displayName}</h2>
    <div class="border p-6 rounded mb-4 bg-white">
      <svelte:component this={$selectedIcon.component} size={80} />
    </div>
  ` : '';
</script>

<!-- main content -->
<div>
  <div class="flex justify-between items-center mb-4">
    <h2 class="text-base font-semibold">Icon Explorer</h2>

    <input
      bind:value={search}
      placeholder="Search icons…"
      class="w-64 px-3 py-1.5 border rounded"
    />
  </div>

  <div class="grid grid-cols-[repeat(auto-fill,minmax(140px,1fr))] gap-3">
    {#each filteredIcons as icon}
      <button
        on:click={() => selectIcon(icon)}
        class="border rounded p-3 bg-white hover:bg-neutral-100"
      >
        <div class="text-sm font-medium mb-1">{icon.displayName}</div>
        <div class="flex justify-center items-center h-10">
          <svelte:component this={icon.component} size={28} />
        </div>
      </button>
    {/each}
  </div>
</div>





