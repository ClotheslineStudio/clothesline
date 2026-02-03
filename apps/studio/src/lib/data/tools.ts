// apps/studio/src/lib/data/tools.ts

export type ProofItem = {
  label: string;
  href?: string;
  kind?: 'repo' | 'doc' | 'ship';
  note?: string;
};

export type ToolItem = {
  id: string;
  label: string;
  iconSrc: string;
  alt?: string;
  stack: 'Build + Ship' | 'Design' | 'Delivery' | 'Data';
  band: 'Core' | 'Active' | 'Familiar' | 'Occasional' | 'Legacy';
  lastUsed: string;
  context: string;
  proof: ProofItem[];
  useCases?: string[];
};

// Example data. Fill out with real tools as needed.
export const tools: ToolItem[] = [
  {
    id: 'sveltekit',
    label: 'SvelteKit',
    iconSrc: '/icons/svelte-svgrepo-com.svg',
    alt: 'Svelte',
    stack: 'Build + Ship',
    band: 'Core',
    lastUsed: 'Dec 2025',
    context: 'UI framework for modern web apps',
    proof: [
      { label: 'clothesline.dev', href: 'https://clothesline.dev', kind: 'ship' },
      { label: 'Docs', href: 'https://kit.svelte.dev/docs', kind: 'doc' }
    ],
    useCases: ['Web apps', 'Design systems']
  },
  {
    id: 'figma',
    label: 'Figma',
    iconSrc: '/icons/figma-svgrepo-com.svg',
    alt: 'Figma',
    stack: 'Design',
    band: 'Core',
    lastUsed: 'Dec 2025',
    context: 'UI/UX design and prototyping',
    proof: [
      { label: 'Design System', kind: 'ship' },
      { label: 'Figma Community', href: 'https://figma.com/community', kind: 'doc' }
    ],
    useCases: ['Prototyping', 'Design tokens']
  },
  {
    id: 'typescript',
    label: 'TypeScript',
    iconSrc: '/icons/typescript-official-svgrepo-com.svg',
    alt: 'TypeScript',
    stack: 'Build + Ship',
    band: 'Active',
    lastUsed: 'Dec 2025',
    context: 'Typed superset of JavaScript',
    proof: [
      { label: 'clothesline.dev', kind: 'ship' },
      { label: 'Docs', href: 'https://www.typescriptlang.org/docs/', kind: 'doc' }
    ],
    useCases: ['Type safety', 'Tooling']
  },
  {
    id: 'css',
    label: 'CSS',
    iconSrc: '/icons/css3-svgrepo-com.svg',
    alt: 'CSS3',
    stack: 'Build + Ship',
    band: 'Core',
    lastUsed: 'Dec 2025',
    context: 'Styling for the web',
    proof: [
      { label: 'Design System', kind: 'ship' }
    ],
    useCases: ['Styling', 'Layout']
  },
  {
    id: 'tailwind',
    label: 'Tailwind',
    iconSrc: '/icons/tailwind-svgrepo-com.svg',
    alt: 'Tailwind CSS',
    stack: 'Build + Ship',
    band: 'Active',
    lastUsed: 'Dec 2025',
    context: 'Utility-first CSS framework',
    proof: [
      { label: 'Docs', href: 'https://tailwindcss.com/docs', kind: 'doc' }
    ],
    useCases: ['Rapid UI', 'Design systems']
  },
  {
    id: 'github',
    label: 'GitHub',
    iconSrc: '/icons/github-142-svgrepo-com.svg',
    alt: 'GitHub',
    stack: 'Delivery',
    band: 'Core',
    lastUsed: 'Dec 2025',
    context: 'Code hosting and collaboration',
    proof: [
      { label: 'clothesline repo', kind: 'repo' }
    ],
    useCases: ['Version control', 'CI/CD']
  },
  {
    id: 'markdown',
    label: 'Markdown',
    iconSrc: '/icons/markdown-svgrepo-com.svg',
    alt: 'Markdown',
    stack: 'Delivery',
    band: 'Active',
    lastUsed: 'Dec 2025',
    context: 'Lightweight markup language',
    proof: [
      { label: 'Docs', kind: 'doc' }
    ],
    useCases: ['Docs', 'Content']
  },
 
  {
    id: 'aseprite',
    label: 'Aseprite',
    iconSrc: '/icons/aseprite-svgrepo-com.svg',
    alt: 'Aseprite',
    stack: 'Design',
    band: 'Familiar',
    lastUsed: '2025',
    context: 'Pixel art tool',
    proof: [
      { label: 'Pixel art assets', kind: 'ship' }
    ],
    useCases: ['Sprites', 'Animation']
  },
  {
    id: 'adobe-illustrator',
    label: 'Illustrator',
    iconSrc: '/icons/adobe-illustrator-svgrepo-com.svg',
    alt: 'Adobe Illustrator',
    stack: 'Design',
    band: 'Active',
    lastUsed: '2025',
    context: 'Vector graphics editor',
    proof: [
      { label: 'Icons', kind: 'ship' }
    ],
    useCases: ['Icons', 'Brand']
  },
  {
    id: 'adobe-photoshop',
    label: 'Photoshop',
    iconSrc: '/icons/adobe-photoshop-svgrepo-com.svg',
    alt: 'Adobe Photoshop',
    stack: 'Design',
    band: 'Familiar',
    lastUsed: '2025',
    context: 'Raster graphics editor',
    proof: [
      { label: 'Mockups', kind: 'ship' }
    ],
    useCases: ['Mockups', 'Photo editing']
  },
  {
    id: 'adobe-premiere',
    label: 'Premiere Pro',
    iconSrc: '/icons/adobe-premiere-svgrepo-com.svg',
    alt: 'Adobe Premiere Pro',
    stack: 'Design',
    band: 'Occasional',
    lastUsed: '2025',
    context: 'Video editing',
    proof: [
      { label: 'Video assets', kind: 'ship' }
    ],
    useCases: ['Video', 'Editing']
  },
  {
    id: 'adobe-after-effects',
    label: 'After Effects',
    iconSrc: '/icons/adobe-after-effects-svgrepo-com.svg',
    alt: 'Adobe After Effects',
    stack: 'Design',
    band: 'Occasional',
    lastUsed: '2025',
    context: 'Motion graphics',
    proof: [
      { label: 'Motion assets', kind: 'ship' }
    ],
    useCases: ['Motion', 'Animation']
  },
  {
    id: 'drupal',
    label: 'Drupal',
    iconSrc: '/icons/drupal-svgrepo-com.svg',
    alt: 'Drupal CMS',
    stack: 'Delivery',
    band: 'Legacy',
    lastUsed: '2024',
    context: 'CMS platform',
    proof: [
      { label: 'Drupal site', kind: 'ship' }
    ],
    useCases: ['CMS', 'Content']
  },
  {
    id: 'gitbook',
    label: 'GitBook',
    iconSrc: '/icons/gitbook-svgrepo-com.svg',
    alt: 'GitBook',
    stack: 'Delivery',
    band: 'Familiar',
    lastUsed: '2025',
    context: 'Docs platform',
    proof: [
      { label: 'Docs', kind: 'doc' }
    ],
    useCases: ['Docs', 'Content']
  },
  {
    id: 'trello',
    label: 'Trello',
    iconSrc: '/icons/trello-svgrepo-com.svg',
    alt: 'Trello',
    stack: 'Delivery',
    band: 'Active',
    lastUsed: '2025',
    context: 'Project management',
    proof: [
      { label: 'Boards', kind: 'ship' }
    ],
    useCases: ['Project management']
  },
  {
    id: 'mailchimp',
    label: 'Mailchimp',
    iconSrc: '/icons/mailchimp-svgrepo-com (1).svg',
    alt: 'Mailchimp',
    stack: 'Delivery',
    band: 'Familiar',
    lastUsed: '2025',
    context: 'Email marketing',
    proof: [
      { label: 'Campaigns', kind: 'ship' }
    ],
    useCases: ['Email', 'Marketing']
  },
  // ...add more tools for each stack
];
