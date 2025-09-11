<script lang="ts">
  import { Checkbox } from '@clothesline/ui';
  import ComponentPreview from '$lib/components/dev/ComponentPreview/ComponentPreview.svelte';

  const githubUrl =
    'https://github.com/clotheslinestudio/ui/blob/main/src/components/core/Checkbox/Checkbox.svelte';

  // layout helpers to keep previews centered and not squished
  const previewCenter = 'flex items-center justify-center min-h-24';
  const rowWrapCenter = 'flex flex-wrap items-center justify-center gap-4';

  // Demo state
  let bound = false;

  let fruits: string[] = ['pear'];
  const fruitOpts = [
    { value: 'apple', label: 'Apple' },
    { value: 'pear', label: 'Pear' },
    { value: 'plum', label: 'Plum' }
  ];
</script>

<h1 class="text-2xl font-bold mb-4">Checkbox Component</h1>

<section class="space-y-10">
  <!-- Basic -->
  <div class="space-y-2">
    <h2 class="text-lg font-semibold">Basic</h2>
    <ComponentPreview
      {githubUrl}
      code={`<Checkbox id="news" name="news" label="Subscribe to newsletter" />`}
    >
      <div class={previewCenter}>
        <Checkbox id="news" name="news" label="Subscribe to newsletter" />
      </div>
    </ComponentPreview>
  </div>

  <!-- States -->
  <div class="space-y-2">
    <h2 class="text-lg font-semibold">States</h2>
    <ComponentPreview
      {githubUrl}
      code={`<Checkbox id="a" name="a" label="Unchecked" />
<Checkbox id="b" name="b" label="Checked" checked />
<Checkbox id="c" name="c" label="Disabled (unchecked)" disabled />
<Checkbox id="d" name="d" label="Disabled (checked)" checked disabled />`}
    >
      <div class={`${previewCenter} ${rowWrapCenter}`}>
        <Checkbox id="a" name="a" label="Unchecked" />
        <Checkbox id="b" name="b" label="Checked" checked />
        <Checkbox id="c" name="c" label="Disabled (unchecked)" disabled />
        <Checkbox id="d" name="d" label="Disabled (checked)" checked disabled />
      </div>
    </ComponentPreview>
  </div>

  <!-- Long label -->
  <div class="space-y-2">
    <h2 class="text-lg font-semibold">Long Label</h2>
    <ComponentPreview
      {githubUrl}
      code={`<Checkbox
  id="terms"
  name="terms"
  label="I agree to the Terms of Service and acknowledge the Privacy Policy."
/>`}
    >
      <div class={previewCenter}>
        <Checkbox
          id="terms"
          name="terms"
          label="I agree to the Terms of Service and acknowledge the Privacy Policy."
        />
      </div>
    </ComponentPreview>
  </div>

  <!-- Two-way binding -->
  <div class="space-y-2">
    <h2 class="text-lg font-semibold">Two-way Binding (bind:checked)</h2>
    <ComponentPreview
      {githubUrl}
      code={`<script lang="ts">
  let bound = false;
<\/script>

<Checkbox id="bound" name="bound" label={"Bound: " + (bound ? "true" : "false")} bind:checked={bound} />`}
    >
      <div class={`${previewCenter} ${rowWrapCenter}`}>
        <Checkbox
          id="bound"
          name="bound"
          label={"Bound: " + (bound ? "true" : "false")}
          bind:checked={bound}
        />
      </div>
    </ComponentPreview>
  </div>

  <!-- Group (bind:group) -->
  <div class="space-y-2">
    <h2 class="text-lg font-semibold">Group (bind:group)</h2>
    <ComponentPreview
      {githubUrl}
      code={`<script lang="ts">
  let fruits: string[] = ["pear"];
<\/script>

<div class="flex gap-4 flex-wrap">
  <Checkbox id="apple" name="fruits" value="apple" label="Apple" bind:group={fruits} />
  <Checkbox id="pear"  name="fruits" value="pear"  label="Pear"  bind:group={fruits} />
  <Checkbox id="plum"  name="fruits" value="plum"  label="Plum"  bind:group={fruits} />
</div>

<p class="text-sm text-muted-foreground">Selected: {JSON.stringify(fruits)}</p>`}
    >
      <div class="space-y-3">
        <div class={`${previewCenter} ${rowWrapCenter}`}>
          {#each fruitOpts as f}
            <Checkbox
              id={`fruit-${f.value}`}
              name="fruits"
              value={f.value}
              label={f.label}
              bind:group={fruits}
            />
          {/each}
        </div>
        <p class="text-sm text-muted-foreground text-center">
          Selected: {JSON.stringify(fruits)}
        </p>
      </div>
    </ComponentPreview>
  </div>
</section>

