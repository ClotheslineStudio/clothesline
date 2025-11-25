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
      <g id="Property 1=filled"><path fill="currentColor" id="Vector 128" d="M8.5 12.5c1.5 1.5 6 2.5 7.5 3s5 2.7 5 5.5"/><path id="Subtract" fill="currentColor" fill-rule="evenodd" d="M2 3.546c0-1.09 1.228-1.516 1.958-.948l.139.127.31.323c.82.834 2.31 2.193 4.04 3.058.365.182.873.32 1.523.423.643.102 1.355.162 2.113.225.742.062 1.53.127 2.262.243.725.116 1.467.291 2.102.609 1.12.56 2.056 1.303 2.688 2.393.626 1.082.893 2.404.865 4.019-.019 1.074-.24 2.044-.627 2.897l-.07-.062c-1.115-.991-2.434-1.7-3.292-1.98-.387-.126-.96-.282-1.571-.454a50 50 0 0 1-2.03-.604c-.7-.23-1.378-.48-1.957-.75-.593-.277-1.013-.544-1.253-.779a1 1 0 0 0-1.4 1.428c.48.47 1.141.852 1.807 1.163.681.318 1.443.597 2.182.838.741.242 1.479.454 2.111.63.649.183 1.156.32 1.49.43.581.19 1.662.753 2.586 1.573q.14.126.271.257a6.5 6.5 0 0 1-.68.637C16.095 20.432 14.121 21 12 21c-2.515 0-5.016-.24-6.898-1.398C3.108 18.375 2 16.252 2 13z" clip-rule="evenodd"/></g>
    </g>

  {:else if variant === 'duotone' && true}
    <g class="tone2" fill="currentColor" stroke="none" style="color:var(--icon-duotone-2)">
      <path id="tone2" fill="currentColor" d="M19 14c-.069 3.905-3.095 6-7 6-5 0-9-1-9-7V3.545c0-.186.239-.274.366-.137C4.1 4.193 5.862 5.93 8 7c2 1 6 .5 8 1.5s3.053 2.5 3 5.5"/>
    </g>

    <g class="tone1"
       style="color:var(--icon-duotone-1); paint-order: stroke fill"
       stroke="currentColor"
       stroke-width={effectiveStrokeWidth}>
      
    </g>

  {:else}
    <!-- Stroke (default/fallback) -->
    <g stroke="currentColor" stroke-width={effectiveStrokeWidth}>
      <g id="Property 1=stroke"><path id="Vector 127" d="M19 14c-.069 3.905-3.095 6-7 6-5 0-9-1-9-7V3.545c0-.186.239-.274.366-.137C4.1 4.193 5.862 5.93 8 7c2 1 6 .5 8 1.5s3.053 2.5 3 5.5Z"/><path id="Vector 128" d="M8.5 12.5c1.5 1.5 6 2.5 7.5 3s5 2.7 5 5.5"/></g>
    </g>
  {/if}
</svg>
