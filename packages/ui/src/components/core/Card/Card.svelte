<script lang="ts">
  /** Polymorphic element tag */
  export let as: string = 'div';

  /** Background/foreground palette */
  export let tone: 'surface' | 'primary' | 'neutral' = 'surface';

  /** Padding scale */
  export let padding: 'none' | 'sm' | 'md' | 'lg' = 'md';

  /** Shadow elevation */
  export let shadow: 'none' | 'sm' | 'md' | 'lg' = 'md';

  /** Toggles */
  export let rounded: boolean = true;
  export let border: boolean = true;

  /** Extra classes */
  export let className: string = '';
</script>

<svelte:element
  this={as}
  class={`cl-card ${className}`}
  part="card"
  data-tone={tone}
  data-padding={padding}
  data-shadow={shadow}
  data-rounded={rounded}
  data-border={border}
>
  <slot />
</svelte:element>

<style>
  /* Base — compute everything from local vars that we override per data-* */
  .cl-card {
    /* Local, component-scoped tokens (with safe fallbacks) */
    --_bg: var(--cl-card-bg, var(--background-panel, var(--color-surface-100)));
    --_fg: var(--cl-card-fg, var(--base-font-color, var(--color-surface-950)));
    --_bd: var(--cl-card-border-color, var(--border-default-color, var(--color-surface-300)));
    --_radius: var(--cl-card-radius, var(--radius-card, 0.5rem));
    --_pad: var(--cl-card-padding, var(--spacing-5, 1rem));
    --_shadow: var(--cl-card-shadow, none);

    background-color: var(--_bg);
    color: var(--_fg);
    padding: var(--_pad);
    border-radius: var(--_radius);
    border: var(--default-border-width, 1px) solid var(--_bd);
    box-shadow: var(--_shadow);
    transition:
      background-color var(--motion-duration-base, 200ms) var(--motion-ease, ease-in-out),
      box-shadow var(--motion-duration-base, 200ms) var(--motion-ease, ease-in-out),
      border-color var(--motion-duration-base, 200ms) var(--motion-ease, ease-in-out);
  }

  /* Tone variants
     Use -vis tokens so vision/contrast modes remap automatically.
     NOTE: The shade numbers already flip between light/dark in your theme CSS. */

  /* Neutral app surface */
  .cl-card[data-tone='surface'] {
    --cl-card-bg: var(--background-panel);
    --cl-card-fg: var(--base-font-color);
    --cl-card-border-color: var(--border-default-color);
  }

  /* Brand-tinted card */
  .cl-card[data-tone='primary'] {
    /* pick mid-light bg + strong fg; these invert automatically in dark */
    --cl-card-bg: var(--color-primary-100-vis);
    --cl-card-fg: var(--color-primary-950-vis);
    /* soft brandy border; fallback to default divider */
    --cl-card-border-color: color-mix(in oklab, var(--color-primary-300-vis) 55%, var(--border-default-color));
  }

  /* Neutral-tinted card */
  .cl-card[data-tone='neutral'] {
    --cl-card-bg: var(--color-neutral-100-vis);
    --cl-card-fg: var(--color-neutral-950-vis);
    --cl-card-border-color: var(--border-default-color);
  }

  /* Padding scale */
  .cl-card[data-padding='none'] { --cl-card-padding: 0; }
  .cl-card[data-padding='sm']   { --cl-card-padding: var(--spacing-3, .5rem); }
  .cl-card[data-padding='md']   { --cl-card-padding: var(--spacing-5, 1rem); }
  .cl-card[data-padding='lg']   { --cl-card-padding: var(--spacing-6, 1.25rem); }

  /* Elevation (use simple fallbacks if shadow tokens aren’t present) */
  .cl-card[data-shadow='none'] { --cl-card-shadow: none; }
  .cl-card[data-shadow='sm']   { --cl-card-shadow: var(--shadow-sm, 0 1px 2px rgba(0,0,0,.06)); }
  .cl-card[data-shadow='md']   { --cl-card-shadow: var(--shadow-md, 0 2px 6px rgba(0,0,0,.08)); }
  .cl-card[data-shadow='lg']   { --cl-card-shadow: var(--shadow-lg, 0 6px 12px rgba(0,0,0,.12)); }

  /* Rounded toggle */
  .cl-card[data-rounded='false'] { --cl-card-radius: 0; }

  /* Border toggle */
  .cl-card[data-border='false'] { border-width: 0; }
</style>

