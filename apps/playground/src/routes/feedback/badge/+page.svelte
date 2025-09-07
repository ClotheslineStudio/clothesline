<script lang="ts">
  import Badge from '$lib/components/feedback/Badge/Badge.svelte';

  const colors = ['primary', 'secondary', 'success', 'warning', 'error', 'info'];
  const sizes = ['sm', 'md', 'lg'] as const;
</script>

<h1 class="text-2xl font-bold mb-4">Badge Component</h1>

<div class="space-y-6">
  {#each sizes as size}
    <div>
      <h2 class="text-lg font-semibold mb-2 capitalize">Size: {size}</h2>
      <div class="flex flex-wrap gap-3 items-center">
        {#each colors as color}
          <Badge {color} {size}>
            {color}
          </Badge>
        {/each}
      </div>
    </div>
  {/each}
</div>
