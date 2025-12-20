
<script lang="ts">
  import ToolBadge from '$lib/components/ToolBadge.svelte';
  import { tools, type ToolItem } from '$lib/data/tools';

  // Group tools by stack
  const stacks = [
    'Build + Ship',
    'Design',
    'Delivery',
    'Data'
  ] as const;

  function toolsByStack(stack: ToolItem['stack']) {
    return tools.filter(t => t.stack === stack);
  }
</script>

<section style="padding-block: var(--spacing-section, var(--spacing-8));">
    <header style="margin-bottom: var(--spacing-7); display: flex; flex-direction: column; gap: var(--spacing-3);">
    <h1 style="
      color: var(--color-accent-500);
      font-size: clamp(2.2rem, 5vw, 3.5rem);
      font-family: var(--heading-font-family, var(--type-heading-family));
      font-weight: var(--heading-font-weight, 800);
      letter-spacing: var(--heading-letter-spacing, -0.01em);
      line-height: var(--type-heading-leading, 1.08);
      margin-bottom: 0.25em;
    ">Design Engineer</h1>
      <p style="
        max-width: 40rem;
        color: var(--on-surface-muted);
        font-size: var(--type-body-lg, 1.25rem);
        font-family: var(--base-font-family);
        font-weight: var(--base-font-weight);
        letter-spacing: var(--base-letter-spacing);
        line-height: var(--base-line-height);
      ">
        Pixel-to-polish UI, design systems, and websites built to ship.
      </p>
  </header>

  <div style="display: flex; flex-direction: column; gap: var(--spacing-6, 2rem);">
      {#each stacks as stack}
      {#if toolsByStack(stack).length}
        <div class="stack-card" style="padding: var(--spacing-5); border-radius: var(--radius-card); background: var(--color-surface-2); box-shadow: var(--elevation-1);">
          <h2 style="margin-bottom: var(--spacing-3); color: var(--color-accent-400); font-size: var(--type-heading-md, 1.1rem); font-weight: var(--heading-font-weight); letter-spacing: var(--heading-letter-spacing);">{stack}</h2>
          <div style="display: flex; flex-wrap: wrap; gap: var(--spacing-3);">
            {#each toolsByStack(stack) as tool (tool.id)}
              <ToolBadge {...tool} />
            {/each}
          </div>
        </div>
      {/if}
    {/each}
  </div>
</section>
