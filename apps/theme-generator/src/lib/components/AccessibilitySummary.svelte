<script lang="ts">
  import type { AccessibilityMetrics } from '$lib/theme/types';

  let { metrics }: { metrics: AccessibilityMetrics } = $props();

  const badgeLabel = {
    aaBody: 'AA Body',
    aaLarge: 'AA Large',
    aaaBody: 'AAA Body',
    aaaLarge: 'AAA Large',
    tonalPairs: 'Tonal Pairs',
    cbAlerts: 'CB Alerts'
  } as const;
</script>

<section class="grid gap-4">
  <div class="surface-card flex items-center gap-4 p-4">
    <div class="score-circle" style={`--score:${metrics.score};`}>
      <span>{metrics.score}</span>
    </div>
    <div class="grid gap-2">
      <h3 class="m-0 text-lg font-semibold">Contrast and Accessibility</h3>
      <div class="flex flex-wrap gap-2 text-xs">
        <span class="badge-pill">{badgeLabel.aaBody}: {metrics.badges.aaBody.pass}/{metrics.badges.aaBody.total}</span>
        <span class="badge-pill">{badgeLabel.aaLarge}: {metrics.badges.aaLarge.pass}/{metrics.badges.aaLarge.total}</span>
        <span class="badge-pill">{badgeLabel.aaaBody}: {metrics.badges.aaaBody.pass}/{metrics.badges.aaaBody.total}</span>
        <span class="badge-pill">{badgeLabel.aaaLarge}: {metrics.badges.aaaLarge.pass}/{metrics.badges.aaaLarge.total}</span>
        <span class="badge-pill">{badgeLabel.tonalPairs}: {metrics.badges.tonalPairs.count}</span>
        <span class="badge-pill">{badgeLabel.cbAlerts}: {metrics.badges.cbAlerts.count}</span>
      </div>
    </div>
  </div>

  <div class="surface-card overflow-auto p-3">
    <table class="w-full min-w-[620px] text-sm">
      <thead>
        <tr class="text-left text-xs uppercase tracking-wide text-[var(--color-surface-700)]">
          <th class="py-2">Pair</th>
          <th class="py-2">Contrast Ratio</th>
          <th class="py-2">WCAG Status</th>
        </tr>
      </thead>
      <tbody>
        {#each metrics.pairResults as pair}
          <tr class="border-t border-[color:color-mix(in_oklab,var(--color-surface-700)_12%,transparent)]">
            <td class="py-2">{pair.name}</td>
            <td class="py-2">{pair.ratio.toFixed(2)}:1</td>
            <td class="py-2">{pair.ratio >= 7 ? 'AAA body' : pair.ratio >= 4.5 ? 'AA body / AAA large' : pair.ratio >= 3 ? 'AA large' : 'Fail'}</td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
</section>

<style>
  .score-circle {
    --score-angle: calc((var(--score) * 1deg) * 3.6);
    width: 74px;
    height: 74px;
    border-radius: 999px;
    display: grid;
    place-items: center;
    font-size: 1.05rem;
    font-weight: 700;
    background:
      radial-gradient(circle at center, var(--color-surface-50) 54%, transparent 56%),
      conic-gradient(var(--color-success-500) var(--score-angle), var(--color-surface-300) 0);
  }
</style>