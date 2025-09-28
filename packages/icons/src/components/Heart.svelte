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

  {#if variant === 'filled' && false}
    <g fill="currentColor" stroke="none">
      
    </g>

{:else if variant === 'duotone' && false}
  {#if false}
    <g class="tone2" style="color:{colorByRole[secondaryRole]}">
      <g fill="currentColor" stroke="none">
        
      </g>
    </g>
  {/if}

  <g class="tone1"
     style="color:{colorByRole[role]}; paint-order: stroke fill"
     stroke="currentColor"
     stroke-width={effectiveStrokeWidth}>
    
  </g>



  {:else}
    <!-- Stroke (default/fallback) -->
    <g stroke="currentColor" stroke-width={effectiveStrokeWidth}>
      <g id="Property 1=stroke"><path id="Union" d="m12.323 6.134.734.68v-.001zm6.626 0 .734-.679zm0 7.173.734.678zm-7.288 7.89-.735.68.735.794.734-.795zm-7.29-7.89-.734.678zm0-7.173-.734-.679zm6.627 0 .734-.679zm.662.717-.735.678.734.795.735-.794zm.663-.717.734.679c1.434-1.552 3.724-1.552 5.157 0l.735-.679.734-.679c-2.225-2.409-5.87-2.408-8.095 0zm6.626 0-.735.679c1.476 1.597 1.476 4.218 0 5.815l.735.679.734.678c2.184-2.363 2.184-6.166 0-8.53zm0 7.173-.735-.679-7.288 7.891.735.679.734.678 7.288-7.89zm-7.288 7.89.734-.678-7.289-7.89-.734.678-.735.678 7.29 7.891zm-7.29-7.89.735-.679c-1.475-1.597-1.475-4.218 0-5.815l-.734-.679-.735-.679c-2.183 2.364-2.183 6.167 0 8.53zm0-7.173.735.679c1.434-1.552 3.723-1.552 5.157 0l.735-.679.734-.679c-2.225-2.408-5.87-2.409-8.095 0zm6.627 0-.735.679.662.716.735-.678.734-.679-.662-.716zm.662.717.734.679.663-.717-.734-.679-.734-.679-.663.717z"/></g>
    </g>
  {/if}
</svg>
