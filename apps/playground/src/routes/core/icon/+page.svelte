<script lang="ts">
  import { setContext } from 'svelte';
  import { Icon, ICON_REGISTRY_KEY, type IconPathsDef } from '@clothesline/ui';
  import ComponentPreview from '$lib/components/dev/ComponentPreview/ComponentPreview.svelte';

  const githubUrl =
    'https://github.com/ClotheslineStudio/clothesline/blob/main/packages/ui/src/components/core/Icon/Icon.svelte';

  // Minimal registry so name="…" samples render even without an app-level provider
  const registry = new Map<string, IconPathsDef>();
  registry.set('chevron-down', { viewBox: '0 0 24 24', paths: ['M6 9l6 6 6-6'] });
  registry.set('check', { viewBox: '0 0 24 24', paths: ['M5 12l4 4L19 6'] });
  setContext(ICON_REGISTRY_KEY, registry);

  // Code snippets shown in the preview panel
  const codeRegistry = `<script lang="ts">
  import { Icon, ICON_REGISTRY_KEY } from '@clothesline/ui';
  import { setContext } from 'svelte';

  const registry = new Map();
  registry.set('chevron-down', { viewBox: '0 0 24 24', paths: ['M6 9l6 6 6-6'] });
  setContext(ICON_REGISTRY_KEY, registry);
<\/script>

<Icon name="chevron-down" size="24px" ariaLabel="Open" />`;

  const codeColor = `<Icon name="check" size="28" color="var(--color-success-600-vis)" ariaLabel="Success" />`;

  const codePath = `<Icon src="M12 2L2 22h20L12 2z" viewBox="0 0 24 24" strokeWidth={2} ariaLabel="Triangle" />`;

  const codeSizes = `<div class="flex items-center gap-4">
  <Icon name="check" size="16" ariaLabel="Small"/>
  <Icon name="check" size="24" ariaLabel="Medium"/>
  <Icon name="check" size="32" ariaLabel="Large"/>
</div>`;
</script>

<h1 class="text-2xl font-bold mb-4">Icon Component</h1>

<section class="space-y-8">
  <!-- Registry example -->
  <div class="space-y-2">
    <h2 class="text-lg font-semibold">Registry (name)</h2>
    <ComponentPreview {githubUrl} code={codeRegistry}>
      <div class="flex items-center gap-3">
        <Icon name="chevron-down" size="24px" ariaLabel="Open" />
        <span>Chevron Down</span>
      </div>
    </ComponentPreview>
  </div>

  <!-- Color / token example -->
  <div class="space-y-2">
    <h2 class="text-lg font-semibold">Color & Tokens</h2>
    <ComponentPreview {githubUrl} code={codeColor}>
      <div class="flex items-center gap-3">
        <Icon name="check" size="28" color="var(--color-success-600-vis)" ariaLabel="Success" />
        <span>Success (token-driven)</span>
      </div>
    </ComponentPreview>
  </div>

  <!-- Raw path example -->
  <div class="space-y-2">
    <h2 class="text-lg font-semibold">Raw Path (no registry)</h2>
    <ComponentPreview {githubUrl} code={codePath}>
      <div class="flex items-center gap-3">
        <Icon src="M12 2L2 22h20L12 2z" viewBox="0 0 24 24" strokeWidth={2} ariaLabel="Triangle" />
        <span>Custom path</span>
      </div>
    </ComponentPreview>
  </div>

  <!-- Sizes -->
  <div class="space-y-2">
    <h2 class="text-lg font-semibold">Sizes</h2>
    <ComponentPreview {githubUrl} code={codeSizes}>
      <div class="flex items-center gap-4">
        <Icon name="check" size="16" ariaLabel="Small" />
        <Icon name="check" size="24" ariaLabel="Medium" />
        <Icon name="check" size="32" ariaLabel="Large" />
      </div>
    </ComponentPreview>
  </div>
</section>

