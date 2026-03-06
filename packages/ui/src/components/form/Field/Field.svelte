<script lang="ts">
  import Label from '../../typography/Label/Label.svelte';
  import HelpText from '../HelpText/HelpText.svelte';
  import ErrorText from '../ErrorText/ErrorText.svelte';

  export let label = '';
  export let hint = '';
  export let error = '';
  export let required = false;
  export let forId = '';
  export let className = '';

  $: helpId = forId ? `${forId}-help` : undefined;
  $: errorId = forId ? `${forId}-error` : undefined;
</script>

<div class={`cl-field ${className}`.trim()}>
  {#if label}
    <Label forId={forId} required={required}>{label}</Label>
  {/if}

  <div class="cl-field__control">
    <slot id={forId} helpId={helpId} errorId={errorId} />
  </div>

  {#if !error && hint}
    <HelpText id={helpId}>{hint}</HelpText>
  {/if}

  {#if error}
    <ErrorText id={errorId}>{error}</ErrorText>
  {/if}
</div>

<style>
  .cl-field {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-1, 0.25rem);
  }

  .cl-field__control {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-1, 0.25rem);
  }
</style>
