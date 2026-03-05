<script lang="ts">
  import { browser } from '$app/environment';
  import { onDestroy } from 'svelte';
  import { Button, Checkbox, Tooltip } from '@clothesline/ui';

  import AccessibilitySummary from '$lib/components/AccessibilitySummary.svelte';
  import CodeBlock from '$lib/components/CodeBlock.svelte';
  import RampGrid from '$lib/components/RampGrid.svelte';
  import RampModes from '$lib/components/RampModes.svelte';
  import Sidebar from '$lib/components/Sidebar.svelte';
  import { type BuilderTab } from '$lib/components/Tabs.svelte';
  import ThemePreviewShowcase from '$lib/components/ThemePreviewShowcase.svelte';
  import Toast from '$lib/components/Toast.svelte';
  import {
    addSeedRole,
    removeSeedRole,
    resetThemeDraft,
    randomizeRoleSeed,
    saveToastTick,
    selectedRole,
    themeDraft,
    updateRoleSeed,
    updateThemeName,
    updateThemeSection
  } from '$lib/stores/themeDraft';
  import { computeAccessibilityMetrics } from '$lib/theme/accessibility';
  import { generateThemeArtifacts } from '$lib/theme/generate';
  import { applyLiveTheme, extractThemeName } from '$lib/theme/liveTheme';
  import { DEFAULT_RAMP_STEPS, type Role } from '$lib/theme/types';

  let activeTab: BuilderTab = 'Preview';
  let showSavedToast = false;
  let showCssOutput = false;
  let toastTimer: ReturnType<typeof setTimeout> | null = null;

  $: generated = generateThemeArtifacts($themeDraft);
  $: metrics = computeAccessibilityMetrics(generated.rampColors);
  $: currentRole = $selectedRole;
  $: roles = [...$themeDraft.roleOrder].filter((role) => Boolean($themeDraft.seeds[role]));
  $: rolePills = roles.map((role) => ({
    role,
    bg: generated.rampColors[role]?.[role === currentRole ? 200 : 100] ?? 'transparent',
    fg: generated.rampColors[role]?.[900] ?? 'inherit',
    border: generated.rampColors[role]?.[role === currentRole ? 500 : 300] ?? 'transparent'
  }));
  $: roleSnapshotSteps = DEFAULT_RAMP_STEPS.map((step) => ({
    step,
    color:
      generated.rampColors[currentRole]?.[step] ??
      generated.rampColors.primary?.[step] ??
      'transparent'
  }));

  $: if (browser) {
    applyLiveTheme(generated.cssText);
    const themeName = extractThemeName(generated.cssText);
    if (themeName) document.documentElement.setAttribute('data-theme', themeName);
  }

  $: if (!roles.includes(currentRole)) {
    const fallback = roles[0] ?? 'primary';
    selectedRole.set(fallback);
  }

  $: if ($saveToastTick > 0 && browser) {
    showSavedToast = true;
    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      showSavedToast = false;
      toastTimer = null;
    }, 1200);
  }

  onDestroy(() => {
    if (toastTimer) clearTimeout(toastTimer);
  });

  function updateSeedValue(role: Role, field: 'l' | 'c' | 'h', value: number): void {
    updateRoleSeed(role, { [field]: value });
  }

  async function copyText(text: string): Promise<void> {
    if (!browser || !navigator.clipboard) return;
    await navigator.clipboard.writeText(text);
  }

  function downloadCss(): void {
    if (!browser) return;
    const fileName = `${$themeDraft.name.trim() || 'theme'}.css`;
    const blob = new Blob([generated.cssText], { type: 'text/css' });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = fileName;
    anchor.click();
    URL.revokeObjectURL(url);
  }

</script>

<div class="page-layout flex items-stretch">
  <aside
    class="sidebar-rail hidden md:flex shrink-0 flex-col h-[calc(100vh-var(--app-header-height,88px)-var(--spacing-4,1rem))] sticky overflow-y-auto pt-(--spacing-4,1rem) pb-(--spacing-6,1.5rem)"
    style="top: calc(var(--app-header-height, 88px) + var(--spacing-4, 1rem));"
  >
    <div class="px-(--spacing-4,1rem)">
      <Sidebar
        draft={$themeDraft}
        roles={roles}
        selectedRole={currentRole}
        rampColors={generated.rampColors}
        onNameChange={updateThemeName}
        {activeTab}
        onTabChange={(tab) => (activeTab = tab)}
        onRoleSelect={(role) => selectedRole.set(role)}
        onSeedChange={(field, value) => updateSeedValue(currentRole, field, value)}
        onRandomize={() => randomizeRoleSeed(currentRole)}
        onAddSeed={addSeedRole}
        onRemoveSeed={removeSeedRole}
        onResetTheme={resetThemeDraft}
        onSectionChange={updateThemeSection}
      />
    </div>
  </aside>

  <main class="builder-main flex-1 pb-(--spacing-6,1.5rem)">
    <section class="content grid gap-3">
      {#if activeTab === 'Preview'}
        <section class="surface-card grid gap-4 p-4 preview-panel" style="gap:var(--tg-preview-gap,1rem); font-family:var(--base-font-family,inherit);">
          <h2 class="preview-title m-0 text-lg font-semibold" style="font-size:calc(1rem * var(--tg-preview-font-scale,1));">Color Ramps</h2>

          <div class="flex flex-wrap gap-2">
            {#each rolePills as pill}
              <button
                class="role-pill"
                class:role-pill--active={pill.role === currentRole}
                style={`--role-bg:${pill.bg}; --role-fg:${pill.fg}; --role-border:${pill.border};`}
                type="button"
                onclick={() => selectedRole.set(pill.role)}
              >
                {pill.role}
              </button>
            {/each}
          </div>

          <div class="grid gap-4" style="gap:var(--tg-preview-gap,1rem);">
            <div class="surface-card grid gap-3 p-3">
              <h3 class="m-0 text-sm font-semibold" style="font-size:calc(0.82rem * var(--tg-preview-font-scale,1));">Role Snapshot ({currentRole})</h3>
              <div class="grid grid-cols-6 gap-1.5">
                {#each roleSnapshotSteps as swatch}
                  <Tooltip text={`${currentRole}-${swatch.step}`} position="top">
                    <div class="h-10 w-10 rounded-md border border-black/10" style={`background:${swatch.color};`}></div>
                  </Tooltip>
                {/each}
              </div>
            </div>
          </div>

          <ThemePreviewShowcase ramps={generated.rampColors} {roles} />
        </section>
      {/if}

      {#if activeTab === 'Ramps'}
        <div class="grid gap-3">
          <RampGrid ramps={generated.rampColors} {roles} steps={[...DEFAULT_RAMP_STEPS]} />
          <RampModes
            ramps={generated.rampColors}
            {roles}
            backgrounds={$themeDraft.backgrounds}
          />
        </div>
      {/if}

      {#if activeTab === 'Code'}
        <div class="grid gap-3">
          <CodeBlock title="TypeScript (defineTheme)" code={generated.tsSnippet} onCopy={() => copyText(generated.tsSnippet)} />

          <div class="surface-card flex items-center gap-2 p-3">
            <Button type="button" variant="outline" color="neutral" size="sm" onclick={() => copyText(generated.cssText)}>
              Copy CSS
            </Button>
            <Button type="button" variant="outline" color="neutral" size="sm" onclick={downloadCss}>
              Download CSS
            </Button>
            <div class="ml-auto">
              <Checkbox label="Show CSS output" bind:checked={showCssOutput} />
            </div>
          </div>

          {#if showCssOutput}
            <CodeBlock title="Generated CSS" code={generated.cssText} onCopy={() => copyText(generated.cssText)} />
          {/if}
        </div>
      {/if}

      {#if activeTab === 'Accessibility'}
        <AccessibilitySummary {metrics} />
      {/if}
    </section>
  </main>

  <Toast show={showSavedToast} message="Saved successfully" />
</div>

<style>
  .page-layout {
    --background-app: var(--background-app-light, var(--color-surface-50-vis, var(--color-surface-50)));
    --background-panel: var(--background-panel-light, var(--color-surface-100-vis, var(--color-surface-100)));
    --body-background-color: var(--body-background-color, var(--background-app));
    --explorer-surface: var(--background-app, var(--color-surface-50-vis, var(--color-surface-50)));
    --explorer-panel: var(--background-panel, var(--color-surface-100-vis, var(--color-surface-100)));
    --explorer-border: var(--border-color-default, var(--color-surface-300-vis, var(--color-surface-300)));
    --explorer-text: var(--on-surface, var(--color-surface-900-vis, var(--color-surface-900)));
    --explorer-muted: var(--on-surface-muted, var(--color-surface-700-vis, var(--color-surface-700)));
    --card-bg: var(--explorer-panel);
    --border-default-color: var(--explorer-border);
    --text-muted: var(--explorer-muted);
    gap: var(--spacing-7, 1.75rem);
  }

  :global(html[data-mode='dark']) .page-layout {
    --background-app: var(--background-app-dark, var(--body-background-color-dark, var(--color-surface-950-vis, var(--color-surface-950))));
    --background-panel: var(--background-panel-dark, var(--color-surface-900-vis, var(--color-surface-900)));
    --explorer-surface: var(--background-app, var(--color-surface-950-vis, var(--color-surface-950)));
    --explorer-panel: var(--background-panel, var(--color-surface-900-vis, var(--color-surface-900)));
    --explorer-border: var(--border-color-default, var(--color-surface-700-vis, var(--color-surface-700)));
    --explorer-text: var(--on-surface, var(--color-surface-100-vis, var(--color-surface-100)));
    --explorer-muted: var(--on-surface-muted, var(--color-surface-400-vis, var(--color-surface-400)));
    --card-bg: var(--color-surface-900-vis, var(--color-surface-900));
    --border-default-color: var(--explorer-border);
    --text-muted: var(--explorer-muted);
  }

  .sidebar-rail {
    width: var(--studio-sidebar-width);
    min-width: var(--studio-sidebar-width);
  }

  .builder-main {
    min-width: 0;
  }

  .preview-panel {
    border-radius: calc(var(--radius-container, 0.875rem) + 0.15rem);
    background:
      radial-gradient(120% 100% at 0% 0%, color-mix(in oklab, var(--primary, var(--color-primary-600-vis)) 11%, transparent), transparent 56%),
      linear-gradient(
        180deg,
        color-mix(in oklab, var(--background-panel, var(--color-surface-100-vis)) 94%, transparent),
        color-mix(in oklab, var(--background-panel, var(--color-surface-100-vis)) 88%, transparent)
      );
    box-shadow:
      inset 0 1px 0 color-mix(in oklab, white 40%, transparent),
      0 16px 28px color-mix(in oklab, var(--on-surface) 7%, transparent);
  }

  .preview-panel :global(.surface-card) {
    box-shadow:
      inset 0 1px 0 color-mix(in oklab, white 40%, transparent),
      0 6px 16px color-mix(in oklab, var(--on-surface) 7%, transparent);
    transition: box-shadow 180ms ease, transform 180ms ease;
  }

  .preview-panel :global(.surface-card:hover) {
    box-shadow:
      inset 0 1px 0 color-mix(in oklab, white 48%, transparent),
      0 8px 20px color-mix(in oklab, var(--on-surface) 10%, transparent);
  }

  .role-pill {
    border: 1px solid var(--role-border, var(--border-color-default, var(--color-surface-300-vis)));
    border-radius: 999px;
    padding: 0.28rem 0.7rem;
    font-size: 0.75rem;
    font-weight: 700;
    text-transform: lowercase;
    background: var(--role-bg, transparent);
    color: var(--role-fg, var(--on-surface, var(--color-surface-900-vis)));
    transition: transform 120ms ease, filter 120ms ease, box-shadow 120ms ease;
  }

  .role-pill:hover {
    transform: translateY(-1px);
    filter: saturate(1.08);
  }

  .role-pill--active {
    box-shadow: inset 0 0 0 1px color-mix(in oklab, white 35%, transparent);
  }

  .preview-title {
    letter-spacing: 0.01em;
    color: var(--on-surface, var(--color-surface-900-vis));
  }

  @media (max-width: 1200px) {
    .sidebar-rail {
      width: 24rem;
      min-width: 24rem;
    }
  }
</style>

