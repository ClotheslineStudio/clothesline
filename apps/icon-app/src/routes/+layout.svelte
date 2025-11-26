<script lang="ts">
  import LayoutShell from '$lib/layout/LayoutShell.svelte';
  import { Header } from '@clothesline/ui';
  import favicon from '$lib/assets/favicon.svg';

  let { children } = $props();

  let sidebar;
  let right;
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
</svelte:head>

<Header bordered elevated maxWidth="page">
  <svelte:fragment slot="left">
    <div class="font-bold text-lg flex items-center gap-2">
      <img src={favicon} class="w-6 h-6" alt="Clothesline Icons logo" />
      Clothesline Icons
    </div>
  </svelte:fragment>

  <svelte:fragment slot="right">
    <a href="https://github.com/clotheslinestudio/icons" target="_blank">
      GitHub
    </a>
  </svelte:fragment>
</Header>

<LayoutShell>
  <svelte:fragment slot="sidebar">
    {sidebar}
  </svelte:fragment>
  
  {@render children()}
  
  <svelte:fragment slot="right">
    {right}
  </svelte:fragment>
</LayoutShell>





