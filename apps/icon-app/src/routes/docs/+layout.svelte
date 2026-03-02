<script lang="ts">
  import { page } from '$app/stores';
  import { File, Home, Layers, Settings, Info, Star } from '@clothesline/icons';

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

  let { data, children } = $props<{
    data: { docs: DocNavItem[] };
    children: () => any;
  }>();

  const iconMap = {
    File,
    Home,
    Layers,
    Settings,
    Info,
    Star
  };

  function iconFor(name: string) {
    const key = name as keyof typeof iconMap;
    return iconMap[key] ?? File;
  }

  const docs = data.docs as DocNavItem[];

  const docsBySection: Record<string, DocNavItem[]> = docs.reduce(
    (acc: Record<string, DocNavItem[]>, doc: DocNavItem) => {
      const key = doc.section || 'General';
      if (!acc[key]) acc[key] = [];
      acc[key].push(doc);
      return acc;
    },
    {} as Record<string, DocNavItem[]>
  );

  const sectionEntries: Array<[string, DocNavItem[]]> = Object.entries(docsBySection).sort(([, aDocs], [, bDocs]) => {
    return (aDocs[0]?.sectionOrder ?? 999) - (bDocs[0]?.sectionOrder ?? 999);
  });
</script>

<div class="docs-shell">
  <aside class="docs-sidebar" aria-label="Docs navigation">
    {#each sectionEntries as [sectionName, docs]}
      <section class="docs-group">
        <h2 class="docs-group-title">{sectionName}</h2>
        <ul class="docs-nav">
          {#each docs as doc}
            {@const active = $page.url.pathname === `/docs/${doc.slug}`}
            {@const DocIcon = iconFor(doc.icon)}
            <li>
              <a
                href={`/docs/${doc.slug}`}
                class="docs-link"
                class:docs-link--active={active}
                aria-current={active ? 'page' : undefined}
              >
                <span class="docs-link-title-row">
                  <DocIcon size={13} />
                  <span>{doc.title}</span>
                </span>
                {#if doc.subsection}
                  <span class="docs-link-subsection">{doc.subsection}</span>
                {/if}
              </a>
            </li>
          {/each}
        </ul>
      </section>
    {/each}
  </aside>

  <section class="docs-main">
    {@render children()}
  </section>
</div>

<style>
  .docs-shell {
    --docs-sidebar-w: 18.5rem;
    display: grid;
    grid-template-columns: var(--docs-sidebar-w) minmax(0, 1fr);
    gap: var(--spacing-comfy, var(--spacing-6));
    align-items: start;
    padding-bottom: var(--spacing-section, var(--spacing-8));
  }

  .docs-sidebar {
    position: sticky;
    top: calc(var(--app-header-height, var(--size-container-md)) + var(--layout-gap, var(--spacing-4)));
    max-height: calc(100vh - var(--app-header-height, var(--size-container-md)) - var(--spacing-comfy, var(--spacing-6)));
    overflow-y: auto;
    border-right: var(--border-width-divider, var(--border-1)) solid color-mix(in oklab, var(--border-color-default) 70%, transparent);
    padding-right: var(--spacing-form, var(--spacing-4));
    padding-top: var(--spacing-compact, var(--spacing-2));
    display: grid;
    gap: var(--spacing-form, var(--spacing-4));
  }

  .docs-group {
    display: grid;
    gap: var(--spacing-gap-small, var(--spacing-2));
    padding-right: var(--spacing-compact, var(--spacing-2));
  }

  .docs-group-title {
    margin: 0;
    font-family: var(--type-overline-family);
    font-size: var(--type-overline-size);
    font-weight: var(--type-overline-weight);
    letter-spacing: var(--type-overline-tracking);
    text-transform: var(--type-overline-transform);
    color: var(--text-muted);
  }

  .docs-nav {
    list-style: none;
    margin: 0;
    padding: 0;
    display: grid;
    gap: 2px;
  }

  .docs-link {
    display: grid;
    gap: 2px;
    border-left: 2px solid transparent;
    border-radius: var(--radius-interactive);
    padding: var(--spacing-compact, var(--spacing-2)) var(--spacing-base, var(--spacing-3));
    color: var(--text-muted);
    text-decoration: none;
    transition:
      background-color var(--motion-duration-fast) var(--motion-ease),
      color var(--motion-duration-fast) var(--motion-ease),
      border-color var(--motion-duration-fast) var(--motion-ease);
  }

  .docs-link-title-row {
    display: inline-flex;
    align-items: center;
    gap: var(--spacing-2);
    font-family: var(--type-link-family);
    font-size: var(--type-link-size);
    font-weight: var(--type-link-weight);
    line-height: var(--type-link-leading);
  }

  .docs-link-subsection {
    font-size: var(--type-caption-size);
    color: var(--on-surface-subtle);
    padding-left: calc(13px + var(--spacing-2));
    line-height: 1.3;
  }

  .docs-link:hover {
    background: color-mix(in oklab, var(--on-surface) calc(var(--opacity-interactive-hover) * 100%), transparent);
    color: var(--on-surface);
  }

  .docs-link--active {
    border-left-color: var(--color-primary-500-vis);
    background: color-mix(in oklab, var(--color-primary-500-vis) 14%, transparent);
    color: var(--on-surface-strong);
  }

  .docs-link:focus-visible {
    outline: var(--focus-width) solid var(--focus-ring-color);
    outline-offset: var(--focus-offset);
  }

  .docs-main {
    min-width: 0;
    max-width: 100%;
  }

  @media (max-width: 1120px) {
    .docs-shell {
      grid-template-columns: 1fr;
    }

    .docs-sidebar {
      position: static;
      max-height: none;
      border-right: 0;
      border-bottom: var(--border-width-divider, var(--border-1)) solid color-mix(in oklab, var(--border-color-default) 70%, transparent);
      padding-right: 0;
      padding-bottom: var(--spacing-form, var(--spacing-4));
    }
  }
</style>
