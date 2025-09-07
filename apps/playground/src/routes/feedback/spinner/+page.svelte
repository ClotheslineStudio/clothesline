<script lang="ts">
  import Spinner from '$lib/components/feedback/Spinner/Spinner.svelte';

  const sizes = ['sm', 'md', 'lg'] as const;
</script>

<h1 class="text-2xl font-bold mb-4">Spinner Component</h1>

<div class="flex flex-wrap items-center gap-8">
  {#each sizes as size}
    <div class="flex flex-col items-center gap-2">
      <Spinner {size} label={`Loading (${size})`} />
      <span class="text-sm">{size}</span>
    </div>
  {/each}
</div>
