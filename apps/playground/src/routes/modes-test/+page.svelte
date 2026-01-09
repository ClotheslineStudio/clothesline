<script lang="ts">
  import { onMount } from 'svelte';
  import { browser } from '$app/environment';

  type Mode = 'light' | 'dark';

  const roles = [
    'primary',
    'secondary',
    'tertiary',
    'success',
    'warning',
    'error',
    'info',
    'accent',
    'neutral',
    'surface'
  ] as const;

  type Role = (typeof roles)[number];

  const allSteps = ['50','100','200','300','400','500','600','700','800','900','950'] as const;
  const compactSteps = ['100','200','300','400','500','600','700','800','900'] as const;

  // Keep whatever you have here; leaving as-is.
  const themes = ['bigsky'] as const;

  type VisionPreset = 'none' | 'protanopia' | 'deuteranopia' | 'tritanopia' | 'monochromacy';

  // Replace "final" with "role"
  type Stage = 'base' | 'ct' | 'vis' | 'role';

  const stages: Array<{ id: Stage; label: string; suffix: string }> = [
    { id: 'base', label: 'base', suffix: '-base' },
    { id: 'ct', label: 'ct', suffix: '-ct' },
    { id: 'vis', label: 'vis', suffix: '-vis' },
    { id: 'role', label: 'role', suffix: '' }
  ];

  let theme: (typeof themes)[number] = 'bigsky';
  let mode: Mode = 'light';

  let contrastFactor = 1.0;
  let visionPreset: VisionPreset = 'none';

  let showAllRoles = false;
  let selectedRole: Role = 'primary';

  let useCompactSteps = true;
  $: steps = (useCompactSteps ? compactSteps : allSteps);

  let activeStages: Stage[] = ['base', 'ct', 'role'];

  // Debug state
  let computedAt = '';
  let missing: string[] = [];
  let sampleVars: Array<{ name: string; value: string }> = [];

  // Extra debug: show what the DOM is *actually* set to
  let domTheme = '';
  let domMode: Mode | '' = '';

  function htmlEl() {
    return document.documentElement;
  }

  /** Read current theme/mode from the DOM and sync local state to it. */
  function syncThemeModeFromDOM() {
    const el = htmlEl();
    domTheme = el.dataset.theme ?? '';
    domMode = (el.dataset.mode as Mode) ?? '';

    // Only sync if DOM has values; prevents wiping local picks when DOM is empty.
    if (domTheme) {
      // @ts-expect-error: DOM may contain themes not listed in `themes` const
      theme = domTheme;
    }
    if (domMode === 'light' || domMode === 'dark') {
      mode = domMode;
    }
  }

  /** Only called when the user changes theme/mode *on this page*. */
  function applyThemeModeToDOM() {
    const el = htmlEl();
    el.dataset.theme = String(theme);
    el.dataset.mode = mode;
    syncThemeModeFromDOM();
  }

  /** Contrast should NEVER rewrite theme/mode. */
  function applyContrastFactor() {
    htmlEl().style.setProperty('--contrast-factor', String(contrastFactor));
  }

  function applyVisionPreset(preset: VisionPreset) {
    const el = htmlEl();

    for (const r of roles) {
      el.style.setProperty(`--vision-${r}-l-shift`, '0%');
      el.style.setProperty(`--vision-${r}-c-scale`, '1');
      el.style.setProperty(`--vision-${r}-h-shift`, '0deg');
    }

    if (preset === 'none') return;

    const presets: Record<VisionPreset, { l: string; c: string; h: string }> = {
      none: { l: '0%', c: '1', h: '0deg' },
      protanopia: { l: '0%', c: '0.85', h: '12deg' },
      deuteranopia: { l: '0%', c: '0.85', h: '-10deg' },
      tritanopia: { l: '0%', c: '0.88', h: '18deg' },
      monochromacy: { l: '0%', c: '0.05', h: '0deg' }
    };

    const p = presets[preset];
    for (const r of roles) {
      el.style.setProperty(`--vision-${r}-l-shift`, p.l);
      el.style.setProperty(`--vision-${r}-c-scale`, p.c);
      el.style.setProperty(`--vision-${r}-h-shift`, p.h);
    }
  }

  function tokenName(role: Role, step: string, stage: Stage) {
    const suffix = stages.find((s) => s.id === stage)?.suffix ?? '';
    return `--color-${role}-${step}${suffix}`;
  }

  function expectedVars(): string[] {
    const vars: string[] = [];

    vars.push('--on-primary', '--on-secondary', '--on-tertiary', '--on-success', '--on-warning', '--on-error', '--on-info');

    vars.push('--k-ct', '--contrast-factor');
    for (const r of roles) {
      vars.push(`--vision-${r}-l-shift`, `--vision-${r}-c-scale`, `--vision-${r}-h-shift`);
    }

    const rolesToCheck = showAllRoles ? roles : ([selectedRole] as const);

    for (const r of rolesToCheck) {
      for (const s of steps) {
        for (const st of activeStages) {
          vars.push(tokenName(r, s, st));
        }
      }
    }

    return vars;
  }

  function refreshDebug() {
    if (!browser) return;

    const el = htmlEl();
    const cs = getComputedStyle(el);

    const vars = expectedVars();
    const missingNext: string[] = [];

    for (const v of vars) {
      const val = cs.getPropertyValue(v).trim();
      if (!val) missingNext.push(v);
    }

    missing = missingNext;

    const sample = [
      `--k-ct`,
      `--color-${selectedRole}-500-base`,
      `--color-${selectedRole}-500-ct`,
      `--color-${selectedRole}-500-vis`,
      `--color-${selectedRole}-500`,
      `--on-primary`
    ];

    sampleVars = sample.map((name) => ({ name, value: cs.getPropertyValue(name).trim() }));
    computedAt = new Date().toLocaleString();

    syncThemeModeFromDOM();
  }

  /** Use this for theme/mode changes (page controls). */
  function applyAll() {
    if (!browser) return;
    applyThemeModeToDOM();
    applyContrastFactor();
    applyVisionPreset(visionPreset);
    requestAnimationFrame(refreshDebug);
  }

  /** Use this for contrast/vision changes so we do NOT stomp theme. */
  function applyKnobsOnly() {
    if (!browser) return;
    syncThemeModeFromDOM(); // reflect global state, but don't write it
    applyContrastFactor();
    applyVisionPreset(visionPreset);
    requestAnimationFrame(refreshDebug);
  }

  function toggleMode() {
    mode = mode === 'light' ? 'dark' : 'light';
    applyAll(); // this is a deliberate mode change, so apply theme/mode
  }

  function copy(text: string) {
    if (!browser) return;
    navigator.clipboard.writeText(text);
  }

  onMount(() => {
    // Start by honoring whatever global theme/mode is already on <html>
    syncThemeModeFromDOM();
    // Apply knobs without rewriting theme/mode
    applyKnobsOnly();
  });
</script>

<svelte:head>
  <title>Modes Test</title>
</svelte:head>

<div class="page">
  <header class="panel">
    <div class="row">
      <h1>Modes Test</h1>
      <div class="spacer"></div>
      <button class="btn" on:click={applyKnobsOnly}>Refresh</button>
      <button class="btn" on:click={toggleMode}>Toggle Mode ({mode})</button>
    </div>

    <div class="meta" style="margin-top: 0.5rem;">
      <div><strong>DOM:</strong> theme=<code>{domTheme || '—'}</code> mode=<code>{domMode || '—'}</code></div>
      <div><strong>Page:</strong> theme=<code>{String(theme)}</code> mode=<code>{mode}</code></div>
    </div>

    <div class="grid">
      <label class="field">
        <span>Theme</span>
        <select bind:value={theme} on:change={applyAll}>
          {#each themes as t}
            <option value={t}>{t}</option>
          {/each}
        </select>
        <small>Changing Theme here writes <code>data-theme</code> on <code>&lt;html&gt;</code>.</small>
      </label>

      <label class="field">
        <span>Mode</span>
        <select bind:value={mode} on:change={applyAll}>
          <option value="light">light</option>
          <option value="dark">dark</option>
        </select>
      </label>

      <label class="field">
        <span>Contrast factor</span>
        <div class="range">
          <input
            type="range"
            min="1"
            max="1.25"
            step="0.01"
            bind:value={contrastFactor}
            on:input={applyKnobsOnly}
          />
          <output>{contrastFactor.toFixed(2)}</output>
        </div>
        <small>Does NOT touch <code>data-theme</code>; only sets <code>--contrast-factor</code>.</small>
      </label>

      <label class="field">
        <span>Vision preset (debug)</span>
        <select bind:value={visionPreset} on:change={applyKnobsOnly}>
          <option value="none">none</option>
          <option value="protanopia">protanopia</option>
          <option value="deuteranopia">deuteranopia</option>
          <option value="tritanopia">tritanopia</option>
          <option value="monochromacy">monochromacy</option>
        </select>
      </label>

      <label class="field">
        <span>Role</span>
        <select bind:value={selectedRole} on:change={applyKnobsOnly} disabled={showAllRoles}>
          {#each roles as r}
            <option value={r}>{r}</option>
          {/each}
        </select>
        <small>Default shows one role.</small>
      </label>

      <label class="field">
        <span>Preview options</span>
        <div class="checks">
          <label class="check">
            <input type="checkbox" bind:checked={showAllRoles} on:change={applyKnobsOnly} />
            <span>Show all roles</span>
          </label>
          <label class="check">
            <input type="checkbox" bind:checked={useCompactSteps} on:change={applyKnobsOnly} />
            <span>Compact steps</span>
          </label>
        </div>
      </label>

      <label class="field">
        <span>Stages (replaces “final” with “role”)</span>
        <div class="chips">
          {#each stages as s}
            <button
              type="button"
              class="chip"
              class:is-active={activeStages.includes(s.id)}
              on:click={() => {
                const next = activeStages.includes(s.id)
                  ? activeStages.filter((x) => x !== s.id)
                  : [...activeStages, s.id];

                activeStages = next.length ? next : activeStages;
                applyKnobsOnly();
              }}
              title={s.id === 'role' ? 'Alias: --color-*-* (no suffix)' : `Suffix: ${s.suffix}`}
            >
              {s.label}
            </button>
          {/each}
        </div>
        <small><code>role</code> = <code>--color-*-*</code> alias (no <code>-final</code>).</small>
      </label>
    </div>

    <div class="meta">
      <div><strong>Computed:</strong> {computedAt || '—'}</div>
      <div class="pill">
        <strong>Missing vars:</strong> {missing.length}
        <button class="link" on:click={() => copy(missing.join('\n'))} disabled={missing.length === 0}>
          Copy list
        </button>
      </div>
    </div>

    <details class="details">
      <summary>Computed sample (base → ct → vis → role)</summary>
      <div class="sample">
        {#each sampleVars as v}
          <div class="sample-row">
            <code class="name">{v.name}</code>
            <code class="value">{v.value || '(empty)'}</code>
            <button class="btn small" on:click={() => copy(`${v.name}: ${v.value}`)}>Copy</button>
          </div>
        {/each}
      </div>
    </details>
  </header>

  {#if missing.length > 0}
    <section class="panel warn">
      <h2>Missing variables</h2>
      <p>
        These variables resolved to an empty string in <code>getComputedStyle()</code>. That typically means the theme CSS
        isn’t loaded for this route, the selector doesn’t match (<code>data-theme</code>/<code>data-mode</code>), or the token
        doesn’t exist yet.
      </p>
      <div class="missing">
        {#each missing as m}
          <button class="chip" on:click={() => copy(m)} title="Click to copy">{m}</button>
        {/each}
      </div>
    </section>
  {/if}

  <section class="panel">
    <h2>Ramp preview</h2>
    <p class="sub">
      Each step renders the selected stages. <strong>role</strong> is your alias <code>--color-*-*</code> (no suffix).
    </p>

    {#each (showAllRoles ? roles : [selectedRole]) as r}
      <div class="role">
        <div class="role-head">
          <h3>{r}</h3>
          <div class="role-badges">
            <span class="badge" style={`background: var(--color-${r}-500); color: var(--on-primary);`}>500</span>
            <span class="badge" style={`background: var(--color-${r}-700); color: var(--on-primary);`}>700</span>
          </div>
        </div>

        <div class="ramp" aria-label={`ramp ${r}`}>
          {#each steps as s}
            <div class="cell">
              <div class="step">{s}</div>

              <div class="swatches" style={`grid-template-columns: repeat(${activeStages.length}, 1fr);`}>
                {#each activeStages as st}
                  <div
                    class="swatch"
                    style={`background: var(${tokenName(r, s, st)});`}
                    title={`${tokenName(r, s, st)}`}
                  ></div>
                {/each}
              </div>

              <button class="link small" on:click={() => copy(`--color-${r}-${s}`)}>
                Copy var
              </button>
            </div>
          {/each}
        </div>
      </div>
    {/each}
  </section>

  <section class="panel">
    <h2>On-color roles</h2>
    <div class="oncolor">
      <div class="oncard" style="background: var(--color-primary-600); color: var(--on-primary);">
        <strong>Primary</strong>
        <code>--on-primary</code>
      </div>
      <div class="oncard" style="background: var(--color-secondary-600); color: var(--on-secondary);">
        <strong>Secondary</strong>
        <code>--on-secondary</code>
      </div>
      <div class="oncard" style="background: var(--color-tertiary-600); color: var(--on-tertiary);">
        <strong>Tertiary</strong>
        <code>--on-tertiary</code>
      </div>
      <div class="oncard" style="background: var(--color-success-600); color: var(--on-success);">
        <strong>Success</strong>
        <code>--on-success</code>
      </div>
      <div class="oncard" style="background: var(--color-warning-500); color: var(--on-warning);">
        <strong>Warning</strong>
        <code>--on-warning</code>
      </div>
      <div class="oncard" style="background: var(--color-error-600); color: var(--on-error);">
        <strong>Error</strong>
        <code>--on-error</code>
      </div>
      <div class="oncard" style="background: var(--color-info-600); color: var(--on-info);">
        <strong>Info</strong>
        <code>--on-info</code>
      </div>
    </div>
  </section>
</div>

<style>
  .page { padding: 1.25rem; display: grid; gap: 1rem; min-width: 0; }

  .panel {
    border: var(--border-width-card, var(--border-1)) solid color-mix(in oklab, currentColor 12%, transparent);
    border-radius: var(--radius-card, var(--radius-6));
    padding: 1rem;
    background: color-mix(in oklab, currentColor 3%, transparent); min-width: 0;
  }

  .warn {
    border-color: color-mix(in oklab, red 35%, transparent);
    background: color-mix(in oklab, red 8%, transparent);
  }

  h1 { margin: 0; font-size: 1.25rem; }
  h2 { margin: 0 0 0.5rem; font-size: 1.05rem; }
  h3 { margin: 0; font-size: 1rem; text-transform: capitalize; }

  .row { display: flex; align-items: center; gap: 0.5rem; }
  .spacer { flex: 1; }

  .grid {
    margin-top: 0.75rem;
    display: grid;
    gap: 0.75rem;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  }

  .field span { display: block; font-weight: 600; margin-bottom: 0.25rem; }
  .field small { display: block; opacity: 0.8; margin-top: 0.25rem; }
  select, input[type="range"] { width: 100%; }

  .range { display: flex; align-items: center; gap: 0.5rem; }
  output { min-width: 3.5ch; text-align: right; }

  .btn {
    border: 1px solid color-mix(in oklab, currentColor 18%, transparent);
    background: color-mix(in oklab, currentColor 6%, transparent);
    color: inherit;
    border-radius: 10px;
    padding: 0.45rem 0.65rem;
    cursor: pointer;
  }
  .btn.small { padding: 0.25rem 0.45rem; border-radius: 8px; }

  .link {
    border: none;
    background: none;
    color: inherit;
    text-decoration: underline;
    cursor: pointer;
    opacity: 0.9;
    padding: 0;
  }
  .link.small { font-size: 0.85rem; }

  .meta {
    margin-top: 0.75rem;
    display: flex;
    gap: 0.75rem;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    opacity: 0.95;
  }

  .pill {
    display: inline-flex;
    gap: 0.5rem;
    align-items: center;
    border: 1px solid color-mix(in oklab, currentColor 18%, transparent);
    border-radius: 999px;
    padding: 0.35rem 0.6rem;
  }

  .details { margin-top: 0.75rem; }
  .sample { margin-top: 0.5rem; display: grid; gap: 0.35rem; }
  .sample-row {
    display: grid;
    grid-template-columns: 1fr 2fr auto;
    gap: 0.5rem;
    align-items: center;
  }
  .name { opacity: 0.95; }
  .value { opacity: 0.85; overflow: auto; }

  .missing { display: flex; flex-wrap: wrap; gap: 0.35rem; margin-top: 0.5rem; }
  .chips { display: flex; flex-wrap: wrap; gap: 0.35rem; }

  .chip {
    border: 1px dashed color-mix(in oklab, currentColor 22%, transparent);
    background: transparent;
    color: inherit;
    border-radius: 999px;
    padding: 0.25rem 0.5rem;
    cursor: pointer;
    font-size: 0.85rem;
    opacity: 0.95;
  }
  .chip.is-active {
    border-style: solid;
    background: color-mix(in oklab, currentColor 7%, transparent);
  }

  .checks { display: grid; gap: 0.35rem; }
  .check { display: flex; align-items: center; gap: 0.5rem; }

  .sub { margin: 0 0 0.75rem; opacity: 0.85; }

  .role { margin-top: 1rem; }
  .role-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.75rem;
    margin-bottom: 0.5rem;
  }
  .role-badges { display: flex; gap: 0.35rem; }
  .badge {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 2.5rem;
    padding: 0.2rem 0.45rem;
    border-radius: 999px;
    font-weight: 700;
    font-size: 0.85rem;
  }

  .ramp {
    display: grid;
    grid-auto-flow: column;
    grid-auto-columns: minmax(140px, 160px);
    gap: 0.5rem;
    overflow-x: auto;
    padding-bottom: 0.5rem;
  }

  .cell {
    border: 1px solid color-mix(in oklab, currentColor 14%, transparent);
    border-radius: 10px;
    padding: 0.6rem;
    display: grid;
    gap: 0.45rem;
    background: color-mix(in oklab, currentColor 4%, transparent);
  }

  .step { font-weight: 700; opacity: 0.9; }
  .swatches { display: grid; gap: 0.4rem; }

  .swatch {
    height: 38px;
    border-radius: 10px;
    border: 1px solid color-mix(in oklab, black 15%, transparent);
  }

  .oncolor {
    display: grid;
    gap: 0.75rem;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  }

  .oncard {
    border-radius: 12px;
    padding: 0.85rem;
    border: 1px solid color-mix(in oklab, black 18%, transparent);
    display: grid;
    gap: 0.25rem;
  }

  code {
    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
    font-size: 0.9em;
  }
</style>
