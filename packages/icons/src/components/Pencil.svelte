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
      <g id="Property 1=filled"><path id="Union" fill="currentColor" fill-rule="evenodd" d="M15.435 4.122a3 3 0 0 1 4.242 4.242l-1.415 1.414h.001l-9.9 9.9-.003-.004a1.1 1.1 0 0 1-.352.2L3.93 21.266a1.1 1.1 0 0 1-1.396-1.396l1.39-4.078q.068-.196.2-.352l-.003-.004zm2.828 1.414a1 1 0 0 0-1.414 0L15.435 6.95l1.414 1.414 1.414-1.414a1 1 0 0 0 0-1.414" clip-rule="evenodd"/></g>
    </g>

  {:else if variant === 'duotone' && true}
    <g class="tone2" fill="currentColor" stroke="none" style="color:var(--icon-duotone-2)">
      <rect id="tone2" width="6" height="14" x="14.021" y="5.536" fill="currentColor" transform="rotate(45 14.02 5.536)"/>
    </g>

    <g class="tone1"
       style="color:var(--icon-duotone-1); paint-order: stroke fill"
       stroke="currentColor"
       stroke-width={effectiveStrokeWidth}>
      
    </g>

  {:else}
    <!-- Stroke (default/fallback) -->
    <g stroke="currentColor" stroke-width={effectiveStrokeWidth}>
      <g id="Property 1=stroke"><path id="Rectangle 17" d="M18.97 4.828a2 2 0 0 1 0 2.829l-2.12 2.121-2.83-2.828 2.122-2.122a2 2 0 0 1 2.829 0Z"/><rect id="Rectangle 18" width="4" height="12" x="14.021" y="6.95" transform="rotate(45 14.02 6.95)"/><path id="Vector 143" d="m4.895 16.075.57-.57a.1.1 0 0 1 .141 0l2.687 2.688a.1.1 0 0 1 0 .141l-.57.57a.1.1 0 0 1-.038.023L3.607 20.32a.1.1 0 0 1-.127-.127l1.391-4.078a.1.1 0 0 1 .024-.039Z"/></g>
    </g>
  {/if}
</svg>
