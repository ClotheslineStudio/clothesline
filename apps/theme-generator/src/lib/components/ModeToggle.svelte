<script lang="ts">
  import { onMount } from 'svelte';
  import { browser } from '$app/environment';
  import { Moon, Sun } from '@clothesline/icons';
  import { setTheme } from '@clothesline/themes';

  export let size = 32;
  export let rounded = 8;
  export let title = 'Toggle light/dark';

  type Mode = 'light' | 'dark';
  const STORAGE_KEY = 'cl_mode';
  let mode: Mode = 'light';

  function apply(next: Mode) {
    mode = next;
    setTheme({ mode: next });
    if (!browser) return;
    document.documentElement.style.colorScheme = next;
    localStorage.setItem(STORAGE_KEY, next);
  }

  function toggle() {
    apply(mode === 'light' ? 'dark' : 'light');
  }

  onMount(() => {
    if (!browser) return;
    const saved = localStorage.getItem(STORAGE_KEY) as Mode | null;
    const htmlAttr = document.documentElement.getAttribute('data-mode') as Mode | null;

    if (saved === 'light' || saved === 'dark') apply(saved);
    else if (htmlAttr === 'light' || htmlAttr === 'dark') apply(htmlAttr);
    else apply(window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  });
</script>

<button class="mode-btn" on:click={toggle} aria-pressed={mode === 'dark'} aria-label={title} title={title} style={`--btn-size:${size}px; --btn-radius:${rounded}px`}>
  {#if mode === 'dark'}
    <span class="icon moon" aria-hidden="true"><Moon size={16} /></span>
  {:else}
    <span class="icon sun" aria-hidden="true"><Sun size={16} /></span>
  {/if}
</button>

<style>
  .mode-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: var(--btn-size);
    height: var(--btn-size);
    border-radius: var(--btn-radius);
    border: var(--border-interactive, 1px) solid var(--border-default-color, var(--color-surface-300));
    background: var(--icon-button-bg, color-mix(in oklab, var(--background-elevation-1, var(--background-panel, var(--color-surface-100))) 92%, transparent));
    color: var(--icon, var(--on-surface));
    box-shadow: 0 1px 2px color-mix(in oklab, var(--on-surface) 10%, transparent);
  }

  .mode-btn:hover {
    background: var(--icon-button-bg-hover, color-mix(in oklab, var(--background-elevation-2, var(--background-panel, var(--color-surface-100))) 100%, transparent));
    border-color: var(--button-border-hover, var(--border-hover, var(--color-surface-400)));
  }

  .mode-btn:focus-visible {
    outline: var(--button-focus-ring-width, 2px) solid var(--button-focus-ring-color, var(--ring-color, var(--color-info-500)));
    outline-offset: var(--button-focus-ring-offset, 2px);
  }

  .icon { opacity: var(--opacity-95, 0.95); }
</style>
