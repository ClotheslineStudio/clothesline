<script lang="ts">
  import { Button } from '@clothesline/ui';
  import ComponentPreview from '$lib/components/dev/ComponentPreview/ComponentPreview.svelte';

  const githubUrl =
    'https://github.com/clotheslinestudio/ui/blob/main/src/components/core/Button/Button.svelte';

  const colors = [
    'primary',
    'secondary',
    'success',
    'warning',
    'error',
    'info',
    'neutral'
  ] as const;

  const sizes = ['sm', 'md', 'lg'] as const;
  const variants = ['solid', 'outline', 'ghost', 'link'] as const;

  // Utility classes to keep previews consistent with other pages
  const previewCenter = 'flex items-center justify-center min-h-24';
  const rowWrapCenter = 'flex flex-wrap items-center justify-center gap-3';
</script>

<h1 class="text-2xl font-bold mb-4">Button Component</h1>

<section class="space-y-10">
  <!-- Basic -->
  <div class="space-y-2">
    <h2 class="text-lg font-semibold">Basic</h2>
    <ComponentPreview
      {githubUrl}
      code={`<Button>Default</Button>\n<Button color=\"success\">Success</Button>\n<Button color=\"error\">Error</Button>`}
    >
      <div class={`${previewCenter} ${rowWrapCenter}`}>
        <Button ariaLabel="Default" href={undefined} target={undefined} rel={undefined}>Default</Button>
        <Button color="success" ariaLabel="Success" href={undefined} target={undefined} rel={undefined}>Success</Button>
        <Button color="error" ariaLabel="Error" href={undefined} target={undefined} rel={undefined}>Error</Button>
      </div>
    </ComponentPreview>
  </div>

  <!-- Colors -->
  <div class="space-y-2">
    <h2 class="text-lg font-semibold">Colors (roles)</h2>
    <ComponentPreview
      {githubUrl}
      code={colors.map(c => `<Button color=\"${c}\">${c}</Button>`).join('\n')}
    >
      <div class={`${previewCenter} ${rowWrapCenter}`}>
        {#each colors as color}
          <Button {color} ariaLabel={color} href={undefined} target={undefined} rel={undefined}>{color}</Button>
        {/each}
      </div>
    </ComponentPreview>
  </div>

  <!-- Variants -->
  <div class="space-y-2">
    <h2 class="text-lg font-semibold">Variants</h2>
    <ComponentPreview
      {githubUrl}
      code={`<Button color=\"primary\" variant=\"solid\">primary • solid</Button>\n<Button color=\"primary\" variant=\"outline\">primary • outline</Button>\n<Button color=\"primary\" variant=\"ghost\">primary • ghost</Button>\n<Button color=\"primary\" variant=\"link\">primary • link</Button>`}
    >
      <div class={`${previewCenter} ${rowWrapCenter}`}>
        <Button color="primary" variant="solid" ariaLabel="primary solid" href={undefined} target={undefined} rel={undefined}>primary • solid</Button>
        <Button color="primary" variant="outline" ariaLabel="primary outline" href={undefined} target={undefined} rel={undefined}>primary • outline</Button>
        <Button color="primary" variant="ghost" ariaLabel="primary ghost" href={undefined} target={undefined} rel={undefined}>primary • ghost</Button>
        <Button color="primary" variant="link" ariaLabel="primary link" href={undefined} target={undefined} rel={undefined}>primary • link</Button>
      </div>
    </ComponentPreview>
  </div>

  <!-- Sizes -->
  <div class="space-y-2">
    <h2 class="text-lg font-semibold">Sizes</h2>
    <ComponentPreview
      {githubUrl}
      code={sizes.map(s => `<Button size=\"${s}\">Size ${s}</Button>`).join('\n')}
    >
      <div class={`${previewCenter} ${rowWrapCenter}`}>
        {#each sizes as size}
          <Button {size} ariaLabel={`Size ${size}`} href={undefined} target={undefined} rel={undefined}>Size {size}</Button>
        {/each}
      </div>
    </ComponentPreview>
  </div>

  <!-- States -->
  <div class="space-y-2">
    <h2 class="text-lg font-semibold">States</h2>
    <ComponentPreview
      {githubUrl}
      code={`<Button disabled>Disabled</Button>\n<Button loading ariaLabel=\"Loading\">Loading</Button>`}
    >
      <div class={`${previewCenter} ${rowWrapCenter}`}>
        <Button disabled ariaLabel="Disabled" href={undefined} target={undefined} rel={undefined}>Disabled</Button>
        <Button loading ariaLabel="Loading" href={undefined} target={undefined} rel={undefined}>Loading</Button>
      </div>
    </ComponentPreview>
  </div>

  <!-- With icons (slots) -->
  <div class="space-y-2">
    <h2 class="text-lg font-semibold">With Icons</h2>
    <ComponentPreview
      {githubUrl}
      code={`<Button>\n  <span slot=\"icon-left\">🔍</span>Search\n</Button>\n<Button color=\"success\">\n  Save<span slot=\"icon-right\">✔️</span>\n</Button>`}
    >
      <div class={`${previewCenter} ${rowWrapCenter}`}>
        <Button ariaLabel="Search" href={undefined} target={undefined} rel={undefined}>
          <span slot="icon-left">🔍</span>
          Search
        </Button>
        <Button color="success" ariaLabel="Save" href={undefined} target={undefined} rel={undefined}>
          Save
          <span slot="icon-right">✔️</span>
        </Button>
      </div>
    </ComponentPreview>
  </div>

  <!-- As link -->
  <div class="space-y-2">
    <h2 class="text-lg font-semibold">As Link</h2>
    <ComponentPreview
      {githubUrl}
      code={`<Button variant=\"link\" href=\"/docs\">Docs</Button>\n<Button variant=\"link\" href=\"https://clothesline.style\" target=\"_blank\" rel=\"noreferrer noopener\">External</Button>`}
    >
      <div class={`${previewCenter} ${rowWrapCenter}`}>
        <Button variant="link" href="/docs" ariaLabel="Docs" target={undefined} rel={undefined}>Docs</Button>
        <Button variant="link" href="https://clothesline.style" target="_blank" rel="noreferrer noopener" ariaLabel="External">External</Button>
      </div>
    </ComponentPreview>
  </div>

  <!-- Full demo grid (roles × variants) -->
  <div class="space-y-2">
    <h2 class="text-lg font-semibold">Roles × Variants</h2>
    <ComponentPreview
      {githubUrl}
      code={`<!-- grid of colors × variants -->`}
    >
      <div class="grid gap-4" style="grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));">
        {#each colors as color}
          <div class="p-3 rounded-md border border-[color:var(--color-surface-300)]/60">
            <div class="text-sm font-medium mb-2">{color}</div>
            <div class="flex flex-wrap gap-3">
              {#each variants as variant}
                <Button {color} {variant} ariaLabel={`${color} ${variant}`} href={undefined} target={undefined} rel={undefined}>{variant}</Button>
              {/each}
            </div>
          </div>
        {/each}
      </div>
    </ComponentPreview>
  </div>
</section>







