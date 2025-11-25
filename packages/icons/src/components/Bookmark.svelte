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
      <g id="Property 1=filled"><g id="Vector"><path fill="currentColor" d="M17.5 4h-11a.5.5 0 0 0-.5.5v14.293a.5.5 0 0 0 .854.353l4.792-4.792a.5.5 0 0 1 .708 0l4.792 4.792a.5.5 0 0 0 .854-.353V4.5a.5.5 0 0 0-.5-.5"/><path fill="currentColor" d="m7 17.586 3.94-3.94.114-.102a1.5 1.5 0 0 1 1.892 0l.114.102 3.94 3.94V5H7zm12 1.207c0 1.336-1.616 2.005-2.56 1.06L12 15.415l-4.44 4.44c-.944.944-2.56.275-2.56-1.061V4.5A1.5 1.5 0 0 1 6.5 3h11A1.5 1.5 0 0 1 19 4.5z"/></g></g>
    </g>

  {:else if variant === 'duotone' && true}
    <g class="tone2" fill="currentColor" stroke="none" style="color:var(--icon-duotone-2)">
      <path id="tone2" fill="currentColor" d="M17.5 4h-11a.5.5 0 0 0-.5.5v14.293a.5.5 0 0 0 .854.353l4.792-4.792a.5.5 0 0 1 .708 0l4.792 4.792a.5.5 0 0 0 .854-.353V4.5a.5.5 0 0 0-.5-.5Z"/>
    </g>

    <g class="tone1"
       style="color:var(--icon-duotone-1); paint-order: stroke fill"
       stroke="currentColor"
       stroke-width={effectiveStrokeWidth}>
      <path id="tone1" d="M17.5 4h-11a.5.5 0 0 0-.5.5v14.293a.5.5 0 0 0 .854.353l4.792-4.792a.5.5 0 0 1 .708 0l4.792 4.792a.5.5 0 0 0 .854-.353V4.5a.5.5 0 0 0-.5-.5Z"/>
    </g>

  {:else}
    <!-- Stroke (default/fallback) -->
    <g stroke="currentColor" stroke-width={effectiveStrokeWidth}>
      <path d="M17.5 4h-11a.5.5 0 0 0-.5.5v14.293a.5.5 0 0 0 .854.353l4.792-4.792a.5.5 0 0 1 .708 0l4.792 4.792a.5.5 0 0 0 .854-.353V4.5a.5.5 0 0 0-.5-.5Z"/>
    </g>
  {/if}
</svg>
