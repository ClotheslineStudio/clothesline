<script lang="ts">
  import { onMount } from 'svelte';
  import { setTheme } from '@clothesline/themes';
  import { Palette, Sun, Moon, Eye, Contrast, Github } from 'lucide-svelte';

  type ModeState = {
    theme: string;
    mode: 'light' | 'dark';
    contrast: 'normal' | 'high' | { custom: number };
    vision?: 'protanopia' | 'deuteranopia' | 'tritanopia' | 'monochromacy';
  };

  export let className = '';

  const themes = [
    'clothesline','copper-sun','timberline','milkyway',
    'retrograde','tidal-glass','night-market','bigsky'
  ] as const;

  const modes = ['light','dark'] as const;
  const visions = ['none','protanopia','deuteranopia','tritanopia','monochromacy'] as const;
  const contrasts = ['normal','high','custom'] as const;

  let selectedTheme: string = 'clothesline';
  let selectedMode: (typeof modes)[number] = 'light';
  let selectedVision: (typeof visions)[number] = 'none';
  let selectedContrast: (typeof contrasts)[number] = 'normal';
  let customContrastFactor = 1.12;

  const STORAGE_KEY = 'cl_modes';

  function migrateVision(v?: string): (typeof visions)[number] {
    if (!v) return 'none';
    const map: Record<string, (typeof visions)[number]> = {
      protan: 'protanopia',
      deutan: 'deuteranopia',
      tritan: 'tritanopia',
      mono: 'monochromacy'
    };
    return (map[v] ?? (visions as readonly string[]).find(x => x === v) ?? 'none') as any;
  }

  function applyDomAttributes() {
    const html = document.documentElement;
    html.setAttribute('data-theme', selectedTheme);
    html.setAttribute('data-mode', selectedMode);

    if (selectedVision === 'none') html.removeAttribute('data-vision');
    else html.setAttribute('data-vision', selectedVision);

    if (selectedContrast === 'custom') {
      html.setAttribute('data-contrast', 'custom');
      html.style.setProperty('--contrast-factor', String(Number(customContrastFactor) || 1));
    } else {
      html.setAttribute('data-contrast', selectedContrast);
      html.style.removeProperty('--contrast-factor');
    }
  }

  function buildState(): ModeState {
    const contrast =
      selectedContrast === 'custom'
        ? { custom: Number(customContrastFactor) }
        : selectedContrast;
    return {
      theme: selectedTheme,
      mode: selectedMode,
      contrast,
      ...(selectedVision !== 'none' ? { vision: selectedVision } : {})
    };
  }

  function persist(state: ModeState) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }

  function updateTheme() {
    const state = buildState();
    setTheme(state);
    applyDomAttributes();
    persist(state);
  }

  function toggleMode() {
    selectedMode = selectedMode === 'light' ? 'dark' : 'light';
    updateTheme();
  }

  onMount(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const saved = JSON.parse(raw) as any;
        selectedTheme  = saved.theme ?? selectedTheme;
        selectedMode   = (saved.mode as any) ?? selectedMode;
        selectedVision = migrateVision(saved.vision);

        if (typeof saved.contrast === 'object' && saved.contrast?.custom) {
          selectedContrast = 'custom';
          customContrastFactor = Number(saved.contrast.custom) || customContrastFactor;
        } else if (saved.contrast === 'high' || saved.contrast === 'normal') {
          selectedContrast = saved.contrast;
        }
      }
    } catch { /* ignore */ }

    const state = buildState();
    setTheme(state);
    applyDomAttributes();
    persist(state);
  });
</script>

<header class={`header ${className}`}>
  <div class="header-left">
    <slot name="left" />
  </div>

  <div class="header-center">
    <slot name="center" />
  </div>

  <div class="header-right">
    <slot name="right" />

    <!-- Quick mode toggle -->
    <button class="icon-btn" on:click={toggleMode} aria-label="Toggle light/dark">
      {#if selectedMode === 'light'} <Moon size={18} /> {:else} <Sun size={18} /> {/if}
    </button>

    <div class="theme-toggle-controls">
      <!-- Theme -->
      <div class="control">
        <Palette size={16} aria-hidden="true" />
        <label class="sr-only" for="cl-theme">Theme</label>
        <select id="cl-theme" bind:value={selectedTheme} on:change={updateTheme} aria-label="Theme">
          {#each themes as theme}<option value={theme}>{theme}</option>{/each}
        </select>
      </div>

      <!-- Mode -->
      <div class="control">
        {#if selectedMode === 'light'} <Sun size={16} aria-hidden="true" /> {:else} <Moon size={16} aria-hidden="true" /> {/if}
        <label class="sr-only" for="cl-mode">Mode</label>
        <select id="cl-mode" bind:value={selectedMode} on:change={updateTheme} aria-label="Mode">
          {#each modes as mode}<option value={mode}>{mode}</option>{/each}
        </select>
      </div>

      <!-- Vision -->
      <div class="control">
        <Eye size={16} aria-hidden="true" />
        <label class="sr-only" for="cl-vision">Vision</label>
        <select id="cl-vision" bind:value={selectedVision} on:change={updateTheme} aria-label="Vision">
          {#each visions as vision}<option value={vision}>{vision}</option>{/each}
        </select>
      </div>

      <!-- Contrast -->
      <div class="control">
        <Contrast size={16} aria-hidden="true" />
        <label class="sr-only" for="cl-contrast">Contrast</label>
        <select id="cl-contrast" bind:value={selectedContrast} on:change={updateTheme} aria-label="Contrast">
          {#each contrasts as contrast}<option value={contrast}>{contrast}</option>{/each}
        </select>
      </div>

      {#if selectedContrast === 'custom'}
        <label class="sr-only" for="cl-contrast-factor">Custom contrast factor</label>
        <input
          id="cl-contrast-factor"
          type="range" min="1.00" max="1.40" step="0.01"
          bind:value={customContrastFactor} on:input={updateTheme}
          aria-label="Custom contrast factor" class="range"
        />
      {/if}
    </div>
  </div>
</header>

<style>
  .sr-only {
    position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px;
    overflow: hidden; clip: rect(0,0,0,0); white-space: nowrap; border: 0;
  }

  /* High-contrast header palette with mode-aware tokens */
  .header {
    --header-bg: var(--color-surface-100);
    --header-fg: var(--base-font-color, var(--color-surface-950));
    --header-border: var(--color-surface-300);
    --header-shadow: var(--shadow-sm, 0 1px 0 rgba(0,0,0,.06));

    display: flex; align-items: center; justify-content: space-between;
    gap: var(--gap-base, 1rem);
    padding: var(--spacing-3, .75rem) var(--spacing-4, 1rem);
    background:
      linear-gradient(to bottom, color-mix(in oklab, var(--header-bg) 92%, transparent), var(--header-bg));
    color: var(--header-fg);
    border-bottom: 1px solid var(--header-border);
    box-shadow: var(--header-shadow);
    position: relative;
    z-index: 10;
  }

  :global(html[data-mode="dark"]) .header {
    --header-bg: var(--color-surface-900);
    --header-fg: var(--base-font-color-dark, var(--color-surface-50));
    --header-border: var(--color-surface-700);
    --header-shadow: 0 1px 0 rgba(255,255,255,.06);
  }

  /* High contrast boost */
  :global(html[data-contrast="high"]) .header {
    --header-bg: color-mix(in oklab, var(--header-bg) 85%, transparent);
    --header-border: color-mix(in oklab, var(--header-fg) 18%, var(--header-border));
  }

  .header-left, .header-center, .header-right {
    display: flex; align-items: center; gap: var(--gap-small, .5rem);
  }
  .header-center { flex: 1; justify-content: center; }
  .header-right { justify-content: flex-end; gap: .75rem; }

  /* Icon button */
  .icon-btn {
    display: inline-flex; align-items: center; justify-content: center;
    width: 32px; height: 32px; border-radius: 8px;
    color: var(--header-fg); opacity: .9; transition: background .15s ease, opacity .15s ease;
  }
  .icon-btn:hover { opacity: 1; background: color-mix(in oklab, var(--header-fg) 12%, transparent); }

  /* Controls group */
  .theme-toggle-controls { display: flex; align-items: center; gap: .5rem; }
  .control { display: inline-flex; align-items: center; gap: .375rem; }

  .theme-toggle-controls select {
    appearance: none;
    background: color-mix(in oklab, var(--header-bg) 92%, transparent);
    color: var(--header-fg);
    border: 1px solid var(--header-border);
    border-radius: .5rem;
    padding: .35rem .6rem;
    font-size: .875rem;
    line-height: 1.2;
  }
  .theme-toggle-controls select:focus {
    outline: 2px solid color-mix(in oklab, var(--header-fg) 28%, transparent);
    outline-offset: 1px;
  }

  .range {
    accent-color: var(--header-fg);
    width: 8rem;
  }
</style>





