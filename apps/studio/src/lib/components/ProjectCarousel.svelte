<script lang="ts">
	// Import Svelte fade transition for smoother UI
	import { fade } from 'svelte/transition';

	// State variables
	let startIndex = 0; // Tracks the starting index for the visible projects in the carousel
	let modalOpen = false; // Controls whether the project modal (popup) is open
	let activeIndex = 0; // Index of the currently selected project
	let activeTab = 'summary'; // Which tab (summary, challenges, etc.) is active in the modal

	// Project data
	const projects = [
		// Project 1
		{
			title: 'G3 Drupal Website',
			category: 'Federal Work with AEM',
			cover: '/image/g3.png',
			summary: 'Led the development of a standalone site for the Generate Governance Group.',
			role: [
				'Primary point of contact for Drupal site build',
				'Designed G3 logo and deck template',
				'Migrated all content from Communities360'
			],
			tools: [
				{ name: 'Drupal', usage: 'Built custom site with new features' },
				{ name: 'Illustrator', usage: 'Logo and branding assets' },
				{ name: 'PowerPoint', usage: 'Template development' },
				{ name: 'GitHub', usage: 'Source management and documentation' }
			],
			challenges: [
				{ title: 'Legacy platform', solution: 'Custom Drupal site' },
				{ title: 'No identity', solution: 'New logo + slide templates' }
			],
			outcomes: ['Branded site launched', 'Improved stakeholder access'],
			skills: ['Drupal', 'Adobe Illustrator', 'CMS', 'Project Management'],
			images: {
				summary: '/image/g3.png',
				challenges: '/image/g3-challenges.png',
				role: '',
				tools: '',
				outcomes: '',
				skills: ''
			}
		},

		// Project 2
		{
			title: 'Generate Documentation & Engagement',
			category: 'Federal Work with AEM',
			cover: '/image/generate-summary.png',
			summary: 'Lead for documentation and engagement strategy on the Generate project.',
			role: [
				'Led documentation team',
				'Maintained GitBook system',
				'Integrated GitHub and GitBook workflows',
				'Built YAML templates for Power BI dashboards'
			],
			tools: [
				{ name: 'GitBook', usage: 'Main documentation system' },
				{ name: 'GitHub', usage: 'Version control and templates' },
				{ name: 'Jira', usage: 'Agile tracking and sprint planning' },
				{ name: 'Discord', usage: 'Stakeholder and community engagement' },
				{ name: 'YAML', usage: 'Issue template development' }
			],
			challenges: [
				{
					title: 'Unstructured documentation',
					solution: 'Centralized and versioned GitBook system'
				},
				{
					title: 'Low community engagement',
					solution: 'Created Office Hours series + Discord server'
				}
			],
			outcomes: [
				'Improved documentation consistency',
				'Increased stakeholder collaboration',
				'Streamlined GitHub to GitBook publishing flow'
			],
			skills: [
				'Technical Documentation',
				'Community Management',
				'Agile Methodology',
				'GitHub/GitBook Integration',
				'YAML Development'
			],
			images: {
				summary: '/image/generate-summary.png',
				challenges: '/image/generate-challenges.png',
				role: '',
				tools: '',
				outcomes: '',
				skills: ''
			}
		},

		// Project 3
		{
			title: 'Resume Portfolio Website',
			category: 'Studio Projects',
			cover: '/image/hero1.png',
			summary: 'Designed and developed a modern portfolio site to showcase skills and work.',
			role: [
				'Built with SvelteKit + Tailwind',
				'Integrated GSAP, Markdown, and 8-bit theme toggle',
				'SEO + LLM optimized'
			],
			tools: [
				{ name: 'SvelteKit', usage: 'Frontend framework' },
				{ name: 'Tailwind CSS', usage: 'Utility-first styling' },
				{ name: 'GSAP', usage: 'Animations' },
				{ name: 'Markdown', usage: 'Content management' }
			],
			challenges: [
				{ title: 'Content structure', solution: 'Modular markdown system' },
				{ title: 'Animation performance', solution: 'GSAP timeline efficiency' }
			],
			outcomes: ['Fast-loading site', 'Highly interactive experience'],
			skills: ['SvelteKit', 'Tailwind CSS', 'GSAP', 'SEO'],
			images: {
				summary: '/image/hero1.png',
				challenges: '',
				role: '',
				tools: '',
				outcomes: '',
				skills: ''
			}
		},

		// Project 4
		{
			title: '3D Printing Lab',
			category: 'Studio Projects',
			cover: '/image/3d-lab.png',
			summary: 'Built a 3D printing service with a Prusa CoreXY printer and upgraded Ender 3.',
			role: [
				'Managed 3D printer fleet',
				'Designed custom prints and parts',
				'Set up ecommerce integrations'
			],
			tools: [
				{ name: 'Fusion 360', usage: 'CAD modeling' },
				{ name: 'PrusaSlicer', usage: 'Print preparation' },
				{ name: 'OctoPrint', usage: 'Printer monitoring' },
				{ name: 'Etsy', usage: 'Ecommerce platform' }
			],
			challenges: [
				{
					title: 'High print failure rates',
					solution: 'Optimized slicer profiles and maintenance routines'
				},
				{ title: 'Scaling production', solution: 'Automated with OctoPrint plugins' }
			],
			outcomes: ['High-quality print success rates', 'Expanded client base'],
			skills: ['3D Printing', 'CAD Design', 'Ecommerce'],
			images: {
				summary: '/image/3d-lab.png',
				challenges: '',
				role: '',
				tools: '',
				outcomes: '',
				skills: ''
			}
		},

		// Project 5
		{
			title: 'Dog Training Products Site',
			category: 'Studio Projects',
			cover: '/image/dog-training.png',
			summary: 'Developed an e-commerce site for durable, field-tested dog training gear.',
			role: [
				'Product design and prototyping',
				'Website development',
				'Order fulfillment system setup'
			],
			tools: [
				{ name: 'Shopify', usage: 'Ecommerce platform' },
				{ name: 'Figma', usage: 'Prototyping UI/UX' },
				{ name: 'Photoshop', usage: 'Product images' }
			],
			challenges: [
				{ title: 'Durability testing', solution: 'Field-tested products with multiple dog breeds' },
				{ title: 'Streamlining order flow', solution: 'Automated order notifications and tracking' }
			],
			outcomes: ['Successful product launch', 'Positive customer feedback'],
			skills: ['Product Development', 'Ecommerce', 'UX/UI Design'],
			images: {
				summary: '/image/dog-training.png',
				challenges: '',
				role: '',
				tools: '',
				outcomes: '',
				skills: ''
			}
		},

		// Project 6
		{
			title: 'Saw Dogs Portland',
			category: 'Client Projects',
			cover: '/image/saw-dogs.png',
			summary: 'Website and branding for a Portland-based lawn and tree care business.',
			role: ['Brand identity creation', 'Website design and development', 'SEO optimization'],
			tools: [
				{ name: 'SvelteKit', usage: 'Frontend framework' },
				{ name: 'Tailwind CSS', usage: 'Site styling' },
				{ name: 'Google Analytics', usage: 'Traffic monitoring' }
			],
			challenges: [
				{ title: 'Local SEO competition', solution: 'Optimized Google My Business and keywords' },
				{ title: 'Simple booking', solution: 'Integrated easy scheduling forms' }
			],
			outcomes: ['Increased site traffic', 'Boosted client bookings'],
			skills: ['Branding', 'SEO', 'Web Development'],
			images: {
				summary: '/image/saw-dogs.png',
				challenges: '',
				role: '',
				tools: '',
				outcomes: '',
				skills: ''
			}
		}
	];

	function openModal(index: number) {
		activeIndex = index;
		activeTab = 'summary';
		modalOpen = true;
	}

	function closeModal() {
		modalOpen = false;
	}

	function nextSet() {
		startIndex = (startIndex + 1) % projects.length; // 👈 move 1 project at a time
		const slideDirection = 'left'; // 👈 moving left when going next
	}

	function prevSet() {
		startIndex = (startIndex - 1 + projects.length) % projects.length;
		const slideDirection = 'right'; // 👈 moving right when going prev
	}

	function getVisibleProjects() {
		const visibleCount = 3;
		if (startIndex + visibleCount <= projects.length) {
			return projects.slice(startIndex, startIndex + visibleCount);
		} else {
			return [
				...projects.slice(startIndex),
				...projects.slice(0, (startIndex + visibleCount) % projects.length)
			];
		}
	}
</script>

<!-- (rest of your code unchanged) -->

<section class="py-12 px-4 sm:px-6 lg:px-8">
  <div class="mx-auto max-w-7xl">
		<h2 class="mb-6 text-3xl font-bold text-(--color-accent) sm:text-4xl">
			Projects
		</h2>
		<div class="mb-6 flex items-center justify-center gap-8">
			<button
				on:click={prevSet}
				class="flex h-12 w-12 items-center justify-center rounded-full border-2 border-(--color-accent) text-(--color-accent) transition-colors duration-300 hover:bg-(--color-accent) hover:text-(--color-bg)"
				aria-label="Previous"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-6 w-6"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
					stroke-width="2"
				>
					<path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
				</svg>
			</button>

			<button
				on:click={nextSet}
				class="flex h-12 w-12 items-center justify-center rounded-full border-2 border-(--color-accent) text-(--color-accent) transition-colors duration-300 hover:bg-(--color-accent) hover:text-(--color-bg)"
				aria-label="Next"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-6 w-6"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
					stroke-width="2"
				>
					<path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
				</svg>
			</button>
		</div>

		<div class="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
			{#each getVisibleProjects() as project, i (project.title)}
				<button
					type="button"
					class="w-full shrink-0 cursor-pointer rounded-xl bg-[#171123] p-4 shadow-lg transition-transform hover:scale-105 text-left"
					on:click={() => openModal(projects.indexOf(project))}
					transition:fade
					aria-label={`Open modal for ${project.title}`}
				>
					<img
						src={project.cover}
						alt={project.title}
						class="mb-4 h-40 w-full rounded-md object-cover"
					/>
					<h3 class="text-xl font-bold text-(--color-accent)">{project.title}</h3>
					<p class="mt-2 line-clamp-3 text-sm text-slate-300">{project.summary}</p>
				</button>
			{/each}
		</div>
		<!-- ✅ Correct placement of View All Projects button -->
		<div class="mt-10 flex justify-center">
			<a
				href="/projects"
				class="inline-flex items-center gap-2 rounded-lg bg-(--color-accent) px-6 py-3 text-lg font-semibold text-white transition hover:bg-orange-500"
			>
				View All Projects
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-5 w-5"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path stroke-linecap="round" stroke-linejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
				</svg>
			</a>
		</div>
  </div>
</section>

{#if modalOpen}
	<div
		class="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur"
		transition:fade
	>
		<div class="relative w-full max-w-5xl rounded-xl bg-[#171123] p-6 text-white shadow-2xl">
			<button on:click={closeModal} class="absolute top-4 right-6 text-2xl">✕</button>

			<h2 class="mb-4 text-4xl font-bold text-orange-400">{projects[activeIndex].title}</h2>

			<div class="mb-6 flex gap-6 overflow-x-auto pb-2">
				{#each ['summary', 'challenges', 'role', 'tools', 'outcomes', 'skills'] as tab}
					<button
						class="border-b-2 pb-1 text-lg whitespace-nowrap uppercase"
						class:border-orange-500={activeTab === tab}
						class:border-transparent={activeTab !== tab}
						on:click={() => (activeTab = tab)}
					>
						{tab}
					</button>
				{/each}
			</div>

			<div class="transition-opacity duration-300">
				{#if activeTab === 'summary'}
					{#if projects[activeIndex].images.summary}
						<img src={projects[activeIndex].images.summary} alt="Summary" class="mb-4 rounded-md" />
					{/if}
					<p class="text-slate-300">{projects[activeIndex].summary}</p>
				{:else if activeTab === 'challenges'}
					<ul class="space-y-2">
						{#each projects[activeIndex].challenges as ch}
							<li><strong>{ch.title}:</strong> {ch.solution}</li>
						{/each}
					</ul>
				{:else if activeTab === 'role'}
					<ul class="list-disc pl-4">
						{#each projects[activeIndex].role as item}
							<li>{item}</li>
						{/each}
					</ul>
				{:else if activeTab === 'tools'}
					<div class="flex flex-wrap gap-2">
						{#each projects[activeIndex].tools as tool}
							<span class="rounded-full bg-slate-700 px-3 py-1 text-sm">{tool.name}</span>
						{/each}
					</div>
				{:else if activeTab === 'outcomes'}
					<ul class="list-disc pl-4">
						{#each projects[activeIndex].outcomes as outcome}
							<li>{outcome}</li>
						{/each}
					</ul>
				{:else if activeTab === 'skills'}
					<div class="grid grid-cols-2 gap-4">
						{#each projects[activeIndex].skills as skill}
							<div class="flex items-center gap-2">
								<div class="h-4 w-4 rounded-full bg-orange-400"></div>
								<span>{skill}</span>
							</div>
						{/each}
					</div>
				{/if}
			</div>
		</div>
	</div>
{/if}
