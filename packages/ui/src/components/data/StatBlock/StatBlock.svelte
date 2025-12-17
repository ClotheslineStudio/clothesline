<script lang="ts">
  export let label: string;
  export let value: string | number;
  export let icon: string | null = null;
  export let change: string | null = null; // e.g. "+12%", "-8%"
  export let direction: 'up' | 'down' | null = null;
  export let className = '';
</script>

<div class="cl-statblock {className}">
  {#if icon}
    <div class="cl-statblock-icon" aria-hidden="true">
      <slot name="icon">
        <img src={icon} alt="" />
      </slot>
    </div>
  {/if}

  <div class="cl-statblock-content">
    <div class="cl-statblock-label">{label}</div>
    <div class="cl-statblock-value">{value}</div>

    {#if change}
      <div class="cl-statblock-change {direction}">
        {#if direction === 'up'}
          ⬆
        {:else if direction === 'down'}
          ⬇
        {/if}
        {change}
      </div>
    {/if}
  </div>
</div>

<style>
  .cl-statblock {
    display: flex;
    align-items: center;
    gap: var(--spacing-4, 1rem);
    padding: var(--spacing-4, 1rem);
    border-radius: var(--radius-md, 0.5rem);
    background: var(--background-panel, #fff);
    border: 1px solid var(--border-default-color, #ddd);
    box-shadow: var(--shadow-sm, 0 1px 2px rgba(0, 0, 0, 0.05));
  }

  .cl-statblock-icon img {
    width: 2rem;
    height: 2rem;
  }

  .cl-statblock-content {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  .cl-statblock-label {
    font-size: 0.75rem;
    color: var(--muted-foreground, #666);
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .cl-statblock-value {
    font-size: 1.5rem;
    font-weight: bold;
    color: var(--base-font-color, #111);
  }

  .cl-statblock-change {
    font-size: 0.875rem;
    font-weight: 500;
  }

  .cl-statblock-change.up {
    color: var(--color-success-600, green);
  }

  .cl-statblock-change.down {
    color: var(--color-error-600, red);
  }
</style>
