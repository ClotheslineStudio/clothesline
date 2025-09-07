<script lang="ts">
  import Progress from '$lib/components/feedback/ProgressBar/ProgressBar.svelte';
  import ComponentPreview from '$lib/components/dev/ComponentPreview/ComponentPreview.svelte';

  let determinateExamples = [0, 25, 50, 75, 100];
</script>

<h1 class="text-2xl font-bold mb-4">Progress Component</h1>

<section class="space-y-8">
  <div>
    <h2 class="text-lg font-semibold mb-3">Determinate Progress</h2>

    <div class="space-y-8">
      {#each determinateExamples as value}
        <div class="space-y-2">
          <div class="text-sm opacity-70">Progress ({value}%)</div>

          <ComponentPreview
            githubUrl="https://github.com/clotheslinestudio/ui/blob/main/src/components/feedback/ProgressBar/ProgressBar.svelte"
            code={`<Progress value={${value}} label="Progress at ${value}%" showLabel={true} />`}
          >
            <Progress value={value} label={`Progress at ${value}%`} showLabel={true} />
          </ComponentPreview>
        </div>
      {/each}
    </div>
  </div>

  <div class="space-y-2">
    <h2 class="text-lg font-semibold">Indeterminate Progress</h2>

    <ComponentPreview
      githubUrl="https://github.com/clotheslinestudio/ui/blob/main/src/components/feedback/ProgressBar/ProgressBar.svelte"
      code={`<Progress value={undefined} label="Loading..." showLabel={true} />`}
    >
      <Progress value={undefined} label="Loading..." showLabel={true} />
    </ComponentPreview>
  </div>
</section>





