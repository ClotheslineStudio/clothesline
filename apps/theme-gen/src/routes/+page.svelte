<script lang="ts">
  // good: import the actual component constructors
  import { AppBar, Button, Card, Badge, Chip, Divider, TextField, Switch, Radio, ToggleButton, Checkbox, Icon, Range, Select, Slider, } from '@clothesline/ui';

  // Initialize all variables used in the template
  let mode = 'light';
  let contrast = 'normal';
  let themeName = 'my-theme';
  const ROLES = ['primary', 'secondary', 'accent', 'background', 'surface'];
  let activeRole = ROLES[0];
  let hue = 200;
  let chroma = 0.12;
  let ramp = [
    { level: 100, css: '#e0e0e0', l: 0.95, c: 0.12, h: 200 },
    { level: 200, css: '#c0c0c0', l: 0.85, c: 0.12, h: 200 },
    // ...add more ramp steps as needed
  ];
  let exportTS = `export const theme = { name: "${themeName}", mode: "${mode}", contrast: "${contrast}" };`;

  // Dummy implementations for required functions
  function updateSeed(role: string, { hue, chroma }: { hue?: number; chroma?: number }) {
    // Update ramp or other theme values here
  }
  async function oklchToSRGB(l: number, c: number, h: number) {
    return [255, 255, 255]; // Dummy RGB
  }
  async function onColorFor(l: number) {
    return [0, 0, 0]; // Dummy on-color
  }
  async function contrastRatio(on: number[], rgb: number[]) {
    return 7; // Dummy contrast ratio
  }
  function wcagBadge(ratio: number) {
    return ratio >= 7 ? 'AAA' : ratio >= 4.5 ? 'AA' : 'Fail';
  }
  function copy(text: string) {
    navigator.clipboard.writeText(text);
  }
  function download(filename: string, text: string) {
    const blob = new Blob([text], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
  }


// Removed invalid <AppBar>…</AppBar> line
</script>

<!-- Header (minimal) -->
<AppBar>
  <svelte:fragment slot="left">
    <Heading level={5}>Theme Generator</Heading>
  </svelte:fragment>
  <svelte:fragment slot="right">
    <div class="flex gap-2">
      <Select
        items={[{value:'light',label:'Light'},{value:'dark',label:'Dark'}]}
        bind:value={mode}
        placeholder="Select mode"
        id="mode-select"
        name="mode"
        ariaLabel="Theme mode"
        ariaDescribedby="theme-mode-desc"
      />
      <Select
        items={[{value:'normal',label:'Normal'},{value:'high',label:'High'}]}
        bind:value={contrast}
        placeholder="Select contrast"
        id="contrast-select"
        name="contrast"
        ariaLabel="Theme contrast"
        ariaDescribedby="theme-contrast-desc"
      />
    </div>
  </svelte:fragment>
</AppBar>

<div class="max-w-7xl mx-auto px-4 py-6 grid grid-cols-1 lg:grid-cols-5 gap-6">
  <!-- Inspector -->
  <div class="lg:col-span-2 space-y-6">
    <Card>
      <div><Heading level={5}>Theme</Heading></div>
      <div class="flex items-center gap-3">
        <Label htmlFor="themeName">Name</Label>
        <TextField bind:value={themeName} placeholder="theme id" />
      </div>
    </Card>

    <Card>
      <Heading level={5}>Colors</Heading>
      <Paragraph>Select a role then adjust hue/chroma. Ramp preview updates live.</Paragraph>

      <div class="flex flex-wrap gap-2 mt-3">
        {#each ROLES as r}
          <Chip selected={activeRole===r} title={r} href={undefined} rel={undefined} target={undefined} on:toggle={() => (activeRole = r)}>{r}</Chip>
        {/each}
      </div>
      <Divider space="sm" />

      <div class="grid gap-3 mt-2">
        <Label htmlFor="hue">{activeRole} hue</Label>
        <Range
          id="hue"
          bind:value={hue}
          min={0}
          max={360}
          step={1}
          suffix="°"
          label="Hue"
          help="Adjust the hue value"
          name="hue"
          ariaLabel="Hue slider"
          ariaDescribedby="hue-desc"
          color="primary"
          format={(n: number) => `${n}°`}
          on:commit={() => updateSeed(activeRole,{hue})}
        />
        <Label htmlFor="chroma">{activeRole} chroma</Label>
        <Range
          id="chroma"
          bind:value={chroma}
          min={0}
          max={0.24}
          step={0.005}
          label="Chroma"
          help="Adjust the chroma value"
          suffix=""
          name="chroma"
          ariaLabel="Chroma slider"
          ariaDescribedby="chroma-desc"
          color="primary"
          format={(n: number) => n.toFixed(3)}
          on:commit={() => updateSeed(activeRole, { chroma })}
        />
      </div>

      <Divider space="sm" />
      <!-- Ramp preview -->
      <div class="grid grid-cols-5 sm:grid-cols-10 gap-2 mt-2">
        {#each ramp as s}
          {#key s.level}
          <div class="swatch" style={`background:${s.css}`}
               title={`${activeRole}-${s.level}`}>
            <span class="swatch__label">{s.level}</span>
            {#if s}
              {#await Promise.resolve(oklchToSRGB(s.l, s.c, s.h)) then rgb}
                {#await Promise.resolve(onColorFor(s.l)) then on}
                  {#await Promise.resolve(contrastRatio(on, rgb)) then ratio}
                    <Badge tone={ratio>=7?'good':ratio>=4.5?'neutral':'bad'}>{wcagBadge(ratio)}</Badge>
                  {/await}
                {/await}
              {/await}
            {/if}
          </div>
          {/key}
        {/each}
      </div>
      <Paragraph className="mt-2">Badges reflect contrast of auto on-text vs swatch.</Paragraph>
    </Card>
  </div>

  <!-- Preview + Export -->
  <div class="lg:col-span-3 space-y-6">
    <Card>
      <Heading level={5}>Live Preview</Heading>
      <div class="grid gap-3 sm:grid-cols-3">
        <Button type="button" variant="solid" ariaLabel="Primary button" href={undefined} target={undefined} rel={undefined}>Primary</Button>
        <Button type="button" variant="outline" ariaLabel="Secondary button" href={undefined} target={undefined} rel={undefined}>Secondary</Button>
        <Button type="button" variant="ghost" ariaLabel="Ghost button" href={undefined} target={undefined} rel={undefined}>Ghost</Button>
      </div>
      <Divider space="md" />
      <Paragraph>Hook these to tokens in your app to see full-theme changes.</Paragraph>
    </Card>

    <Card>
      <Heading level={5}>Export</Heading>
      <Paragraph>Generate a config file compatible with your tokens package.</Paragraph>
      <pre class="code">{exportTS}</pre>
      <div class="flex gap-2 mt-2">
        <Button ariaLabel="Copy theme config" href={undefined} target={undefined} rel={undefined} on:click={() => copy(exportTS)}>Copy</Button>
        <Button variant="outline" ariaLabel="Download theme config" href={undefined} target={undefined} rel={undefined} on:click={() => download(`${themeName}.ts`, exportTS)}>Download</Button>
      </div>
    </Card>
  </div>
</div>

<style>
  /* simple utility helpers (if Tailwind not present in kit preview) */
  .flex{display:flex} .grid{display:grid}
  .items-center{align-items:center}
  .gap-2{gap:.5rem} .gap-3{gap:.75rem}
  .grid-cols-1{grid-template-columns:repeat(1,minmax(0,1fr))}
  .space-y-6>*+*{margin-top:1.5rem}
  .max-w-7xl{max-width:80rem} .mx-auto{margin:0 auto}
  .px-4{padding-left:1rem;padding-right:1rem}
  .py-6{padding-top:1.5rem;padding-bottom:1.5rem}
  .mt-2{margin-top:.5rem} .mt-3{margin-top:.75rem}

  .swatch{ position:relative; aspect-ratio: 1 / 1; border-radius: 10px; display:flex; align-items:flex-end; justify-content:space-between; padding:.35rem; }
  .swatch__label{ font-size:.75rem; opacity:.9; }
  .code{ white-space:pre; overflow:auto; max-height:320px; background: color-mix(in oklab, currentColor 6%, transparent); padding: .75rem; border-radius: 10px; }
</style>




