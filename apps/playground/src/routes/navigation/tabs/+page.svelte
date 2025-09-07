<script lang="ts">
  import Tabs from '$lib/components/navigation/Tabs/Tabs.svelte';

  let activeTab = 'overview';

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'features', label: 'Features' },
    { id: 'reviews', label: 'Reviews' },
    { id: 'support', label: 'Support' }
  ];

  function handleTabChange(id: string) {
    activeTab = id;
  }
</script>

<section class="p-6 space-y-4">
  <h1 class="text-2xl font-bold">Tabs Demo</h1>
  <Tabs {tabs} {activeTab} onChange={handleTabChange} />

  <div class="mt-4 p-4 border rounded bg-surface-50">
    {#if activeTab === 'overview'}
      <p>This is the overview content.</p>
    {:else if activeTab === 'features'}
      <p>Feature details go here.</p>
    {:else if activeTab === 'reviews'}
      <p>User reviews are displayed in this section.</p>
    {:else if activeTab === 'support'}
      <p>Support and contact info goes here.</p>
    {/if}
  </div>
</section>
