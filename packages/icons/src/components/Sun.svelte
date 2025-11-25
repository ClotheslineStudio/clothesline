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
      <circle cx="12" cy="12" r="4.998" fill="currentColor" transform="rotate(90.027 12 12)"/><path fill="currentColor" d="M20 11.004h2a1 1 0 1 1 0 2h-2a1 1 0 1 1 0-2"/><path fill="currentColor" d="m16.953 5.638 1.415-1.413A1 1 0 1 1 19.78 5.64l-1.415 1.413a1 1 0 1 1-1.413-1.415"/><path fill="currentColor" d="m2 10.995 2 .001a1 1 0 0 1 0 2H2a1 1 0 0 1 0-2"/><path fill="currentColor" d="m4.219 18.36 1.415-1.413a1 1 0 1 1 1.413 1.415l-1.414 1.413a1 1 0 0 1-1.414-1.415"/><path fill="currentColor" d="M11 4V2a1 1 0 1 1 2 0v2a1 1 0 1 1-2 0"/><path fill="currentColor" d="M5.636 7.05 4.222 5.636a1 1 0 1 1 1.414-1.414L7.05 5.636A1 1 0 1 1 5.636 7.05"/><path fill="currentColor" d="M11 22v-2a1 1 0 1 1 2 0v2a1 1 0 1 1-2 0"/><path fill="currentColor" d="m18.364 19.778-1.415-1.414a1 1 0 0 1 1.415-1.414l1.414 1.414a1 1 0 0 1-1.414 1.414"/>
    </g>

  {:else if variant === 'duotone' && true}
    <g class="tone2" fill="currentColor" stroke="none" style="color:var(--icon-duotone-2)">
      <circle id="tone2" cx="12" cy="12" r="3.998" fill="currentColor" transform="rotate(90.027 12 12)"/>
    </g>

    <g class="tone1"
       style="color:var(--icon-duotone-1); paint-order: stroke fill"
       stroke="currentColor"
       stroke-width={effectiveStrokeWidth}>
      <path id="tone1" d="m22 12.005-2-.001m-.925-7.072L17.66 6.346M4 11.996H2m4.34 5.658-1.414 1.414M12 2v2m-7.071.929 1.414 1.414M12 22v-2m7.071-.929-1.414-1.414m-5.655-1.651a4.002 4.002 0 1 1 .004-8.004 4.002 4.002 0 0 1-.004 8.004Z"/>
    </g>

  {:else}
    <!-- Stroke (default/fallback) -->
    <g stroke="currentColor" stroke-width={effectiveStrokeWidth}>
      <circle cx="12" cy="12" r="4.002" transform="rotate(90.027 12 12)"/><path d="m22 12.005-2-.001"/><path d="M19.075 4.932 17.66 6.346"/><path d="M4 11.996H2"/><path d="m6.34 17.654-1.414 1.414"/><path d="M12 2v2"/><path d="m4.929 4.929 1.414 1.414"/><path d="M12 22v-2"/><path d="m19.071 19.071-1.414-1.414"/>
    </g>
  {/if}
</svg>
