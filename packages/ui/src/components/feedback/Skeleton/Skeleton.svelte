<script lang="ts">
  export let width: string | undefined = undefined;
  export let height = '1rem';
  export let radius = 'var(--radius-sm, 0.375rem)';
  export let animated = true;
  export let className = '';
</script>

<div
  class={`cl-skeleton ${animated ? 'cl-skeleton--animated' : ''} ${className}`.trim()}
  aria-hidden="true"
  style={`height:${height};${width ? `width:${width};` : ''}border-radius:${radius};`}
></div>

<style>
  .cl-skeleton {
    display: block;
    background: linear-gradient(
      90deg,
      color-mix(in oklab, var(--color-surface-300-vis, var(--color-surface-300)) 72%, transparent) 0%,
      color-mix(in oklab, var(--color-surface-200-vis, var(--color-surface-200)) 80%, transparent) 50%,
      color-mix(in oklab, var(--color-surface-300-vis, var(--color-surface-300)) 72%, transparent) 100%
    );
    background-size: 200% 100%;
  }

  .cl-skeleton--animated {
    animation: cl-skeleton-shimmer 1.8s linear infinite;
  }

  @keyframes cl-skeleton-shimmer {
    0% { background-position: 200% 0; }
    100% { background-position: -200% 0; }
  }

  @media (prefers-reduced-motion: reduce) {
    .cl-skeleton--animated {
      animation: none;
    }
  }
</style>
