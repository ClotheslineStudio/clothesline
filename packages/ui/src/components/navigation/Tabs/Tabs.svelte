<script lang="ts">
  export let tabs: { id: string; label: string }[] = [];
  export let activeTab: string = '';
  export let onChange: (id: string) => void = () => {};

  function handleClick(id: string) {
    onChange(id);
  }
</script>

<div class="cl-tabs" role="tablist">
  {#each tabs as tab}
    <button
      role="tab"
      aria-selected={tab.id === activeTab}
      class="cl-tab {tab.id === activeTab ? 'active' : ''}"
      on:click={() => handleClick(tab.id)}
    >
      {tab.label}
    </button>
  {/each}
</div>

<style>
  .cl-tabs {
    display: flex;
    gap: var(--spacing-2, 0.5rem);
    border-bottom: 1px solid var(--border-default-color, #ccc);
    padding-bottom: 0.5rem;
  }

  .cl-tab {
    background: transparent;
    border: none;
    padding: 0.5rem 1rem;
    font-weight: 500;
    color: var(--color-primary-700, #1d4ed8);
    border-radius: var(--radius-sm, 0.25rem) 0.25rem 0 0;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .cl-tab:hover {
    background-color: var(--color-surface-100, #f1f5f9);
  }

  .cl-tab.active {
    background-color: var(--color-surface-200, #e2e8f0);
    border-bottom: 2px solid var(--color-primary-500, #3b82f6);
    font-weight: 600;
  }
</style>
