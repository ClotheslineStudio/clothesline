<script lang="ts">
  import DevSidebar from './DevSidebar.svelte';
</script>

<div class="flex h-screen w-screen" style="background: var(--color-surface-100); color: var(--color-surface-900);">


  <!-- Sidebar -->
  <aside class="w-64 border-r bg-[--surface-100] p-4">
    <DevSidebar />
  </aside>

  <!-- Main content -->
  <main class="flex-1 p-6 overflow-auto">
    <slot />
  </main>
</div>
