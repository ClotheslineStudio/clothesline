<script lang="ts">
  import { onMount } from 'svelte';
  import { browser } from '$app/environment';
  import { setTheme } from '@clothesline/themes';

  const THEMES = [
    'clothesline',
    'bigsky',
    'copper-sun',
    'milkyway',
    'night-market',
    'retrograde',
    'tidal-glass',
    'timberline'
  ] as const;
  type ThemeName = (typeof THEMES)[number];

  const SWATCH_VARS = [
    '--color-primary-500',
    '--color-secondary-500',
    '--color-neutral-700',
    '--color-warning-500',
    '--color-success-500',
    '--color-accent-500',
    '--color-error-500',
    '--color-info-500'
  ] as const;

  const THEME_META: Record<
    ThemeName,
    { title: string; subtitle: string; contrast: string; cardBg: string; mark: 'heart' | 'tree' }
  > = {
    clothesline: {
      title: 'Clothesline',
      subtitle: 'Accessible · Neutral',
      contrast: '1.2x',
      cardBg: '#ECEDEF',
      mark: 'heart'
    },
    bigsky: {
      title: 'Big Sky',
      subtitle: 'Bright · Airy',
      contrast: '1.1x',
      cardBg: '#CFEDEE',
      mark: 'heart'
    },
    'copper-sun': {
      title: 'Copper Sun',
      subtitle: 'Warm · Energetic',
      contrast: '1.0x',
      cardBg: '#F0E0D6',
      mark: 'heart'
    },
    milkyway: {
      title: 'Milky Way',
      subtitle: 'Cosmic · Cinematic',
      contrast: '1.3x',
      cardBg: '#D9E4EE',
      mark: 'heart'
    },
    'night-market': {
      title: 'Night Market',
      subtitle: 'Vibrant · Urban',
      contrast: '1.3x',
      cardBg: '#CEDAE6',
      mark: 'heart'
    },
    retrograde: {
      title: 'Retrograde',
      subtitle: 'Luminous · Neon',
      contrast: '1.1x',
      cardBg: '#E4E3F0',
      mark: 'heart'
    },
    'tidal-glass': {
      title: 'Tidal Glass',
      subtitle: 'Calm · Reflective',
      contrast: '1.2x',
      cardBg: '#CFEFEE',
      mark: 'heart'
    },
    timberline: {
      title: 'Timberline',
      subtitle: 'Natural · Grounded',
      contrast: '1.1x',
      cardBg: '#D0DFDF',
      mark: 'tree'
    }
  };

  type ThemePreview = {
    name: ThemeName;
    vars: Record<string, string>;
  };

  let open = false;
  let anchor: HTMLButtonElement | null = null;
  let panel: HTMLDivElement | null = null;
  let currentTheme: ThemeName = 'clothesline';
  let previews: ThemePreview[] = [];

  function readVar(root: HTMLElement, name: string) {
    const v = getComputedStyle(root).getPropertyValue(name).trim();
    return v || 'transparent';
  }

  async function collectPreviews() {
    if (!browser) return;
    const html = document.documentElement;
    const prevTheme = html.getAttribute('data-theme');
    const prevMode = html.getAttribute('data-mode') || 'light';
    const prevVision = html.getAttribute('data-vision');
    const out: ThemePreview[] = [];

    const prevVis = html.style.visibility;
    html.style.visibility = 'hidden';

    for (const name of THEMES) {
      html.setAttribute('data-theme', name);
      html.setAttribute('data-mode', 'light');
      if (prevVision) html.removeAttribute('data-vision');
      getComputedStyle(html).width;

      const map: Record<string, string> = {};
      for (const v of SWATCH_VARS) map[v] = readVar(html, v);
      out.push({ name, vars: map });
    }

    if (prevTheme) html.setAttribute('data-theme', prevTheme);
    else html.removeAttribute('data-theme');
    html.setAttribute('data-mode', prevMode);
    if (prevVision) html.setAttribute('data-vision', prevVision);
    html.style.visibility = prevVis;
    previews = out;
  }

  function chooseTheme(name: ThemeName) {
    currentTheme = name;
    setTheme({ theme: name });
    open = false;
    queueMicrotask(() => anchor?.focus());
  }

  function onKeydown(e: KeyboardEvent) {
    if (e.key === 'Escape') {
      open = false;
      queueMicrotask(() => anchor?.focus());
    }
  }

  function onDocumentClick(e: MouseEvent) {
    if (!open) return;
    const t = e.target as Node;
    if (panel && !panel.contains(t) && anchor && !anchor.contains(t)) {
      open = false;
    }
  }

  onMount(() => {
    const t = document.documentElement.getAttribute('data-theme') as ThemeName | null;
    if (t && THEMES.includes(t)) currentTheme = t;
    collectPreviews();

    document.addEventListener('keydown', onKeydown);
    document.addEventListener('click', onDocumentClick, { capture: true });
    return () => {
      document.removeEventListener('keydown', onKeydown);
      document.removeEventListener('click', onDocumentClick, { capture: true } as any);
    };
  });
</script>

<button
  class="tp-btn"
  bind:this={anchor}
  aria-haspopup="dialog"
  aria-expanded={open}
  on:click={() => (open = !open)}
  title="Change theme"
>
  <span class="tp-dot"></span>
  <span class="tp-label">{THEME_META[currentTheme].title}</span>
  <svg class="tp-caret" width="12" height="12" viewBox="0 0 12 12" aria-hidden="true">
    <path d="M3 4l3 4 3-4" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
  </svg>
</button>

{#if open}
  <div class="tp-backdrop"></div>
  <div class="tp-panel" bind:this={panel} role="dialog" aria-label="Choose a theme">
    <header class="tp-head">
      <h3>Themes</h3>
      <span aria-hidden="true">♡</span>
    </header>

    <section class="tp-grid">
      {#each previews as p}
        <button
          class="tp-card"
          style={`--card-bg:${THEME_META[p.name].cardBg};`}
          on:click={() => chooseTheme(p.name)}
          aria-label={`Switch to ${THEME_META[p.name].title}`}
        >
          <div class="tp-mark" aria-hidden="true">{THEME_META[p.name].mark === 'tree' ? '♟' : '♡'}</div>
          <div class="tp-copy">
            <div class="tp-name">{THEME_META[p.name].title}</div>
            <div class="tp-subtitle">{THEME_META[p.name].subtitle}</div>
            <div class="tp-contrast">Contrast: {THEME_META[p.name].contrast}</div>
          </div>
          <div class="tp-swatches">
            {#each SWATCH_VARS as v}
              <span class="tp-swatch" style={`background:${p.vars[v]};`} title={`${v}: ${p.vars[v]}`}></span>
            {/each}
          </div>
        </button>
      {/each}
    </section>

    <footer class="tp-foot">
      Clothesline Studio 2025
    </footer>
  </div>
{/if}

<style>
  .tp-btn {
    display: inline-flex;
    align-items: center;
    gap: var(--spacing-2, 0.5rem);
    height: var(--size-control-sm, 32px);
    padding: 0 var(--spacing-3, 0.75rem) 0 var(--spacing-2, 0.5rem);
    border-radius: var(--radius-interactive, 0.6rem);
    border: 1px solid var(--border-color-default, var(--color-surface-300));
    background: color-mix(in oklab, var(--background-panel, var(--color-surface-100)) 92%, transparent);
    color: var(--on-surface);
    font-size: var(--type-scale-sm, 0.875rem);
  }

  .tp-dot {
    width: 0.8rem;
    height: 0.8rem;
    border-radius: 999px;
    background: conic-gradient(
      from 0deg,
      var(--color-secondary-500),
      var(--color-accent-500),
      var(--color-success-500),
      var(--color-warning-500),
      var(--color-error-500),
      var(--color-secondary-500)
    );
    box-shadow: 0 0 0 2px var(--background-panel, var(--color-surface-50)) inset;
  }

  .tp-label {
    max-width: 8.5rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .tp-caret {
    opacity: 0.7;
  }

  .tp-backdrop {
    position: fixed;
    inset: 0;
    background: transparent;
    z-index: var(--z-dropdown, 1000);
  }

  .tp-panel {
    position: absolute;
    right: var(--spacing-5, 20px);
    top: calc(var(--app-header-height, 88px) + var(--spacing-2, 8px));
    z-index: calc(var(--z-dropdown, 1000) + 1);
    width: min(980px, 96vw);
    border-radius: var(--radius-container, 16px);
    border: 1px solid var(--border-color-default, var(--color-surface-300));
    background: var(--background-panel, var(--color-surface-50));
    box-shadow: var(--elevation-menu, 0 20px 52px rgba(0, 0, 0, 0.18));
    padding: 1rem;
  }

  .tp-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.25rem 0.25rem 0.85rem;
  }

  .tp-head h3 {
    margin: 0;
    font-size: 2rem;
    line-height: 1;
    font-weight: 700;
    color: var(--on-surface-strong, var(--color-surface-950));
  }

  .tp-head span {
    font-size: 1.6rem;
    line-height: 1;
    color: var(--on-surface, var(--color-surface-900));
  }

  .tp-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 1rem 1.1rem;
  }

  .tp-card {
    display: grid;
    grid-template-columns: auto 1fr auto;
    align-items: center;
    gap: 0.95rem;
    min-height: 104px;
    padding: 0.9rem 1rem;
    border-radius: 0.8rem;
    border: 1px solid color-mix(in oklab, var(--on-surface) 16%, transparent);
    background: var(--card-bg);
    text-align: left;
    transition: transform 120ms ease, box-shadow 120ms ease, border-color 120ms ease;
  }

  .tp-card:hover {
    transform: translateY(-1px);
    border-color: color-mix(in oklab, var(--on-surface) 26%, transparent);
    box-shadow: 0 6px 20px color-mix(in oklab, var(--on-surface) 14%, transparent);
  }

  .tp-card:focus-visible {
    outline: 2px solid var(--focus-ring-color, var(--color-primary-500));
    outline-offset: 2px;
  }

  .tp-mark {
    font-size: 1.8rem;
    line-height: 1;
    color: var(--on-surface-strong, var(--color-surface-900));
    opacity: 0.92;
  }

  .tp-copy {
    min-width: 0;
    display: grid;
    gap: 0.2rem;
  }

  .tp-name {
    font-size: 2rem;
    line-height: 1.05;
    font-weight: 700;
    color: var(--on-surface-strong, var(--color-surface-950));
  }

  .tp-subtitle {
    font-size: 1.65rem;
    line-height: 1.12;
    color: var(--on-surface, var(--color-surface-900));
    opacity: 0.78;
  }

  .tp-contrast {
    margin-top: 0.15rem;
    font-family: var(--type-code-family);
    font-size: 1.25rem;
    color: var(--on-surface-muted, var(--color-surface-700));
    letter-spacing: 0.01em;
  }

  .tp-swatches {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 0.5rem;
  }

  .tp-swatch {
    width: 20px;
    height: 20px;
    border-radius: 999px;
  }

  .tp-foot {
    margin-top: 1rem;
    border-top: 1px solid color-mix(in oklab, var(--on-surface) 12%, transparent);
    padding: 1rem 0.2rem 0.2rem;
    font-size: 1.5rem;
    color: var(--on-surface-muted, var(--color-surface-700));
  }

  @media (max-width: 980px) {
    .tp-panel {
      right: var(--spacing-3, 12px);
      width: min(760px, 96vw);
    }

    .tp-grid {
      grid-template-columns: 1fr;
    }
  }
</style>
