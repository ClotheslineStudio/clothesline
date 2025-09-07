<script lang="ts">
  import Label from '$lib/components/core/Label/Label.svelte';
</script>

<h1 class="text-2xl font-bold mb-4">Label Component</h1>

<div class="flex flex-col gap-6">

  <div>
    <Label forId="name">Name</Label>
    <input id="name" type="text" class="border px-2 py-1 mt-1 block" />
  </div>

  <div>
    <Label forId="email" required>Email</Label>
    <input id="email" type="email" class="border px-2 py-1 mt-1 block" />
  </div>

  <div>
    <Label forId="search" visuallyHidden>Search</Label>
    <input id="search" type="text" placeholder="Search..." class="border px-2 py-1 mt-1 block" />
    <p class="text-sm text-gray-500 mt-1">This label is hidden visually but still accessible to screen readers.</p>
  </div>

</div>
