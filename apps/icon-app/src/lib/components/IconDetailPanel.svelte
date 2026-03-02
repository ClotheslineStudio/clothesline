<script lang="ts">
  import { onDestroy } from 'svelte';
  import type { IconRecord, IconStyle } from '$lib/types/icon';
  import { Button } from '@clothesline/ui';
  import { Close } from '@clothesline/icons';
  import { iconRegistry } from '@clothesline/icons';
  import { copyToClipboard } from '$lib/utils/copyToClipboard';

  export let icon: IconRecord;

  export let style: IconStyle;
  export let color: string;
  export let secondaryColor: string;
  export let strokeWidth: number;
  export let size: number;
  export let absoluteStroke: boolean;
  export let titleId = 'icon-detail-title';
  export let descriptionId = 'icon-detail-description';

  export let onClose: () => void = () => {};

  let selectedSize = size ?? 24;
  let lastPropSize = size ?? 24;

  $: if (size !== lastPropSize) {
    selectedSize = size;
    lastPropSize = size;
  }

  $: previewSecondary = style === 'duotone' ? secondaryColor : color;

  const importName = icon.displayName.replace(/[^a-zA-Z0-9]+/g, '');
  const pkg = '@clothesline/icons';

  $: svelteSnippet = `<script lang="ts">
  import { ${importName} } from '${pkg}';
<\/script>

<${importName}
  size={${selectedSize}}
  strokeWidth={${strokeWidth}}
  absoluteStrokeWidth={${absoluteStroke}}
  variant="${style}"
  primaryColor="${color}"${style === 'duotone' ? `
  secondaryColor="${secondaryColor}"` : ''}
/>`;

  function withCurrentSvgSettings(svgMarkup: string) {
    let markup = svgMarkup;
    markup = markup.replace(/<svg\b([^>]*)>/i, (_full, attrs: string) => {
      const withoutSize = attrs
        .replace(/\swidth\s*=\s*(?:(['"]).*?\1|[^\s>]+)/gi, '')
        .replace(/\sheight\s*=\s*(?:(['"]).*?\1|[^\s>]+)/gi, '');
      return `<svg${withoutSize} width="${selectedSize}" height="${selectedSize}">`;
    });

    if (style === 'stroke' || style === 'duotone') {
      markup = markup.replace(/stroke-width="[^"]*"/g, `stroke-width="${strokeWidth}"`);
      markup = markup.replace(/stroke-width='[^']*'/g, `stroke-width="${strokeWidth}"`);
    }

    return markup;
  }

  $: rawSvgVariant = (() => {
    const entry = (iconRegistry as Record<string, any>)[icon.name];
    const styleSvg = entry?.svg?.[style];
    const fallback = entry?.svg?.stroke ?? '';
    return typeof styleSvg === 'string' ? styleSvg : fallback;
  })();

  $: svgSnippet = rawSvgVariant ? withCurrentSvgSettings(rawSvgVariant) : '<!-- SVG not available -->';

  let svgButtonLabel = 'Copy SVG';
  let svelteButtonLabel = 'Copy Svelte';
  let feedbackMessage = '';
  let feedbackTone: 'success' | 'error' = 'success';

  let svgTimer: ReturnType<typeof setTimeout> | null = null;
  let svelteTimer: ReturnType<typeof setTimeout> | null = null;

  function clearTimers() {
    if (svgTimer) clearTimeout(svgTimer);
    if (svelteTimer) clearTimeout(svelteTimer);
  }

  function setFeedback(message: string, tone: 'success' | 'error') {
    feedbackMessage = message;
    feedbackTone = tone;
  }

  async function copySvg() {
    const ok = await copyToClipboard(svgSnippet);
    svgButtonLabel = ok ? 'Copied!' : 'Copy failed';
    setFeedback(ok ? 'SVG copied to clipboard.' : 'Unable to copy SVG.', ok ? 'success' : 'error');
    if (svgTimer) clearTimeout(svgTimer);
    svgTimer = setTimeout(() => {
      svgButtonLabel = 'Copy SVG';
      feedbackMessage = '';
    }, 1400);
  }

  async function copySvelte() {
    const ok = await copyToClipboard(svelteSnippet);
    svelteButtonLabel = ok ? 'Copied!' : 'Copy failed';
    setFeedback(ok ? 'Svelte snippet copied to clipboard.' : 'Unable to copy Svelte snippet.', ok ? 'success' : 'error');
    if (svelteTimer) clearTimeout(svelteTimer);
    svelteTimer = setTimeout(() => {
      svelteButtonLabel = 'Copy Svelte';
      feedbackMessage = '';
    }, 1400);
  }

  onDestroy(() => clearTimers());
</script>

<div class="detail-root p-(--spacing-6) flex flex-col gap-(--spacing-6)">
  <header class="flex flex-col gap-(--spacing-3)">
    <div class="flex items-start justify-between gap-(--spacing-4)">
      <div class="flex items-start gap-(--spacing-3)">
        {#if onClose}
          <button
            type="button"
            data-modal-initial-focus="true"
            class="inline-flex items-center justify-center"
            aria-label="Close details panel"
            on:click={() => onClose && onClose()}
            style="
              width: var(--size-control-sm);
              height: var(--size-control-sm);
              border-radius: var(--radius-full);
              border: 1px solid var(--detail-border);
              background-color: var(--detail-surface-subtle);
              color: var(--detail-text-muted);
              transition: var(--button-transition);
            "
          >
            <Close size={16} strokeWidth={2} />
          </button>
        {/if}

        <div>
          <h2
            id={titleId}
            class="font-semibold"
            style="
              font-family: var(--type-heading-family);
              font-size: var(--type-heading-size);
              line-height: var(--type-heading-leading);
              letter-spacing: var(--type-heading-tracking);
            "
          >
            {icon.displayName}
          </h2>

          <p
            id={descriptionId}
            class="mt-(--spacing-1) text-xs"
            style="color: var(--detail-text-muted); font-size: var(--type-scale-xs);"
          >
            Version {icon.version}
          </p>

          {#if icon.updatedAt}
            <p
              class="mt-[calc(var(--spacing-1)/2)] text-[11px]"
              style="color: var(--detail-text-muted);"
            >
              Updated {new Date(icon.updatedAt).toLocaleDateString()}
            </p>
          {/if}
        </div>
      </div>
    </div>

    <div class="grid gap-(--spacing-3) md:grid-cols-2">
      <div>
        <div
          class="text-[10px] font-semibold uppercase"
          style="
            color: var(--detail-text-muted);
            font-family: var(--type-label-family);
            letter-spacing: var(--type-label-tracking);
          "
        >
          Keywords
        </div>

        <div class="mt-(--spacing-2) flex flex-wrap gap-(--spacing-2)">
          {#each icon.keywords as kw}
            <span
              class="px-(--spacing-3) py-(--spacing-1) rounded-full text-[11px]"
              style="
                background-color: var(--detail-chip-keyword-bg);
                color: var(--detail-chip-keyword-text);
                border: 1px solid var(--detail-border);
                white-space: normal;
                line-height: 1.2;
              "
            >
              {kw}
            </span>
          {/each}
        </div>
      </div>

      <div>
        <div
          class="text-[10px] font-semibold uppercase"
          style="
            color: var(--detail-text-muted);
            font-family: var(--type-label-family);
            letter-spacing: var(--type-label-tracking);
          "
        >
          Categories
        </div>

        <div class="mt-(--spacing-2) flex flex-wrap gap-(--spacing-2)">
          {#each icon.categories as cat}
            <span
              class="px-(--spacing-3) py-(--spacing-1) rounded-full text-[11px]"
              style="
                display: inline-flex;
                align-items: center;
                padding-inline: var(--spacing-3);
                padding-block: var(--spacing-1);
                background-color: var(--detail-chip-category-bg);
                color: var(--detail-chip-category-text);
                border: 1px solid var(--detail-border);
                white-space: normal;
                line-height: 1.2;
              "
            >
              {cat}
            </span>
          {/each}
        </div>
      </div>
    </div>
  </header>

  <section
    class="flex flex-col gap-(--spacing-3)"
    style="
      background-color: var(--detail-surface-subtle);
      border: 1px solid var(--detail-border);
      border-radius: var(--preview-radius);
      padding: var(--preview-padding);
      box-shadow: var(--preview-shadow);
    "
  >
    <div class="flex items-center justify-between">
      <span
        class="text-xs font-medium"
        style="color: var(--detail-text-muted); font-size: var(--type-scale-xs);"
      >
        Preview
      </span>
      <span class="text-[11px]" style="color: var(--detail-text-muted);">
        {style} · {selectedSize}px
      </span>
    </div>

    <div class="detail-preview-canvas flex items-center justify-center">
      <svelte:component
        this={icon.component}
        size={selectedSize}
        strokeWidth={strokeWidth}
        absoluteStrokeWidth={absoluteStroke}
        primaryColor={color}
        secondaryColor={previewSecondary}
        variant={style}
      />
    </div>
  </section>

  <section class="grid gap-(--spacing-2) md:grid-cols-2">
    <div class="flex-1">
      <Button
        type="button"
        variant="outline"
        color="primary"
        size="lg"
        ariaLabel="Copy SVG markup"
        onclick={copySvg}
        style="
          --button-radius: var(--radius-md);
          background: var(--detail-copy-outline-bg);
          border-color: var(--detail-copy-outline-border);
          color: var(--detail-copy-outline-text);
        "
      >
        {svgButtonLabel}
      </Button>
    </div>

    <div class="flex-1">
      <Button
        type="button"
        variant="solid"
        color="primary"
        size="lg"
        ariaLabel="Copy Svelte usage snippet"
        onclick={copySvelte}
        style="
          --button-radius: var(--radius-md);
          background: var(--detail-copy-solid-bg);
          border-color: var(--detail-copy-solid-bg);
          color: var(--detail-copy-solid-text);
        "
      >
        {svelteButtonLabel}
      </Button>
    </div>
  </section>

  {#if feedbackMessage}
    <p
      class="text-xs"
      style={`color: ${feedbackTone === 'success' ? 'var(--color-success-700-vis, var(--color-success-700))' : 'var(--color-error-700-vis, var(--color-error-700))'};`}
    >
      {feedbackMessage}
    </p>
  {/if}

  <section>
    <h3
      class="mb-(--spacing-2) text-xs font-semibold"
      style="color: var(--detail-text-muted); font-size: var(--type-scale-xs);"
    >
      Svelte Usage
    </h3>
    <pre
      class="rounded-lg overflow-auto"
      style="
        background-color: var(--detail-code-bg);
        color: var(--detail-code-text);
        padding: var(--preview-code-padding);
        font-family: var(--preview-code-font-family);
        font-size: var(--preview-code-font-size);
        border: 1px solid var(--detail-border);
        line-height: 1.45;
      "
    >
<code class="language-svelte">{svelteSnippet}</code>
    </pre>
  </section>

  <section class="grid grid-cols-2 gap-(--spacing-4) text-xs">
    <div>
      <div
        class="text-[10px] font-semibold uppercase"
        style="color: var(--detail-text-muted);"
      >
        Author
      </div>
      <div class="mt-(--spacing-2) flex items-center gap-(--spacing-2)">
        <div
          class="h-7 w-7 rounded-full"
          style="background-color: var(--detail-border);"
        ></div>
        <span>{icon.author}</span>
      </div>
    </div>
    <div>
      <div
        class="text-[10px] font-semibold uppercase"
        style="color: var(--detail-text-muted);"
      >
        Contributors
      </div>
      {#if icon.contributors?.length}
        <div class="mt-(--spacing-2) space-y-(--spacing-1)">
          {#each icon.contributors as user}
            <div class="flex items-center gap-(--spacing-2)">
              <div
                class="h-7 w-7 rounded-full"
                style="background-color: var(--detail-border);"
              ></div>
              <span>{user}</span>
            </div>
          {/each}
        </div>
      {:else}
        <p
          class="mt-(--spacing-2) text-[11px]"
          style="color: var(--detail-text-muted);"
        >
          None yet.
        </p>
      {/if}
    </div>
  </section>
</div>

<style>
  .detail-root {
    --detail-surface-subtle: var(--color-surface-50-vis, var(--color-surface-50));
    --detail-border: var(--border-color-default, var(--border-default-color, var(--color-surface-300-vis, var(--color-surface-300))));
    --detail-text-strong: var(--on-surface-strong, var(--color-surface-900-vis, var(--color-surface-900)));
    --detail-text-muted: var(--on-surface-muted, var(--color-surface-700-vis, var(--color-surface-700)));
    --detail-chip-keyword-bg: var(--color-surface-100-vis, var(--color-surface-100));
    --detail-chip-keyword-text: var(--detail-text-muted);
    --detail-chip-category-bg: var(--primary-subtle, var(--color-primary-100-vis, var(--color-primary-100)));
    --detail-chip-category-text: var(--detail-text-strong);
    --detail-primary-border: var(--primary, var(--color-primary-500-vis, var(--color-primary-500)));
    --detail-copy-outline-bg: var(--surface-raised, var(--color-surface-50-vis, var(--color-surface-50)));
    --detail-copy-outline-border: var(--border-color-default, var(--color-surface-400-vis, var(--color-surface-400)));
    --detail-copy-outline-text: var(--detail-text-strong);
    --detail-copy-solid-bg: var(--primary, var(--color-primary-600-vis, var(--color-primary-600)));
    --detail-copy-solid-text: var(--on-primary, var(--color-surface-50-vis, var(--color-surface-50)));
    --detail-code-bg: var(--color-surface-100-vis, var(--color-surface-100));
    --detail-code-text: var(--detail-text-strong);
  }

  .detail-preview-canvas {
    min-height: clamp(11rem, 24vh, 15rem);
    max-height: clamp(11rem, 24vh, 15rem);
    overflow: hidden;
  }

  :global(html[data-mode='dark']) .detail-root {
    --detail-surface-subtle: var(--color-surface-950-vis, var(--color-surface-950));
    --detail-border: var(--border-color-default, var(--border-default-color, var(--color-surface-700-vis, var(--color-surface-700))));
    --detail-text-strong: var(--on-surface-strong, var(--color-surface-100-vis, var(--color-surface-100)));
    --detail-text-muted: var(--on-surface-muted, var(--color-surface-400-vis, var(--color-surface-400)));
    --detail-chip-keyword-bg: var(--color-surface-800-vis, var(--color-surface-800));
    --detail-chip-keyword-text: var(--detail-text-muted);
    --detail-chip-category-bg: var(--primary-subtle, var(--color-primary-900-vis, var(--color-primary-900)));
    --detail-chip-category-text: var(--on-primary, var(--color-primary-100-vis, var(--color-primary-100)));
    --detail-primary-border: var(--primary, var(--color-primary-400-vis, var(--color-primary-400)));
    --detail-copy-outline-bg: var(--color-surface-800-vis, var(--color-surface-800));
    --detail-copy-outline-border: var(--color-surface-600-vis, var(--color-surface-600));
    --detail-copy-outline-text: var(--detail-text-strong);
    --detail-copy-solid-bg: var(--primary, var(--color-primary-500-vis, var(--color-primary-500)));
    --detail-copy-solid-text: var(--on-primary, var(--color-surface-100-vis, var(--color-surface-100)));
    --detail-code-bg: var(--color-surface-900-vis, var(--color-surface-900));
    --detail-code-text: var(--detail-text-strong);
  }
</style>

