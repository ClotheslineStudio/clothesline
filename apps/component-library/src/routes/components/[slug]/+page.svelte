<script lang="ts">
  import { Badge, Heading, Paragraph, Table } from '@clothesline/ui';
  import ComponentPreview from '../../../lib/components/ComponentPreview.svelte';
  import ButtonDemo from '$lib/docs/demos/ButtonDemo.svelte';
  import CardDemo from '$lib/docs/demos/CardDemo.svelte';
  import BadgeDemo from '$lib/docs/demos/BadgeDemo.svelte';
  import InputDemo from '$lib/docs/demos/InputDemo.svelte';
  import TextareaDemo from '$lib/docs/demos/TextareaDemo.svelte';
  import TabsDemo from '$lib/docs/demos/TabsDemo.svelte';
  import AlertDemo from '$lib/docs/demos/AlertDemo.svelte';
  import SpinnerDemo from '$lib/docs/demos/SpinnerDemo.svelte';
  import ProgressDemo from '$lib/docs/demos/ProgressDemo.svelte';
  import SkeletonDemo from '$lib/docs/demos/SkeletonDemo.svelte';
  import TableDemo from '$lib/docs/demos/TableDemo.svelte';
  import ContainerDemo from '$lib/docs/demos/ContainerDemo.svelte';
  import StackDemo from '$lib/docs/demos/StackDemo.svelte';
  import GridDemo from '$lib/docs/demos/GridDemo.svelte';
  import FieldsetDemo from '$lib/docs/demos/FieldsetDemo.svelte';
  import CodeBlockDemo from '$lib/docs/demos/CodeBlockDemo.svelte';
  import DialogDemo from '$lib/docs/demos/DialogDemo.svelte';
  import PopoverDemo from '$lib/docs/demos/PopoverDemo.svelte';

  let { data } = $props();

  const demos = {
    button: ButtonDemo,
    card: CardDemo,
    badge: BadgeDemo,
    container: ContainerDemo,
    stack: StackDemo,
    grid: GridDemo,
    input: InputDemo,
    textarea: TextareaDemo,
    fieldset: FieldsetDemo,
    alert: AlertDemo,
    spinner: SpinnerDemo,
    progress: ProgressDemo,
    skeleton: SkeletonDemo,
    tabs: TabsDemo,
    table: TableDemo,
    'code-block': CodeBlockDemo,
    dialog: DialogDemo,
    popover: PopoverDemo
  } as const;

  const doc = $derived(data.item);
  const highlightedCode = $derived(data.highlightedCode ?? '');
  const DemoComponent = $derived(demos[doc.slug as keyof typeof demos] ?? null);
</script>

<header class="doc-header">
  <Badge variant="neutral">{doc.section}</Badge>
  <Heading level={1} className="doc-title">{doc.title}</Heading>
  <p>{doc.description}</p>
</header>

<section class="doc-section">
  <Heading level={2} className="doc-section-title">Preview</Heading>
  <ComponentPreview title={`${doc.title} Example`} code={doc.code} highlightedCode={highlightedCode}>
    {#if DemoComponent}
      <DemoComponent />
    {/if}
  </ComponentPreview>
</section>

<section class="doc-section">
  <Heading level={2} className="doc-section-title">Usage</Heading>
  <Paragraph tone="muted">
    Import directly from <code>@clothesline/ui</code> and layer any Tailwind utility classes through each component's <code>className</code> prop when needed.
  </Paragraph>
</section>

<section class="doc-section">
  <Heading level={2} className="doc-section-title">Props</Heading>
  {#if doc.props.length === 0}
    <Paragraph tone="muted">No documented props yet for this page.</Paragraph>
  {:else}
    <div class="docs-surface table-wrap">
      <Table>
        <svelte:fragment slot="head">
          <th>Prop</th>
          <th>Type</th>
          <th>Default</th>
          <th>Description</th>
        </svelte:fragment>
        <svelte:fragment slot="body">
          <tbody>
            {#each doc.props as prop}
              <tr>
                <td><code>{prop.name}</code></td>
                <td><code>{prop.type}</code></td>
                <td>{prop.defaultValue ?? '-'}</td>
                <td>{prop.description}</td>
              </tr>
            {/each}
          </tbody>
        </svelte:fragment>
      </Table>
    </div>
  {/if}
</section>

<style>
  .doc-header {
    margin-bottom: var(--spacing-8, 2rem);
  }

  :global(.doc-title) {
    margin-top: var(--spacing-3, 0.75rem);
    margin-bottom: var(--spacing-2, 0.5rem);
    font-size: clamp(1.9rem, 2.8vw, 2.4rem);
    line-height: 1.12;
    letter-spacing: -0.01em;
  }

  .doc-header p {
    margin: 0;
    max-width: 68ch;
    color: var(--on-surface-muted, var(--color-surface-700-vis));
    font-size: 1.02rem;
    line-height: 1.65;
  }

  .doc-section + .doc-section {
    margin-top: var(--spacing-9, 2.5rem);
  }

  :global(.doc-section-title) {
    margin: 0 0 var(--spacing-4, 1rem);
    font-size: clamp(1.35rem, 1.45vw, 1.65rem);
    line-height: 1.2;
  }

  .table-wrap {
    overflow: hidden;
  }

  :global(.table-wrap .cl-table-wrapper) {
    border-color: var(--border-color-default, var(--color-surface-300-vis));
    background: var(--background-panel, var(--color-surface-50-vis));
  }

  :global(.table-wrap .cl-table) {
    background: var(--background-panel, var(--color-surface-50-vis));
    color: var(--on-surface, var(--color-surface-900-vis));
  }

  :global(.table-wrap .cl-table thead) {
    background: var(--background-elevation-2, var(--color-surface-100-vis));
    color: var(--on-surface, var(--color-surface-900-vis));
  }

  :global(.table-wrap table td),
  :global(.table-wrap table th) {
    padding: 0.65rem 0.75rem;
    border-bottom: 1px solid var(--border-color-default, var(--color-surface-300-vis));
    text-align: left;
    font-size: 0.875rem;
    color: var(--on-surface, var(--color-surface-900-vis));
  }

  :global(.table-wrap table td) {
    background: var(--background-panel, var(--color-surface-50-vis));
  }

  :global(.table-wrap table tbody tr:nth-child(even) td) {
    background: color-mix(in oklab, var(--background-elevation-1, var(--color-surface-100-vis)) 70%, transparent);
  }

  :global(.table-wrap table code) {
    color: var(--on-surface-strong, var(--color-surface-950-vis));
  }
</style>
