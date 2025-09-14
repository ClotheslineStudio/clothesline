<script lang="ts">
  import { Progress } from '@clothesline/ui';
  import ComponentPreview from '$lib/components/dev/ComponentPreview/ComponentPreview.svelte';

  const githubUrl =
    'https://github.com/clotheslinestudio/ui/blob/main/src/components/feedback/Progress/Progress.svelte';

  let value = 35;

  const previewCenter = 'flex items-center justify-center min-h-24';
  const rowWrapCenter = 'flex flex-col items-center justify-center gap-4';
</script>

<h1 class="text-2xl font-bold mb-4">Progress</h1>

<section class="space-y-10">
  <!-- Determinate -->
  <div class="space-y-2">
    <h2 class="text-lg font-semibold">Determinate</h2>
    <ComponentPreview
      {githubUrl}
      code={`<Progress value={42} />`}
    >
      <div class={`${previewCenter} ${rowWrapCenter}`}>
        <Progress value={value} class="min-w-[280px]" />
        <input type="range" min="0" max="100" bind:value class="w-72" />
        <div class="text-sm opacity-75">{value}%</div>
      </div>
    </ComponentPreview>
  </div>

  <!-- Indeterminate -->
  <div class="space-y-2">
    <h2 class="text-lg font-semibold">Indeterminate</h2>
    <ComponentPreview
      {githubUrl}
      code={`<Progress indeterminate />`}
    >
      <div class={`${previewCenter} ${rowWrapCenter}`}>
        <Progress indeterminate style="min-width:280px;" />
      </div>
    </ComponentPreview>
  </div>
</section>






