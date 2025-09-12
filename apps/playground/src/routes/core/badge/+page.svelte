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

  const rowWrap = 'flex flex-wrap gap-4 items-center';
</script>

<h1 class="text-2xl font-bold mb-4">Badge Component</h1>

<section class="space-y-10">
  <!-- Basic -->
  <div class="space-y-2">
    <h2 class="text-lg font-semibold">Basic</h2>
    <ComponentPreview {githubUrl}>
      <div class={rowWrap}>
        <Badge>Default</Badge>
        <Badge variant="success">Success</Badge>
        <Badge variant="error">Error</Badge>
      </div>
    </ComponentPreview>
  </div>

  <!-- Variants -->
  <div class="space-y-2">
    <h2 class="text-lg font-semibold">Variants</h2>
    <ComponentPreview {githubUrl}>
      <div class={rowWrap}>
        {#each variants as variant}
          <Badge {variant}>{variant}</Badge>
        {/each}
      </div>
    </ComponentPreview>
  </div>

  <!-- Sizes -->
  <div class="space-y-2">
    <h2 class="text-lg font-semibold">Sizes</h2>
    <ComponentPreview {githubUrl}>
      <div class={rowWrap}>
        {#each sizes as size}
          <Badge size={size}>Size {size}</Badge>
        {/each}
      </div>
    </ComponentPreview>
  </div>

  <!-- Appearances -->
  <div class="space-y-2">
    <h2 class="text-lg font-semibold">Appearances</h2>
    <ComponentPreview {githubUrl}>
      <div class={rowWrap}>
        {#each appearances as appearance}
          <Badge appearance={appearance}>{appearance}</Badge>
        {/each}
      </div>
    </ComponentPreview>
  </div>

  <!-- Pill -->
  <div class="space-y-2">
    <h2 class="text-lg font-semibold">Pill</h2>
    <ComponentPreview {githubUrl}>
      <div class={rowWrap}>
        {#each variants as variant}
          <Badge variant={variant} pill>{variant}</Badge>
        {/each}
      </div>
    </ComponentPreview>
  </div>

  <!-- Removable -->
  <div class="space-y-2">
    <h2 class="text-lg font-semibold">Removable</h2>
    <ComponentPreview {githubUrl}>
      <div class={rowWrap}>
        <Badge removable onRemove={() => alert('Removed!')}>Tag 1</Badge>
        <Badge removable onRemove={() => alert('Removed!')}>Tag 2</Badge>
      </div>
    </ComponentPreview>
  </div>
</section>
