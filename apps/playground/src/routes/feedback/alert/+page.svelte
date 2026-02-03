<script lang="ts">
  import { Alert } from '@clothesline/ui';
  import ComponentPreview from '$lib/components/dev/ComponentPreview/ComponentPreview.svelte';

  const githubUrl =
    'https://github.com/clotheslinestudio/ui/blob/main/src/components/feedback/Alert/Alert.svelte';

  const variants = ['neutral', 'info', 'success', 'warning', 'error'] as const;

  const previewCenter = 'flex items-center justify-center min-h-24';
  const rowWrapCenter = 'flex flex-wrap items-center justify-center gap-3';
</script>

<h1 class="text-2xl font-bold mb-4">Alert</h1>

<section class="space-y-10">
  <!-- Basic -->
  <div class="space-y-2">
    <h2 class="text-lg font-semibold">Basic</h2>
    <ComponentPreview {githubUrl} code={`<Alert>Heads up! Something happened.</Alert>`}>
      <div class={`${previewCenter} ${rowWrapCenter}`}>
        <Alert title="Heads up!" id="basic-alert">Heads up! Something happened.</Alert>
      </div>
    </ComponentPreview>
  </div>

  <!-- Variants -->
  <div class="space-y-2">
    <h2 class="text-lg font-semibold">Variants</h2>
    <ComponentPreview
      {githubUrl}
      code={variants.map(v => `<Alert variant="${v}">${v} alert</Alert>`).join('\n')}
    >
      <div class={`${previewCenter} ${rowWrapCenter}`}>
        {#each variants as v}
          <Alert variant={v} title={`${v.charAt(0).toUpperCase() + v.slice(1)} alert`} id={`alert-${v}`}>{v} alert</Alert>
        {/each}
      </div>
    </ComponentPreview>
  </div>

  <!-- Dismissible -->
  <div class="space-y-2">
    <h2 class="text-lg font-semibold">Dismissible</h2>
    <ComponentPreview
      {githubUrl}
      code={`<Alert variant="success" dismissible on:close={() => console.log('closed')}>Saved successfully.</Alert>`}
    >
      <div class={`${previewCenter} ${rowWrapCenter}`}>
        <Alert variant="success" title="Success" id="dismissible-success-alert" dismissible on:close={() => console.log('closed')}>
          Saved successfully.
        </Alert>
      </div>
    </ComponentPreview>
  </div>

  <!-- With title -->
  <div class="space-y-2">
    <h2 class="text-lg font-semibold">With Title</h2>
    <ComponentPreview
      {githubUrl}
      code={`<Alert variant="warning" title="Check your input">Zip code must be 5 digits.</Alert>`}
    >
      <div class={`${previewCenter} ${rowWrapCenter}`}>
        <Alert variant="warning" title="Check your input" id="warning-input-alert">Zip code must be 5 digits.</Alert>
      </div>
    </ComponentPreview>
  </div>
</section>

