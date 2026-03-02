<script lang="ts">
  import { browser } from '$app/environment';
  import { onMount } from 'svelte';
  import { tick } from 'svelte';
  import Customizer from '$lib/components/Customizer.svelte';
  import CategoryFilter from '$lib/components/CategoryFilter.svelte';
  import { iconRegistry } from '@clothesline/icons';
  import IconDetailPanel from '$lib/components/IconDetailPanel.svelte';
  import type { IconRecord, IconStyle, IconVariant } from '$lib/types/icon';

  // Search + filters
  let search = '';
  let selectedCategory: string | null = null;

  // Icon rendering options
  let style: IconStyle = 'stroke';
  let color = '#6381F8';
  let secondaryColor = '#6381F8';
  let strokeWidth = 2;
  let size = 24;
  let absoluteStroke = false;

  // Modal-local rendering options (decoupled from grid customizer)
  let modalStyle: IconStyle = style;
  let modalColor = color;
  let modalSecondaryColor = secondaryColor;
  let modalStrokeWidth = strokeWidth;
  let modalSize = size;
  let modalAbsoluteStroke = absoluteStroke;
  let modalAvailableStyles: IconStyle[] = ['stroke', 'filled', 'duotone'];

  function resolveCssColor(variableName: string): string {
    if (!browser) return '';
    const probe = document.createElement('span');
    probe.style.position = 'absolute';
    probe.style.opacity = '0';
    probe.style.pointerEvents = 'none';
    probe.style.color = `var(${variableName})`;
    document.body.appendChild(probe);
    const resolved = getComputedStyle(probe).color.trim();
    document.body.removeChild(probe);
    return resolved;
  }

  function getThemePrimaryColor(): string {
    if (!browser) return '#6381F8';
    return (
      resolveCssColor('--color-primary-500-vis') ||
      resolveCssColor('--color-primary-500') ||
      '#6381F8'
    );
  }

  function getThemeSecondaryColor(): string {
    if (!browser) return '#1298C4';
    return (
      resolveCssColor('--color-secondary-500-vis') ||
      resolveCssColor('--color-secondary-500') ||
      resolveCssColor('--color-accent-500-vis') ||
      resolveCssColor('--color-accent-500') ||
      '#1298C4'
    );
  }

  function applyThemeDefaultColors() {
    const themePrimary = getThemePrimaryColor();
    const themeSecondary = getThemeSecondaryColor();
    color = themePrimary;
    secondaryColor = themeSecondary;
    modalColor = themePrimary;
    modalSecondaryColor = themeSecondary;
  }

  // Selected icon for right panel
  let selected: IconRecord | null = null;
  let modalEl: HTMLDivElement | null = null;
  let lastTriggerEl: HTMLElement | null = null;
  let modalFocusedForOpen = false;

  const modalTitleId = 'icon-detail-title';
  const modalDescId = 'icon-detail-description';
  const focusableSelector =
    'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

  // Build array from registry (runtime data)
  const allIcons: IconRecord[] = Object.values(iconRegistry)
    .filter((entry) => entry && entry.meta && entry.meta.name && entry.component)
    .map((entry) => {
      const svgVariants =
        'svg' in entry && entry.svg && typeof entry.svg === 'object'
          ? (Object.keys(entry.svg).filter((v): v is IconVariant =>
              v === 'stroke' || v === 'filled' || v === 'duotone'
            ))
          : [];

      const metaVariants =
        'variants' in entry.meta && Array.isArray(entry.meta.variants)
          ? (entry.meta.variants.filter((v): v is IconVariant =>
              v === 'stroke' || v === 'filled' || v === 'duotone'
            ))
          : [];

      return {
        ...entry.meta,
        variants: svgVariants.length > 0 ? svgVariants : metaVariants,
        component: entry.component,
        contributors: 'contributors' in entry.meta ? (entry.meta.contributors as string[]) : [],
        updatedAt: 'updatedAt' in entry.meta ? (entry.meta as any).updatedAt : ''
      };
    });

  // Filtering logic
  $: filteredIcons =
    allIcons.filter((icon) => {
      if (style === 'animated') {
        return false;
      }

      if (!icon.variants.includes(style)) {
        return false;
      }

      if (selectedCategory && !icon.categories.includes(selectedCategory)) {
        return false;
      }

      const trimmed = search.trim();
      if (trimmed.length > 0) {
        const q = trimmed.toLowerCase();
        return (
          icon.name.toLowerCase().includes(q) ||
          icon.displayName.toLowerCase().includes(q) ||
          icon.keywords.some((kw) => kw.toLowerCase().includes(q))
        );
      }
      return true;
    });

  function selectIcon(icon: IconRecord, event: MouseEvent) {
    lastTriggerEl = event.currentTarget as HTMLElement;
    const gridStyleForModal = style === 'animated' ? 'stroke' : style;
    modalStyle = icon.variants.includes(gridStyleForModal)
      ? gridStyleForModal
      : ((icon.variants[0] ?? 'stroke') as IconStyle);
    modalColor = color;
    modalSecondaryColor = secondaryColor;
    modalStrokeWidth = strokeWidth;
    modalSize = size;
    modalAbsoluteStroke = absoluteStroke;
    selected = icon;
  }

  function closePanel() {
    selected = null;
  }

  $: panelOpen = selected !== null;

  $: modalAvailableStyles = selected
    ? (selected.variants.filter((v) => v === 'stroke' || v === 'filled' || v === 'duotone') as IconStyle[])
    : ['stroke', 'filled', 'duotone'];

  $: if (selected && !modalAvailableStyles.includes(modalStyle)) {
    modalStyle = modalAvailableStyles[0] ?? 'stroke';
  }

  function getFocusableElements() {
    if (!modalEl) return [];
    return Array.from(modalEl.querySelectorAll<HTMLElement>(focusableSelector)).filter(
      (el) => !el.hasAttribute('disabled') && el.getAttribute('aria-hidden') !== 'true'
    );
  }

  function focusInitialModalElement() {
    const initial = modalEl?.querySelector<HTMLElement>('[data-modal-initial-focus]');
    if (initial) {
      initial.focus();
      return;
    }

    const focusables = getFocusableElements();
    if (focusables.length > 0) {
      focusables[0].focus();
      return;
    }

    modalEl?.focus();
  }

  function handleModalKeydown(event: KeyboardEvent) {
    if (!panelOpen) return;

    if (event.key === 'Escape') {
      event.preventDefault();
      event.stopPropagation();
      closePanel();
      return;
    }

    if (event.key !== 'Tab') return;

    const focusables = getFocusableElements();
    if (focusables.length === 0) {
      event.preventDefault();
      modalEl?.focus();
      return;
    }

    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    const active = document.activeElement as HTMLElement | null;

    if (event.shiftKey && active === first) {
      event.preventDefault();
      last.focus();
      return;
    }

    if (!event.shiftKey && active === last) {
      event.preventDefault();
      first.focus();
    }
  }

  function handleBackdropPointerDown(event: PointerEvent) {
    if (event.target === event.currentTarget) {
      closePanel();
    }
  }

  $: if (browser) {
    document.body.style.overflow = panelOpen ? 'hidden' : '';
  }

  $: if (panelOpen && !modalFocusedForOpen) {
    modalFocusedForOpen = true;
    tick().then(() => {
      if (panelOpen) focusInitialModalElement();
    });
  }

  $: if (!panelOpen && modalFocusedForOpen) {
    modalFocusedForOpen = false;
    tick().then(() => lastTriggerEl?.focus());
  }

  onMount(() => {
    applyThemeDefaultColors();

    let previousTheme = document.documentElement.getAttribute('data-theme');
    const observer = new MutationObserver(() => {
      const nextTheme = document.documentElement.getAttribute('data-theme');
      if (nextTheme !== previousTheme) {
        previousTheme = nextTheme;
        requestAnimationFrame(() => applyThemeDefaultColors());
      }
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme']
    });

    return () => observer.disconnect();
  });
</script>

<style>
  .page-layout {
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
    width: 26rem;
    min-width: 26rem;
    background: transparent;
  }

  .explorer-main {
    min-width: 0;
  }

  .icon-explorer-header {
    margin-bottom: var(--spacing-4, 1rem);
  }

  .icon-grid-section {
    padding-bottom: var(--spacing-10, 2.5rem);
  }

  .icon-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(78px, 1fr));
    gap: var(--spacing-3, 0.75rem);
    justify-content: stretch;
    align-content: flex-start;
  }

  .icon-tile {
    border-color: var(--explorer-border);
    background: var(--explorer-panel);
    width: 100%;
    aspect-ratio: 1 / 1;
  }

  .icon-tile:hover {
    background: color-mix(in oklab, var(--explorer-panel) 80%, var(--explorer-text) 4%);
  }

  .search-input {
    color: var(--explorer-text);
    caret-color: var(--explorer-text);
  }

  .search-input::placeholder {
    color: var(--explorer-muted);
    opacity: 1;
  }

  .icon-detail-modal {
    background-color: var(--background-panel, var(--color-surface-100-vis, var(--color-surface-100)));
    border-color: var(--border-color-default, var(--border-default-color, var(--color-surface-300-vis, var(--color-surface-300))));
    color: var(--on-surface, var(--color-surface-900-vis, var(--color-surface-900)));
    --card-bg: var(--color-surface-50-vis, var(--color-surface-50));
    --border-default-color: var(--color-surface-300-vis, var(--color-surface-300));
    --text-muted: var(--on-surface-muted, var(--color-surface-700-vis, var(--color-surface-700)));
  }

  :global(html[data-mode='dark']) .icon-detail-modal {
    background-color: var(--background-panel, var(--color-surface-900-vis, var(--color-surface-900)));
    border-color: var(--border-color-default, var(--border-default-color, var(--color-surface-700-vis, var(--color-surface-700))));
    color: var(--on-surface, var(--color-surface-100-vis, var(--color-surface-100)));
    --card-bg: var(--color-surface-950-vis, var(--color-surface-950));
    --border-default-color: var(--color-surface-700-vis, var(--color-surface-700));
    --text-muted: var(--on-surface-muted, var(--color-surface-400-vis, var(--color-surface-400)));
  }

  @media (max-width: 1480px) {
    .sidebar-rail {
      width: 22rem;
      min-width: 22rem;
    }
  }

  @media (max-width: 1200px) {
    .sidebar-rail {
      width: 19rem;
      min-width: 19rem;
    }
  }
</style>

<div class="page-layout flex items-stretch">
  <!-- LEFT SIDEBAR (its own scroll, not wrapping the grid) -->
  <aside
    class="
      sidebar-rail
      hidden md:flex
      shrink-0 flex-col
    
      h-[calc(100vh-var(--app-header-height,88px)-var(--spacing-4,1rem))] sticky
      overflow-y-auto
      pt-(--spacing-4,1rem)
      pb-(--spacing-6,1.5rem)
    "
    style="top: calc(var(--app-header-height, 88px) + var(--spacing-4, 1rem));"
  >
    <div class="px-(--spacing-4,1rem)">
      <Customizer
        {style}
        bind:color
        bind:secondaryColor
        bind:strokeWidth
        bind:size
        bind:absolute={absoluteStroke}
        onStyleChange={(next) => (style = next)}
      />
    </div>

    <div class="mt-6 px-(--spacing-4,1rem)">
      <h2 class="text-xs font-semibold mb-2 text-(--text-muted,var(--on-surface-muted))">
        Categories
      </h2>

      <CategoryFilter
        icons={allIcons}
        on:change={(e) => (selectedCategory = e.detail.category)}
      />
    </div>
  </aside>

  <!-- MAIN CONTENT (normal page scroll) -->
  <!-- MAIN CONTENT (normal page scroll) -->
<main class="explorer-main flex-1">
  <!-- Local header -->
  <header
    class="
      icon-explorer-header
      mb-4
      flex items-center justify-between
      border-b border-(--border-default-color,var(--color-surface-200))
      pb-(--spacing-3,0.75rem)
    "
  >
    <div class="flex flex-col">
      <span class="text-sm font-medium text-(--on-surface-strong,var(--color-surface-900))">
        Icon Explorer
      </span>
      <span class="text-xs text-(--text-muted,var(--color-surface-600))">
        {filteredIcons.length} icons
      </span>
    </div>

    <div class="w-64">
      <input
        bind:value={search}
        placeholder="Search icons…"
        class="
          search-input
          w-full
          px-(--spacing-3,0.75rem)
          py-(--spacing-2,0.5rem)
          rounded-md
          border border-(--border-default-color,var(--color-surface-300))
          bg-(--background-panel,var(--color-surface-0,#ffffff))
          text-sm
          focus:outline-none
          focus-visible:ring-2
          focus-visible:ring-(--button-focus-ring-color,var(--color-primary-500-vis))
          focus-visible:ring-offset-1
        "
      />
    </div>
</header>

  <!-- ICON GRID (no internal scroll, page scrolls instead) -->
  <section class="icon-grid-section">
    <div class="icon-grid">
      {#each filteredIcons as icon}
        <button
          type="button"
          on:click={(event) => selectIcon(icon, event)}
          class="
            icon-tile
            group relative z-0 hover:z-20 focus:z-20
            flex items-center justify-center
            rounded-lg
            border
            transition
          "
        >
          <svelte:component
            this={icon.component}
            size={size}
            strokeWidth={strokeWidth}
            absoluteStrokeWidth={absoluteStroke}
            primaryColor={color}
            secondaryColor={style === 'duotone' ? secondaryColor : color}
            variant={style}
          />

          <!-- Tooltip with icon name -->
          <div
            class="
              pointer-events-none
              absolute left-1/2 top-full mt-1
              -translate-x-1/2
              whitespace-nowrap
              rounded-md px-2 py-1
              bg-(--color-surface-900)
              text-[11px] text-(--color-surface-50)
              z-30
              opacity-0 group-hover:opacity-100
              shadow-lg
            "
          >
            {icon.displayName}
          </div>
        </button>
      {/each}
    </div>
  </section>
</main>

  {#if selected}
    <div
      class="fixed inset-0 z-50 flex items-center justify-center p-(--spacing-4)"
      style="
        background: color-mix(in oklab, var(--color-surface-950) 35%, transparent);
        backdrop-filter: blur(6px);
      "
      on:pointerdown={handleBackdropPointerDown}
    >
      <div
        bind:this={modalEl}
        role="dialog"
        aria-modal="true"
        aria-labelledby={modalTitleId}
        aria-describedby={modalDescId}
        tabindex="-1"
        on:keydown={handleModalKeydown}
        class="
          icon-detail-modal
          w-full max-w-[1120px] max-h-[92vh]
          overflow-y-auto
          rounded-(--radius-container,1rem)
          border
          shadow-xl
        "
      >
        <div class="grid gap-(--spacing-5) p-(--spacing-5) lg:grid-cols-[320px_1fr]">
          <aside class="self-start lg:sticky lg:top-(--spacing-5)">
            <Customizer
              style={modalStyle}
              bind:color={modalColor}
              bind:secondaryColor={modalSecondaryColor}
              bind:strokeWidth={modalStrokeWidth}
              bind:size={modalSize}
              bind:absolute={modalAbsoluteStroke}
              availableStyles={modalAvailableStyles}
              onStyleChange={(next) => (modalStyle = next)}
            />
          </aside>

          <IconDetailPanel
            icon={selected}
            style={modalStyle}
            color={modalColor}
            secondaryColor={modalSecondaryColor}
            strokeWidth={modalStrokeWidth}
            size={modalSize}
            absoluteStroke={modalAbsoluteStroke}
            titleId={modalTitleId}
            descriptionId={modalDescId}
            onClose={closePanel}
          />
        </div>
      </div>
    </div>
  {/if}


</div>










