<script lang="ts">
  import { ToggleButton } from '@clothesline/ui';
  import ComponentPreview from '$lib/components/dev/ComponentPreview/ComponentPreview.svelte';

  const githubUrl =
    'https://github.com/clotheslinestudio/ui/blob/main/src/components/form/Toggle/Toggle.svelte';

  // layout helpers
  const previewCenter = 'flex items-center justify-center min-h-24';
  const rowWrapCenter = 'flex flex-wrap items-center justify-center gap-4';

  // Demo state
  let bound = false;
  let log: string[] = [];

  function handleChange(val: boolean) {
    log = [`Changed to: ${val ? 'On' : 'Off'} @ ${new Date().toLocaleTimeString()}`, ...log].slice(0, 5);
  }

  // Controlled example
  let controlled = true;
</script>

<h1 class="text-2xl font-bold mb-4">Toggle Component</h1>

<section class="space-y-10">
  <!-- Basic -->
  <div class="space-y-2">
    <h2 class="text-lg font-semibold">Basic</h2>
    <ComponentPreview
      {githubUrl}
      code={`<Toggle label="Notifications" />`}
    >
      <div class={previewCenter}>
        <ToggleButton label="Notifications" />
      </div>
    </ComponentPreview>
  </div>

  <!-- Two-way binding -->
  <div class="space-y-2">
    <h2 class="text-lg font-semibold">Two-way Binding (bind:on)</h2>
    <ComponentPreview
      {githubUrl}
      code={`<script lang="ts"> let bound = false;<\/script>
<Toggle label={"Bound: " + (bound ? "On" : "Off")} bind:on={bound} />`}
    >
      <div class={`${previewCenter} ${rowWrapCenter}`}>
        <ToggleButton label={"Bound: " + (bound ? "On" : "Off")} bind:on={bound} />
      </div>
    </ComponentPreview>
  </div>

  <!-- Controlled with external buttons -->
  <div class="space-y-2">
    <h2 class="text-lg font-semibold">Controlled (external controls)</h2>
    <ComponentPreview
      {githubUrl}
      code={`<script lang="ts"> let controlled = true;<\/script>
<div>
  <ToggleButton label={"Controlled: " + (controlled ? "On" : "Off")} bind:on={controlled} />
  <button on:click={() => (controlled = true)}>Turn On</button>
  <button on:click={() => (controlled = false)}>Turn Off</button>
  <button on:click={() => (controlled = !controlled)}>Toggle</button>
</div>`}
    >
      <div class="space-y-3">
        <div class={`${previewCenter} ${rowWrapCenter}`}>
          <ToggleButton label={"Controlled: " + (controlled ? "On" : "Off")} bind:on={controlled} />
        </div>
        <div class="flex items-center justify-center gap-3">
          <button class="px-3 py-1 rounded border" on:click={() => (controlled = true)}>Turn On</button>
          <button class="px-3 py-1 rounded border" on:click={() => (controlled = false)}>Turn Off</button>
          <button class="px-3 py-1 rounded border" on:click={() => (controlled = !controlled)}>Toggle</button>
        </div>
      </div>
    </ComponentPreview>
  </div>

  <!-- onChange callback -->
  <div class="space-y-2">
    <h2 class="text-lg font-semibold">onChange Callback</h2>
    <ComponentPreview
      {githubUrl}
      code={`<script lang="ts">
  let log: string[] = [];
  function handleChange(v: boolean) { log = ["Changed to: " + (v ? "On" : "Off"), ...log].slice(0,5); }
<\/script>
<Toggle label="With onChange" onChange={handleChange} />`}
    >
      <div class="space-y-3">
        <div class={`${previewCenter} ${rowWrapCenter}`}>
          <ToggleButton label="With onChange" onChange={handleChange} />
        </div>
        <div class="mx-auto max-w-xl">
          <p class="text-sm opacity-70 text-center mb-1">Event log (last 5):</p>
          <ul class="text-sm grid gap-1">
            {#each log as item, i}
              <li class="px-3 py-1 rounded bg-[color:var(--color-surface-100,oklch(96%_.01_0))] border">
                {i + 1}. {item}
              </li>
            {/each}
          </ul>
        </div>
      </div>
    </ComponentPreview>
  </div>
</section>
