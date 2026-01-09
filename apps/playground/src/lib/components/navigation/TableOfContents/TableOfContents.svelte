<script lang="ts">
  import { onMount } from 'svelte';

  export let selector: string = '.col-2';
  export let levels: (1 | 2)[] = [1, 2];
  export let scrollContainer: HTMLElement | null = null;
  export let className = '';

  /**
   * Sticky top offset for the TOC panel.
   * Use number (px) or CSS length/token.
   */
  export let stickyTop: number | string = 'var(--layout-sticky-top, var(--layout-inset, var(--spacing-6)))';

  /**
   * If you have a sticky header (AppBar), add its height here so headings
   * don't end up under it when jumped to.
   */
  export let headingScrollMarginTop: number | string =
    'calc(var(--layout-sticky-top, var(--layout-inset, var(--spacing-6))) + var(--size-control-md, 40px))';

  type TocItem = { id: string; text: string; level: 1 | 2 };
  let toc: TocItem[] = [];
  let activeId = '';

  function cssLen(v: number | string) {
    return typeof v === 'number' ? `${v}px` : v;
  }

  function slugify(s: string) {
    return s.toLowerCase().trim().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
  }

  function getRootEl(): Element | null {
    return document.querySelector(selector);
  }

  function getObserverRoot(): Element | null {
    // Prefer explicit scrollContainer, otherwise attempt to find a reasonable main scroller
    return scrollContainer ?? document.querySelector('.appshell__content') ?? null;
  }

  function buildToc() {
    const rootEl = getRootEl();
    if (!rootEl) return;

    const headings = rootEl.querySelectorAll<HTMLElement>(levels.map((l) => `h${l}`).join(','));
    const items: TocItem[] = [];

    headings.forEach((h) => {
      const level = parseInt(h.tagName.substring(1)) as 1 | 2;

      if (!h.id) {
        const base = slugify(h.textContent || '');
        let id = base, n = 2;
        while (document.getElementById(id)) id = `${base}-${n++}`;
        h.id = id;
      }

      items.push({ id: h.id, text: h.textContent || '', level });

      // Ensure anchor jumps land below sticky header/top inset
      h.style.scrollMarginTop = cssLen(headingScrollMarginTop);
    });

    toc = items;
  }

  let io: IntersectionObserver | undefined;

  function observeActive() {
    io?.disconnect();

    const rootEl = getRootEl();
    if (!rootEl) return;

    const observerRoot = getObserverRoot();

    io = new IntersectionObserver(
      (entries) => {
        // Choose the top-most visible heading
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        const top = visible[0];
        if (top?.target instanceof HTMLElement) activeId = top.target.id;
      },
      {
        root: observerRoot instanceof HTMLElement ? observerRoot : null,
        rootMargin: '0px 0px -70% 0px',
        threshold: [0, 0.01, 0.1]
      }
    );

    rootEl
      .querySelectorAll(levels.map((l) => `h${l}`).join(','))
      .forEach((h) => io!.observe(h));
  }

  onMount(() => {
    buildToc();
    observeActive();

    const mo = new MutationObserver(() => {
      buildToc();
      observeActive();
    });

    const rootEl = getRootEl();
    if (rootEl) mo.observe(rootEl, { childList: true, subtree: true });

    // Keep this minimal—MutationObserver already catches most changes.
    window.addEventListener('resize', buildToc);

    return () => {
      io?.disconnect();
      mo.disconnect();
      window.removeEventListener('resize', buildToc);
    };
  });
</script>

<nav
  class={`cl-toc ${className}`}
  aria-label="On this page"
  style={`
    --toc-sticky-top: ${cssLen(stickyTop)};
  `}
>
  {#if toc.length}
    <div class="cl-toc__inner">
      <div class="toc-title">On this page</div>

      <div class="cl-toc__scroll">
        <ul>
          {#each toc as item (item.id)}
            <li class={`level-${item.level}`}>
              <a
                href={`#${item.id}`}
                class:active={activeId === item.id}
                aria-current={activeId === item.id ? 'true' : undefined}
              >
                {item.text}
              </a>
            </li>
          {/each}
        </ul>
      </div>
    </div>
  {/if}
</nav>

<style>
  /* ==========================================================================
     TOC — sticky panel + scroll
     ========================================================================== */

  .cl-toc {
    /* Accent choices (theme-dependent, vision-aware if available) */
    --toc-accent-1: var(--color-secondary-600-vis, var(--color-secondary-600));
    --toc-accent-2: var(--color-accent-500-vis, var(--color-accent-500));

    /* Text roles */
    --toc-ink:   var(--on-surface-strong, var(--color-surface-950));
    --toc-text:  var(--on-surface,        var(--color-surface-900));
    --toc-muted: var(--on-surface-muted,  var(--color-surface-700));

    

    /* Interaction tints */
    --toc-hover-tint:  color-mix(in oklab, var(--toc-ink) calc(var(--opacity-interactive-hover) * 100%), transparent);
    --toc-active-tint: color-mix(in oklab, var(--toc-accent-2) calc(var(--opacity-interactive-active) * 100%), transparent);

    /* Focus ring */
    --toc-focus: var(--color-info-500-vis, var(--color-info-500));

    /* Sticky behavior */
    position: sticky;
    top: var(--toc-sticky-top);
    align-self: start;

    /* Panel look */
    padding: var(--spacing-4);
    border-radius: var(--radius-card, var(--radius-6));
    background: var(--toc-surface);
    border: var(--toc-border-w) solid color-mix(in oklab, var(--toc-border) 70%, transparent);
   

    color: var(--toc-text);
    font-size: var(--type-body-size);

    min-width: 0;
  }

  /* Inner layout so we can scroll just the list */
  .cl-toc__inner {
    position: relative;
    min-width: 0;
  }

  /* Scroll region (prevents TOC from extending beyond viewport) */
  .cl-toc__scroll {
    margin-top: var(--spacing-2);
    max-height: calc(100dvh - var(--toc-sticky-top) - var(--spacing-8));
    overflow: auto;
    padding-right: var(--spacing-2); /* breathing room for scrollbar */
  }

  /* Left gradient rail (semantic accents) */
  .cl-toc__inner::before {
    content: "";
    position: absolute;
    left: calc(-1 * var(--spacing-4));
    top: 0;
    bottom: 0;
    width: 3px;
    background: linear-gradient(
      180deg,
      var(--toc-accent-1) 0%,
      color-mix(in oklab, var(--toc-accent-1) 65%, var(--toc-accent-2)) 60%,
      var(--toc-accent-2) 100%
    );
    border-radius: var(--radius-focus-ring, var(--radius-1));
    opacity: var(--opacity-90);
  }

  .toc-title {
    font-weight: var(--type-weight-bold);
    letter-spacing: var(--type-tracking-tight);

    background: linear-gradient(90deg, var(--toc-accent-1) 0%, var(--toc-accent-2) 80%);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }

  .cl-toc ul { list-style: none; margin: 0; padding: 0; }
  .cl-toc li { margin: var(--spacing-1) 0; position: relative; }

  /* Link base */
  .cl-toc a {
    --dot: var(--toc-accent-1);

    display: inline-flex;
    gap: var(--spacing-2);
    align-items: center;

    text-decoration: none;
    color: var(--toc-text);
    opacity: var(--opacity-90);

    padding: var(--spacing-1) var(--spacing-2) var(--spacing-1) var(--spacing-1);
    border-radius: var(--radius-interactive);
    transition:
      background-color var(--motion-duration-fast) var(--motion-ease),
      opacity var(--motion-duration-fast) var(--motion-ease),
      color var(--motion-duration-fast) var(--motion-ease);
  }

  /* Colored dot */
  .cl-toc a::before {
    content: "";
    width: var(--size-2);
    height: var(--size-2);
    border-radius: var(--radius-full);
    background: radial-gradient(
      circle at 30% 30%,
      var(--dot),
      color-mix(in oklab, var(--dot) 30%, transparent)
    );
    box-shadow: 0 0 0 var(--border-width-default, var(--border-1))
      color-mix(in oklab, var(--dot) 35%, transparent);
    flex: 0 0 auto;
    translate: 0 0.5px;
  }

  /* Level-specific */
  .cl-toc .level-1 > a { --dot: var(--toc-accent-1); }
  .cl-toc .level-2 > a {
    --dot: var(--toc-accent-2);
    font-size: var(--type-scale-sm);
    padding-left: var(--spacing-3);
  }

  .cl-toc a:hover {
    opacity: var(--opacity-100);
    background: var(--toc-hover-tint);
    text-decoration: underline;
    text-underline-offset: 3px;
    text-decoration-thickness: 2px;
  }

  .cl-toc a:focus-visible {
    outline: var(--focus-width, var(--focus-2)) solid var(--toc-focus);
    outline-offset: var(--focus-offset, var(--focus-2));
    background: var(--toc-hover-tint);
  }

  .cl-toc a.active {
    opacity: var(--opacity-100);
    font-weight: var(--type-weight-semibold);
    color: var(--toc-ink);
    background: var(--toc-active-tint);
    position: relative;
  }

  .cl-toc a.active::after {
    content: "";
    position: absolute;
    left: calc(-1 * var(--spacing-3));
    top: 50%;
    translate: 0 -50%;
    width: 3px;
    height: calc(var(--size-control-sm) + var(--spacing-2));
    border-radius: var(--radius-focus-ring, var(--radius-1));
    background: var(--dot);
    box-shadow: 0 0 0 var(--border-width-default, var(--border-1))
      color-mix(in oklab, var(--dot) 35%, transparent);
  }

  .cl-toc .level-2 {
    border-left: var(--toc-border-w) dashed color-mix(in oklab, var(--toc-muted) 35%, var(--toc-border));
    margin-left: var(--spacing-2);
    padding-left: var(--spacing-3);
  }

  @media (prefers-reduced-motion: reduce) {
    .cl-toc a { transition: none; }
  }
</style>


