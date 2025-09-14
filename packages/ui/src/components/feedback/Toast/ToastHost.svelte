<script lang="ts">
  import { toasts, type ToastItem } from './toast.store.js';
  import { fly, fade } from 'svelte/transition';

  function colorFor(v: ToastItem['variant']) {
    switch (v) {
      case 'info': return 'var(--toast-info-bg)';
      case 'success': return 'var(--toast-success-bg)';
      case 'warning': return 'var(--toast-warning-bg)';
      case 'error': return 'var(--toast-error-bg)';
      default: return 'var(--toast-bg)';
    }
  }
</script>

<div class="cl-toast-host" aria-live="polite" aria-atomic="false">
  {#each $toasts as t (t.id)}
    <div class="cl-toast" style={`background:${colorFor(t.variant)};`} in:fly={{ y: -12, duration: 140 }} out:fade={{ duration: 120 }}>
      <div class="cl-toast__body">
        {#if t.title}<div class="cl-toast__title">{t.title}</div>{/if}
        <div class="cl-toast__msg">{t.message}</div>
      </div>
      <button class="cl-toast__close" on:click={() => toasts.dismiss(t.id)} aria-label="Dismiss">✕</button>
    </div>
  {/each}
</div>

<style>
  .cl-toast-host{
    position: fixed; inset: 1rem 1rem auto auto; z-index: var(--toast-z);
    display: grid; gap: .5rem; pointer-events: none;
  }
  .cl-toast{
    inline-size: var(--toast-width);
    border: var(--toast-border);
    color: var(--toast-text);
    border-radius: var(--toast-radius);
    box-shadow: var(--toast-shadow);
    padding: var(--toast-padding-y) var(--toast-padding-x);
    display:flex; gap: var(--toast-gap); align-items:flex-start;
    pointer-events: auto;
  }
  .cl-toast__title{ font-weight:600; margin-bottom:.125rem; }
  .cl-toast__msg{ line-height:1.35; }
  .cl-toast__close{ margin-left:auto; background:transparent; border:0; cursor:pointer; color: var(--on-surface-strong); }
</style>
