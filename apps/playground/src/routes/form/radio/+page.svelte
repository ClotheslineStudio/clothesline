<script lang="ts">
  import { Radio } from '@clothesline/ui';
  import ComponentPreview from '$lib/components/dev/ComponentPreview/ComponentPreview.svelte';

  const githubUrl =
    'https://github.com/clotheslinestudio/ui/blob/main/src/components/form/Radio/Radio.svelte';

  // layout helpers to keep previews centered and not squished
  const previewCenter = 'flex items-center justify-center min-h-24';
  const rowWrapCenter = 'flex flex-wrap items-center justify-center gap-4';

  // Demo state for "Group" example
  let selected = 'pear';
  const fruitOpts = [
    { value: 'apple', label: 'Apple' },
    { value: 'pear',  label: 'Pear'  },
    { value: 'plum',  label: 'Plum'  }
  ];

  function selectValue(v: string) {
    selected = v;
  }
</script>

<h1 class="text-2xl font-bold mb-4">Radio Component</h1>

<section class="space-y-10">
  <!-- Basic -->
  <div class="space-y-2">
    <h2 class="text-lg font-semibold">Basic</h2>
    <ComponentPreview
      {githubUrl}
      code={`<Radio id="news-email" name="news" value="email" label="Email updates" />`}
    >
      <div class={previewCenter}>
        <Radio id="news-email" name="news" value="email" label="Email updates" />
      </div>
    </ComponentPreview>
  </div>

  <!-- States -->
  <div class="space-y-2">
    <h2 class="text-lg font-semibold">States</h2>
    <ComponentPreview
      {githubUrl}
      code={`<Radio id="r-a" name="states" value="a" label="Unchecked" />
<Radio id="r-b" name="states" value="b" label="Checked" checked />
<Radio id="r-c" name="states" value="c" label="Disabled (unchecked)" disabled />
<Radio id="r-d" name="states" value="d" label="Disabled (checked)" checked disabled />`}
    >
      <div class={`${previewCenter} ${rowWrapCenter}`}>
        <Radio id="r-a" name="states" value="a" label="Unchecked" />
        <Radio id="r-b" name="states" value="b" label="Checked" checked />
        <Radio id="r-c" name="states" value="c" label="Disabled (unchecked)" disabled />
        <Radio id="r-d" name="states" value="d" label="Disabled (checked)" checked disabled />
      </div>
    </ComponentPreview>
  </div>

  <!-- Long label -->
  <div class="space-y-2">
    <h2 class="text-lg font-semibold">Long Label</h2>
    <ComponentPreview
      {githubUrl}
      code={`<Radio
  id="terms"
  name="tos"
  value="agree"
  label="I agree to the Terms of Service and acknowledge the Privacy Policy."
/>`}
    >
      <div class={previewCenter}>
        <Radio
          id="terms"
          name="tos"
          value="agree"
          label="I agree to the Terms of Service and acknowledge the Privacy Policy."
        />
      </div>
    </ComponentPreview>
  </div>

  <!-- Controlled Group (single select) -->
  <div class="space-y-2">
    <h2 class="text-lg font-semibold">Group (single select, controlled)</h2>
    <ComponentPreview
      {githubUrl}
      code={`<script lang="ts">
  let selected = "pear";
  const fruitOpts = [
    { value: "apple", label: "Apple" },
    { value: "pear",  label: "Pear"  },
    { value: "plum",  label: "Plum"  }
  ];
  function selectValue(v: string) { selected = v; }
<\/script>

<div class="flex flex-wrap items-center justify-center gap-4">
  {#each fruitOpts as f}
    <Radio
      id={"fruit-" + f.value}
      name="fruit"
      value={f.value}
      label={f.label}
      checked={selected === f.value}
      onChange={() => selectValue(f.value)}
    />
  {/each}
</div>
<p class="text-sm text-muted-foreground text-center">Selected: {selected}</p>`}
    >
      <div class="space-y-3">
        <div class={`${previewCenter} ${rowWrapCenter}`}>
          {#each fruitOpts as f}
            <Radio
              id={"fruit-" + f.value}
              name="fruit"
              value={f.value}
              label={f.label}
              checked={selected === f.value}
              onChange={() => selectValue(f.value)}
            />
          {/each}
        </div>
        <p class="text-sm text-muted-foreground text-center">
          Selected: {selected}
        </p>
      </div>
    </ComponentPreview>
  </div>

  <!-- Fieldset example -->
  <div class="space-y-2">
    <h2 class="text-lg font-semibold">Fieldset + Legend</h2>
    <ComponentPreview
      {githubUrl}
      code={`<fieldset class="space-y-3">
  <legend class="font-semibold mb-1">Preferred Contact</legend>
  <Radio id="c-email" name="contact" value="email" label="Email" />
  <Radio id="c-sms"   name="contact" value="sms"   label="SMS/Text" />
  <Radio id="c-call"  name="contact" value="call"  label="Phone call" disabled />
</fieldset>`}
    >
      <div class={previewCenter}>
        <fieldset class="space-y-3">
          <legend class="font-semibold mb-1">Preferred Contact</legend>
          <Radio id="c-email" name="contact" value="email" label="Email" />
          <Radio id="c-sms"   name="contact" value="sms"   label="SMS/Text" />
          <Radio id="c-call"  name="contact" value="call"  label="Phone call" disabled />
        </fieldset>
      </div>
    </ComponentPreview>
  </div>
</section>

