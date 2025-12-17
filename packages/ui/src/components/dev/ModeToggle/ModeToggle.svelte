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
    border-radius: var(--button-radius, var(--radius-interactive));

    /* Surface + border derived from semantic "on-surface" */
    background: var(--background-elevation-1, var(--color-surface-100-vis));
    border: var(--border-width-default) solid
      var(--border-color-default, var(--color-surface-300-vis) var(--opacity-border), transparent);

    color: var(--on-surface);

    transition:
      background var(--motion-duration-fast) var(--motion-ease),
      border-color var(--motion-duration-fast) var(--motion-ease),
      transform var(--motion-duration-fast) var(--motion-ease);
  }

  .mode-btn:hover {
    background: var(--background-elevation-2, var(--color-surface-200-vis));
    border-color: var(--border-color-hover, var(--color-primary-300-vis) calc(var(--opacity-border) * 1.5), transparent);
  }

  .mode-btn:active {
    transform: translateY(1px);
  }

  .mode-btn:focus-visible {
    outline: var(--focus-width) solid
      color-mix(in oklab, var(--on-surface) var(--opacity-focus), transparent);
    outline-offset: var(--focus-offset-2);
  }

  .icon { opacity: 0.95; }
  .sun,
  .moon { transform-origin: 50% 50%; }

  @media (prefers-reduced-motion: no-preference) {
    .sun  { animation: spin-in var(--motion-duration-fast) var(--motion-ease) both; }
    .moon { animation: pop-in  var(--motion-duration-fast) var(--motion-ease) both; }
  }

  @keyframes spin-in {
    from { opacity: 0; rotate: -90deg; scale: 0.8; }
    to   { opacity: 1; rotate: 0deg;   scale: 1; }
  }

  @keyframes pop-in {
    from { opacity: 0; scale: 0.85; }
    to   { opacity: 1; scale: 1; }
  }
</style>

