<script>
  let filteredIcons = [];
  let selectedCategory = '';
  let openCustomizer = false;
</script>

<div class="flex flex-col gap-(--spacing-4)">

  <!-- Title -->
  <div>
    <h1 class="text-lg font-semibold">Clothesline Icons</h1>
    <p class="text-sm text-(--color-text-muted)">
      {filteredIcons?.length ?? '—'} icons
    </p>
  </div>

  <!-- Quick Navigation -->
  <div class="flex flex-col gap-(--spacing-2)">
    <button class="text-left text-sm px-(--spacing-3) py-(--spacing-2) rounded-md
                   hover:bg-(--color-surface-200)">
      All Icons
    </button>

    <button class="text-left text-sm px-(--spacing-3) py-(--spacing-2) rounded-md
                   hover:bg-(--color-surface-200)">
      Favorites
    </button>

    <button class="text-left text-sm px-(--spacing-3) py-(--spacing-2) rounded-md
                   hover:bg-(--color-surface-200)">
      Recent
    </button>
  </div>

  <!-- Category Filters -->
  <div class="flex flex-col gap-(--spacing-2)">
    <h2 class="text-xs uppercase tracking-wide text-(--color-text-muted)">
      Categories
    </h2>

    {#each [
      'System', 'Actions', 'Content', 'Status', 'Files',
      'Data', 'Reactions', 'Nature', 'Navigation',
      'Weather', 'Travel', 'Outdoors', 'User'
    ] as category}
      <button
        on:click={() => selectedCategory = category}
        class="text-left px-(--spacing-3) py-(--spacing-2) rounded-md
               hover:bg-(--color-surface-200)
               {selectedCategory === category ? 'bg-(--color-surface-300) font-semibold' : ''}"
      >
        {category}
      </button>
    {/each}
  </div>

  <!-- Customizer Button -->
  <div class="mt-auto pt-(--spacing-4) border-t border-(--color-surface-300)">
    <button
      on:click={() => openCustomizer = !openCustomizer}
      class="w-full px-(--spacing-3) py-(--spacing-2) rounded-md
             bg-(--color-surface-200) hover:bg-(--color-surface-300)
             text-sm font-medium"
    >
      {openCustomizer ? 'Close Customizer' : 'Open Customizer'}
    </button>
  </div>

</div>
