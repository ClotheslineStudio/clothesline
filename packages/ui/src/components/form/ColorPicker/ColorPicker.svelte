<script lang="ts">
  import { Close } from '@clothesline/icons';
  import {
    colorStringToOklch,
    hslToOklch,
    oklchToCss,
    oklchToHex,
    oklchToHsl,
    oklchToRgb255,
    oklchToSrgb,
    rgb255ToOklch,
    type HslColor,
    type OklchColor,
    type RgbColor
  } from './color';

  export let label = 'Color';
  export let value = '#6381F8';
  export let embedded = false;

  type Tab = 'OKLCH' | 'HSL' | 'RGB' | 'HEX';
  const tabs: Tab[] = ['OKLCH', 'HSL', 'RGB', 'HEX'];
  const MAX_CHROMA = 0.37;
  const isBrowser = typeof window !== 'undefined';

  let open = embedded;
  let activeTab: Tab = 'OKLCH';
  let state: OklchColor = colorStringToOklch(value);
  let isSyncingFromValue = false;
  let planeEl: HTMLDivElement | null = null;
  let manualHex = '';
  const swatches = ['var(--color-primary-500-vis)', '#1298C4', '#0FA58C', '#2FA841', '#C78300', '#E15656', '#22252B', '#F1F3F7'];

  $: if (!embedded && !isSyncingFromValue) {
    state = colorStringToOklch(value);
  }
  $: if (embedded) open = true;
  $: if (embedded) state = colorStringToOklch(value);

  $: displayOklch = oklchToCss(state);
  $: rgb = oklchToRgb255(state);
  $: hsl = oklchToHsl(state);
  $: hex = oklchToHex(state, state.a < 1);
  $: triggerValue = oklchToHex(state, false);
  $: pickerRgb = oklchToSrgb({ ...state, l: 0.64, c: 0.18, a: 1 });
  $: pickerHueColor = `rgb(${Math.round(pickerRgb.r * 255)}, ${Math.round(pickerRgb.g * 255)}, ${Math.round(pickerRgb.b * 255)})`;
  $: alphaMixColor = oklchToCss({ ...state, a: 1 });
  $: activeColor = oklchToCss({ ...state, a: 1 });
  $: lightnessLowColor = oklchToCss({ ...state, l: 0, a: 1 });
  $: lightnessMidColor = oklchToCss({ ...state, l: 0.5, a: 1 });
  $: lightnessHighColor = oklchToCss({ ...state, l: 1, a: 1 });
  $: chromaLowColor = oklchToCss({ ...state, c: 0, a: 1 });
  $: chromaHighColor = oklchToCss({ ...state, c: MAX_CHROMA, a: 1 });
  $: if (!manualHex || !open || activeTab !== 'HEX') manualHex = hex;

  function clamp(value: number, min: number, max: number) {
    return Math.min(max, Math.max(min, value));
  }

  function normalizeHue(hue: number) {
    const h = hue % 360;
    return h < 0 ? h + 360 : h;
  }

  function updateValue(next: OklchColor) {
    isSyncingFromValue = true;
    state = {
      l: clamp(next.l, 0, 1),
      c: clamp(next.c, 0, MAX_CHROMA),
      h: normalizeHue(next.h),
      a: clamp(next.a, 0, 1)
    };
    value = oklchToCss(state);
    queueMicrotask(() => {
      isSyncingFromValue = false;
    });
  }

  function setFromPlane(clientX: number, clientY: number) {
    if (!planeEl) return;
    const rect = planeEl.getBoundingClientRect();
    const x = clamp((clientX - rect.left) / rect.width, 0, 1);
    const y = clamp((clientY - rect.top) / rect.height, 0, 1);
    updateValue({
      ...state,
      c: Number((x * MAX_CHROMA).toFixed(4)),
      l: Number((1 - y).toFixed(4))
    });
  }

  function onPlanePointerDown(event: PointerEvent) {
    const target = event.currentTarget as HTMLElement;
    target.setPointerCapture(event.pointerId);
    setFromPlane(event.clientX, event.clientY);
  }

  function onPlanePointerMove(event: PointerEvent) {
    const target = event.currentTarget as HTMLElement;
    if (target.hasPointerCapture(event.pointerId)) {
      setFromPlane(event.clientX, event.clientY);
    }
  }

  async function copyColor() {
    if (!isBrowser || !navigator.clipboard) return;
    const raw =
      activeTab === 'RGB'
        ? `rgb(${rgb.r} ${rgb.g} ${rgb.b} / ${Math.round(state.a * 100)}%)`
        : activeTab === 'HSL'
          ? `hsl(${hsl.h.toFixed(2)} ${Math.round(hsl.s * 100)}% ${Math.round(hsl.l * 100)}% / ${Math.round(hsl.a * 100)}%)`
          : activeTab === 'HEX'
            ? hex
            : displayOklch;
    await navigator.clipboard.writeText(raw);
  }

  function selectSwatch(hexColor: string) {
    updateValue(colorStringToOklch(hexColor));
  }

  function updateHsl(partial: Partial<HslColor>) {
    updateValue(
      hslToOklch({
        h: partial.h ?? hsl.h,
        s: partial.s ?? hsl.s,
        l: partial.l ?? hsl.l,
        a: partial.a ?? hsl.a
      })
    );
  }

  function updateRgb(partial: Partial<RgbColor>) {
    updateValue(
      rgb255ToOklch({
        r: partial.r ?? rgb.r,
        g: partial.g ?? rgb.g,
        b: partial.b ?? rgb.b,
        a: partial.a ?? rgb.a
      })
    );
  }

  function applyHexInput() {
    const parsed = colorStringToOklch(manualHex);
    updateValue(parsed);
    manualHex = oklchToHex(parsed, parsed.a < 1);
  }

  function closePicker() {
    if (!embedded) open = false;
  }
</script>

<div class="oklch-picker">
  {#if !embedded}
    <div class="row">
      <span class="picker-label">{label}</span>
      <button type="button" class="trigger" aria-label={`Open ${label} picker`} aria-expanded={open} on:click={() => (open = !open)}>
        <span class="swatch" style={`background:${displayOklch};`}></span>
        <span class="trigger-text">{triggerValue}</span>
      </button>
    </div>
  {/if}

  {#if open}
    <div
      class="panel"
      role="group"
      aria-label={`${label} color picker`}
      style={`
        --picker-active-color:${activeColor};
        --lightness-low:${lightnessLowColor};
        --lightness-mid:${lightnessMidColor};
        --lightness-high:${lightnessHighColor};
        --chroma-low:${chromaLowColor};
        --chroma-high:${chromaHighColor};
      `}
    >
      <header class="panel-head">
        <h4>{label}</h4>
        {#if !embedded}
          <button type="button" class="icon-close" aria-label="Close color picker" on:click={closePicker}>
            <Close size={14} />
          </button>
        {/if}
      </header>

      <div class="tabs">
        {#each tabs as tab}
          <button type="button" class:active={activeTab === tab} on:click={() => (activeTab = tab)}>{tab}</button>
        {/each}
      </div>

      <div
        bind:this={planeEl}
        class="plane"
        on:pointerdown={onPlanePointerDown}
        on:pointermove={onPlanePointerMove}
        style={`--hue-color:${pickerHueColor}; --cursor-x:${(state.c / MAX_CHROMA) * 100}%; --cursor-y:${(1 - state.l) * 100}%;`}
      >
        <span class="plane-cursor" aria-hidden="true"></span>
      </div>

      <div class="value-row">
        {#if activeTab === 'HEX'}
          <input aria-label={`${label} HEX value`} type="text" bind:value={manualHex} on:change={applyHexInput} on:blur={applyHexInput} />
        {:else if activeTab === 'RGB'}
          <input aria-label={`${label} RGB value`} type="text" value={`rgb(${rgb.r} ${rgb.g} ${rgb.b} / ${Math.round(state.a * 100)}%)`} readonly />
        {:else if activeTab === 'HSL'}
          <input aria-label={`${label} HSL value`} type="text" value={`hsl(${hsl.h.toFixed(2)} ${Math.round(hsl.s * 100)}% ${Math.round(hsl.l * 100)}% / ${Math.round(hsl.a * 100)}%)`} readonly />
        {:else}
          <input aria-label={`${label} OKLCH value`} type="text" value={displayOklch} readonly />
        {/if}
        <button type="button" class="copy-button" aria-label={`Copy ${label} color value`} on:click={copyColor}>Copy</button>
      </div>

      {#if activeTab === 'OKLCH'}
        <div class="slider-row">
          <label>
            <span>Lightness</span>
            <input class="slider slider-lightness" type="range" min="0" max="1" step="0.0001" value={state.l} on:input={(e) => updateValue({ ...state, l: Number((e.currentTarget as HTMLInputElement).value) })} />
          </label>
          <input type="number" min="0" max="1" step="0.0001" value={state.l.toFixed(4)} on:input={(e) => updateValue({ ...state, l: Number((e.currentTarget as HTMLInputElement).value) })} />
        </div>

        <div class="slider-row">
          <label>
            <span>Chroma</span>
            <input class="slider slider-chroma" type="range" min="0" max={MAX_CHROMA} step="0.0001" value={state.c} on:input={(e) => updateValue({ ...state, c: Number((e.currentTarget as HTMLInputElement).value) })} />
          </label>
          <input type="number" min="0" max={MAX_CHROMA} step="0.0001" value={state.c.toFixed(4)} on:input={(e) => updateValue({ ...state, c: Number((e.currentTarget as HTMLInputElement).value) })} />
        </div>

        <div class="slider-row">
          <label>
            <span>Hue</span>
            <input class="slider slider-hue" type="range" min="0" max="360" step="0.01" value={state.h} on:input={(e) => updateValue({ ...state, h: Number((e.currentTarget as HTMLInputElement).value) })} />
          </label>
          <input type="number" min="0" max="360" step="0.01" value={state.h.toFixed(2)} on:input={(e) => updateValue({ ...state, h: Number((e.currentTarget as HTMLInputElement).value) })} />
        </div>
      {:else if activeTab === 'HSL'}
        <div class="slider-row">
          <label>
            <span>Hue</span>
            <input class="slider slider-hue" type="range" min="0" max="360" step="0.01" value={hsl.h} on:input={(e) => updateHsl({ h: Number((e.currentTarget as HTMLInputElement).value) })} />
          </label>
          <input type="number" min="0" max="360" step="0.01" value={hsl.h.toFixed(2)} on:input={(e) => updateHsl({ h: Number((e.currentTarget as HTMLInputElement).value) })} />
        </div>

        <div class="slider-row">
          <label>
            <span>Saturation</span>
            <input class="slider slider-chroma" type="range" min="0" max="100" step="0.1" value={hsl.s * 100} on:input={(e) => updateHsl({ s: Number((e.currentTarget as HTMLInputElement).value) / 100 })} />
          </label>
          <input type="number" min="0" max="100" step="0.1" value={(hsl.s * 100).toFixed(1)} on:input={(e) => updateHsl({ s: Number((e.currentTarget as HTMLInputElement).value) / 100 })} />
        </div>

        <div class="slider-row">
          <label>
            <span>Lightness</span>
            <input class="slider slider-lightness" type="range" min="0" max="100" step="0.1" value={hsl.l * 100} on:input={(e) => updateHsl({ l: Number((e.currentTarget as HTMLInputElement).value) / 100 })} />
          </label>
          <input type="number" min="0" max="100" step="0.1" value={(hsl.l * 100).toFixed(1)} on:input={(e) => updateHsl({ l: Number((e.currentTarget as HTMLInputElement).value) / 100 })} />
        </div>
      {:else if activeTab === 'RGB'}
        <div class="slider-row">
          <label>
            <span>Red</span>
            <input class="slider slider-red" type="range" min="0" max="255" step="1" value={rgb.r} on:input={(e) => updateRgb({ r: Number((e.currentTarget as HTMLInputElement).value) })} />
          </label>
          <input type="number" min="0" max="255" step="1" value={rgb.r} on:input={(e) => updateRgb({ r: Number((e.currentTarget as HTMLInputElement).value) })} />
        </div>

        <div class="slider-row">
          <label>
            <span>Green</span>
            <input class="slider slider-green" type="range" min="0" max="255" step="1" value={rgb.g} on:input={(e) => updateRgb({ g: Number((e.currentTarget as HTMLInputElement).value) })} />
          </label>
          <input type="number" min="0" max="255" step="1" value={rgb.g} on:input={(e) => updateRgb({ g: Number((e.currentTarget as HTMLInputElement).value) })} />
        </div>

        <div class="slider-row">
          <label>
            <span>Blue</span>
            <input class="slider slider-blue" type="range" min="0" max="255" step="1" value={rgb.b} on:input={(e) => updateRgb({ b: Number((e.currentTarget as HTMLInputElement).value) })} />
          </label>
          <input type="number" min="0" max="255" step="1" value={rgb.b} on:input={(e) => updateRgb({ b: Number((e.currentTarget as HTMLInputElement).value) })} />
        </div>
      {/if}

      <div class="slider-row">
        <label>
          <span>Alpha</span>
          <input class="slider slider-alpha" type="range" min="0" max="100" step="1" value={Math.round(state.a * 100)} style={`--alpha-color:${alphaMixColor};`} on:input={(e) => updateValue({ ...state, a: Number((e.currentTarget as HTMLInputElement).value) / 100 })} />
        </label>
        <input type="number" min="0" max="100" step="1" value={Math.round(state.a * 100)} on:input={(e) => updateValue({ ...state, a: Number((e.currentTarget as HTMLInputElement).value) / 100 })} />
      </div>

      <div class="swatches">
        {#each swatches as swatch}
          <button type="button" aria-label={`Select ${swatch}`} style={`background:${swatch};`} on:click={() => selectSwatch(swatch)}></button>
        {/each}
      </div>
    </div>
  {/if}
</div>

<style>
  .oklch-picker {
    display: grid;
    gap: var(--spacing-2);
    position: relative;
  }

  .row {
    display: grid;
    grid-template-columns: 1fr;
    align-items: start;
    gap: 0.35rem;
  }

  .picker-label {
    font-size: 0.72rem;
    color: var(--text-muted, var(--on-surface-muted));
    font-weight: 600;
  }

  .trigger {
    border: 1px solid color-mix(in oklab, var(--on-surface) 10%, transparent);
    background: color-mix(in oklab, var(--on-surface) 8%, transparent);
    color: var(--on-surface, var(--color-surface-900-vis));
    min-height: 2.65rem;
    display: inline-flex;
    align-items: center;
    gap: 0.55rem;
    padding: 0 0.55rem;
    text-align: left;
    width: 100%;
    border-radius: 0.72rem;
  }

  .swatch {
    width: 2.15rem;
    height: 2.15rem;
    border-radius: 0.72rem;
    border: 1px solid color-mix(in oklab, var(--on-surface) 12%, transparent);
  }

  .trigger-text {
    font-family: var(--type-code-family);
    font-size: 1.02rem;
    letter-spacing: 0.01em;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .panel {
    border: 1px solid color-mix(in oklab, var(--on-surface) 14%, transparent);
    border-radius: var(--radius-card, 1rem);
    background: var(--background-panel, var(--color-surface-100-vis));
    color: var(--on-surface, var(--color-surface-900-vis));
    padding: 0.8rem;
    display: grid;
    gap: 0.65rem;
    width: 100%;
    overflow: visible;
    box-shadow: var(--elevation-popover, 0 10px 24px rgba(0, 0, 0, 0.18));
    z-index: var(--z-popover, 200);
  }

  .panel-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .panel-head h4 {
    margin: 0;
    font-size: 1rem;
    font-weight: var(--type-weight-semibold);
  }

  .icon-close {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 1.85rem;
    height: 1.85rem;
    padding: 0;
    border-radius: 999px;
    border: 1px solid color-mix(in oklab, var(--on-surface) 12%, transparent);
    background: var(--fill-surface, var(--color-surface-100-vis));
    color: var(--on-surface, var(--color-surface-900-vis));
  }

  .tabs {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 0.35rem;
    background: color-mix(in oklab, var(--on-surface) 6%, transparent);
    padding: 0.35rem;
    border-radius: 0.7rem;
  }

  .tabs button {
    border: 1px solid transparent;
    border-radius: 0.5rem;
    background: transparent;
    color: var(--on-surface-muted, var(--color-surface-700-vis));
    font-size: 0.82rem;
    font-weight: 650;
    padding: 0.35rem 0.25rem;
  }

  .tabs button.active {
    border-color: var(--primary, var(--color-primary-500-vis));
    color: var(--on-surface-strong, var(--color-surface-900-vis));
    background: var(--background-panel, var(--color-surface-50-vis));
  }

  .plane {
    position: relative;
    height: clamp(140px, 22vw, 180px);
    border-radius: 0.8rem;
    border: 1px solid color-mix(in oklab, var(--on-surface) 14%, transparent);
    overflow: hidden;
    cursor: crosshair;
  }

  .plane::before {
    content: '';
    position: absolute;
    inset: 1px;
    border-radius: calc(0.8rem - 1px);
    background:
      linear-gradient(to top, black, transparent),
      linear-gradient(to right, #f2f2fa, var(--hue-color, #6381f8));
    pointer-events: none;
  }

  .plane-cursor {
    position: absolute;
    width: 0.95rem;
    height: 0.95rem;
    border-radius: 999px;
    border: 2px solid white;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.25);
    left: var(--cursor-x);
    top: var(--cursor-y);
    transform: translate(-50%, -50%);
    pointer-events: none;
    z-index: 1;
  }

  .value-row {
    display: grid;
    grid-template-columns: 1fr auto;
    gap: 0.45rem;
  }

  .value-row input,
  .slider-row input[type='number'] {
    border: 1px solid color-mix(in oklab, var(--on-surface) 16%, transparent);
    background: color-mix(in oklab, var(--on-surface) 4%, transparent);
    color: var(--on-surface, var(--color-surface-900-vis));
    border-radius: 0.75rem;
    padding: 0.55rem 0.75rem;
    min-height: 2rem;
    font-family: var(--type-code-family);
    font-size: 0.95rem;
  }

  .copy-button {
    border: 1px solid color-mix(in oklab, var(--on-surface) 16%, transparent);
    background: color-mix(in oklab, var(--on-surface) 4%, transparent);
    color: var(--on-surface-strong, var(--color-surface-900-vis));
    border-radius: 0.75rem;
    min-height: 2rem;
    padding: 0 0.7rem;
    font-weight: 600;
  }

  .slider-row {
    display: grid;
    grid-template-columns: 1fr 5.2rem;
    gap: 0.55rem;
    align-items: end;
  }

  .slider-row label {
    display: grid;
    gap: 0.4rem;
  }

  .slider-row label span {
    font-size: 0.78rem;
    color: var(--on-surface-strong, var(--color-surface-900-vis));
    font-weight: 650;
  }

  .slider {
    appearance: none;
    width: 100%;
    height: 1.1rem;
    border-radius: 999px;
    border: 0;
    background: var(--slider-track, linear-gradient(90deg, #233068, #9dacff));
    box-shadow: inset 0 0 0 1px color-mix(in oklab, var(--on-surface) 10%, transparent);
    padding: 0;
  }

  .slider::-webkit-slider-thumb {
    appearance: none;
    width: 1.1rem;
    height: 1.1rem;
    border-radius: 999px;
    border: 2px solid #f5f6fb;
    background: var(--picker-active-color, var(--color-primary-500-vis, #6381f8));
  }

  .slider::-moz-range-thumb {
    width: 1.1rem;
    height: 1.1rem;
    border-radius: 999px;
    border: 2px solid #f5f6fb;
    background: var(--picker-active-color, var(--color-primary-500-vis, #6381f8));
  }

  .slider::-moz-range-track {
    height: 1.1rem;
    border-radius: 999px;
    background: var(--slider-track, linear-gradient(90deg, #233068, #9dacff));
    border: 0;
  }

  .slider-lightness {
    --slider-track: linear-gradient(90deg, var(--lightness-low, #000), var(--lightness-mid, var(--hue-color, #6381f8)), var(--lightness-high, #fff));
  }

  .slider-chroma {
    --slider-track: linear-gradient(90deg, var(--chroma-low, #9ca3af), var(--chroma-high, var(--hue-color, #6381f8)));
  }

  .slider-hue {
    --slider-track: linear-gradient(90deg, #ff0000 0%, #ffff00 16%, #00ff00 33%, #00ffff 50%, #0000ff 66%, #ff00ff 83%, #ff0000 100%);
  }

  .slider-alpha {
    --slider-track: linear-gradient(to right, transparent, var(--alpha-color, #6381f8));
  }

  .slider-red { --slider-track: linear-gradient(90deg, #111, #ff4b4b); }
  .slider-green { --slider-track: linear-gradient(90deg, #111, #35d466); }
  .slider-blue { --slider-track: linear-gradient(90deg, #111, #4f79ff); }

  .swatches {
    border-top: 1px solid color-mix(in oklab, var(--on-surface) 14%, transparent);
    padding-top: 0.65rem;
    display: flex;
    flex-wrap: wrap;
    gap: 0.45rem;
  }

  .swatches button {
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 0.45rem;
    border: 1px solid color-mix(in oklab, var(--on-surface) 15%, transparent);
  }
</style>
