<script lang="ts">
  import { Timeline, TimelineItem, TimelineNode, TimelineCard } from '@clothesline/ui';
  import { CheckCircle, Play, AlertTriangle } from 'lucide-svelte';

  type TimelineColor = "success" | "info" | "warning" | "error" | "primary" | "secondary" | "neutral" | undefined;

  interface TimelineItemType {
    id: string;
    title: string;
    body: string;
    icon: typeof CheckCircle | typeof Play | typeof AlertTriangle | undefined;
    color: TimelineColor;
  }

  const items: TimelineItemType[] = [
    { id: 'kickoff',  title: 'Kickoff',       body: 'Team aligned on scope, risks, and plan.',  icon: CheckCircle,  color: 'success' },
    { id: 'design',   title: 'Design Review', body: 'First pass at Timeline API + tokens.',     icon: Play,         color: 'info'    },
    { id: 'mvp',      title: 'MVP Demo',      body: 'Playable demo for stakeholders.',          icon: undefined,    color: 'warning' },
    { id: 'qa',       title: 'QA & A11y',     body: 'Axe checks, keyboard nav, snapshots.',     icon: AlertTriangle,color: 'error'   }
  ];
</script>

<h1 class="text-2xl font-bold mb-6">Timeline — grid rail baseline</h1>

<div class="max-w-3xl">
  <Timeline ariaLabel="Project timeline" rail="2.5rem">
    {#each items as it}
      <TimelineItem id={it.id}>
        <svelte:fragment slot="node">
          <TimelineNode color={it.color} icon={it.icon} label={it.title} />
        </svelte:fragment>
        <svelte:fragment slot="card">
          <TimelineCard>
            <h3 slot="header">{it.title}</h3>
            <p class="text-[color:var(--on-surface-muted)]">{it.body}</p>
          </TimelineCard>
        </svelte:fragment>
      </TimelineItem>
    {/each}
  </Timeline>
</div>







