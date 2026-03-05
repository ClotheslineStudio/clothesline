<script lang="ts">
  import { Alert, Avatar, Badge, Button, Select, Switch, TextField } from '@clothesline/ui';

  import type { RampColors, Role } from '$lib/theme/types';

  let { ramps, roles }: { ramps: RampColors; roles: Role[] } = $props();

  const transportItems = [
    { value: 'planes', label: 'Planes' },
    { value: 'trains', label: 'Trains' },
    { value: 'automobiles', label: 'Automobiles' }
  ];
  const showcaseRoles = $derived(roles.slice(0, Math.min(roles.length, 9)));
  const extendedSteps = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];

  let transport = $state<string | number>('planes');
  let featureEnabled = $state(true);
</script>

<div class="showcase-grid">
  <section class="surface-card p-4 showcase-shell">
    <div class="swatch-stack">
      {#each [100, 300, 500, 700, 900] as step}
        <div class="swatch-row">
          {#each showcaseRoles as role}
            <div class="swatch" style={`background:${ramps[role]?.[step] ?? 'transparent'};`} title={`${role}-${step}`}></div>
          {/each}
        </div>
      {/each}
    </div>

    <div class="mt-4 flex flex-wrap items-center gap-2">
      <Badge variant="primary" appearance="soft">Primary</Badge>
      <Badge variant="secondary" appearance="soft">Secondary</Badge>
      <Badge variant="success" appearance="soft">Success</Badge>
      <Badge variant="warning" appearance="soft">Warning</Badge>
      <Badge variant="error" appearance="soft">Error</Badge>
    </div>

    <div class="mt-4 grid gap-3">
      <div class="surface-card p-4 showcase-workbench">
        <div class="toolbar mb-3">
          <Button variant="ghost" color="neutral" ariaLabel="First tab" href={undefined} target={undefined} rel={undefined}>Overview</Button>
          <Button variant="ghost" color="neutral" ariaLabel="Second tab" href={undefined} target={undefined} rel={undefined}>Inputs</Button>
          <Button variant="ghost" color="neutral" ariaLabel="Third tab" href={undefined} target={undefined} rel={undefined}>Users</Button>
        </div>

        <div class="mb-4 flex items-center gap-2">
          <Switch bind:checked={featureEnabled} ariaLabel="Toggle feature" />
          <span class="text-xs">Enable smart routing</span>
        </div>

        <div class="grid gap-2 md:grid-cols-2">
          <TextField value="email@example.com" placeholder="Email" className="w-full" />
          <TextField value="password" placeholder="Password" className="w-full" />
          <div class="md:col-span-2">
            <Select bind:value={transport} items={transportItems} size="md" ariaLabel="Transport" placeholder={undefined} id={undefined} name={undefined} ariaDescribedby={undefined} />
          </div>
        </div>

        <div class="mt-4 flex flex-wrap gap-2">
          <Button color="primary" ariaLabel="Sign in" href={undefined} target={undefined} rel={undefined}>Sign In</Button>
          <Button variant="outline" color="primary" ariaLabel="Continue" href={undefined} target={undefined} rel={undefined}>Continue with GitHub</Button>
          <Button variant="ghost" color="neutral" ariaLabel="Dismiss" href={undefined} target={undefined} rel={undefined}>Dismiss</Button>
        </div>
      </div>
    </div>
  </section>

  <section class="showcase-row">
    <div class="surface-card p-4">
      <Alert id="preview-success" variant="success" title="Success">Task has been completed.</Alert>
    </div>

    <div class="surface-card p-4">
      <h3 class="m-0 mb-2 text-sm font-semibold">Team</h3>
      <div class="flex items-center gap-3">
        <Avatar name="Gregory Smith" size="md" />
        <Avatar name="Stephanie Collins" size="md" />
        <Avatar name="Samuel Scott" size="md" />
      </div>
    </div>

    <div class="surface-card p-4">
      <h3 class="m-0 mb-2 text-sm font-semibold">Quick Metrics</h3>
      <div class="text-2xl font-semibold" style="color:var(--color-primary-600);">1,337</div>
      <p class="m-0 text-xs text-(--text-muted,var(--on-surface-muted))">New users in 30 days.</p>
    </div>
  </section>

  <section class="surface-card p-4">
    <h3 class="m-0 mb-2 text-sm font-semibold">Extended Color Samples</h3>
    <p class="m-0 mb-3 text-xs showcase-subtle">Each row represents one semantic role across all ramp steps.</p>
    <div class="extended-samples">
      {#each showcaseRoles as role}
        <div class="sample-row">
          <div class="sample-label">{role}</div>
          <div class="sample-strip">
            {#each extendedSteps as step}
              <div class="sample-swatch" style={`background:${ramps[role]?.[step] ?? 'transparent'};`} title={`${role}-${step}`}></div>
            {/each}
          </div>
        </div>
      {/each}
    </div>
  </section>
</div>

<style>
  .showcase-grid {
    display: grid;
    gap: calc(var(--tg-preview-gap, 0.9rem) * 1.25);
    animation: showcaseFade 220ms ease;
  }

  .showcase-shell {
    background:
      radial-gradient(140% 90% at 0% 0%, color-mix(in oklab, var(--primary, var(--color-primary-600-vis)) 8%, transparent), transparent 58%),
      var(--background-panel, var(--color-surface-50-vis));
    border-radius: calc(var(--radius-container, 0.875rem) + 0.15rem);
    box-shadow:
      inset 0 1px 0 color-mix(in oklab, white 38%, transparent),
      0 16px 24px color-mix(in oklab, var(--on-surface) 8%, transparent);
  }

  .swatch-stack {
    display: grid;
    gap: 0.28rem;
  }

  .swatch-row {
    display: grid;
    grid-template-columns: repeat(9, minmax(0, 1fr));
    gap: 0.32rem;
  }

  .swatch {
    height: 0.42rem;
    border-radius: 0.35rem;
    border: 1px solid color-mix(in oklab, var(--on-surface) 8%, transparent);
  }

  .toolbar {
    display: inline-flex;
    gap: 0.45rem;
    border: 1px solid color-mix(in oklab, var(--on-surface) 14%, transparent);
    border-radius: var(--radius-interactive, 0.7rem);
    padding: 0.45rem;
    background: color-mix(in oklab, var(--background-elevation-2, var(--color-surface-100-vis)) 78%, transparent);
  }

  .showcase-workbench {
    border-radius: calc(var(--radius-card, 0.75rem) + 2px);
    box-shadow:
      inset 0 1px 0 color-mix(in oklab, white 48%, transparent),
      0 12px 26px color-mix(in oklab, var(--on-surface) 8%, transparent);
  }

  .showcase-row {
    display: grid;
    grid-template-columns: 1fr;
    gap: var(--tg-preview-gap, 0.9rem);
  }

  @media (min-width: 1000px) {
    .showcase-row {
      grid-template-columns: 1.2fr 1fr 1fr;
    }
  }

  .extended-samples {
    display: grid;
    gap: 0.58rem;
  }

  .sample-row {
    display: grid;
    grid-template-columns: 5.75rem minmax(0, 1fr);
    align-items: center;
    gap: 0.5rem;
  }

  .sample-label {
    font-size: 0.74rem;
    text-transform: capitalize;
    color: var(--text-muted, var(--on-surface-muted));
    font-weight: 700;
    letter-spacing: 0.01em;
  }

  .sample-strip {
    display: grid;
    grid-template-columns: repeat(11, minmax(0, 1fr));
    gap: 0.2rem;
  }

  .sample-swatch {
    height: 0.7rem;
    border-radius: 0.28rem;
    border: 1px solid color-mix(in oklab, var(--on-surface) 8%, transparent);
  }

  .showcase-subtle {
    color: var(--text-muted, var(--on-surface-muted));
  }

  @keyframes showcaseFade {
    from {
      opacity: 0.72;
      transform: translateY(4px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
</style>
