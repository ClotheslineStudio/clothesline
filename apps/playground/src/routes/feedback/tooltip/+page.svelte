<script lang="ts">
  import Tooltip from '$lib/components/feedback/Tooltip/Tooltip.svelte';

  const positions = ['top', 'right', 'bottom', 'left'] as const;
</script>

<h1 class="text-2xl font-bold mb-4">Tooltip Component</h1>

<div class="grid grid-cols-2 md:grid-cols-4 gap-6 place-items-center text-center">

  {#each positions as position}
    <Tooltip text={`Tooltip on ${position}`} position={position}>
      <button class="px-4 py-2 rounded border bg-white shadow text-sm">
        Hover {position}
      </button>
    </Tooltip>
  {/each}

</div>
