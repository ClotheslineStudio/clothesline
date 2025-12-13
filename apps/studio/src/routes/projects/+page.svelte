<script lang="ts">
  import { onMount } from 'svelte';
  import { gsap } from 'gsap';
  // Update the path below to the correct relative location if needed, e.g.:
  import RichTooltip from '../../lib/components/RichTooltip.svelte';

  type Tab = 'summary' | 'role' | 'tools' | 'challenges' | 'outcomes' | 'skills';

  const federalProjects = [
 {
  title: 'CIID (Center for the Integration of IDEA Data)',
  description:
    'OSEP-funded technical assistance center helping state education agencies integrate IDEA Part B data with SLDS, improve data quality, and streamline EDFacts/SPP/APR reporting.',
  slug: 'ciid',
  image: '/image/ciid.png',
  summary:
    'Served as a core team member on CIID for nine years of the project, working at the intersection of product, communications, creative, and internal tooling. Supported leadership and state teams as they integrated IDEA data with SLDS, adopted tools like Generate and the CIID Data Integration Toolkit, and built sustainable processes for higher-quality Part B Section 616/618 reporting—while also standing up much of the center’s day-to-day tech, communication, and design infrastructure.',
  role:
    'Program Analyst • Communications & Product Support Lead • Internal Tools & Process Innovator • Creative & 508 Lead',
  tools:
    'GRADS360, Teams, SharePoint, Power BI, Power Automate, Excel, PowerPoint, Word, GitBook, GitHub, GA4, YouTube, LinkedIn, Twitter, Mailchimp, Zoom, Camtasia, Adobe Creative Cloud (Illustrator, Photoshop, InDesign, Premiere Pro, Audition), low-code event tools',
  challenges:
    'Helping states move from fragmented IDEA and SLDS data systems to more integrated architectures while aligning OSEP priorities, SEA leadership, vendors, and cross-center partners. At the same time, standing up new collaboration, tracking, reporting, and communication tools as the organization migrated to the Microsoft 365 enterprise stack—without disrupting ongoing TA, conferences, or product work, and while translating highly technical data integration concepts into accessible, 508-compliant materials for diverse audiences.',
  outcomes:
    'Co-designed and maintained CIID’s public-facing presence in GRADS360 and beyond, including briefs, blogs, guidance, and 508-compliant materials. Created and ran CIID’s Mailchimp program and quarterly email updates; authored and scheduled social media posts across Twitter and LinkedIn; and helped develop the CIID Data Integration Toolkit and related resources used by states to plan and govern integration work. Built and maintained the Generate GitBook documentation, supported the evolution of its GitHub issue tracking and release communication workflows, and helped brand and run Generate office hours and governance (G3) communications. Internally, established CIID’s Teams channels and SharePoint structure; designed and implemented a TA tracker with connected Power BI reports; and built Power Automate flows to streamline status tracking, reporting, and internal communication as the company adopted Microsoft 365. Created and managed CIID’s YouTube channel and video workflow—including editing, captions, thumbnails, rich descriptions, and tutorial content—and ran webinars and live streams from national conferences (including SLDS and OSEP Leadership). Designed posters and visuals for CIID and for state partners (e.g., Montana), providing on-site stakeholder communication and demonstrations at conferences while effectively running most of the center’s tech and creative stack outside of direct application development.',
  skills:
    'Technical assistance operations, internal tools and workflow design, Microsoft 365 ecosystem (Teams, SharePoint, Power BI, Power Automate), documentation architecture, product support, data integration and governance communication, conference and webinar production, live streaming, graphic design, Section 508/accessibility, video editing and captioning, leadership support, stakeholder engagement, analytics and reporting, cross-channel communications, cross-center coordination'
}

,


    {
      title: 'Generate (via CIID)',
      description:
        'State-hosted special education data management and reporting application built on CEDS to automate IDEA EDFacts and SPP/APR reporting for state education agencies.',
      slug: 'generate',
      image: '/image/generate.png',
      summary:
        'Travis supported the Generate product and CIID community by designing and maintaining the GitBook documentation, shaping release and governance communications, and helping state teams understand how to adopt and use the tool in their own environments.',
      role: 'Generate Product Communications & Governance Lead (CIID)',
      tools:
        'GRADS360, Teams, GitBook, PowerPoint, Power BI, GA4, YouTube, LinkedIn, Mailchimp',
      challenges:
        'Translating a highly technical, CEDS-based data warehouse and reporting product into clear, actionable guidance for state program staff, data teams, vendors, and federal partners—while keeping documentation, trainings, and governance processes aligned across multiple channels.',
      outcomes:
        'Planned and managed the public Generate GitBook (user guides, developer guides, release notes, and hotfixes); produced and supported office hours and webinar series for new releases; created governance materials and communications for the Generate Governance Group (G3); and built cross-channel analytics dashboards connecting GA4, YouTube, LinkedIn, and email to track engagement.',
      skills:
        'Product communication, documentation architecture, stakeholder engagement, technical storytelling, community support, analytics, governance design'
    },
    {
      title: 'NCEO (National Center on Educational Outcomes)',
      description:
        'Support for accessibility and outcomes work, including web presence, graphics, and national convenings.',
      slug: 'nceo',
      image: '/image/nceo.png',
      summary:
        'Provided design, web, and coordination support to NCEO, especially around large workgroup convenings and state-facing materials.',
      role: 'Graphic Designer, Web Support, Workgroup Coordinator',
      tools:
        'GRADS360, PowerPoint, Adobe Illustrator, InDesign, Excel, SmartSheet, Power BI, Teams, Zoom',
      challenges:
        'Translating technical accessibility and outcomes work into materials that states and national stakeholders could actually use at conferences and work sessions.',
      outcomes:
        'Maintained NCEO’s GRADS360 site, created visual templates and posters for states and conferences, and helped coordinate large national meetings with DOE leadership and cross-state teams.',
      skills:
        'Visual design, event support, web content updates, cross-team coordination, accessibility communication'
    },
    {
      title: 'CEDS Definitions Project (via NCEO)',
      description:
        'Led a national effort to create and publish new accessibility-related definitions in the CEDS standard.',
      slug: 'ceds',
      image: '/image/ceds.png',
      summary:
        'Served as project lead on a multi-state and vendor workgroup to create, refine, and publish a new set of definitions into the Common Education Data Standards (CEDS).',
      role: 'Project Lead and Primary Author',
      tools:
        'SmartSheet, Excel, Power BI, PowerPoint, Teams, Zoom, CEDS tools, GRADS360, Word',
      challenges:
        'Aligning 23 states and 4 vendors on shared definitions while tracking every revision and rationale in a way that could be reported and submitted formally to CEDS.',
      outcomes:
        'Drafted the proposal and project plan, collected and normalized existing state definitions, ran virtual meetings, built a Power BI dashboard to track changes, wrote the final report, and submitted the new definitions to CEDS—now published and in use.',
      skills:
        'Project management, standards development, facilitation, data modeling, writing, consensus-building'
    },
    {
      title: 'Race to the Top–District',
      description:
        'Early-career work supporting personalized learning and district implementation through tech, content, and events.',
      slug: 'rttd',
      image: '/image/rttd.png',
      summary:
        'First major federal project role, focused on technical and content support for Race to the Top–District, including web, reports, graphics, and events.',
      role: 'Technical Analyst, Content & Event Support',
      tools:
        'GRADS360, low-code mobile app builder, PowerPoint, Word, Excel, Camtasia, basic CMS tools, DSLR/phone for media capture',
      challenges:
        'Supporting a fast-moving federal grant initiative while learning the landscape of personalized learning, districts, and DOE expectations.',
      outcomes:
        'Helped maintain the RTT–D website, wrote and edited copy and reports, created graphics and tutorial videos, supported on-site visits and conferences, and led the selection, build, and support of a mobile conference app.',
      skills:
        'Early-stage TA support, web publishing, multimedia content, low-code tools, event tech, writing'
    }
  ];

  const studioProjects = [
    {
      title: 'Clothesline Tokens',
      description:
        'A TypeScript-first design token engine that outputs CSS custom properties for spacing, radius, typography, color, and more.',
      slug: 'clothesline-tokens',
      image: '/image/tokens.png',
      summary:
        'Clothesline Tokens is the core design token package that drives spacing, radius, typography, color ramps, elevation, and motion across all Clothesline projects.',
      role: 'System Architect',
      tools: 'TypeScript, pnpm monorepo, tsup, CSS Custom Properties, Culori',
      challenges:
        'Designing token categories and naming that scale across multiple apps while staying readable and maintainable.',
      outcomes:
        'A single source of truth for design decisions that powers themes, UI components, and marketing sites.',
      skills: 'Design systems, architecture, DX, documentation'
    },
    {
      title: 'Clothesline Themes',
      description:
        'An OKLCH-based theming engine that generates accessible color ramps, modes, and vision presets from seed configs.',
      slug: 'clothesline-themes',
      image: '/image/themes.png',
      summary:
        'Clothesline Themes is a theme builder that uses OKLCH + Culori to generate gamut-safe ramps, contrast-aware roles, and per-vision adjustments for the entire UI stack.',
      role: 'Color System & Theme Architect',
      tools: 'TypeScript, Culori, OKLCH, CSS Custom Properties, Clothesline Tokens',
      challenges:
        'Generating ramps that stay in gamut, respect contrast targets, and still feel expressive across light, dark, and high-contrast modes.',
      outcomes:
        'Theme CSS bundles that can be dropped into any SvelteKit app using Clothesline Tokens, with support for future theme generators.',
      skills: 'Color systems, accessibility, API design, tooling'
    },
    {
      title: 'Clothesline Icons',
      description:
        'An accessibility-aware icon system with stroke, filled, duotone, and pixel variants designed to integrate deeply with themes and tokens.',
      slug: 'clothesline-icons',
      image: '/image/icons.png',
      summary:
        'Clothesline Icons is a fully custom icon library built around accessibility, semantic metadata, and flexible styling for different themes, modes, and vision profiles.',
      role: 'Icon Designer and System Architect',
      tools: 'Figma, Aseprite, SvelteKit, TypeScript, SVGO, Clothesline Tokens',
      challenges:
        'Keeping a consistent visual language across multiple weights and variants while supporting accessibility modes and dynamic theming.',
      outcomes:
        'A reusable icon package that powers the Clothesline ecosystem and can be shipped as a standalone product.',
      skills: 'Icon design, design systems, accessibility, SVG optimization'
    },
    {
      title: 'Clothesline UI',
      description:
        'A Svelte-based UI kit designed for government-grade accessibility, documentation, and reuse across multiple applications.',
      slug: 'clothesline-ui',
      image: '/image/ui.png',
      summary:
        'Clothesline UI is a component library built with SvelteKit and Tailwind, wired to a tokens + themes system that targets public sector and enterprise use cases.',
      role: 'Design System Engineer',
      tools: 'SvelteKit, TailwindCSS, TypeScript, Clothesline Tokens & Themes, Vitest, Playwright (planned)',
      challenges:
        'Balancing flexibility and composability with strict accessibility and maintainability requirements.',
      outcomes:
        'A growing library of core components used across Gravity Planner, marketing sites, and internal tools.',
      skills: 'Component architecture, accessibility, API design, documentation'
    },
    {
      title: 'Gravity Planner',
      description:
        'A planning and documentation tool that turns federal and state requirements into actionable roadmaps for SEA and LEA teams.',
      slug: 'gravity-planner',
      image: '/image/gravity-planner.png',
      summary:
        'Gravity Planner is an education-focused project and framework management tool that helps state and local education agencies turn guidance, toolkits, and compliance requirements into living plans and wikis.',
      role: 'Founder, Product Designer, and Lead Engineer',
      tools: 'SvelteKit, Clothesline UI, Clothesline Tokens & Themes, TailwindCSS, TypeScript, Figma',
      challenges:
        'Translating complex, shifting education requirements into flexible but structured workflows and block-based content.',
      outcomes:
        'In-progress product designed to replace one-off spreadsheets and slide decks with a repeatable planning and documentation loop.',
      skills: 'Product strategy, information architecture, front-end engineering, systems thinking'
    },
    {
      title: 'Network Planning Tool',
      description:
        'A network and security planning workbook for a regional restaurant group, including equipment selection and capacity calculations.',
      slug: 'mustard-seed-network-planner',
      image: '/image/network-planner.png',
      summary:
        'A custom planning tool for a regional restaurant group that models Wi-Fi, camera, and security needs across locations using real product specs.',
      role: 'Network Planning Consultant & Tool Builder',
      tools:
        'Excel, TP-Link Omada, Ubiquiti UniFi, camera & NVR spec sheets, custom formulas, FigJam, VS Code',
      challenges:
        'Turning scattered hardware specs into a usable planning model that could estimate APs, cameras, storage, and power across multiple sites.',
      outcomes:
        'A reusable workbook that estimates AP counts, camera coverage, hard drive requirements, and PoE/power needs per restaurant layout.',
      skills: 'Systems thinking, capacity planning, technical communication, spreadsheet modeling'
    }
  ];

  const clientProjects = [
    {
      title: 'Saw Dogs Portland',
      description:
        'Site for a family-run lawn and tree business. Optimized for local SEO, speed, and easy client updates.',
      slug: 'saw-dogs-portland',
      image: '/image/fallback.png',
      summary: 'This is a summary of the Saw Dogs Portland project.',
      role: 'Web Developer and SEO Specialist',
      tools: 'SvelteKit, TailwindCSS, Vercel',
      challenges: 'Local SEO optimization, fast deployment',
      outcomes: 'Ranked top 3 on Google for local keywords.',
      skills: 'SEO, web development'
    }
  ];

  let activeProject: any = null;
  let modalOpen = false;
  let activeTab: Tab = 'summary';

  function openModal(project: any) {
    activeProject = project;
    modalOpen = true;
    activeTab = 'summary';
  }

  function closeModal() {
    modalOpen = false;
    activeProject = null;
  }

  function setTab(tab: Tab) {
    activeTab = tab;
  }

  const tabs: { id: Tab; label: string }[] = [
    { id: 'summary', label: 'Summary' },
    { id: 'role', label: 'Role' },
    { id: 'tools', label: 'Tools' },
    { id: 'challenges', label: 'Challenges' },
    { id: 'outcomes', label: 'Outcomes' },
    { id: 'skills', label: 'Skills' }
  ];

  onMount(async () => {
    const { ScrollTrigger } = await import('gsap/ScrollTrigger');
    gsap.registerPlugin(ScrollTrigger);

    gsap.utils.toArray<HTMLElement>('.project-card').forEach((card) => {
      gsap.from(card, {
        scrollTrigger: {
          trigger: card,
          start: 'top 85%',
          toggleActions: 'play none none none'
        },
        opacity: 0,
        y: 30,
        duration: 0.6,
        ease: 'power2.out'
      });
    });
  });
</script>

<section class="py-16 sm:py-20 text-(--color-surface-600)">
  <h1 class="mb-8 text-5xl font-bold text-(--color-accent-500)">Selected Work</h1>
  <p class="mb-16 max-w-2xl text-lg opacity-80">
    A cross-disciplinary look at 10+ years of experience in design, development, accessibility, and
    education systems.
  </p>

  <div class="space-y-16">
    <!-- Studio Projects -->
    <div>
      <h2 class="mb-6 text-3xl font-semibold text-(--color-accent-500)">Studio Projects</h2>
      <div class="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {#each studioProjects as project}
          <button
            type="button"
            tabindex="0"
            on:click={() => openModal(project)}
            class="project-card group relative flex cursor-pointer flex-col overflow-hidden rounded-2xl border border-(--color-plum) bg-(--color-bg) shadow-lg transition-transform hover:scale-105 hover:shadow-2xl text-left"
          >
            <img
              src={project.image}
              alt={project.title}
              on:error={(e) => {
                const target = e.currentTarget as HTMLImageElement;
                target.src = '/image/resume.png';
              }}
              class="h-48 w-full object-cover"
            />
            <div class="p-5">
              <h3 class="mb-1 text-xl font-bold text-(--color-primary-500) group-hover:underline">
                {project.title}
              </h3>
              <p class="text-sm text-(--color-surface-600) opacity-80">
                {project.description}
              </p>
            </div>
          </button>
        {/each}
      </div>
    </div>

    <!-- Federal Education Projects -->
    <div>
      <h2 class="mb-6 text-3xl font-semibold text-(--color-accent-500)">
       Federal Education Work (AEM)
      </h2>
      <div class="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {#each federalProjects as project}
          <!-- svelte-ignore a11y_no_redundant_roles -->
          <button
            type="button"
            role="button"
            tabindex="0"
            on:click={() => openModal(project)}
            class="project-card group relative flex cursor-pointer flex-col overflow-hidden rounded-2xl border border-(--color-indigo) bg-(--color-bg) shadow-lg transition-transform hover:scale-105 hover:shadow-2xl text-left"
          >
            <img
              src={project.image}
              alt={project.title}
              on:error={(e) => {
                const target = e.currentTarget as HTMLImageElement;
                target.src = '/image/fallback.png';
              }}
              class="h-48 w-full object-cover"
            />
            <div class="p-5">
              <h3 class="mb-1 text-xl font-bold text-(--color-primary-500) group-hover:underline">
                {project.title}
              </h3>
              <p class="text-sm text-(--color-surface-600) opacity-80">
                {project.description}
              </p>
            </div>
          </button>
        {/each}
      </div>
    </div>

    <!-- Client Projects -->
    <div>
      <h2 class="mb-6 text-3xl font-semibold text-(--color-accent-500)">Client Projects</h2>
      <div class="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {#each clientProjects as project}
          <!-- svelte-ignore a11y_no_redundant_roles -->
          <button
            type="button"
            role="button"
            tabindex="0"
            on:click={() => openModal(project)}
            class="project-card group relative flex cursor-pointer flex-col overflow-hidden rounded-2xl border border-(--color-plum) bg-(--color-bg) shadow-lg transition-transform hover:scale-105 hover:shadow-2xl text-left"
          >
            <img
              src={project.image}
              alt={project.title}
              on:error={(e) => {
                const target = e.currentTarget as HTMLImageElement;
                target.src = '/image/fallback.png';
              }}
              class="h-48 w-full object-cover"
            />
            <div class="p-5">
              <h3 class="mb-1 text-xl font-bold text-(--color-primary-500) group-hover:underline">
                {project.title}
              </h3>
              <p class="text-sm text-(--color-surface-500) opacity-80">
                {project.description}
              </p>
            </div>
          </button>
        {/each}
      </div>
    </div>
  </div>
</section>

{#if modalOpen && activeProject}
  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div
    class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-2 md:px-6"
    on:click={closeModal}
  >
    <div
      class="relative w-full max-w-5xl h-[50vh] rounded-3xl border border-(--color-surface-700) bg-(--color-bg) shadow-2xl flex flex-col"
      on:click|stopPropagation
    >
      <!-- Header -->
      <div class="flex items-start justify-between gap-4 border-b border-(--color-surface-800) p-6 md:p-8">
        <div>
          <h3 class="text-2xl md:text-3xl font-bold text-(--color-primary-400)">
            {activeProject.title}
          </h3>

          {#if activeProject.role}
            <p class="mt-1 text-xs md:text-sm font-semibold uppercase tracking-wide text-(--color-surface-400)">
              {activeProject.role}
            </p>
          {/if}
        </div>

        <button
          class="rounded-full border border-(--color-surface-700) px-3 py-1 text-xs uppercase tracking-wide text-(--color-surface-300) hover:bg-(--color-surface-800)"
          on:click={closeModal}
        >
          Close
        </button>
      </div>

      <!-- Tabs -->
      <div class="flex flex-wrap gap-2 border-b border-(--color-surface-800) px-6 md:px-8 py-3 text-xs font-semibold uppercase tracking-wide text-(--color-surface-400)">
        {#each tabs as tab}
          <button
            type="button"
            class="rounded-full px-3 py-1 transition
              {activeTab === tab.id
                ? 'bg-(--color-primary-500) text-white'
                : 'hover:bg-(--color-surface-800)'}"
            on:click={() => setTab(tab.id)}
          >
            {tab.label}
          </button>
        {/each}
      </div>

      <!-- Content: scrolls inside a tall modal -->
      <div class="flex-1 overflow-y-auto space-y-4 p-6 md:p-8 text-sm md:text-base text-(--color-surface-300)">
        {#if activeTab === 'summary'}
          {#if activeProject.slug === 'generate'}
            <p class="mb-3 leading-relaxed">
              State-hosted special education data management and reporting application built on
              {' '}
              <RichTooltip
                label="CEDS"
                title="Common Education Data Standards"
                href="https://ceds.ed.gov/"
              >
                A national collaborative effort to define a shared vocabulary, data model, and
                connections that make it easier for education agencies to exchange, integrate, and
                report data consistently across systems.
              </RichTooltip>
              {' '}
              to automate
              {' '}
              <RichTooltip
                label="IDEA"
                title="Individuals with Disabilities Education Act"
                href="https://sites.ed.gov/idea/"
              >
                The federal special education law that sets requirements for how states and
                districts provide services and report on outcomes for children with disabilities.
              </RichTooltip>
              {' '}
              EDFacts and
              {' '}
              <RichTooltip
                label="SPP/APR"
                title="State Performance Plan / Annual Performance Report"
                href="https://osep.grads360.org"
              >
                OSEP’s performance plan and annual reporting framework that states use to report
                on special education indicators, heavily informed by data from systems like
                Generate.
              </RichTooltip>
              {' '}
              reporting for state education agencies.
            </p>

            <p class="leading-relaxed">
              Travis supported the Generate product and CIID community by designing and maintaining
              the GitBook documentation, shaping release and governance communications, and helping
              state teams understand how to adopt and use the tool in their own environments.
            </p>
          {:else if activeProject.slug === 'ceds'}
            <p class="leading-relaxed">
              Served as project lead on a multi-state and vendor workgroup to create, refine, and
              publish a new set of accessibility-related definitions into
              {' '}
              <RichTooltip
                label="CEDS"
                title="Common Education Data Standards"
                href="https://ceds.ed.gov/"
              >
                A standardized education data vocabulary and model used by states, vendors, and the
                U.S. Department of Education to make education data more interoperable and
                reusable across systems.
              </RichTooltip>
              .
              This work aligned 23 states and 4 vendors and resulted in definitions that are now
              published and in use.
            </p>
          {:else}
            <p class="leading-relaxed">
              {activeProject.summary}
            </p>
          {/if}
        {:else if activeTab === 'role'}
          <p class="leading-relaxed">
            {activeProject.role}
          </p>
        {:else if activeTab === 'tools'}
          <p class="leading-relaxed">
            {activeProject.tools}
          </p>
        {:else if activeTab === 'challenges'}
          <p class="leading-relaxed">
            {activeProject.challenges}
          </p>
        {:else if activeTab === 'outcomes'}
          <p class="leading-relaxed">
            {activeProject.outcomes}
          </p>
        {:else if activeTab === 'skills'}
          <p class="leading-relaxed">
            {activeProject.skills}
          </p>
        {/if}
      </div>
    </div>
  </div>
{/if}
