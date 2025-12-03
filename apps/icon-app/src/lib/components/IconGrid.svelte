<script lang="ts">
  import IconCard from './IconCard.svelte';

  export let icons: any[] = [];
  export let onSelect: (icon: any) => void = () => {};
</script>

<div
  class="
    grid 
    gap-4
    grid-cols-2 
    sm:grid-cols-4 
    md:grid-cols-6 
    lg:grid-cols-8
  "
>
  {#each icons as icon}
    <IconCard {icon} on:select={() => onSelect(icon)} />
  {/each}
</div>

