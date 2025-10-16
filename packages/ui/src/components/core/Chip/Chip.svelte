<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  /** Chip – selectable pill used for filters/role pickers.
   *  - Keyboard: native <button> with aria-pressed for toggle semantics
   *  - Variants: soft | outline | solid
   *  - Tones: primary | secondary | accent | success | warning | error | neutral | surface
   *  - Sizes: sm | md | lg
   *  - Optional removable (x) affordance
   *  - No anchors with "#" to avoid a11y warnings; pass a real href if you render <a>
   */

  export let selected = false;
  export let disabled = false;
  export let tone: 'primary'|'secondary'|'accent'|'success'|'warning'|'error'|'neutral'|'surface' = 'neutral';
  export let variant: 'soft'|'outline'|'solid' = 'soft';
  export let size: 'sm'|'md'|'lg' = 'md';
  export let removable = false;           // shows × button and emits `remove`
  export let title: string | undefined;   // optional title/tooltip

  // If you really need a link, set href to a real URL; otherwise leave undefined.
  export let href: string | undefined;
  export let rel: string | undefined;
  export let target: string | undefined;

  const dispatch = createEventDispatcher<{ toggle: { selected: boolean }, remove: void }>();

  function onToggle(e: MouseEvent) {
    if (disabled) return;
    selected = !selected;
    dispatch('toggle', { selected });
  }

  function onRemove(e: MouseEvent) {
    if (disabled) return;
    e.stopPropagation();
    dispatch('remove');
  }

  // ------- styling helpers (uses your CSS vars from the theme generator) -------
  // Prefer role steps for soft/outline, and mid token for solid
  function bgFor(sel: boolean) {
    if (variant === 'solid') return `var(--${tone})`;
    const lvl = sel ? 300 : 200;
    return `var(--color-${tone}-${lvl})`;
  }
  function fgFor(sel: boolean) {
    if (variant === 'solid') return `var(--on-${tone})`;
    const lvl = sel ? 300 : 200;
    return `var(--on-${tone}-${lvl})`;
  }
  function borderFor(sel: boolean) {
    if (variant === 'outline') return `var(--${tone})`;
    const lvl = sel ? 300 : 200;
    return `var(--color-${tone}-${lvl})`;
  }

  const sizes: Record<typeof size, string> = {
    sm: 'text-xs px-2 py-1 gap-1 rounded-[var(--radius-sm)]',
    md: 'text-sm px-3 py-1.5 gap-1.5 rounded-[var(--radius-md)]',
    lg: 'text-base px-3.5 py-2 gap-2 rounded-[var(--radius-lg)]'
  };
</script>

{#if href}
  <!-- Linked chip; only rendered when a real href is provided -->
  <a
    class="chip inline-flex items-center font-medium border select-none focus:outline-none focus-visible:ring-2"
    class:cursor-not-allowed={disabled}
    class:opacity-60={disabled}
    href={href}
    rel={rel}
    target={target}
    style="
      background: {variant==='outline' ? 'transparent' : bgFor(selected)};
      color: {variant==='outline' ? `var(--${tone})` : fgFor(selected)};
      border-color: {borderFor(selected)};
      border-width: var(--border-w, 1px);
      box-shadow: 0 0 0 var(--focus-ring-offset, 2px) transparent;
    "
    aria-current={selected ? 'page' : undefined}
    title={title}
  >
    <slot name="start" />
    <span class={sizes[size]}><slot /></span>
    {#if removable}
      <button class="ml-1 inline-flex items-center justify-center size-4 rounded-[var(--radius-full)]/none hover:opacity-80"
              aria-label="Remove"
              on:click|preventDefault|stopPropagation={onRemove}
              style="background: {variant==='outline' ? 'transparent' : 'rgba(0,0,0,.08)'};">
        ×
      </button>
    {/if}
  </a>
{:else}
  <!-- Toggle chip -->
  <button
    type="button"
    class="chip inline-flex items-center font-medium border select-none focus:outline-none focus-visible:ring-2"
    class:cursor-not-allowed={disabled}
    class:opacity-60={disabled}
    on:click={onToggle}
    aria-pressed={selected}
    aria-disabled={disabled}
    title={title}
    style="
      background: {variant==='outline' ? 'transparent' : bgFor(selected)};
      color: {variant==='outline' ? `var(--${tone})` : fgFor(selected)};
      border-color: {borderFor(selected)};
      border-width: var(--border-w, 1px);
      box-shadow: 0 0 0 var(--focus-ring-offset, 2px) transparent;
    "
  >
    <slot name="start" />
    <span class={sizes[size]}><slot /></span>
    {#if removable}
      <span class="ml-1 inline-flex items-center justify-center size-4 rounded-[var(--radius-full)]/none hover:opacity-80"
            role="button" aria-label="Remove" tabindex="0"
            on:click|stopPropagation={onRemove}
            on:keydown={(e)=> (e.key==='Enter'||e.key===' ') && onRemove(e as unknown as MouseEvent)}
            style="background: {variant==='outline' ? 'transparent' : 'rgba(0,0,0,.08)'};">
        ×
      </span>
    {/if}
  </button>
{/if}

<style>
  .chip:focus-visible {
    /* Uses your focus ring tokens when present */
    box-shadow:
      0 0 0 var(--focus-ring-offset, 2px) white,
      0 0 0 calc(var(--focus-ring-w, 2px) + var(--focus-ring-offset, 2px)) var(--focus-ring, oklch(82% 0.25 230));
  }
</style>
