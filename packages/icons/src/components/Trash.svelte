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
      <g id="Property 1=filled"><g id="Vector"><path fill="currentColor" d="M17 8H7v11a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1zm-2-3a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v1h6zm2 1h3a1 1 0 1 1 0 2h-1v11a3 3 0 0 1-3 3H8a3 3 0 0 1-3-3V8H4a1 1 0 0 1 0-2h3V5a3 3 0 0 1 3-3h4a3 3 0 0 1 3 3z"/><path fill="currentColor" d="M20 6a1 1 0 1 1 0 2h-1v11a3 3 0 0 1-3 3H8a3 3 0 0 1-3-3V8H4a1 1 0 0 1 0-2zm-10 4a1 1 0 0 0-1 1v6a1 1 0 1 0 2 0v-6a1 1 0 0 0-1-1m4 0a1 1 0 0 0-1 1v6a1 1 0 1 0 2 0v-6a1 1 0 0 0-1-1"/></g></g>
    </g>

  {:else if variant === 'duotone' && true}
    <g class="tone2" fill="currentColor" stroke="none" style="color:var(--icon-duotone-2)">
      <path id="tone2" fill="currentColor" d="M6 19V7h2V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2h2v12a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2"/>
    </g>

    <g class="tone1"
       style="color:var(--icon-duotone-1); paint-order: stroke fill"
       stroke="currentColor"
       stroke-width={effectiveStrokeWidth}>
      <path id="tone1" d="M6 7v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7M6 7H4m2 0h2m10 0h2m-2 0h-2M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M8 7h8m-6 10v-6m4 6v-6"/>
    </g>

  {:else}
    <!-- Stroke (default/fallback) -->
    <g stroke="currentColor" stroke-width={effectiveStrokeWidth}>
      <path d="M6 7v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7M6 7H4m2 0h2m10 0h2m-2 0h-2M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M8 7h8"/><path d="M10 17v-6"/><path d="M14 17v-6"/>
    </g>
  {/if}
</svg>
