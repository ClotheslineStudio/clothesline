<script lang="ts">
  import { onMount } from 'svelte';
  import { browser } from '$app/environment';
  import { setTheme } from '@clothesline/themes';

  // Themes to show (must be built & loaded in CSS)
  const THEMES = [
    'clothesline',
    'timberline',
    'night-market',
    'retrograde',
    'tidal-glass',
    'copper-sun',
    'milkyway',
    'bigsky'
  ] as const;
  type ThemeName = (typeof THEMES)[number];

  // Small “role” chips (full circles)
  const CHIP_VARS = [
    '--color-primary-500',
    '--color-secondary-500',
    '--color-accent-500',
    '--color-success-500',
    '--color-warning-500',
    '--color-error-500'
  ] as const;

  // Big chips (show more nuance than just white/black)
  // Light + mid + dark samples across surface & neutral
  const BIG_VARS = [
    '--color-surface-100',
    '--color-neutral-200',
    '--color-neutral-700',
    '--color-surface-900'
  ] as const;

  // Extra vars to drive per-card hover/focus (decoupled from global theme)
  const AUX_VARS = [
    '--color-secondary-500', // card hover border/tint
    '--color-info-500',      // focus ring
    '--color-surface-50'     // hover blend base
  ] as const;

  const VARS = Array.from(new Set([...CHIP_VARS, ...BIG_VARS, ...AUX_VARS])) as (typeof CHIP_VARS[number])[];

  type ThemePreview = {
    name: ThemeName;
    vars: Record<string, string>; // varName -> computed value
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

  // Collect color values per theme by temporarily applying it to <html>
  async function collectPreviews() {
    if (!browser) return;
    const html = document.documentElement;
    const prevTheme = html.getAttribute('data-theme');
    const prevMode = html.getAttribute('data-mode') || 'light';
    const prevVision = html.getAttribute('data-vision');

    const out: ThemePreview[] = [];

    // Prevent flicker while sampling
    const prevVis = html.style.visibility;
    html.style.visibility = 'hidden';

    for (const name of THEMES) {
      html.setAttribute('data-theme', name);
      html.setAttribute('data-mode', 'light'); // preview swatches in light
      if (prevVision) html.removeAttribute('data-vision');

      // Force style calc
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      getComputedStyle(html).width;

      const map: Record<string, string> = {};
      for (const v of VARS) map[v] = readVar(html, v);
      out.push({ name, vars: map });
    }

    // restore previous
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

<!-- Anchor button -->
<button
  class="tp-btn"
  bind:this={anchor}
  aria-haspopup="dialog"
  aria-expanded={open}
  on:click={() => (open = !open)}
  title="Change theme"
>
  <span class="tp-dot"></span>
  <span class="tp-label">{currentTheme}</span>
  <svg class="tp-caret" width="12" height="12" viewBox="0 0 12 12" aria-hidden="true">
    <path d="M3 4l3 4 3-4" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
  </svg>
</button>

{#if open}
  <div class="tp-backdrop"></div>
  <div class="tp-panel" bind:this={panel} role="dialog" aria-label="Choose a theme">
    <div class="tp-header">
      <div class="tp-title">Themes</div>
      <div class="tp-sub">Hover a card to see its own theme highlight.</div>
    </div>

    <div class="tp-grid">
      {#each previews as p}
        <!-- Per-card CSS vars so hover uses the card's theme, not the global theme -->
        <button
          class="tp-card"
          style={`
            --card-hover-border: ${p.vars['--color-secondary-500']};
            --card-focus: ${p.vars['--color-info-500']};
            --card-surf-50: ${p.vars['--color-surface-50']};
          `}
          on:click={() => chooseTheme(p.name)}
          aria-label={`Switch to ${p.name}`}
        >
          <div class="tp-name">{p.name}</div>

          <!-- Small role chips (full circles) -->
          <div class="tp-chips">
            {#each CHIP_VARS as v}
              <span class="tp-chip" style={`--chip:${p.vars[v]}`} title={`${v}: ${p.vars[v]}`}></span>
            {/each}
          </div>

          <!-- Big chips (full circles) show surface + neutral variety -->
          <div class="tp-bigs">
            {#each BIG_VARS as v}
              <span class="tp-big" style={`--chip:${p.vars[v]}`} title={`${v}: ${p.vars[v]}`}></span>
            {/each}
          </div>
        </button>
      {/each}
    </div>
  </div>
{/if}

<style>
  /* Anchor button */
  .tp-btn {
    display: inline-flex;
    align-items: center;
    gap: .5rem;
    height: 32px;
    padding: 0 .6rem 0 .4rem;
    border-radius: var(--radius-base, var(--radius-interactive));
    border: 1px solid var(--border-color-default, var(--color-surface-300-vis));
    background: var(--background-panel, var(--color-surface-100-vis));
    color: var(--background-panel, var(--color-surface-100-vis));
    font-size: var(--base-font-size, var(--type-body-size));
    line-height: var(--base-line-height, var(--type-body-leading));
  }
  .tp-btn:hover { background: var(--background-elevation-2, var(--color-surface-200-vis)); }
  .tp-btn:focus-visible { outline: 2px solid var(--color-info-500); outline-offset: 2px; }
  .tp-dot {
    width: .8rem; height: .8rem; border-radius: 999px;
    background:
      conic-gradient(from 0deg,
        var(--color-secondary-500),
        var(--color-accent-500),
        var(--color-success-500),
        var(--color-warning-500),
        var(--color-error-500),
        var(--color-secondary-500));
    box-shadow: 0 0 0 2px var(--color-surface-50) inset;
  }
  .tp-label { text-transform: capitalize; }
  .tp-caret { opacity: .6 }

  /* Backdrop to catch outside clicks */
  .tp-backdrop {
    position: fixed; inset: 0;
    background: transparent;
  }

  /* Panel */
  .tp-panel {
    position: absolute;
    right: 16px;
    top: calc(56px + 8px);
    z-index: 1000;
    width: min(900px, 95vw);
    border-radius: var(--radius-base, var(--radius-interactive));
    border: 1px solid var(--border-color-default, var(--color-surface-300-vis));
    background: var(--background-elevation-1, var(--color-surface-100-vis));
    box-shadow: 0 20px 60px rgba(0,0,0,.14);
    padding: 14px;
  }

  .tp-header { padding: 6px 8px 12px; }
  .tp-title { font-weight: 700; }
  .tp-sub   { font-size: .825rem; opacity: .75; }

  /* Grid of cards */
  .tp-grid {
    display: grid;
    grid-template-columns: repeat( auto-fill, minmax(230px, 1fr) );
    gap: 12px;
  }

  .tp-card {
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 12px;
    border-radius: 12px;
    border: 1px solid var(--color-surface-300);
    background: var(--body-background-color, var(--color-surface-50));
    text-align: left;
    transition: transform .12s ease, background-color .12s ease, border-color .12s ease, box-shadow .12s ease;
  }
  /* 🔥 Hover highlight uses the card's own theme (via inline CSS vars) */
  .tp-card:hover {
    transform: translateY(-1px);
    border-color: var(--card-hover-border);
    background: color-mix(in oklab, var(--card-hover-border) 16%, var(--card-surf-50));
    box-shadow: 0 6px 22px color-mix(in oklab, var(--card-hover-border) 18%, transparent);
  }
  .tp-card:focus-visible { outline: 2px solid var(--card-focus); outline-offset: 2px; }

  .tp-name { font-weight: 700; text-transform: capitalize; }

  /* Small chips – full circles */
  .tp-chips {
    display: grid; grid-template-columns: repeat(6, 1fr); gap: 8px;
  }
  .tp-chip {
    width: 20px; height: 20px; border-radius: 999px;
    background: var(--chip);
    border: 2px solid color-mix(in oklab, var(--chip) 35%, black);
    box-shadow: 0 0 0 2px color-mix(in oklab, var(--chip) 10%, white) inset;
  }

  /* Big chips – full circles, show surface+neutral variety (not just white/black) */
  .tp-bigs {
    display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; margin-top: 2px;
  }
  .tp-big {
    width: 28px; height: 28px; border-radius: 999px;
    background: var(--chip);
    border: 2px solid color-mix(in oklab, var(--chip) 35%, black);
    box-shadow:
      0 0 0 3px color-mix(in oklab, var(--chip) 10%, white) inset,
      0 1px 8px color-mix(in oklab, var(--chip) 20%, transparent);
  }

  @media (prefers-reduced-motion: reduce) {
    .tp-card { transition: none; }
  }
</style>

