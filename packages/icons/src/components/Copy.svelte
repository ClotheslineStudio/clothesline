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
      <g id="copy"><path id="Vector" d="m19.315 6.402-.658.754zm-3.333-2.909-.658.754zM20 9a1 1 0 1 0 0-2v2m-5 10.6a1 1 0 1 0-2 0h2M5.667 8a1 1 0 0 0 0-2v2M9 5H8v10h2V5zm2 12v1h7v-2h-7zm9-2h1V7.91h-2V15zm-.685-8.598.658-.753-3.334-2.91-.657.754-.658.754 3.333 2.909zM14.667 3V2H11v2h3.667zm1.315.493.657-.753A3 3 0 0 0 14.667 2v2a1 1 0 0 1 .657.247zM20 7.91h1a3 3 0 0 0-1.027-2.26l-.658.753-.658.754a1 1 0 0 1 .343.753zM18 17v1a3 3 0 0 0 3-3h-2a1 1 0 0 1-1 1zm-9-2H8a3 3 0 0 0 3 3v-2a1 1 0 0 1-1-1zM9 5h1a1 1 0 0 1 1-1V2a3 3 0 0 0-3 3zm6-2h-1v4.5h2V3zm.5 5v1H20V7h-4.5zm-.5-.5h-1A1.5 1.5 0 0 0 15.5 9V7a.5.5 0 0 1 .5.5zM4 8.667H3V19h2V8.667zM6 21v1h6.6v-2H6zm6.6 0v1a2.4 2.4 0 0 0 2.4-2.4h-2a.4.4 0 0 1-.4.4zM4 19H3a3 3 0 0 0 3 3v-2a1 1 0 0 1-1-1zM5.667 7V6A2.667 2.667 0 0 0 3 8.667h2C5 8.298 5.298 8 5.667 8z"/></g>
    </g>
  {/if}
</svg>
