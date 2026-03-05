<script lang="ts">
  export type BuilderTab = 'Preview' | 'Ramps' | 'Code' | 'Accessibility';

  const tabs: BuilderTab[] = ['Preview', 'Ramps', 'Code', 'Accessibility'];

  let {
    active,
    onChange
  }: {
    active: BuilderTab;
    onChange: (tab: BuilderTab) => void;
  } = $props();
</script>

<nav class="surface-card tabs p-2" aria-label="Theme Builder Tabs">
  {#each tabs as tab}
    <button
      type="button"
      class="tab"
      class:tab--active={active === tab}
      onclick={() => onChange(tab)}
    >
      {tab}
    </button>
  {/each}
</nav>

<style>
  .tabs {
    display: flex;
    flex-wrap: nowrap;
    gap: 0.34rem;
    border-radius: 0.82rem;
    background: color-mix(in oklab, var(--background-elevation-2, var(--color-surface-100-vis)) 74%, transparent);
  }

  .tab {
    flex: 1 1 0;
    border: 1px solid color-mix(in oklab, var(--on-surface) 10%, transparent);
    border-radius: 999px;
    padding: 0.36rem 0.76rem;
    font-size: 0.78rem;
    font-weight: 700;
    color: var(--on-surface-muted, var(--color-surface-700));
    text-align: center;
    transition: border-color 120ms ease, background 120ms ease, color 120ms ease, transform 120ms ease;
  }

  .tab:hover {
    transform: translateY(-1px);
    background: color-mix(in oklab, var(--color-surface-200) 74%, transparent);
    border-color: color-mix(in oklab, var(--on-surface) 24%, transparent);
  }

  .tab--active {
    background: color-mix(in oklab, var(--primary, var(--color-primary-600-vis)) 20%, var(--color-surface-50-vis, white));
    color: var(--color-primary-900, var(--on-primary));
    border-color: color-mix(in oklab, var(--primary, var(--color-primary-600-vis)) 40%, transparent);
    box-shadow: inset 0 1px 0 color-mix(in oklab, white 42%, transparent);
  }
</style>
