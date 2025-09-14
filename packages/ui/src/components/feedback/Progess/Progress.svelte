<script lang="ts">
  export let value: number | null = null; // null => indeterminate
  export let max = 100;
  export let label: string | undefined;
  $: clamped = value == null ? null : Math.max(0, Math.min(max, value));
  $: pct = clamped == null ? 0 : (clamped / max) * 100;
</script>

<div class="cl-progress" role="progressbar"
  aria-valuemin="0"
  aria-valuemax={max}
  aria-valuenow={value ?? undefined}
  aria-label={label}
  data-indeterminate={value == null ? '' : undefined}
>
  <div class="cl-progress__bar" style={`width:${pct}%`}></div>
</div>

<style>
  .cl-progress{
    position:relative; inline-size:100%;
    height: var(--progress-height); background: var(--progress-track);
    border-radius: var(--progress-radius); overflow:hidden;
  }
  .cl-progress__bar{
    height:100%; background: var(--progress-fill);
    transition: width .2s ease;
  }
  .cl-progress[data-indeterminate] .cl-progress__bar{
    position:absolute; inset:0 auto 0 0; width:40%;
    animation: indet 1.2s infinite linear;
    background-image: var(--progress-indeterminate-stripe);
    background-size: 200% 100%;
  }
  @keyframes indet {
    0% { left:-40%; }
    100% { left:100%; }
  }
</style>
