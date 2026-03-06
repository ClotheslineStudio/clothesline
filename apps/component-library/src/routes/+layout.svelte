<script lang="ts">
  import '../app.css';
  import { page } from '$app/stores';
  import { onMount } from 'svelte';
  import { getTheme, setTheme } from '@clothesline/themes';
  import { Header, ModeToggle, ThemePicker, TableOfContents, Input, Stack } from '@clothesline/ui';
  import { docsSections } from '$lib/docs/registry';

  let { children } = $props();

  onMount(() => {
    const current = getTheme();
    setTheme({
      theme: current.theme ?? 'clothesline',
      mode: current.mode ?? 'light',
      vision: current.vision ?? 'none',
      contrast: current.contrast ?? 'normal'
    });
  });

  function isActive(href: string) {
    return $page.url.pathname === href;
  }
</script>

<div class="docs-app">
  <div class="docs-header-wrap">
    <Header bordered elevated maxWidth="page">
      <svelte:fragment slot="left">
        <a href="/" class="brand">
          <span class="brand__mark">CL</span>
          <span class="brand__text">
            <strong>Component Library</strong>
            <span>Clothesline UI</span>
          </span>
        </a>
      </svelte:fragment>

      <svelte:fragment slot="center">
        <nav class="top-nav" aria-label="Main">
          <a href="/" class:active={isActive('/')}>Get started</a>
          <a href="/components/button" class:active={$page.url.pathname.startsWith('/components')}>Components</a>
        </nav>
      </svelte:fragment>

      <svelte:fragment slot="right">
        <Stack direction="row" gap="sm" align="center">
          <div class="search-shell" aria-hidden="true">
            <Input placeholder="Search docs (soon)" className="search-input" />
          </div>
          <ModeToggle size={30} rounded={999} title="Toggle light/dark" />
          <ThemePicker />
        </Stack>
      </svelte:fragment>
    </Header>
  </div>

  <div class="docs-shell">
    <aside class="docs-sidebar">
      {#each docsSections as section}
        <div class="sidebar-group">
          <p>{section.title}</p>
          {#each section.items as item}
            <a
              href={item.slug === 'introduction' ? '/' : `/components/${item.slug}`}
              class:active={$page.url.pathname === (item.slug === 'introduction' ? '/' : `/components/${item.slug}`)}
            >
              <span>{item.title}</span>
              {#if item.tag}
                <span class={`nav-tag nav-tag--${item.tag}`}>{item.tag}</span>
              {/if}
            </a>
          {/each}
        </div>
      {/each}
    </aside>

    <main class="docs-main">
      <article class="docs-content">
        {@render children()}
      </article>
    </main>

    <aside class="docs-toc">
      <TableOfContents selector=".docs-content" levels={[2, 3]} className="docs-toc-card" />
    </aside>
  </div>
</div>

<style>
  .docs-app {
    min-height: 100dvh;
    --layout-page-width: 1640px;
    --page-gutter-x: var(--spacing-6, 1.5rem);
  }

  .docs-header-wrap {
    position: sticky;
    top: 0;
    z-index: 50;
    margin-bottom: var(--spacing-4, 1rem);
    background: color-mix(in oklab, var(--background-app, var(--color-surface-50-vis)) 92%, transparent);
    backdrop-filter: blur(8px);
  }

  :global(.cl-header--page .cl-header__inner) {
    max-width: var(--layout-page-width);
    padding-inline: var(--page-gutter-x);
  }

  .brand {
    display: inline-flex;
    align-items: center;
    gap: var(--spacing-2, 0.5rem);
    text-decoration: none;
    color: var(--on-surface, var(--color-surface-900-vis));
  }

  .brand__mark {
    width: 2rem;
    height: 2rem;
    display: grid;
    place-items: center;
    border-radius: var(--radius-md, 0.5rem);
    background: color-mix(in oklab, var(--primary, var(--color-primary-500-vis)) 16%, transparent);
    border: 1px solid color-mix(in oklab, var(--primary, var(--color-primary-500-vis)) 40%, transparent);
    font-size: 0.75rem;
    font-weight: 700;
  }

  .brand__text {
    display: grid;
    line-height: 1.2;
  }

  .brand__text span {
    font-size: 0.75rem;
    color: var(--on-surface-muted, var(--color-surface-700-vis));
  }

  .top-nav {
    display: inline-flex;
    gap: var(--spacing-2, 0.5rem);
    border: 1px solid var(--border-color-default, var(--color-surface-300-vis));
    border-radius: 999px;
    padding: var(--spacing-1, 0.25rem);
    background: color-mix(in oklab, var(--background-panel, var(--color-surface-100-vis)) 90%, transparent);
  }

  .top-nav a {
    text-decoration: none;
    color: var(--on-surface-muted, var(--color-surface-700-vis));
    font-size: 0.875rem;
    border-radius: 999px;
    padding: 0.35rem 0.75rem;
  }

  .top-nav a.active {
    background: var(--background-elevation-2, var(--color-surface-200-vis));
    color: var(--on-surface, var(--color-surface-900-vis));
  }

  .search-shell {
    width: 220px;
    pointer-events: none;
    opacity: 0.8;
  }

  :global(.search-input) {
    width: 100%;
  }

  .docs-shell {
    width: 100%;
    max-width: var(--layout-page-width);
    margin: 0 auto;
    padding-inline: var(--page-gutter-x);
    display: grid;
    grid-template-columns: var(--docs-sidebar-width) minmax(0, 1fr) var(--docs-toc-width);
    gap: var(--spacing-4, 1rem);
    align-items: start;
  }

  .docs-sidebar {
    position: sticky;
    top: calc(var(--spacing-4, 1rem) + 74px);
    max-height: calc(100dvh - 104px);
    overflow: auto;
    padding: var(--spacing-3, 0.75rem);
  }

  .sidebar-group + .sidebar-group {
    margin-top: var(--spacing-4, 1rem);
  }

  .sidebar-group p {
    margin: 0 0 var(--spacing-2, 0.5rem);
    font-size: 0.84rem;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: var(--on-surface-muted, var(--color-surface-700-vis));
    font-weight: 650;
  }

  .sidebar-group a {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--spacing-2, 0.5rem);
    text-decoration: none;
    color: var(--on-surface, var(--color-surface-800-vis));
    border-radius: var(--radius-interactive, 0.625rem);
    padding: 0.45rem 0.6rem;
    font-size: 0.98rem;
    font-weight: 520;
  }

  .sidebar-group a:hover {
    background: var(--background-elevation-2, var(--color-surface-100-vis));
  }

  .sidebar-group a.active {
    background: color-mix(in oklab, var(--primary, var(--color-primary-500-vis)) 16%, transparent);
    color: var(--on-surface-strong, var(--color-surface-950-vis));
  }

  .nav-tag {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 2.3rem;
    height: 1.25rem;
    padding-inline: 0.4rem;
    border-radius: var(--radius-full);
    font-size: 0.72rem;
    font-weight: 700;
    letter-spacing: 0.02em;
    text-transform: uppercase;
    border: 1px solid transparent;
  }

  .nav-tag--new {
    color: color-mix(in oklab, var(--color-success-700-vis) 80%, white);
    background: color-mix(in oklab, var(--color-success-500-vis) 20%, transparent);
    border-color: color-mix(in oklab, var(--color-success-500-vis) 40%, transparent);
  }

  .nav-tag--beta {
    color: color-mix(in oklab, var(--color-info-700-vis) 78%, white);
    background: color-mix(in oklab, var(--color-info-500-vis) 18%, transparent);
    border-color: color-mix(in oklab, var(--color-info-500-vis) 42%, transparent);
  }

  .docs-main {
    min-height: 60dvh;
  }

  .docs-content {
    padding: clamp(1rem, 2vw, 1.5rem);
  }

  .docs-toc {
    position: sticky;
    top: calc(var(--spacing-4, 1rem) + 74px);
  }

  :global(.docs-toc-card) {
    padding: var(--spacing-2, 0.5rem);
    font-size: 0.92rem;
  }

  :global(.docs-toc-card.cl-toc::before),
  :global(.docs-toc-card .cl-toc::before) {
    display: none;
  }

  :global(.docs-toc-card .level-2) {
    border-left: none !important;
    margin-left: 0;
    padding-left: 0;
  }

  :global(.docs-toc-card .toc-title) {
    margin-bottom: var(--spacing-2, 0.5rem);
    font-size: 1rem;
    font-weight: 650;
    color: var(--on-surface, var(--color-surface-900-vis));
    background: none;
    -webkit-background-clip: initial;
    background-clip: initial;
  }

  :global(.docs-toc-card ul) {
    display: grid;
    gap: 0.2rem;
  }

  :global(.docs-toc-card li) {
    margin: 0;
    padding: 0;
  }

  :global(.docs-toc-card a) {
    width: 100%;
    padding: 0.34rem 0.5rem;
    border-radius: var(--radius-sm, 0.5rem);
    color: var(--on-surface-muted, var(--color-surface-700-vis));
    text-decoration: none;
    opacity: 1;
    gap: 0.4rem;
  }

  :global(.docs-toc-card a::before),
  :global(.docs-toc-card a.active::after) {
    display: none;
  }

  :global(.docs-toc-card a:hover) {
    background: var(--background-elevation-2, var(--color-surface-100-vis));
    color: var(--on-surface, var(--color-surface-900-vis));
    text-decoration: none;
  }

  :global(.docs-toc-card a.active) {
    background: color-mix(in oklab, var(--primary, var(--color-primary-500-vis)) 14%, transparent);
    color: var(--on-surface-strong, var(--color-surface-950-vis));
    font-weight: 600;
  }

  @media (max-width: 1180px) {
    .docs-shell {
      grid-template-columns: 230px minmax(0, 1fr);
    }

    .docs-toc {
      display: none;
    }
  }

  @media (max-width: 860px) {
    .docs-app {
      --page-gutter-x: var(--spacing-2, 0.5rem);
    }

    .docs-shell {
      grid-template-columns: 1fr;
    }

    .docs-sidebar {
      position: static;
      max-height: none;
    }

    .search-shell {
      display: none;
    }
  }
</style>
