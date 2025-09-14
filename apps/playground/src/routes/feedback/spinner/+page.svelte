<script lang="ts">
  import { Spinner } from '@clothesline/ui';
  import ComponentPreview from '$lib/components/dev/ComponentPreview/ComponentPreview.svelte';

  const githubUrl =
    'https://github.com/clotheslinestudio/ui/blob/main/src/components/feedback/Spinner/Spinner.svelte';

  const sizes = ['sm','md','lg'] as const;

  const previewCenter = 'flex items-center justify-center min-h-24';
  const rowWrapCenter = 'flex flex-wrap items-center justify-center gap-6';
</script>

<h1 class="text-2xl font-bold mb-4">Spinner</h1>

<section class="space-y-10">
  <!-- Sizes -->
  <div class="space-y-2">
    <h2 class="text-lg font-semibold">Sizes</h2>
    <ComponentPreview
      {githubUrl}
      code={sizes.map(s => `<Spinner size="${s}" />`).join('\n')}
    >
      <div class={`${previewCenter} ${rowWrapCenter}`}>
        {#each sizes as s}
          <div class="flex flex-col items-center gap-2">
            <Spinner size={s} />
            <div class="text-xs opacity-70">{s}</div>
          </div>
        {/each}
      </div>
    </ComponentPreview>
  </div>

  <!-- Role Colors -->
  <div class="space-y-2">
    <h2 class="text-lg font-semibold">Role Colors</h2>
    <ComponentPreview
      {githubUrl}
      code={`<Spinner color="primary" />\n<Spinner color="success" />\n<Spinner color="warning" />\n<Spinner color="error" />`}
    >
      <div class={`${previewCenter} ${rowWrapCenter}`}>
        <Spinner />
        <Spinner />
        <Spinner />
        <Spinner />
      </div>
    </ComponentPreview>
  </div>
</section>
