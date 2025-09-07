<script lang="ts">
  import { onMount } from 'svelte';
  import MegaMenu from '$lib/components/navigation/MegaMenu/MegaMenu.svelte';

  let open = false;
  const toggle = () => (open = !open);
</script>

<h1 class="text-2xl font-bold mb-4">🧭 MegaMenu Component Demo</h1>

<MegaMenu label="Explore" {open} onToggle={toggle}>
  <div>
    <h3 class="font-semibold text-sm mb-1">Products</h3>
    <ul class="space-y-1 text-sm">
      <li><a href="/clothesline-ui">Clothesline UI</a></li>
      <li><button type="button" class="text-left w-full">Theme Generator</button></li>
      <li><button type="button" class="text-left w-full">Block Engine</button></li>
    </ul>
  </div>
  <div>
    <h3 class="font-semibold text-sm mb-1">Resources</h3>
    <ul class="space-y-1 text-sm">
      <li><a href="/docs">Docs</a></li>
      <li><a href="/playground">Playground</a></li>
      <li><a href="https://github.com/">GitHub</a></li>
    </ul>
  </div>
</MegaMenu>
