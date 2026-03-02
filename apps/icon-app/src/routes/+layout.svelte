<script lang="ts">
  import '../app.css';
  import logo from '$lib/assets/image/Logo-03.svg';
  import { Header, ThemePicker } from '@clothesline/ui';
  import ModeToggle from '$lib/components/ModeToggle.svelte';
  import { page } from '$app/stores';
  import { onMount } from 'svelte';
  import { setTheme, getTheme, type ModeState } from '@clothesline/themes';

  let { children } = $props();

  let appsOpen = $state(false);
  let appsMenuEl = $state<HTMLDivElement | null>(null);

  const appLinks = [
    {
      label: 'Icons',
      description: 'Icon explorer app',
      href: '/'
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

  function setVision(vision: ModeState['vision']) {
    setTheme({ vision });
  }

  function setContrastNormal() {
    setTheme({ contrast: 'normal' });
  }

  function setContrastHigh() {
    setTheme({ contrast: 'high' });
  }

  function setContrastCustom(value: number) {
    setTheme({ contrast: { custom: value } });
  }
</script>

<svelte:head>
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
          alt="Clothesline Icons"
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
            Icons
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
          href="/docs"
          class="header-main-link"
          class:header-main-link--active={$page.url.pathname.startsWith('/docs')}
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
                  target={app.href.startsWith('http') ? '_blank' : undefined}
                  rel={app.href.startsWith('http') ? 'noreferrer' : undefined}
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

        <div
          aria-hidden="true"
          style="
            width: 1px;
            height: var(--size-6);
            margin-inline: var(--spacing-2);
            background-color: var(--border-muted-color);
          "
        ></div>

        <a
          href="https://github.com/clotheslinestudio/icons"
          target="_blank"
          rel="noreferrer"
          class="header-icon-link"
          aria-label="Clothesline Icons on GitHub"
        >
          <svg class="header-icon" viewBox="0 0 24 24" aria-hidden="true">
            <path
              fill="currentColor"
              d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
            />
          </svg>
        </a>

        <a
          href="https://www.figma.com/@clothesline"
          target="_blank"
          rel="noreferrer"
          class="header-icon-link"
          aria-label="Clothesline on Figma"
        >
          <svg class="header-icon" viewBox="0 0 24 24" aria-hidden="true">
            <path
              fill="currentColor"
              d="M15.852 8.981h-4.588V0h4.588c2.476 0 4.49 2.014 4.49 4.49s-2.014 4.491-4.49 4.491zM12.735 7.51h3.117c1.665 0 3.019-1.355 3.019-3.019s-1.355-3.019-3.019-3.019h-3.117V7.51zm0 1.471H8.148c-2.476 0-4.49-2.014-4.49-4.49S5.672 0 8.148 0h4.588v8.981zm-4.587-7.51c-1.665 0-3.019 1.355-3.019 3.019s1.354 3.02 3.019 3.02h3.117V1.471H8.148zm4.587 15.019H8.148c-2.476 0-4.49-2.014-4.49-4.49s2.014-4.49 4.49-4.49h4.588v8.98zM8.148 8.981c-1.665 0-3.019 1.355-3.019 3.019s1.355 3.019 3.019 3.019h3.117V8.981H8.148zM8.172 24c-2.489 0-4.515-2.014-4.515-4.49s2.014-4.49 4.49-4.49h4.588v4.441c0 2.503-2.047 4.539-4.563 4.539zm-.024-7.51a3.023 3.023 0 0 0-3.019 3.019c0 1.665 1.365 3.019 3.044 3.019 1.705 0 3.093-1.376 3.093-3.068v-2.97H8.148zm7.704 0h-.098c-2.476 0-4.49-2.014-4.49-4.49s2.014-4.49 4.49-4.49h.098c2.476 0 4.49 2.014 4.49 4.49s-2.014 4.49-4.49 4.49zm-.097-7.509c-1.665 0-3.019 1.355-3.019 3.019s1.355 3.019 3.019 3.019h.098c1.665 0 3.019-1.355 3.019-3.019s-1.355-3.019-3.019-3.019h-.098z"
            />
          </svg>
        </a>
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
    transition: background 140ms ease, border-color 140ms ease, color 140ms ease, transform 80ms ease;
  }

  .header-icon-link:hover {
    background: var(--background-elevation-2, var(--color-surface-200-vis));
    border-color: var(--border-hover, var(--color-surface-500-vis));
  }

  .header-icon-link:active {
    transform: translateY(1px);
  }

  .header-icon-link:focus-visible {
    outline: 2px solid var(--button-focus-ring-color, var(--ring-color, var(--color-info-500)));
    outline-offset: 2px;
  }

  .header-icon {
    width: 15px;
    height: 15px;
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

  :global(html[data-mode='dark']) .header-icon-link {
    background: var(--background-elevation-2, var(--color-surface-800-vis, #1f2937));
    border-color: var(--border-color-default, var(--color-surface-600-vis, #475569));
    color: var(--on-surface-strong, var(--color-surface-50-vis, #f8fafc));
  }

  :global(html[data-mode='dark']) .header-icon-link:hover {
    background: var(--background-elevation-3, var(--color-surface-700-vis, #334155));
    border-color: var(--border-hover, var(--color-surface-500-vis, #64748b));
  }
</style>
