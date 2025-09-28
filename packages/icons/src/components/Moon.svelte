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
      <g id="Property 1=filled"><path id="Union" fill="currentColor" d="M8.91 2.095c.897-.293 1.675.125 2.093.713.395.557.534 1.322.305 2.032a6 6 0 0 0-.29 1.841l.008.31a6 6 0 0 0 7.767 5.423 2.32 2.32 0 0 1 2.028.328c.583.425.992 1.207.689 2.102-1.342 3.95-5.08 6.796-9.489 6.797-5.361 0-9.74-4.211-10.008-9.506L2 11.619c0-4.45 2.9-8.216 6.91-9.524"/></g>
    </g>

{:else if variant === 'duotone' && true}
  {#if true}
    <g class="tone2" style="color:{colorByRole[secondaryRole]}">
      <g fill="currentColor" stroke="none">
        <path id="tone2" fill="currentColor" d="M9.22 3.045c.806-.263 1.396.68 1.136 1.487a7 7 0 0 0 8.734 8.837c.81-.25 1.746.35 1.473 1.154A9.022 9.022 0 0 1 3 11.619a9.02 9.02 0 0 1 6.22-8.574"/>
      </g>
    </g>
  {/if}

  <g class="tone1"
     style="color:{colorByRole[role]}; paint-order: stroke fill"
     stroke="currentColor"
     stroke-width={effectiveStrokeWidth}>
    <path id="tone1" d="M9.22 3.045c.806-.263 1.396.68 1.136 1.487a7 7 0 0 0 8.734 8.837c.81-.25 1.746.35 1.473 1.154A9.022 9.022 0 0 1 3 11.619a9.02 9.02 0 0 1 6.22-8.574Z"/>
  </g>



  {:else}
    <!-- Stroke (default/fallback) -->
    <g stroke="currentColor" stroke-width={effectiveStrokeWidth}>
      <g id="Property 1=stroke"><path id="outline" d="M9.22 3.045c.806-.263 1.396.68 1.136 1.487a7 7 0 0 0 8.734 8.837c.81-.25 1.746.35 1.473 1.154A9.022 9.022 0 0 1 3 11.619a9.02 9.02 0 0 1 6.22-8.574Z"/></g>
    </g>
  {/if}
</svg>
