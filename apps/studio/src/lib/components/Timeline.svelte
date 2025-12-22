<script context="module" lang="ts">
  export interface TimelineEvent {
    year: number | string;
    title: string;
    description?: string;
  }
</script>

<script lang="ts">
  export let events: TimelineEvent[] = [];
</script>

<div class="timeline py-8">
  <ul class="border-l-2 border-on-surface-muted pl-6">
    {#each events as event}
      <li class="mb-8">
        <div class="text-on-accent font-bold text-lg">{event.year}</div>
        <div class="text-on-surface text-base">{event.title}</div>
        {#if event.description}
          <div class="text-on-surface-muted text-sm mt-1">{event.description}</div>
        {/if}
      </li>
    {/each}
  </ul>
</div>
