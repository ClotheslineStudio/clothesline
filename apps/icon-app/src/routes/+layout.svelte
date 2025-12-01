<script lang="ts">
  import '../app.css';
  import logo from '$lib/assets/image/Logo-03.svg';
  import githubIcon from '$lib/assets/github.svg';
  import figmaIcon from '$lib/assets/figma.svg';
  import { Header } from '@clothesline/ui';

  import ModeToggle from '$lib/components/ModeToggle.svelte';
  import ThemePicker from '$lib/components/ThemePicker.svelte';

  import { onMount } from 'svelte';
  import { setTheme } from '@clothesline/themes';

  let { children } = $props();

  onMount(() => {
    const html = document.documentElement;
    const existingTheme = html.getAttribute('data-theme');
    const existingMode = html.getAttribute('data-mode');

    if (!existingTheme) setTheme({ theme: 'clothesline' });
    if (!existingMode) setTheme({ mode: 'light' });
  });
</script>

<svelte:head>
  <link rel="icon" href={logo} />
</svelte:head>

<div class="min-h-screen flex flex-col bg-[color:var(--background-app,var(--color-surface-50))]">
  <!-- HEADER (full width) -->
  <Header bordered elevated maxWidth="page">
    <!-- LEFT: logo -->
    <svelte:fragment slot="left">
      <a href="/" class="font-bold text-lg flex items-center gap-2">
        <img src={logo} class="w-6 h-6 rounded" alt="Clothesline Icons" />
        <div class="flex flex-col leading-tight">
          <span class="text-sm tracking-tight">Clothesline</span>
          <span class="text-[11px] font-medium text-neutral-500">Icons</span>
        </div>
      </a>
    </svelte:fragment>

    <!-- CENTER: primary nav -->
    <svelte:fragment slot="center">
      <nav
        class="flex items-center gap-4 text-sm font-medium text-neutral-600"
        aria-label="Primary navigation"
      >
        <a href="/" class="cl-nav-link cl-nav-link-active">Home</a>
        <a href="/docs" class="cl-nav-link">Docs</a>
        <a href="/themes" class="cl-nav-link">Themes</a>
      </nav>
    </svelte:fragment>

    <!-- RIGHT: toggles + links -->
    <svelte:fragment slot="right">
      <div class="flex items-center gap-3">
        <ModeToggle size={32} rounded={999} title="Toggle light/dark" />
        <ThemePicker />

        <div class="h-6 w-px bg-neutral-300 mx-1" aria-hidden="true"></div>

        <a
          href="https://github.com/clotheslinestudio/icons"
          target="_blank"
          rel="noreferrer"
          class="inline-flex h-8 w-8 items-center justify-center rounded-full border border-neutral-300 bg-white hover:bg-neutral-100 transition"
          aria-label="Clothesline Icons on GitHub"
        >
          <img src={githubIcon} alt="GitHub" class="h-4 w-4" />
        </a>

        <a
          href="https://www.figma.com/@clothesline"
          target="_blank"
          rel="noreferrer"
          class="inline-flex h-8 w-8 items-center justify-center rounded-full border border-neutral-300 bg-white hover:bg-neutral-100 transition"
          aria-label="Clothesline on Figma"
        >
          <img src={figmaIcon} alt="Figma" class="h-4 w-4" />
        </a>
      </div>
    </svelte:fragment>
  </Header>

  <!-- MAIN CONTAINER -->
  <main
    class="
      flex-1
      w-full
      mx-auto
      px-[var(--spacing-6,1.5rem)]
      pt-[var(--spacing-3,0.75rem)]
      pb-[var(--spacing-6,1.5rem)]
      relative
    "
    style="max-width: 1120px;"
  >
    {@render children()}
  </main>
</div>

<style>
  /* keep header inner width aligned with page */
  :global(.cl-header--page .cl-header__inner) {
    max-width: 1120px;
    padding-inline: var(--spacing-6, 1.5rem);
  }
</style>








