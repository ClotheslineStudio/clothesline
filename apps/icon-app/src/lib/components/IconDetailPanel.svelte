<script lang="ts">
  import type { IconRecord, IconStyle } from '$lib/types/icon';

  export let icon: IconRecord;

  // same knobs the grid uses
  export let style: IconStyle;
  export let color: string;
  export let secondaryColor: string;
  export let strokeWidth: number;
  export let size: number;
  export let absoluteStroke: boolean;

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

<div class="p-6 flex flex-col gap-6">
  <!-- HEADER -->
  <header class="flex items-start justify-between gap-4">
    <div>
      <h2 class="text-lg font-semibold">{icon.displayName}</h2>
      <p class="text-xs text-neutral-500">
        Version {icon.version}
      </p>
      {#if icon.updatedAt}
        <p class="text-[11px] text-neutral-400 mt-0.5">
          Updated {new Date(icon.updatedAt).toLocaleDateString()}
        </p>
      {/if}
    </div>

    <div class="text-right space-y-3">
      <!-- Keywords -->
      <div>
        <div class="text-[10px] font-semibold uppercase text-neutral-400">
          Keywords
        </div>
        <div class="mt-1 flex flex-wrap gap-1 justify-end max-w-[180px]">
          {#each icon.keywords as kw}
            <span class="px-2 py-0.5 rounded-full bg-neutral-100 text-[11px]">
              {kw}
            </span>
          {/each}
        </div>
      </div>

      <!-- Categories -->
      <div>
        <div class="text-[10px] font-semibold uppercase text-neutral-400">
          Categories
        </div>
        <div class="mt-1 flex flex-wrap gap-1 justify-end">
          {#each icon.categories as cat}
            <span class="px-2 py-0.5 rounded-full bg-emerald-50 text-[11px]">
              {cat}
            </span>
          {/each}
        </div>
      </div>
    </div>
  </header>

  <!-- BIG PREVIEW -->
  <section class="border rounded-xl p-6 bg-white flex flex-col gap-3">
    <div class="flex items-center justify-between">
      <span class="text-xs font-medium text-neutral-500">Preview</span>
      <!-- you can swap this for a real light/dark toggle later -->
      <span class="text-[11px] text-neutral-400">
        {style} · {selectedSize}px
      </span>
    </div>

    <div class="flex items-center justify-center py-6">
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
    <h3 class="text-xs font-semibold mb-2">Sizes</h3>
    <div class="flex gap-3">
      {#each sizes as sz}
        <button
          type="button"
          class="border rounded-lg px-3 py-2 bg-white flex flex-col items-center gap-1 text-[11px]
                 {selectedSize === sz
                   ? 'border-indigo-500 shadow-sm'
                   : 'border-neutral-300'}"
          on:click={() => (selectedSize = sz)}
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
  <section class="flex gap-3">
    <button
      type="button"
      class="flex-1 border border-neutral-300 rounded-md px-3 py-2 text-sm bg-white"
      on:click={() => copy('// TODO: inject raw SVG here')}
    >
      Copy SVG
    </button>
    <button
      type="button"
      class="flex-1 rounded-md px-3 py-2 text-sm font-medium bg-indigo-500 text-white"
      on:click={() => copy(svelteSnippet)}
    >
      Copy Svelte
    </button>
  </section>

  <!-- CODE BLOCK -->
  <section>
    <h3 class="text-xs font-semibold mb-2">Svelte Usage</h3>
    <pre class="bg-neutral-900 text-neutral-50 rounded-lg text-[11px] p-3 overflow-auto">
<code>{svelteSnippet}</code>
    </pre>
  </section>

  <!-- AUTHOR / CONTRIBUTORS -->
  <section class="grid grid-cols-2 gap-4 text-xs">
    <div>
      <div class="text-[10px] font-semibold uppercase text-neutral-400">
        Author
      </div>
      <div class="mt-2 flex items-center gap-2">
        <div class="h-7 w-7 rounded-full bg-neutral-300"></div>
        <span>{icon.author}</span>
      </div>
    </div>
    <div>
      <div class="text-[10px] font-semibold uppercase text-neutral-400">
        Contributors
      </div>
      {#if icon.contributors?.length}
        <div class="mt-2 space-y-1">
          {#each icon.contributors as user}
            <div class="flex items-center gap-2">
              <div class="h-7 w-7 rounded-full bg-neutral-300"></div>
              <span>{user}</span>
            </div>
          {/each}
        </div>
      {:else}
        <p class="mt-2 text-[11px] text-neutral-400">None yet.</p>
      {/if}
    </div>
  </section>
</div>

