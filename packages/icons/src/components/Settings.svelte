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

  {#if variant === 'filled' && false}
    <g fill="currentColor" stroke="none">
      
    </g>

{:else if variant === 'duotone' && false}
  {#if false}
    <g class="tone2" style="color:{colorByRole[secondaryRole]}">
      <g fill="currentColor" stroke="none">
        
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
      <g id="Property 1=stroke"><path id="Settings" fill-rule="evenodd" d="M12 3q.863.001 1.682.144c.515.088.815.567.936 1.048.156.625.574 1.19 1.208 1.537a2.67 2.67 0 0 0 2.007.22c.5-.142 1.088-.135 1.426.242.724.81 1.3 1.742 1.687 2.76.178.466-.11.951-.492 1.29A2.35 2.35 0 0 0 19.651 12c0 .693.309 1.319.803 1.759.381.339.67.825.492 1.29a8.9 8.9 0 0 1-1.685 2.758c-.338.378-.926.385-1.427.243a2.67 2.67 0 0 0-2.008.22 2.42 2.42 0 0 0-1.208 1.538c-.12.482-.42.962-.936 1.05a10 10 0 0 1-3.363 0c-.515-.088-.816-.568-.936-1.05a2.42 2.42 0 0 0-1.207-1.538 2.67 2.67 0 0 0-2.01-.22c-.501.142-1.089.136-1.427-.242a8.9 8.9 0 0 1-1.685-2.758c-.178-.466.111-.952.493-1.291A2.35 2.35 0 0 0 4.352 12c0-.694-.31-1.32-.805-1.76-.382-.339-.67-.825-.493-1.29A8.9 8.9 0 0 1 4.74 6.191c.338-.377.926-.385 1.427-.243.65.185 1.376.126 2.01-.22A2.42 2.42 0 0 0 9.381 4.19c.12-.482.421-.96.936-1.048A10 10 0 0 1 12.001 3Zm0 6c-1.75 0-3 1.343-3 3s1.25 3 3 3 3-1.343 3-3-1.25-3-3-3Z" clip-rule="evenodd"/></g>
    </g>
  {/if}
</svg>
