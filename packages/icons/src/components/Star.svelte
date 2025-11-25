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
      <g id="Property 1=filled"><path id="Union" fill="currentColor" d="M10.602 2.836c.48-1.235 2.189-1.273 2.746-.115l.05.115 1.98 5.094h5.376c1.352 0 2.013 1.65 1.036 2.585l-4.333 4.143 1.292 5.852c.296 1.343-1.222 2.343-2.34 1.542L12 18.888l-4.409 3.164c-1.118.802-2.635-.199-2.339-1.542l1.29-5.852-4.332-4.143C1.233 9.58 1.894 7.93 3.246 7.93h5.376z"/></g>
    </g>

  {:else if variant === 'duotone' && true}
    <g class="tone2" fill="currentColor" stroke="none" style="color:var(--icon-duotone-2)">
      <path id="tone2" fill="currentColor" d="M11.534 3.199a.5.5 0 0 1 .932 0L14.57 8.61a.5.5 0 0 0 .466.32h5.718a.5.5 0 0 1 .345.86l-4.536 4.339a.5.5 0 0 0-.143.47l1.352 6.125a.5.5 0 0 1-.78.514l-4.7-3.372a.5.5 0 0 0-.583 0L7.008 21.24a.5.5 0 0 1-.78-.514l1.352-6.126a.5.5 0 0 0-.142-.469L2.9 9.791a.5.5 0 0 1 .345-.86h5.718a.5.5 0 0 0 .466-.32z"/>
    </g>

    <g class="tone1"
       style="color:var(--icon-duotone-1); paint-order: stroke fill"
       stroke="currentColor"
       stroke-width={effectiveStrokeWidth}>
      <path id="tone1" d="M11.534 3.199a.5.5 0 0 1 .932 0L14.57 8.61a.5.5 0 0 0 .466.32h5.718a.5.5 0 0 1 .345.86l-4.536 4.339a.5.5 0 0 0-.143.47l1.352 6.125a.5.5 0 0 1-.78.514l-4.7-3.372a.5.5 0 0 0-.583 0L7.008 21.24a.5.5 0 0 1-.78-.514l1.352-6.126a.5.5 0 0 0-.142-.469L2.9 9.791a.5.5 0 0 1 .345-.86h5.718a.5.5 0 0 0 .466-.32z"/>
    </g>

  {:else}
    <!-- Stroke (default/fallback) -->
    <g stroke="currentColor" stroke-width={effectiveStrokeWidth}>
      <g id="Property 1=stroke"><path id="Star 1" d="M11.534 3.199a.5.5 0 0 1 .932 0L14.57 8.61a.5.5 0 0 0 .466.32h5.718a.5.5 0 0 1 .345.86l-4.536 4.339a.5.5 0 0 0-.143.47l1.352 6.125a.5.5 0 0 1-.78.514l-4.7-3.372a.5.5 0 0 0-.583 0L7.008 21.24a.5.5 0 0 1-.78-.514l1.352-6.126a.5.5 0 0 0-.142-.469L2.9 9.791a.5.5 0 0 1 .345-.86h5.718a.5.5 0 0 0 .466-.32z"/></g>
    </g>
  {/if}
</svg>
