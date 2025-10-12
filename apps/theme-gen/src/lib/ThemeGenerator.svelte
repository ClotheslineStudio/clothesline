<script lang="ts">
  import { browser } from '$app/environment';
  import { theme, system, roles, cssVars, ramps } from '$lib/stores/tokens';
  import { copyText, cssFromVars, jsonFromVars, downloadText } from '$lib/utils/export';

  // subscribe (simple pattern; fine for this page-sized component)
  // import type { Theme } from '$lib/stores/tokens';
  let themeValue: any;  const unsubT = theme.subscribe(v => themeValue = v);
  // Remove incorrect import; use the correct type if available, or use 'any' as a fallback
  let systemValue: any; const unsubS = system.subscribe(v => systemValue = v);
  let cssValue: Record<string, string | number> = {};    const unsubC = cssVars.subscribe(v => cssValue = v);
  let rampsValue: Record<string, Array<{ val: string; level: number }>>;  const unsubR = ramps.subscribe(v => rampsValue = v);

  let activeRole: (typeof roles)[number] = 'primary';
  let copied = ''; // tiny UX state

  function setMode(m: 'light' | 'dark') {
    theme.update(t => ({ ...t, mode: m }));
    if (browser) document.documentElement.setAttribute('data-mode', m);
  }

  // ---- handlers -----------------------------------------------------------
  async function handleCopyCSS() {
    const css = cssFromVars(cssValue);
    const ok = await copyText(css);
    copied = ok ? 'CSS copied' : 'Copy failed';
    setTimeout(() => (copied = ''), 1200);
  }
  async function handleCopyJSON() {
    const json = jsonFromVars(cssValue);
    const ok = await copyText(json);
    copied = ok ? 'JSON copied' : 'Copy failed';
    setTimeout(() => (copied = ''), 1200);
  }
  function handleDownload() {
    const css = cssFromVars(cssValue);
    const json = jsonFromVars(cssValue);
    downloadText('theme.css', css, 'text/css');
    downloadText('theme.json', json, 'application/json');
  }

  // apply tokens to document root (optional toggle)
  let applyToDocument = true;
  $: if (browser && applyToDocument) {
    Object.entries(cssValue).forEach(([k,v]) => {
      document.documentElement.style.setProperty(k, String(v));
    });
  }

  // cleanup
  import { onDestroy } from 'svelte';
  onDestroy(() => { unsubT(); unsubS(); unsubC(); unsubR(); });
</script>

<!-- scope the vars so preview works even if not applied globally -->
<div class="grid grid-cols-1 xl:grid-cols-5 gap-6" style={cssFromVars(cssValue)}>
  <!-- LEFT: Modes, Roles, Color Editor -->
  <aside class="xl:col-span-2">
    <section class="mb-6">
      <div class="flex items-center justify-between mb-2">
        <h3 class="label font-semibold">Modes & Contrast</h3>
        <label class="text-xs flex items-center gap-2">
          <input type="checkbox" bind:checked={applyToDocument}>
          Apply to document
        </label>
      </div>
      <div class="cl-section">
        <div class="flex gap-2 mb-3">
          <button class="btn" type="button" on:click={() => setMode('light')}>Light</button>
          <button class="btn" type="button" on:click={() => setMode('dark')}>Dark</button>
        </div>
        <label class="label block mb-1" for="contrast-range">Contrast {themeValue.contrast.toFixed(2)}×</label>
        <input id="contrast-range" type="range" min="1" max="1.36" step="0.01"
          value={themeValue.contrast}
          on:input={(e:any)=>theme.update(t=>({...t, contrast: Number(e.currentTarget.value)}))}
          class="w-full" />
      </div>
    </section>

    <section class="mb-6">
      <div class="flex items-center justify-between mb-2">
        <h3 class="label font-semibold">Roles</h3>
      </div>
      <div class="cl-section">
        <div class="flex flex-wrap gap-2">
          {#each roles as r}
            <button class="btn" type="button"
              class:!bg-black={!activeRole || activeRole===r}
              class:!text-white={!activeRole || activeRole===r}
              on:click={() => activeRole = r}>{r}</button>
          {/each}
        </div>
        <div class="mt-4">
          <div class="label mb-1">{activeRole.toUpperCase()} hue</div>
          <input type="range" min="0" max="360" step="1"
            value={themeValue.seeds[activeRole].hue}
            on:input={(e:any)=>theme.update(t=>({ ...t, seeds: { ...t.seeds, [activeRole]: { ...t.seeds[activeRole], hue: Number(e.currentTarget.value) }}}))}
            class="w-full" />
        </div>
        <div class="mt-3">
          <div class="label mb-1">{activeRole.toUpperCase()} chroma</div>
          <input type="range" min="0" max="0.24" step="0.005"
            value={themeValue.seeds[activeRole].chroma}
            on:input={(e:any)=>theme.update(t=>({ ...t, seeds: { ...t.seeds, [activeRole]: { ...t.seeds[activeRole], chroma: Number(e.currentTarget.value) }}}))}
            class="w-full" />
        </div>
        <div class="grid grid-cols-10 gap-1 mt-3">
          {#each rampsValue[activeRole] as s}
            <div class="h-8 rounded border border-black/10" style={`background:${s.val}`} title={`${activeRole}-${s.level}`}></div>
          {/each}
        </div>
      </div>
    </section>
  </aside>

  <!-- RIGHT: Typography / Spacing / Radii / Preview / Export -->
  <main class="xl:col-span-3">
    <!-- Typography -->
    <section class="mb-6">
      <div class="flex items-center justify-between mb-2">
        <h3 class="label font-semibold">Typography</h3>
      </div>
      <div class="cl-section">
        <div class="grid sm:grid-cols-2 gap-3">
          <div>
            <div class="label mb-1">Font Stack</div>
            <select class="btn bg-transparent w-full"
              on:change={(e:any)=>system.update(s=>({ ...s, fontStack: e.currentTarget.value }))}>
              <!-- common stacks -->
              <option value="Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Arial">Inter / System</option>
              <option value="ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Arial">System UI</option>
              <option value="ui-serif, Georgia, Cambria, 'Times New Roman', Times, serif">Serif</option>
              <option value="ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', monospace">Monospace</option>
            </select>
          </div>
          <div>
            <div class="label mb-1">Base size (px)</div>
            <input type="range" min="12" max="20" step="1"
              value={systemValue.baseFontPx}
              on:input={(e:any)=>system.update(s=>({ ...s, baseFontPx: Number(e.currentTarget.value) }))} class="w-full" />
            <div class="text-xs text-zinc-500 mt-1">{systemValue.baseFontPx}px</div>
          </div>
          <div>
            <div class="label mb-1">Scale ratio</div>
            <input type="range" min="1.1" max="1.333" step="0.005"
              value={systemValue.typeRatio}
              on:input={(e:any)=>system.update(s=>({ ...s, typeRatio: Number(e.currentTarget.value) }))} class="w-full" />
            <div class="text-xs text-zinc-500 mt-1">{systemValue.typeRatio.toFixed(3)}×</div>
          </div>
          <div class="rounded-xl border border-black/10 p-3">
            <div class="label mb-2">Scale preview</div>
            <div style="font-family: var(--font-family)">
              <div style="font-size: var(--fs-xs); line-height: var(--lh-relaxed)">XS: quick brown fox</div>
              <div style="font-size: var(--fs-sm); line-height: var(--lh-relaxed)">SM: quick brown fox</div>
              <div style="font-size: var(--fs-base); line-height: var(--lh-normal)">BASE: quick brown fox</div>
              <div style="font-size: var(--fs-lg); line-height: var(--lh-normal)">LG: quick brown fox</div>
              <div style="font-size: var(--fs-xl); line-height: var(--lh-tight)">XL: quick brown fox</div>
              <div style="font-size: var(--fs-2xl); line-height: var(--lh-tight)">2XL: quick brown fox</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Spacing & Radii -->
    <section class="mb-6">
      <div class="flex items-center justify-between mb-2">
        <h3 class="label font-semibold">Spacing & Radii</h3>
      </div>
      <div class="cl-section">
        <div class="grid sm:grid-cols-2 gap-3">
          <div>
            <div class="label mb-1">Base spacing (px)</div>
            <input type="range" min="2" max="8" step="1"
              value={systemValue.spaceBase}
              on:input={(e:any)=>system.update(s=>({ ...s, spaceBase: Number(e.currentTarget.value) }))} class="w-full" />
            <div class="text-xs text-zinc-500 mt-1">{systemValue.spaceBase}px</div>
          </div>
          <div>
            <div class="label mb-1">Steps (count)</div>
            <input type="range" min="6" max="16" step="1"
              value={systemValue.spaceSteps}
              on:input={(e:any)=>system.update(s=>({ ...s, spaceSteps: Number(e.currentTarget.value) }))} class="w-full" />
            <div class="text-xs text-zinc-500 mt-1">0…{systemValue.spaceSteps}</div>
          </div>
          <div>
            <div class="label mb-1">Radius base (px)</div>
            <input type="range" min="4" max="16" step="1"
              value={systemValue.radiusBase}
              on:input={(e:any)=>system.update(s=>({ ...s, radiusBase: Number(e.currentTarget.value) }))} class="w-full" />
            <div class="text-xs text-zinc-500 mt-1">{systemValue.radiusBase}px (md)</div>
          </div>
          <div>
            <div class="label mb-1">Radius scale</div>
            <input type="range" min="1.1" max="1.8" step="0.01"
              value={systemValue.radiusScale}
              on:input={(e:any)=>system.update(s=>({ ...s, radiusScale: Number(e.currentTarget.value) }))} class="w-full" />
            <div class="text-xs text-zinc-500 mt-1">{systemValue.radiusScale.toFixed(2)}×</div>
          </div>

          <div class="sm:col-span-2 rounded-xl border border-black/10 p-3">
            <div class="label mb-2">Tokens</div>
            <div class="flex flex-wrap gap-2 items-end">
              <div class="text-[11px] text-zinc-500">Spacing:</div>
              {#each Array.from({ length: systemValue.spaceSteps + 1 }) as _, i}
                <div class="px-2 py-1 rounded border border-black/10" style={`padding-inline: var(--space-${i})`}>space-{i}</div>
              {/each}
            </div>
            <div class="mt-2 flex flex-wrap gap-2 items-end">
              <div class="text-[11px] text-zinc-500">Radii:</div>
              {#each ['sm','md','lg','xl','2xl'] as k}
                <div class="w-16 h-10 border border-black/10" style={`border-radius: var(--radius-${k}); background: var(--color-surface-100)`}></div>
              {/each}
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Live Preview -->
    <section class="mb-6">
      <div class="flex items-center justify-between mb-2">
        <h3 class="label font-semibold">Live Preview</h3>
        <span class="text-xs text-zinc-500">{themeValue.name} • {themeValue.mode}</span>
      </div>
      <div class="rounded-2xl overflow-hidden cl-section">
        <div class="flex items-center justify-between"
          style="background: var(--color-surface-50); color: var(--on-surface-50); padding: var(--space-4)">
          <div style="font-family: var(--font-family); font-size: var(--fs-lg); line-height: var(--lh-tight);">
            Preview App
          </div>
          <div class="flex gap-2">
            <button class="btn" style="background: var(--primary); color: var(--on-primary); border-radius: var(--radius-lg)">Primary</button>
            <button class="btn" style="background: var(--secondary); color: var(--on-secondary); border-radius: var(--radius-lg)">Secondary</button>
          </div>
        </div>

        <div class="grid md:grid-cols-3"
          style="gap: var(--space-4); padding: var(--space-6); background: var(--color-surface-100); color: var(--on-surface-100); font-family: var(--font-family)">
          <div class="md:col-span-2 cl-card" style="background: var(--color-surface-50); color: var(--on-surface-50)">
            <div style="font-size: var(--fs-sm); line-height: var(--lh-relaxed); opacity:.7; text-transform: uppercase;">Card</div>
            <h2 style="font-size: var(--fs-2xl); line-height: var(--lh-tight); margin-top: var(--space-1)">Build accessible ramps</h2>
            <p style="font-size: var(--fs-base); line-height: var(--lh-normal); margin-top: var(--space-2); opacity:.85">
              Tweak hue, chroma, contrast, and modes. Typography, spacing, and radii keep the UI consistent.
            </p>
            <div class="flex flex-wrap" style="gap: var(--space-2); margin-top: var(--space-4)">
              {#each ['primary','secondary','accent','success','warning','error'] as r}
                <span class="token-chip" style={`border-radius: var(--radius-md); background: var(--color-${r}-200); color: var(--on-${r}-200)`}>{r}</span>
              {/each}
            </div>
            <div class="flex" style="gap: var(--space-3); margin-top: var(--space-4)">
              <button class="btn" style="background: var(--primary); color: var(--on-primary); border-radius: var(--radius-xl)">Primary</button>
              <button class="btn bg-transparent" style="border-color: var(--primary); color: var(--primary); border-radius: var(--radius-xl)">Outline</button>
            </div>
          </div>

          <div class="cl-card">
            <div style="font-size: var(--fs-sm); line-height: var(--lh-relaxed); opacity:.7; text-transform: uppercase;">Tokens</div>
            <div class="grid grid-cols-5 gap-1 mt-3">
              {#each rampsValue.primary as s}
                <div class="h-6 rounded" style="background:{s.val}" title="primary-{s.level}"></div>
              {/each}
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Export -->
    <section class="mb-6">
      <div class="flex items-center justify-between mb-2">
        <h3 class="label font-semibold">Export</h3>
        <span class="text-xs text-zinc-500">JSON / CSS</span>
      </div>
      <div class="cl-section flex flex-col sm:flex-row gap-3 items-start">
        <button class="btn" on:click={handleCopyCSS}>Copy CSS Variables</button>
        <button class="btn" on:click={handleCopyJSON}>Copy Theme JSON</button>
        <button class="btn" on:click={handleDownload} style="background: var(--primary); color: var(--on-primary)">Download</button>
        {#if copied}<span class="text-xs text-zinc-500">{copied}</span>{/if}
      </div>
    </section>
  </main>
</div>

<style>
  .label { font-size: 12px; color: rgb(113 113 122); text-transform: uppercase; letter-spacing: .06em; }
  .btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border: 1px solid rgba(0,0,0,0.1);
    padding-left: 0.75rem;
    padding-right: 0.75rem;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    border-radius: 0.75rem;
  }
  .cl-section {
    border: 1px solid color-mix(in oklab, black 10%, transparent);
    border-radius: var(--radius-xl, 12px);
    background: color-mix(in oklab, var(--color-surface-50) 88%, white 12%);
    padding: 16px; backdrop-filter: blur(6px);
  }
  .cl-card {
    border: 1px solid color-mix(in oklab, black 12%, transparent);
    border-radius: var(--radius-2xl, 16px);
    background: var(--color-surface-50, white);
    color: var(--on-surface-50, oklch(18% 0 0deg));
    padding: var(--pad-card, 16px);
    box-shadow: 0 0.5px 0 rgba(0,0,0,.12), 0 6px 18px rgba(0,0,0,.04);
  }
</style>

