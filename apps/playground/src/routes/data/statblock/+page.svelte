<script lang="ts">
  import StateBlock from '$lib/components/data/StatBlock/StatBlock.svelte';

  const iconUrl = 'https://cdn.jsdelivr.net/gh/tabler/tabler-icons/icons/circle.svg'; // placeholder SVG
</script>

<h1 class="text-2xl font-bold mb-4">StateBlock Component</h1>

<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

  <StateBlock
    label="CPU Usage"
    value="76%"
    icon={iconUrl}
    change="+4%"
    direction="up"
  />

  <StateBlock
    label="Disk Space"
    value="450GB"
    icon={iconUrl}
    change="-10%"
    direction="down"
  />

  <StateBlock
    label="Processes"
    value="128"
    icon={iconUrl}
  />

  <StateBlock
    label="Memory Usage"
    value="68%"
    change="+2%"
    direction="up"
  />

  <StateBlock
    label="Network Latency"
    value="35ms"
    direction="down"
    change="-5%"
  />

</div>
