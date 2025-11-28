<script lang="ts">
  import '../app.css';
  import favicon from '$lib/assets/favicon.svg';
  import { Header } from '@clothesline/ui';

  let { children } = $props();
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
</svelte:head>

<Header bordered elevated maxWidth="page">
  <svelte:fragment slot="left">
    <div class="font-bold text-lg flex items-center gap-2">
      <img src={favicon} class="w-6 h-6" alt="Clothesline Icons" />
      Clothesline Icons
    </div>
  </svelte:fragment>

  <svelte:fragment slot="right">
    <a href="https://github.com/clotheslinestudio/icons" target="_blank">
      GitHub
    </a>
  </svelte:fragment>
</Header>

<!-- Just render page content. No LayoutShell, no slots. -->
{@render children()}





