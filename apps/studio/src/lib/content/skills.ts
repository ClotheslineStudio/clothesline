import type { Skill } from './types';

export const skills: Record<string, Skill> = {
  'ms365-suite': {
    id: 'ms365-suite',
    label: 'Microsoft 365 (Teams, SharePoint, Power BI, Power Automate)',
    category: 'ops',
    blurb:
      'Set up collaboration, reporting, and automation using Teams, SharePoint, Power BI, and Power Automate—e.g., CIID’s TA tracker and internal reporting workflows.'
  },
  'ta-operations': {
    id: 'ta-operations',
    label: 'TA Operations & Governance',
    category: 'ops',
    blurb:
      'Coordinated state TA, governance structures, and cross-center collaboration so data integration work stayed aligned to OSEP priorities and SEA needs.'
  },
  'docs-architecture': {
    id: 'docs-architecture',
    label: 'Documentation Architecture',
    category: 'comms',
    blurb:
      'Designed and maintained doc structures in GitBook, GRADS360, and internal wikis so complex tools and guidance were easy to navigate.'
  },
  'multichannel-comms': {
    id: 'multichannel-comms',
    label: 'Multi-channel Communications',
    category: 'comms',
    blurb:
      'Planned and executed communications across web, email, and social channels (Mailchimp, Twitter, LinkedIn, GRADS360, YouTube).'
  },
  'media-production': {
    id: 'media-production',
    label: 'Media & Webinar Production',
    category: 'comms',
    blurb:
      'Produced 508-compliant videos, webinars, and conference livestreams—including editing, captioning, and technical production.'
  },
  'design-system': {
    id: 'design-system',
    label: 'Design Systems & Tokens',
    category: 'design',
    blurb:
      'Built Clothesline UI with tokens, themes, icons, and components that can be reused across apps, marketing, and documentation.'
  }
  // add more as needed
};
