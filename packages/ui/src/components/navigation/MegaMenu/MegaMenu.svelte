<script lang="ts">
  export let label = 'Menu';
  export let open = false;
  export let onToggle = () => {};
</script>

<div class="cl-megamenu" role="menu" tabindex="0" on:mouseleave={onToggle}>
  <button
    class="cl-megamenu-trigger"
    on:mouseenter={onToggle}
    on:click={onToggle}
    aria-haspopup="true"
    aria-expanded={open}
  >
    {label}
    <svg class="chevron" viewBox="0 0 20 20" fill="currentColor">
      <path d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 011.08 1.04l-4.25 4.25a.75.75 0 01-1.06 0L5.25 8.27a.75.75 0 01-.02-1.06z" />
    </svg>
  </button>

  {#if open}
    <div class="cl-megamenu-panel" role="menu">
      <slot />
    </div>
  {/if}
</div>

<style>
  .cl-megamenu {
    position: relative;
    display: inline-block;
  }

  .cl-megamenu-trigger {
    display: inline-flex;
    align-items: center;
    gap: 0.25rem;
    font-weight: 500;
    padding: 0.5rem 1rem;
    background: none;
    border: none;
    cursor: pointer;
    color: var(--base-font-color);
  }

  .chevron {
    width: 1rem;
    height: 1rem;
    transition: transform 0.2s;
  }

  [aria-expanded='true'] .chevron {
    transform: rotate(180deg);
  }

  .cl-megamenu-panel {
    position: absolute;
    top: 100%;
    left: 0;
    min-width: 16rem;
    max-width: 100vw;
    padding: 1rem;
    background: var(--background-panel, #fff);
    border: 1px solid var(--border-default-color, #ccc);
    box-shadow: var(--shadow-lg);
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(8rem, 1fr));
    gap: 1.5rem;
    z-index: 50;
  }
</style>
