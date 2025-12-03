<script lang="ts">
  import '../app.css';
  import logo from '$lib/assets/image/Logo-03.svg';
  import githubIcon from '$lib/assets/github.svg';
  import figmaIcon from '$lib/assets/figma.svg';
  import { Header } from '@clothesline/ui';

  import ModeToggle from '$lib/components/ModeToggle.svelte';
  import ThemePicker from '$lib/components/ThemePicker.svelte';

  import { onMount } from 'svelte';
  import {
    setTheme,
    getTheme,
    type ModeState
  } from '@clothesline/themes';

  let { children } = $props();

  // --- Theme init -----------------------------------------------------------
  onMount(() => {
    const current = getTheme();

    setTheme({
      theme: current.theme ?? 'clothesline',
      mode: current.mode ?? 'light',
      vision: current.vision ?? 'none',
      contrast: current.contrast ?? 'normal'
    });
  });

  // --- (Optional) helpers you can wire to UI controls ----------------------
  function setVision(vision: ModeState['vision'] | 'protan' | 'deutan' | 'tritan' | 'mono') {
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
    --app-header-height: 88px;              /* tweak this if needed */
    background-color: var(--background-app);
  "
>
  <!-- HEADER (full width) -->
  <Header bordered elevated maxWidth="page">
    <!-- LEFT: logo -->
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



   <!-- CENTER: primary nav -->
<svelte:fragment slot="center">
  <nav
    class="flex items-center"
    aria-label="Primary navigation"
    style="
      gap: var(--spacing-4);
      font-family: var(--type-link-family);
      font-size: var(--type-link-size);
      font-weight: var(--type-link-weight);
      line-height: var(--type-link-leading);
      letter-spacing: var(--type-link-tracking);
      color: var(--sidebar-link-color, var(--text-muted));
    "
  >
    <a href="/" class="cl-nav-link cl-nav-link-active">Home</a>
    <a href="/docs" class="cl-nav-link">Docs</a>
    <a href="/themes" class="cl-nav-link">Themes</a>
  </nav>
</svelte:fragment>


    <!-- RIGHT: toggles + links -->
  <svelte:fragment slot="right">
  <div
    class="flex items-center"
    style="gap: var(--spacing-3);"
  >
    <ModeToggle size={32} rounded={999} title="Toggle light/dark" />
    <ThemePicker />

    <!-- Divider -->
    <div
      aria-hidden="true"
      style="
        width: 1px;
        height: var(--size-6);
        margin-inline: var(--spacing-2);
        background-color: var(--border-muted-color);
      "
    ></div>

    <!-- GitHub -->
    <a
      href="https://github.com/clotheslinestudio/icons"
      target="_blank"
      rel="noreferrer"
      class="inline-flex items-center justify-center"
      aria-label="Clothesline Icons on GitHub"
      style="
        width: var(--size-control-sm);
        height: var(--size-control-sm);
        border-radius: var(--radius-full);
        border: 1px solid var(--border-default-color);
        background-color: var(--color-surface-0);
        transition: var(--button-transition);
      "
      onmouseover={(e) => (e.currentTarget.style.backgroundColor = 'var(--color-surface-100)')}
      onmouseout={(e) => (e.currentTarget.style.backgroundColor = 'var(--color-surface-0)')}
      onfocus={(e) => (e.currentTarget.style.backgroundColor = 'var(--color-surface-100)')}
      onblur={(e) => (e.currentTarget.style.backgroundColor = 'var(--color-surface-0)')}
    >
      <img
        src={githubIcon}
        alt="GitHub"
        style="
          width: var(--size-4);
          height: var(--size-4);
        "
      />
    </a>

    <!-- Figma -->
    <a
      href="https://www.figma.com/@clothesline"
      target="_blank"
      rel="noreferrer"
      class="inline-flex items-center justify-center"
      aria-label="Clothesline on Figma"
      style="
        width: var(--size-control-sm);
        height: var(--size-control-sm);
        border-radius: var(--radius-xl);
        border: 1px solid var(--border-default-color);
        background-color: var(--color-surface-50);
        transition: var(--button-transition);
      "
      on:mouseover={(e) => (e.currentTarget.style.backgroundColor = 'var(--color-surface-100)')}
      on:mouseout={(e) => (e.currentTarget.style.backgroundColor = 'var(--color-surface-50)')}
    >
      <img
        src={figmaIcon}
        alt="Figma"
        style="
          width: var(--size-4);
          height: var(--size-4);
        "
      />
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
      px-(--spacing-6,1.5rem)
      pb-(--spacing-6,1.5rem)
      relative
    "
    style="
      max-width: var(--layout-page-width, 1440px);
      padding-top: 0;
    "
  >
    {@render children()}
  </main>
</div>

<style>
  /* keep header inner width aligned with page, and increase height */
  :global(.cl-header--page .cl-header__inner) {
    max-width: var(--layout-page-width, 1440px);
    padding-inline: var(--spacing-6, 1.5rem);
    padding-block: var(--spacing-4); /* ↑ taller header */
  }
</style>











