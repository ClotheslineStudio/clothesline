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
      <g id="Property 1=fillled"><path fill="currentColor" id="Vector 144" d="M9 14V5a2 2 0 0 1 2-2h3.834a2 2 0 0 1 1.199.4l3.166 2.37A2 2 0 0 1 20 7.371V14a2 2 0 0 1-2 2h-7a2 2 0 0 1-2-2Z"/><path fill="currentColor" id="Vector 146" d="M6 8a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h7.071a.93.93 0 0 0 .929-.929"/><path fill="currentColor" id="Vector 145" d="M15 3v4.5a.5.5 0 0 0 .5.5H20"/></g>
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
      <g id="Property 1=stroke"><path id="Vector 144" d="M9 14V5a2 2 0 0 1 2-2h3.834a2 2 0 0 1 1.199.4l3.166 2.37A2 2 0 0 1 20 7.371V14a2 2 0 0 1-2 2h-7a2 2 0 0 1-2-2Z"/><path id="Vector 146" d="M6 8a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h7.071a.93.93 0 0 0 .929-.929"/><path id="Vector 145" d="M15 3v4.5a.5.5 0 0 0 .5.5H20"/></g>
    </g>
  {/if}
</svg>
