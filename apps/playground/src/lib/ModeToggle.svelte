<script lang="ts">
  import { onMount } from 'svelte';
  import { browser } from '$app/environment';
  import { setTheme } from '@clothesline/themes';
  import { Sun } from '@clothesline/icons';
  import { Moon } from '@clothesline/icons';

  // Public props
  export let size = 32;                 // button size (px)
  export let rounded = 8;               // border radius (px)
  export let title = 'Toggle light/dark';

  type Mode = 'light' | 'dark';
  const STORAGE_KEY = 'cl_mode';

  let mode: Mode = 'light';

  function apply(next: Mode) {
    mode = next;
    setTheme({ mode: next });           // hands off to your themes package
    if (browser) {
      document.documentElement.style.colorScheme = next;
      localStorage.setItem(STORAGE_KEY, next);
    }
  }

  function toggle() {
    apply(mode === 'light' ? 'dark' : 'light');
  }

  onMount(() => {
    if (!browser) return;

    // Priority: localStorage → <html data-mode> → system preference
    const saved = localStorage.getItem(STORAGE_KEY) as Mode | null;
    const htmlAttr = document.documentElement.getAttribute('data-mode') as Mode | null;

    if (saved === 'light' || saved === 'dark') {
      apply(saved);
    } else if (htmlAttr === 'light' || htmlAttr === 'dark') {
      apply(htmlAttr);
    } else {
      const prefersDark = window.matchMedia?.('(prefers-color-scheme: dark)').matches;
      apply(prefersDark ? 'dark' : 'light');
    }

    // Keyboard shortcut: Cmd/Ctrl + J
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && (e.key === 'j' || e.key === 'J')) {
        e.preventDefault();
        toggle();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });
</script>

<button
  class="mode-btn"
  on:click={toggle}
  aria-pressed={mode === 'dark'}
  aria-label={title}
  title={title}
  style={`--btn-size:${size}px; --btn-radius:${rounded}px`}
>
  <!-- Icon swap -->
  {#if mode === 'dark'}
    <span class="icon moon"><Moon size={16} /></span>
  {:else}
    <span class="icon sun"><Sun size={16} /></span>
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
    border: 1px solid var(--color-surface-300);
    background: color-mix(in oklab, var(--color-surface-100) 90%, transparent);
    color: var(--on-surface);
    transition: background .15s ease, border-color .15s ease, transform .08s ease;
  }
  .mode-btn:hover {
    background: color-mix(in oklab, var(--color-surface-100) 100%, transparent);
    border-color: var(--color-surface-400);
  }
  .mode-btn:active { transform: translateY(1px); }
  .mode-btn:focus-visible {
    outline: 2px solid var(--color-info-500);
    outline-offset: 2px;
  }

  .icon { opacity: .95; }
  .sun  { transform-origin: 50% 50%; }
  .moon { transform-origin: 50% 50%; }

  @media (prefers-reduced-motion: no-preference) {
    .sun  { animation: spin-in .25s ease both; }
    .moon { animation: pop-in  .20s ease both; }
  }
  @keyframes spin-in {
    from { opacity: 0; rotate: -90deg; scale: .8; }
    to   { opacity: 1; rotate: 0deg;    scale: 1; }
  }
  @keyframes pop-in {
    from { opacity: 0; scale: .85; }
    to   { opacity: 1; scale: 1; }
  }
</style>
