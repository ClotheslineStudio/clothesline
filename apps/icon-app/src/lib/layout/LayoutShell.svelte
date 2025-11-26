<script lang="ts">
  export let showRightPanel = false;
</script>

<div class="grid grid-cols-[280px_1fr] h-full relative">
  
  <!-- LEFT SIDEBAR -->
  <aside class="border-r border-(--color-surface-300) bg-(--color-surface-100) p-4 overflow-y-auto">
    <slot name="sidebar" />
  </aside>

  <!-- MAIN -->
  <main class="p-6 overflow-y-auto">
    <slot />
  </main>

  <!-- RIGHT PANEL -->
  {#if showRightPanel}
    <div class="absolute right-0 top-0 w-[420px] h-full bg-(--color-surface-50) border-l border-(--color-surface-300) p-4 shadow-xl overflow-y-auto">
      <slot name="right" />
    </div>
  {/if}
</div>

