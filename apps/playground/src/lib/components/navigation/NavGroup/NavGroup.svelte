<script lang="ts">
  export let title: string;
  export let open = false;

  let isOpen = open;

  function toggle() {
    isOpen = !isOpen;
  }
</script>

<div class="cl-nav-group">
  <button class="cl-nav-group-header" on:click={toggle} aria-expanded={isOpen}>
    <span>{title}</span>
    <svg
      class:rotate-90={isOpen}
      class="icon transition-transform duration-200"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  </button>

  {#if isOpen}
    <ul class="cl-nav-group-list">
      <slot />
    </ul>
  {/if}
</div>

<style>
  .cl-nav-group {
    margin-bottom: 1rem;
  }

  .cl-nav-group-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    background: none;
    border: none;
    font-weight: 600;
    padding: 0.5rem 1rem;
    cursor: pointer;
    color: var(--text-default-color, #111);
  }

  .cl-nav-group-header:hover {
    background-color: var(--color-surface-100, #f0f0f0);
  }

  .cl-nav-group-list {
    list-style: none;
    padding-left: 1.5rem;
    margin-top: 0.5rem;
  }

  .icon {
    transition: transform 0.2s ease;
  }

  .rotate-90 {
    transform: rotate(90deg);
  }
</style>
