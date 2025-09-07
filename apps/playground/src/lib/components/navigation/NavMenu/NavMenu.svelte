<script lang="ts">
  export let items: { label: string; href: string }[] = [];
  export let orientation: 'horizontal' | 'vertical' = 'horizontal';
</script>

<nav class="cl-nav-menu {orientation}">
  <ul>
    {#each items as item}
      <li>
        <a href={item.href} class="cl-nav-link">
          {item.label}
        </a>
      </li>
    {/each}
  </ul>
</nav>

<style>
  .cl-nav-menu {
    display: flex;
    padding: 0.5rem 1rem;
  }

  .cl-nav-menu.vertical {
    flex-direction: column;
    align-items: flex-start;
  }

  .cl-nav-menu.horizontal {
    flex-direction: row;
    gap: var(--spacing-4, 1rem);
  }

  .cl-nav-link {
    display: inline-block;
    padding: 0.5rem 0;
    font-weight: 500;
    color: var(--nav-link-color, var(--color-primary-800, #1e3a8a));
    text-decoration: none;
    transition: color 0.2s ease;
  }

  .cl-nav-link:hover {
    color: var(--nav-link-hover-color, var(--color-primary-600, #2563eb));
  }

  .cl-nav-link:focus {
    outline: 2px solid var(--color-primary-400, #60a5fa);
    outline-offset: 2px;
  }
</style>
