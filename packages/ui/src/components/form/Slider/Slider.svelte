<script lang="ts">
  import { createEventDispatcher, onMount } from 'svelte';

  /**
   * Slider – single or dual-thumb slider with accessible ARIA.
   * - Single value: bind:value (number)
   * - Range:        bind:values ([min,max])
   * - Keyboard: Arrow/Page/Home/End
   * - Pointer: drag thumbs, click track moves nearest thumb
   * - Marks: optional ticks/labels along track
   *
   * Keep styling token-friendly: --slider-fill, --slider-track, --border-w, --focus-ring*, --radius-full
   */

  // Values
  export let value: number | undefined;            // single-thumb
  export let values: [number, number] | undefined; // dual-thumb
  export let min = 0;
  export let max = 100;
  export let step = 1;
  export let minDistance = 0; // minimum distance between thumbs (for ranges)

  // UI
  export let size: 'sm'|'md'|'lg' = 'md';
  export let orientation: 'horizontal'|'vertical' = 'horizontal';
  export let disabled = false;
  export let marks: Array<number | { value:number; label?:string }> = [];
  export let color: string | undefined; // custom fill color

  // Forms
  export let name: string | undefined; // if provided, we emit hidden inputs
  export let ariaLabel: string | undefined; // used when no visible label around
  export let ariaDescribedby: string | undefined;

  const dispatch = createEventDispatcher<{ input: { value:number|[number,number] }, commit: { value:number|[number,number] } }>();

  // Internal state
  let trackEl: HTMLDivElement | null = null;
  let draggingIndex: 0|1|null = null;

  function isRange(): boolean { return Array.isArray(values); }

  // Derived normalized values
  $: _single = (value ?? (isRange() ? undefined : min)) as number | undefined;
  $: _range  = (values ?? undefined) as [number, number] | undefined;

  // Helpers
  const clamp = (n:number, lo:number, hi:number)=> Math.min(Math.max(n, lo), hi);
  const roundStep = (n:number)=> Math.round((n - min) / step) * step + min;
  const toPct = (n:number)=> ((n - min) / Math.max(1, (max - min))) * 100;
  const fromPct = (pct:number)=> min + (pct/100) * (max - min);

  function emitInput(){ dispatch('input', { value: isRange() ? (values as [number,number]) : (value as number) }); }
  function emitCommit(){ dispatch('commit', { value: isRange() ? (values as [number,number]) : (value as number) }); }

  function setSingle(n:number){ value = clamp(roundStep(n), min, max); emitInput(); }
  function setRangeAt(i:0|1, n:number){
    if (!_range) return;
    const other = _range[i===0?1:0];
    const clamped = clamp(roundStep(n), min, max);
    let a = i===0 ? Math.min(clamped, other - minDistance) : Math.max(clamped, other + minDistance);
    if (i===0) values = [a, other]; else values = [other, a];
    emitInput();
  }

  function nearestThumb(n:number): 0|1 {
    if (!_range) return 0;
    const [a,b] = _range; return Math.abs(n-a) <= Math.abs(n-b) ? 0 : 1;
  }

  function onTrackPointerDown(e:PointerEvent){
    if (disabled || !trackEl) return;
    trackEl.setPointerCapture(e.pointerId);
    const rect = trackEl.getBoundingClientRect();
    const pct = orientation==='horizontal'
      ? ((e.clientX - rect.left) / rect.width) * 100
      : (1 - (e.clientY - rect.top) / rect.height) * 100;
    const n = clamp(roundStep(fromPct(pct)), min, max);
    if (isRange()) {
      const idx = nearestThumb(n);
      draggingIndex = idx;
      setRangeAt(idx, n);
    } else {
      setSingle(n);
    }
  }

  function onTrackPointerMove(e:PointerEvent){
    if (disabled || draggingIndex===null || !trackEl) return;
    const rect = trackEl.getBoundingClientRect();
    const pct = orientation==='horizontal'
      ? ((e.clientX - rect.left) / rect.width) * 100
      : (1 - (e.clientY - rect.top) / rect.height) * 100;
    const n = clamp(roundStep(fromPct(pct)), min, max);
    if (isRange()) setRangeAt(draggingIndex, n); else setSingle(n);
  }
  function onTrackPointerUp(e:PointerEvent){
    draggingIndex = null; emitCommit();
  }

  function onThumbKey(e: KeyboardEvent, i?:0|1){
    if (disabled) return;
    let delta = 0;
    if (e.key==='ArrowRight' || e.key==='ArrowUp') delta = step;
    if (e.key==='ArrowLeft' || e.key==='ArrowDown') delta = -step;
    if (e.key==='PageUp') delta = step * 10;
    if (e.key==='PageDown') delta = -step * 10;
    if (e.key==='Home') delta = -(isRange() ? ((i===0? (_range?.[0]??min) : (_range?.[1]??max)) - min) : ((_single??min)-min));
    if (e.key==='End')  delta =  (isRange() ? ((i===0? max-(_range?.[0]??min) : max-(_range?.[1]??max))) : (max-(_single??min)));

    if (delta !== 0){
      e.preventDefault();
      if (isRange()) setRangeAt(i ?? 0, clamp((i===0? (_range![0]) : _range![1]) + delta, min, max));
      else setSingle(clamp((_single ?? min) + delta, min, max));
      emitCommit();
    }
  }

  // Styles
  $: _fill = color ?? 'var(--slider-fill, var(--primary, #3b82f6))';
  $: _track = 'var(--slider-track, color-mix(in oklab, currentColor 20%, transparent))';
  $: _thumb = 'var(--slider-thumb, var(--_fill, currentColor))';
  $: styleVars = `--_fill:${_fill}; --_track:${_track}; --_thumb:${_thumb};`;

  // Percent positions
  $: p1 = toPct(isRange() ? (_range?.[0] ?? min) : (_single ?? min));
  $: p2 = toPct(isRange() ? (_range?.[1] ?? max) : (_single ?? min));
  $: left = Math.min(p1, p2);
  $: right = 100 - Math.max(p1, p2);

  // For forms: emit hidden inputs when name provided
  $: nameA = name && isRange() ? `${name}[]` : (name ?? undefined);
</script>

<div class="sl" data-size={size} data-orient={orientation} aria-disabled={disabled} style={styleVars}>
  <div
    class="sl__track"
    bind:this={trackEl}
    on:pointerdown={onTrackPointerDown}
    on:pointermove={onTrackPointerMove}
    on:pointerup={onTrackPointerUp}
    on:pointercancel={onTrackPointerUp}
    role="group"
    aria-disabled={disabled}
  >
    <!-- background track -->
    <div class="sl__rail" aria-hidden="true"></div>
    <!-- selected range fill -->
    <div class="sl__fill" style={orientation==='horizontal' ? `left:${left}%; right:${right}%` : `bottom:${left}%; top:${right}%`}></div>

    <!-- thumbs -->
    {#if isRange()}
      <div
        class="sl__thumb"
        role="slider"
        tabindex={disabled? -1 : 0}
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={_range?.[0]}
        aria-label={ariaLabel}
        aria-describedby={ariaDescribedby}
        style={orientation==='horizontal' ? `left:calc(${toPct(_range?.[0] ?? min)}% - var(--_thumb-size)/2)` : `bottom:calc(${toPct(_range?.[0] ?? min)}% - var(--_thumb-size)/2)`}
        on:keydown={(e)=>onThumbKey(e,0)}
        on:pointerdown={(e)=>{ draggingIndex=0; (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId); }}
      ></div>
      <div
        class="sl__thumb"
        role="slider"
        tabindex={disabled? -1 : 0}
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={_range?.[1]}
        aria-label={ariaLabel}
        aria-describedby={ariaDescribedby}
        style={orientation==='horizontal' ? `left:calc(${toPct(_range?.[1] ?? max)}% - var(--_thumb-size)/2)` : `bottom:calc(${toPct(_range?.[1] ?? max)}% - var(--_thumb-size)/2)`}
        on:keydown={(e)=>onThumbKey(e,1)}
        on:pointerdown={(e)=>{ draggingIndex=1; (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId); }}
      ></div>
    {:else}
      <div
        class="sl__thumb"
        role="slider"
        tabindex={disabled? -1 : 0}
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={_single}
        aria-label={ariaLabel}
        aria-describedby={ariaDescribedby}
        style={orientation==='horizontal' ? `left:calc(${toPct(_single ?? min)}% - var(--_thumb-size)/2)` : `bottom:calc(${toPct(_single ?? min)}% - var(--_thumb-size)/2)`}
        on:keydown={(e)=>onThumbKey(e)}
        on:pointerdown={(e)=>{ draggingIndex=0; (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId); }}
      ></div>
    {/if}

    <!-- Marks -->
    {#if marks && marks.length}
      <div class="sl__marks" aria-hidden="true">
        {#each marks as m}
          {#if typeof m === 'number'}
            <span class="sl__mark" style={orientation==='horizontal' ? `left:${toPct(m)}%` : `bottom:${toPct(m)}%`}></span>
          {:else}
            <span class="sl__mark" style={orientation==='horizontal' ? `left:${toPct(m.value)}%` : `bottom:${toPct(m.value)}%`}>
              {#if m.label}<em class="sl__mark-label">{m.label}</em>{/if}
            </span>
          {/if}
        {/each}
      </div>
    {/if}
  </div>

  <!-- Hidden inputs for forms -->
  {#if name}
    {#if isRange()}
      <input type="hidden" name={nameA} value={_range?.[0]} />
      <input type="hidden" name={nameA} value={_range?.[1]} />
    {:else}
      <input type="hidden" name={name} value={_single} />
    {/if}
  {/if}
</div>

<style>
  .sl { display: inline-grid; gap: .375rem; --_thumb-size: 16px; }
  .sl[data-size='sm'] { --_track-h: 4px; --_thumb-size: 14px; }
  .sl[data-size='md'] { --_track-h: 6px; --_thumb-size: 16px; }
  .sl[data-size='lg'] { --_track-h: 8px; --_thumb-size: 18px; }

  .sl__track { position: relative; user-select: none; touch-action: none; }
  .sl[data-orient='horizontal'] .sl__track { width: 100%; height: max( var(--_track-h), var(--_thumb-size) ); }
  .sl[data-orient='vertical']   .sl__track { height: 160px; width: max( var(--_track-h), var(--_thumb-size) ); }

  .sl__rail { position:absolute; inset:0; margin:auto; height: var(--_track-h); width: 100%; border-radius: var(--radius-full, 9999px); background: var(--_track); }
  .sl[data-orient='vertical'] .sl__rail { width: var(--_track-h); height: 100%; }

  .sl__fill { position:absolute; border-radius: var(--radius-full, 9999px); background: var(--_fill); }
  .sl[data-orient='horizontal'] .sl__fill { height: var(--_track-h); }
  .sl[data-orient='vertical']   .sl__fill { width: var(--_track-h); }

  .sl__thumb { position:absolute; width: var(--_thumb-size); height: var(--_thumb-size); background: var(--_fill); border-radius: 50%; border: var(--border-w,1px) solid color-mix(in oklab, black 15%, transparent); box-shadow:
      0 0 0 var(--focus-ring-offset, 2px) transparent,
      0 0 0 calc(var(--focus-ring-w, 2px) + var(--focus-ring-offset, 2px)) transparent;
  }
  .sl__thumb:focus-visible {
    outline: none;
    box-shadow:
      0 0 0 var(--focus-ring-offset, 2px) white,
      0 0 0 calc(var(--focus-ring-w, 2px) + var(--focus-ring-offset, 2px)) var(--focus-ring, oklch(82% 0.25 230));
  }

  .sl__marks { position:absolute; inset:0; pointer-events:none; }
  .sl__mark { position:absolute; width:1px; height:.5rem; background: color-mix(in oklab, currentColor 60%, transparent); transform: translateX(-.5px); }
  .sl[data-orient='vertical'] .sl__mark { transform: translateY(.25rem); left: calc(50% - .5px); width: 2px; height: 1px; }
  .sl__mark-label { position:absolute; top: .6rem; transform: translateX(-50%); font-size:.7em; color: color-mix(in oklab, currentColor 65%, transparent); }
</style>

<!--
USAGE

Single value:
  <Slider bind:value={v} min={0} max={100} step={1} />

Range:
  <Slider bind:values={range} min={0} max={100} step={1} minDistance={5} />

Vertical with marks:
  <Slider bind:value={v} orientation="vertical" marks={[0,25,50,75,100]} />

Events:
  <Slider bind:value={v} on:input={(e)=>console.log(e.detail.value)} on:commit={(e)=>console.log('commit', e.detail.value)} />
-->