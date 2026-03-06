export type DocsSection = {
  title: string;
  items: DocsItem[];
};

export type DocsProp = {
  name: string;
  type: string;
  defaultValue?: string;
  description: string;
};

export type DocsItem = {
  slug: string;
  title: string;
  section: string;
  description: string;
  code: string;
  props: DocsProp[];
  tag?: 'new' | 'beta';
};

export const docsSections: DocsSection[] = [
  {
    title: 'Get Started',
    items: [
      {
        slug: 'introduction',
        title: 'Introduction',
        section: 'Get Started',
        description: 'Overview of the Clothesline component library and how to use it.',
        code: `import { Button } from '@clothesline/ui';`,
        props: []
      }
    ]
  },
  {
    title: 'Core',
    items: [
      {
        slug: 'button',
        title: 'Button',
        section: 'Core',
        description: 'Trigger actions with semantic variants, sizes, and states.',
        code: `<script lang="ts">
  import { Button } from '@clothesline/ui';
</script>

<Button color="primary" variant="solid">Save changes</Button>`,
        props: [
          { name: 'variant', type: "'solid' | 'outline' | 'ghost' | 'link'", defaultValue: 'solid', description: 'Visual style variant.' },
          { name: 'size', type: "'sm' | 'md' | 'lg'", defaultValue: 'md', description: 'Button size scale.' },
          { name: 'color', type: 'semantic color key', defaultValue: 'primary', description: 'Semantic intent color.' }
        ]
      },
      {
        slug: 'card',
        title: 'Card',
        section: 'Core',
        description: 'Flexible content container with tone, spacing, and elevation.',
        code: `<script lang="ts">
  import { Card, Heading, Paragraph } from '@clothesline/ui';
</script>

<Card tone="surface" padding="md" shadow="sm">
  <Heading level={3}>Card title</Heading>
  <Paragraph tone="muted">Card content goes here.</Paragraph>
</Card>`,
        props: [
          { name: 'tone', type: "'surface' | 'primary' | 'neutral'", defaultValue: 'surface', description: 'Background tone.' },
          { name: 'padding', type: "'none' | 'sm' | 'md' | 'lg'", defaultValue: 'md', description: 'Inner spacing preset.' },
          { name: 'shadow', type: "'none' | 'sm' | 'md' | 'lg'", defaultValue: 'md', description: 'Elevation level.' }
        ]
      },
      {
        slug: 'badge',
        title: 'Badge',
        section: 'Core',
        description: 'Compact status and metadata indicator for dense interfaces.',
        code: `<script lang="ts">
  import { Badge } from '@clothesline/ui';
</script>

<Badge variant="success">Stable</Badge>`,
        props: [
          { name: 'variant', type: 'component variant', defaultValue: 'neutral', description: 'Badge semantic style.' },
          { name: 'size', type: 'size key', defaultValue: 'md', description: 'Badge size.' }
        ]
      }
    ]
  },
  {
    title: 'Layout',
    items: [
      {
        slug: 'container',
        title: 'Container',
        section: 'Layout',
        description: 'Page-width constraining wrapper with token-driven gutters.',
        code: `<script lang="ts">
  import { Container } from '@clothesline/ui';
</script>

<Container size="lg">...</Container>`,
        props: [
          { name: 'size', type: "'sm' | 'md' | 'lg' | 'xl' | 'full'", defaultValue: 'lg', description: 'Maximum content width.' },
          { name: 'center', type: 'boolean', defaultValue: 'true', description: 'Center container in viewport.' },
          { name: 'padded', type: 'boolean', defaultValue: 'true', description: 'Apply token-based horizontal gutters.' }
        ]
      },
      {
        slug: 'stack',
        title: 'Stack',
        section: 'Layout',
        description: 'Flexible row/column composition primitive with spacing tokens.',
        code: `<script lang="ts">
  import { Stack } from '@clothesline/ui';
</script>

<Stack direction="row" gap="sm" wrap>...</Stack>`,
        props: [
          { name: 'direction', type: "'row' | 'column'", defaultValue: 'column', description: 'Main layout axis.' },
          { name: 'gap', type: 'spacing token key', defaultValue: 'md', description: 'Item spacing between children.' },
          { name: 'wrap', type: 'boolean', defaultValue: 'false', description: 'Allow wrapping on row stacks.' }
        ]
      },
      {
        slug: 'grid',
        title: 'Grid',
        section: 'Layout',
        description: 'Responsive grid primitive with fixed or auto-fit columns.',
        code: `<script lang="ts">
  import { Grid } from '@clothesline/ui';
</script>

<Grid minItemWidth="160px" gap="sm">...</Grid>`,
        props: [
          { name: 'cols', type: 'number', defaultValue: '12', description: 'Fixed column count when minItemWidth is not set.' },
          { name: 'minItemWidth', type: 'string', description: 'Auto-fit min width (e.g. 160px).' },
          { name: 'gap', type: 'spacing token key', defaultValue: 'md', description: 'Grid gap size.' }
        ]
      }
    ]
  },
  {
    title: 'Forms',
    items: [
      {
        slug: 'input',
        title: 'Input',
        section: 'Forms',
        description: 'Single-line text entry field (alias for TextField).',
        code: `<script lang="ts">
  import { Field, Input } from '@clothesline/ui';
</script>

<Field label="Email" forId="email" hint="We never share your email.">
  <Input id="email" placeholder="you@company.com" />
</Field>`,
        props: [
          { name: 'value', type: 'string', description: 'Current input value.' },
          { name: 'placeholder', type: 'string', description: 'Placeholder text.' },
          { name: 'className', type: 'string', description: 'Additional class names for Tailwind layering.' }
        ]
      },
      {
        slug: 'textarea',
        title: 'Textarea',
        section: 'Forms',
        description: 'Multi-line text input that works with Field/HelpText/ErrorText.',
        code: `<script lang="ts">
  import { Field, Textarea } from '@clothesline/ui';
</script>

<Field label="Summary" forId="summary" hint="Keep it under 300 characters.">
  <Textarea id="summary" rows={4} placeholder="Project summary" />
</Field>`,
        props: [
          { name: 'rows', type: 'number', defaultValue: '4', description: 'Visible row count.' },
          { name: 'invalid', type: 'boolean', defaultValue: 'false', description: 'Invalid state for validation UI.' },
          { name: 'ariaDescribedby', type: 'string', description: 'Connect hint or error messaging.' }
        ]
      },
      {
        slug: 'fieldset',
        title: 'Fieldset',
        section: 'Forms',
        description: 'Semantic grouping for related controls with legend and helper description.',
        code: `<script lang="ts">
  import { Fieldset } from '@clothesline/ui';
</script>

<Fieldset legend="Preferences" description="Choose one or more options.">...</Fieldset>`,
        props: [
          { name: 'legend', type: 'string', description: 'Fieldset title announced by assistive tech.' },
          { name: 'description', type: 'string', description: 'Supporting helper text.' },
          { name: 'disabled', type: 'boolean', defaultValue: 'false', description: 'Disable all grouped controls.' }
        ],
        tag: 'new'
      }
    ]
  },
  {
    title: 'Feedback',
    items: [
      {
        slug: 'alert',
        title: 'Alert',
        section: 'Feedback',
        description: 'Status callout with semantic variants and optional dismiss action.',
        code: `<script lang="ts">
  import { Alert } from '@clothesline/ui';
</script>

<Alert variant="info" title="Info">Deploy in progress.</Alert>`,
        props: [
          { name: 'variant', type: "'neutral' | 'info' | 'success' | 'warning' | 'error'", defaultValue: 'neutral', description: 'Semantic alert intent.' },
          { name: 'title', type: 'string', description: 'Optional heading text.' },
          { name: 'dismissible', type: 'boolean', defaultValue: 'false', description: 'Show dismiss button.' }
        ]
      },
      {
        slug: 'spinner',
        title: 'Spinner',
        section: 'Feedback',
        description: 'Compact loading indicator for async states.',
        code: `<script lang="ts">
  import { Spinner } from '@clothesline/ui';
</script>

<Spinner size="md" label="Loading data" />`,
        props: [
          { name: 'size', type: "'sm' | 'md' | 'lg'", defaultValue: 'md', description: 'Spinner size token.' },
          { name: 'label', type: 'string', description: 'Accessible loading label.' }
        ]
      },
      {
        slug: 'progress',
        title: 'Progress',
        section: 'Feedback',
        description: 'Determinate and indeterminate progress bar.',
        code: `<script lang="ts">
  import { Progress } from '@clothesline/ui';
</script>

<Progress value={45} max={100} label="Upload progress" />`,
        props: [
          { name: 'value', type: 'number | null', description: 'Current value; null for indeterminate.' },
          { name: 'max', type: 'number', defaultValue: '100', description: 'Maximum progress value.' },
          { name: 'label', type: 'string', description: 'Accessible description.' }
        ]
      },
      {
        slug: 'skeleton',
        title: 'Skeleton',
        section: 'Feedback',
        description: 'Placeholder blocks while content is loading.',
        code: `<script lang="ts">
  import { Skeleton } from '@clothesline/ui';
</script>

<Skeleton height="1rem" width="80%" />`,
        props: [
          { name: 'width', type: 'string', description: 'CSS width value.' },
          { name: 'height', type: 'string', defaultValue: '1rem', description: 'Skeleton block height.' },
          { name: 'animated', type: 'boolean', defaultValue: 'true', description: 'Enable shimmer animation.' }
        ],
        tag: 'new'
      }
    ]
  },
  {
    title: 'Navigation',
    items: [
      {
        slug: 'tabs',
        title: 'Tabs',
        section: 'Navigation',
        description: 'Switch between content panels in a compact navigation row.',
        code: `<script lang="ts">
  import { Tabs } from '@clothesline/ui';

  let activeTab = 'overview';
  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'api', label: 'API' },
    { id: 'examples', label: 'Examples' }
  ];
</script>

<Tabs {tabs} {activeTab} onChange={(id) => (activeTab = id)} />`,
        props: [
          { name: 'tabs', type: '{ id: string; label: string }[]', description: 'Tab data model.' },
          { name: 'activeTab', type: 'string', description: 'Current selected tab id.' },
          { name: 'onChange', type: '(id: string) => void', description: 'Selection change callback.' }
        ]
      }
    ]
  },
  {
    title: 'Data',
    items: [
      {
        slug: 'table',
        title: 'Table',
        section: 'Data',
        description: 'Slot-based semantic table wrapper for structured data.',
        code: `<script lang="ts">
  import { Table } from '@clothesline/ui';
</script>

<Table>...</Table>`,
        props: [
          { name: 'className', type: 'string', description: 'Additional classes for wrapper styling.' }
        ]
      },
      {
        slug: 'code-block',
        title: 'CodeBlock',
        section: 'Data',
        description: 'Documentation-focused code display with copy support.',
        code: `<script lang="ts">
  import { CodeBlock } from '@clothesline/ui';
</script>

<CodeBlock code={'<Button>Save</Button>'} language="svelte" />`,
        props: [
          { name: 'code', type: 'string', description: 'Source code string.' },
          { name: 'language', type: 'string', description: 'Display language label.' },
          { name: 'showLineNumbers', type: 'boolean', defaultValue: 'false', description: 'Render line numbers.' }
        ],
        tag: 'new'
      }
    ]
  },
  {
    title: 'Overlay',
    items: [
      {
        slug: 'dialog',
        title: 'Dialog',
        section: 'Overlay',
        description: 'Modal container for interruptive workflows and confirmation states.',
        code: `<script lang="ts">
  import { Dialog } from '@clothesline/ui';

  let open = false;
</script>

<Dialog bind:open={open}>...</Dialog>`,
        props: [
          { name: 'open', type: 'boolean', defaultValue: 'false', description: 'Controls visibility.' },
          { name: 'closeOnBackdrop', type: 'boolean', defaultValue: 'true', description: 'Close when backdrop is clicked.' },
          { name: 'closeOnEscape', type: 'boolean', defaultValue: 'true', description: 'Close on Escape key.' }
        ],
        tag: 'beta'
      },
      {
        slug: 'popover',
        title: 'Popover',
        section: 'Overlay',
        description: 'Anchored floating container with placement and outside-click close behavior.',
        code: `<script lang="ts">
  import { Popover } from '@clothesline/ui';
</script>

<Popover placement="bottom">...</Popover>`,
        props: [
          { name: 'placement', type: "'top' | 'bottom' | 'left' | 'right'", defaultValue: 'bottom', description: 'Popover anchor side.' },
          { name: 'align', type: "'start' | 'center' | 'end'", defaultValue: 'center', description: 'Cross-axis alignment.' },
          { name: 'offset', type: 'number', defaultValue: '8', description: 'Offset distance from trigger.' }
        ],
        tag: 'beta'
      }
    ]
  }
];

export const componentItems = docsSections
  .flatMap((section) => section.items)
  .filter((item) => item.slug !== 'introduction');

export const docsBySlug = new Map(docsSections.flatMap((section) => section.items).map((item) => [item.slug, item]));
