<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import type { IconRecord, IconStyle } from '$lib/types/icon';

  const dispatch = createEventDispatcher<{ select: { icon: IconRecord } }>();

  export let icon: IconRecord;

  // Rendering options (all driven by the customizer / parent)
  export let size: number = 24;
  export let style: IconStyle = 'stroke';

  // Colors: let the theme handle defaults; customizer overrides by passing hex strings
  export let color: string | undefined;          // primary override from Customizer
  export let secondaryColor: string | undefined; // optional duotone secondary

  export let strokeWidth: number = 2;
  export let absoluteStroke: boolean = false;

  const handleSelect = () => {
    dispatch('select', { icon });
  };

  const handleKeydown = (e: KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleSelect();
    }
  };

  // Resolve what the icon actually receives
  $: iconPrimary = color ?? 'currentColor';
  $: iconSecondary =
    style === 'duotone'
      ? (secondaryColor ?? color ?? 'currentColor')
      : iconPrimary;
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
    primaryColor={iconPrimary}
    secondaryColor={iconSecondary}
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

    border-width: var(--border-card-width, 1px);
    border-style: solid;
    border-color: var(
      --icon-card-border,
      var(--border-subtle, var(--border-default-color, rgba(15, 23, 42, 0.12)))
    );

    background-color: var(
      --icon-card-bg,
      var(
        --card-bg,
        var(--surface-raised, var(--background-surface, #f9fafb))
      )
    );

    color: var(
      --icon-card-fg,
      var(--icon, var(--on-surface, #0f172a))
    );

    cursor: pointer;
    transition:
      background-color var(--motion-duration-fast, 150ms)
        var(--motion-ease, ease-in-out),
      box-shadow var(--motion-duration-fast, 150ms)
        var(--motion-ease, ease-in-out),
      transform 100ms ease-out;
  }

  .icon-card:hover {
    background-color: var(
      --icon-card-bg-hover,
      var(--surface-raised-hover, var(--background-surface-alt, #e9edf5))
    );
    box-shadow: var(
      --icon-card-shadow,
      var(--elevation-card, 0 1px 2px rgba(15, 23, 42, 0.08))
    );
  }

  .icon-card:active {
    transform: scale(0.97);
  }

  .icon-card:focus-visible {
    outline: var(
      --focus-ring,
      2px solid var(--focus-ring-color, var(--color-primary-vis, #3b82f6))
    );
    outline-offset: 2px;
  }

  :global(.icon-card__glyph) {
    width: var(--icon-card-icon-size, var(--size-icon, 1.5rem));
    height: var(--icon-card-icon-size, var(--size-icon, 1.5rem));
    stroke-width: var(--icon-card-icon-stroke, var(--icon-stroke, 2));
  }

  .icon-card__label {
    position: absolute;
    left: 50%;
    transform: translate(-50%, 4px);
    bottom: var(--spacing-1, 0.25rem);

    padding-inline: var(--spacing-2, 0.5rem);
    padding-block: 2px;

    border-radius: var(--radius-sm, 0.25rem);

    background-color: var(
      --icon-card-label-bg,
      color-mix(in oklab, var(--surface-backdrop, #020617) 80%, transparent)
    );
    color: var(
      --icon-card-label-fg,
      var(--on-surface-high, #f9fafb)
    );

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
