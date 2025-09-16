<script lang="ts">
  import { Tooltip } from '@clothesline/ui';
  import ComponentPreview from '$lib/components/dev/ComponentPreview/ComponentPreview.svelte';

  const githubUrl =
    'https://github.com/clotheslinestudio/ui/blob/main/src/components/feedback/Tooltip/Tooltip.svelte';

  const placements = ['top', 'right', 'bottom', 'left'] as const;

  const previewCenter = 'flex items-center justify-center min-h-24';
  const rowWrapCenter = 'flex flex-wrap items-center justify-center gap-4';
</script>

<h1 class="text-2xl font-bold mb-4">Tooltip</h1>

<section class="space-y-10">
  <!-- Basic (hover) -->
  <div class="space-y-2">
    <h2 class="text-lg font-semibold">Basic</h2>
    <ComponentPreview {githubUrl} code={`<Tooltip text="Copy to clipboard"><button class="px-3 py-2 rounded border">Hover me</button></Tooltip>`}>
      <div class={`${previewCenter} ${rowWrapCenter}`}>
        <Tooltip text="Copy to clipboard">
          <button class="px-3 py-2 rounded border">Hover me</button>
        </Tooltip>
      </div>
    </ComponentPreview>
  </div>

  <!-- Placements -->
  <div class="space-y-2">
    <h2 class="text-lg font-semibold">Placements</h2>
    <ComponentPreview
      {githubUrl}
      code={`<Tooltip text="Top" position="top"><button>top</button></Tooltip>
<Tooltip text="Right" position="right"><button>right</button></Tooltip>
<Tooltip text="Bottom" position="bottom"><button>bottom</button></Tooltip>
<Tooltip text="Left" position="left"><button>left</button></Tooltip>`}
    >
      <div class={`${previewCenter} ${rowWrapCenter}`}>
        {#each placements as p}
          <Tooltip text={p.toUpperCase()} position={p}>
            <button class="px-3 py-2 rounded border w-24 text-center">{p}</button>
          </Tooltip>
        {/each}
      </div>
    </ComponentPreview>
  </div>

  <!-- Click trigger (mobile-friendly) -->
  <div class="space-y-2">
    <h2 class="text-lg font-semibold">Click trigger (mobile)</h2>
    <ComponentPreview
      {githubUrl}
      code={`<Tooltip text="Opens on click" trigger="click"><button>Click me</button></Tooltip>`}
    >
      <div class={`${previewCenter} ${rowWrapCenter}`}>
        <Tooltip text="Opens on click">
          <button class="px-3 py-2 rounded border">Click me</button>
        </Tooltip>
      </div>
    </ComponentPreview>
  </div>

  <!-- Inline text -->
  <div class="space-y-2">
    <h2 class="text-lg font-semibold">Inline text</h2>
    <ComponentPreview
      {githubUrl}
      code={`Text with an <Tooltip text="International Bank Account Number"><span class="underline decoration-dotted cursor-help">IBAN</span></Tooltip> reference.`}
    >
      <div class={`${previewCenter} ${rowWrapCenter}`}>
        <p class="text-sm leading-6 text-[color:var(--on-surface)]">
          Text with an&nbsp;
          <Tooltip text="International Bank Account Number">
            <span class="underline decoration-dotted cursor-help">IBAN</span>
          </Tooltip>
          &nbsp;reference.
        </p>
      </div>
    </ComponentPreview>
  </div>
</section>




