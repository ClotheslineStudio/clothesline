<script lang="ts">
  import type { IconRecord, IconStyle } from '$lib/types/icon';
  import { Button, Badge } from '@clothesline/ui';
  import { Close } from '@clothesline/icons';

  export let icon: IconRecord;

  // same knobs the grid uses
  export let style: IconStyle;
  export let color: string;
  export let secondaryColor: string;
  export let strokeWidth: number;
  export let size: number;
  export let absoluteStroke: boolean;

  // close from parent (panel)
  export let onClose: () => void = () => {};

  // local size selection for the preview
  let selectedSize = size ?? 24;
  const sizes = icon.sizes ?? [16, 24, 32];

  $: previewSecondary =
    style === 'duotone' ? secondaryColor : color;

  const importName = icon.displayName.replace(/\s+/g, '');
  const pkg = '@clothesline/icons';

  $: svelteSnippet = `<script>
  import { ${importName} } from '${pkg}';
<\/script>

<${importName}
  size={${selectedSize}}
  strokeWidth={${strokeWidth}}
  variant="${style}"
/>`;

  async function copy(text: string) {
    try {
      await navigator.clipboard.writeText(text);
      // hook this into your toast system later
      console.log('Copied to clipboard');
    } catch (e) {
      console.error('Copy failed', e);
    }
  }
</script>

<div class="p-(--spacing-6) flex flex-col gap-(--spacing-6)">
<header class="flex items-start justify-between gap-(--spacing-4)">
  <!-- Left: close + title -->
  <div class="flex items-start gap-(--spacing-3)">
    {#if onClose}
      <button
        type="button"
        class="inline-flex items-center justify-center"
        aria-label="Close details panel"
        on:click={() => onClose && onClose()}
        style="
          width: var(--size-control-sm);
          height: var(--size-control-sm);
          border-radius: var(--radius-full);
          border: 1px solid var(--border-muted-color);
          background-color: var(--color-surface-0);
          color: var(--icon-muted);
          transition: var(--button-transition);
        "
        on:mouseover={(e) => (e.currentTarget.style.backgroundColor = 'var(--color-surface-100)')}
        on:mouseout={(e) => (e.currentTarget.style.backgroundColor = 'var(--color-surface-0)')}
        on:focus={(e) => (e.currentTarget.style.backgroundColor = 'var(--color-surface-100)')}
        on:blur={(e) => (e.currentTarget.style.backgroundColor = 'var(--color-surface-0)')}
      >
        <Close size={16} strokeWidth={2} />
      </button>
    {/if}

    <div>
      <h2
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
        class="mt-(--spacing-1) text-xs"
        style="color: var(--text-muted); font-size: var(--type-scale-xs);"
      >
        Version {icon.version}
      </p>

      {#if icon.updatedAt}
        <p
          class="mt-[calc(var(--spacing-1)/2)] text-[11px]"
          style="color: var(--text-muted);"
        >
          Updated {new Date(icon.updatedAt).toLocaleDateString()}
        </p>
      {/if}
    </div>
  </div>

    <!-- RIGHT: keywords + categories -->
    <div class="text-right space-y-(--spacing-3) max-w-[220px]">
      <!-- Keywords: horizontal scroll -->
      <div>
        <div
          class="text-[10px] font-semibold uppercase"
          style="
            color: var(--text-muted);
            font-family: var(--type-label-family);
            letter-spacing: var(--type-label-tracking);
          "
        >
          Keywords
        </div>

        <div
          class="mt-(--spacing-1) overflow-x-auto"
          style="padding-bottom: var(--spacing-1);"
        >
          <div
            class="flex gap-(--spacing-1)"
            style="
              flex-wrap: nowrap;
              min-width: max-content;
            "
          >
            {#each icon.keywords as kw}
              <span
                class="px-(--spacing-2) py-[calc(var(--spacing-1)/2)] rounded-full text-[11px]"
                style="
                  background-color: var(--color-surface-100);
                  color: var(--on-surface-muted);
                  white-space: nowrap;
                "
              >
                {kw}
              </span>
            {/each}
          </div>
        </div>
      </div>

      <!-- Categories: clickable pill badges -->
      <div>
        <div
          class="text-[10px] font-semibold uppercase"
          style="
            color: var(--text-muted);
            font-family: var(--type-label-family);
            letter-spacing: var(--type-label-tracking);
          "
        >
          Categories
        </div>

        <div
          class="mt-(--spacing-1) flex flex-wrap gap-(--spacing-1) justify-end"
        >
          {#each icon.categories as cat}
            <Badge
              variant="accent"
              size="sm"
              appearance="soft"
              pill={true}
              label={cat}
              role="button"
              tabindex="0"
              aria-label={`Filter by ${cat} category`}
              style="cursor: pointer;"
              on:click={() => {
                // TODO: hook into filter later (e.g. dispatch event)
                console.log('Category clicked:', cat);
              }}
            >
              {cat}
            </Badge>
          {/each}
        </div>
      </div>
    </div>
  </header>

  <!-- BIG PREVIEW -->
  <section
    class="flex flex-col gap-(--spacing-3)"
    style="
      background-color: var(--preview-code-bg);
      border: 1px solid var(--preview-border);
      border-radius: var(--preview-radius);
      padding: var(--preview-padding);
      box-shadow: var(--preview-shadow);
    "
  >
    <div class="flex items-center justify-between">
      <span
        class="text-xs font-medium"
        style="color: var(--text-muted); font-size: var(--type-scale-xs);"
      >
        Preview
      </span>
      <span class="text-[11px]" style="color: var(--text-muted);">
        {style} · {selectedSize}px
      </span>
    </div>

    <div class="flex items-center justify-center py-(--spacing-6)">
      <svelte:component
        this={icon.component}
        size={48}
        strokeWidth={strokeWidth}
        absoluteStrokeWidth={absoluteStroke}
        primaryColor={color}
        secondaryColor={previewSecondary}
        variant={style}
      />
    </div>
  </section>

  <!-- SIZES -->
  <section>
    <h3
      class="mb-(--spacing-2) text-xs font-semibold"
      style="color: var(--text-muted); font-size: var(--type-scale-xs);"
    >
      Sizes
    </h3>
    <div class="flex gap-(--spacing-3)">
      {#each sizes as sz}
        <button
          type="button"
          class="flex flex-col items-center gap-(--spacing-2) text-[11px] border rounded-md px-(--spacing-3) py-(--spacing-2)"
          class:selected={selectedSize === sz}
          on:click={() => (selectedSize = sz)}
          style={selectedSize === sz
            ? `
              background-color: var(--color-surface-0);
              border-color: var(--color-primary-500);
              box-shadow: var(--elevation-card);
              color: var(--on-surface-strong);
            `
            : `
              background-color: var(--color-surface-0);
              border-color: var(--border-default-color);
              color: var(--on-surface-muted);
            `}
        >
          <svelte:component
            this={icon.component}
            size={sz}
            strokeWidth={strokeWidth}
            absoluteStrokeWidth={absoluteStroke}
            primaryColor={color}
            secondaryColor={previewSecondary}
            variant={style}
          />
          <span>{sz}px</span>
        </button>
      {/each}
    </div>
  </section>

  <!-- COPY BUTTONS -->
  <section class="flex gap-(--spacing-1)">
    <div class="flex-1">
      <Button
        type="button"
        variant="outline"
        color="primary"
        size="lg"
        ariaLabel="Copy SVG markup"
        on:click={() => copy('// TODO: inject raw SVG here')}
      >
        Copy SVG
      </Button>
    </div>

    <div class="flex-1">
      <Button
        type="button"
        variant="solid"
        color="primary"
        size="lg"
        ariaLabel="Copy Svelte usage snippet"
        on:click={() => copy(svelteSnippet)}
      >
        Copy Svelte
      </Button>
    </div>
  </section>

  <!-- CODE BLOCK -->
  <section>
    <h3
      class="mb-(--spacing-2) text-xs font-semibold"
      style="color: var(--text-muted); font-size: var(--type-scale-xs);"
    >
      Svelte Usage
    </h3>
    <pre
      class="rounded-lg overflow-auto"
      style="
        background-color: var(--preview-code-bg);
        color: var(--preview-code-color);
        padding: var(--preview-code-padding);
        font-family: var(--preview-code-font-family);
        font-size: var(--preview-code-font-size);
        border: 1px solid var(--preview-code-border);
      "
    >
<code>{svelteSnippet}</code>
    </pre>
  </section>

  <!-- AUTHOR / CONTRIBUTORS -->
  <section class="grid grid-cols-2 gap-(--spacing-4) text-xs">
    <div>
      <div
        class="text-[10px] font-semibold uppercase"
        style="color: var(--text-muted);"
      >
        Author
      </div>
      <div class="mt-(--spacing-2) flex items-center gap-(--spacing-2)">
        <div
          class="h-7 w-7 rounded-full"
          style="background-color: var(--color-surface-300);"
        ></div>
        <span>{icon.author}</span>
      </div>
    </div>
    <div>
      <div
        class="text-[10px] font-semibold uppercase"
        style="color: var(--text-muted);"
      >
        Contributors
      </div>
      {#if icon.contributors?.length}
        <div class="mt-(--spacing-2) space-y-(--spacing-1)">
          {#each icon.contributors as user}
            <div class="flex items-center gap-(--spacing-2)">
              <div
                class="h-7 w-7 rounded-full"
                style="background-color: var(--color-surface-300);"
              ></div>
              <span>{user}</span>
            </div>
          {/each}
        </div>
      {:else}
        <p
          class="mt-(--spacing-2) text-[11px]"
          style="color: var(--text-muted);"
        >
          None yet.
        </p>
      {/if}
    </div>
  </section>
</div>

<style>
</style>
