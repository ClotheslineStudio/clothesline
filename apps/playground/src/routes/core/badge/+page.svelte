<script lang="ts">
  import { Badge } from '@clothesline/ui';
  import ComponentPreview from '$lib/components/dev/ComponentPreview/ComponentPreview.svelte';

  const githubUrl =
    'https://github.com/clotheslinestudio/ui/blob/main/src/components/core/Badge/Badge.svelte';

  const variants = [
    'primary',
    'secondary',
    'tertiary',
    'success',
    'warning',
    'error',
    'info',
    'accent',
    'neutral'
  ] as const;

  const sizes = ['sm', 'md', 'lg'] as const;
  const appearances = ['solid', 'outline', 'soft'] as const;
</script>

<h1 class="page-title">Badge Component</h1>

<section class="page">
  <!-- Basic -->
  <div class="block">
    <h2 class="section-title">Basic</h2>
    <ComponentPreview
      {githubUrl}
      code={`<Badge>Default</Badge>
<Badge variant="success">Success</Badge>
<Badge variant="error">Error</Badge>`}
    >
      <div class="preview preview--center">
        <div class="row row--wrap row--center">
          <Badge>Default</Badge>
          <Badge variant="success">Success</Badge>
          <Badge variant="error">Error</Badge>
        </div>
      </div>
    </ComponentPreview>
  </div>

  <!-- Variants -->
  <div class="block">
    <h2 class="section-title">Variants</h2>
    <ComponentPreview
      {githubUrl}
      code={variants.map((v) => `<Badge variant="${v}">${v}</Badge>`).join('\n')}
    >
      <div class="preview preview--center">
        <div class="row row--wrap row--center">
          {#each variants as variant}
            <Badge {variant}>{variant}</Badge>
          {/each}
        </div>
      </div>
    </ComponentPreview>
  </div>

  <!-- Sizes -->
  <div class="block">
    <h2 class="section-title">Sizes</h2>
    <ComponentPreview
      {githubUrl}
      code={sizes.map((s) => `<Badge size="${s}">Size ${s}</Badge>`).join('\n')}
    >
      <div class="preview preview--center">
        <div class="row row--wrap row--center">
          {#each sizes as size}
            <Badge size={size}>Size {size}</Badge>
          {/each}
        </div>
      </div>
    </ComponentPreview>
  </div>

  <!-- Appearances -->
  <div class="block">
    <h2 class="section-title">Appearances</h2>
    <ComponentPreview
      {githubUrl}
      code={appearances.map((a) => `<Badge appearance="${a}">${a}</Badge>`).join('\n')}
    >
      <div class="preview preview--center">
        <div class="row row--wrap row--center">
          {#each appearances as appearance}
            <Badge appearance={appearance}>{appearance}</Badge>
          {/each}
        </div>
      </div>
    </ComponentPreview>
  </div>

  <!-- Pill -->
  <div class="block">
    <h2 class="section-title">Pill</h2>
    <ComponentPreview
      {githubUrl}
      code={variants.map((v) => `<Badge variant="${v}" pill>${v}</Badge>`).join('\n')}
    >
      <div class="preview preview--center">
        <div class="row row--wrap row--center">
          {#each variants as variant}
            <Badge variant={variant} pill>{variant}</Badge>
          {/each}
        </div>
      </div>
    </ComponentPreview>
  </div>

  <!-- Removable -->
  <div class="block">
    <h2 class="section-title">Removable</h2>
    <ComponentPreview
      {githubUrl}
      code={`<Badge removable onRemove={() => alert('Removed!')}>Tag 1</Badge>
<Badge removable onRemove={() => alert('Removed!')}>Tag 2</Badge>`}
    >
      <div class="preview preview--center">
        <div class="row row--wrap row--center">
          <Badge removable onRemove={() => alert('Removed!')}>Tag 1</Badge>
          <Badge removable onRemove={() => alert('Removed!')}>Tag 2</Badge>
        </div>
      </div>
    </ComponentPreview>
  </div>
</section>

<style>
  /* Page rhythm (token-only) */
  .page {
    display: grid;
    gap: var(--spacing-10, 3rem);
  }

  .block {
    display: grid;
    gap: var(--spacing-2, 0.5rem);
  }

  /* Titles (token-only typography) */
.page-title {
  margin: 0 0 var(--spacing-4) 0;

  /* Theme foundation bridge first (theme-controlled), then fall back to global type tokens */
  font-family: var(--heading-font-family, var(--type-heading-family));
  font-weight: var(--heading-font-weight, var(--type-heading-weight));
  letter-spacing: var(--heading-letter-spacing, var(--type-heading-tracking));
  line-height: var(--type-display-leading, var(--type-heading-leading));

  /* Size should be global scale unless you add per-theme heading sizing */
  font-size: var(--type-scale-3xl);

  /* Theme-mode-aware heading color */
  color: var(--heading-font-color);
}

html[data-mode='dark'] .page-title {
  color: var(--heading-font-color-dark, var(--heading-font-color));
}

.section-title {
  margin: 0;

  font-family: var(--heading-font-family, var(--type-heading-family));
  font-weight: var(--heading-font-weight, var(--type-heading-weight));
  letter-spacing: var(--heading-letter-spacing, var(--type-heading-tracking));
  line-height: var(--type-heading-leading);

  font-size: var(--type-scale-xl);

  color: var(--heading-font-color);
}

html[data-mode='dark'] .section-title {
  color: var(--heading-font-color-dark, var(--heading-font-color));
}


  /* Preview layout helpers (token-only) */
  .preview {
    min-height: var(--size-24, 6rem);
    display: flex;
  }

  .preview--center {
    align-items: center;
    justify-content: center;
  }

  .row {
    display: flex;
    align-items: center;
    gap: var(--spacing-3, 0.75rem);
  }

  .row--wrap {
    flex-wrap: wrap;
  }

  .row--center {
    justify-content: center;
  }
</style>


