<script lang="ts">
  import Metric from '$lib/components/data/Metric/Metric.svelte';
</script>

<h1 class="text-2xl font-bold mb-4">Metric Component</h1>

<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

  <Metric value="94%" label="Uptime" />

  <Metric value="7.2K" label="Visitors" icon="👥" />

  <Metric
    value="$12.4K"
    label="Revenue"
    icon="💰"
    trend="up"
    trendValue="+3.5%"
  />

  <Metric
    value="4.9"
    label="App Rating"
    icon="⭐"
    trend="down"
    trendValue="-0.2"
  />

  <Metric value="0" label="Incidents" />

</div>