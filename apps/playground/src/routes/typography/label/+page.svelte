<!-- apps/playground/src/routes/playground/typography/label/+page.svelte -->
<script lang="ts">
  import { Label, Paragraph } from '@clothesline/ui';
  import ComponentPreview from '$lib/components/dev/ComponentPreview/ComponentPreview.svelte';

  const githubUrl =
    'https://github.com/clotheslinestudio/ui/blob/main/src/components/typography/Label/Label.svelte';

  const tones = ['default','muted','primary','success','warning','error','info'] as const;

  const field = (id: string, label: string) => `
<Label forId="${id}">${label}</Label>
<input id="${id}" class="px-3 py-2 rounded border border-[color:var(--color-surface-400)] bg-[color:var(--color-surface-500)] dark:bg-[color:var(--color-surface-500)]" />
`.trim();
</script>

<h1 class="text-2xl font-bold mb-4">Label Component</h1>

<section class="space-y-10">
  <!-- Basic -->
  <div class="space-y-2">
    <h2 class="text-lg font-semibold">Basic</h2>
    <ComponentPreview {githubUrl} code={field('email','Email')}>
      <div class="space-y-2">
        <Label forId="email">Email</Label>
        <input id="email" type="email" placeholder="you@site.com"
          class="px-3 py-2 rounded border border-[color:var(--color-surface-200)] bg-[color:var(--color-surface-50)] dark:bg-[color:var(--color-surface-900)]" />
      </div>
    </ComponentPreview>
  </div>

  <!-- Required & Optional -->
  <div class="space-y-2">
    <h2 class="text-lg font-semibold">Required & Optional</h2>
    <ComponentPreview
      {githubUrl}
      code={`<Label forId="name" required>Name</Label>\n<input id="name" />\n\n<Label htmlFor="company" optional>Company</Label>\n<input id="company" />`}
    >
      <div class="grid gap-4" style="grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));">
        <div class="space-y-2">
          <Label forId="name" required>Name</Label>
          <input id="name" class="px-3 py-2 rounded border border-[color:var(--color-surface-400)] bg-[color:var(--color-surface-50)] dark:bg-[color:var(--color-surface-900)]" />
        </div>
        <div class="space-y-2">
          <Label htmlFor="company" optional>Company</Label>
          <input id="company" class="px-3 py-2 rounded border border-[color:var(--color-surface-400)] bg-[color:var(--color-surface-50)] dark:bg-[color:var(--color-surface-900)]" />
        </div>
      </div>
    </ComponentPreview>
  </div>

  <!-- Tones -->
  <div class="space-y-2">
    <h2 class="text-lg font-semibold">Tones</h2>
    <ComponentPreview
      {githubUrl}
      code={tones.map(t => `<Label htmlFor="ex-${t}" tone="${t}">${t}</Label>`).join('\n')}
    >
      <div class="flex flex-wrap items-start justify-center gap-5">
        {#each tones as t}
          <div class="flex flex-col gap-1 items-start">
            <Label htmlFor={`ex-${t}`} tone={t}>{t}</Label>
            <input id={`ex-${t}`} placeholder={t}
              class="px-3 py-2 rounded border border-[color:var(--color-surface-400)] bg-[color:var(--color-surface-50)] dark:bg-[color:var(--color-surface-900)]" />
          </div>
        {/each}
      </div>
    </ComponentPreview>
  </div>

  <!-- Visually hidden label -->
  <div class="space-y-2">
    <h2 class="text-lg font-semibold">Visually Hidden</h2>
    <ComponentPreview
      {githubUrl}
      code={`<Label htmlFor="search" visuallyHidden>Search</Label>\n<input id="search" placeholder="Search…" />`}
    >
      <div class="space-y-2">
        <Label htmlFor="search" visuallyHidden>Search</Label>
        <input id="search" placeholder="Search…" class="px-3 py-2 rounded border border-[color:var(--color-surface-400)] bg-[color:var(--color-surface-50)] dark:bg-[color:var(--color-surface-900)]" />
        <Paragraph tone="muted">Label is available to screen readers but hidden visually.</Paragraph>
      </div>
    </ComponentPreview>
  </div>
</section>

