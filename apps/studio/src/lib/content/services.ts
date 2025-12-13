// src/lib/content/services.ts
import type { Service } from './types';

export const services: Service[] = [
  {
    slug: 'design-systems',
    name: 'Design Systems & UI Kits',
    summary: 'A reusable visual language for everything you make—sites, apps, decks, and docs.',
    description:
      'Instead of redesigning the same button, layout, or color palette over and over, we build a shared visual system for your whole world. Colors, components, layouts, and patterns are designed once, then reused across your apps, websites, slide decks, and documentation. The result: everything feels like it belongs together, it’s easier to ship new things, and your team spends less time wrestling with layouts and more time doing the work that matters.',
    targetClients: [
      'State & local education agencies',
      'EdTech companies',
      'Teams with “10 versions of the same UI”'
    ],
    startingPrice: 'Custom — scoped per product or platform',
    highlightProjectSlugs: ['clothesline-ui', 'icons', 'themes']
  },
  {
    slug: 'toolkit-to-plan',
    name: 'Toolkit → Plan Systems (Gravity-style)',
    summary: 'Turn long guidance documents into living plans your team can actually follow.',
    description:
      'Most programs live inside PDFs, memos, and guidance docs that nobody has time to fully absorb. I design systems that take those toolkits and turn them into living plans: clear steps, owners, timelines, and reference pages your team can work from every day. Think of it as a control center for your program work—where requirements, tasks, and documentation all line up instead of living in separate binders and inboxes.',
    targetClients: [
      'State education agencies (SEAs)',
      'Local education agencies (LEAs)',
      'TA centers and intermediaries'
    ],
    startingPrice: 'Custom — typically multi-phase',
    highlightProjectSlugs: ['ciid', 'gravity']
  },
  {
    slug: 'llm-workflows',
    name: 'AI & Workflow Design',
    summary: 'Thoughtful AI support that plugs into your existing work instead of replacing it.',
    description:
      'AI doesn’t have to mean “mystery box in the corner.” I help you weave AI into the tools and documents you already use—so staff can search, summarize, and draft from your real guidance, not random internet text. That might look like a smart search box over your program library, helpers that turn dense guidance into talking points, or small automations that clean up repetitive tasks. Always with clear guardrails so people know what it can and can’t do.',
    targetClients: [
      'Education programs and TA centers',
      'Ops-heavy teams drowning in documents',
      'Leaders who want AI with real guardrails'
    ],
    startingPrice: 'Pilot engagements from $5k+',
    highlightProjectSlugs: ['gravity', 'clothesline-ui']
  },
  {
    slug: 'data-storytelling',
    name: 'Dashboards & Data Storytelling',
    summary: 'Bring your data out of spreadsheets and into clear, honest stories.',
    description:
      'You probably already have the data—you just need a way for people to understand it at a glance. I design dashboards and reports that connect directly to the questions your audience asks: What’s changing over time? Where are we on our goals? What do we need to pay attention to next? The focus is on clarity and trust, not flashy charts that look good but don’t mean much.',
    targetClients: [
      'TA centers and technical assistance teams',
      'Program offices with recurring reporting cycles',
      'Teams with “too many spreadsheets” and not enough insight'
    ],
    startingPrice: 'From $4k+ per dashboard/reporting package',
    highlightProjectSlugs: ['ciid']
  },
  {
    slug: 'brand-systems',
    name: 'Brand Systems, Icons & Visual Language',
    summary: 'A look and feel that actually survives contact with real-world use.',
    description:
      'This is branding built for the way you actually work—on screens, in docs, in slide decks, at conferences. We create logos, color palettes, icon sets, and layout rules that are flexible enough for dashboards and reports but strong enough to feel instantly recognizable. Everything is designed so your team can plug it straight into products and communications without guessing at “what’s on brand.”',
    targetClients: [
      'Product teams and SaaS tools',
      'Studios and agencies',
      'Education programs needing a modern refresh'
    ],
    startingPrice: 'From $3k+ per brand or visual system',
    highlightProjectSlugs: ['icons', 'themes', 'clothesline-ui']
  },
  {
    slug: 'launch-content',
    name: 'Launch Content, Video & Live Demos',
    summary: 'Show people what your work can do, not just tell them about it.',
    description:
      'I help you build the story around your tool or program: landing copy, walkthrough scripts, live demo flows, and short videos that make the work feel real. That can include a mix of screen recordings, live-action footage, and simple motion so people can see how your tool or process fits into their day. The goal is to make stakeholders say, “Oh, I get it now,” not “Can you send me the slide deck again?”',
    targetClients: [
      'TA centers preparing for national meetings',
      'Product teams launching new tools',
      'Leaders who need buy-in from non-technical stakeholders'
    ],
    startingPrice: 'From $2.5k+ per launch package',
    highlightProjectSlugs: ['ciid', 'clothesline-ui']
  },
  {
    slug: '3d-print-lab',
    name: '3D Print Lab & Physical Prototyping',
    summary: 'Bring your ideas off the screen and into people’s hands.',
    description:
      'Sometimes the best way to explain something is to let people hold it. Using a high-end 3D printer setup, I create small-batch physical pieces that support your story—whether that’s functional parts, workshop tools, or thoughtful conference giveaways. It’s a good fit when you want your brand or concept to stand out in a very literal, tactile way.',
    targetClients: [
      'Studios and product teams',
      'Education programs running events or workshops',
      'Local businesses wanting unique, custom pieces'
    ],
    startingPrice: 'From $500+ per prototyping or small-batch run',
    highlightProjectSlugs: ['3d-print-lab', 'clothesline-ui']
  }
];

