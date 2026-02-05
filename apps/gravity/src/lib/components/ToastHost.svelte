<script lang="ts">
  import { fly, fade } from 'svelte/transition';
  import { toasts, toast } from '$lib/stores/toast';
</script>

<div class="host" aria-live="polite" aria-relevant="additions removals">
  {#each $toasts as t (t.id)}
    <div class={`t t--${t.kind}`} role="status" in:fly={{ y: -8, duration: 160 }} out:fade={{ duration: 120 }}>
      <div class="msg">{t.message}</div>
      <button class="x" type="button" aria-label="Dismiss" on:click={() => toast.remove(t.id)}>×</button>
    </div>
  {/each}
</div>

<style>
  .host {
    position: fixed;
    top: 12px;
    right: 12px;
    z-index: 99999;
    display: grid;
    gap: 8px;
    width: min(360px, calc(100vw - 24px));
    pointer-events: none;
  }

  .t {
    pointer-events: auto;
    display: grid;
    grid-template-columns: 1fr auto;
    gap: 10px;
    align-items: start;

    border-radius: 14px;
    padding: 10px 12px;
    border: 1px solid var(--gp-border, rgba(255,255,255,0.12));
    background: rgba(20, 20, 24, 0.92);
    backdrop-filter: blur(8px);
  }

  .t--success { box-shadow: 0 0 0 1px rgba(120, 255, 180, 0.20) inset; }
  .t--error   { box-shadow: 0 0 0 1px rgba(255, 120, 120, 0.22) inset; }
  .t--info    { box-shadow: 0 0 0 1px rgba(120, 180, 255, 0.22) inset; }

  .msg { font-size: 13px; line-height: 1.35; opacity: 0.95; }
  .x {
    border: 0;
    background: transparent;
    color: inherit;
    opacity: 0.7;
    cursor: pointer;
    font-size: 16px;
    line-height: 1;
    padding: 2px 6px;
  }
  .x:hover { opacity: 1; }
</style>
