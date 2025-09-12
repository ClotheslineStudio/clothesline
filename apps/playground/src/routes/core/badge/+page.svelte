<script lang="ts">
  import { Badge } from '@clothesline/ui';
  import ComponentPreview from '$lib/components/dev/ComponentPreview/ComponentPreview.svelte';

  const githubUrl =
    'https://github.com/clotheslinestudio/ui/blob/main/src/components/core/Badge/Badge.svelte';

  const variants = [
    'primary',
    'secondary',
    'tertiary',
    'success',
    'warning',
    'error',
    'info',
    'accent',
    'neutral'
  ] as const;

  const sizes = ['sm', 'md', 'lg'] as const;
  const appearances = ['solid', 'outline', 'soft'] as const;

  // Utility classes (match Button page vibe)
  const previewCenter = 'flex items-center justify-center min-h-24';
  const rowWrapCenter = 'flex flex-wrap items-center justify-center gap-3';
</script>

<h1 class="text-2xl font-bold mb-4">Badge Component</h1>

<section class="space-y-10">
  <!-- Basic -->
  <div class="space-y-2">
    <h2 class="text-lg font-semibold">Basic</h2>
    <ComponentPreview
      {githubUrl}
      code={`<Badge>Default</Badge>
<Badge variant="success">Success</Badge>
<Badge variant="error">Error</Badge>`}
    >
      <div class={`${previewCenter} ${rowWrapCenter}`}>
        <Badge>Default</Badge>
        <Badge variant="success">Success</Badge>
        <Badge variant="error">Error</Badge>
      </div>
    </ComponentPreview>
  </div>

  <!-- Variants -->
  <div class="space-y-2">
    <h2 class="text-lg font-semibold">Variants</h2>
    <ComponentPreview
      {githubUrl}
      code={variants.map(v => `<Badge variant="${v}">${v}</Badge>`).join('\n')}
    >
      <div class={`${previewCenter} ${rowWrapCenter}`}>
        {#each variants as variant}
          <Badge {variant}>{variant}</Badge>
        {/each}
      </div>
    </ComponentPreview>
  </div>

  <!-- Sizes -->
  <div class="space-y-2">
    <h2 class="text-lg font-semibold">Sizes</h2>
    <ComponentPreview
      {githubUrl}
      code={sizes.map(s => `<Badge size="${s}">Size ${s}</Badge>`).join('\n')}
    >
      <div class={`${previewCenter} ${rowWrapCenter}`}>
        {#each sizes as size}
          <Badge size={size}>Size {size}</Badge>
        {/each}
      </div>
    </ComponentPreview>
  </div>

  <!-- Appearances -->
  <div class="space-y-2">
    <h2 class="text-lg font-semibold">Appearances</h2>
    <ComponentPreview
      {githubUrl}
      code={appearances.map(a => `<Badge appearance="${a}">${a}</Badge>`).join('\n')}
    >
      <div class={`${previewCenter} ${rowWrapCenter}`}>
        {#each appearances as appearance}
          <Badge appearance={appearance}>{appearance}</Badge>
        {/each}
      </div>
    </ComponentPreview>
  </div>

  <!-- Pill -->
  <div class="space-y-2">
    <h2 class="text-lg font-semibold">Pill</h2>
    <ComponentPreview
      {githubUrl}
      code={variants.map(v => `<Badge variant="${v}" pill>${v}</Badge>`).join('\n')}
    >
      <div class={`${previewCenter} ${rowWrapCenter}`}>
        {#each variants as variant}
          <Badge variant={variant} pill>{variant}</Badge>
        {/each}
      </div>
    </ComponentPreview>
  </div>

  <!-- Removable -->
  <div class="space-y-2">
    <h2 class="text-lg font-semibold">Removable</h2>
    <ComponentPreview
      {githubUrl}
      code={`<Badge removable onRemove={() => alert('Removed!')}>Tag 1</Badge>
<Badge removable onRemove={() => alert('Removed!')}>Tag 2</Badge>`}
    >
      <div class={`${previewCenter} ${rowWrapCenter}`}>
        <Badge removable onRemove={() => alert('Removed!')}>Tag 1</Badge>
        <Badge removable onRemove={() => alert('Removed!')}>Tag 2</Badge>
      </div>
    </ComponentPreview>
  </div>
</section>

