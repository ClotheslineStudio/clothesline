<script lang="ts">
  import { Button } from '@clothesline/ui';
  import ComponentPreview from '$lib/components/dev/ComponentPreview/ComponentPreview.svelte';

  const githubUrl =
    'https://github.com/clotheslinestudio/ui/blob/main/src/components/core/Button/Button.svelte';

  const variants = ['solid', 'outline', 'ghost', 'link'] as const;
  const sizes = ['sm', 'md', 'lg'] as const;
  const colors = ['primary', 'neutral', 'success', 'warning', 'error'] as const;

  const sampleLabel = 'Click me';

  // Utility classes
  const previewCenter = 'flex items-center justify-center min-h-24';
  const rowWrapCenter = 'flex flex-wrap items-center justify-center gap-3';
</script>

<h1 class="text-2xl font-bold mb-4">Button Component</h1>

<section class="space-y-10">
  <!-- Basic -->
  <div class="space-y-2">
    <h2 class="text-lg font-semibold">Basic</h2>
    <ComponentPreview {githubUrl} code={`<Button>${sampleLabel}</Button>`}>
      <div class={previewCenter}>
        <Button>{sampleLabel}</Button>
      </div>
    </ComponentPreview>
  </div>

  <!-- Sizes (all in one preview) -->
  <div class="space-y-2">
    <h2 class="text-lg font-semibold">Sizes</h2>
    <ComponentPreview
      {githubUrl}
      code={`<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>`}
    >
      <div class={`${previewCenter} ${rowWrapCenter}`}>
        <Button size="sm">Small</Button>
        <Button size="md">Medium</Button>
        <Button size="lg">Large</Button>
      </div>
    </ComponentPreview>
  </div>

  <!-- Colors (all in one preview) -->
  <div class="space-y-2">
    <h2 class="text-lg font-semibold">Colors</h2>
    <ComponentPreview
      {githubUrl}
      code={colors.map(c => `<Button color="${c}">${c}</Button>`).join('\n')}
    >
      <div class={`${previewCenter} ${rowWrapCenter}`}>
        {#each colors as c}
          <Button color={c}>{c}</Button>
        {/each}
      </div>
    </ComponentPreview>
  </div>

  <!-- States -->
  <div class="space-y-4">
    <h2 class="text-lg font-semibold">States</h2>
    <div class="grid gap-6 md:grid-cols-2">
      <ComponentPreview {githubUrl} code={`<Button disabled>Disabled</Button>`}>
        <div class={previewCenter}>
          <Button disabled>Disabled</Button>
        </div>
      </ComponentPreview>

      <ComponentPreview {githubUrl} code={`<Button loading>Loading</Button>`}>
        <div class={previewCenter}>
          <Button loading>Loading</Button>
        </div>
      </ComponentPreview>
    </div>
  </div>

  <!-- With Icons -->
  <div class="space-y-2">
    <h2 class="text-lg font-semibold">With Icons</h2>
    <ComponentPreview
      {githubUrl}
      code={`<Button>
  <span slot="icon-left">⬅️</span>
  With left icon
</Button>
<Button variant="outline">
  With right icon
  <span slot="icon-right">➡️</span>
</Button>`}
    >
      <div class={`${previewCenter} ${rowWrapCenter}`}>
        <Button>
          <span slot="icon-left">⬅️</span>
          With left icon
        </Button>
        <Button variant="outline">
          With right icon
          <span slot="icon-right">➡️</span>
        </Button>
      </div>
    </ComponentPreview>
  </div>

  <!-- Link behavior -->
  <div class="space-y-2">
    <h2 class="text-lg font-semibold">As Link (href)</h2>
    <ComponentPreview
      {githubUrl}
      code={`<Button href="https://clotheslineui.com" target="_blank" rel="noreferrer">
  Visit Clothesline UI
</Button>`}
    >
      <div class={previewCenter}>
        <Button href="https://clotheslineui.com" target="_blank" rel="noreferrer">
          Visit Clothesline UI
        </Button>
      </div>
    </ComponentPreview>
  </div>

  <!-- Kitchen Sink (stacked, one per row) -->
  <div class="space-y-6">
    <h2 class="text-lg font-semibold">Kitchen Sink by Color</h2>
    {#each colors as c}
      <ComponentPreview
        {githubUrl}
        code={variants
          .map(v => `<Button color="${c}" variant="${v}" size="sm">${c} • ${v}</Button>`)
          .join('\n')}
      >
        <div class={`${previewCenter} ${rowWrapCenter}`}>
          {#each variants as v}
            <Button color={c} variant={v} size="sm">
              {c} • {v}
            </Button>
          {/each}
        </div>
      </ComponentPreview>
    {/each}
  </div>
</section>





