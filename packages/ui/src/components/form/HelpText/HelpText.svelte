<script lang="ts">
  export let id: string | undefined = undefined;
  export let className = '';
</script>

<p id={id} class={`cl-help-text ${className}`.trim()}>
  <slot />
</p>

<style>
  .cl-help-text {
    margin: 0;
    font-size: var(--type-scale-xs, 0.75rem);
    color: var(--on-surface-muted, var(--color-surface-700));
  }
</style>
