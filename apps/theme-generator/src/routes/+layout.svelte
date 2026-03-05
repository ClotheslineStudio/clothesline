<script lang="ts">
  import '../app.css';
  import logo from '$lib/assets/image/Logo-03.svg';
  import { Header } from '@clothesline/ui';
  import ModeToggle from '$lib/components/ModeToggle.svelte';
  import { page } from '$app/stores';
  import { onMount } from 'svelte';
  import { getTheme, setTheme } from '@clothesline/themes';

  let { children } = $props();

  let appsOpen = $state(false);
  let appsMenuEl = $state<HTMLDivElement | null>(null);

  const appLinks = [
    { label: 'Icons', description: 'Icon explorer app', href: 'http://localhost:5173' },
    { label: 'Theme Generator', description: 'Build and export theme presets', href: '/' },
    { label: 'UI Components', description: 'Browse component playground', href: 'http://localhost:5175' }
  ] as const;

  onMount(() => {
    const current = getTheme();
    setTheme({ mode: current.mode ?? 'light' });

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
  <title>Clothesline Theme Generator</title>
  <link rel="icon" href={logo} />
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
  <div class="app-header-fixed">
    <Header bordered elevated maxWidth="page">
      <svelte:fragment slot="left">
        <a href="/" class="flex items-center" style="gap: var(--spacing-2); font-family: var(--type-heading-family); font-size: var(--type-scale-lg); font-weight: var(--type-weight-bold); line-height: var(--type-heading-leading);">
          <img src={logo} alt="Clothesline Theme Generator" class="object-contain" style="width: var(--size-10); height: var(--size-10); border-radius: var(--radius-md);" />
          <div class="flex flex-col" style="line-height: var(--type-leading-tight);">
            <span style="font-size: var(--type-scale-md); letter-spacing: var(--type-tracking-tight); color: var(--base-font-color);">Clothesline</span>
            <span style="font-size: 12px; font-weight: var(--type-weight-medium); color: var(--text-muted);">Theme Generator</span>
          </div>
        </a>
      </svelte:fragment>

      <svelte:fragment slot="center">
        <nav class="header-main-nav" aria-label="Primary navigation">
          <a href="/" class="header-main-link" class:header-main-link--active={$page.url.pathname === '/'}>Home</a>
          <a href="/docs" class="header-main-link" class:header-main-link--active={$page.url.pathname.startsWith('/docs')}>Docs</a>

          <div class="header-apps-menu" bind:this={appsMenuEl}>
            <button type="button" class="header-main-link header-main-link--button" class:header-main-link--active={appsOpen} aria-haspopup="menu" aria-expanded={appsOpen} onclick={() => (appsOpen = !appsOpen)}>
              Apps
              <svg class:apps-caret-open={appsOpen} class="apps-caret" viewBox="0 0 12 12" aria-hidden="true">
                <path d="M3 4l3 4 3-4" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" />
              </svg>
            </button>

            {#if appsOpen}
              <div class="apps-popover" role="menu" aria-label="Apps">
                {#each appLinks as app}
                  <a href={app.href} target={app.href.startsWith('http') ? '_blank' : undefined} rel={app.href.startsWith('http') ? 'noreferrer' : undefined} role="menuitem" class="apps-item" onclick={() => (appsOpen = false)}>
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
          <div aria-hidden="true" style="width: 1px; height: var(--size-6); margin-inline: var(--spacing-2); background-color: var(--border-muted-color);"></div>
          <a href="https://github.com/clotheslinestudio" target="_blank" rel="noreferrer" class="header-icon-link" aria-label="Clothesline on GitHub">
            <svg class="header-icon" viewBox="0 0 24 24" aria-hidden="true">
              <path fill="currentColor" d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
            </svg>
          </a>
        </div>
      </svelte:fragment>
    </Header>
  </div>

  <main class="flex-1 w-full mx-auto pb-(--spacing-6,1.5rem) relative" style="max-width: var(--layout-page-width, 1640px); padding-inline: var(--page-gutter-x, var(--spacing-6, 1.5rem)); padding-top: var(--spacing-4, 1rem);">
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

  .app-header-fixed {
    position: fixed;
    inset-block-start: 0;
    inset-inline: 0;
    z-index: 1200;
    background: color-mix(in oklab, var(--background-app, var(--color-surface-50-vis)) 82%, transparent);
    backdrop-filter: blur(8px);
  }

  main {
    padding-top: calc(var(--app-header-height, 88px) + var(--spacing-4, 1rem)) !important;
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

  .header-main-link--button { cursor: pointer; }
  .header-apps-menu { position: relative; }
  .apps-caret { width: 11px; height: 11px; opacity: 0.75; transition: transform 120ms ease; }
  .apps-caret-open { transform: rotate(180deg); }

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

  .apps-item:hover { background: var(--background-elevation-2, var(--color-surface-100-vis)); }
  .apps-item-title { font-size: 14px; font-weight: 600; line-height: 1.25; }
  .apps-item-description { font-size: 12px; color: var(--on-surface-muted, var(--color-surface-700-vis)); line-height: 1.3; }
  .header-icon-link {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    border-radius: var(--radius-full);
    border: 1px solid var(--border-color-default, var(--color-surface-400-vis));
    background: var(--background-elevation-1, var(--color-surface-100-vis));
    color: var(--on-surface, var(--color-surface-800-vis));
    box-shadow: 0 1px 2px color-mix(in oklab, var(--on-surface) 12%, transparent);
  }

  .header-icon { width: 15px; height: 15px; }
</style>
