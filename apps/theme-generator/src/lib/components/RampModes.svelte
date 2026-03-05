<script lang="ts">
  import { browser } from '$app/environment';
  import { ColorPalette } from '@clothesline/icons';

  import type { RampColors, Role } from '$lib/theme/types';

  let {
    ramps,
    roles,
    backgrounds
  }: {
    ramps: RampColors;
    roles: Role[];
    backgrounds: Record<string, string>;
  } = $props();

  const filledSteps = [100, 200, 300, 400, 500, 600, 700, 800, 900];
  const tonalRoles = $derived(roles.slice(0, Math.min(roles.length, 9)));
  const primaryRole = $derived(roles[0] ?? 'primary');

  let scratchEl: HTMLSpanElement | null = null;

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

  function filledIconColor(step: number): string {
    const bg = ramps[primaryRole]?.[step] ?? 'transparent';
    return contrastRatio('#ffffff', bg) >= contrastRatio('#0f172a', bg) ? '#ffffff' : '#0f172a';
  }

  function tonalBg(role: string): string {
    return ramps[role]?.[500] ?? ramps[role]?.[600] ?? 'transparent';
  }

  function parseRoleStep(token: string): { role: string; step: number } | null {
    const cleaned = token.trim().toLowerCase();
    const roleStep = cleaned.match(/^(.*)-(\d{2,3})$/);
    if (!roleStep) return null;
    return { role: roleStep[1], step: Number(roleStep[2]) };
  }

  function tonalIconForRole(role: string): { color: string; token: string } {
    const roleToken = backgrounds[`lightContrast:${role}`] ?? `${role}-50`;
    const parsed = parseRoleStep(roleToken);
    if (parsed) {
      const color = ramps[parsed.role]?.[parsed.step];
      if (color) return { color, token: `${parsed.role}-${parsed.step}` };
    }

    const fallback = `${role}-50`;
    return {
      color: ramps[role]?.[50] ?? ramps.neutral?.[50] ?? '#ffffff',
      token: fallback
    };
  }

</script>

<section class="surface-card p-4 ramps-modes">
  <h3 class="m-0 text-sm font-semibold">Ramp Modes</h3>

  <div class="mode-block mt-3">
    <div class="mode-title">Filled</div>
    <div class="circle-row">
      {#each filledSteps as step}
        {@const chipBg = ramps[primaryRole]?.[step] ?? 'transparent'}
        {@const iconColor = filledIconColor(step)}
        <button
          type="button"
          class="chip filled"
          style={`background:${chipBg}; color:${iconColor};`}
          title={`${primaryRole}-${step}`}
        >
          <ColorPalette size={16} />
        </button>
      {/each}
    </div>
  </div>

  <div class="mode-block mt-3">
    <div class="mode-title">Outlined</div>
    <div class="circle-row">
      {#each filledSteps as step}
        {@const outlineColor = ramps[primaryRole]?.[step] ?? 'inherit'}
        <button
          type="button"
          class="chip outlined"
          style={`border-color:${outlineColor}; color:${outlineColor};`}
          title={`outline-${primaryRole}-${step}`}
        >
          <ColorPalette size={16} />
        </button>
      {/each}
    </div>
  </div>

  <div class="mode-block mt-3">
    <div class="mode-title">Tonal</div>
    <div class="circle-row">
      {#each tonalRoles as role}
        {@const tonalColor = tonalBg(role)}
        {@const tonalIcon = tonalIconForRole(role)}
        {@const iconColor = tonalIcon.color}
        <button
          type="button"
          class="chip filled"
          style={`background:${tonalColor}; color:${iconColor};`}
          title={`${tonalIcon.token}: ${iconColor} on ${role}-500: ${tonalColor}`}
        >
          <ColorPalette size={16} primaryColor={iconColor} />
        </button>
      {/each}
    </div>
  </div>
</section>

<style>
  .ramps-modes {
    display: grid;
    gap: 0.25rem;
  }

  .mode-title {
    font-size: 0.8rem;
    font-weight: 700;
    color: var(--text-muted, var(--on-surface-muted));
    margin-bottom: 0.55rem;
  }

  .circle-row {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
  }

  .chip {
    width: 4.6rem;
    height: 4.6rem;
    border-radius: 9999px;
    border: 1px solid transparent;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    position: relative;
  }

  .chip :global(svg) {
    width: 1.8rem;
    height: 1.8rem;
  }

  .outlined {
    background: transparent;
    border-width: 2px;
  }

</style>
