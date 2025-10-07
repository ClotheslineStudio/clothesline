<script lang="ts">
  import { Text } from '@clothesline/ui';
  import ComponentPreview from '$lib/components/dev/ComponentPreview/ComponentPreview.svelte';

  const githubUrl =
    'https://github.com/clotheslinestudio/ui/blob/main/src/components/core/Text/Text.svelte';

  const tones = ['default', 'muted', 'primary', 'success', 'warning', 'error', 'info'] as const;
  const variants = ['body', 'heading', 'subheading', 'caption', 'overline', 'code', 'lead'] as const;
  const aligns = ['start', 'center', 'end', 'justify'] as const;

  // Utility classes to keep previews consistent across pages
  const previewCenter = 'flex items-center justify-center min-h-24';
  const rowWrapCenter = 'flex flex-wrap items-center justify-center gap-3';
</script>

<h1 class="text-2xl font-bold mb-4">Text Component</h1>

<section class="space-y-10">
  <!-- Basic -->
  <div class="space-y-2">
    <h2 class="text-lg font-semibold">Basic</h2>
    <ComponentPreview
      {githubUrl}
      code={`<Text>Default body text</Text>\n<Text variant="heading">Heading</Text>\n<Text variant="caption">Small caption text</Text>`}
    >
      <div class={`${previewCenter} ${rowWrapCenter}`}>
        <Text>Default body text</Text>
        <Text variant="heading">Heading</Text>
        <Text variant="caption">Small caption text</Text>
      </div>
    </ComponentPreview>
  </div>

  <!-- Variants -->
  <div class="space-y-2">
    <h2 class="text-lg font-semibold">Variants</h2>
    <ComponentPreview
      {githubUrl}
      code={variants.map(v => `<Text variant="${v}">${v}</Text>`).join('\n')}
    >
      <div class={`${previewCenter} ${rowWrapCenter}`}>
        {#each variants as v}
          <Text variant={v}>{v}</Text>
        {/each}
      </div>
    </ComponentPreview>
  </div>

  <!-- Tones -->
  <div class="space-y-2">
    <h2 class="text-lg font-semibold">Tones</h2>
    <ComponentPreview
      {githubUrl}
      code={tones.map(t => `<Text tone="${t}">${t} tone</Text>`).join('\n')}
    >
      <div class={`${previewCenter} ${rowWrapCenter}`}>
        {#each tones as t}
          <Text tone={t}>{t} tone</Text>
        {/each}
      </div>
    </ComponentPreview>
  </div>

  <!-- Alignment -->
  <div class="space-y-2">
    <h2 class="text-lg font-semibold">Alignment</h2>
    <ComponentPreview
      {githubUrl}
      code={`<Text align="start">start</Text>\n<Text align="center">center</Text>\n<Text align="end">end</Text>\n<Text align="justify">justify (long text)...</Text>`}
    >
      <div class="grid gap-4" style="grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));">
        <div class="p-3 rounded-md border border-[color:var(--color-surface-300)]/60">
          <Text align="start">start</Text>
        </div>
        <div class="p-3 rounded-md border border-[color:var(--color-surface-300)]/60">
          <Text align="center">center</Text>
        </div>
        <div class="p-3 rounded-md border border-[color:var(--color-surface-300)]/60">
          <Text align="end">end</Text>
        </div>
        <div class="p-3 rounded-md border border-[color:var(--color-surface-300)]/60">
          <Text align="justify">
            justify • Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vitae, arcu ac
            egestas consequat, sem nisl gravida lorem, vitae maximus justo nisi et risus.
          </Text>
        </div>
      </div>
    </ComponentPreview>
  </div>

  <!-- Transform, italic, underline -->
  <div class="space-y-2">
    <h2 class="text-lg font-semibold">Transform & Emphasis</h2>
    <ComponentPreview
      {githubUrl}
      code={`<Text transform="uppercase">uppercase</Text>\n<Text italic>italic</Text>\n<Text underline>underline</Text>`}
    >
      <div class={`${previewCenter} ${rowWrapCenter}`}>
        <Text transform="uppercase">uppercase</Text>
        <Text italic>italic</Text>
        <Text underline>underline</Text>
      </div>
    </ComponentPreview>
  </div>

  <!-- Truncate & Clamp -->
  <div class="space-y-2">
    <h2 class="text-lg font-semibold">Truncate & Clamp</h2>
    <ComponentPreview
      {githubUrl}
      code={`<Text truncate style="max-width: 220px;">Very long line that will truncate with ellipsis when space runs out.</Text>\n<Text clamp={3} style="max-width: 240px;">Multi-line clamp example. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam cursus, orci eu vehicula tempus, mauris lectus fermentum libero, vitae suscipit nunc velit non ipsum.</Text>`}
    >
      <div class={`${previewCenter} ${rowWrapCenter}`}>
        <div style="max-width: 220px;">
          <Text truncate>
            Very long line that will truncate with ellipsis when space runs out.
          </Text>
        </div>
        <div style="max-width: 240px;">
          <Text clamp={3}>
            Multi-line clamp example. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Nam cursus, orci eu vehicula tempus, mauris lectus fermentum libero, vitae suscipit
            nunc velit non ipsum.
          </Text>
        </div>
      </div>
    </ComponentPreview>
  </div>

  <!-- Weight override -->
  <div class="space-y-2">
    <h2 class="text-lg font-semibold">Weight Override</h2>
    <ComponentPreview
      {githubUrl}
      code={`<Text weight="normal">normal (400)</Text>\n<Text weight="medium">medium (500)</Text>\n<Text weight="semibold">semibold (600)</Text>\n<Text weight="bold">bold (700)</Text>\n<Text weight={750}>numeric 750</Text>`}
    >
      <div class={`${previewCenter} ${rowWrapCenter}`}>
        <Text weight="normal">normal (400)</Text>
        <Text weight="medium">medium (500)</Text>
        <Text weight="semibold">semibold (600)</Text>
        <Text weight="bold">bold (700)</Text>
        <Text weight={750}>numeric 750</Text>
      </div>
    </ComponentPreview>
  </div>

  <!-- Semantic vs role heading -->
  <div class="space-y-2">
    <h2 class="text-lg font-semibold">Headings & Accessibility</h2>
    <ComponentPreview
      {githubUrl}
      code={`<Text variant="heading">h2 by default</Text>\n<Text variant="heading" as="div" ariaLevel={3}>div with role="heading" aria-level=3</Text>`}
    >
      <div class={`${previewCenter} ${rowWrapCenter}`}>
        <Text variant="heading">h2 by default</Text>
        <Text variant="heading" as="div" ariaLevel={3}>
          div with role="heading" aria-level=3
        </Text>
      </div>
    </ComponentPreview>
  </div>

  <!-- Mixed real-world sample -->
  <div class="space-y-2">
    <h2 class="text-lg font-semibold">Mixed Sample</h2>
    <ComponentPreview
      {githubUrl}
      code={`<Text variant="overline" tone="muted">Release Notes</Text>\n<Text variant="heading">Clothesline UI v0.1.0</Text>\n<Text variant="lead" tone="muted">A theme-aware, token-driven Svelte UI kit.</Text>\n<Text>Install with <Text as="span" variant="code">npm i @clothesline/ui</Text> then import components.</Text>`}
    >
      <div class="space-y-1">
        <Text variant="overline" tone="muted">Release Notes</Text>
        <Text variant="heading">Clothesline UI v0.1.0</Text>
        <Text variant="lead" tone="muted">A theme-aware, token-driven Svelte UI kit.</Text>
        <Text>
          Install with <Text as="span" variant="code">npm i @clothesline/ui</Text> then import components.
        </Text>
      </div>
    </ComponentPreview>
  </div>
</section>
