<script lang="ts">
  import { browser } from '$app/environment';
  import { onMount } from 'svelte';
  import type { RampColors, Role } from '$lib/theme/types';

  let {
    ramps,
    roles,
    steps
  }: {
    ramps: RampColors;
    roles: Role[];
    steps: number[];
  } = $props();

  let scratchEl: HTMLSpanElement | null = null;
  let clientReady = false;

  onMount(() => {
    clientReady = true;
  });

  function ensureScratch(): HTMLSpanElement | null {
    if (!browser) return null;
    if (scratchEl) return scratchEl;
    const el = document.createElement('span');
    el.style.position = 'absolute';
    el.style.left = '-9999px';
    el.style.top = '-9999px';
    el.style.visibility = 'hidden';
    document.body.appendChild(el);
    scratchEl = el;
    return scratchEl;
  }

  function toRgb(color: string): { r: number; g: number; b: number } | null {
    const el = ensureScratch();
    if (!el) return null;
    el.style.color = color;
    const computed = getComputedStyle(el).color;
    const parts = computed.match(/\d+(?:\.\d+)?/g);
    if (!parts || parts.length < 3) return null;
    return { r: Number(parts[0]), g: Number(parts[1]), b: Number(parts[2]) };
  }

  function channelToLinear(value: number): number {
    const normalized = value / 255;
    return normalized <= 0.03928 ? normalized / 12.92 : ((normalized + 0.055) / 1.055) ** 2.4;
  }

  function luminance(color: string): number {
    const rgb = toRgb(color);
    if (!rgb) return 0;
    return 0.2126 * channelToLinear(rgb.r) + 0.7152 * channelToLinear(rgb.g) + 0.0722 * channelToLinear(rgb.b);
  }

  function contrastRatio(foreground: string, background: string): number {
    if (!browser) return 21;
    const fg = luminance(foreground);
    const bg = luminance(background);
    const lighter = Math.max(fg, bg);
    const darker = Math.min(fg, bg);
    return (lighter + 0.05) / (darker + 0.05);
  }

  function textColorForCell(background: string, step: number): string {
    if (!background || background === 'transparent') return '#0f172a';
    if (!clientReady) return step >= 600 ? '#ffffff' : '#0f172a';
    const bgRgb = toRgb(background);
    if (!bgRgb) return step >= 600 ? '#ffffff' : '#0f172a';
    const white = '#ffffff';
    const dark = '#0f172a';
    const whiteContrast = contrastRatio(white, background);
    const darkContrast = contrastRatio(dark, background);
    if (whiteContrast >= 4.5 && whiteContrast >= darkContrast) return white;
    if (darkContrast >= 4.5 && darkContrast >= whiteContrast) return dark;
    return whiteContrast >= darkContrast ? white : dark;
  }
</script>

<div class="surface-card overflow-auto p-3">
  <table class="ramp-grid min-w-[980px]">
    <thead>
      <tr>
        <th>Step</th>
        {#each roles as role}
          <th>{role}</th>
        {/each}
      </tr>
    </thead>
    <tbody>
      {#each steps as step}
        <tr>
          <th>{step}</th>
          {#each roles as role}
            {@const bg = ramps[role]?.[step] ?? 'transparent'}
            {@const fg = textColorForCell(bg, step)}
            <td style={`background:${bg}; color:${fg};`}>{step}</td>
          {/each}
        </tr>
      {/each}
    </tbody>
  </table>
</div>

<style>
  .ramp-grid {
    width: 100%;
    border-collapse: separate;
    border-spacing: 0.45rem;
  }

  th {
    text-align: left;
    font-size: 0.72rem;
    text-transform: uppercase;
    letter-spacing: 0.03em;
    color: var(--on-surface-strong, var(--color-surface-900-vis));
    font-weight: 700;
  }

  td {
    min-width: 85px;
    height: 50px;
    border-radius: 0.6rem;
    border: 1px solid color-mix(in oklab, var(--color-surface-900) 12%, transparent);
    text-align: center;
    font-size: 0.72rem;
    font-weight: 700;
    text-shadow: none;
  }
</style>
