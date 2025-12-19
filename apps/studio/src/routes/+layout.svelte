<script lang="ts">
  import '../app.css';

  // UI kit header
  import { Header as ClHeader } from '@clothesline/ui';

  // Shared components
  import Footer from '$lib/components/Footer.svelte';
  import AccessibilityButton from '$lib/components/AccessibilityButton.svelte';

  // Theme controls from themes package
  import { onMount } from 'svelte';
  import { setTheme, getTheme, type ModeState } from '@clothesline/themes';
  import { ModeToggle, ThemePicker } from '@clothesline/ui';

  
  import { page } from '$app/stores';

  const links = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/projects', label: 'Projects' },
    { href: '/blog', label: 'Blog' },
    { href: '/docs', label: 'Docs' },
    { href: '/testimonials', label: 'Testimonials' },
    { href: '/contact', label: 'Contact' }
  ];

  let mobileOpen = false;

  // Initialize theme system the same way as icon app
  onMount(() => {
    const current = getTheme();

    setTheme({
      theme: current.theme ?? 'bigsky',      // or 'clothesline' if you prefer
      mode: current.mode ?? 'light',
      vision: current.vision ?? 'none',
      contrast: current.contrast ?? 'normal'
    });
  });

  function setVision(vision: ModeState['vision']) {
    setTheme({ vision });
  }
</script>

<svelte:head>
   <!-- Favicon package -->
  <link
    rel="icon"
    type="image/png"
    href="/my-favicon/favicon-96x96.png"
    sizes="96x96"
  />
  <link
    rel="icon"
    type="image/svg+xml"
    href="/my-favicon/favicon.svg"
  />
  <link
    rel="shortcut icon"
    href="/my-favicon/favicon.ico"
  />
  <link
    rel="apple-touch-icon"
    sizes="180x180"
    href="/my-favicon/apple-touch-icon.png"
  />
  <meta name="apple-mobile-web-app-title" content="Clothesline" />
  <link
    rel="manifest"
    href="/my-favicon/site.webmanifest"
  />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="theme-color" content="#171123" />
  <meta
    name="description"
    content="Portfolio of Travis Peterson, Creative Technologist and Strategist."
  />
  <title>Clothesline Studio</title>
</svelte:head>

<div class="min-h-screen flex flex-col bg-(--body-background-color) text-(--base-font-color)">
  <!-- Global header using UI kit -->
  <ClHeader
    sticky
    bordered
    elevated
    maxWidth="page"
    className="studio-header"
  >
    <!-- LEFT: logo / brand -->
    <svelte:fragment slot="left">
      <a
        href="/"
        class="flex items-center gap-2 rounded-lg font-extrabold tracking-tight text-(--base-font-color) hover:text-(--color-accent) transition focus:outline-none focus:ring-2 focus:ring-(--color-accent) focus:ring-offset-2 focus:ring-offset-[var(--background-app, var(--color-surface-50))]"
      >
        <img
          src="/image/clotheslinestudio-logo.svg"
          alt="Clothesline Studio"
          class="h-8 w-8 rounded-md object-contain"
        />
       
      </a>
    </svelte:fragment>

    <!-- CENTER: main nav -->
    <svelte:fragment slot="center">
      <nav
        class="hidden items-center gap-5 text-sm font-semibold text-(--text-muted) md:flex"
        aria-label="Primary navigation"
      >
        {#each links as link}
          {@const active = $page.url.pathname === link.href}
          <a
            href={link.href}
            aria-current={active ? 'page' : undefined}
            class="rounded-md px-2 py-1 transition {active
              ? 'text-(--color-accent-500)'
              : 'text-(--text-muted) hover:text-(--color-accent-500)'}"
          >
            {link.label}
          </a>
        {/each}
      </nav>
    </svelte:fragment>

    <!-- RIGHT: mode/theme + mobile menu -->
    <svelte:fragment slot="right">
      <div class="flex items-center gap-2">
        <!-- Theme controls using your themes package -->
        <ModeToggle size={32} rounded={999} title="Toggle light/dark" />
        <ThemePicker />

        <!-- Mobile nav button (desktop hidden) -->
        <button
          type="button"
          class="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-(--border-muted-color) bg-(--background-panel) text-(--base-font-color) shadow-sm transition hover:border-(--color-accent) md:hidden"
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
          on:click={() => (mobileOpen = !mobileOpen)}
        >
          <span class="sr-only">Toggle navigation</span>
          {#if mobileOpen}
            ✕
          {:else}
            ☰
          {/if}
        </button>
      </div>
    </svelte:fragment>
  </ClHeader>

  <!-- Mobile nav panel (under header) -->
  {#if mobileOpen}
    <div class="border-b border-(--border-muted-color) bg-[color-mix(in_oklab,var(--background-panel) 85%,transparent)] backdrop-blur-md md:hidden">
      <nav
        class="mx-auto flex w-full flex-col gap-1 px-(--layout-page-padding-inline) pb-3 pt-2"
        aria-label="Mobile navigation"
      >
        {#each links as link}
          <a
            href={link.href}
            on:click={() => (mobileOpen = false)}
            aria-current={$page.url.pathname === link.href ? 'page' : undefined}
            class={`flex items-center rounded-lg px-3 py-2 text-sm font-medium transition
              ${$page.url.pathname === link.href
                ? 'bg-(--color-primary-100-vis) text-(--color-primary-900-vis)'
                : 'text-(--text-muted) hover:bg-(--color-surface-100) hover:text-(--base-font-color)'}`}
          >
            {link.label}
          </a>
        {/each}
      </nav>
    </div>
  {/if}

  <!-- MAIN CONTENT (shared width with header) -->
  <main
    class="flex-1 w-full mx-auto pb-10"
    style="
      max-width: var(--layout-page-width);
      padding-inline: var(--layout-page-padding-inline);
      padding-top: 2.5rem;
    "
  >
    <slot />
  </main>

  <!-- Accessibility control block, aligned to width -->
  <div
    class="mx-auto w-full pb-10"
    style="
      max-width: var(--layout-page-width);
      padding-inline: var(--layout-page-padding-inline);
    "
  >
    <AccessibilityButton />
  </div>

  <Footer />
</div>

<style>
  /* Make the UI header look glassy on the studio site */
  :global(.studio-header.cl-header) {
    background-color: color-mix(
      in oklab,
      var(--background-panel, var(--color-surface-50)) 75%,
      transparent
    );
    backdrop-filter: blur(18px);
    -webkit-backdrop-filter: blur(18px);
    border-bottom: 1px solid color-mix(
      in oklab,
      var(--border-muted-color, var(--color-surface-200)) 80%,
      transparent
    );
  }

  :global(html[data-mode='dark'] .studio-header.cl-header) {
    background-color: color-mix(
      in oklab,
      var(--background-panel, var(--color-surface-900)) 80%,
      transparent
    );
    border-bottom-color: color-mix(
      in oklab,
      var(--border-muted-color, var(--color-surface-700)) 85%,
      transparent
    );
  }

  /* Keep header inner width in sync with page width, but make it more compact */
  :global(.cl-header--page .cl-header__inner) {
    max-width: var(--layout-page-width);
    padding-inline: 0.75rem;
    gap: 0.5rem;
  }

  /* Make the header itself more compact */
  :global(.cl-header__inner) {
    padding-block: 0.25rem;
    min-height: 2.5rem;
  }
</style>


