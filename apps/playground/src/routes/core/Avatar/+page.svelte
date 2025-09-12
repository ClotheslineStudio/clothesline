<script lang="ts">
  import { Avatar } from '@clothesline/ui';
  import ComponentPreview from '$lib/components/dev/ComponentPreview/ComponentPreview.svelte';

  const githubUrl =
    'https://github.com/clotheslinestudio/ui/blob/main/src/components/core/Avatar/Avatar.svelte';

  const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const;

  const previewRow = 'flex flex-wrap items-center gap-6';
</script>

<h1 class="text-2xl font-bold mb-4">Avatar Component</h1>

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
      <div class={previewRow}>
        {#each sizes as size}
          <Avatar name="Jane Smith" {size} />
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
          <Avatar
            src={`https://i.pravatar.cc/150?img=${i + 5}`}
            alt="User profile"
            {size}
          />
        {/each}
      </div>
    </ComponentPreview>
  </div>

  <!-- Initials -->
  <div class="space-y-2">
    <h2 class="text-lg font-semibold">Initials</h2>
    <ComponentPreview {githubUrl}>
      <div class={previewRow}>
        <Avatar name="Alice Wonderland" />
        <Avatar name="Bob Builder" />
        <Avatar name="Charlie" />
      </div>
    </ComponentPreview>
  </div>
</section>
