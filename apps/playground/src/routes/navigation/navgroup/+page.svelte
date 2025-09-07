<script lang="ts">
  import NavGroup from '$lib/components/navigation/NavGroup/NavGroup.svelte';
</script>

<h1 class="text-2xl font-bold mb-4">📂 NavGroup Component Demo</h1>

<NavGroup title="Components">
  <li><a href="/core/button">🔘 Button</a></li>
  <li><a href="/core/badge">🏷️ Badge</a></li>
  <li><a href="/core/avatar">🧑 Avatar</a></li>
</NavGroup>

<NavGroup title="Layouts" open={true}>
  <li><a href="/layout/card">📦 Card</a></li>
  <li><a href="/layout/header">📏 Header</a></li>
</NavGroup>
