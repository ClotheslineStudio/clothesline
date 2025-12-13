<script lang="ts">
  import { onMount } from 'svelte';
  import { browser } from '$app/environment';
  import { setTheme, type Vision, type Contrast } from '@clothesline/themes';

  type ThemeName =
    | 'clothesline'
    | 'timberline'
    | 'night-market'
    | 'retrograde'
    | 'tidal-glass'
    | 'copper-sun'
    | 'milkyway'
    | 'bigsky';

  type Mode = 'light' | 'dark';
  type Reading = 'none' | 'dyslexia' | 'plain';
  type Motion = 'normal' | 'reduced' | 'off';

  // --- Controls ---
  let theme: ThemeName = 'night-market';
  let mode: Mode = 'light';

  let contrastKind: 'normal' | 'high' | 'custom' = 'normal';
  let contrastFactor = 1.12;

  let vision: Vision = 'none';
  let reading: Reading = 'none';
  let motion: Motion = 'normal';

  // Optional knobs (ModeState supports these; whether they *visibly* do anything depends on your CSS)
  let typescale = 1.0;
  let focus = true;
  let rtl = false;

  let uiSimplified = false;
  let uiVisualAlerts = false;
  let uiCaptions = false;

  let motorLargeHit = false;
  let motorKbd = false;
  let motorSticky = false;

  let devA11y = false;
  let devGrid = false;
  let devTokens = false;

  // --- Snapshot ---
  const TOKENS = [
    '--background-app',
    '--background-panel',
    '--base-font-color',
    '--on-surface',
    '--on-surface-muted',
    '--border-default-color',
    '--ring-offset-color',

    '--color-primary-500',
    '--color-secondary-500',
    '--color-accent-500',
    '--color-surface-50',
    '--color-surface-900',

    // vision pipeline “CT” vars (if these are unset, vision won’t work)
    '--color-primary-500-ct',
    '--color-secondary-500-ct',
    '--color-surface-500-ct',

    // typography + shape
    '--font-family-base',
    '--font-family-dyslexia',
    '--radius-base',
    '--radius-sm',
    '--radius-md',

    // contrast factor hook (your dark block shows --k-ct usage)
    '--k-ct'
  ] as const;

  let htmlAttrs = '';
  let inlineContrast = '';
  let computed: Record<string, string> = {};

  function readVar(root: HTMLElement, name: string) {
    return getComputedStyle(root).getPropertyValue(name).trim() || '(unset)';
  }

  function snapshot() {
    if (!browser) return;
    const html = document.documentElement;

    htmlAttrs = [
      `data-theme=${html.getAttribute('data-theme') ?? ''}`,
      `data-mode=${html.getAttribute('data-mode') ?? ''}`,
      `data-contrast=${html.getAttribute('data-contrast') ?? ''}`,
      `data-vision=${html.getAttribute('data-vision') ?? ''}`,
      `data-reading=${html.getAttribute('data-reading') ?? ''}`,
      `data-motion=${html.getAttribute('data-motion') ?? ''}`,
      `data-typescale=${html.getAttribute('data-typescale') ?? ''}`,
      `data-focus=${html.getAttribute('data-focus') ?? ''}`,
      `data-rtl=${html.getAttribute('data-rtl') ?? ''}`,
      `data-ui=${html.getAttribute('data-ui') ?? ''}`,
      `data-motor=${html.getAttribute('data-motor') ?? ''}`,
      `data-dev=${html.getAttribute('data-dev') ?? ''}`
    ].join('  |  ');

    inlineContrast = html.style.getPropertyValue('--contrast-factor').trim() || '(unset)';

    const out: Record<string, string> = {};
    for (const t of TOKENS) out[t] = readVar(html, t);
    computed = out;
  }

  function buildContrast(): Contrast {
    if (contrastKind === 'custom') return { custom: Number(contrastFactor) };
    return contrastKind;
  }

  function listFromChecks(map: Record<string, boolean>) {
    return Object.entries(map)
      .filter(([, on]) => on)
      .map(([k]) => k);
  }

  function apply() {
    const ui = listFromChecks({
      simplified: uiSimplified,
      'visual-alerts': uiVisualAlerts,
      captions: uiCaptions
    }) as any[];

    const motor = listFromChecks({
      'large-hit': motorLargeHit,
      kbd: motorKbd,
      'sticky-controls': motorSticky
    }) as any[];

    const dev = listFromChecks({
      'a11y-debug': devA11y,
      grid: devGrid,
      tokens: devTokens
    }) as any[];

    setTheme({
      theme,
      mode,
      contrast: buildContrast(),
      vision,
      reading,
      motion,
      typescale,
      focus,
      rtl,
      ui,
      motor,
      dev
    });

    // let styles settle then snapshot
    requestAnimationFrame(snapshot);
  }

  function resetToSafeDefaults() {
    theme = 'clothesline';
    mode = 'light';
    contrastKind = 'normal';
    contrastFactor = 1.12;
    vision = 'none';
    reading = 'none';
    motion = 'normal';
    typescale = 1.0;
    focus = true;
    rtl = false;

    uiSimplified = false;
    uiVisualAlerts = false;
    uiCaptions = false;

    motorLargeHit = false;
    motorKbd = false;
    motorSticky = false;

    devA11y = false;
    devGrid = false;
    devTokens = false;

    apply();
  }

  onMount(() => {
    if (!browser) return;

    // adopt whatever the header already set (if present)
    const html = document.documentElement;
    const t = html.getAttribute('data-theme') as ThemeName | null;
    const m = html.getAttribute('data-mode') as Mode | null;

    if (t) theme = t;
    if (m) mode = m;

    apply();
  });
</script>

<h1>Theme / Mode Smoke Test</h1>

<div class="wrap">
  <section class="controls">
    <div class="row">
      <label class="field">
        <span>Theme</span>
        <select bind:value={theme} on:change={apply}>
          <option value="clothesline">clothesline</option>
          <option value="timberline">timberline</option>
          <option value="night-market">night-market</option>
          <option value="retrograde">retrograde</option>
          <option value="tidal-glass">tidal-glass</option>
          <option value="copper-sun">copper-sun</option>
          <option value="milkyway">milkyway</option>
          <option value="bigsky">bigsky</option>
        </select>
      </label>

      <label class="field">
        <span>Mode</span>
        <select bind:value={mode} on:change={apply}>
          <option value="light">light</option>
          <option value="dark">dark</option>
        </select>
      </label>

      <label class="field">
        <span>Vision</span>
        <select bind:value={vision} on:change={apply}>
          <option value="none">none</option>
          <option value="protan">protan</option>
          <option value="deutan">deutan</option>
          <option value="tritan">tritan</option>
          <option value="mono">mono</option>
        </select>
      </label>

      <label class="field">
        <span>Reading</span>
        <select bind:value={reading} on:change={apply}>
          <option value="none">none</option>
          <option value="dyslexia">dyslexia</option>
          <option value="plain">plain</option>
        </select>
      </label>

      <label class="field">
        <span>Motion</span>
        <select bind:value={motion} on:change={apply}>
          <option value="normal">normal</option>
          <option value="reduced">reduced</option>
          <option value="off">off</option>
        </select>
      </label>

      <label class="field">
        <span>Contrast</span>
        <select bind:value={contrastKind} on:change={apply}>
          <option value="normal">normal</option>
          <option value="high">high</option>
          <option value="custom">custom</option>
        </select>
      </label>

      {#if contrastKind === 'custom'}
        <label class="field">
          <span>Factor {contrastFactor.toFixed(2)}</span>
          <input
            type="range"
            min="0.80"
            max="1.50"
            step="0.01"
            bind:value={contrastFactor}
            on:input={apply}
          />
        </label>
      {/if}

      <label class="field">
        <span>Typescale {typescale.toFixed(2)}×</span>
        <input type="range" min="0.90" max="1.30" step="0.01" bind:value={typescale} on:input={apply} />
      </label>
    </div>

    <div class="row checks">
      <label class="check"><input type="checkbox" bind:checked={focus} on:change={apply} /> Focus emphasis</label>
      <label class="check"><input type="checkbox" bind:checked={rtl} on:change={apply} /> RTL</label>

      <div class="group">
        <div class="group-title">UI</div>
        <label class="check"><input type="checkbox" bind:checked={uiSimplified} on:change={apply} /> simplified</label>
        <label class="check"><input type="checkbox" bind:checked={uiVisualAlerts} on:change={apply} /> visual-alerts</label>
        <label class="check"><input type="checkbox" bind:checked={uiCaptions} on:change={apply} /> captions</label>
      </div>

      <div class="group">
        <div class="group-title">Motor</div>
        <label class="check"><input type="checkbox" bind:checked={motorLargeHit} on:change={apply} /> large-hit</label>
        <label class="check"><input type="checkbox" bind:checked={motorKbd} on:change={apply} /> kbd</label>
        <label class="check"><input type="checkbox" bind:checked={motorSticky} on:change={apply} /> sticky-controls</label>
      </div>

      <div class="group">
        <div class="group-title">Dev</div>
        <label class="check"><input type="checkbox" bind:checked={devA11y} on:change={apply} /> a11y-debug</label>
        <label class="check"><input type="checkbox" bind:checked={devGrid} on:change={apply} /> grid</label>
        <label class="check"><input type="checkbox" bind:checked={devTokens} on:change={apply} /> tokens</label>
      </div>
    </div>

    <div class="row actions">
      <button type="button" on:click={apply}>Apply</button>
      <button type="button" on:click={snapshot}>Snapshot</button>
      <button type="button" on:click={resetToSafeDefaults}>Reset</button>
    </div>
  </section>

  <section class="card">
    <div class="card-title">DOM attributes</div>
    <div class="mono">{htmlAttrs}</div>
    <div class="mono">inline --contrast-factor: {inlineContrast}</div>
  </section>

  <section class="card">
    <div class="card-title">Computed tokens (proof)</div>

    <table class="tbl">
      <thead><tr><th>Token</th><th>Computed</th></tr></thead>
      <tbody>
        {#each Object.entries(computed) as [k, v]}
          <tr>
            <td class="k"><code>{k}</code></td>
            <td class="v">
              <code>{v}</code>
              {#if k.startsWith('--color-')}
                <span class="swatch" style={`background:${v}`}></span>
              {/if}
            </td>
          </tr>
        {/each}
      </tbody>
    </table>

    <div class="notes">
      <div><strong>Quick interpretation:</strong></div>
      <ul>
        <li>If <code>--color-*-ct</code> values are <code>(unset)</code>, your vision layer cannot transform ramps yet.</li>
        <li>If <code>--k-ct</code> never changes, your contrast CSS isn’t wired to <code>data-contrast</code>/<code>--contrast-factor</code>.</li>
        <li>If <code>--font-family-base</code> doesn’t change but <code>data-reading=dyslexia</code> does, you’re missing the reading CSS override.</li>
      </ul>
    </div>
  </section>
</div>

<style>
  .wrap { display:grid; gap: 12px; max-width: 1100px; }
  .controls { padding:12px; border:1px solid var(--border-default-color, #ddd); border-radius:12px; display:grid; gap: 12px; }
  .row { display:flex; gap: 10px; flex-wrap:wrap; align-items:end; }
  .field { display:flex; flex-direction:column; gap: 4px; min-width: 160px; }
  .field > span { font-size: 12px; opacity: .8; font-weight: 600; }

  select, input[type="range"] {
    height: 36px;
    padding: 0 10px;
    border: 1px solid var(--border-default-color, #d1d5db);
    border-radius: 10px;
    background: var(--background-panel, white);
    color: inherit;
  }
  input[type="range"] { padding: 0; height: 28px; }

  .checks { align-items:flex-start; }
  .check { display:inline-flex; align-items:center; gap: .5rem; font-size: 13px; opacity: .9; padding: 4px 0; }
  .group { border-left: 1px solid var(--border-default-color, #e5e7eb); padding-left: 10px; display:grid; gap: 4px; }
  .group-title { font-size: 12px; opacity: .75; font-weight: 700; text-transform: uppercase; letter-spacing: .04em; }

  .actions button {
    height: 36px;
    padding: 0 12px;
    border-radius: 10px;
    border: 1px solid var(--border-default-color, #d1d5db);
    background: var(--background-panel, white);
    cursor: pointer;
  }

  .card { padding:12px; border:1px solid var(--border-default-color, #ddd); border-radius:12px; }
  .card-title { font-weight: 800; margin-bottom: 6px; }
  .mono { font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-size: 12px; }

  .tbl { width:100%; border-collapse: collapse; margin-top: 8px; }
  th, td { text-align:left; padding:.5rem; border-bottom: 1px solid var(--border-default-color, #e5e7eb); vertical-align: middle; }
  .v { display:flex; align-items:center; gap:.5rem; }
  .swatch { width:16px; height:16px; border-radius:4px; border: 1px solid rgba(0,0,0,.15); }

  .notes { margin-top: 10px; font-size: 13px; opacity: .85; }
  .notes code { font-family: ui-monospace, SFMono-Regular, Menlo, monospace; }
</style>
