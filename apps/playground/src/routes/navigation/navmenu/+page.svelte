<script lang="ts">
  import NavMenu from '$lib/components/navigation/NavMenu/NavMenu.svelte';

  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'Components', href: '/components' },
    { label: 'Themes', href: '/themes' },
    { label: 'Docs', href: '/docs' }
  ];
</script>

<h1 class="text-2xl font-bold mb-4">🧭 NavMenu Demo</h1>

<section class="mb-8">
  <h2 class="font-semibold text-lg mb-2">Horizontal Menu</h2>
  <NavMenu items={navItems} orientation="horizontal" />
</section>

<section>
  <h2 class="font-semibold text-lg mb-2">Vertical Menu</h2>
  <NavMenu items={navItems} orientation="vertical" />
</section>
