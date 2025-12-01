<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import type { IconRecord, IconStyle } from '$lib/types/icon';

  const dispatch = createEventDispatcher<{ select: { icon: IconRecord } }>();

  export let icon: IconRecord;
  export let size: number = 24;
  export let style: IconStyle = 'stroke';
  export let color = '#6381F8';
  export let secondaryColor = '#6381F8';
  export let strokeWidth = 2;
  export let absoluteStroke = false;

  const handleSelect = () => {
    dispatch('select', { icon });
  };

  const handleKeydown = (e: KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleSelect();
    }
  };
</script>

<div
  tabindex="0"
  role="button"
  class="icon-card group"
  on:click={handleSelect}
  on:keydown={handleKeydown}
>
  <!-- Icon glyph -->
  <svelte:component
    this={icon.component}
    size={size}
    strokeWidth={strokeWidth}
    absoluteStrokeWidth={absoluteStroke}
    primaryColor={color}
    secondaryColor={style === 'duotone' ? secondaryColor : color}
    variant={style}
    aria-hidden="true"
    class="icon-card__glyph"
  />

  <!-- Name label -->
  <div class="icon-card__label">
    {icon.displayName ?? icon.name}
  </div>
</div>

<style>
  .icon-card {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;

    padding: var(--spacing-4, 1rem);
    border-radius: var(--radius-card, 0.75rem);

    border-width: var(--border-card, 2px);
    border-style: solid;
    border-color: var(--color-surface-300-vis, var(--color-surface-300, #cbd5e1));

    background-color: var(--color-surface-100-vis, var(--color-surface-100, #f1f5f9));
    color: var(--icon, var(--on-surface, #0f172a));

    cursor: pointer;
    transition:
      background-color var(--motion-duration-fast, 150ms) var(--motion-ease, ease-in-out),
      box-shadow var(--motion-duration-fast, 150ms) var(--motion-ease, ease-in-out),
      transform 100ms ease-out;
  }

  .icon-card:hover {
    background-color: var(--color-surface-200-vis, var(--color-surface-200, #e2e8f0));
    box-shadow: var(--elevation-card, 0 1px 2px rgba(15, 23, 42, 0.08));
  }

  .icon-card:active {
    transform: scale(0.97);
  }

  .icon-card:focus-visible {
    outline: var(--focus-ring, 2px solid var(--color-primary-500-vis, #3b82f6));
    outline-offset: 2px;
  }

  :global(.icon-card__glyph) {
    width: var(--size-icon, 1.5rem);
    height: var(--size-icon, 1.5rem);
    stroke-width: var(--icon-stroke, 2);
  }

  .icon-card__label {
    position: absolute;
    left: 50%;
    transform: translate(-50%, 4px);
    bottom: var(--spacing-1, 0.25rem);

    padding-inline: var(--spacing-2, 0.5rem);
    padding-block: 2px;

    border-radius: var(--radius-sm, 0.25rem);

    background-color: color-mix(
      in oklab,
      var(--color-surface-900-vis, #020617) 80%,
      transparent
    );
    color: var(--color-surface-50-vis, #f9fafb);

    font-size: var(--type-caption-size, 0.75rem);
    line-height: 1;
    text-align: center;
    white-space: nowrap;

    opacity: 0;
    pointer-events: none;
    transition:
      opacity var(--motion-duration-fast, 150ms) var(--motion-ease, ease-in-out),
      transform var(--motion-duration-fast, 150ms) var(--motion-ease, ease-in-out);
  }

  .icon-card:hover .icon-card__label,
  .icon-card:focus-visible .icon-card__label {
    opacity: 1;
    transform: translate(-50%, 0);
  }
</style>
