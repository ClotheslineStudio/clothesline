<script lang="ts">
  import SideNav from '$lib/components/navigation/SideNav/SideNav.svelte';

  const navSections = [
    {
      label: 'Core',
      items: [
        { label: 'Button', href: '/core/button' },
        { label: 'Divider', href: '/core/divider' }
      ]
    },
    {
      label: 'Navigation',
      items: [
        { label: 'Pagination', href: '/navigation/pagination' },
        { label: 'SideNav', href: '/navigation/sidenav' }
      ],
      collapsed: true
    }
  ];
</script>

<div class="flex gap-8">
  <SideNav sections={navSections} />

  <main class="p-4">
    <h1 class="text-2xl font-bold mb-2">📚 SideNav Demo</h1>
    <p>This is a demonstration of the <code>&lt;SideNav&gt;</code> component in action.</p>
    <p>The active route is highlighted, and sections can be toggled.</p>
  </main>
</div>
