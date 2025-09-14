<script context="module" lang="ts">
  export type DateChangeDetail = { value: Date | null };
</script>
<script lang="ts">
  import { createEventDispatcher, onMount } from 'svelte';

  // ===== Types =====
  type WeekStart = 0 | 1;            // 0=Sunday, 1=Monday
  type DateLike = Date | string | number | null;

  // ===== Props =====
  export let value: DateLike = null;
  export let minDate: DateLike = null;
  export let maxDate: DateLike = null;
  export let locale = 'en-US';
  export let inline = false;         // if false => trigger + panel
  export let disabled = false;
  export let readonly = false;
  export let weekStartsOn: WeekStart = 0;
  export let fixedWeeks = true;
  export let id: string | undefined;
  export let name: string | undefined;
  export let required = false;

  // UI niceties
  export let withActions = true;                 // show Clear / Done
  export let clearable = true;
  export let labels = { clear: 'Clear', done: 'Done' };

  // optional controlled open for dropdown mode
  export let open: boolean | undefined;
  let _open = false;
  const isControlled = () => typeof open === 'boolean';
  $: currentOpen = isControlled() ? (open as boolean) : _open;

  const dispatch = createEventDispatcher<{ change: DateChangeDetail; open: void; close: void }>();

  // ===== Utils =====
  const minBound = new Date(-8640000000000000);
  const maxBound = new Date( 8640000000000000);

  function toDate(d: DateLike): Date | null {
    if (d === null || d === undefined) return null;
    const t = new Date(d as any);
    return isNaN(t.getTime()) ? null : t;
  }
  function isSameDay(a: Date, b: Date) {
    return a.getFullYear() === b.getFullYear() &&
           a.getMonth() === b.getMonth() &&
           a.getDate() === b.getDate();
  }
  function inRange(d: Date, min: Date | null, max: Date | null) {
    if (min && d < min) return false;
    if (max && d > max) return false;
    return true;
  }
  function clamp(d: Date, min: Date | null, max: Date | null) {
    if (min && d < min) return min;
    if (max && d > max) return max;
    return d;
  }
  function addMonths(d: Date, n: number) { const x = new Date(d); x.setMonth(x.getMonth() + n); return x; }
  function addYears(d: Date, n: number)  { const x = new Date(d); x.setFullYear(x.getFullYear() + n); return x; }

  function monthMatrix(view: Date, startsOn: WeekStart, fixed = true): Date[][] {
    const first = new Date(view.getFullYear(), view.getMonth(), 1);
    const startOffset = (first.getDay() - startsOn + 7) % 7;
    const gridStart = new Date(first);
    gridStart.setDate(first.getDate() - startOffset);

    const weeks: Date[][] = [];
    let cursor = new Date(gridStart);
    for (let w = 0; w < 6; w++) {
      const row: Date[] = [];
      for (let d = 0; d < 7; d++) { row.push(new Date(cursor)); cursor.setDate(cursor.getDate() + 1); }
      weeks.push(row);
    }
    if (!fixed) {
      while (weeks.length && weeks[0].every(d => d.getMonth() !== view.getMonth())) weeks.shift();
      while (weeks.length && weeks[weeks.length-1].every(d => d.getMonth() !== view.getMonth())) weeks.pop();
    }
    return weeks;
  }
  function formatMonthYear(d: Date, loc = 'en-US') {
    return new Intl.DateTimeFormat(loc, { month: 'long', year: 'numeric' }).format(d);
  }
  function formatWeekdayShort(i: number, loc = 'en-US', startsOn: WeekStart = 0) {
    const day = (i + startsOn) % 7;
    const ref = new Date(Date.UTC(2025, 0, 5 + day)); // Sunday anchor week
    return new Intl.DateTimeFormat(loc, { weekday: 'short' }).format(ref);
  }

  // ===== State =====
  let selected: Date | null = toDate(value);
  let min = toDate(minDate);
  let max = toDate(maxDate);
  let view: Date = selected ?? (min ?? new Date());
  let grid: Date[][] = monthMatrix(view, weekStartsOn, fixedWeeks);

  $: selected = toDate(value);
  $: min = toDate(minDate);
  $: max = toDate(maxDate);
  $: view = clamp(view, min ?? minBound, max ?? maxBound);
  $: grid = monthMatrix(view, weekStartsOn, fixedWeeks);

  // ===== Actions =====
  function selectDate(d: Date) {
    if (!inRange(d, min, max) || disabled || readonly) return;
    selected = d;
    value = d;
    dispatch('change', { value: d });
    if (!inline) closePanel();
  }
  function goMonth(d: number) { view = addMonths(view, d); }
  function goYear(d: number)  { view = addYears(view,  d); }
  function isOutsideMonth(d: Date) { return d.getMonth() !== view.getMonth(); }

  function clear() {
    if (disabled || readonly) return;
    selected = null;
    value = null;
    dispatch('change', { value: null });
  }

  function openPanel()  { if (!isControlled()) _open = true;  dispatch('open'); }
  function closePanel() { if (!isControlled()) _open = false; dispatch('close'); }
  function toggleOpen() {
    if (disabled || readonly) return;
    if (isControlled()) (currentOpen ? dispatch('close') : dispatch('open'));
    else _open = !currentOpen;
  }

  // close on ESC in dropdown mode
  function onKeydown(e: KeyboardEvent) {
    if (!inline && (open ?? _open) && e.key === 'Escape') {
      e.stopPropagation();
      closePanel();
    }
  }
  onMount(() => {
    if (!inline) window.addEventListener('keydown', onKeydown);
    return () => { if (!inline) window.removeEventListener('keydown', onKeydown); };
  });

  // ARIA / hidden input
  const headingId = `${id ?? 'cl-datepicker'}-label`;
  $: hiddenValue = selected ? new Intl.DateTimeFormat('en-CA', { year:'numeric', month:'2-digit', day:'2-digit' }).format(selected) : '';
</script>

<!-- ===== Root ===== -->
<div class="cl-root" data-mode={inline ? 'inline' : 'popover'}>
  {#if !inline}
    <!-- Trigger -->
    <button
      class="cl-trigger"
      type="button"
      aria-haspopup="dialog"
      aria-expanded={currentOpen}
      aria-controls={headingId + '-panel'}
      on:click={toggleOpen}
      disabled={disabled}
    >
      {#if selected}
        {new Intl.DateTimeFormat(locale, { dateStyle: 'medium' }).format(selected)}
      {:else}
        Select date
      {/if}
    </button>
  {/if}

  <!-- Scrim (only when open on mobile) -->
  {#if !inline && currentOpen}
    <button
      type="button"
      class="cl-scrim"
      aria-label="Close date picker"
      on:click={closePanel}
      on:keydown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); closePanel(); } }}
      tabindex="0"
      style="all:unset; display:block; position:fixed; inset:0; z-index:39; background: color-mix(in oklab, black 40%, transparent);"
    ></button>
  {/if}

  <!-- Panel: inline OR popover when open -->
  {#if inline || currentOpen}
    <div
      id={headingId + '-panel'}
      class="cl-panel"
      role={inline ? undefined : 'dialog'}
      aria-modal={inline ? undefined : 'false'}
      aria-labelledby={headingId}
    >
      <div class="cl-datepicker" data-disabled={disabled ? '' : undefined} aria-disabled={disabled}>
        <div class="cl-cal-header">
          <button class="cl-nav" type="button" on:click={() => goYear(-1)} aria-label="Previous year" disabled={disabled || readonly}>«</button>
          <button class="cl-nav" type="button" on:click={() => goMonth(-1)} aria-label="Previous month" disabled={disabled || readonly}>‹</button>
          <h2 id={headingId} class="cl-title">{formatMonthYear(view, locale)}</h2>
          <button class="cl-nav" type="button" on:click={() => goMonth(1)} aria-label="Next month" disabled={disabled || readonly}>›</button>
          <button class="cl-nav" type="button" on:click={() => goYear(1)} aria-label="Next year" disabled={disabled || readonly}>»</button>
        </div>

        <div class="cl-weekdays" aria-hidden="true">
          {#each Array(7) as _, i}
            <div class="cl-wk">{formatWeekdayShort(i, locale, weekStartsOn)}</div>
          {/each}
        </div>

        <div class="cl-grid" role="grid" aria-labelledby={headingId}>
          {#each grid as week}
            <div role="row" class="cl-row">
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
                    disabled={disabled}
                  >
                    {day.getDate()}
                  </button>
                {:else}
                  <div class="cl-day disabled" role="gridcell" aria-disabled="true">{day.getDate()}</div>
                {/if}
              {/each}
            </div>
          {/each}
        </div>

        {#if withActions}
          <div class="cl-actions">
            {#if clearable}
              <button type="button" class="cl-btn clear" on:click={clear}>{labels.clear}</button>
            {/if}
            <button type="button" class="cl-btn done" on:click={closePanel}>{labels.done}</button>
          </div>
        {/if}
      </div>
    </div>
  {/if}
</div>

{#if name}
  <input type="hidden" {name} value={hiddenValue} {required} />
{/if}

<style>
  /* Root + trigger */
  .cl-root{ position:relative; display:inline-block; }
  .cl-trigger{
    background: var(--datepicker-trigger-bg);
    color: var(--datepicker-trigger-text);
    border: var(--datepicker-trigger-border);
    border-radius: var(--datepicker-trigger-radius);
    padding: var(--spacing-2) var(--spacing-3);
    line-height: 1;
  }
  .cl-trigger:focus-visible{ outline: var(--datepicker-focus-ring); outline-offset: var(--datepicker-focus-ring-offset); }

  /* Scrim (mobile) */
  .cl-scrim{ display:none; position:fixed; inset:0; background: color-mix(in oklab, black 40%, transparent); z-index:39; }
  @media (max-width: 640px){ .cl-scrim{ display:block; } }

  /* Panel positioning */
  .cl-panel{
    position:absolute; z-index:40; margin-top:.25rem;
    background: var(--datepicker-bg);
    border: var(--datepicker-border);
    border-radius: var(--datepicker-radius);
    box-shadow: var(--datepicker-panel-shadow);
  }
  .cl-root[data-mode="inline"] .cl-panel{
    position: static; margin: 0; box-shadow: none;
  }
  /* Mobile bottom sheet */
  @media (max-width: 640px){
    .cl-root[data-mode="popover"] .cl-panel{
      position: fixed; inset: auto 0 0 0; margin: 0;
      border: none; border-radius: 1rem 1rem 0 0; box-shadow: var(--shadow-lg);
    }
  }

  /* Panel body */
  .cl-datepicker{
    background: var(--datepicker-bg);
    color: var(--datepicker-text);
    border: var(--datepicker-border);
    border-radius: var(--datepicker-radius);
    padding: var(--datepicker-padding-y, var(--spacing-3)) var(--datepicker-padding-x, var(--spacing-3));
    display:grid; gap: var(--datepicker-gap, var(--spacing-2));
    max-inline-size: 22rem; user-select:none;
  }

  .cl-cal-header{
    display:grid; grid-template-columns:auto auto 1fr auto auto;
    align-items:center; gap: var(--spacing-2);
  }
  .cl-title{ justify-self:center; margin:0; font-weight:600; color: var(--datepicker-header-text); }
  .cl-nav{
    background: transparent; border:0; color: var(--datepicker-nav-icon);
    inline-size: 2rem; block-size: 2rem; border-radius: var(--radius-interactive); cursor: pointer;
  }
  .cl-nav:hover{ color: var(--datepicker-nav-icon-hover); }
  .cl-nav:focus-visible{ outline: var(--datepicker-focus-ring); outline-offset: var(--datepicker-focus-ring-offset); }

  .cl-weekdays{
    display:grid; grid-template-columns: repeat(7,1fr); gap: var(--datepicker-gap);
    color: var(--on-surface-subtle); font-size:.8rem;
  }
  .cl-wk{ text-align:center; }

  .cl-grid{ display:grid; gap: var(--datepicker-gap); }
  .cl-row{ display:grid; grid-template-columns: repeat(7,1fr); gap: var(--datepicker-gap); }

  .cl-day, .cl-day.disabled{
    display:inline-grid; place-items:center;
    inline-size: var(--datepicker-cell-size, 2.5rem);
    block-size: var(--datepicker-cell-size, 2.5rem);
    border-radius: .55rem; font: inherit; border:0;
  }
  .cl-day{ background: var(--datepicker-day-bg); color: var(--datepicker-day-text); cursor: pointer; transition: background .15s ease; }
  .cl-day:hover{ background: var(--datepicker-day-hover-bg); }
  .cl-day.selected{ background: var(--datepicker-day-selected-bg); color: var(--datepicker-day-selected-text); }
  .cl-day[aria-current="date"]{ box-shadow: 0 0 0 2px var(--datepicker-day-today-ring) inset; }
  .cl-day.outside{ color: var(--datepicker-day-outside-text); }
  .cl-day.disabled{ color: var(--datepicker-day-disabled-text); }

  .cl-actions{
    display:flex; gap: var(--spacing-2);
    background: var(--datepicker-actionbar-bg);
    border-top: var(--datepicker-actionbar-border);
    padding-top: var(--spacing-3);
    justify-content:flex-end;
  }
  .cl-btn{ border-radius: var(--radius-interactive); padding: var(--spacing-2) var(--spacing-4); border:1px solid transparent; font-weight:600; }
  .cl-btn.clear{ background: var(--datepicker-clear-bg); color: var(--datepicker-clear-text); }
  .cl-btn.clear:hover{ background: var(--datepicker-clear-bg-hover); }
  .cl-btn.done{ background: var(--datepicker-done-bg); color: var(--datepicker-done-text); }
  .cl-btn.done:hover{ background: var(--datepicker-done-bg-hover); }
</style>





