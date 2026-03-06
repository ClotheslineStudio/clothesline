<script lang="ts">
  export let id: string | undefined = undefined;
  export let className = '';
</script>

<p id={id} class={`cl-error-text ${className}`.trim()} role="alert">
  <slot />
</p>

<style>
  .cl-error-text {
    margin: 0;
    font-size: var(--type-scale-xs, 0.75rem);
    color: var(--text-error, var(--color-error-700));
  }
</style>
