<script lang="ts">
  export let items: { label: string; href?: string }[] = [];
  export let className = '';
</script>

<nav class={`cl-breadcrumbs ${className}`} aria-label="Breadcrumb">
  <ol>
    {#each items as item, index (item.href || item.label)}
      <li class="cl-breadcrumb-item">
        {#if index < items.length - 1}
          {#if item.href}
            <a href={item.href} class="cl-breadcrumb-link">{item.label}</a>
          {:else}
            <span class="cl-breadcrumb-link">{item.label}</span>
          {/if}
          <span class="cl-breadcrumb-separator" aria-hidden="true">/</span>
        {:else}
          <span class="cl-breadcrumb-current" aria-current="page">{item.label}</span>
        {/if}
      </li>
    {/each}
  </ol>
</nav>

<style>
  .cl-breadcrumbs {
    font-size: 0.875rem;
    display: flex;
    align-items: center;
    color: var(--text-muted, #666);
  }

  .cl-breadcrumbs ol {
    display: flex;
    flex-wrap: wrap;
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .cl-breadcrumb-item {
    display: flex;
    align-items: center;
  }

  .cl-breadcrumb-link {
    color: var(--text-muted, #666);
    text-decoration: none;
  }

  .cl-breadcrumb-link:hover {
    text-decoration: underline;
    color: var(--color-primary-700, #335);
  }

  .cl-breadcrumb-separator {
    margin: 0 0.5rem;
  }

  .cl-breadcrumb-current {
    font-weight: 600;
    color: var(--text-default, #111);
  }
</style>
