<script lang="ts">
  import { onMount } from 'svelte';
  import { browser } from '$app/environment';

  // Roles & shades emitted by your theme build
  const ROLES = [
    'primary',
    'secondary',
    'tertiary',
    'accent',
    'success',
    'warning',
    'error',
    'info',
    'neutral',
    'surface'
  ] as const;

  const SHADES = [50,100,200,300,400,500,600,700,800,900,950] as const;

  type Variant = 'base' | 'ct' | 'vis';
  let variant: Variant = 'vis';

  type RGB = [number, number, number];

  let rows: Array<{
    role: string;
    swatches: Array<{shade:number; varName:string; css:string; hex:string; text:'white'|'black'; cr:number;}>;
  }> = [];

  function resolveVarToRGB(varName: string): RGB {
    if (!browser) return [0, 0, 0]; // SSR safety
    const el = document.createElement('div');
    el.style.color = `var(${varName})`;
    document.body.appendChild(el);
    const rgb = getComputedStyle(el).color;
    document.body.removeChild(el);
    const m = rgb.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/i);
    return m ? [Number(m[1]), Number(m[2]), Number(m[3])] : [0, 0, 0];
  }

  // sRGB helpers → luminance/contrast
  const toLin = (c:number) => {
    const x=c/255;
    return x<=0.04045 ? x/12.92 : Math.pow((x+0.055)/1.055, 2.4);
  };
  const luminance = ([r,g,b]:RGB) => 0.2126*toLin(r)+0.7152*toLin(g)+0.0722*toLin(b);
  function contrastRatio(fg:RGB, bg:RGB) {
    const L1 = luminance(fg), L2 = luminance(bg);
    const [hi, lo] = L1 >= L2 ? [L1, L2] : [L2, L1];
    return (hi + 0.05) / (lo + 0.05);
  }
  const rgbToHex = ([r,g,b]:RGB) =>
    '#' + [r,g,b].map(v => v.toString(16).padStart(2,'0')).join('');

  function varFor(role: string, shade: number) {
    const suffix = variant === 'base' ? '' : `-${variant}`;
    return `--color-${role}-${shade}${suffix}`;
  }

  function build() {
    if (!browser) return;
    rows = ROLES.map(role => {
      const swatches = SHADES.map(shade => {
        const varName = varFor(role, shade);
        const bg = resolveVarToRGB(varName);
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

  // Run on client + react to <html data-*> changes
  onMount(() => {
    build();
    const obs = new MutationObserver(build);
    obs.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme','data-mode','data-vision','data-contrast']
    });
    return () => obs.disconnect();
  });

  // Rebuild when toggling base/ct/vis
  $: if (browser && variant) build();
</script>



<svelte:head>
  <title>Theme Ramp Explorer</title>
</svelte:head>

<section class="max-w-[1200px] mx-auto p-6">
  <h1 class="text-2xl font-bold mb-2">Theme Ramp Explorer</h1>
  <p class="text-sm text-[var(--text-muted, var(--color-surface-700))] mb-6">
    Use the header to change theme / mode / vision / contrast. Toggle which value to preview:
  </p>

  <!-- Variant toggle -->
  <div class="mb-6 flex items-center gap-3 text-sm">
    <label class="font-semibold" for="variant-vis">Value:</label>
    <label class="inline-flex items-center gap-2">
      <input id="variant-vis" type="radio" name="v" value="vis" bind:group={variant}> <span>-vis (vision-aware)</span>
    </label>
    <label class="inline-flex items-center gap-2">
      <input type="radio" name="v" value="ct" bind:group={variant}> <span>-ct (contrast-adjusted)</span>
    </label>
    <label class="inline-flex items-center gap-2">
      <input type="radio" name="v" value="base" bind:group={variant}> <span>base (raw ramp)</span>
    </label>
  </div>

  <!-- Swatch grid -->
  <div class="space-y-8">
    {#each rows as row}
      <div>
        <div class="mb-2 flex items-baseline justify-between">
          <h2 class="text-lg font-semibold capitalize">{row.role}</h2>
          <span class="text-xs opacity-70">showing: <code>--color-{row.role}-[shade]{variant === 'base' ? '' : `-${variant}`}</code></span>
        </div>

        <div class="grid gap-3"
             style="grid-template-columns: 100px repeat({SHADES.length}, minmax(90px, 1fr));">
          <!-- header row -->
          <div class="text-xs font-medium opacity-70">Shade</div>
          {#each SHADES as s}
            <div class="text-xs font-medium text-center">{s}</div>
          {/each}

          <!-- swatches row -->
          <div class="text-xs opacity-70 self-center">Swatch</div>
          {#each row.swatches as s}
            <div class="rounded border border-[var(--border-default-color)] p-3 text-center"
                 style="background: {s.css}; color: {s.text === 'white' ? 'white' : 'black'}">
              <div class="text-sm font-semibold">{row.role}</div>
              <div class="text-[10px] opacity-80">{s.hex}</div>
              <div class="text-[10px] opacity-80">CR {s.cr} ({s.text})</div>
            </div>
          {/each}

          <!-- var names row -->
          <div class="text-xs opacity-70 self-center">Var</div>
          {#each row.swatches as s}
            <div class="text-[10px] font-mono text-center break-all opacity-80">{s.varName}</div>
          {/each}
        </div>
      </div>
    {/each}
  </div>
</section>

<style>
  code { font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace; }
</style>




