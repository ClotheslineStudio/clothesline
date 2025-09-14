<script context="module" lang="ts">
  export type AlertVariant = 'neutral' | 'info' | 'success' | 'warning' | 'error';
</script>

<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  export let variant: AlertVariant = 'neutral';
  export let title: string | undefined;
  export let dismissible = false;
  export let id: string | undefined;

  const dispatch = createEventDispatcher<{ close: void }>();

  // choose live politeness automatically
  $: role = variant === 'error' ? 'alert' : undefined;
  let ariaLive: 'assertive' | 'polite';
  $: ariaLive = (variant === 'error' || variant === 'warning') ? 'assertive' : 'polite';

  function close() { dispatch('close'); }
</script>

<div
  class="cl-alert"
  data-variant={variant}
  {id}
  role={role}
  aria-live={ariaLive}
>
  <div class="cl-alert__body">
    {#if title}<div class="cl-alert__title">{title}</div>{/if}
    <div class="cl-alert__content">
      <slot />
    </div>
  </div>
  {#if dismissible}
    <button class="cl-alert__close" aria-label="Dismiss" on:click={close}>✕</button>
  {/if}
</div>

<style>
  .cl-alert{
    display:flex; align-items:flex-start; gap: var(--alert-gap);
    padding: var(--alert-padding-y) var(--alert-padding-x);
    border: var(--alert-border); border-color: var(--alert-border-color);
    border-radius: var(--alert-radius); box-shadow: var(--alert-shadow);
    background: var(--alert-bg); color: var(--alert-text);
  }
  .cl-alert__title{ font-weight:600; margin-bottom:.125rem; }
  .cl-alert__content{ line-height:1.4; }
  .cl-alert__close{
    margin-inline-start:auto; background:transparent; border:0; cursor:pointer;
    color: var(--alert-action-color);
  }
  .cl-alert__close:hover{ color: var(--alert-action-color-hover); }

  /* variants */
  .cl-alert[data-variant="info"]    { --alert-bg: var(--alert-info-bg); --alert-text: var(--alert-info-text); --alert-border-color: var(--alert-info-border-color); }
  .cl-alert[data-variant="success"] { --alert-bg: var(--alert-success-bg); --alert-text: var(--alert-success-text); --alert-border-color: var(--alert-success-border-color); }
  .cl-alert[data-variant="warning"] { --alert-bg: var(--alert-warning-bg); --alert-text: var(--alert-warning-text); --alert-border-color: var(--alert-warning-border-color); }
  .cl-alert[data-variant="error"]   { --alert-bg: var(--alert-error-bg); --alert-text: var(--alert-error-text); --alert-border-color: var(--alert-error-border-color); }
</style>
