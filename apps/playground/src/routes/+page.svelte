<script lang="ts">
  import { onMount } from 'svelte';
  import { browser } from '$app/environment';

  const ROLES = [
    'primary','secondary','tertiary',
    'accent','success','warning','error','info',
    'neutral','surface'
  ] as const;

  const SHADES = [50,100,200,300,400,500,600,700,800,900,950] as const;

  type Variant = 'base' | 'ct' | 'vis';
  let variant: Variant = 'vis';

  type RGB = [number, number, number];

  let rows: Array<{
    role: string;
    swatches: Array<{
      shade: number;
      varName: string;
      css: string;
      hex: string;
      text: 'white'|'black';
      cr: number;
    }>;
  }> = [];

  // ----- Helpers ----------------------------------------------------
  const toLin = (c:number) => {
    const x = c/255;
    return x <= 0.04045 ? x/12.92 : Math.pow((x+0.055)/1.055, 2.4);
  };
  const luminance = ([r,g,b]:RGB) => 0.2126*toLin(r)+0.7152*toLin(g)+0.0722*toLin(b);
  function contrastRatio(fg:RGB, bg:RGB) {
    const L1 = luminance(fg), L2 = luminance(bg);
    const [hi, lo] = L1 >= L2 ? [L1, L2] : [L2, L1];
    return (hi + 0.05) / (lo + 0.05);
  }
  const rgbToHex = ([r,g,b]:RGB) =>
    '#' + [r,g,b].map(v => Math.round(v).toString(16).padStart(2,'0')).join('').toUpperCase();

  function varFor(role: string, shade: number, v: Variant) {
    const suffix = v === 'base' ? '' : `-${v}`;
    return `--color-${role}-${shade}${suffix}`;
  }

  // Single hidden probe element (perf)
  let probe: HTMLDivElement | null = null;

  function ensureProbe() {
    if (!browser) return null;
    if (!probe) {
      probe = document.createElement('div');
      probe.style.position = 'fixed';
      probe.style.left = '-9999px';
      probe.style.top = '-9999px';
      probe.style.width = '1px';
      probe.style.height = '1px';
      document.body.appendChild(probe);
    }
    return probe;
  }

  function readVarRGB(varName: string): RGB {
    const p = ensureProbe();
    if (!p) return [0,0,0];
    p.style.color = `var(${varName})`;
    const rgb = getComputedStyle(p).color; // rgb(a)
    const m = rgb.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/i);
    return m ? [Number(m[1]), Number(m[2]), Number(m[3])] : [0,0,0];
  }

  function build() {
    if (!browser) return;
    rows = ROLES.map(role => {
      const swatches = SHADES.map(shade => {
        const varName = varFor(role, shade, variant);
        const bg = readVarRGB(varName);

        const CRw = contrastRatio([255,255,255], bg);
        const CRb = contrastRatio([0,0,0], bg);
        const useWhite = CRw >= CRb;
        const text: 'white'|'black' = useWhite ? 'white' : 'black';
        const cr = Number((useWhite ? CRw : CRb).toFixed(2));

        return {
          shade,
          varName,
          css: `var(${varName})`,
          hex: rgbToHex(bg),
          text,
          cr
        };
      });
      return { role, swatches };
    });
  }

  // Recompute on mount & when theme attrs or variant change
  onMount(() => {
    build();
    const obs = new MutationObserver(() => {
      // batch updates, avoid thrash
      requestAnimationFrame(build);
    });
    obs.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme','data-mode','data-vision','data-contrast','style']
    });
    return () => obs.disconnect();
  });

  $: if (browser && variant) build();

  // UI sugar: click-to-copy
  async function copy(text: string) {
    try { await navigator.clipboard.writeText(text); } catch {}
  }

  const gridTemplate = `100px repeat(${SHADES.length}, minmax(96px, 1fr))`;
</script>

<svelte:head>
  <title>Theme Ramp Explorer</title>
</svelte:head>

<section class="max-w-[1200px] mx-auto p-6">
  <h1 class="text-2xl font-bold mb-2">Theme Ramp Explorer</h1>
  <p class="text-sm opacity-80 mb-6">
    Toggle preview value. <code>-vis</code> usually aliases <code>-ct</code> unless you changed it in the build.
  </p>

  <!-- Variant toggle -->
  <div class="mb-6 flex flex-wrap items-center gap-3 text-sm">
    <label class="font-semibold" for="v-vis">Value:</label>
    <label class="inline-flex items-center gap-2">
      <input type="radio" name="v" value="vis" bind:group={variant} id="v-vis" />
      <span>-vis (vision-aware)</span>
    </label>
    <label class="inline-flex items-center gap-2">
      <input type="radio" name="v" value="ct" bind:group={variant} id="v-ct" />
      <span>-ct (contrast-mixed)</span>
    </label>
    <label class="inline-flex items-center gap-2">
      <input type="radio" name="v" value="base" bind:group={variant} id="v-base" />
      <span>base (raw ramp)</span>
    </label>
  </div>

  <!-- Swatch grid -->
  <div class="space-y-8">
    {#each rows as row}
      <div>
        <div class="mb-2 flex items-baseline justify-between gap-4">
          <h2 class="text-lg font-semibold capitalize">{row.role}</h2>
          <span class="text-xs opacity-70">
            Showing: <code>--color-{row.role}-[shade]{variant === 'base' ? '' : `-${variant}`}</code>
          </span>
        </div>

        <div class="grid gap-3" style="grid-template-columns: {gridTemplate}">
          <!-- header row -->
          <div class="text-xs font-medium opacity-70 self-center">Shade</div>
          {#each SHADES as s}
            <div class="text-xs font-medium text-center">{s}</div>
          {/each}

          <!-- swatches row -->
          <div class="text-xs opacity-70 self-center">Swatch</div>
          {#each row.swatches as s}
            <button
              type="button"
              class="rounded border text-center leading-tight p-3 focus:outline-none focus:ring-2"
              style="
                background: {s.css};
                color: {s.text === 'white' ? 'white' : 'black'};
                border-color: var(--border-default-color, rgba(0,0,0,.12));
              "
              title="Click to copy HEX"
              on:click={() => copy(s.hex)}
            >
              <div class="text-sm font-semibold">{row.role}</div>
              <div class="text-[10px] opacity-80">{s.hex}</div>
              <div class="text-[10px] opacity-80">CR {s.cr} ({s.text})</div>
            </button>
          {/each}

          <!-- var names row -->
          <div class="text-xs opacity-70 self-center">Var</div>
          {#each row.swatches as s}
            <button
              type="button"
              class="text-[10px] font-mono text-center break-all opacity-80 px-2 py-1 rounded hover:bg-[rgba(0,0,0,.05)]"
              on:click={() => copy(s.varName)}
              title="Click to copy var"
            >
              {s.varName}
            </button>
          {/each}
        </div>
      </div>
    {/each}
  </div>
</section>

<style>
  code { font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace; }
  /* optional nicer focus */
  button:focus-visible { outline: none; }
</style>




