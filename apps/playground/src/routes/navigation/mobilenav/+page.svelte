<script lang="ts">
  import MobileNav from '$lib/components/navigation/MobileNav/MobileNav.svelte';

  let isOpen = false;
  const toggle = () => (isOpen = !isOpen);
</script>

<h1 class="text-2xl font-bold mb-4">📱 MobileNav Component Demo</h1>

<button
  on:click={toggle}
  class="bg-blue-600 text-white px-4 py-2 rounded-md"
>
  Toggle Mobile Nav
</button>

<MobileNav {isOpen} onToggle={toggle}>
  <ul class="space-y-2 text-lg">
    <li><a href="/">🏠 Home</a></li>
    <li><a href="/docs">📚 Docs</a></li>
    <li><a href="/components">🧱 Components</a></li>
    <li><a href="/contact">✉️ Contact</a></li>
  </ul>
</MobileNav>
