<!-- AUTO-GENERATED. Do not edit by hand. -->
<script lang="ts">
  export let size: number | string = 24;
  export let strokeWidth: number | string | undefined = undefined;
  export let variant: 'stroke' | 'filled' | 'duotone' | 'animated' = 'stroke';
  export let role: 'default' | 'muted' | 'primary' | 'success' | 'warning' | 'error' = 'default';
  export let secondaryRole: 'default' | 'muted' | 'primary' | 'success' | 'warning' | 'error' = 'muted';
  export let className: string = '';
  export let ariaLabel: string = 'icon';
  export let title: string | undefined = undefined;

  const colorByRole = {
    default: 'var(--cl-icon)',
    muted: 'var(--cl-icon-muted)',
    primary: 'var(--cl-icon-primary)',
    success: 'var(--cl-icon-success)',
    warning: 'var(--cl-icon-warning)',
    error: 'var(--cl-icon-error)'
  } as const;

  $: effectiveStrokeWidth = strokeWidth ?? 'var(--cl-icon-stroke)';
</script>

<svg
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 24 24"
  width={size}
  height={size}
  fill="none"
  stroke="currentColor"
  stroke-width={effectiveStrokeWidth}
  stroke-linecap="round"
  stroke-linejoin="round"
  aria-label={ariaLabel}
  role="img"
  class={className}
  style="color: {colorByRole[role]}"
  shape-rendering="geometricPrecision"
  {...$$restProps}
>
  {#if title}<title>{title}</title>{/if}

  {#if variant === 'filled' && true}
    <g fill="currentColor" stroke="none">
      <g id="Property 1=filled"><path id="Union" fill="currentColor" d="M11.66 5.381c2.23-2.333 5.82-2.309 8.023.075 2.183 2.363 2.183 6.166 0 8.53l-8.023 8.686-8.023-8.686c-2.183-2.364-2.183-6.167 0-8.53 2.202-2.384 5.791-2.408 8.022-.075"/></g>
    </g>

{:else if variant === 'duotone' && true}
  {#if true}
    <g class="tone2" style="color:{colorByRole[secondaryRole]}">
      <g fill="currentColor" stroke="none">
        <path id="tone2" fill="currentColor" d="M12.323 6.134c1.83-1.98 4.796-1.98 6.626 0s1.83 5.192 0 7.173l-7.288 7.89-7.29-7.89c-1.829-1.98-1.829-5.192 0-7.173 1.83-1.98 4.797-1.98 6.627 0l.662.717z"/>
      </g>
    </g>
  {/if}

  <g class="tone1"
     style="color:{colorByRole[role]}; paint-order: stroke fill"
     stroke="currentColor"
     stroke-width={effectiveStrokeWidth}>
    <path id="tone1" d="M12.323 6.134c1.83-1.98 4.796-1.98 6.626 0s1.83 5.192 0 7.173l-7.288 7.89-7.29-7.89c-1.829-1.98-1.829-5.192 0-7.173 1.83-1.98 4.797-1.98 6.627 0l.662.717z"/>
  </g>



  {:else}
    <!-- Stroke (default/fallback) -->
    <g stroke="currentColor" stroke-width={effectiveStrokeWidth}>
      <g id="Property 1=stroke"><path id="Union" d="M12.323 6.134c1.83-1.98 4.796-1.98 6.626 0s1.83 5.192 0 7.173l-7.288 7.89-7.29-7.89c-1.829-1.98-1.829-5.192 0-7.173 1.83-1.98 4.797-1.98 6.627 0l.662.717z"/></g>
    </g>
  {/if}
</svg>
