<script lang="ts">
  import { Heading, Paragraph } from '@clothesline/ui';
  import ComponentPreview from '$lib/components/dev/ComponentPreview/ComponentPreview.svelte';

  const githubUrl =
    'https://github.com/clotheslinestudio/ui/blob/main/src/components/typography/Heading/Heading.svelte';

  const levels = [1, 2, 3, 4, 5, 6] as const;
  const tones = ['default', 'muted', 'primary', 'success', 'warning', 'error', 'info'] as const;
  const aligns = ['start', 'center', 'end', 'justify'] as const;
  const weights = ['normal', 'medium', 'semibold', 'bold'] as const;

  const previewCenter = 'flex items-center justify-center min-h-24';
  const rowWrapCenter = 'flex flex-wrap items-center justify-center gap-4';
</script>

<h1 class="text-2xl font-bold mb-4">Heading Component</h1>

<section class="space-y-10">
  <!-- Basic (H1–H6) -->
  <div class="space-y-2">
    <h2 class="text-lg font-semibold">Levels (H1–H6)</h2>
    <ComponentPreview {githubUrl} code={`<Heading level={1}>H1</Heading>\n...\n<Heading level={6}>H6</Heading>`}>
      <div class={`${previewCenter} ${rowWrapCenter}`}>
        {#each levels as lvl}
          <Heading level={lvl}>H{lvl} — The quick brown fox</Heading>
        {/each}
      </div>
    </ComponentPreview>
  </div>

  <!-- Tones -->
  <div class="space-y-2">
    <h2 class="text-lg font-semibold">Tones</h2>
    <ComponentPreview
      {githubUrl}
      code={tones.map(t => `<Heading level={3} tone="${t}">${t} tone</Heading>`).join('\n')}
    >
      <div class={`${previewCenter} ${rowWrapCenter}`}>
        {#each tones as t}
          <Heading level={3} tone={t}>{t} tone</Heading>
        {/each}
      </div>
    </ComponentPreview>
  </div>

  <!-- Alignment -->
  <div class="space-y-2">
    <h2 class="text-lg font-semibold">Alignment</h2>
    <ComponentPreview
      {githubUrl}
      code={`<Heading level={2} align="start">start</Heading>\n<Heading level={2} align="center">center</Heading>\n<Heading level={2} align="end">end</Heading>\n<Heading level={2} align="justify">justify (long)</Heading>`}
    >
      <div class="grid gap-4" style="grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));">
        <div class="p-3 rounded-md border border-[color:var(--color-surface-300)]/60"><Heading level={2} align="start">start</Heading></div>
        <div class="p-3 rounded-md border border-[color:var(--color-surface-300)]/60"><Heading level={2} align="center">center</Heading></div>
        <div class="p-3 rounded-md border border-[color:var(--color-surface-300)]/60"><Heading level={2} align="end">end</Heading></div>
        <div class="p-3 rounded-md border border-[color:var(--color-surface-300)]/60">
          <Heading level={2} align="justify">
            justify • The quick brown fox jumps over the lazy dog and keeps running.
          </Heading>
        </div>
      </div>
    </ComponentPreview>
  </div>

  <!-- Weights & underline -->
  <div class="space-y-2">
    <h2 class="text-lg font-semibold">Weights & Underline</h2>
    <ComponentPreview
      {githubUrl}
      code={`<Heading level={3} weight="normal">normal</Heading>\n<Heading level={3} weight="medium">medium</Heading>\n<Heading level={3} weight="semibold">semibold</Heading>\n<Heading level={3} weight="bold" underline>bold + underline</Heading>`}
    >
      <div class={`${previewCenter} ${rowWrapCenter}`}>
        {#each weights as w}
          <Heading level={3} weight={w}>{w}</Heading>
        {/each}
        <Heading level={3} weight="bold" underline>bold + underline</Heading>
      </div>
    </ComponentPreview>
  </div>

  <!-- Mixed sample with paragraph -->
  <div class="space-y-2">
    <h2 class="text-lg font-semibold">Mixed Sample</h2>
    <ComponentPreview
      {githubUrl}
      code={`<Heading level={1}>Release Notes</Heading>\n<Heading level={2} tone="muted">v0.1.0</Heading>\n<Paragraph>Install with <code>npm i @clothesline/ui</code> and import components.</Paragraph>`}
    >
      <div class="space-y-1">
        <Heading level={1}>Release Notes</Heading>
        <Heading level={2} tone="muted">v0.1.0</Heading>
        <Paragraph>Install with <code>npm i @clothesline/ui</code> and import components.</Paragraph>
      </div>
    </ComponentPreview>
  </div>
</section>
