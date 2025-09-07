<script lang="ts">
  export let items: {
    title: string;
    description?: string;
    date?: string;
    icon?: string;
    status?: 'completed' | 'in-progress' | 'upcoming';
  }[] = [];

  export let className = '';
</script>

<ul class="cl-timeline {className}">
  {#each items as item, i}
    <li class="cl-timeline-item {item.status ?? ''}">
      <div class="cl-timeline-marker">
        {#if item.icon}
          <img src={item.icon} alt="" />
        {:else}
          <div class="cl-timeline-dot"></div>
        {/if}
      </div>
      <div class="cl-timeline-content">
        <div class="cl-timeline-title">{item.title}</div>
        {#if item.description}
          <div class="cl-timeline-description">{item.description}</div>
        {/if}
        {#if item.date}
          <div class="cl-timeline-date">{item.date}</div>
        {/if}
      </div>
    </li>
  {/each}
</ul>

<style>
  .cl-timeline {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-4, 1rem);
    padding-left: 1rem;
    position: relative;
  }

  .cl-timeline::before {
    content: '';
    position: absolute;
    left: 0.75rem;
    top: 0;
    bottom: 0;
    width: 2px;
    background: var(--border-default-color, #ddd);
  }

  .cl-timeline-item {
    display: flex;
    gap: 1rem;
    position: relative;
  }

  .cl-timeline-marker {
    position: relative;
    flex-shrink: 0;
    width: 1.5rem;
    height: 1.5rem;
  }

  .cl-timeline-marker img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  .cl-timeline-dot {
    width: 1rem;
    height: 1rem;
    background: var(--color-primary-500, #555);
    border-radius: 50%;
    margin-top: 0.25rem;
  }

  .cl-timeline-content {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  .cl-timeline-title {
    font-weight: 600;
    color: var(--base-font-color, #111);
  }

  .cl-timeline-description {
    font-size: 0.875rem;
    color: var(--muted-foreground, #666);
  }

  .cl-timeline-date {
    font-size: 0.75rem;
    color: var(--muted-foreground, #999);
  }

  .cl-timeline-item.completed .cl-timeline-dot {
    background: var(--color-success-600, green);
  }

  .cl-timeline-item.in-progress .cl-timeline-dot {
    background: var(--color-warning-600, orange);
  }

  .cl-timeline-item.upcoming .cl-timeline-dot {
    background: var(--color-neutral-400, #ccc);
  }
</style>
