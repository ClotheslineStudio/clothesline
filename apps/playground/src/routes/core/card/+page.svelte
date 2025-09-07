<script lang="ts">
  import { Card } from '@clothesline/ui';
  import ComponentPreview from '$lib/components/dev/ComponentPreview/ComponentPreview.svelte';

  const githubUrl =
    'https://github.com/clotheslinestudio/ui/blob/main/src/components/core/Card/Card.svelte';

  const tones = ['surface', 'primary', 'neutral'] as const;
  const paddings = ['none', 'sm', 'md', 'lg'] as const;
  const shadows = ['none', 'sm', 'md', 'lg'] as const;

  const sampleBody =
    'Cards use theme tokens and are automatically vision/contrast aware via -vis ramp variables.';
</script>

<h1 class="text-2xl font-bold mb-4">Card Component</h1>

<section class="space-y-10">
  <!-- Basic -->
  <div class="space-y-2">
    <h2 class="text-lg font-semibold">Basic</h2>
    <ComponentPreview
      {githubUrl}
      code={`<Card>
  <h3 class="text-base font-semibold">Default Card</h3>
  <p>${sampleBody}</p>
</Card>`}
    >
      <Card>
        <h3 class="text-base font-semibold">Default Card</h3>
        <p>{sampleBody}</p>
      </Card>
    </ComponentPreview>
  </div>

  <!-- Tones -->
  <div class="space-y-4">
    <h2 class="text-lg font-semibold">Tones</h2>
    <div class="grid gap-6 md:grid-cols-3">
      {#each tones as tone}
        <ComponentPreview
          {githubUrl}
          code={`<Card tone="${tone}">
  <h3 class="text-base font-semibold">tone="${tone}"</h3>
  <p>${sampleBody}</p>
</Card>`}
        >
          <Card tone={tone}>
            <h3 class="text-base font-semibold">tone="{tone}"</h3>
            <p>{sampleBody}</p>
          </Card>
        </ComponentPreview>
      {/each}
    </div>
  </div>

  <!-- Padding -->
<div class="space-y-4">
  <h2 class="text-lg font-semibold">Padding</h2>
  <div class="grid gap-6 grid-cols-1 sm:grid-cols-2">
    {#each paddings as pad}
      <ComponentPreview
        {githubUrl}
        code={`<Card padding="${pad}">
  <h3 class="text-base font-semibold">padding="${pad}"</h3>
  <p>${sampleBody}</p>
</Card>`}
      >
        <Card padding={pad}>
          <h3 class="text-base font-semibold">padding="{pad}"</h3>
          <p>{sampleBody}</p>
        </Card>
      </ComponentPreview>
    {/each}
  </div>
</div>

  <!-- Shadows -->
 <div class="space-y-4">
  <h2 class="text-lg font-semibold">Shadows</h2>
  <div class="grid gap-6 grid-cols-1 sm:grid-cols-2">
    {#each shadows as s}
      <ComponentPreview
        {githubUrl}
        code={`<Card shadow="${s}">
  <h3 class="text-base font-semibold">shadow="${s}"</h3>
  <p>${sampleBody}</p>
</Card>`}
      >
        <Card shadow={s}>
          <h3 class="text-base font-semibold">shadow="{s}"</h3>
          <p>{sampleBody}</p>
        </Card>
      </ComponentPreview>
    {/each}
  </div>
</div>

  <!-- Toggles: rounded / border -->
  <div class="space-y-4">
    <h2 class="text-lg font-semibold">Toggles</h2>
    <div class="grid gap-6 md:grid-cols-2">
      <ComponentPreview
        {githubUrl}
        code={`<Card rounded={false}>
  <h3 class="text-base font-semibold">rounded={'{false}'}</h3>
  <p>${sampleBody}</p>
</Card>`}
      >
        <Card rounded={false}>
          <h3 class="text-base font-semibold">rounded={'{false}'}</h3>
          <p>{sampleBody}</p>
        </Card>
      </ComponentPreview>

      <ComponentPreview
        {githubUrl}
        code={`<Card border={false}>
  <h3 class="text-base font-semibold">border={'{false}'}</h3>
  <p>${sampleBody}</p>
</Card>`}
      >
        <Card border={false}>
          <h3 class="text-base font-semibold">border={'{false}'}</h3>
          <p>{sampleBody}</p>
        </Card>
      </ComponentPreview>
    </div>
  </div>

  <!-- Polymorphic `as` -->
  <div class="space-y-2">
    <h2 class="text-lg font-semibold">Polymorphic Element (as)</h2>
    <ComponentPreview
      {githubUrl}
      code={`<Card as="section" tone="neutral" shadow="lg">
  <h3 class="text-base font-semibold">as="section"</h3>
  <p>${sampleBody}</p>
</Card>`}
    >
      <Card as="section" tone="neutral" shadow="lg">
        <h3 class="text-base font-semibold">as="section"</h3>
        <p>{sampleBody}</p>
      </Card>
    </ComponentPreview>
  </div>
</section>



