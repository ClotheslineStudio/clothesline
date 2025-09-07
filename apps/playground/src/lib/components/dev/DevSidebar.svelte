<script lang="ts">
  import { playgroundRoutes } from '../../routes';
</script>

<nav class="flex flex-col gap-2 text-sm">
  {#each playgroundRoutes as { href, label }}
    <a
      href={href}
      class="px-3 py-2 rounded hover:bg-[var(--color-surface-200)] text-[var(--base-font-color)] transition-colors"
    >
      {label}
    </a>
  {/each}
</nav>


