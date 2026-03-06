<script lang="ts">
  import { Tabs, Card, Paragraph } from '@clothesline/ui';

  let activeTab = 'overview';
  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'api', label: 'API' },
    { id: 'examples', label: 'Examples' }
  ];
</script>

<div class="tabs-demo">
  <Tabs {tabs} {activeTab} onChange={(id) => (activeTab = id)} />
  <Card padding="md" shadow="none">
    <Paragraph>
      Active tab: <strong>{activeTab}</strong>
    </Paragraph>
  </Card>
</div>

<style>
  .tabs-demo {
    display: grid;
    gap: var(--spacing-4, 1rem);
  }
</style>
