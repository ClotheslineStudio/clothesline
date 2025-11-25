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

  {#if variant === 'filled' && false}
    <g fill="currentColor" stroke="none" style="color:{fillByRole[role]}">
      
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
      <g id="Property 1=stroke"><path id="Vector 25" d="M19.347 4H5.004C3.222 4 2.33 6.154 3.59 7.414l6 6a2 2 0 0 1 .586 1.414V19a2 2 0 0 0 .8 1.6l1.6 1.2a1 1 0 0 0 1.6-.8v-6.172a2 2 0 0 1 .585-1.414l6-6C22.021 6.154 21.13 4 19.347 4"/></g>
    </g>
  {/if}
</svg>
