<script context="module" lang="ts">
  // Public event type
  export type DateChangeDetail = { value: Date };
</script>

<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  // Types
  type WeekStart = 0 | 1; // 0=Sunday, 1=Monday
  type DateLike = Date | string | number | null;

  // Props
  export let value: DateLike = null;
  export let minDate: DateLike = null;
  export let maxDate: DateLike = null;
  export let locale: string = 'en-US';
  export let inline = false;
  export let disabled = false;
  export let weekStartsOn: WeekStart = 0;
  export let fixedWeeks = true;
  export let id: string | undefined;
  export let name: string | undefined;
  export let required = false;
  export let readonly = false;

  const dispatch = createEventDispatcher<{ change: DateChangeDetail }>();

  // ===== Utils =====
  const MIN_BOUND = new Date(-8640000000000000);
  const MAX_BOUND = new Date( 8640000000000000);

  function toDate(d: DateLike): Date | null {
    if (d == null) return null;
    const t = new Date(d as any);
    return isNaN(t.getTime()) ? null : t;
  }
  const isSameDay = (a: Date, b: Date) =>
    a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();

  function inRange(d: Date, min: Date | null, max: Date | null) {
    if (min && d < min) return false;
    if (max && d > max) return false;
    return true;
  }
  function clampDate(d: Date, min: Date | null, max: Date | null) {
    if (min && d < min) return min;
    if (max && d > max) return max;
    return d;
  }
  const addMonths = (d: Date, n: number) => { const x = new Date(d); x.setMonth(x.getMonth() + n); return x; };
  const addYears  = (d: Date, n: number) => { const x = new Date(d); x.setFullYear(x.getFullYear() + n); return x; };

  function monthMatrix(view: Date, startsOn: WeekStart, fixed = true): Date[][] {
    const first = new Date(view.getFullYear(), view.getMonth(), 1);
    const startOffset = (first.getDay() - startsOn + 7) % 7;
    const gridStart = new Date(first); gridStart.setDate(first.getDate() - startOffset);

    const weeks: Date[][] = [];
    let cursor = new Date(gridStart);
    for (let w = 0; w < 6; w++) {
      const row: Date[] = [];
      for (let d = 0; d < 7; d++) { row.push(new Date(cursor)); cursor.setDate(cursor.getDate() + 1); }
      weeks.push(row);
    }
    if (!fixed) {
      while (weeks.length && weeks[0].every(day => day.getMonth() !== view.getMonth())) weeks.shift();
      while (weeks.length && weeks[weeks.length - 1].every(day => day.getMonth() !== view.getMonth())) weeks.pop();
    }
    return weeks;
  }

  const formatMonthYear = (d: Date, loc = 'en-US') =>
    new Intl.DateTimeFormat(loc, { month: 'long', year: 'numeric' }).format(d);
  function formatWeekdayShort(index: number, loc = 'en-US', startsOn: WeekStart = 0) {
    const day = (index + startsOn) % 7;
    const ref = new Date(Date.UTC(2025, 0, 5 + day)); // Sunday-based reference week
    return new Intl.DateTimeFormat(loc, { weekday: 'short' }).format(ref);
  }

  // ===== State =====
  let selected: Date | null = toDate(value);
  let min = toDate(minDate);
  let max = toDate(maxDate);
  let view: Date = selected ?? (min ?? new Date());
  let grid: Date[][] = monthMatrix(view, weekStartsOn, fixedWeeks);

  // Uncontrolled dropdown open state (simple + reliable)
  let openPanel = false;

  // Reactivity
  $: selected = toDate(value);
  $: min = toDate(minDate);
  $: max = toDate(maxDate);
  $: view = clampDate(view, min ?? MIN_BOUND, max ?? MAX_BOUND);
  $: grid = monthMatrix(view, weekStartsOn, fixedWeeks);

  // Actions
  function selectDate(d: Date) {
    if (!inRange(d, min, max) || disabled || readonly) return;
    selected = d;
    value = d; // enable bind:value
    dispatch('change', { value: d });
    if (!inline) openPanel = false;
  }
  const goMonth = (n: number) => (view = addMonths(view, n));
  const goYear  = (n: number) => (view = addYears(view,  n));
  const isOutsideMonth = (d: Date) => d.getMonth() !== view.getMonth();

  function onDayKeyDown(e: KeyboardEvent, day: Date) {
    if (disabled || readonly) return;
    const key = e.key;
    let next: Date | null = null;

    if (key === 'ArrowLeft') next = new Date(day.getFullYear(), day.getMonth(), day.getDate() - 1);
    else if (key === 'ArrowRight') next = new Date(day.getFullYear(), day.getMonth(), day.getDate() + 1);
    else if (key === 'ArrowUp') next = new Date(day.getFullYear(), day.getMonth(), day.getDate() - 7);
    else if (key === 'ArrowDown') next = new Date(day.getFullYear(), day.getMonth(), day.getDate() + 7);
    else if (key === 'Home') { const o = (day.getDay() - weekStartsOn + 7) % 7; next = new Date(day.getFullYear(), day.getMonth(), day.getDate() - o); }
    else if (key === 'End')  { const o = (day.getDay() - weekStartsOn + 7) % 7; next = new Date(day.getFullYear(), day.getMonth(), day.getDate() + (6 - o)); }
    else if (key === 'PageUp')   next = addMonths(day, e.shiftKey ? -12 : -1);
    else if (key === 'PageDown') next = addMonths(day, e.shiftKey ?  12 :  1);
    else if (key === 'Enter' || key === ' ') { e.preventDefault(); selectDate(day); return; }
    else if (key === 'Escape' && !inline) { openPanel = false; return; }

    if (next) {
      e.preventDefault();
      if (next.getMonth() !== view.getMonth() || next.getFullYear() !== view.getFullYear()) {
        view = new Date(next.getFullYear(), next.getMonth(), 1);
      }
    }
  }

  const headingId = `${id ?? 'cl-datepicker'}-label`;
  $: hiddenValue = selected
    ? new Intl.DateTimeFormat('en-CA', { year: 'numeric', month: '2-digit', day: '2-digit' }).format(selected)
    : '';

  function toggleOpen() {
    if (disabled || readonly) return;
    openPanel = !openPanel;
  }
</script>

{#if inline}
  <!-- Inline calendar -->
  <div class="cl-datepicker" data-disabled={disabled ? '' : undefined} aria-disabled={disabled}>
    <div class="cl-cal-header">
      <button class="cl-nav-btn" type="button" on:click={() => goYear(-1)} aria-label="Previous year" disabled={disabled || readonly}>«</button>
      <button class="cl-nav-btn" type="button" on:click={() => goMonth(-1)} aria-label="Previous month" disabled={disabled || readonly}>‹</button>
      <h2 id={headingId} class="cl-cal-title">{formatMonthYear(view, locale)}</h2>
      <button class="cl-nav-btn" type="button" on:click={() => goMonth(1)} aria-label="Next month" disabled={disabled || readonly}>›</button>
      <button class="cl-nav-btn" type="button" on:click={() => goYear(1)} aria-label="Next year" disabled={disabled || readonly}>»</button>
    </div>

    <div class="cl-cal-weekdays" aria-hidden="true">
      {#each Array(7) as _, i}
        <div class="cl-wk">{formatWeekdayShort(i, locale, weekStartsOn)}</div>
      {/each}
    </div>

    <div class="cl-cal-grid" role="grid" aria-labelledby={headingId}>
      {#each grid as week}
        <div role="row" class="cl-cal-row">
          {#each week as day}
            {#if inRange(day, min, max)}
              <button
                class="cl-day"
                class:outside={isOutsideMonth(day)}
                class:selected={selected && isSameDay(day, selected)}
                type="button"
                role="gridcell"
                aria-selected={selected && isSameDay(day, selected)}
                aria-current={isSameDay(day, new Date()) ? 'date' : undefined}
                on:click={() => selectDate(day)}
                on:keydown={(e) => onDayKeyDown(e, day)}
                disabled={disabled}
              >
                <slot name="day" {day}>{day.getDate()}</slot>
              </button>
            {:else}
              <div class="cl-day disabled" role="gridcell" aria-disabled="true">
                <slot name="day" {day}>{day.getDate()}</slot>
              </div>
            {/if}
          {/each}
        </div>
      {/each}
    </div>
  </div>
{:else}
  <!-- Simple trigger + panel -->
  <div class="cl-datepicker-pop">
    <button
      class="cl-date-trigger"
      type="button"
      aria-haspopup="dialog"
      aria-expanded={openPanel}
      aria-controls={headingId + '-panel'}
      on:click={toggleOpen}
      disabled={disabled}
    >
      {selected ? new Intl.DateTimeFormat(locale, { dateStyle: 'medium' }).format(selected) : 'Select date'}
    </button>

    {#if openPanel}
      <div
        id={headingId + '-panel'}
        class="cl-pop-panel"
        role="dialog"
        aria-modal="false"
        aria-labelledby={headingId}
      >
        <div class="cl-datepicker" data-disabled={disabled ? '' : undefined} aria-disabled={disabled}>
          <div class="cl-cal-header">
            <button class="cl-nav-btn" type="button" on:click={() => goYear(-1)} aria-label="Previous year" disabled={disabled || readonly}>«</button>
            <button class="cl-nav-btn" type="button" on:click={() => goMonth(-1)} aria-label="Previous month" disabled={disabled || readonly}>‹</button>
            <h2 id={headingId} class="cl-cal-title">{formatMonthYear(view, locale)}</h2>
            <button class="cl-nav-btn" type="button" on:click={() => goMonth(1)} aria-label="Next month" disabled={disabled || readonly}>›</button>
            <button class="cl-nav-btn" type="button" on:click={() => goYear(1)} aria-label="Next year" disabled={disabled || readonly}>»</button>
          </div>

          <div class="cl-cal-weekdays" aria-hidden="true">
            {#each Array(7) as _, i}
              <div class="cl-wk">{formatWeekdayShort(i, locale, weekStartsOn)}</div>
            {/each}
          </div>

          <div class="cl-cal-grid" role="grid" aria-labelledby={headingId}>
            {#each grid as week}
              <div role="row" class="cl-cal-row">
                {#each week as day}
                  {#if inRange(day, min, max)}
                    <button
                      class="cl-day"
                      class:outside={isOutsideMonth(day)}
                      class:selected={selected && isSameDay(day, selected)}
                      type="button"
                      role="gridcell"
                      aria-selected={selected && isSameDay(day, selected)}
                      aria-current={isSameDay(day, new Date()) ? 'date' : undefined}
                      on:click={() => selectDate(day)}
                      on:keydown={(e) => onDayKeyDown(e, day)}
                      disabled={disabled}
                    >
                      <slot name="day" {day}>{day.getDate()}</slot>
                    </button>
                  {:else}
                    <div class="cl-day disabled" role="gridcell" aria-disabled="true">
                      <slot name="day" {day}>{day.getDate()}</slot>
                    </div>
                  {/if}
                {/each}
              </div>
            {/each}
          </div>
        </div>
      </div>
    {/if}
  </div>
{/if}

{#if name}
  <input type="hidden" {name} value={hiddenValue} {required} {readonly} />
{/if}

<style>
  /* Container */
  .cl-datepicker {
    background: var(--datepicker-bg, var(--color-surface-100-vis));
    color: var(--datepicker-text, var(--on-surface-strong));
    border: var(--datepicker-border, 1px solid var(--color-surface-300));
    border-radius: var(--datepicker-radius, var(--radius-surface));
    padding: var(--datepicker-padding-y, .5rem) var(--datepicker-padding-x, .75rem);
    display: grid;
    gap: var(--datepicker-gap, .25rem);
    max-inline-size: 22rem;
    user-select: none;
  }

  /* Header */
  .cl-cal-header { display: grid; grid-template-columns: auto auto 1fr auto auto; align-items: center; gap: var(--spacing-2, .5rem); }
  .cl-cal-title { justify-self: center; margin: 0; font: inherit; color: var(--datepicker-header-text, var(--on-surface-strong)); }
  .cl-nav-btn { background: transparent; border: 0; color: var(--datepicker-nav-icon, var(--on-surface)); inline-size: 2rem; block-size: 2rem; border-radius: var(--radius-interactive, .375rem); cursor: pointer; }
  .cl-nav-btn:hover { color: var(--datepicker-nav-icon-hover, var(--on-surface-strong)); }
  .cl-nav-btn:focus-visible { outline: var(--datepicker-focus-ring, 2px solid var(--color-info-500-vis)); outline-offset: var(--datepicker-focus-ring-offset, 1px); }

  /* Weekdays */
  .cl-cal-weekdays { display: grid; grid-template-columns: repeat(7, 1fr); gap: var(--datepicker-gap, .25rem); color: var(--datepicker-muted-text, var(--on-surface-muted)); font-size: .875rem; }
  .cl-wk { text-align: center; }

  /* Grid */
  .cl-cal-grid { display: grid; grid-template-rows: repeat(6, 1fr); gap: var(--datepicker-gap, .25rem); }
  .cl-cal-row { display: grid; grid-template-columns: repeat(7, 1fr); gap: var(--datepicker-gap, .25rem); }

  /* Day cells */
  .cl-day, .cl-day.disabled { display: inline-grid; place-items: center; inline-size: var(--datepicker-cell-size, 2.5rem); block-size: var(--datepicker-cell-size, 2.5rem); border-radius: var(--radius-interactive, .375rem); font: inherit; border: 0; }
  .cl-day { background: var(--datepicker-day-bg, transparent); color: var(--datepicker-day-text, var(--on-surface-strong)); cursor: pointer; }
  .cl-day:hover { background: var(--datepicker-day-hover-bg, var(--color-primary-100-vis)); }
  .cl-day.selected { background: var(--datepicker-day-selected-bg, var(--color-primary-500-vis)); color: var(--datepicker-day-selected-text, var(--on-primary)); }
  .cl-day.outside { color: var(--datepicker-day-outside-text, var(--on-surface-subtle)); }
  .cl-day[aria-current="date"] { box-shadow: 0 0 0 2px var(--datepicker-day-today-ring, var(--color-info-400-vis)) inset; }
  .cl-day:focus-visible { outline: var(--datepicker-focus-ring, 2px solid var(--color-info-500-vis)); outline-offset: var(--datepicker-focus-ring-offset, 1px); }
  .cl-day.disabled { color: var(--datepicker-day-disabled-text, var(--on-surface-disabled)); }

  /* Trigger + panel */
  .cl-datepicker-pop { position: relative; display: inline-block; isolation: isolate; }
  .cl-date-trigger { background: var(--color-surface-0, transparent); border: 1px solid var(--color-surface-300); border-radius: var(--radius-interactive, .375rem); padding: var(--spacing-2, .5rem) var(--spacing-3, .75rem); color: var(--on-surface-strong); }
  .cl-date-trigger:focus-visible { outline: var(--datepicker-focus-ring, 2px solid var(--color-info-500-vis)); outline-offset: var(--datepicker-focus-ring-offset, 1px); }

  .cl-pop-panel {
    position: absolute;
    z-index: 50;
    margin-top: .25rem;
    inset-inline-start: 0;
    background: var(--datepicker-bg, var(--color-surface-100-vis));
    border: var(--datepicker-border, 1px solid var(--color-surface-300));
    border-radius: var(--datepicker-radius, var(--radius-surface));
    box-shadow: 0 8px 24px rgba(0,0,0,.12);
  }
</style>



