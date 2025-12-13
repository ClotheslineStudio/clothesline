import type { Project } from './types';

export const projects: Project[] = [
  {
    slug: 'ciid',
    title: 'CIID (Center for the Integration of IDEA Data)',
    description:
      'OSEP-funded TA center helping SEAs integrate IDEA Part B data with SLDS, improve data quality, and streamline EDFacts and SPP/APR reporting.',
    client: 'U.S. Department of Education, OSEP',
    period: '2014–2023',
    url: 'https://ciidta.grads360.org', // best public-facing link you have
    thumbnail: '/image/ciid-card.png',
    tabs: [
      {
        id: 'overview',
        label: 'Overview',
        image: '/image/ciid-overview.png',
        narrative:
          'Served as a core team member on CIID for nine years, working at the intersection of product, communications, creative, and internal tooling. Supported OSEP, project leadership, and state teams as they integrated IDEA Part B data with SLDS and adopted tools like Generate and the CIID Data Integration Toolkit.',
        skillIds: ['ta-operations']
      },
      {
        id: 'role',
        label: 'My Role',
        image: '/image/ciid-role.png',
        narrative:
          'Acted as Program Analyst, Communications & Product Support Lead, Internal Tools & Process Innovator, and Creative & Section 508 Lead. Owned major pieces of CIID’s day-to-day tech stack, documentation, event production, and external communications.',
        skillIds: ['ta-operations', 'docs-architecture', 'multichannel-comms']
      },
      {
        id: 'challenges',
        label: 'Challenges & Approach',
        image: '/image/ciid-challenges.png',
        narrative:
          'States often had fragmented IDEA and SLDS data systems, shifting OSEP expectations, and multiple vendors and partners. At the same time, our company was migrating to Microsoft 365. I helped CIID stand up collaboration, tracking, and reporting tools while keeping TA and product work moving and all materials accessible and 508-compliant.',
        skillIds: ['ms365-suite', 'docs-architecture']
      },
      {
        id: 'outcomes',
        label: 'Outcomes & Impact',
        image: '/image/ciid-outcomes.png',
        narrative:
          'Co-designed and maintained CIID’s public-facing content, supported the CIID Data Integration Toolkit and Generate documentation, helped improve GitHub release communication, and branded and ran Generate Office Hours. Internally, set up Teams and SharePoint, built a TA tracker with Power BI, and automated key workflows with Power Automate. Produced webinars, conference livestreams, and visual materials for CIID and state partners.',
        skillIds: [
          'ms365-suite',
          'docs-architecture',
          'multichannel-comms',
          'media-production'
        ]
      },
      {
        id: 'skills',
        label: 'Skills & Tools',
        image: '/image/ciid-skills.png',
        narrative:
          'CIID sharpened my ability to operate across TA operations, internal tooling, and creative execution. I became the person who could connect leadership goals to the actual tools, docs, and media needed to support states and OSEP.',
        skillIds: [
          'ms365-suite',
          'ta-operations',
          'docs-architecture',
          'multichannel-comms',
          'media-production'
        ]
      }
    ]
  }

  // add Clothesline UI, Gravity, Icons, Themes, 3D Print Lab, etc. here
];
