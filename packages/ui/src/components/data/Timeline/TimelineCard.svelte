<script lang="ts">
  export let variant: 'default' | 'outlined' | 'elevated' | 'soft' = 'default';
  export let ariaLabel: string = '';
</script>

<article class="cl-timeline-card" role="group" aria-label={ariaLabel} data-variant={variant}>
  <header class="cl-timeline-card__header"><slot name="header" /></header>
  <div class="cl-timeline-card__body"><slot /></div>
  <footer class="cl-timeline-card__footer"><slot name="footer" /></footer>
</article>

<style>
  .cl-timeline-card {
    --card-bg: var(--timeline-card-bg, var(--color-surface-0, #fff));
    --card-fg: var(--timeline-card-fg, var(--on-surface, #111));
    --card-bd: var(--timeline-card-border, 1px solid var(--color-surface-300, #ddd));
    --card-rd: var(--timeline-card-radius, .65rem);
    --card-sh: var(--timeline-card-shadow, 0 1px 3px rgba(0,0,0,.08));

    color: var(--card-fg);
    background: var(--card-bg);
    border: var(--card-bd);
    border-radius: var(--card-rd);
    box-shadow: var(--card-sh);
    padding: .9rem 1rem;
  }
  .cl-timeline-card[data-variant="outlined"] { box-shadow: none; }
  .cl-timeline-card[data-variant="soft"]     { background: var(--color-surface-100, #f6f6f6); }
  .cl-timeline-card[data-variant="elevated"] { box-shadow: 0 2px 8px rgba(0,0,0,.10), 0 1px 3px rgba(0,0,0,.06); }

  .cl-timeline-card__header { font-weight: 600; margin-bottom: .25rem; }
  .cl-timeline-card__footer { margin-top: .45rem; }
</style>

