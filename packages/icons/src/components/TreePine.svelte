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
      <g id="Property 1=filled"><path id="body" fill="currentColor" d="M12 2a1 1 0 0 1 .743.331l5.54 6.154a1 1 0 0 1-.745 1.67h-.46l2.491 3.322a1.001 1.001 0 0 1-.8 1.6h-.461L20.8 18.4A1 1 0 0 1 20 20H4a1 1 0 0 1-.8-1.6l2.492-3.323H5.23a1 1 0 0 1-.8-1.6l2.493-3.323h-.461a1.001 1.001 0 0 1-.744-1.669l5.539-6.154.074-.075A1 1 0 0 1 12 2"/><path id="trunk" fill="currentColor" d="M11 22v-3a1 1 0 1 1 2 0v3a1 1 0 1 1-2 0"/></g>
    </g>

  {:else if variant === 'duotone' && true}
    <g class="tone2" fill="currentColor" stroke="none" style="color:var(--icon-duotone-2)">
      <path id="tone2" fill="currentColor" d="M20 19H4l3.692-4.923H5.231l3.692-4.923H6.462L12 3l5.538 6.154h-2.461l3.692 4.923h-2.461z"/>
    </g>

    <g class="tone1"
       style="color:var(--icon-duotone-1); paint-order: stroke fill"
       stroke="currentColor"
       stroke-width={effectiveStrokeWidth}>
      
    </g>

  {:else}
    <!-- Stroke (default/fallback) -->
    <g stroke="currentColor" stroke-width={effectiveStrokeWidth}>
      <g id="Property 1=stroke"><path id="Vector 138" d="M20 19H4l3.692-4.923H5.231l3.692-4.923H6.462L12 3l5.538 6.154h-2.461l3.692 4.923h-2.461z"/><path id="Vector 139" d="M12 19v3"/></g>
    </g>
  {/if}
</svg>
