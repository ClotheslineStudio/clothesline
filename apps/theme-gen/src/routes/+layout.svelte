<script lang="ts">
  import '../app.css';
  import { browser } from '$app/environment';

  let mode: 'light' | 'dark' = 'light';

  // run only in the browser
  $: if (browser) {
    document.documentElement.setAttribute('data-mode', mode);
  }
</script>

<svelte:head>
  <link rel="icon" href="/favicon.svg" />
  <link
    rel="preconnect"
    href="https://fonts.googleapis.com"
  />
  <link
    rel="preconnect"
    href="https://fonts.gstatic.com"
    crossorigin="anonymous"
  />
  <link
    href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap"
    rel="stylesheet"
  />
  <title>Theme Gen • SvelteKit</title>
</svelte:head>

<div class="min-h-screen">
  <slot />
</div>

<div class="fixed bottom-4 right-4 flex gap-2">
  <button class="btn" on:click={() => (mode = 'light')}>Light</button>
  <button class="btn" on:click={() => (mode = 'dark')}>Dark</button>
</div>
