<script lang="ts">
  import { Popover, Paragraph } from '@clothesline/ui';
</script>

<Popover placement="bottom" align="start" ariaLabel="Popover example">
  <svelte:fragment slot="trigger">
    <span class="trigger-chip">Open popover</span>
  </svelte:fragment>

  <Paragraph tone="muted">Popover content can hold rich inline docs details.</Paragraph>
</Popover>

<style>
  .trigger-chip {
    display: inline-flex;
    align-items: center;
    border: 1px solid var(--border-color-default, var(--color-surface-300-vis));
    border-radius: var(--radius-full);
    padding: 0.35rem 0.75rem;
    font-size: 0.875rem;
    background: var(--background-panel, var(--color-surface-50-vis));
  }
</style>
