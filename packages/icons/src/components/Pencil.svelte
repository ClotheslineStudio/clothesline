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
      <g id="Property 1=filled"><path id="Union" fill="currentColor" fill-rule="evenodd" d="M15.435 4.122a3 3 0 0 1 4.242 4.242l-1.415 1.414h.001l-9.9 9.9-.003-.004a1.1 1.1 0 0 1-.352.2L3.93 21.266a1.1 1.1 0 0 1-1.396-1.396l1.39-4.078q.068-.196.2-.352l-.003-.004zm2.828 1.414a1 1 0 0 0-1.414 0L15.435 6.95l1.414 1.414 1.414-1.414a1 1 0 0 0 0-1.414" clip-rule="evenodd"/></g>
    </g>

{:else if variant === 'duotone' && true}
  {#if true}
    <g class="tone2" style="color:{colorByRole[secondaryRole]}">
      <g fill="currentColor" stroke="none">
        <rect id="tone2" width="6" height="14" x="14.021" y="5.536" fill="currentColor" transform="rotate(45 14.02 5.536)"/>
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
      <g id="Property 1=stroke"><path id="Rectangle 17" d="M18.97 4.828a2 2 0 0 1 0 2.829l-2.12 2.121-2.83-2.828 2.122-2.122a2 2 0 0 1 2.829 0Z"/><rect id="Rectangle 18" width="4" height="12" x="14.021" y="6.95" transform="rotate(45 14.02 6.95)"/><path id="Vector 143" d="m4.895 16.075.57-.57a.1.1 0 0 1 .141 0l2.687 2.688a.1.1 0 0 1 0 .141l-.57.57a.1.1 0 0 1-.038.023L3.607 20.32a.1.1 0 0 1-.127-.127l1.391-4.078a.1.1 0 0 1 .024-.039Z"/></g>
    </g>
  {/if}
</svg>
