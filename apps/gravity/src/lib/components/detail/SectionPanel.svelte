<script lang="ts">
  export let title: string;
  export let count: number = 0;
  export let emptyText: string = 'Nothing here yet.';
  export let hint: string | undefined;
</script>

<section class="panel" aria-label={title}>
  <header class="panel__header">
  <div class="panel__titleRow">
    <div class="panel__titleLeft">
      <h2 class="panel__title">{title}</h2>
      <span class="panel__count" aria-label={`${count} items`}>{count}</span>
    </div>

    {#if $$slots.actions}
      <div class="panel__actions">
        <slot name="actions" />
      </div>
    {/if}
  </div>

  {#if hint}
    <p class="panel__hint">{hint}</p>
  {/if}
</header>

  <div class="panel__body">
    {#if count === 0}
      <div class="panel__empty" role="status" aria-live="polite">
        {#if $$slots.empty}
          <slot name="empty" />
        {:else}
          {emptyText}
        {/if}
      </div>
    {:else}
      <slot />
    {/if}
  </div>
</section>

<style>
  .panel {
    border: 1px solid var(--gp-border, rgba(255,255,255,0.12));
    background: var(--gp-surface, rgba(255,255,255,0.03));
    border-radius: 12px;
    overflow: clip;
  }
  .panel__header {
    padding: 12px 14px;
    border-bottom: 1px solid var(--gp-border, rgba(255,255,255,0.12));
  }
  .panel__titleRow {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
  }
  .panel__title {
    margin: 0;
    font-size: 14px;
    letter-spacing: 0.2px;
  }
  .panel__count {
    font-size: 12px;
    padding: 2px 8px;
    border-radius: 999px;
    border: 1px solid var(--gp-border, rgba(255,255,255,0.12));
    background: rgba(255,255,255,0.04);
  }
  .panel__hint {
    margin: 6px 0 0;
    font-size: 12px;
    opacity: 0.8;
  }
  .panel__body {
    padding: 12px 14px;
  }
  .panel__empty {
    font-size: 13px;
    opacity: 0.75;
    padding: 10px 0;
  }
    .panel__titleLeft {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    min-width: 0;
  }

  .panel__actions {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    flex-shrink: 0;
  }
</style>
