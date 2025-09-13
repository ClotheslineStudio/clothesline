<script lang="ts">
  import { DatePicker } from '@clothesline/ui';
  import ComponentPreview from '$lib/components/dev/ComponentPreview/ComponentPreview.svelte';

  const githubUrl =
    'https://github.com/clotheslinestudio/ui/blob/main/src/components/form/DatePicker/DatePicker.svelte';

  // Demo state
  let dateBasic: Date | null = null;
  let dateInline: Date | null = null;
  let dateBounded: Date | null = new Date();
  let dateMonday: Date | null = null;
  let dateDisabled: Date | null = null;

  // Bounds for the bounded example (this month only)
  const today = new Date();
  const minThisMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  const maxThisMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

  // Code strings displayed by ComponentPreview
  const codeBasic = `<DatePicker bind:value={dateBasic} />`;

  const codeInline = `<DatePicker inline bind:value={dateInline} />`;

  const codeBounded = `<DatePicker
  bind:value={dateBounded}
  minDate={new Date(${today.getFullYear()}, ${today.getMonth()}, 1)}
  maxDate={new Date(${today.getFullYear()}, ${today.getMonth() + 1}, 0)}
/>`;

  const codeMonday = `<DatePicker bind:value={dateMonday} weekStartsOn={1} locale="en-GB" />`;

  const codeDisabled = `<DatePicker disabled value={new Date()} />`;

  const codeCustomDay = `<DatePicker let:day>
  <svelte:fragment slot="day" let:day>
    <span class="text-xs">{day.getDate()}</span>
  </svelte:fragment>
</DatePicker>`;
</script>

<h1 class="text-2xl font-bold mb-4">DatePicker (Form)</h1>

<section class="space-y-10">
  <!-- Basic -->
  <div class="space-y-2">
    <h2 class="text-lg font-semibold">Basic (Dropdown)</h2>
    <ComponentPreview {githubUrl} code={codeBasic}>
      <div class="preview-host">
        <DatePicker id="basic-datepicker" name="basic-datepicker" bind:value={dateBasic} />
      </div>
      <p class="mt-2 text-sm opacity-80 text-center">
        Selected: {dateBasic ? dateBasic.toDateString() : '—'}
      </p>
    </ComponentPreview>
  </div>

  <!-- Inline -->
  <div class="space-y-2">
    <h2 class="text-lg font-semibold">Inline</h2>
    <ComponentPreview {githubUrl} code={codeInline}>
      <div class="preview-host">
        <DatePicker id="inline-datepicker" name="inline-datepicker" inline bind:value={dateInline} />
      </div>
      <p class="mt-2 text-sm opacity-80 text-center">
        Selected: {dateInline ? dateInline.toDateString() : '—'}
      </p>
    </ComponentPreview>
  </div>

  <!-- Min/Max (this month) -->
  <div class="space-y-2">
    <h2 class="text-lg font-semibold">Min/Max (This Month)</h2>
    <ComponentPreview {githubUrl} code={codeBounded}>
      <div class="preview-host">
        <DatePicker id="bounded-datepicker" name="bounded-datepicker" bind:value={dateBounded} minDate={minThisMonth} maxDate={maxThisMonth} />
      </div>
      <p class="mt-2 text-sm opacity-80 text-center">
        Range: {minThisMonth.toDateString()} – {maxThisMonth.toDateString()}<br />
        Selected: {dateBounded ? dateBounded.toDateString() : '—'}
      </p>
    </ComponentPreview>
  </div>

  <!-- Locale & Monday start -->
  <div class="space-y-2">
    <h2 class="text-lg font-semibold">Locale & Week Start</h2>
    <ComponentPreview {githubUrl} code={codeMonday}>
      <div class="preview-host">
        <DatePicker id="monday-datepicker" name="monday-datepicker" bind:value={dateMonday} weekStartsOn={1} locale="en-GB" />
      </div>
      <p class="mt-2 text-sm opacity-80 text-center">
        Selected: {dateMonday ? dateMonday.toDateString() : '—'}
      </p>
    </ComponentPreview>
  </div>

  <!-- Disabled -->
  <div class="space-y-2">
    <h2 class="text-lg font-semibold">Disabled</h2>
    <ComponentPreview {githubUrl} code={codeDisabled}>
      <div class="preview-host">
        <DatePicker id="disabled-datepicker" name="disabled-datepicker" disabled value={new Date()} />
      </div>
    </ComponentPreview>
  </div>

  <!-- Custom Day Slot -->
  <div class="space-y-2">
    <h2 class="text-lg font-semibold">Custom Day Slot</h2>
    <ComponentPreview {githubUrl} code={codeCustomDay}>
      <div class="preview-host">
        <DatePicker id="custom-day" name="custom-day">
          <svelte:fragment slot="day" let:day>
            <div class="relative inline-grid place-items-center w-9 h-9">
              <span class="text-[11px]">{day.getDate()}</span>
              {#if day.getDay() === 5}
                <span class="absolute bottom-1 block rounded-full w-1.5 h-1.5" style="background: var(--color-info-500-vis);"></span>
              {/if}
            </div>
          </svelte:fragment>
        </DatePicker>
      </div>
    </ComponentPreview>
  </div>
</section>

<style>
  /* Ensure the popover panel can render outside the immediate button */
  .preview-host {
    position: relative;
    overflow: visible;   /* don't clip the popover */
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 10rem;
    isolation: isolate;  /* keep z-index stacking predictable */
  }
</style>



