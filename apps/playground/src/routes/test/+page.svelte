<!-- apps/playground/src/routes/test/+page.svelte -->
<script lang="ts">
  import { onMount } from 'svelte';

  type Mode = 'light' | 'dark';
  type Contrast = 'normal' | 'high' | 'custom';
  type Vision = 'none' | 'protanopia' | 'deuteranopia' | 'tritanopia' | 'monochrome';

  let theme = 'clothesline';
  let mode: Mode = 'light';
  let contrast: Contrast = 'normal';
  let contrastFactor = 1.12; // used only when contrast === 'custom'
  let vision: Vision = 'none';

  function apply() {
    const root = document.documentElement;

    root.setAttribute('data-theme', theme);
    root.setAttribute('data-mode', mode);

    // contrast
    root.setAttribute('data-contrast', contrast);
    if (contrast === 'custom') {
      const clamped = Math.max(0.8, Math.min(1.5, Number(contrastFactor || 1)));
      root.style.setProperty('--contrast-factor', String(clamped));
    } else {
      root.style.removeProperty('--contrast-factor');
    }

    // vision
    if (vision === 'none') root.removeAttribute('data-vision');
    else root.setAttribute('data-vision', vision);
  }

  onMount(() => {
    // initialize once on client
    apply();
  });

  // re-apply when values change (client-only guard)
  $: if (typeof document !== 'undefined') apply();
</script>

<main class="page">
  <header class="header">
    <h1>Modes Test</h1>
    <p>Applies <code>data-theme</code>, <code>data-mode</code>, <code>data-contrast</code>, <code>data-vision</code> on &lt;html&gt;.</p>
  </header>

  <section class="card">
    <div class="grid">
      <label class="field">
        <span>Theme</span>
        <select bind:value={theme}>
          <option value="clothesline">clothesline</option>
          <option value="timberline">timberline</option>
          <option value="bigsky">bigsky</option>
          <option value="milkyway">milkyway</option>
          <option value="retrograde">retrograde</option>
          <option value="tidal-glass">tidal-glass</option>
          <option value="copper-sun">copper-sun</option>
          <option value="night-market">night-market</option>
        </select>
      </label>

      <label class="field">
        <span>Mode</span>
        <select bind:value={mode}>
          <option value="light">light</option>
          <option value="dark">dark</option>
        </select>
      </label>

      <label class="field">
        <span>Contrast</span>
        <select bind:value={contrast}>
          <option value="normal">normal</option>
          <option value="high">high</option>
          <option value="custom">custom</option>
        </select>
      </label>

      <label class="field" aria-disabled={contrast !== 'custom'}>
        <span>Contrast factor</span>
        <input
          type="number"
          step="0.01"
          min="0.8"
          max="1.5"
          bind:value={contrastFactor}
          disabled={contrast !== 'custom'}
        />
      </label>

      <label class="field">
        <span>Vision</span>
        <select bind:value={vision}>
          <option value="none">none</option>
          <option value="protanopia">protanopia</option>
          <option value="deuteranopia">deuteranopia</option>
          <option value="tritanopia">tritanopia</option>
          <option value="monochrome">monochrome</option>
        </select>
      </label>
    </div>

    <div class="preview">
      <div class="chip">--body-background-color: <code>{getComputedStyle(document.documentElement).getPropertyValue('--body-background-color') || '∅'}</code></div>
      <div class="chip">--base-font-color: <code>{getComputedStyle(document.documentElement).getPropertyValue('--base-font-color') || '∅'}</code></div>
      <div class="chip">--border-default-color: <code>{getComputedStyle(document.documentElement).getPropertyValue('--border-default-color') || '∅'}</code></div>
      <div class="note">
        If these show “∅”, your CSS isn’t loaded or the variable names don’t exist yet.
      </div>
    </div>
  </section>
</main>

<style>
  .page {
    padding: 1.25rem;
    display: grid;
    gap: 1rem;
    max-width: 960px;
    margin: 0 auto;
  }

  .header h1 { margin: 0; font-size: 1.5rem; }
  .header p { margin: .25rem 0 0; opacity: .8; }

  .card {
    border: 1px solid var(--border-default-color, #d1d5db);
    background: var(--background-panel, #ffffff);
    border-radius: 0.75rem;
    padding: 1rem;
    display: grid;
    gap: 1rem;
  }

  .grid {
    display: grid;
    gap: .75rem;
    grid-template-columns: repeat(5, minmax(0, 1fr));
  }

  .field { display: grid; gap: .35rem; }
  .field > span { font-size: .8125rem; opacity: .75; }

  input, select {
    padding: .5rem .625rem;
    border: 1px solid var(--border-default-color, #d1d5db);
    border-radius: .5rem;
    background: var(--background-elevation-1, #fff);
    color: inherit;
    outline: none;
  }
  input:focus-visible, select:focus-visible {
    outline: 2px solid var(--ring-color, #2563eb);
    outline-offset: 2px;
  }

  .preview {
    display: grid;
    gap: .5rem;
    padding-top: .25rem;
  }

  .chip {
    padding: .5rem .625rem;
    border: 1px dashed var(--border-muted-color, #e5e7eb);
    border-radius: .5rem;
    background: var(--background-elevation-2, #fafafa);
    font-size: .875rem;
  }

  .note {
    opacity: .75;
    font-size: .8125rem;
  }

  @media (max-width: 920px) {
    .grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  }
</style>

