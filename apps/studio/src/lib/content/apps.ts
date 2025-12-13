import type { App } from './types';

export const apps: App[] = [
  {
    slug: 'icons',
    name: 'Clothesline Icons',
    tagline: 'Multi-variant icon system for modern interfaces.',
    description:
      'An icon library with stroke, filled, duotone, and pixel variants built on a consistent grid and stroke system, designed to pair with Clothesline UI and Gravity.',
    status: 'alpha',
    category: 'tool',
    thumbnail: '/image/apps/icons-thumb.png',
    url: 'https://icons.clotheslinestudio.com',
    docsUrl: 'https://clotheslineui.com/icons',
    repoUrl: 'https://github.com/ClotheslineStudio/icons',
    techStack: ['SvelteKit', 'TypeScript', 'SVG'],
    highlights: [
      '4+ visual styles per icon',
      'Metadata for search, tags, and themes',
      'Designed to match Clothesline UI tokens'
    ]
  },
  {
    slug: 'themes',
    name: 'Clothesline Themes',
    tagline: 'OKLCH-based themes with accessibility-first ramps.',
    description:
      'A theme engine that generates accessible OKLCH ramps, supports light/dark/high contrast/vision modes, and exports tokens to both code and Figma.',
    status: 'prototype',
    category: 'tool',
    thumbnail: '/image/apps/themes-thumb.png',
    url: 'https://themes.clotheslinestudio.com',
    docsUrl: 'https://clotheslineui.com/themes',
    repoUrl: 'https://github.com/ClotheslineStudio/themes',
    techStack: ['TypeScript', 'SvelteKit', 'OKLCH'],
    highlights: [
      'Multiple named themes (Big Sky, Copper Sun, etc.)',
      'Vision + contrast modes for accessibility',
      'Figma + code token export'
    ]
  },
  {
    slug: 'gravity',
    name: 'Gravity Planner',
    tagline: 'Toolkit-to-plan engine for education agencies.',
    description:
      'A planning and documentation app that turns federal and state guidance into actionable toolkits, plans, and wikis for SEAs and LEAs.',
    status: 'idea',
    category: 'product',
    thumbnail: '/image/apps/gravity-thumb.png',
    url: 'https://gravity.clotheslinestudio.com',
    docsUrl: 'https://gravity.clotheslinestudio.com/docs',
    repoUrl: 'https://github.com/ClotheslineStudio/gravity',
    techStack: ['SvelteKit', 'TypeScript', 'Blocks engine'],
    highlights: [
      'Imports guidance and turns it into toolkits',
      'Aligns requirements, tasks, and docs',
      'Built on Clothesline UI, Icons, and Themes'
    ]
  }
];
