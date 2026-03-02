<script lang="ts">
  import '../app.css';
  import logo from '$lib/assets/favicon.svg';
  import { Header, ThemePicker, ModeToggle } from '@clothesline/ui';
  import { page } from '$app/stores';
  import { onMount } from 'svelte';
  import { setTheme, getTheme } from '@clothesline/themes';

  let { children } = $props();

  let appsOpen = $state(false);
  let appsMenuEl = $state<HTMLDivElement | null>(null);

  const appLinks = [
    {
      label: 'Icons',
      description: 'Icon explorer app',
      href: 'http://localhost:5173'
    },
    {
      label: 'Theme Generator',
      description: 'Build and export theme presets',
      href: 'http://localhost:5174'
    },
    {
      label: 'UI Components',
      description: 'Browse component playground',
      href: 'http://localhost:5175'
    }
  ] as const;

  onMount(() => {
    const current = getTheme();
    setTheme({
      theme: current.theme ?? 'clothesline',
      mode: current.mode ?? 'light',
      vision: current.vision ?? 'none',
      contrast: current.contrast ?? 'normal'
    });

    const handlePointerDown = (event: PointerEvent) => {
      if (!appsOpen || !appsMenuEl) return;
      const target = event.target as Node | null;
      if (target && !appsMenuEl.contains(target)) appsOpen = false;
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') appsOpen = false;
    };

    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('keydown', handleEscape);
    };
  });
</script>

<svelte:head>
  <link rel="icon" href={logo} />
  <title>Theme Generator</title>
</svelte:head>

<div
  class="min-h-screen flex flex-col"
  style="
    --app-header-height: 88px;
    --layout-page-width: 1640px;
    --page-gutter-x: var(--spacing-6, 1.5rem);
    background-color: var(--background-app);
  "
>
  <Header bordered elevated maxWidth="page">
    <svelte:fragment slot="left">
      <a
        href="/"
        class="flex items-center"
        style="
          gap: var(--spacing-2);
          font-family: var(--type-heading-family);
          font-size: var(--type-scale-lg);
          font-weight: var(--type-weight-bold);
          line-height: var(--type-heading-leading);
        "
      >
        <img
          src={logo}
          alt="Clothesline Theme Generator"
          class="object-contain"
          style="
            width: var(--size-10);
            height: var(--size-10);
            border-radius: var(--radius-md);
          "
        />
        <div class="flex flex-col" style="line-height: var(--type-leading-tight);">
          <span
            style="
              font-size: var(--type-scale-md);
              letter-spacing: var(--type-tracking-tight);
              color: var(--base-font-color);
            "
          >
            Clothesline
          </span>
          <span
            style="
              font-size: 12px;
              font-weight: var(--type-weight-medium);
              color: var(--text-muted);
            "
          >
            Theme Generator
          </span>
        </div>
      </a>
    </svelte:fragment>

    <svelte:fragment slot="center">
      <nav class="header-main-nav" aria-label="Primary navigation">
        <a
          href="/"
          class="header-main-link"
          class:header-main-link--active={$page.url.pathname === '/'}
        >
          Home
        </a>
        <a
          href="http://localhost:5173/docs"
          class="header-main-link"
        >
          Docs
        </a>

        <div class="header-apps-menu" bind:this={appsMenuEl}>
          <button
            type="button"
            class="header-main-link header-main-link--button"
            class:header-main-link--active={appsOpen}
            aria-haspopup="menu"
            aria-expanded={appsOpen}
            onclick={() => (appsOpen = !appsOpen)}
          >
            Apps
            <svg class:apps-caret-open={appsOpen} class="apps-caret" viewBox="0 0 12 12" aria-hidden="true">
              <path d="M3 4l3 4 3-4" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" />
            </svg>
          </button>

          {#if appsOpen}
            <div class="apps-popover" role="menu" aria-label="Apps">
              {#each appLinks as app}
                <a
                  href={app.href}
                  target="_blank"
                  rel="noreferrer"
                  role="menuitem"
                  class="apps-item"
                  onclick={() => (appsOpen = false)}
                >
                  <span class="apps-item-title">{app.label}</span>
                  <span class="apps-item-description">{app.description}</span>
                </a>
              {/each}
            </div>
          {/if}
        </div>
      </nav>
    </svelte:fragment>

    <svelte:fragment slot="right">
      <div class="flex items-center" style="gap: var(--spacing-3);">
        <ModeToggle size={32} rounded={999} title="Toggle light/dark" />
        <div class="header-theme-picker">
          <ThemePicker />
        </div>
      </div>
    </svelte:fragment>
  </Header>

  <main
    class="
      flex-1
      w-full
      mx-auto
      pb-(--spacing-6,1.5rem)
      relative
    "
    style="
      max-width: var(--layout-page-width, 1640px);
      padding-inline: var(--page-gutter-x, var(--spacing-6, 1.5rem));
      padding-top: var(--spacing-4, 1rem);
    "
  >
    {@render children()}
  </main>
</div>

<style>
  :global(.cl-header--page .cl-header__inner) {
    max-width: var(--layout-page-width, 1640px);
    padding-inline: var(--page-gutter-x, var(--spacing-6, 1.5rem));
    padding-block: var(--spacing-4);
  }

  :global(.cl-header__section.cl-header__section--center),
  :global(.cl-header__slot.cl-header__slot--center) {
    overflow: visible !important;
  }

  .header-main-nav {
    display: flex;
    align-items: center;
    gap: var(--spacing-2, 0.5rem);
    border: 1px solid var(--border-color-default, var(--color-surface-300-vis));
    border-radius: var(--radius-full);
    background: color-mix(in oklab, var(--background-panel, var(--color-surface-100-vis)) 86%, transparent);
    padding: var(--spacing-1, 0.25rem);
    box-shadow: 0 1px 2px color-mix(in oklab, var(--on-surface) 10%, transparent);
  }

  .header-main-link {
    display: inline-flex;
    align-items: center;
    gap: var(--spacing-1, 0.25rem);
    height: 34px;
    padding-inline: var(--spacing-3, 0.75rem);
    border-radius: var(--radius-full);
    border: 1px solid transparent;
    font-size: 14px;
    font-weight: 500;
    color: var(--on-surface-muted, var(--color-surface-700-vis));
    text-decoration: none;
    transition: background 140ms ease, border-color 140ms ease, color 140ms ease;
  }

  .header-main-link:hover {
    background: var(--background-elevation-2, var(--color-surface-200-vis));
    color: var(--on-surface, var(--color-surface-900-vis));
  }

  .header-main-link--active {
    border-color: var(--border-color-default, var(--color-surface-400-vis));
    background: var(--background-elevation-2, var(--color-surface-200-vis));
    color: var(--on-surface-strong, var(--color-surface-950-vis));
    box-shadow: 0 1px 1px color-mix(in oklab, var(--on-surface) 10%, transparent);
  }

  .header-main-link--button {
    cursor: pointer;
  }

  .header-apps-menu {
    position: relative;
  }

  .apps-caret {
    width: 11px;
    height: 11px;
    opacity: 0.75;
    transition: transform 120ms ease;
  }

  .apps-caret-open {
    transform: rotate(180deg);
  }

  .apps-popover {
    position: absolute;
    top: calc(100% + var(--spacing-2, 0.5rem));
    left: 0;
    min-width: 260px;
    border-radius: var(--radius-container, 0.875rem);
    border: 1px solid var(--border-color-default, var(--color-surface-300-vis));
    background: var(--background-elevation-1, var(--background-panel, var(--color-surface-50-vis)));
    box-shadow: 0 14px 34px color-mix(in oklab, var(--on-surface) 16%, transparent);
    padding: var(--spacing-2, 0.5rem);
    z-index: 1200;
  }

  .apps-item {
    display: grid;
    gap: 2px;
    padding: var(--spacing-2, 0.5rem) var(--spacing-3, 0.75rem);
    border-radius: var(--radius-interactive, 0.625rem);
    text-decoration: none;
    color: var(--on-surface, var(--color-surface-900-vis));
    transition: background 140ms ease;
  }

  .apps-item:hover {
    background: var(--background-elevation-2, var(--color-surface-100-vis));
  }

  .apps-item-title {
    font-size: 14px;
    font-weight: 600;
    line-height: 1.25;
  }

  .apps-item-description {
    font-size: 12px;
    color: var(--on-surface-muted, var(--color-surface-700-vis));
    line-height: 1.3;
  }

  .header-theme-picker :global(.tp-btn) {
    min-width: 142px;
    justify-content: center;
  }

  :global(html[data-mode='dark']) .header-main-nav {
    border-color: var(--border-color-default, var(--color-surface-600-vis, #475569));
    background: color-mix(in oklab, var(--background-elevation-2, var(--color-surface-800-vis, #1f2937)) 92%, transparent);
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.35);
  }

  :global(html[data-mode='dark']) .header-main-link {
    color: var(--on-surface-muted, var(--color-surface-300-vis, #cbd5e1));
  }

  :global(html[data-mode='dark']) .header-main-link:hover,
  :global(html[data-mode='dark']) .header-main-link--active {
    background: var(--background-elevation-3, var(--color-surface-700-vis, #334155));
    border-color: var(--border-color-default, var(--color-surface-500-vis, #64748b));
    color: var(--on-surface-strong, var(--color-surface-50-vis, #f8fafc));
  }

  :global(html[data-mode='dark']) .apps-popover {
    background: var(--background-elevation-2, var(--color-surface-850-vis, #1e293b));
    border-color: var(--border-color-default, var(--color-surface-600-vis, #475569));
  }

  :global(html[data-mode='dark']) .apps-item:hover {
    background: var(--background-elevation-3, var(--color-surface-700-vis, #334155));
  }
</style>
