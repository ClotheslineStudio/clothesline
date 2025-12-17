<script lang="ts">
  import { Divider } from '@clothesline/ui';
  import ComponentPreview from '$lib/components/dev/ComponentPreview/ComponentPreview.svelte';

  const githubUrl =
    'https://github.com/clotheslinestudio/ui/blob/main/src/components/core/Divider/Divider.svelte';

  const variants = ['solid', 'dashed', 'dotted', 'soft'] as const;
  const aligns = ['start', 'center', 'end'] as const;
  const thicknesses = ['hairline', 'sm', 'md', 'lg', 'xl'] as const;
  const spaces = ['none', 'sm', 'md', 'lg'] as const;

  const previewStack = 'w-full space-y-4';
  const previewStackLoose = 'w-full space-y-6';
</script>

<header class="cl-page-head">
  <h1 class="cl-h1">Divider</h1>
  <p class="cl-lede">
    Accessible separators with token-driven thickness, spacing, variants, and optional labels.
  </p>
</header>

<section class="cl-section space-y-10">
  <!-- Basic -->
  <div class="space-y-2">
    <h2 class="cl-h2">Basic</h2>
    <ComponentPreview {githubUrl} code={`<Divider />`}>
      <div class={previewStack}>
        <p class="cl-body">Above</p>
        <Divider />
        <p class="cl-body">Below</p>
      </div>
    </ComponentPreview>
  </div>

  <!-- Variants -->
  <div class="space-y-2">
    <h2 class="cl-h2">Variants</h2>
    <ComponentPreview {githubUrl} code={variants.map((v) => `<Divider variant="${v}" />`).join('\n')}>
      <div class={previewStackLoose}>
        {#each variants as v}
          <div class="space-y-2">
            <p class="cl-meta">variant="{v}"</p>
            <Divider variant={v} />
          </div>
        {/each}
      </div>
    </ComponentPreview>
  </div>

  <!-- Label + alignment -->
  <div class="space-y-2">
    <h2 class="cl-h2">Label and alignment</h2>
    <ComponentPreview
      {githubUrl}
      code={aligns.map((a) => `<Divider label="Section" align="${a}" />`).join('\n')}
    >
      <div class="w-full space-y-5">
        {#each aligns as a}
          <Divider label="Section" align={a} />
        {/each}
      </div>
    </ComponentPreview>
  </div>

  <!-- Vertical -->
  <div class="space-y-2">
    <h2 class="cl-h2">Vertical</h2>
    <ComponentPreview
      {githubUrl}
      code={`<div class="flex items-center gap-4 h-16">
  <span>Left</span>
  <Divider orientation="vertical" />
  <span>Right</span>
</div>`}
    >
      <div class="flex items-center gap-4 h-16">
        <span class="cl-body">Left</span>
        <Divider orientation="vertical" />
        <span class="cl-body">Right</span>
      </div>
    </ComponentPreview>
  </div>

  <!-- Thickness + spacing -->
  <div class="space-y-2">
    <h2 class="cl-h2">Thickness and spacing</h2>
    <ComponentPreview
      {githubUrl}
      code={thicknesses.map((t) => `<Divider thickness="${t}" space="sm" />`).join('\n')}
    >
      <div class="w-full space-y-6">
        {#each thicknesses as t}
          <div class="space-y-2">
            <p class="cl-meta">thickness="{t}"</p>
            <Divider thickness={t} space="sm" />
          </div>
        {/each}
      </div>
    </ComponentPreview>
  </div>

  <!-- Spacing scale -->
  <div class="space-y-2">
    <h2 class="cl-h2">Spacing scale</h2>
    <ComponentPreview
      {githubUrl}
      code={spaces.map((s) => `<Divider space="${s}" />`).join('\n')}
    >
      <div class="w-full">
        {#each spaces as s}
          <div class="space-y-2">
            <p class="cl-meta">space="{s}"</p>
            <p class="cl-body">Above</p>
            <Divider space={s} />
            <p class="cl-body">Below</p>
          </div>

          <!-- spacer between examples -->
          <div style="height: var(--spacing-5)"></div>
        {/each}
      </div>
    </ComponentPreview>
  </div>

  <!-- Decorative -->
  <div class="space-y-2">
    <h2 class="cl-h2">Decorative</h2>
    <ComponentPreview {githubUrl} code={`<Divider decorative />`}>
      <div class={previewStack}>
        <p class="cl-body">Above</p>
        <Divider decorative />
        <p class="cl-body">Below</p>
      </div>
    </ComponentPreview>
  </div>

  <!-- Token color override (tokens only) -->
  <div class="space-y-2">
    <h2 class="cl-h2">Token color override</h2>
    <ComponentPreview
      {githubUrl}
      code={`<Divider color="var(--border-color-default)" />
<Divider color="var(--border-color-muted)" variant="soft" />
<Divider color="var(--color-primary-300-vis)" />`}
    >
      <div class="w-full space-y-6">
        <div class="space-y-2">
          <p class="cl-meta">color="--border-color-default"</p>
          <Divider color="var(--border-color-default)" />
        </div>

        <div class="space-y-2">
          <p class="cl-meta">color="--border-color-muted" variant="soft"</p>
          <Divider color="var(--border-color-muted)" variant="soft" />
        </div>

        <div class="space-y-2">
          <p class="cl-meta">color="--color-primary-300-vis"</p>
          <Divider color="var(--color-primary-300-vis)" />
        </div>
      </div>
    </ComponentPreview>
  </div>
</section>

<style>
  /* Page typography: token-driven (no Tailwind typography utilities) */
  .cl-page-head {
    margin-bottom: var(--spacing-6);
  }

  .cl-h1 {
    margin: 0 0 var(--spacing-2);
    color: var(--heading-font-color, var(--base-font-color));
    font-family: var(--type-display-family);
    font-size: var(--type-display-size);
    font-weight: var(--type-display-weight);
    letter-spacing: var(--type-display-tracking);
    line-height: var(--type-display-leading);
    text-transform: var(--type-display-transform);
  }

  .cl-h2 {
    margin: 0 0 var(--spacing-2);
    color: var(--heading-font-color, var(--base-font-color));
    font-family: var(--type-heading-family);
    font-size: var(--type-heading-size);
    font-weight: var(--type-heading-weight);
    letter-spacing: var(--type-heading-tracking);
    line-height: var(--type-heading-leading);
    text-transform: var(--type-heading-transform);
  }

  .cl-lede {
    margin: 0;
    color: var(--text-muted, var(--on-surface-muted));
    font-family: var(--type-body-family);
    font-size: var(--type-body-size);
    font-weight: var(--type-body-weight);
    letter-spacing: var(--type-body-tracking);
    line-height: var(--type-body-leading);
  }

  .cl-body {
    color: var(--base-font-color);
    font-family: var(--type-body-family);
    font-size: var(--type-body-size);
    font-weight: var(--type-body-weight);
    letter-spacing: var(--type-body-tracking);
    line-height: var(--type-body-leading);
  }

  .cl-meta {
    margin: 0;
    color: var(--text-muted, var(--on-surface-muted));
    font-family: var(--type-caption-family);
    font-size: var(--type-caption-size);
    font-weight: var(--type-caption-weight);
    letter-spacing: var(--type-caption-tracking);
    line-height: var(--type-caption-leading);
    text-transform: var(--type-caption-transform);
  }
</style>
