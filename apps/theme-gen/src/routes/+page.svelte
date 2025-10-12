<script lang="ts">
  import ThemeGenerator from '$lib/ThemeGenerator.svelte';
</script>

<div class="min-h-screen bg-gradient-to-b from-zinc-50 to-white dark:from-zinc-950 dark:to-zinc-900 text-zinc-900 dark:text-zinc-100">
  <div class="mx-auto max-w-7xl px-6 py-8">
    <header class="flex items-center justify-between gap-4 mb-8">
      <div class="flex items-center gap-3">
        <div class="size-9 rounded-xl bg-[--on-surface-100]"></div>
        <div>
          <h1 class="text-2xl font-semibold tracking-tight">Theme Generator</h1>
          <p class="text-sm text-zinc-500">OKLCH ramps • typography • spacing • radii</p>
        </div>
      </div>
      <nav class="flex gap-2">
        <button class="btn" type="button" on:click={() => console.log('Docs soon')}>Docs</button>
        <a class="btn" href="https://github.com/ClotheslineStudio" target="_blank" rel="noopener">GitHub</a>
      </nav>
    </header>

    <ThemeGenerator />
  </div>
</div>



