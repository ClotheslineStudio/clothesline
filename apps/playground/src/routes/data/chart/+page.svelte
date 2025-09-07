<script lang="ts">
  import Chart from '$lib/components/data/Chart/Chart.svelte';

  const chartTypes = ['bar', 'line', 'pie', 'doughnut', 'radar', 'area'] as const;
</script>

<h1 class="text-2xl font-bold mb-4">Chart Component</h1>

<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
  {#each chartTypes as type}
    <div>
      <Chart {type} />
    </div>
  {/each}
</div>
