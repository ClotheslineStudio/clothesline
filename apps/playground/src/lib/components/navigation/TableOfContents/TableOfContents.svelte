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

<nav class={`cl-toc ${className}`}>
  {#if toc.length}
    <div class="toc-title">On this page</div>
    <ul>
      {#each toc as item}
        <li class={`level-${item.level}`}>
          <a href={`#${item.id}`} class:active={activeId === item.id}>
            {item.text}
          </a>
        </li>
      {/each}
    </ul>
  {/if}
</nav>

<style>
  .cl-toc {
    border-left: 1px solid var(--border-default-color, #ddd);
    padding-left: var(--spacing-4, 1rem);
    font-size: 0.9375rem;
  }
  .toc-title { font-weight: 600; margin-bottom: .5rem; color: var(--text-muted, #666); }
  .cl-toc ul { list-style: none; margin: 0; padding: 0; }
  .cl-toc li { margin: .25rem 0; }
  .cl-toc .level-2 { padding-left: .75rem; font-size: 0.9em; }
  .cl-toc a { text-decoration: none; opacity: .8; color: var(--link-color, inherit); }
  .cl-toc a:hover { opacity: 1; text-decoration: underline; }
  .cl-toc a.active { opacity: 1; font-weight: 600; }
</style>
