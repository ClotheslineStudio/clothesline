<script lang="ts">
  import '../app.css';
  import favicon from '$lib/assets/favicon.svg';
  import { Header } from '@clothesline/ui';

  // NEW: pull in setContext + registry key + icon defs
  import { setContext } from 'svelte';
  // Adjust this import path to wherever ICON_REGISTRY_KEY is exported from in your UI kit
 

  let { children } = $props();


</script>

<svelte:head>
  <link rel="icon" href={favicon} />
</svelte:head>

<!-- ========================================== -->
<!-- GLOBAL APP LAYOUT SHELL                    -->
<!-- ========================================== -->

<div class="min-h-screen bg-neutral-50 flex flex-col">

  <!-- HEADER (full width) -->
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

  <!-- ========================================== -->
  <!-- MAIN CONTAINER                             -->
  <!-- ========================================== -->
  <main
    class="
      flex-1
      w-full
      mx-auto
      max-w-screen-2xl
      px-6
      py-6
      relative
    "
  >
    {@render children()}
  </main>
</div>







