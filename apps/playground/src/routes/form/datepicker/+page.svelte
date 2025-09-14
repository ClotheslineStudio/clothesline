<script lang="ts">
  import { DatePicker } from '@clothesline/ui';
  import ComponentPreview from '$lib/components/dev/ComponentPreview/ComponentPreview.svelte';

  const githubUrl =
    'https://github.com/clotheslinestudio/ui/blob/main/src/components/form/DatePicker/DatePicker.svelte';

  // Live state for demos
  let dateBasic: Date | null = null;
  let dateInline: Date | null = new Date();

  const today = new Date();
  const minThisMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  const maxThisMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
  let dateBounded: Date | null = today;

  // Utility classes for consistent previews
  const center = 'relative flex items-center justify-center min-h-44 overflow-visible';
  const block = 'relative min-h-[22rem] overflow-visible'; // for inline to keep stable height
</script>

<h1 class="text-2xl font-bold mb-4">DatePicker</h1>

<section class="space-y-10">
  <!-- Basic trigger + panel -->
  <div class="space-y-2">
    <h2 class="text-lg font-semibold">Basic</h2>
    <ComponentPreview
      {githubUrl}
      code={`<DatePicker bind:value={date} />\n<p>Selected: {date?.toDateString() || '—'}</p>`}
    >
      <div class={center}>
        <DatePicker
          id="date-basic"
          name="date-basic"
          open={undefined}
          bind:value={dateBasic}
        />
      </div>
      <p class="text-sm text-[color:var(--on-surface-subtle)] mt-2">
        Selected: {dateBasic ? dateBasic.toDateString() : '—'}
      </p>
    </ComponentPreview>
  </div>

  <!-- Inline calendar -->
  <div class="space-y-2">
    <h2 class="text-lg font-semibold">Inline</h2>
    <ComponentPreview
      {githubUrl}
      code={`<DatePicker inline bind:value={date} />`}
    >
      <div class={block}>
        <DatePicker
          id="date-inline"
          name="date-inline"
          open={undefined}
          inline
          bind:value={dateInline}
        />
      </div>
    </ComponentPreview>
  </div>

  <!-- Min/Max (this month) + Monday start -->
  <div class="space-y-2">
    <h2 class="text-lg font-semibold">Min/Max (This Month) • Week starts Monday</h2>
    <ComponentPreview
      {githubUrl}
      code={`<DatePicker bind:value={date}\n  minDate={new Date(y, m, 1)}\n  maxDate={new Date(y, m + 1, 0)}\n  weekStartsOn={1}\n/>`}
    >
      <div class={center}>
        <DatePicker
          id="date-bounded"
          name="date-bounded"
          open={undefined}
          bind:value={dateBounded}
          minDate={minThisMonth}
          maxDate={maxThisMonth}
          weekStartsOn={1}
        />
      </div>
      <p class="text-sm text-[color:var(--on-surface-subtle)] mt-2">
        Range: {minThisMonth.toDateString()} → {maxThisMonth.toDateString()}
      </p>
    </ComponentPreview>
  </div>
</section>




