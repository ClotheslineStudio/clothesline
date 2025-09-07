<script lang="ts">
  export let isOpen = false;
  export let onToggle = () => {};

  function handleKeydown(e: KeyboardEvent) {
    if (e.key === 'Escape') onToggle();
  }
</script>

{#if isOpen}
  <div
    class="cl-mobile-nav-overlay"
    on:click={() => onToggle()}
    on:keydown={handleKeydown}
    role="button"
    aria-label="Close mobile navigation"
    tabindex="0"
  ></div>
{/if}

<nav
  class="cl-mobile-nav"
  class:cl-mobile-nav-open={isOpen}
  aria-hidden={!isOpen}
>
  <div class="cl-mobile-nav-header">
    <button class="cl-mobile-nav-close" on:click={() => onToggle()} aria-label="Close menu">
      ✕
    </button>
  </div>
  <div class="cl-mobile-nav-content">
    <slot />
  </div>
</nav>

<style>
  .cl-mobile-nav-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 50;
  }

  .cl-mobile-nav {
    position: fixed;
    top: 0;
    right: 0;
    width: 80%;
    max-width: 300px;
    height: 100%;
    background: var(--background-panel, white);
    box-shadow: -4px 0 12px rgba(0, 0, 0, 0.1);
    transform: translateX(100%);
    transition: transform 0.3s ease;
    z-index: 60;
    display: flex;
    flex-direction: column;
  }

  .cl-mobile-nav-open {
    transform: translateX(0%);
  }

  .cl-mobile-nav-header {
    display: flex;
    justify-content: flex-end;
    padding: 1rem;
  }

  .cl-mobile-nav-close {
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
  }

  .cl-mobile-nav-content {
    padding: 1rem;
    flex: 1;
    overflow-y: auto;
  }
</style>
