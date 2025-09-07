<script lang="ts">
  import Breadcrumbs from '$lib/components/navigation/Breadcrumbs/Breadcrumbs.svelte';

  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'Docs', href: '/docs' },
    { label: 'Components', href: '/docs/components' },
    { label: 'Breadcrumbs' } // current page
  ];
</script>

<h1 class="text-2xl font-bold mb-4">🧭 Breadcrumbs Demo</h1>

<Breadcrumbs items={navItems} />
