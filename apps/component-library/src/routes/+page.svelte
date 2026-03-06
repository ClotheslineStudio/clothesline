<script lang="ts">
  import { Card, Heading, Paragraph, Stack, Badge } from '@clothesline/ui';
  import { GitBranch } from '@clothesline/icons';
  import { componentItems } from '$lib/docs/registry';

  function getSourceSearchHref(title: string) {
    const q = `${title} path:packages/ui/src/components language:Svelte`;
    return `https://github.com/search?q=${encodeURIComponent(q)}&type=code`;
  }
</script>

<section class="intro">
  <Badge variant="info">Get Started</Badge>
  <Heading level={1} className="intro-title">Clothesline Component Library</Heading>
  <p>
    Token-driven Svelte UI components built for Clothesline themes and designed to layer cleanly with Tailwind utilities.
  </p>
</section>

<section class="intro-section">
  <Heading level={2} className="intro-section-title">What You Get</Heading>
  <Stack direction="row" gap="md" wrap>
    <div class="intro-card shine-card">
      <Card padding="md" shadow="sm">
        <Heading level={3}>Theme-aware defaults</Heading>
        <Paragraph tone="muted">All primitives use semantic CSS variables from `@clothesline/themes`.</Paragraph>
      </Card>
    </div>
    <div class="intro-card shine-card">
      <Card padding="md" shadow="sm">
        <Heading level={3}>Tailwind-friendly</Heading>
        <Paragraph tone="muted">Components expose `className` hooks so utility classes can refine layout and spacing.</Paragraph>
      </Card>
    </div>
    <div class="intro-card shine-card">
      <Card padding="md" shadow="sm">
        <Heading level={3}>Composable primitives</Heading>
        <Paragraph tone="muted">Form, layout, and feedback pieces are built to compose without style collisions.</Paragraph>
      </Card>
    </div>
  </Stack>
</section>

<section class="intro-section">
  <Heading level={2} className="intro-section-title">Available Component Docs</Heading>
  <div class="component-list">
    {#each componentItems as item}
      <article class="component-card docs-surface shine-card">
        <a href={`/components/${item.slug}`} class="component-link">
          <strong>{item.title}</strong>
          <span>{item.description}</span>
        </a>
        <div class="component-meta">
          {#if item.tag}
            <span class={`card-tag card-tag--${item.tag}`}>{item.tag}</span>
          {/if}
          <a
            href={getSourceSearchHref(item.title)}
            target="_blank"
            rel="noreferrer noopener"
            class="source-link"
            aria-label={`Search GitHub source for ${item.title}`}
            title={`Search GitHub source for ${item.title}`}
          >
            <GitBranch width="14" height="14" />
          </a>
        </div>
      </article>
    {/each}
  </div>
</section>

<style>
  .intro {
    margin-bottom: var(--spacing-8, 2rem);
  }

  :global(.intro-title) {
    margin-top: var(--spacing-3, 0.75rem);
    margin-bottom: var(--spacing-2, 0.5rem);
    font-size: clamp(1.9rem, 2.8vw, 2.4rem);
    line-height: 1.12;
    letter-spacing: -0.01em;
  }

  .intro p {
    margin: 0;
    max-width: 65ch;
    color: var(--on-surface-muted, var(--color-surface-700-vis));
    font-size: 1.02rem;
    line-height: 1.65;
  }

  .intro-section + .intro-section {
    margin-top: var(--spacing-9, 2.5rem);
  }

  :global(.intro-section-title) {
    margin: 0 0 var(--spacing-4, 1rem);
    font-size: clamp(1.35rem, 1.45vw, 1.65rem);
    line-height: 1.2;
  }

  .intro-card {
    width: min(100%, 320px);
    flex: 1 1 320px;
    min-height: 170px;
  }

  .intro-card :global(.cl-card) {
    height: 100%;
  }

  .shine-card {
    position: relative;
    overflow: hidden;
  }

  .shine-card::before {
    content: '';
    position: absolute;
    inset: 0;
    pointer-events: none;
    background:
      linear-gradient(
        to top right,
        color-mix(in oklab, var(--primary, var(--color-primary-500-vis)) 16%, transparent) 0%,
        transparent 48%,
        color-mix(in oklab, var(--info, var(--color-info-500-vis)) 14%, transparent) 100%
      );
    opacity: 0.42;
  }

  :global(html[data-mode='dark']) .shine-card::before {
    opacity: 0.52;
  }

  .component-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
    grid-auto-rows: 1fr;
    gap: var(--spacing-3, 0.75rem);
  }

  .component-card {
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  .component-link {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    gap: var(--spacing-2, 0.5rem);
    text-decoration: none;
    color: inherit;
    padding: var(--spacing-3, 0.75rem);
    transition: color 120ms ease;
    isolation: isolate;
    min-height: 104px;
    height: auto;
    flex: 1 1 auto;
  }

  .component-link strong {
    display: block;
    margin: 0;
    min-height: 1.6em;
    line-height: 1.25;
  }

  .component-card:hover {
    transform: translateY(-1px);
    border-color: color-mix(in oklab, var(--primary, var(--color-primary-500-vis)) 30%, var(--border-color-default));
  }

  .component-link span {
    display: block;
    margin: 0;
    font-size: 0.875rem;
    line-height: 1.45;
    color: var(--on-surface-muted, var(--color-surface-700-vis));
  }

  .component-meta {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--spacing-2, 0.5rem);
    min-height: 1.6rem;
    padding: 0 var(--spacing-3, 0.75rem) var(--spacing-3, 0.75rem);
  }

  .card-tag {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 2.35rem;
    height: 1.22rem;
    padding-inline: 0.4rem;
    border-radius: var(--radius-full);
    font-size: 0.7rem;
    font-weight: 700;
    letter-spacing: 0.02em;
    text-transform: uppercase;
    border: 1px solid transparent;
  }

  .card-tag--new {
    color: color-mix(in oklab, var(--color-success-700-vis) 80%, white);
    background: color-mix(in oklab, var(--color-success-500-vis) 20%, transparent);
    border-color: color-mix(in oklab, var(--color-success-500-vis) 40%, transparent);
  }

  .card-tag--beta {
    color: color-mix(in oklab, var(--color-info-700-vis) 78%, white);
    background: color-mix(in oklab, var(--color-info-500-vis) 18%, transparent);
    border-color: color-mix(in oklab, var(--color-info-500-vis) 42%, transparent);
  }

  .source-link {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 1.55rem;
    height: 1.55rem;
    border-radius: var(--radius-sm, 0.45rem);
    border: 1px solid color-mix(in oklab, var(--border-color-default, var(--color-surface-300-vis)) 80%, transparent);
    color: var(--on-surface-muted, var(--color-surface-700-vis));
    text-decoration: none;
    transition: background-color 120ms ease, color 120ms ease, border-color 120ms ease;
  }

  .source-link:hover {
    color: var(--on-surface, var(--color-surface-900-vis));
    background: color-mix(in oklab, var(--primary, var(--color-primary-500-vis)) 14%, transparent);
    border-color: color-mix(in oklab, var(--primary, var(--color-primary-500-vis)) 36%, var(--border-color-default));
  }
</style>
