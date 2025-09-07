<script lang="ts">
  import { onMount } from 'svelte';
  import { setTheme } from '@clothesline/themes';

  type ModeState = {
    theme: string;
    mode: 'light' | 'dark';
    contrast: 'normal' | 'high' | { custom: number };
    vision?: 'protanopia' | 'deuteranopia' | 'tritanopia' | 'monochromacy';
  };

  export let className = '';

  const themes = [
    'clothesline',
    'copper-sun',
    'timberline',
    'milkyway',
    'retrograde',
    'tidal-glass',
    'night-market'
  ] as const;

  const modes = ['light', 'dark'] as const;
  const visions = ['none', 'protanopia', 'deuteranopia', 'tritanopia', 'monochromacy'] as const;
  const contrasts = ['normal', 'high', 'custom'] as const;

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

    // theme/mode always set by setTheme, but ensure presence for safety
    html.setAttribute('data-theme', selectedTheme);
    html.setAttribute('data-mode', selectedMode);

    // IMPORTANT: actively remove data-vision when "none"
    if (selectedVision === 'none') {
      html.removeAttribute('data-vision');
    } else {
      html.setAttribute('data-vision', selectedVision);
    }

    // Keep data-contrast accurate + clean inline var when not custom
    if (selectedContrast === 'custom') {
      html.setAttribute('data-contrast', 'custom');
      html.style.setProperty('--contrast-factor', String(Number(customContrastFactor) || 1));
    } else {
      html.setAttribute('data-contrast', selectedContrast);
      // remove inline override so theme mapping takes over
      html.style.removeProperty('--contrast-factor');
    }
  }

  function buildState(): ModeState {
    const contrast =
      selectedContrast === 'custom'
        ? { custom: Number(customContrastFactor) }
        : selectedContrast;

    const state: ModeState = {
      theme: selectedTheme,
      mode: selectedMode,
      contrast,
      ...(selectedVision !== 'none' ? { vision: selectedVision } : {})
    };
    return state;
  }

  function persist(state: ModeState) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }

  function updateTheme() {
    const state = buildState();
    setTheme(state);
    applyDomAttributes();     // <-- ensure attributes truly reflect UI
    persist(state);
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

    // Apply on first paint
    const state = buildState();
    setTheme(state);
    applyDomAttributes();      // <-- ensure vision 'none' actually removes the attr
    persist(state);
  });
</script>


<header class="header {className}">
  <div class="header-left">
    <slot name="left" />
  </div>

  <div class="header-center">
    <slot name="center" />
  </div>

  <div class="header-right">
    <slot name="right" />
    <div class="theme-toggle-controls">
      <!-- Theme -->
      <label class="sr-only" for="cl-theme">Theme</label>
      <select id="cl-theme" bind:value={selectedTheme} on:change={updateTheme} aria-label="Theme">
        {#each themes as theme}
          <option value={theme}>{theme}</option>
        {/each}
      </select>

      <!-- Mode -->
      <label class="sr-only" for="cl-mode">Mode</label>
      <select id="cl-mode" bind:value={selectedMode} on:change={updateTheme} aria-label="Mode">
        {#each modes as mode}
          <option value={mode}>{mode}</option>
        {/each}
      </select>

      <!-- Vision -->
      <label class="sr-only" for="cl-vision">Vision</label>
      <select id="cl-vision" bind:value={selectedVision} on:change={updateTheme} aria-label="Vision">
        {#each visions as vision}
          <option value={vision}>{vision}</option>
        {/each}
      </select>

      <!-- Contrast -->
      <label class="sr-only" for="cl-contrast">Contrast</label>
      <select id="cl-contrast" bind:value={selectedContrast} on:change={updateTheme} aria-label="Contrast">
        {#each contrasts as contrast}
          <option value={contrast}>{contrast}</option>
        {/each}
      </select>

      {#if selectedContrast === 'custom'}
        <label class="sr-only" for="cl-contrast-factor">
          Custom contrast factor
        </label>
        <input
          id="cl-contrast-factor"
          type="range"
          min="1.00"
          max="1.40"
          step="0.01"
          bind:value={customContrastFactor}
          on:input={updateTheme}
          aria-label="Custom contrast factor"
          class="w-32"
        />
      {/if}
    </div>
  </div>
</header>

<style>
  .sr-only {
    position: absolute;
    width: 1px; height: 1px;
    padding: 0; margin: -1px;
    overflow: hidden; clip: rect(0, 0, 0, 0);
    white-space: nowrap; border: 0;
  }

  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--gap-base, 1rem);
    padding: var(--spacing-4, 1rem);
    background-color: var(--background-panel, #fff);
    border-bottom: var(--border-subtle, 1px) solid var(--border-default-color, #ccc);
    color: var(--base-font-color, #000);
  }

  .header-left,
  .header-center,
  .header-right {
    display: flex;
    align-items: center;
    gap: var(--gap-small, 0.5rem);
  }

  .header-center {
    flex: 1;
    justify-content: center;
  }

  .header-right {
    justify-content: flex-end;
  }

  .theme-toggle-controls {
    display: flex;
    gap: 0.5rem;
    align-items: center;
  }

  .theme-toggle-controls select,
  .theme-toggle-controls input[type="range"] {
    padding: 0.3rem 0.5rem;
    font-size: 0.875rem;
    background: var(--color-surface-100);
    border: 1px solid var(--color-surface-300);
    border-radius: 0.25rem;
  }
</style>




