<script lang="ts">
  import { onMount } from 'svelte';
  import { browser } from '$app/environment';
  import { setTheme } from '@clothesline/themes';
  import type { Contrast } from '@clothesline/themes';

  type Vision = 'protanopia' | 'deuteranopia' | 'tritanopia' | 'monochromacy' | undefined;
  type Mode = 'light' | 'dark';

  type ModeState = {
    theme: string;
    mode: Mode;
    contrast: Contrast;          // 'normal' | 'high' | { custom: number }
    typescale: number;           // 0.9 .. 1.3
    vision?: Vision;             // omit when not set
  };

  // Themes you actually ship
  const themes = [
    'clothesline',
    'timberline',
    'night-market',
    'retrograde',
    'tidal-glass',
    'copper-sun',
    'milkyway',
    'bigsky'
  ] as const;

  const modes = ['light', 'dark'] as const;
  const visions = ['none', 'protanopia', 'deuteranopia', 'tritanopia', 'monochromacy'] as const;
  const contrasts = ['normal', 'high', 'custom'] as const;

  // UI state
  let selectedTheme: string = 'clothesline';
  let selectedMode: (typeof modes)[number] = 'light';
  let selectedVision: (typeof visions)[number] = 'none';
  let selectedContrast: (typeof contrasts)[number] = 'normal';
  let customContrastFactor = 1.12;
  let typescale = 1.00;

  const STORAGE_KEY = 'cl_modes_v2';

  function persist(state: ModeState) {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch {}
  }

  function buildState(): ModeState {
    const contrastValue: Contrast =
      selectedContrast === 'custom'
        ? { custom: Number(customContrastFactor) }
        : selectedContrast;

    const visionValue = selectedVision === 'none' ? undefined : (selectedVision as Vision);
    return {
      theme: selectedTheme,
      mode: selectedMode,
      contrast: contrastValue,
      typescale: Number(typescale) || 1.0,
      ...(visionValue ? { vision: visionValue } : {})
    };
  }

  function apply(partial: Partial<ModeState>) {
    setTheme(partial);
    const next = { ...buildState(), ...partial } as ModeState;
    persist(next);
  }

  function updateTheme() {
    const state = buildState();
    setTheme(state);
    persist(state);
  }

  onMount(() => {
    // Restore
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const saved = JSON.parse(raw) as ModeState;
        selectedTheme = saved.theme ?? selectedTheme;
        selectedMode = (saved.mode as Mode) ?? selectedMode;

        const v = (saved as any).vision as Vision | undefined;
        selectedVision = (v ?? 'none') as any;
        if (!visions.includes(selectedVision as any)) selectedVision = 'none';

        if (typeof saved.contrast === 'object' && (saved.contrast as any)?.custom) {
          selectedContrast = 'custom';
          customContrastFactor = Number((saved.contrast as any).custom) || customContrastFactor;
        } else if (saved.contrast === 'high' || saved.contrast === 'normal') {
          selectedContrast = saved.contrast;
        }

        typescale = typeof saved.typescale === 'number' ? saved.typescale : typescale;
      }
    } catch {}

    updateTheme();

    // Keyboard: Cmd/Ctrl + J toggles light/dark
    const onKey = (e: KeyboardEvent) => {
      const cmd = e.metaKey || e.ctrlKey;
      if (cmd && (e.key === 'j' || e.key === 'J')) {
        e.preventDefault();
        selectedMode = selectedMode === 'light' ? 'dark' : 'light';
        updateTheme();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });
</script>

<!-- Compact header-friendly UI -->
<div class="flex flex-wrap items-end gap-3">
  <!-- Theme -->
  <label class="flex flex-col">
    <span class="text-[11px] font-semibold opacity-80 mb-1">Theme</span>
    <select bind:value={selectedTheme} on:change={updateTheme}
      class="h-9 px-2 rounded border bg-[--color-surface-100] border-[--color-surface-300]">
      {#each themes as t}<option value={t}>{t}</option>{/each}
    </select>
  </label>

  <!-- Mode -->
  <label class="flex flex-col">
    <span class="text-[11px] font-semibold opacity-80 mb-1">Mode</span>
    <select bind:value={selectedMode} on:change={updateTheme}
      class="h-9 px-2 rounded border bg-[--color-surface-100] border-[--color-surface-300]">
      {#each modes as m}<option value={m}>{m}</option>{/each}
    </select>
  </label>

  <!-- Vision -->
  <label class="flex flex-col">
    <span class="text-[11px] font-semibold opacity-80 mb-1">Vision</span>
    <select bind:value={selectedVision} on:change={updateTheme}
      class="h-9 px-2 rounded border bg-[--color-surface-100] border-[--color-surface-300]">
      {#each visions as v}<option value={v}>{v}</option>{/each}
    </select>
  </label>

  <!-- Contrast -->
  <label class="flex flex-col">
    <span class="text-[11px] font-semibold opacity-80 mb-1">Contrast</span>
    <select bind:value={selectedContrast} on:change={updateTheme}
      class="h-9 px-2 rounded border bg-[--color-surface-100] border-[--color-surface-300]">
      {#each contrasts as c}<option value={c}>{c}</option>{/each}
    </select>
  </label>

  {#if selectedContrast === 'custom'}
    <label class="flex flex-col">
      <span class="text-[11px] font-semibold opacity-80 mb-1">
        Factor {customContrastFactor.toFixed(2)}
      </span>
      <input type="range" min="1.00" max="1.40" step="0.01"
        bind:value={customContrastFactor} on:input={updateTheme} class="w-40"/>
    </label>
  {/if}

  <!-- Typescale -->
  <label class="flex flex-col">
    <span class="text-[11px] font-semibold opacity-80 mb-1">
      Type {typescale.toFixed(2)}×
    </span>
    <input type="range" min="0.90" max="1.30" step="0.01"
      bind:value={typescale} on:input={() => apply({ typescale })} class="w-40"/>
  </label>
</div>

<style>
  select, input[type="range"] {
    color: var(--color-surface-950);
  }
</style>


