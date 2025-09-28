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
      <g id="Property 1=filled"><g id="Vector 130"><path fill="currentColor" d="M14 21h-4c-.533-5.305.182-10.27 1-13 0 0 2-.02 2 0 0 4.5-.132 9.972 1 13"/><path fill="currentColor" d="M8 21h2m6 0h-2m-4 0h4m-4 0c-.533-5.305.182-10.27 1-13 0 0 2-.02 2 0 0 4.5-.132 9.972 1 13"/></g><path id="Vector 131" fill="currentColor" d="m11.777 7.856-8.581 6.586S1.954 10.84 5.29 8.289c3.338-2.552 6.486-.433 6.486-.433"/><path id="Vector 132" fill="currentColor" d="M16 8h-4s1-4 5-4 5 4 5 4h-3l-1.5-1.5z"/><path id="Vector 133" fill="currentColor" d="m8.41 6.796 3.766 1.01s-.753-4.771-4.215-5.789S2 5 2 5l3 1 2.314-1.568z"/></g>
    </g>

{:else if variant === 'duotone' && true}
  {#if true}
    <g class="tone2" style="color:{colorByRole[secondaryRole]}">
      <g fill="currentColor" stroke="none">
        <path id="Vector 137" fill="currentColor" d="M14 21.009h-4c-.533-5.306.182-10.27 1-13 0 0 2-.02 2 0 0 4.5-.132 9.972 1 13"/>
<path id="Vector 136" fill="currentColor" d="m8.46 7.07 3.765 1.01s-.753-4.77-4.214-5.788-5.962 2.982-5.962 2.982l3 1 2.315-1.567z"/>
<path id="Vector 134" fill="currentColor" d="m11.777 7.856-8.581 6.586S1.954 10.84 5.29 8.289c3.338-2.552 6.486-.433 6.486-.433"/>
<path id="Vector 135" fill="currentColor" d="M16 8h-4s1-4 5-4 5 4 5 4h-3l-1.5-1.5z"/>
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
      <g id="Property 1=stroke"><path id="Vector 130" d="M8 21h2m6 0h-2m-4 0h4m-4 0c-.533-5.305.182-10.27 1-13 0 0 2-.02 2 0 0 4.5-.132 9.972 1 13"/><path id="Vector 131" d="m11.777 7.856-8.581 6.586S1.954 10.84 5.29 8.289c3.338-2.552 6.486-.433 6.486-.433"/><path id="Vector 132" d="M16 8h-4s1-4 5-4 5 4 5 4h-3l-1.5-1.5z"/><path id="Vector 133" d="m8.41 6.796 3.766 1.01s-.753-4.771-4.215-5.789S2 5 2 5l3 1 2.314-1.568z"/></g>
    </g>
  {/if}
</svg>
