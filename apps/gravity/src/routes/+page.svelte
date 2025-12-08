<script lang="ts">
  const steps = [
    {
      title: 'Import a toolkit or framework',
      description: 'Bring in ESSA, IDEA, CEDS, or your own frameworks as structured toolkits.'
    },
    {
      title: 'Map requirements to your world',
      description: 'Connect toolkit items to your existing plans, owners, and evidence.'
    },
    {
      title: 'Turn mappings into plans',
      description: 'Generate boards and tasks your team can actually work from.'
    },
    {
      title: 'Track progress & evidence',
      description: 'Attach artifacts, decisions, and notes as you implement.'
    }
  ];
</script>

<section class="space-y-4">
  <div>
    <h1 class="text-2xl font-semibold">Gravity Planner</h1>
    <p class="mt-1 text-sm opacity-80 max-w-2xl">
      This is your workspace for turning federal and state frameworks into
      concrete, trackable work. Start by importing a toolkit, then map,
      plan, and track.
    </p>
  </div>

  <ol class="mt-4 grid gap-4 md:grid-cols-2">
    {#each steps as step, i}
      <li class="rounded-lg border border-slate-800 bg-slate-900/70 p-4">
        <div class="mb-2 flex items-center gap-2 text-xs opacity-70">
          <span class="inline-flex h-6 w-6 items-center justify-center rounded-full border border-slate-700 text-[11px]">
            {i + 1}
          </span>
          Step {i + 1}
        </div>
        <h2 class="text-sm font-semibold mb-1">{step.title}</h2>
        <p class="text-xs opacity-80">{step.description}</p>
      </li>
    {/each}
  </ol>
</section>
