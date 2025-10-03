<script lang="ts">
  import { onMount } from 'svelte';
  import { setTheme } from '@clothesline/themes';
  import type { Contrast } from '@clothesline/themes';

  // Define ModeState type locally (adjust fields as needed to match your usage)
  type Vision = 'protanopia' | 'deuteranopia' | 'tritanopia' | 'monochromacy' | undefined;

  type ModeState = {
    theme: string;
    mode: 'light' | 'dark';
    contrast: Contrast;
    typescale: number;
    vision?: Vision;
  };

  // Only include themes you actually ship (built & imported in app.css)
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

  // IMPORTANT: match modes.css exactly
  const visions = ['none', 'protanopia', 'deuteranopia', 'tritanopia', 'monochromacy'] as const;

  const contrasts = ['normal', 'high', 'custom'] as const;

  // Local UI state (persisted)
  let selectedTheme: string = 'clothesline';
  let selectedMode: (typeof modes)[number] = 'light';
  let selectedVision: (typeof visions)[number] = 'none';
  let selectedContrast: (typeof contrasts)[number] = 'normal';
  let customContrastFactor = 1.12; // used only when contrast === 'custom'
  let typescale = 1.0;             // optional global text scale

  const STORAGE_KEY = 'cl_modes';

  function persist(state: ModeState) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }

  function buildState(): ModeState {
    const contrastValue =
      selectedContrast === 'custom'
        ? { custom: Number(customContrastFactor) }
        : selectedContrast;

    // When 'none', omit the vision attribute entirely
    const visionValue = selectedVision === 'none' ? undefined : selectedVision;

    const state: ModeState = {
      theme: selectedTheme,
      mode: selectedMode,
      contrast: contrastValue,
      typescale: Number(typescale) || 1.0,
      ...(visionValue ? { vision: visionValue } : {}) // only include if set
    };

    return state;
  }

  function updateTheme() {
    const state = buildState();
    setTheme(state);
    persist(state);
  }

  // Handy helper for partial tweaks (e.g., live typescale slider)
  function apply(partial: Partial<ModeState>) {
    setTheme(partial);
    // merge with current UI selections for persistence
    const next = { ...buildState(), ...partial } as ModeState;
    persist(next);
  }

  onMount(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const saved = JSON.parse(raw) as ModeState;

        selectedTheme = saved.theme ?? selectedTheme;
        selectedMode = (saved.mode as typeof modes[number]) ?? selectedMode;

        // Saved 'vision' might be absent (none)
        const savedVision = (saved as any).vision as string | undefined;
        selectedVision = (savedVision as any) ?? 'none';
        if (!visions.includes(selectedVision as any)) {
          selectedVision = 'none';
        }

        if (typeof saved.contrast === 'object' && (saved.contrast as any)?.custom) {
          selectedContrast = 'custom';
          customContrastFactor = Number((saved.contrast as any).custom) || customContrastFactor;
        } else if (saved.contrast === 'high' || saved.contrast === 'normal') {
          selectedContrast = saved.contrast;
        }

        typescale = typeof saved.typescale === 'number' ? saved.typescale : typescale;

        updateTheme();
      } else {
        updateTheme();
      }
    } catch {
      updateTheme();
    }
  });
</script>

<div class="flex flex-wrap gap-4 items-end">
  <!-- Theme -->
  <div class="flex flex-col">
    <label for="theme-select" class="text-xs font-semibold">Theme</label>
    <select
      id="theme-select"
      bind:value={selectedTheme}
      on:change={updateTheme}
      class="p-2 rounded border bg-[--color-surface-100] border-[--color-surface-300]"
    >
      {#each themes as theme}
        <option value={theme}>{theme}</option>
      {/each}
    </select>
  </div>

  <!-- Mode -->
  <div class="flex flex-col">
    <label for="mode-select" class="text-xs font-semibold">Mode</label>
    <select
      id="mode-select"
      bind:value={selectedMode}
      on:change={updateTheme}
      class="p-2 rounded border bg-[--color-surface-100] border-[--color-surface-300]"
    >
      {#each modes as mode}
        <option value={mode}>{mode}</option>
      {/each}
    </select>
  </div>

  <!-- Vision -->
  <div class="flex flex-col">
    <label for="vision-select" class="text-xs font-semibold">Vision</label>
    <select
      id="vision-select"
      bind:value={selectedVision}
      on:change={updateTheme}
      class="p-2 rounded border bg-[--color-surface-100] border-[--color-surface-300]"
    >
      {#each visions as vision}
        <option value={vision}>{vision}</option>
      {/each}
    </select>
  </div>

  <!-- Contrast -->
  <div class="flex flex-col">
    <label for="contrast-select" class="text-xs font-semibold">Contrast</label>
    <select
      id="contrast-select"
      bind:value={selectedContrast}
      on:change={updateTheme}
      class="p-2 rounded border bg-[--color-surface-100] border-[--color-surface-300]"
    >
      {#each contrasts as contrast}
        <option value={contrast}>{contrast}</option>
      {/each}
    </select>
  </div>

  {#if selectedContrast === 'custom'}
    <div class="flex flex-col">
      <label for="contrast-factor" class="text-xs font-semibold">
        Contrast factor ({customContrastFactor.toFixed(2)})
      </label>
      <input
        id="contrast-factor"
        type="range"
        min="1.00"
        max="1.40"
        step="0.01"
        bind:value={customContrastFactor}
        on:input={updateTheme}
        class="w-48"
      />
    </div>
  {/if}

  <!-- Typescale -->
  <div class="flex flex-col">
    <label for="typescale" class="text-xs font-semibold">
      Typescale ({typescale.toFixed(2)}×)
    </label>
    <input
      id="typescale"
      type="range"
      min="0.90"
      max="1.30"
      step="0.01"
      bind:value={typescale}
      on:input={() => apply({ typescale })}
      class="w-48"
    />
  </div>
</div>


