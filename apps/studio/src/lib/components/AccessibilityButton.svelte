<script>
  import { onMount } from 'svelte';
  import AccessibilityPanel from './AccessibilityPanel.svelte';
  import { writable } from 'svelte/store';
  import { Accessibility } from '@clothesline/icons';

  const showPanel = writable(false);
</script>

<div class="fixed bottom-4 right-4 z-50">
  <button
    on:click={() => showPanel.update(v => !v)}
    class="bg-(--color-accent-500) text-white font-semibold px-4 py-2 rounded-full shadow hover:bg-(--color-accent-600) transition"
  >
    <Accessibility class="h-5 w-5" />
  </button>

  {#if $showPanel}
    <AccessibilityPanel on:close={() => showPanel.set(false)} />
  {/if}
</div>
