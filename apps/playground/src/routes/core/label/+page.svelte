<script lang="ts">
  import { Label } from '@clothesline/ui';
  import ComponentPreview from '$lib/components/dev/ComponentPreview/ComponentPreview.svelte';

  const githubUrl =
    'https://github.com/clotheslinestudio/ui/blob/main/src/components/core/Label/Label.svelte';

  // Utility classes (match your Button page vibe)
  const previewCenter = 'flex items-center justify-center min-h-24';
  const field = 'flex flex-col gap-2';
  const inputBase = 'border rounded p-2 w-64';
</script>

<h1 class="text-2xl font-bold mb-4">Label Component</h1>

<section class="space-y-10">
  <!-- Basic -->
  <div class="space-y-2">
    <h2 class="text-lg font-semibold">Basic</h2>
    <ComponentPreview
      {githubUrl}
      code={`<Label forId="username">Username</Label>
<input id="username" type="text" class="border p-2 rounded" />`}
    >
      <div class={previewCenter}>
        <div class={field}>
          <Label forId="username">Username</Label>
          <input id="username" type="text" class={inputBase} />
        </div>
      </div>
    </ComponentPreview>
  </div>

  <!-- Required -->
  <div class="space-y-2">
    <h2 class="text-lg font-semibold">Required</h2>
    <ComponentPreview
      {githubUrl}
      code={`<Label forId="email" required>Email</Label>
<input id="email" type="email" required class="border p-2 rounded" />`}
    >
      <div class={previewCenter}>
        <div class={field}>
          <Label forId="email" required>Email</Label>
          <input id="email" type="email" required class={inputBase} />
        </div>
      </div>
    </ComponentPreview>
  </div>

  <!-- Visually Hidden -->
  <div class="space-y-2">
    <h2 class="text-lg font-semibold">Visually Hidden</h2>
    <ComponentPreview
      {githubUrl}
      code={`<Label forId="search" visuallyHidden>Search</Label>
<input id="search" type="text" placeholder="Search…" class="border p-2 rounded" />`}
    >
      <div class={previewCenter}>
        <div class={field}>
          <Label forId="search" visuallyHidden>Search</Label>
          <input id="search" type="text" placeholder="Search…" class={inputBase} />
        </div>
      </div>
    </ComponentPreview>
  </div>

  <!-- Custom Class -->
  <div class="space-y-2">
    <h2 class="text-lg font-semibold">Custom Class</h2>
    <ComponentPreview
      {githubUrl}
      code={`<Label forId="nickname" className="text-blue-600 uppercase tracking-wide">
  Nickname
</Label>
<input id="nickname" type="text" class="border p-2 rounded" />`}
    >
      <div class={previewCenter}>
        <div class={field}>
          <Label forId="nickname" className="text-blue-600 uppercase tracking-wide">
            Nickname
          </Label>
          <input id="nickname" type="text" class={inputBase} />
        </div>
      </div>
    </ComponentPreview>
  </div>

  <!-- Checkbox & Radio -->
  <div class="space-y-2">
    <h2 class="text-lg font-semibold">Checkbox & Radio</h2>
    <ComponentPreview
      {githubUrl}
      code={`<input id="tos" type="checkbox" />
<Label forId="tos">I agree to the Terms</Label>

<input id="ship" name="method" type="radio" value="ship" />
<Label forId="ship">Ship to address</Label>

<input id="pickup" name="method" type="radio" value="pickup" />
<Label forId="pickup">Store pickup</Label>`}
    >
      <div class={previewCenter}>
        <div class="flex flex-col gap-3">
          <div class="flex items-center gap-2">
            <input id="tos" type="checkbox" />
            <Label forId="tos">I agree to the Terms</Label>
          </div>

          <div class="flex items-center gap-2">
            <input id="ship" name="method" type="radio" value="ship" />
            <Label forId="ship">Ship to address</Label>
          </div>

          <div class="flex items-center gap-2">
            <input id="pickup" name="method" type="radio" value="pickup" />
            <Label forId="pickup">Store pickup</Label>
          </div>
        </div>
      </div>
    </ComponentPreview>
  </div>
</section>


