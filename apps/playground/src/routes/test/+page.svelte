<script lang="ts">
  import { onMount } from 'svelte';
  import { browser } from '$app/environment';

  // Simple knobs
  let theme: 'bigsky' | 'retrograde' = 'bigsky';
  let mode: 'light' | 'dark' = 'light';

  // Glass tuning (these become CSS custom props)
  let blurPx = 18;          // 0–40 feels reasonable
  let opacityPct = 18;      // 0–40 (%)  (higher = milkier)
  let saturationPct = 140;  // 100–200 (%)

  onMount(() => {
    if (!browser) return;

    // Ensure your theme selector is actually being exercised
    document.documentElement.dataset.theme = theme;
    document.documentElement.dataset.mode = mode;
  });

  $: if (browser) {
    document.documentElement.dataset.theme = theme;
    document.documentElement.dataset.mode = mode;
  }
</script>

<section
  class="page"
  style={`
    --glass-blur: ${blurPx}px;
    --glass-opacity: ${opacityPct}%;
    --glass-saturation: ${saturationPct}%;
  `}
>
  <header class="controls glass glass--thin">
    <div class="row">
      <label>
        Theme
        <select bind:value={theme}>
          <option value="bigsky">bigsky</option>
          <option value="retrograde">retrograde</option>
        </select>
      </label>

      <label>
        Mode
        <select bind:value={mode}>
          <option value="light">light</option>
          <option value="dark">dark</option>
        </select>
      </label>
    </div>

    <div class="row">
      <label>
        Blur ({blurPx}px)
        <input type="range" min="0" max="40" step="1" bind:value={blurPx} />
      </label>

      <label>
        Opacity ({opacityPct}%)
        <input type="range" min="6" max="40" step="1" bind:value={opacityPct} />
      </label>

      <label>
        Saturation ({saturationPct}%)
        <input type="range" min="100" max="220" step="5" bind:value={saturationPct} />
      </label>
    </div>

    <p class="hint">
      Tip: Glass only “reads” if there’s something behind it. If this looks flat, your background is not
      visible through the panel (or <code>backdrop-filter</code> isn’t supported/active).
    </p>
  </header>

  <main class="grid">
    <article class="glass glass--panel">
      <h2>Glass Panel</h2>
      <p>
        This panel should blur the background and show a subtle tint from your theme’s <code>--color-surface-*</code>.
      </p>

      <div class="kpis">
        <div class="kpi glass glass--thin">
          <div class="kpi__label">Primary</div>
          <div class="kpi__value">--color-primary-500</div>
          <div class="swatch" style="background: var(--color-primary-500-vis);" />
        </div>

        <div class="kpi glass glass--thin">
          <div class="kpi__label">Accent</div>
          <div class="kpi__value">--color-accent-500</div>
          <div class="swatch" style="background: var(--color-accent-500-vis);" />
        </div>

        <div class="kpi glass glass--thin">
          <div class="kpi__label">Surface</div>
          <div class="kpi__value">--color-surface-200</div>
          <div class="swatch" style="background: var(--color-surface-200-vis);" />
        </div>
      </div>

      <div class="form">
        <label>
          Email
          <input placeholder="name@domain.com" />
        </label>

        <label>
          Notes
          <textarea rows="3" placeholder="This should remain readable on glass." />
        </label>

        <div class="actions">
          <button class="btn">Primary action</button>
          <button class="btn btn--ghost">Ghost</button>
        </div>
      </div>
    </article>

    <aside class="glass glass--panel glass--tinted">
      <h2>Tinted Glass</h2>
      <p>
        This uses your <code>--color-primary-*</code> ramp as a tint. You should still see blur + transparency.
      </p>

      <div class="stack">
        <div class="glass glass--thin block">
          <div class="block__title">Thin glass</div>
          <div class="block__sub">Lower opacity / lighter border</div>
        </div>

        <div class="glass glass--strong block">
          <div class="block__title">Strong glass</div>
          <div class="block__sub">Higher opacity / stronger border</div>
        </div>

        <div class="glass glass--thin block">
          <div class="block__title">Focus ring check</div>
          <input class="focus-test" placeholder="Tab into me" />
        </div>
      </div>
    </aside>
  </main>
</section>

<style>
  /* Page framing */
  .page {
    min-height: 100vh;
    padding: 24px;
    color: var(--base-font-color, #111);
    font-family: var(--base-font-family, system-ui);
    background: transparent;
    position: relative;
    overflow: hidden;
  }

  /* Background that makes glass “obvious” */
  .page::before,
  .page::after {
    content: '';
    position: absolute;
    inset: -20%;
    z-index: 0;
    pointer-events: none;
  }

  /* Big soft blobs */
  .page::before {
    background:
      radial-gradient(circle at 20% 20%, var(--color-primary-300-vis, rgba(0, 140, 255, 0.35)) 0%, transparent 50%),
      radial-gradient(circle at 80% 30%, var(--color-accent-300-vis, rgba(255, 140, 0, 0.30)) 0%, transparent 45%),
      radial-gradient(circle at 60% 80%, var(--color-secondary-300-vis, rgba(120, 0, 255, 0.25)) 0%, transparent 55%);
    filter: saturate(1.1);
    opacity: 0.9;
    transform: translateZ(0);
  }

  /* Subtle “noise” using layered gradients (cheap, no assets) */
  .page::after {
    background:
      repeating-linear-gradient(
        0deg,
        rgba(255, 255, 255, 0.05) 0px,
        rgba(255, 255, 255, 0.05) 1px,
        transparent 2px,
        transparent 4px
      ),
      repeating-linear-gradient(
        90deg,
        rgba(0, 0, 0, 0.04) 0px,
        rgba(0, 0, 0, 0.04) 1px,
        transparent 2px,
        transparent 5px
      );
    mix-blend-mode: overlay;
    opacity: 0.25;
  }

  /* Controls bar */
  .controls {
    position: sticky;
    top: 16px;
    z-index: 2;
    padding: 14px 14px 12px;
    margin-bottom: 18px;
  }

  .row {
    display: grid;
    grid-template-columns: repeat(3, minmax(180px, 1fr));
    gap: 12px;
    align-items: end;
    margin-bottom: 10px;
  }
  .row:first-child {
    grid-template-columns: repeat(2, minmax(180px, 220px)) 1fr;
  }

  label {
    display: grid;
    gap: 6px;
    font-size: 13px;
    letter-spacing: 0.01em;
  }

  select,
  input[type='range'],
  input,
  textarea {
    width: 100%;
  }

  select,
  input,
  textarea {
    border-radius: var(--radius-base, 10px);
    border: 1px solid color-mix(in oklab, var(--color-surface-950-vis, #111) 12%, transparent);
    background: color-mix(in oklab, var(--color-surface-50-vis, #fff) 70%, transparent);
    padding: 10px 10px;
    color: inherit;
    outline: none;
  }

  html[data-mode='dark'] .page {
    color: var(--base-font-color-dark, #f4f4f4);
  }

  html[data-mode='dark'] select,
  html[data-mode='dark'] input,
  html[data-mode='dark'] textarea {
    border: 1px solid color-mix(in oklab, var(--color-surface-50-vis, #fff) 16%, transparent);
    background: color-mix(in oklab, var(--color-surface-950-vis, #111) 65%, transparent);
  }

  .hint {
    margin: 0;
    font-size: 12px;
    opacity: 0.8;
  }
  .hint code {
    font-family: var(--type-family-mono, ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', monospace);
    font-size: 11px;
  }

  /* Layout */
  .grid {
    position: relative;
    z-index: 1; /* above background blobs */
    display: grid;
    grid-template-columns: 1.2fr 0.8fr;
    gap: 16px;
    align-items: start;
  }

  @media (max-width: 980px) {
    .grid {
      grid-template-columns: 1fr;
    }
    .row,
    .row:first-child {
      grid-template-columns: 1fr;
    }
  }

  /* ---------
     “GLASS TOKENS” (local test harness)
     These are the only things you need to move into your actual tokens later.
  --------- */

  :global(html[data-mode='light']) .page {
    --glass-tint: var(--color-surface-50-vis, #fff);
    --glass-border-tint: var(--color-surface-950-vis, #111);
  }

  :global(html[data-mode='dark']) .page {
    --glass-tint: var(--color-surface-950-vis, #111);
    --glass-border-tint: var(--color-surface-50-vis, #fff);
  }

  .glass {
  /* read inherited knobs without overriding them */
  --_glass-blur: var(--glass-blur, 18px);
  --_glass-opacity: var(--glass-opacity, 18%);
  --_glass-saturation: var(--glass-saturation, 140%);

  --glass-bg: color-mix(in oklab, var(--glass-tint) var(--_glass-opacity), transparent);
  --glass-border: color-mix(in oklab, var(--glass-border-tint) 14%, transparent);

  background: var(--glass-bg);
  border: 1px solid var(--glass-border);

  backdrop-filter: blur(var(--_glass-blur)) saturate(var(--_glass-saturation));
  -webkit-backdrop-filter: blur(var(--_glass-blur)) saturate(var(--_glass-saturation));
}


  /* Fallback if backdrop-filter isn’t supported */
  @supports not ((backdrop-filter: blur(1px)) or (-webkit-backdrop-filter: blur(1px))) {
    .glass {
      background: color-mix(in oklab, var(--glass-tint) 32%, transparent);
    }
  }

  .glass--panel {
    padding: 18px;
  }

  .glass--thin {
    --glass-opacity: 12%;
    --glass-shadow: 0 10px 24px color-mix(in oklab, var(--glass-border-tint) 14%, transparent);
    padding: 12px;
  }

  .glass--strong {
    --glass-opacity: 26%;
    --glass-border: color-mix(in oklab, var(--glass-border-tint) 20%, transparent);
    --glass-shadow: 0 14px 40px color-mix(in oklab, var(--glass-border-tint) 24%, transparent);
    padding: 12px;
  }

  .glass--tinted {
    /* Tint with primary ramp (still glass) */
    --glass-tint: var(--color-primary-200-vis, #7db7ff);
    --glass-border-tint: var(--color-primary-950-vis, #0a2a55);
  }

  h2 {
    margin: 0 0 8px 0;
    font-size: 16px;
    letter-spacing: 0.01em;
  }

  p {
    margin: 0 0 14px 0;
    opacity: 0.9;
    line-height: 1.4;
    font-size: 13px;
  }

  .kpis {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 10px;
    margin-bottom: 14px;
  }
  @media (max-width: 980px) {
    .kpis {
      grid-template-columns: 1fr;
    }
  }

  .kpi__label {
    font-size: 12px;
    opacity: 0.75;
  }
  .kpi__value {
    font-size: 12px;
    font-family: var(--type-family-mono, ui-monospace, monospace);
    opacity: 0.9;
  }
  .swatch {
    height: 10px;
    border-radius: 999px;
    margin-top: 8px;
    border: 1px solid color-mix(in oklab, var(--glass-border-tint) 14%, transparent);
  }

  .form {
    display: grid;
    gap: 10px;
  }

  .actions {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
    margin-top: 4px;
  }

  .btn {
    border-radius: var(--radius-base, 10px);
    border: 1px solid color-mix(in oklab, var(--glass-border-tint) 18%, transparent);
    background: color-mix(in oklab, var(--color-primary-500-vis, #3b82f6) 22%, transparent);
    padding: 10px 12px;
    color: inherit;
    cursor: pointer;
    backdrop-filter: blur(calc(var(--glass-blur) * 0.6)) saturate(var(--glass-saturation));
    -webkit-backdrop-filter: blur(calc(var(--glass-blur) * 0.6)) saturate(var(--glass-saturation));
  }

  .btn--ghost {
    background: transparent;
  }

  .stack {
    display: grid;
    gap: 10px;
  }

  .block__title {
    font-size: 13px;
    margin-bottom: 2px;
  }
  .block__sub {
    font-size: 12px;
    opacity: 0.8;
  }

  .focus-test:focus {
    outline: none;
    box-shadow:
      0 0 0 2px color-mix(in oklab, var(--color-accent-500-vis, #f59e0b) 55%, transparent),
      0 0 0 6px color-mix(in oklab, var(--glass-border-tint) 10%, transparent);
  }
</style>


