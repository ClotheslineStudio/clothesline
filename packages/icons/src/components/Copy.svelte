<!-- AUTO-GENERATED. Do not edit by hand. -->
<script lang="ts">
  export let size: number | string = 24;
  export let strokeWidth: number | string | undefined = undefined;
  export let variant: 'stroke' | 'filled' | 'duotone' | 'animated' = 'stroke';

  // semantic roles
  export let role:
    | 'default'
    | 'muted'
    | 'primary'
    | 'success'
    | 'warning'
    | 'error'
    | 'info' = 'default';

  export let secondaryRole:
    | 'default'
    | 'muted'
    | 'primary'
    | 'success'
    | 'warning'
    | 'error'
    | 'info' = 'muted';

  export let className: string = '';
  export let ariaLabel: string = 'icon';
  export let title: string | undefined = undefined;

  const colorByRole = {
    default: 'var(--icon)',
    muted: 'var(--icon-muted)',
    primary: 'var(--icon-primary)',
    success: 'var(--icon-success)',
    warning: 'var(--icon-warning)',
    error: 'var(--icon-error)',
    info: 'var(--icon-info)'
  } as const;

  const fillByRole = {
    default: 'var(--icon-fill)',
    muted: 'var(--icon-fill-muted)',
    primary: 'var(--icon-fill-primary)',
    success: 'var(--icon-fill-success)',
    warning: 'var(--icon-fill-warning)',
    error: 'var(--icon-fill-error)',
    info: 'var(--icon-fill-info)'
  } as const;

  $: effectiveStrokeWidth = strokeWidth ?? 'var(--icon-stroke)';
</script>

<svg
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 24 24"
  width={size}
  height={size}
  fill="none"
  stroke="currentColor"
  stroke-width={effectiveStrokeWidth}
  stroke-linecap="var(--icon-stroke-linecap)"
  stroke-linejoin="var(--icon-stroke-linejoin)"
  aria-label={ariaLabel}
  role="img"
  class={className}
  style="color: {colorByRole[role]}"
  shape-rendering="geometricPrecision"
  {...$$restProps}
>
  {#if title}<title>{title}</title>{/if}

  {#if variant === 'filled' && true}
    <g fill="currentColor" stroke="none" style="color:{fillByRole[role]}">
      <g id="Property 1=fillled"><path fill="currentColor" id="Vector 144" d="M9 14V5a2 2 0 0 1 2-2h3.834a2 2 0 0 1 1.199.4l3.166 2.37A2 2 0 0 1 20 7.371V14a2 2 0 0 1-2 2h-7a2 2 0 0 1-2-2Z"/><path fill="currentColor" id="Vector 146" d="M6 8a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h7.071a.93.93 0 0 0 .929-.929"/><path fill="currentColor" id="Vector 145" d="M15 3v4.5a.5.5 0 0 0 .5.5H20"/></g>
    </g>

  {:else if variant === 'duotone' && false}
    

    <g class="tone1"
       style="color:var(--icon-duotone-1); paint-order: stroke fill"
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
