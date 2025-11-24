<script lang="ts">
  import { onMount, onDestroy } from 'svelte';

  export let selector: string = '.col-2';
  export let levels: (1 | 2)[] = [1, 2];
  export let scrollContainer: HTMLElement | null = null;
  export let className = '';

  type TocItem = { id: string; text: string; level: 1 | 2 };
  let toc: TocItem[] = [];
  let activeId = '';

  function slugify(s: string) {
    return s.toLowerCase().trim().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
  }

  function buildToc() {
    const rootEl = document.querySelector(selector);
    if (!rootEl) return;

    const headings = rootEl.querySelectorAll<HTMLElement>(levels.map(l => `h${l}`).join(','));
    const items: TocItem[] = [];

    headings.forEach(h => {
      const level = parseInt(h.tagName.substring(1)) as 1 | 2;
      if (!h.id) {
        const base = slugify(h.textContent || '');
        let id = base, n = 2;
        while (document.getElementById(id)) id = `${base}-${n++}`;
        h.id = id;
      }
      items.push({ id: h.id, text: h.textContent || '', level });
      h.style.scrollMarginTop = '24px';
    });

    toc = items;
  }

  let io: IntersectionObserver;
  function observeActive() {
    io?.disconnect();
    const rootEl = document.querySelector(selector);
    if (!rootEl) return;

    io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter(e => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        const top = visible[0];
        if (top?.target instanceof HTMLElement) activeId = top.target.id;
      },
      {
        root: scrollContainer || document.querySelector('.cl-main-content'),
        rootMargin: '0px 0px -70% 0px',
        threshold: [0, 1e-6, 0.1]
      }
    );

    rootEl.querySelectorAll(levels.map(l => `h${l}`).join(','))
      .forEach(h => io.observe(h));
  }

  onMount(() => {
    buildToc();
    observeActive();
    const mo = new MutationObserver(() => {
      buildToc();
      observeActive();
    });
    const rootEl = document.querySelector(selector);
    if (rootEl) mo.observe(rootEl, { childList: true, subtree: true });

    window.addEventListener('resize', buildToc);
    return () => {
      io?.disconnect();
      mo.disconnect();
      window.removeEventListener('resize', buildToc);
    };
  });
</script>

<nav class={`cl-toc ${className}`} aria-label="On this page">
  {#if toc.length}
    <div class="toc-title">On this page</div>
    <ul>
      {#each toc as item}
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
  {/if}
</nav>

<style>
  /* ---- Theme-aware color hooks (with sensible fallbacks) ---- */
  .cl-toc {
    --toc-blue:    var(--color-secondary-600, #367be6);
    --toc-blue-50: var(--color-secondary-50,  #edf3ff);
    --toc-orange:  var(--color-accent-500,    #e55a01);
    --toc-ink:     var(--color-surface-950,   #0a0a0a);
    --toc-muted:   var(--color-surface-700,   #666);
    --toc-border:  var(--color-neutral-200,   #e6e6e6);
    --toc-bg:      var(--color-surface-50,    #ffffff);
    --toc-tint:    color-mix(in oklab, var(--toc-orange) 12%, transparent);
    --toc-blue-tint: color-mix(in oklab, var(--toc-blue) 16%, transparent);
    --toc-focus:   var(--color-info-900, #2eaadf);
    position: relative;
  }

  /* Left gradient rail */
  .cl-toc::before {
    content: "";
    position: absolute;
    left: -1px;
    top: 0;
    bottom: 0;
    width: 3px;
    background: linear-gradient(
      180deg,
      var(--toc-blue) 0%,
      color-mix(in oklab, var(--toc-blue) 70%, var(--toc-orange)) 60%,
      var(--toc-orange) 100%
    );
    border-radius: 3px;
    opacity: .9;
  }

  .cl-toc {
    padding-left: 1rem;
    font-size: 0.9375rem;
    color: var(--toc-ink);
  }

  .toc-title {
    font-weight: 700;
    margin-bottom: .5rem;
    background: linear-gradient(90deg, var(--toc-blue) 0%, var(--toc-orange) 80%);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    letter-spacing: .01em;
  }

  .cl-toc ul { list-style: none; margin: 0; padding: 0; }
  .cl-toc li { margin: .25rem 0; position: relative; }

  /* Link base */
  .cl-toc a {
    --dot: var(--toc-blue);
    display: inline-flex;
    gap: .5rem;
    align-items: center;
    text-decoration: none;
    color: var(--toc-ink);
    opacity: .88;
    padding: .25rem .5rem .25rem .25rem;
    border-radius: .5rem;
    transition: color .15s ease, background-color .15s ease, opacity .15s ease, transform .15s ease;
  }

  /* Colored dot */
  .cl-toc a::before {
    content: "";
    width: .5rem;
    height: .5rem;
    border-radius: 50%;
    background: radial-gradient(circle at 30% 30%, var(--dot), color-mix(in oklab, var(--dot) 30%, #0000));
    box-shadow: 0 0 0 2px color-mix(in oklab, var(--dot) 25%, transparent);
    flex: 0 0 auto;
    translate: 0 .5px;
  }

  /* Level-specific colors (more interesting) */
  .cl-toc .level-1 > a { --dot: var(--toc-blue); }
  .cl-toc .level-2 > a { --dot: var(--toc-orange); font-size: .92em; padding-left: .5rem; }

  /* Hover/focus */
  .cl-toc a:hover {
    opacity: 1;
    background: var(--toc-blue-50);
    text-decoration: underline;
    text-underline-offset: 3px;
    text-decoration-thickness: 2px;
  }
  .cl-toc a:focus-visible {
    outline: 2px solid var(--toc-focus);
    outline-offset: 2px;
    background: var(--toc-blue-50);
  }

  /* Active item highlight */
  .cl-toc a.active {
    opacity: 1;
    font-weight: 700;
    color: var(--toc-ink);
    background: var(--toc-tint);
    position: relative;
  }
  .cl-toc a.active::after {
    content: "";
    position: absolute;
    left: -0.75rem;
    top: 50%;
    translate: 0 -50%;
    width: 3px;
    height: 1.25rem;
    border-radius: 3px;
    background: var(--dot); /* matches dot color per level */
    box-shadow: 0 0 0 2px color-mix(in oklab, var(--dot) 25%, transparent);
  }

  /* “Section” indent line for level-2 items (subtle) */
  .cl-toc .level-2 {
    border-left: 1px dashed color-mix(in oklab, var(--toc-blue) 25%, var(--toc-border));
    margin-left: .5rem;
    padding-left: .75rem;
  }

  /* Muted title color if tokens missing */
  .cl-toc :is(.toc-title) {
    -webkit-text-stroke: 0 transparent; /* crisp on Windows */
  }

  /* Reduced motion: keep it calm */
  @media (prefers-reduced-motion: reduce) {
    .cl-toc a { transition: none; }
  }
</style>
