<script lang="ts">
  import { onMount } from 'svelte';
  import { theme, mode } from '@clothesline/themes/stores'; // Update path if needed

  export let code: string = '';
  export let showCodeByDefault: boolean = false;

  let showCode = showCodeByDefault;

  const toggleCode = () => (showCode = !showCode);
</script>

<div class="cl-preview-wrapper">
  <div class="cl-preview-header">
    <div class="left">
      <slot name="title" />
    </div>
    <div class="right flex items-center gap-2">
      <select bind:value={$theme}>
        <option value="clothesline">Clothesline</option>
        <option value="milkyway">MilkyWay</option>
        <option value="bigsky">Big Sky</option>
        <!-- Add more as needed -->
      </select>
      <select bind:value={$mode}>
        <option value="light">Light</option>
        <option value="dark">Dark</option>
      </select>
      <button on:click={toggleCode} class="text-sm underline">
        {showCode ? 'Hide Code' : 'Show Code'}
      </button>
    </div>
  </div>

  <div class="cl-preview-content p-4 rounded border bg-[var(--background-panel)]">
    <slot />
  </div>

  {#if showCode}
    <pre class="cl-preview-code mt-2 rounded bg-black text-white text-sm overflow-auto p-4">
      <code>{code}</code>
    </pre>
  {/if}
</div>

<style>
  .cl-preview-wrapper {
    border: 1px solid var(--border-default-color, #ccc);
    border-radius: var(--radius-md, 0.5rem);
    background: var(--background-default, #f9f9f9);
    margin-bottom: 2rem;
  }

  .cl-preview-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: var(--spacing-3, 0.75rem);
    border-bottom: 1px solid var(--border-default-color, #ccc);
    background: var(--background-panel, #f1f1f1);
    border-top-left-radius: var(--radius-md);
    border-top-right-radius: var(--radius-md);
  }

  .cl-preview-content {
    transition: all 0.3s ease;
  }
</style>

