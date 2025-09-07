<script lang="ts">
  export let type: 'bar' | 'line' | 'pie' | 'doughnut' | 'radar' | 'area' = 'bar';
  export const data: any = {};
  export const options: any = {};
  export let className = '';
</script>

<div class="cl-chart {className}" role="img" aria-label={`Chart: ${type}`}>
  <slot>
    <!-- Placeholder for chart -->
    <div class="chart-placeholder">
      <strong>{type.toUpperCase()} Chart</strong>
      <p class="text-sm text-muted-foreground">Slot in your charting library here</p>
    </div>
  </slot>
</div>

<style>
  .cl-chart {
    width: 100%;
    height: auto;
    padding: var(--spacing-4, 1rem);
    background-color: var(--color-surface-50, #f9f9f9);
    border: 1px dashed var(--border-default-color, #ccc);
    border-radius: var(--radius-md, 0.5rem);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .chart-placeholder {
    text-align: center;
    color: var(--color-neutral-700, #666);
    font-family: var(--font-sans, sans-serif);
  }
</style>
