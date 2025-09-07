<script lang="ts">
  export let label: string = '';
  export let value: string | number = '';
  export let icon: string | null = null; // You can pass a component or emoji
  export let trend: 'up' | 'down' | null = null;
  export let trendValue: string | null = null;
  export let className = '';
</script>

<div class="cl-metric {className}">
  {#if icon}
    <span class="cl-metric-icon">{icon}</span>
  {/if}

  <div class="cl-metric-value">{value}</div>

  {#if label}
    <div class="cl-metric-label">{label}</div>
  {/if}

  {#if trend}
    <div class="cl-metric-trend {trend}">
      {trend === 'up' ? '▲' : '▼'} {trendValue}
    </div>
  {/if}
</div>

<style>
  .cl-metric {
    display: flex;
    flex-direction: column;
    align-items: start;
    padding: var(--spacing-4, 1rem);
    border-radius: var(--radius-md, 0.5rem);
    background: var(--background-panel, #fff);
    color: var(--base-font-color, #111);
    box-shadow: var(--shadow-sm, 0 1px 2px rgba(0, 0, 0, 0.05));
  }

  .cl-metric-icon {
    font-size: 1.5rem;
    color: var(--color-primary-600, #4f46e5);
    margin-bottom: 0.5rem;
  }

  .cl-metric-value {
    font-size: 1.75rem;
    font-weight: 600;
    line-height: 1.2;
  }

  .cl-metric-label {
    font-size: 0.875rem;
    color: var(--muted-foreground, #666);
    margin-top: 0.25rem;
  }

  .cl-metric-trend {
    margin-top: 0.5rem;
    font-size: 0.875rem;
    font-weight: 500;
  }

  .cl-metric-trend.up {
    color: var(--color-success-600, green);
  }

  .cl-metric-trend.down {
    color: var(--color-error-600, red);
  }
</style>
