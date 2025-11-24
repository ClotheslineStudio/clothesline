<script context="module" lang="ts">
  export type Tone =
    | 'default'
    | 'muted'
    | 'primary'
    | 'success'
    | 'warning'
    | 'error'
    | 'info';
</script>

<script lang="ts">
  import { Text } from "../Text/Text.svelte";

  // Your props (kept for compatibility)
  export let forId: string | undefined = undefined;
  export let visuallyHidden = false;
  export let required = false;
  export let className = '';

  // New ergonomic props (optional)
  export let htmlFor: string | undefined = undefined; // alias for 'for'
  export let optional = false;
  export let tone: Tone = 'default';

  // Resolve 'for' attribute from either prop
  $: labelFor = htmlFor ?? forId;
</script>

<label for={labelFor} class={`label ${visuallyHidden ? 'sr-only' : ''}`}>
  <!-- Use Text for consistent typography tokens (overline is a nice label preset) -->
  <Text as="span" variant="overline" {tone} className={className}>
    <slot />
    {#if required}
      <span aria-hidden="true" class="label-required">&nbsp;*</span>
      <span class="sr-only"> required</span>
    {/if}
    {#if optional}
      <span class="opt-hint">(optional)</span>
    {/if}
  </Text>
</label>

<style>
  .label {
    display: inline-flex;
    align-items: baseline;
    gap: 0.25rem;
    cursor: pointer;
    color: inherit;
  }

  .label-required {
    color: var(--text-error, var(--color-error-700));
    font-weight: var(--font-weight-semibold, 600);
  }

  .opt-hint {
    margin-left: 0.25rem;
    color: var(--text-muted, var(--color-surface-700));
    font-weight: var(--font-weight-light, 300);
  }

  /* Visually hidden utility (kept from your version) */
  .sr-only {
    position: absolute;
    width: 1px; height: 1px;
    padding: 0; margin: -1px;
    overflow: hidden; clip: rect(0,0,0,0);
    white-space: nowrap; border: 0;
  }
</style>
