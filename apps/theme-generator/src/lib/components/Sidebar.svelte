<script lang="ts">
  import { browser } from '$app/environment';
  import { ChevronDown, Clothespin, ColorPalette, CrystalBall, Pencil, Refresh, Tag, Trash, TreePalm } from '@clothesline/icons';
  import { Button, ColorPicker, Tooltip } from '@clothesline/ui';
  import Tabs, { type BuilderTab } from '$lib/components/Tabs.svelte';

  import { BUILTIN_ROLES, type RampColors, type Role, type ThemeDraft } from '$lib/theme/types';

  type SidebarSection = 'item' | 'backgrounds' | 'spacing' | 'edges' | 'typography';

  const sections: Array<{ id: SidebarSection; label: string }> = [
    { id: 'item', label: 'Color Palette' },
    { id: 'backgrounds', label: 'Backgrounds' },
    { id: 'spacing', label: 'Spacing' },
    { id: 'edges', label: 'Edges' },
    { id: 'typography', label: 'Typography' }
  ];

  let {
    draft,
    roles,
    selectedRole,
    rampColors,
    onNameChange,
    activeTab,
    onTabChange,
    onRoleSelect,
    onSeedChange,
    onRandomize,
    onAddSeed,
    onRemoveSeed,
    onResetTheme,
    onSectionChange
  }: {
    draft: ThemeDraft;
    roles: Role[];
    selectedRole: Role;
    rampColors: RampColors;
    onNameChange: (value: string) => void;
    activeTab: BuilderTab;
    onTabChange: (tab: BuilderTab) => void;
    onRoleSelect: (role: Role) => void;
    onSeedChange: (field: 'l' | 'c' | 'h', value: number) => void;
    onRandomize: () => void;
    onAddSeed: (roleName: string) => Role | null;
    onRemoveSeed: (role: Role) => boolean;
    onResetTheme: () => void;
    onSectionChange: (
      section: 'backgrounds' | 'spacing' | 'edges' | 'typography',
      key: string,
      value: string
    ) => void;
  } = $props();

  let colorListMode = $state<'short' | 'extended'>('short');
  let pickerRole = $state<Role | null>(null);
  let pickerStep = $state<number | null>(null);
  let pickerValue = $state('');
  let addSeedOpen = $state(false);
  let newRoleName = $state('');

  const shortSteps = [50, 500, 950];
  const visibleSteps = $derived(colorListMode === 'short' ? shortSteps : [...draft.rampSteps].sort((a, b) => a - b));
  const contrastOptions = $derived(
    roles.flatMap((role) =>
      [...draft.rampSteps].sort((a, b) => a - b).map((step) => `${role}-${step}`)
    )
  );
  const lightContrast = $derived(
    draft.backgrounds[`lightContrast:${selectedRole}`] ?? `${selectedRole}-50`
  );
  const darkContrast = $derived(
    draft.backgrounds[`darkContrast:${selectedRole}`] ?? `${selectedRole}-950`
  );
  let lightContrastValue = $state('');
  let darkContrastValue = $state('');

  $effect(() => {
    lightContrastValue = lightContrast;
  });

  $effect(() => {
    darkContrastValue = darkContrast;
  });

  $effect(() => {
    if (pickerRole && draft.seeds[pickerRole]) {
      const seed = draft.seeds[pickerRole];
      const next = `oklch(${seed.l.toFixed(4)} ${seed.c.toFixed(4)} ${seed.h.toFixed(2)})`;
      if (!pickerValue || !pickerValue.startsWith('oklch(')) pickerValue = next;
    }
  });

  $effect(() => {
    if (pickerRole && pickerValue.startsWith('oklch(')) {
      const match = pickerValue.match(/oklch\(\s*([0-9.]+)\s+([0-9.]+)\s+([0-9.]+)/i);
      if (match) {
        const nextL = Number(match[1]);
        const nextC = Number(match[2]);
        const nextH = Number(match[3]);
        const current = draft.seeds[pickerRole];
        const changed = current
          ? Math.abs(current.l - nextL) > 0.0001 ||
            Math.abs(current.c - nextC) > 0.0001 ||
            Math.abs(current.h - nextH) > 0.01
          : false;
        if (current && changed) {
          onRoleSelect(pickerRole);
          onSeedChange('l', nextL);
          onSeedChange('c', nextC);
          onSeedChange('h', nextH);
        }
      }
    }
  });

  function seedColor(role: Role): string {
    const seed = draft.seeds[role];
    if (!seed) return '#6381F8';
    return `oklch(${seed.l.toFixed(4)} ${seed.c.toFixed(4)} ${seed.h.toFixed(2)})`;
  }

  function colorToHex(color: string): string {
    if (!browser) return color;
    const el = document.createElement('span');
    el.style.position = 'absolute';
    el.style.opacity = '0';
    el.style.pointerEvents = 'none';
    el.style.color = color;
    document.body.appendChild(el);
    const resolved = getComputedStyle(el).color;
    document.body.removeChild(el);
    const match = resolved.match(/\d+/g);
    if (!match || match.length < 3) return color;
    const [r, g, b] = match.slice(0, 3).map((n) => Number(n));
    const toHex = (v: number) => v.toString(16).padStart(2, '0');
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase();
  }

  function openPickerForShade(step: number): void {
    pickerRole = selectedRole;
    pickerStep = step;
    pickerValue = seedColor(selectedRole);
  }

  function isBuiltinRole(role: Role): boolean {
    return BUILTIN_ROLES.includes(role as (typeof BUILTIN_ROLES)[number]);
  }

  function selectRole(role: Role): void {
    onRoleSelect(role);
    pickerRole = null;
    pickerStep = null;
    pickerValue = '';
  }

  function handleAddSeed(): void {
    const added = onAddSeed(newRoleName);
    if (!added) return;
    addSeedOpen = false;
    newRoleName = '';
    onRoleSelect(added);
  }

  function removeSelectedSeed(): void {
    if (isBuiltinRole(selectedRole)) return;
    const removed = onRemoveSeed(selectedRole);
    if (removed) {
      pickerRole = null;
      pickerStep = null;
      pickerValue = '';
    }
  }

  function resetTheme(): void {
    onResetTheme();
    pickerRole = null;
    pickerStep = null;
    pickerValue = '';
  }

  function parseRoleStepToken(token: string): { role: string; step: number } | null {
    const match = token.match(/^(.*)-(\d{2,3})$/);
    if (!match) return null;
    return { role: match[1], step: Number(match[2]) };
  }

  function contrastColor(token: string, fallbackStep: number): string {
    const parsed = parseRoleStepToken(token);
    if (parsed) {
      return rampColors[parsed.role]?.[parsed.step] ?? 'transparent';
    }
    return rampColors[selectedRole]?.[fallbackStep] ?? 'transparent';
  }

  function updateLightContrast(value: string): void {
    lightContrastValue = value;
    onSectionChange('backgrounds', `lightContrast:${selectedRole}`, value);
  }

  function updateDarkContrast(value: string): void {
    darkContrastValue = value;
    onSectionChange('backgrounds', `darkContrast:${selectedRole}`, value);
  }
</script>

<div class="customizer-card">
  <Tabs active={activeTab} onChange={onTabChange} />

  <label class="block text-xs font-semibold text-(--text-muted,var(--on-surface-muted))" for="theme-name">Theme Name</label>
  <input
    id="theme-name"
    class="mt-1 w-full rounded-md border border-(--border-default-color,var(--color-surface-300)) bg-(--background-elevation-2,var(--color-surface-100)) px-3 py-2 text-sm"
    type="text"
    value={draft.name}
    oninput={(event) => onNameChange((event.currentTarget as HTMLInputElement).value)}
  />

  <div class="mt-4 grid gap-2">
    {#each sections as section}
      <details class="section-item" open={section.id === 'item'}>
        <summary>
          <span class="summary-leading">
            {#if section.id === 'item'}
              <ColorPalette size={18} />
            {:else if section.id === 'backgrounds'}
              <CrystalBall size={18} />
            {:else if section.id === 'spacing'}
              <Tag size={18} />
            {:else if section.id === 'edges'}
              <TreePalm size={18} />
            {:else if section.id === 'typography'}
              <Clothespin size={18} />
            {/if}
            <span>{section.label}</span>
          </span>
          <span class="summary-chevron" aria-hidden="true">
            <ChevronDown size={16} />
          </span>
        </summary>
        {#if section.id === 'item'}
          <div class="mt-3 grid gap-3">
            <p class="panel-description">Define a palette per each available theme color.</p>

            <div class="panel-actions">
              <Button type="button" size="sm" variant="outline" color="neutral" onclick={resetTheme}><Refresh size={16} />Reset</Button>
              <Button type="button" size="sm" variant="outline" color="neutral" onclick={onRandomize}>Random</Button>
              <Button type="button" size="sm" variant="outline" color="neutral" onclick={() => (addSeedOpen = !addSeedOpen)}>Add seed</Button>
            </div>

            {#if addSeedOpen}
              <div class="add-seed-row">
                <input type="text" placeholder="role-name" bind:value={newRoleName} />
                <Button type="button" size="sm" variant="solid" color="primary" onclick={handleAddSeed}>Create</Button>
              </div>
            {/if}

            <div class="role-strip">
              {#each roles as role}
                <button
                  type="button"
                  class="role-swatch"
                  class:role-swatch--active={role === selectedRole}
                  style={`--role-color:${seedColor(role)};`}
                  onclick={() => selectRole(role)}
                  title={role}
                >
                  <span class="sr-only">{role}</span>
                </button>
              {/each}
            </div>

            <div class="role-row">
              <h4 class="role-title">{selectedRole}</h4>
              <div class="role-actions">
                <Button type="button" size="sm" variant="outline" color="neutral" onclick={onRandomize}>Random</Button>
                {#if !isBuiltinRole(selectedRole)}
                  <Button type="button" size="sm" variant="outline" color="error" onclick={removeSelectedSeed}><Trash size={12} />Remove</Button>
                {/if}
              </div>
            </div>

            <p class="panel-description">Shades automatically blend between 50/500/950.</p>

            <div class="grid grid-cols-2 gap-2">
              <Button type="button" size="sm" variant={colorListMode === 'short' ? 'solid' : 'outline'} color={colorListMode === 'short' ? 'primary' : 'neutral'} onclick={() => (colorListMode = 'short')}>Short</Button>
              <Button type="button" size="sm" variant={colorListMode === 'extended' ? 'solid' : 'outline'} color={colorListMode === 'extended' ? 'primary' : 'neutral'} onclick={() => (colorListMode = 'extended')}>Extended</Button>
            </div>

            <div class="color-list">
              {#each visibleSteps as step}
                <div class="color-row">
                  <div class="step">{step}</div>
                  <input class="hex" value={colorToHex(rampColors[selectedRole]?.[step] ?? '#000000')} readonly />
                  <Tooltip text={`Edit ${selectedRole} seed`} position="left">
                    <button
                      type="button"
                      class="shade-swatch"
                      style={`--shade-color:${rampColors[selectedRole]?.[step] ?? 'transparent'};`}
                      onclick={() => openPickerForShade(step)}
                      aria-label={`Edit ${selectedRole} from ${step} shade`}
                    >
                      <span class="shade-swatch__paint"></span>
                      <span class="shade-swatch__edit"><Pencil size={12} /></span>
                    </button>
                  </Tooltip>
                </div>
              {/each}
            </div>

            <div class="contrast-grid">
              <div class="contrast-col">
                <div class="contrast-label">Light Contrast</div>
                <div class="contrast-bar" style={`background:${contrastColor(lightContrastValue || lightContrast, 50)};`}></div>
                <select
                  value={lightContrastValue || lightContrast}
                  oninput={(event) => updateLightContrast((event.currentTarget as HTMLSelectElement).value)}
                >
                  {#each contrastOptions as option}
                    <option value={option}>{option}</option>
                  {/each}
                </select>
              </div>
              <div class="contrast-col">
                <div class="contrast-label">Dark Contrast</div>
                <div class="contrast-bar" style={`background:${contrastColor(darkContrastValue || darkContrast, 950)};`}></div>
                <select
                  value={darkContrastValue || darkContrast}
                  oninput={(event) => updateDarkContrast((event.currentTarget as HTMLSelectElement).value)}
                >
                  {#each contrastOptions as option}
                    <option value={option}>{option}</option>
                  {/each}
                </select>
              </div>
            </div>

            {#if pickerRole}
              <div class="picker-popover">
                <div class="picker-popover__title">{pickerRole} seed {pickerStep ? `(${pickerStep})` : ''}</div>
                <ColorPicker label={`${pickerRole} seed`} bind:value={pickerValue} embedded={true} />
              </div>
            {/if}
          </div>
        {:else if section.id === 'backgrounds'}
          <div class="stub-grid mt-3">
            <div class="stub-label">Body Background</div>
            <select value={draft.backgrounds.bodyLight ?? 'surface-100'} oninput={(event) => onSectionChange('backgrounds', 'bodyLight', (event.currentTarget as HTMLSelectElement).value)}>
              <option>surface-50</option><option>surface-100</option><option>surface-200</option><option>surface-300</option>
            </select>
            <div class="stub-label">Panel Background</div>
            <select value={draft.backgrounds.panelLight ?? 'surface-50'} oninput={(event) => onSectionChange('backgrounds', 'panelLight', (event.currentTarget as HTMLSelectElement).value)}>
              <option>surface-50</option><option>surface-100</option><option>surface-200</option><option>surface-300</option>
            </select>
            <div class="stub-label">Body Background (Dark)</div>
            <select value={draft.backgrounds.bodyDark ?? 'surface-950'} oninput={(event) => onSectionChange('backgrounds', 'bodyDark', (event.currentTarget as HTMLSelectElement).value)}>
              <option>surface-800</option><option>surface-900</option><option>surface-950</option>
            </select>
            <div class="stub-label">Panel Background (Dark)</div>
            <select value={draft.backgrounds.panelDark ?? 'surface-900'} oninput={(event) => onSectionChange('backgrounds', 'panelDark', (event.currentTarget as HTMLSelectElement).value)}>
              <option>surface-800</option><option>surface-900</option><option>surface-950</option>
            </select>
          </div>
        {:else if section.id === 'spacing'}
          <div class="stub-grid mt-3">
            <div class="stub-label">Scale</div>
            <div class="grid grid-cols-3 gap-2">
              <Button type="button" size="sm" variant={(draft.spacing.scale ?? 'base') === 'tight' ? 'solid' : 'outline'} color={(draft.spacing.scale ?? 'base') === 'tight' ? 'primary' : 'neutral'} onclick={() => onSectionChange('spacing', 'scale', 'tight')}>Tight</Button>
              <Button type="button" size="sm" variant={(draft.spacing.scale ?? 'base') === 'base' ? 'solid' : 'outline'} color={(draft.spacing.scale ?? 'base') === 'base' ? 'primary' : 'neutral'} onclick={() => onSectionChange('spacing', 'scale', 'base')}>Base</Button>
              <Button type="button" size="sm" variant={(draft.spacing.scale ?? 'base') === 'loose' ? 'solid' : 'outline'} color={(draft.spacing.scale ?? 'base') === 'loose' ? 'primary' : 'neutral'} onclick={() => onSectionChange('spacing', 'scale', 'loose')}>Loose</Button>
            </div>
          </div>
        {:else if section.id === 'edges'}
          <div class="stub-grid mt-3">
            <div class="stub-label">Border Radius</div>
            <input type="range" min="0" max="24" step="1" value={draft.edges.radiusBase ?? '10'} oninput={(event) => onSectionChange('edges', 'radiusBase', (event.currentTarget as HTMLInputElement).value)} class="custom-range" />
            <div class="stub-label">Ring Width</div>
            <input type="range" min="0" max="6" step="1" value={draft.edges.ringWidth ?? '2'} oninput={(event) => onSectionChange('edges', 'ringWidth', (event.currentTarget as HTMLInputElement).value)} class="custom-range" />
          </div>
        {:else}
          <div class="stub-grid mt-3">
            <div class="stub-label">Type Scale</div>
            <select value={draft.typography.scale ?? '1.25'} oninput={(event) => onSectionChange('typography', 'scale', (event.currentTarget as HTMLSelectElement).value)}>
              <option value="1.20">1.20 Minor Third</option><option value="1.25">1.25 Major Third</option><option value="1.333">1.333 Perfect Fourth</option><option value="1.414">1.414 Augmented Fourth</option>
            </select>
            <div class="stub-label">Font Family</div>
            <select value={draft.typography.fontFamily ?? 'system-ui, sans-serif'} oninput={(event) => onSectionChange('typography', 'fontFamily', (event.currentTarget as HTMLSelectElement).value)}>
              <option value="system-ui, sans-serif">system-ui, sans-serif</option><option value="Inter, sans-serif">Inter, sans-serif</option><option value="ui-monospace, monospace">ui-monospace, monospace</option>
            </select>
          </div>
        {/if}
      </details>
    {/each}
  </div>
</div>

<style>
  .customizer-card {
    border: 1px solid color-mix(in oklab, var(--on-surface) 16%, transparent);
    border-radius: calc(var(--radius-container, 0.875rem) + 0.1rem);
    background:
      linear-gradient(
        180deg,
        color-mix(in oklab, var(--background-panel, var(--color-surface-100-vis)) 92%, transparent),
        color-mix(in oklab, var(--background-panel, var(--color-surface-100-vis)) 84%, transparent)
      );
    padding: var(--spacing-4, 1rem);
    box-shadow:
      inset 0 1px 0 color-mix(in oklab, white 38%, transparent),
      0 12px 24px color-mix(in oklab, var(--on-surface) 8%, transparent);
  }

  .customizer-card :global(.tabs) {
    margin-bottom: 1rem;
  }

  .section-item {
    border: 1px solid color-mix(in oklab, var(--on-surface) 14%, transparent);
    border-radius: 0.8rem;
    padding: 0.62rem 0.75rem;
    background: color-mix(in oklab, var(--background-elevation-2, var(--color-surface-100)) 92%, transparent);
    transition: border-color 140ms ease, box-shadow 140ms ease, background 140ms ease;
  }

  .section-item[open] {
    border-color: color-mix(in oklab, var(--primary, var(--color-primary-500-vis)) 24%, var(--on-surface) 8%);
    box-shadow: 0 6px 14px color-mix(in oklab, var(--on-surface) 8%, transparent);
  }

  summary {
    cursor: pointer;
    list-style: none;
    font-size: 0.92rem;
    font-weight: 700;
    color: var(--on-surface, var(--color-surface-900));
    display: flex;
    align-items: center;
    gap: 0.45rem;
    justify-content: space-between;
  }

  summary::-webkit-details-marker { display: none; }

  .summary-leading {
    display: inline-flex;
    align-items: center;
    gap: 0.45rem;
  }

  .summary-chevron {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    opacity: 0.72;
    transform: rotate(0deg);
    transition: transform 140ms ease, opacity 140ms ease;
  }

  .section-item[open] .summary-chevron {
    transform: rotate(180deg);
    opacity: 0.95;
  }

  .panel-description {
    margin: 0;
    font-size: 0.8rem;
    color: var(--text-muted, var(--on-surface-muted));
    line-height: 1.38;
  }

  .panel-actions {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 0.45rem;
  }

  .add-seed-row {
    display: grid;
    grid-template-columns: 1fr auto;
    gap: 0.4rem;
  }

  .add-seed-row input {
    border: 1px solid color-mix(in oklab, var(--on-surface) 16%, transparent);
    border-radius: 0.62rem;
    background: color-mix(in oklab, var(--on-surface) 4%, transparent);
    padding: 0.42rem 0.55rem;
    font-size: 0.82rem;
    color: var(--on-surface, var(--color-surface-900));
  }

  .role-strip {
    display: grid;
    grid-template-columns: repeat(7, minmax(0, 1fr));
    gap: 0.38rem;
  }

  .role-swatch {
    width: 100%;
    height: 2.2rem;
    border: 1px solid color-mix(in oklab, var(--on-surface) 18%, transparent);
    border-radius: 0.45rem;
    background: var(--role-color);
    position: relative;
    transition: transform 120ms ease, box-shadow 120ms ease, border-color 120ms ease;
  }

  .role-swatch:hover {
    transform: translateY(-1px);
    border-color: color-mix(in oklab, var(--role-color) 42%, var(--on-surface) 15%);
    box-shadow: 0 4px 10px color-mix(in oklab, var(--role-color) 26%, transparent);
  }

  .role-swatch:focus-visible {
    outline: 2px solid color-mix(in oklab, var(--role-color) 72%, white);
    outline-offset: 1px;
  }

  .role-swatch--active {
    outline: 2px solid color-mix(in oklab, var(--role-color) 65%, white);
    outline-offset: 1px;
  }

  .role-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.5rem;
  }

  .role-title {
    margin: 0;
    font-size: 1.05rem;
    font-weight: 700;
    text-transform: capitalize;
  }

  .role-actions {
    display: flex;
    gap: 0.35rem;
  }

  .color-list {
    display: grid;
    gap: 0.35rem;
  }

  .color-row {
    display: grid;
    grid-template-columns: 2rem minmax(0, 1fr) 2rem;
    align-items: center;
    gap: 0.42rem;
    padding-block: 0.15rem;
    border-bottom: 1px solid color-mix(in oklab, var(--on-surface) 8%, transparent);
  }

  .step {
    font-size: 0.78rem;
    color: var(--text-muted, var(--on-surface-muted));
  }

  .hex {
    border: 1px solid color-mix(in oklab, var(--on-surface) 16%, transparent);
    border-radius: 0.5rem;
    background: color-mix(in oklab, var(--on-surface) 4%, transparent);
    padding: 0.36rem 0.5rem;
    font-size: 0.95rem;
    color: var(--on-surface, var(--color-surface-900));
  }

  .shade-swatch {
    position: relative;
    width: 1.85rem;
    height: 1.85rem;
    border-radius: 0.42rem;
    border: 1px solid color-mix(in oklab, var(--on-surface) 14%, transparent);
    overflow: hidden;
    padding: 0;
    background: transparent;
    transition: transform 120ms ease, box-shadow 120ms ease;
  }

  .shade-swatch__paint {
    position: absolute;
    inset: 0;
    background: var(--shade-color);
  }

  .shade-swatch__edit {
    position: absolute;
    inset: 0;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background: color-mix(in oklab, black 24%, transparent);
    color: white;
    opacity: 0;
    transition: opacity 120ms ease;
  }

  .shade-swatch:hover .shade-swatch__edit {
    opacity: 1;
  }

  .shade-swatch:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 10px color-mix(in oklab, var(--shade-color) 30%, transparent);
  }

  .picker-popover {
    border: 1px solid color-mix(in oklab, var(--on-surface) 14%, transparent);
    border-radius: var(--radius-card, 0.75rem);
    padding: 0.45rem;
    background: color-mix(in oklab, var(--background-panel, var(--color-surface-50-vis)) 94%, transparent);
  }

  .contrast-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.65rem;
  }

  .contrast-col {
    display: grid;
    gap: 0.35rem;
  }

  .contrast-label {
    font-size: 0.8rem;
    font-weight: 700;
    color: var(--on-surface, var(--color-surface-900));
  }

  .contrast-bar {
    height: 0.7rem;
    border-radius: 999px;
    border: 1px solid color-mix(in oklab, var(--on-surface) 12%, transparent);
  }

  .picker-popover__title {
    font-size: 0.76rem;
    font-weight: 700;
    color: var(--text-muted, var(--on-surface-muted));
    text-transform: uppercase;
    margin-bottom: 0.35rem;
  }

  .stub-grid {
    display: grid;
    gap: 0.6rem;
  }

  .stub-label {
    font-size: 0.74rem;
    font-weight: 700;
    text-transform: uppercase;
    color: var(--text-muted, var(--on-surface-muted));
    letter-spacing: 0.02em;
  }

  select {
    border: 1px solid color-mix(in oklab, var(--on-surface) 16%, transparent);
    border-radius: 0.55rem;
    background: color-mix(in oklab, var(--on-surface) 4%, transparent);
    color: var(--on-surface, var(--color-surface-900));
    font-size: 0.8rem;
    padding: 0.45rem 0.5rem;
  }

  .custom-range {
    appearance: none;
    -webkit-appearance: none;
    height: 0.58rem;
    border-radius: 999px;
    background: transparent;
    border: 0;
    outline: none;
    width: 100%;
  }

  .custom-range::-webkit-slider-runnable-track {
    height: 0.58rem;
    border-radius: 999px;
    background-color: var(--customizer-range-track, var(--color-surface-300-vis, #c9ced8));
    border: 0;
  }

  .custom-range::-webkit-slider-thumb {
    appearance: none;
    -webkit-appearance: none;
    width: 1.1rem;
    height: 1.1rem;
    border-radius: 999px;
    border: 2px solid var(--background-panel, #f8f9ff);
    background: var(--primary, var(--color-primary-600-vis, #6381f8));
    margin-top: calc((0.58rem - 1.1rem) / 2);
  }

  .custom-range::-moz-range-track {
    height: 0.58rem;
    border-radius: 999px;
    background-color: var(--customizer-range-track, var(--color-surface-300-vis, #c9ced8));
    border: 0;
  }

  .custom-range::-moz-range-thumb {
    width: 1.1rem;
    height: 1.1rem;
    border-radius: 999px;
    border: 2px solid var(--background-panel, #f8f9ff);
    background: var(--primary, var(--color-primary-600-vis, #6381f8));
  }
</style>
