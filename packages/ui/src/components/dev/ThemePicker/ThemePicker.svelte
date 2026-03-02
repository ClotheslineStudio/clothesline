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
    clothesline: { title: 'Clothesline', subtitle: 'Accessible - Neutral', contrast: '1.2x', cardBg: '#ECEDEF', mark: 'heart' },
    bigsky: { title: 'Big Sky', subtitle: 'Bright - Airy', contrast: '1.1x', cardBg: '#CFEDEE', mark: 'heart' },
    'copper-sun': { title: 'Copper Sun', subtitle: 'Warm - Energetic', contrast: '1.0x', cardBg: '#F0E0D6', mark: 'heart' },
    milkyway: { title: 'Milky Way', subtitle: 'Cosmic - Cinematic', contrast: '1.3x', cardBg: '#D9E4EE', mark: 'heart' },
    'night-market': { title: 'Night Market', subtitle: 'Vibrant - Urban', contrast: '1.3x', cardBg: '#CEDAE6', mark: 'heart' },
    retrograde: { title: 'Retrograde', subtitle: 'Luminous - Neon', contrast: '1.1x', cardBg: '#E4E3F0', mark: 'heart' },
    'tidal-glass': { title: 'Tidal Glass', subtitle: 'Calm - Reflective', contrast: '1.2x', cardBg: '#CFEFEE', mark: 'heart' },
    timberline: { title: 'Timberline', subtitle: 'Natural - Grounded', contrast: '1.1x', cardBg: '#D0DFDF', mark: 'tree' }
  };

  const HEART = '\u2661';
  const TREE = '\u2663';

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
    if (panel && !panel.contains(t) && anchor && !anchor.contains(t)) open = false;
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
  <span class="tp-dot" aria-hidden="true"></span>
  <span class="tp-label">{THEME_META[currentTheme].title}</span>
  <svg class="tp-caret" width="12" height="12" viewBox="0 0 12 12" aria-hidden="true">
    <path d="M3 4l3 4 3-4" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
  </svg>
</button>

{#if open}
  <div class="tp-backdrop" aria-hidden="true"></div>
  <div class="tp-panel" bind:this={panel} role="dialog" aria-label="Choose a theme">
    <header class="tp-head">
      <h3>Themes</h3>
      <span aria-hidden="true">{HEART}</span>
    </header>

    <section class="tp-grid">
      {#each previews as p}
        <button
          class="tp-card"
          style={`--card-bg:${THEME_META[p.name].cardBg};`}
          on:click={() => chooseTheme(p.name)}
          aria-label={`Switch to ${THEME_META[p.name].title}`}
        >
          <div class="tp-mark" aria-hidden="true">{THEME_META[p.name].mark === 'tree' ? TREE : HEART}</div>
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

    <footer class="tp-foot">Clothesline Studio 2025</footer>
  </div>
{/if}

<style>
  .tp-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    height: 36px;
    padding: 0 0.75rem 0 0.55rem;
    border-radius: 0.65rem;
    border: 1px solid var(--border-color-default, var(--color-surface-400-vis));
    background: var(--background-elevation-1, var(--background-panel, var(--color-surface-100-vis)));
    color: var(--on-surface, var(--color-surface-900-vis));
    font-size: 14px;
    font-weight: 600;
    line-height: 1;
    box-shadow: 0 1px 2px color-mix(in oklab, var(--on-surface) 12%, transparent);
    cursor: pointer;
    transition: background 150ms ease, border-color 150ms ease, box-shadow 150ms ease, transform 80ms ease;
  }

  .tp-btn:hover {
    background: var(--background-elevation-2, var(--color-surface-200-vis));
    border-color: var(--border-hover, var(--color-surface-500-vis));
  }

  .tp-btn:active {
    transform: translateY(1px);
  }

  .tp-btn:focus-visible {
    outline: 2px solid var(--focus-ring-color, var(--color-info-500));
    outline-offset: 2px;
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
    white-space: nowrap;
    max-width: 8.5rem;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .tp-caret {
    opacity: 0.7;
  }

  .tp-backdrop {
    position: fixed;
    inset: 0;
    background: color-mix(in oklab, var(--color-surface-950, #020617) 22%, transparent);
    backdrop-filter: blur(2px);
    z-index: var(--z-dropdown, 1000);
  }

  .tp-panel {
    position: fixed;
    right: var(--page-gutter-x, 16px);
    top: calc(var(--app-header-height, 88px) + 8px);
    z-index: calc(var(--z-dropdown, 1000) + 1);
    width: min(780px, calc(100vw - (var(--page-gutter-x, 16px) * 2)));
    max-height: min(78vh, 680px);
    overflow: auto;
    border-radius: 1rem;
    border: 1px solid var(--border-color-default, var(--color-surface-300-vis));
    background: var(--background-panel, var(--color-surface-50-vis, #f3f4f6));
    box-shadow: 0 20px 52px rgba(0, 0, 0, 0.18);
    padding: 1rem;
    color: var(--on-surface, var(--color-surface-900-vis));
  }

  .tp-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.1rem 0.2rem 0.85rem;
  }

  .tp-head h3 {
    margin: 0;
    font-size: 2rem;
    line-height: 1;
    font-weight: 700;
    color: var(--on-surface-strong, var(--color-surface-950-vis));
  }

  .tp-head span {
    font-size: 1.4rem;
    line-height: 1;
    color: var(--on-surface, var(--color-surface-900-vis));
  }

  .tp-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 0.95rem;
  }

  .tp-card {
    display: grid;
    grid-template-columns: auto 1fr auto;
    align-items: center;
    gap: 0.9rem;
    min-height: 106px;
    padding: 0.9rem 1rem;
    border-radius: 0.8rem;
    border: 1px solid color-mix(in oklab, var(--on-surface) 16%, transparent);
    background: var(--card-bg, var(--color-surface-100-vis));
    color: #1d2430;
    text-align: left;
    transition: transform 120ms ease, box-shadow 120ms ease, border-color 120ms ease;
    cursor: pointer;
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
    font-size: 1.5rem;
    line-height: 1;
    opacity: 0.92;
  }

  .tp-copy {
    min-width: 0;
    display: grid;
    gap: 0.22rem;
  }

  .tp-name {
    font-size: 1.02rem;
    line-height: 1.1;
    font-weight: 700;
  }

  .tp-subtitle {
    font-size: 0.72rem;
    line-height: 1.2;
    color: var(--on-surface, var(--color-surface-900-vis));
    opacity: 0.75;
  }

  .tp-contrast {
    margin-top: 0.12rem;
    font-family: var(--type-code-family);
    font-size: 0.62rem;
    color: var(--on-surface-muted, var(--color-surface-700-vis));
    letter-spacing: 0.01em;
  }

  .tp-swatches {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 0.42rem;
  }

  .tp-swatch {
    width: 16px;
    height: 16px;
    border-radius: 999px;
    box-shadow: inset 0 0 0 1px color-mix(in oklab, var(--on-surface) 18%, transparent);
  }

  .tp-foot {
    margin-top: 1rem;
    border-top: 1px solid color-mix(in oklab, var(--on-surface) 12%, transparent);
    padding: 0.9rem 0.2rem 0.1rem;
    font-size: 0.68rem;
    color: var(--on-surface-muted, var(--color-surface-700-vis));
  }

  :global(html[data-mode='dark']) .tp-btn {
    background: var(--background-elevation-2, var(--color-surface-800-vis, #1f2937));
    border-color: var(--border-color-default, var(--color-surface-600-vis, #475569));
    color: var(--on-surface-strong, var(--color-surface-50-vis, #f8fafc));
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.35);
  }

  :global(html[data-mode='dark']) .tp-btn:hover {
    background: var(--background-elevation-3, var(--color-surface-700-vis, #334155));
    border-color: var(--border-hover, var(--color-surface-500-vis, #64748b));
  }

  :global(html[data-mode='dark']) .tp-panel {
    background: var(--background-elevation-1, var(--color-surface-900-vis, #121826));
    border-color: var(--border-color-default, var(--color-surface-700-vis, #334155));
    color: var(--on-surface, var(--color-surface-100-vis, #e5e7eb));
  }

  :global(html[data-mode='dark']) .tp-head h3 {
    color: var(--on-surface-strong, var(--color-surface-50-vis, #f8fafc));
  }

  :global(html[data-mode='dark']) .tp-head span {
    color: var(--on-surface, var(--color-surface-200-vis, #cbd5e1));
  }

  :global(html[data-mode='dark']) .tp-card {
    background: color-mix(in oklab, var(--card-bg, #d9e4ee) 38%, var(--color-surface-900-vis, #111827));
    border-color: color-mix(in oklab, var(--on-surface) 22%, transparent);
    color: var(--on-surface-strong, var(--color-surface-100-vis, #f1f5f9));
  }

  :global(html[data-mode='dark']) .tp-subtitle {
    color: var(--on-surface, var(--color-surface-200-vis, #cbd5e1));
    opacity: 0.9;
  }

  :global(html[data-mode='dark']) .tp-contrast,
  :global(html[data-mode='dark']) .tp-foot {
    color: var(--on-surface-muted, var(--color-surface-400-vis, #94a3b8));
  }

  @media (max-width: 880px) {
    .tp-panel {
      right: 12px;
      width: min(640px, calc(100vw - 24px));
    }

    .tp-grid {
      grid-template-columns: 1fr;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .tp-card {
      transition: none;
    }
  }
</style>
