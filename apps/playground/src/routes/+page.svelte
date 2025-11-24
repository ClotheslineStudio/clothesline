<script lang="ts">
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

  const SHADES = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950] as const;

  type Variant = 'base' | 'ct' | 'vis';
  let variant: Variant = 'vis';

  function varFor(role: string, shade: number, v: Variant) {
    const suffix = v === 'base' ? '' : `-${v}`;
    return `--color-${role}-${shade}${suffix}`;
  }

  async function copy(text: string) {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      // ignore
    }
  }

  const gridTemplate = `100px repeat(${SHADES.length}, minmax(96px, 1fr))`;
</script>

<svelte:head>
  <title>Theme Ramp Sanity Check</title>
</svelte:head>

<section class="max-w-[1200px] mx-auto p-6">
  <h1 class="text-2xl font-bold mb-2">Theme Ramp Sanity Check</h1>
  <p class="text-sm opacity-80 mb-6">
    This ignores JS color reading and just paints boxes with
    <code>var(--color-[role]-[shade]{variant === 'base' ? '' : `-${variant}`})</code>.
    If the boxes don’t look like a ramp, the tokens themselves (or this variant) are the issue.
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

  <div class="space-y-8">
    {#each ROLES as role}
      <div>
        <div class="mb-2 flex items-baseline justify-between gap-4">
          <h2 class="text-lg font-semibold capitalize">{role}</h2>
          <span class="text-xs opacity-70">
            Using <code>--color-{role}-[shade]{variant === 'base' ? '' : `-${variant}`}</code>
          </span>
        </div>

        <div class="grid gap-3" style={`grid-template-columns: ${gridTemplate};`}>
          <!-- header row -->
          <div class="text-xs font-medium opacity-70 self-center">Shade</div>
          {#each SHADES as s}
            <div class="text-xs font-medium text-center">{s}</div>
          {/each}

          <!-- swatches row -->
          <div class="text-xs opacity-70 self-center">Swatch</div>
          {#each SHADES as shade}
            {#key `${role}-${shade}-${variant}`}
              <button
                type="button"
                class="rounded border text-center leading-tight p-3 focus:outline-none focus:ring-2"
                style={`
                  background: var(${varFor(role, shade, variant)});
                  color: var(--on-surface, #111);
                  border-color: rgba(0,0,0,.12);
                  min-height: 72px;
                `}
                title={`Click to copy ${varFor(role, shade, variant)}`}
                on:click={() => copy(varFor(role, shade, variant))}
              >
                <div class="text-xs font-semibold mb-1">{shade}</div>
                <div class="text-[10px] font-mono break-all opacity-90">
                  {varFor(role, shade, variant)}
                </div>
              </button>
            {/key}
          {/each}
        </div>
      </div>
    {/each}
  </div>
</section>

<style>
  code {
    font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  }

  button:focus-visible {
    outline: none;
  }
</style>



<div style="
  width: 150px;
  height: 150px;
  background: var(--color-primary-500, hotpink);
">
  PRIMARY 500
</div>

