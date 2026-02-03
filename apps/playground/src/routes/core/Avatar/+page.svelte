<script lang="ts">
  import { Avatar } from '@clothesline/ui';
  import ComponentPreview from '$lib/components/dev/ComponentPreview/ComponentPreview.svelte';

  const githubUrl =
    'https://github.com/clotheslinestudio/ui/blob/main/src/components/core/Avatar/Avatar.svelte';

  const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const;
  type Size = (typeof sizes)[number];

  const previewRow = 'flex flex-wrap items-center gap-6';

  const labelForSize: Record<Size, string> = {
    xs: 'XS',
    sm: 'SM',
    md: 'MD',
    lg: 'LG',
    xl: 'XL'
  };
</script>

<h1 class="text-2xl font-bold mb-4">Avatar</h1>
<p class="text-sm text-[var(--on-surface-muted)] mb-8">
  Displays a user image or generated initials. Sizes are driven by CSS tokens (no hardcoded rem values).
</p>

<section class="space-y-10">
  <!-- Basic -->
  <div class="space-y-2">
    <h2 class="text-lg font-semibold">Basic</h2>
    <ComponentPreview {githubUrl}>
      <div class={previewRow}>
        <Avatar name="John Doe" />
        <Avatar src="https://i.pravatar.cc/100?img=3" alt="Profile picture" />
      </div>
    </ComponentPreview>
  </div>

  <!-- Sizes -->
  <div class="space-y-2">
    <h2 class="text-lg font-semibold">Sizes</h2>
    <ComponentPreview {githubUrl}>
      <div class="flex flex-wrap items-end gap-8">
        {#each sizes as size}
          <div class="flex flex-col items-center gap-2">
            <Avatar name="Jane Smith" {size} />
            <span class="text-xs text-[var(--on-surface-muted)]">{labelForSize[size]}</span>
          </div>
        {/each}
      </div>
    </ComponentPreview>
  </div>

  <!-- With Images -->
  <div class="space-y-2">
    <h2 class="text-lg font-semibold">With Images</h2>
    <ComponentPreview {githubUrl}>
      <div class={previewRow}>
        {#each sizes as size, i}
          <Avatar src={`https://i.pravatar.cc/150?img=${i + 5}`} alt="User profile" {size} />
        {/each}
      </div>
    </ComponentPreview>
  </div>

  <!-- Initials (edge cases) -->
  <div class="space-y-2">
    <h2 class="text-lg font-semibold">Initials</h2>
    <ComponentPreview {githubUrl}>
      <div class={previewRow}>
        <Avatar name="Alice Wonderland" />
        <Avatar name="Bob Builder" />
        <Avatar name="Charlie" />
        <Avatar name="  Two   Spaces  " />
      </div>
    </ComponentPreview>
  </div>

  <!-- Token note -->
  <div class="space-y-2">
    <h2 class="text-lg font-semibold">Token references</h2>
    <div class="text-sm text-[var(--on-surface-muted)] leading-relaxed">
      <p class="mb-2">
        Avatar styling is controlled via:
      </p>
      <ul class="list-disc pl-6 space-y-1">
        <li><code>--avatar-bg</code>, <code>--avatar-text</code>, <code>--avatar-border</code></li>
        <li>
          <code>--avatar-size-xs</code>…<code>--avatar-size-xl</code> (sourced from the size contract)
        </li>
      </ul>
    </div>
  </div>
</section>

