<script lang="ts">
  import { Divider } from '@clothesline/ui';
  import ComponentPreview from '$lib/components/dev/ComponentPreview/ComponentPreview.svelte';

  const githubUrl =
    'https://github.com/clotheslinestudio/ui/blob/main/src/components/core/Divider/Divider.svelte';

  const variants = ['solid', 'dashed', 'dotted', 'soft'] as const;
  const aligns = ['start', 'center', 'end'] as const;
  const thicknesses = ['hairline', 'sm', 'md', 'lg', 'xl'] as const;
  const spaces = ['none', 'sm', 'md', 'lg'] as const;

  const previewCenter = 'flex items-center justify-center min-h-24';
  const rowWrapCenter = 'flex flex-wrap items-center justify-center gap-4';
</script>

<h1 class="text-2xl font-bold mb-4">Divider Component</h1>

<section class="space-y-10">
  <!-- Basic -->
  <div class="space-y-2">
    <h2 class="text-lg font-semibold">Basic</h2>
    <ComponentPreview {githubUrl} code={`<Divider />`}>
      <div class="space-y-4 w-full">
        <p>Above</p>
        <Divider />
        <p>Below</p>
      </div>
    </ComponentPreview>
  </div>

  <!-- Variants -->
  <div class="space-y-2">
    <h2 class="text-lg font-semibold">Variants</h2>
    <ComponentPreview
      {githubUrl}
      code={variants.map(v => `<Divider variant="${v}" />`).join('\n')}
    >
      <div class="space-y-4 w-full">
        {#each variants as v}
          <div>
            <p class="mb-2">variant="{v}"</p>
            <Divider variant={v} />
          </div>
        {/each}
      </div>
    </ComponentPreview>
  </div>

  <!-- With label & alignment -->
  <div class="space-y-2">
    <h2 class="text-lg font-semibold">With Label & Alignment</h2>
    <ComponentPreview
      {githubUrl}
      code={aligns
        .map(a => `<Divider label="Section" align="${a}" />`)
        .join('\n')}
    >
      <div class="space-y-4 w-full">
        {#each aligns as a}
          <Divider label="Section" align={a} />
        {/each}
      </div>
    </ComponentPreview>
  </div>

  <!-- Vertical -->
  <div class="space-y-2">
    <h2 class="text-lg font-semibold">Vertical</h2>
    <ComponentPreview
      {githubUrl}
      code={`<div class="flex items-center gap-4">
  <span>Left</span>
  <Divider orientation="vertical" />
  <span>Right</span>
</div>`}
    >
      <div class="flex items-center gap-4 h-16">
        <span>Left</span>
        <Divider orientation="vertical" />
        <span>Right</span>
      </div>
    </ComponentPreview>
  </div>

  <!-- Thickness & Space -->
  <div class="space-y-2">
    <h2 class="text-lg font-semibold">Thickness & Space</h2>
    <ComponentPreview
      {githubUrl}
      code={thicknesses
        .map(t => `<Divider thickness="${t}" space="sm" />`)
        .join('\n')}
    >
      <div class="space-y-6 w-full">
        {#each thicknesses as t}
          <Divider thickness={t} space="sm" />
        {/each}
      </div>
    </ComponentPreview>
  </div>

  <!-- Decorative -->
  <div class="space-y-2">
    <h2 class="text-lg font-semibold">Decorative</h2>
    <ComponentPreview
      {githubUrl}
      code={`<Divider decorative />`}
    >
      <div class="space-y-4 w-full">
        <p>Above</p>
        <Divider decorative />
        <p>Below</p>
      </div>
    </ComponentPreview>
  </div>
</section>

<Divider color="var(--color-neutral-700)" />

<div style="outline:1px solid red">
  <Divider />
</div>

<Divider variant="solid" color="oklch(40% 0.03 270)" />

