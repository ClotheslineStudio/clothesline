<script lang="ts">
  import { Divider } from '@clothesline/ui';
  import ComponentPreview from '$lib/components/dev/ComponentPreview/ComponentPreview.svelte';

  const githubUrl =
    'https://github.com/clotheslinestudio/ui/blob/main/src/components/core/Divider/Divider.svelte';
</script>

<h1 class="text-2xl font-bold mb-4">Divider Component</h1>

<section class="space-y-10">
  <!-- Plain horizontal -->
  <div class="space-y-2">
    <h2 class="text-lg font-semibold">Plain — Horizontal</h2>
    <ComponentPreview {githubUrl} code={`<Divider />`}>
      <Divider />
    </ComponentPreview>
    <ComponentPreview {githubUrl} code={`<Divider variant="dashed" />`}>
      <Divider variant="dashed" />
    </ComponentPreview>
    <ComponentPreview {githubUrl} code={`<Divider variant="dotted" thickness="lg" />`}>
      <Divider variant="dotted" thickness="lg" />
    </ComponentPreview>
    <ComponentPreview {githubUrl} code={`<Divider variant="soft" />`}>
      <Divider variant="soft" />
    </ComponentPreview>
  </div>

  <!-- Labeled -->
  <div class="space-y-4">
    <h2 class="text-lg font-semibold">Labeled</h2>
    <ComponentPreview
      {githubUrl}
      code={`<Divider label="Section Title" />`}
    >
      <Divider label="Section Title" />
    </ComponentPreview>

    <ComponentPreview
      {githubUrl}
      code={`<Divider><strong>With Slot</strong></Divider>`}
    >
      <Divider><strong>With Slot</strong></Divider>
    </ComponentPreview>

    <div class="grid gap-6 grid-cols-1 sm:grid-cols-3">
      <ComponentPreview {githubUrl} code={`<Divider label="Start" align="start" />`}>
        <Divider label="Start" align="start" />
      </ComponentPreview>
      <ComponentPreview {githubUrl} code={`<Divider label="Center" align="center" />`}>
        <Divider label="Center" align="center" />
      </ComponentPreview>
      <ComponentPreview {githubUrl} code={`<Divider label="End" align="end" />`}>
        <Divider label="End" align="end" />
      </ComponentPreview>
    </div>
  </div>

  <!-- Vertical examples -->
  <div class="space-y-4">
    <h2 class="text-lg font-semibold">Vertical</h2>
    <ComponentPreview
      {githubUrl}
      code={`<div class="flex items-center gap-4">
  <span>Left</span>
  <Divider orientation="vertical" />
  <span>Right</span>
</div>`}
    >
      <div class="flex items-center gap-4">
        <span>Left</span>
        <Divider orientation="vertical" />
        <span>Right</span>
      </div>
    </ComponentPreview>

    <ComponentPreview
      {githubUrl}
      code={`<div class="h-24 flex gap-4">
  <Divider orientation="vertical" variant="soft" length="100%" />
  <Divider orientation="vertical" variant="dashed" thickness="lg" length="100%" />
</div>`}
    >
      <div class="h-24 flex gap-4">
        <Divider orientation="vertical" variant="soft" length="100%" />
        <Divider orientation="vertical" variant="dashed" thickness="lg" length="100%" />
      </div>
    </ComponentPreview>
  </div>

  <!-- Tokens & overrides -->
  <div class="space-y-4">
    <h2 class="text-lg font-semibold">Token Overrides</h2>
    <ComponentPreview
      {githubUrl}
      code={`<Divider color="var(--color-primary-400-vis)" variant="solid" />
<Divider color="var(--color-error-400-vis)"   variant="dashed" />
<Divider color="var(--color-success-400-vis)" variant="soft" />`}
    >
      <Divider color="var(--color-primary-400-vis)" variant="solid" />
      <Divider color="var(--color-error-400-vis)"   variant="dashed" />
      <Divider color="var(--color-success-400-vis)" variant="soft" />
    </ComponentPreview>
  </div>
</section>



<div style="height:1px;background:red;width:100%"></div>
