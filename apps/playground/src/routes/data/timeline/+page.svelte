<script lang="ts">
  import Timeline from '$lib/components/data/Timeline/Timeline.svelte';

  const items: {
    title: string;
    description: string;
    date: string;
    status: "completed" | "in-progress" | "upcoming";
  }[] = [
    {
      title: 'Design Phase Complete',
      description: 'Final mockups delivered to dev team.',
      date: '2025-08-01',
      status: 'completed'
    },
    {
      title: 'Development Started',
      description: 'Core layout and components in progress.',
      date: '2025-08-03',
      status: 'in-progress'
    },
    {
      title: 'QA Review',
      description: 'Testing and accessibility checks.',
      date: '2025-08-08',
      status: 'upcoming'
    },
    {
      title: 'Launch',
      description: 'Version 1.0 release to production.',
      date: '2025-08-15',
      status: 'upcoming'
    }
  ];
</script>

<h1 class="text-2xl font-bold mb-4">Timeline Component</h1>

<Timeline {items} />
