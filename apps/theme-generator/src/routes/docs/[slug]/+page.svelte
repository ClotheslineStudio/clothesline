<script lang="ts">
  import { onMount, tick } from 'svelte';
  import { page } from '$app/stores';
  import { ArrowLeft, ArrowRight, Calendar, Checkmark, Minus, Close } from '@clothesline/icons';
  import type { DocPage } from '$lib/docs/content';

  type DocNavItem = {
    slug: string;
    title: string;
    section: string;
    sectionOrder: number;
    subsection?: string;
    order: number;
    icon: string;
    description?: string;
    lastUpdated?: string;
  };

  let { data } = $props<{ data: { doc: DocPage; prev: DocNavItem | null; next: DocNavItem | null } }>();

  let activeTocId = $state('');
  let helpfulVote = $state<'yes' | 'neutral' | 'no' | null>(null);
  let headings: HTMLElement[] = [];
  let raf = 0;
  const topOffset = 136;

  const resolveActiveHeading = () => {
    if (headings.length === 0) {
      activeTocId = '';
      return;
    }

    const hashId = decodeURIComponent(window.location.hash.replace('#', ''));
    if (hashId && headings.some((heading) => heading.id === hashId)) {
      activeTocId = hashId;
      return;
    }

    const thresholdY = window.scrollY + topOffset;
    let current = headings[0]?.id ?? '';
    for (const heading of headings) {
      if (heading.offsetTop <= thresholdY) {
        current = heading.id;
      } else {
        break;
      }
    }
    activeTocId = current;
  };

  const scheduleResolve = () => {
    if (raf) return;
    raf = window.requestAnimationFrame(() => {
      raf = 0;
      resolveActiveHeading();
    });
  };

  onMount(() => {
    const handleHashChange = () => {
      resolveActiveHeading();
    };

    window.addEventListener('scroll', scheduleResolve, { passive: true });
    window.addEventListener('resize', scheduleResolve);
    window.addEventListener('hashchange', handleHashChange);

    return () => {
      if (raf) window.cancelAnimationFrame(raf);
      window.removeEventListener('scroll', scheduleResolve);
      window.removeEventListener('resize', scheduleResolve);
      window.removeEventListener('hashchange', handleHashChange);
    };
  });

  $effect(() => {
    const slug = data.doc.slug;
    void slug;

    const bindHeadings = async () => {
      await tick();
      headings = Array.from(document.querySelectorAll<HTMLElement>('.docs-article h2, .docs-article h3'));
      scheduleResolve();
    };

    void bindHeadings();
  });
</script>

<div class="docs-grid">
  <article class="docs-article" aria-label={data.doc.title}>
    <nav class="docs-breadcrumbs" aria-label="Breadcrumb">
      <a href="/">Home</a>
      <span>/</span>
      <a href="/docs">Docs</a>
      <span>/</span>
      <strong>{$page.params.slug}</strong>
    </nav>

    <header class="doc-header">
      <p class="doc-kicker">{data.doc.section}</p>
      <h1>{data.doc.title}</h1>
      {#if data.doc.description}
        <p class="doc-description">{data.doc.description}</p>
      {/if}
      {#if data.doc.lastUpdated}
        <div class="doc-updated">
          <Calendar size={13} />
          <span>Last updated {data.doc.lastUpdated}</span>
        </div>
      {/if}
    </header>

    {@html data.doc.html}

    <footer class="doc-footer-nav">
      {#if data.prev}
        <a class="doc-footer-link" href={`/docs/${data.prev.slug}`}>
          <ArrowLeft size={14} />
          <span>
            <small>Previous</small>
            <strong>{data.prev.title}</strong>
          </span>
        </a>
      {:else}
        <span></span>
      {/if}

      {#if data.next}
        <a class="doc-footer-link doc-footer-link--next" href={`/docs/${data.next.slug}`}>
          <span>
            <small>Next</small>
            <strong>{data.next.title}</strong>
          </span>
          <ArrowRight size={14} />
        </a>
      {/if}
    </footer>
  </article>

  <aside class="docs-toc" aria-label="On this page">
    <div class="docs-toc-title">On this page</div>
    <ul>
      {#each data.doc.toc as item}
        <li class={`level-${item.level}`}>
          <a href={`#${item.id}`} class:active={activeTocId === item.id} onclick={() => (activeTocId = item.id)}
            >{item.text}</a
          >
        </li>
      {/each}
    </ul>

    <div class="docs-helpful">
      <p>Was this helpful?</p>
      <div class="docs-helpful-buttons">
        <button
          type="button"
          class:active={helpfulVote === 'yes'}
          aria-label="Yes"
          onclick={() => (helpfulVote = 'yes')}
        >
          <Checkmark size={12} />
        </button>
        <button
          type="button"
          class:active={helpfulVote === 'neutral'}
          aria-label="Neutral"
          onclick={() => (helpfulVote = 'neutral')}
        >
          <Minus size={12} />
        </button>
        <button
          type="button"
          class:active={helpfulVote === 'no'}
          aria-label="No"
          onclick={() => (helpfulVote = 'no')}
        >
          <Close size={12} />
        </button>
      </div>
    </div>
  </aside>
</div>

<style>
  .docs-grid {
    --docs-toc-w: 16rem;
    display: grid;
    grid-template-columns: minmax(0, 1fr) var(--docs-toc-w);
    gap: var(--spacing-comfy, var(--spacing-6));
    align-items: start;
  }

  .docs-article {
    min-width: 0;
    padding: var(--spacing-comfy, var(--spacing-6));
  }

  .docs-breadcrumbs {
    display: flex;
    gap: var(--spacing-compact, var(--spacing-2));
    align-items: center;
    margin-bottom: var(--spacing-stack, var(--spacing-5));
    font-family: var(--type-caption-family);
    font-size: var(--type-caption-size);
    font-weight: var(--type-caption-weight);
    line-height: var(--type-caption-leading);
    letter-spacing: var(--type-caption-tracking);
    color: var(--text-muted);
  }

  .docs-breadcrumbs a {
    color: inherit;
    text-decoration: none;
  }

  .docs-breadcrumbs a:hover {
    color: var(--link-color-hover);
    text-decoration: var(--anchor-text-decoration-hover, underline);
  }

  .doc-header {
    margin-bottom: var(--spacing-section, var(--spacing-8));
    display: grid;
    gap: var(--spacing-gap-small, var(--spacing-2));
  }

  .doc-kicker {
    margin: 0;
    font-family: var(--type-overline-family);
    font-size: var(--type-overline-size);
    font-weight: var(--type-overline-weight);
    letter-spacing: var(--type-overline-tracking);
    text-transform: var(--type-overline-transform);
    color: var(--text-muted);
  }

  h1 {
    margin: 0;
    font-family: var(--type-display-family);
    font-size: clamp(1.9rem, 2.2vw, 2.8rem);
    font-weight: var(--type-display-weight);
    line-height: var(--type-display-leading);
    letter-spacing: var(--type-display-tracking);
    color: var(--on-surface-strong);
  }

  .doc-description {
    margin: 0;
    max-width: 72ch;
    font-family: var(--type-subheading-family);
    font-size: var(--type-subheading-size);
    line-height: var(--type-subheading-leading);
    color: var(--on-surface-muted);
  }

  .doc-updated {
    display: inline-flex;
    align-items: center;
    gap: var(--spacing-2);
    margin-top: var(--spacing-2);
    color: var(--text-muted);
    font-size: var(--type-caption-size);
  }

  .docs-article :global(h2) {
    margin: var(--spacing-section, var(--spacing-8)) 0 var(--spacing-gap-small, var(--spacing-2)) 0;
    font-family: var(--type-heading-family);
    font-size: var(--type-heading-size);
    font-weight: var(--type-heading-weight);
    line-height: var(--type-heading-leading);
    letter-spacing: var(--type-heading-tracking);
    color: var(--on-surface-strong);
    scroll-margin-top: calc(var(--app-header-height, var(--size-container-md)) + var(--layout-gap, var(--spacing-4)));
  }

  .docs-article :global(h3) {
    margin: var(--spacing-stack, var(--spacing-5)) 0 var(--spacing-compact, var(--spacing-2)) 0;
    font-family: var(--type-subheading-family);
    font-size: var(--type-subheading-size);
    font-weight: var(--type-subheading-weight);
    line-height: var(--type-subheading-leading);
    letter-spacing: var(--type-subheading-tracking);
    color: var(--on-surface);
    scroll-margin-top: calc(var(--app-header-height, var(--size-container-md)) + var(--layout-gap, var(--spacing-4)));
  }

  .docs-article :global(p),
  .docs-article :global(li),
  .docs-article :global(blockquote) {
    font-family: var(--type-body-family);
    font-size: var(--type-body-size);
    font-weight: var(--type-body-weight);
    line-height: var(--type-body-leading);
    letter-spacing: var(--type-body-tracking);
    color: var(--on-surface);
  }

  .docs-article :global(p),
  .docs-article :global(ul),
  .docs-article :global(ol),
  .docs-article :global(pre),
  .docs-article :global(blockquote) {
    margin-top: 0;
    margin-bottom: var(--spacing-form, var(--spacing-4));
  }

  .docs-article :global(ul) {
    padding-left: var(--spacing-6);
  }

  .docs-article :global(ol) {
    padding-left: var(--spacing-6);
  }

  .docs-article :global(a) {
    color: var(--link-color);
    text-decoration: var(--anchor-text-decoration, underline);
    text-underline-offset: 2px;
  }

  .docs-article :global(a:hover) {
    color: var(--link-color-hover);
    text-decoration: var(--anchor-text-decoration-hover, underline);
  }

  .docs-article :global(code) {
    font-family: var(--type-code-family);
    font-size: var(--type-code-size);
    font-weight: var(--type-code-weight);
    line-height: var(--type-code-leading);
    letter-spacing: var(--type-code-tracking);
    background: color-mix(in oklab, var(--fill-surface-strong) 70%, transparent);
    padding: 0.1em 0.35em;
    border-radius: var(--radius-sm);
  }

  .docs-article :global(pre) {
    margin: var(--spacing-form, var(--spacing-4)) 0;
    border-radius: var(--radius-container);
    border: var(--border-width-card, var(--border-1)) solid var(--border-color-strong);
    background:
      linear-gradient(
        180deg,
        color-mix(in oklab, var(--fill-surface-strong) 90%, transparent) 0 2.1rem,
        var(--fill-surface-strong) 2.1rem
      );
    color: var(--on-surface);
    box-shadow: var(--elevation-hairline);
    overflow: auto;
    padding: var(--spacing-form, var(--spacing-4));
    position: relative;
    padding-top: calc(var(--spacing-form, var(--spacing-4)) + 1.1rem);
  }

  .docs-article :global(pre::before) {
    content: '';
    position: absolute;
    top: 0.8rem;
    left: 0.95rem;
    width: 0.42rem;
    height: 0.42rem;
    border-radius: var(--radius-full);
    background: color-mix(in oklab, var(--on-surface-muted) 75%, transparent);
    box-shadow:
      0.72rem 0 0 color-mix(in oklab, var(--on-surface-muted) 60%, transparent),
      1.44rem 0 0 color-mix(in oklab, var(--on-surface-muted) 45%, transparent);
  }

  .docs-article :global(pre code) {
    background: transparent;
    padding: 0;
  }

  .docs-article :global(.doc-callout) {
    position: relative;
    border: var(--border-width-card, var(--border-1)) solid var(--border-color-default);
    border-left-width: 3px;
    border-radius: var(--radius-interactive);
    padding: calc(var(--spacing-base, var(--spacing-3)) + 0.5rem) var(--spacing-base, var(--spacing-3))
      var(--spacing-base, var(--spacing-3));
    margin: var(--spacing-form, var(--spacing-4)) 0;
    background: color-mix(in oklab, var(--on-surface) 5%, transparent);
  }

  .docs-article :global(.doc-callout::before) {
    position: absolute;
    top: 0.45rem;
    left: var(--spacing-base, var(--spacing-3));
    font-family: var(--type-overline-family);
    font-size: var(--type-overline-size);
    font-weight: var(--type-overline-weight);
    letter-spacing: var(--type-overline-tracking);
    text-transform: var(--type-overline-transform);
    color: var(--on-surface-subtle);
  }

  .docs-article :global(.doc-callout--info) {
    border-left-color: var(--color-info-500-vis);
    background: color-mix(in oklab, var(--info-subtle) 65%, transparent);
  }

  .docs-article :global(.doc-callout--info::before) {
    content: 'Info';
    color: var(--color-info-500-vis);
  }

  .docs-article :global(.doc-callout--success) {
    border-left-color: var(--color-success-500-vis);
    background: color-mix(in oklab, var(--success-subtle) 65%, transparent);
  }

  .docs-article :global(.doc-callout--success::before) {
    content: 'Success';
    color: var(--color-success-500-vis);
  }

  .docs-article :global(.doc-callout--warning) {
    border-left-color: var(--color-warning-500-vis);
    background: color-mix(in oklab, var(--warning-subtle) 65%, transparent);
  }

  .docs-article :global(.doc-callout--warning::before) {
    content: 'Warning';
    color: var(--color-warning-500-vis);
  }

  .docs-article :global(.doc-callout--note) {
    border-left-color: var(--color-primary-500-vis);
    background: color-mix(in oklab, var(--primary-subtle) 65%, transparent);
  }

  .docs-article :global(.doc-callout--note::before) {
    content: 'Note';
    color: var(--color-primary-500-vis);
  }

  .docs-article :global(.doc-callout > :first-child) {
    margin-top: 0;
    padding-top: 0.45rem;
  }

  .docs-article :global(.doc-callout > :last-child) {
    margin-bottom: 0;
  }

  .docs-article :global(.doc-details) {
    margin: var(--spacing-form, var(--spacing-4)) 0;
    border: var(--border-width-card, var(--border-1)) solid var(--border-color-default);
    border-radius: var(--radius-container);
    overflow: hidden;
    background: color-mix(in oklab, var(--on-surface) 2.5%, transparent);
  }

  .docs-article :global(.doc-details > summary) {
    cursor: pointer;
    list-style: none;
    padding: var(--spacing-base, var(--spacing-3));
    padding-left: calc(var(--spacing-base, var(--spacing-3)) + 1rem);
    font-weight: var(--type-link-weight);
    background: color-mix(in oklab, var(--on-surface) 4%, transparent);
    position: relative;
  }

  .docs-article :global(.doc-details > summary::-webkit-details-marker) {
    display: none;
  }

  .docs-article :global(.doc-details > summary::before) {
    content: '\203A';
    position: absolute;
    left: 0.68rem;
    top: 50%;
    transform: translateY(-50%);
    font-size: 0.95rem;
    color: var(--on-surface-subtle);
    transition: transform var(--motion-duration-fast) var(--motion-ease);
  }

  .docs-article :global(.doc-details[open] > summary::before) {
    transform: translateY(-50%) rotate(90deg);
  }

  .docs-article :global(.doc-details__body) {
    padding: var(--spacing-base, var(--spacing-3));
    border-top: var(--border-width-divider, var(--border-1)) solid color-mix(in oklab, var(--border-color-default) 70%, transparent);
  }

  .doc-footer-nav {
    margin-top: var(--spacing-section, var(--spacing-8));
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--spacing-form, var(--spacing-4));
  }

  .doc-footer-link {
    display: inline-flex;
    align-items: center;
    gap: var(--spacing-2);
    border: var(--border-width-card, var(--border-1)) solid var(--border-color-default);
    border-radius: var(--radius-container);
    padding: var(--spacing-base, var(--spacing-3));
    text-decoration: none;
    color: var(--on-surface);
  }

  .doc-footer-link small {
    display: block;
    font-size: var(--type-overline-size);
    color: var(--text-muted);
  }

  .doc-footer-link strong {
    display: block;
    font-size: var(--type-link-size);
    font-weight: var(--type-link-weight);
  }

  .doc-footer-link--next {
    justify-self: end;
    text-align: right;
  }

  .docs-toc {
    position: sticky;
    top: calc(var(--app-header-height, var(--size-container-md)) + var(--layout-gap, var(--spacing-4)));
    padding: var(--spacing-base, var(--spacing-3));
    max-height: calc(100vh - var(--app-header-height, var(--size-container-md)) - var(--spacing-comfy, var(--spacing-6)));
    overflow-y: auto;
  }

  .docs-toc-title {
    margin: 0 0 var(--spacing-gap-small, var(--spacing-2)) 0;
    font-family: var(--type-overline-family);
    font-size: var(--type-overline-size);
    font-weight: var(--type-overline-weight);
    line-height: var(--type-overline-leading);
    letter-spacing: var(--type-overline-tracking);
    text-transform: var(--type-overline-transform);
    color: var(--text-muted);
  }

  .docs-toc ul {
    list-style: none;
    margin: 0;
    padding: 0;
    display: grid;
    gap: 2px;
  }

  .docs-toc a {
    display: block;
    text-decoration: none;
    border-left: 2px solid transparent;
    border-radius: var(--radius-interactive);
    padding: var(--spacing-compact, var(--spacing-2)) var(--spacing-base, var(--spacing-3));
    font-family: var(--type-caption-family);
    font-size: var(--type-caption-size);
    font-weight: var(--type-caption-weight);
    line-height: var(--type-caption-leading);
    color: var(--text-muted);
    transition:
      background-color var(--motion-duration-fast) var(--motion-ease),
      color var(--motion-duration-fast) var(--motion-ease),
      border-color var(--motion-duration-fast) var(--motion-ease);
  }

  .docs-toc a:hover {
    background: color-mix(in oklab, var(--on-surface) calc(var(--opacity-interactive-hover) * 100%), transparent);
    color: var(--on-surface);
  }

  .docs-toc a.active {
    border-left-color: var(--color-primary-500-vis);
    background: color-mix(in oklab, var(--color-primary-500-vis) 12%, transparent);
    color: var(--on-surface-strong);
  }

  .docs-toc li.level-3 a {
    padding-left: calc(var(--spacing-base, var(--spacing-3)) + var(--spacing-base, var(--spacing-3)));
    font-size: var(--type-overline-size);
  }

  .docs-helpful {
    margin-top: var(--spacing-form, var(--spacing-4));
    padding-top: var(--spacing-form, var(--spacing-4));
    border-top: var(--border-width-divider, var(--border-1)) solid color-mix(in oklab, var(--border-color-default) 70%, transparent);
  }

  .docs-helpful p {
    margin: 0 0 var(--spacing-gap-small, var(--spacing-2)) 0;
    font-size: var(--type-caption-size);
    color: var(--text-muted);
  }

  .docs-helpful-buttons {
    display: flex;
    gap: var(--spacing-2);
  }

  .docs-helpful-buttons button {
    width: 1.8rem;
    height: 1.8rem;
    border-radius: var(--radius-full);
    border: var(--border-width-card, var(--border-1)) solid var(--border-color-default);
    background: transparent;
    color: var(--on-surface-muted);
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }

  .docs-helpful-buttons button:hover {
    border-color: var(--border-color-strong);
    color: var(--on-surface);
    background: color-mix(in oklab, var(--on-surface) 8%, transparent);
  }

  .docs-helpful-buttons button.active {
    color: var(--on-surface-strong);
    border-color: var(--color-primary-500-vis);
    background: color-mix(in oklab, var(--color-primary-500-vis) 14%, transparent);
  }

  @media (max-width: 1200px) {
    .docs-grid {
      grid-template-columns: 1fr;
    }

    .docs-toc {
      position: static;
      max-height: none;
      border-top: var(--border-width-divider, var(--border-1)) solid color-mix(in oklab, var(--border-color-default) 70%, transparent);
      padding-top: var(--spacing-form, var(--spacing-4));
    }

    .doc-footer-nav {
      grid-template-columns: 1fr;
    }

    .doc-footer-link--next {
      justify-self: start;
      text-align: left;
    }
  }
</style>
