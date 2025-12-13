<script lang="ts">
	let modalOpen = false;
	let activeIndex = 0;
	let activeTab = 'summary';

	const projects = [
		{
			title: 'G3 Drupal Website',
			summary: 'Led the development of a standalone site for the Generate Governance Group.',
			cover: 'image/g3.png',
			challenges: [{ title: 'Legacy platform', solution: 'Custom Drupal site' }],
			role: ['Primary point of contact', 'Designed logo'],
			tools: [{ name: 'Drupal' }, { name: 'Illustrator' }],
			outcomes: ['Branded site launched'],
			skills: ['Drupal', 'CMS'],
			images: { summary: '', challenges: '', role: '', tools: '', outcomes: '', skills: '' }
		},
		{
			title: 'Generate Docs',
			summary: 'Led documentation team for Generate.',
			cover: 'https://via.placeholder.com/300x200?text=Generate',
			challenges: [],
			role: [],
			tools: [],
			outcomes: [],
			skills: ['GitBook', 'GitHub'],
			images: {}
		},
		{
			title: 'Resume Website',
			summary: 'Portfolio built with SvelteKit and GSAP.',
			cover: 'https://via.placeholder.com/300x200?text=Resume',
			challenges: [],
			role: [],
			tools: [],
			outcomes: [],
			skills: ['SvelteKit', 'GSAP'],
			images: {}
		},

		{
			title: 'CIID GitHub Integration',
			summary: 'GitHub + YAML + Power BI dashboards.',
			cover: 'https://via.placeholder.com/300x200?text=CIID',
			challenges: [],
			role: [],
			tools: [],
			outcomes: [],
			skills: ['YAML', 'Power BI'],
			images: {}
		},
		{
			title: 'Clothesline Studio',
			summary: 'Studio branding and microsite templates.',
			cover: 'https://via.placeholder.com/300x200?text=Studio',
			challenges: [],
			role: [],
			tools: [],
			outcomes: [],
			skills: ['Branding', 'Web'],
			images: {}
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
</script>

<section class="bg-gray-900 px-6 py-20 text-white sm:px-10 lg:px-20">
	<h2 class="mb-12 text-4xl font-extrabold tracking-tight text-orange-400">Projects</h2>

	<div class="grid auto-rows-[minmax(200px,1fr)] grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
		{#each projects as project, i}
			<button
				type="button"
				class={`group flex cursor-pointer flex-col justify-between rounded-2xl bg-(--color-plum) p-5
		shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl
		${i === 0 ? 'lg:col-span-2 lg:row-span-2' : ''}
		${i === 3 ? 'lg:col-span-4' : ''}
		${i !== 0 && i !== 3 ? 'lg:col-span-1' : ''}
	  `}
				aria-label={`Open details for ${project.title}`}
				on:click={() => openModal(i)}
			>
				<img
					src={project.cover}
					alt={project.title}
					class="mb-4 h-40 w-full rounded-lg object-cover"
					on:error={(e) => { const img = e.target as HTMLImageElement; if (img) img.src = 'https://via.placeholder.com/300x200?text=Project'; }}
				/>

				<h3 class="text-xl font-semibold text-(--color-accent)">{project.title}</h3>
				<p class="mt-2 text-sm text-white/90">{project.summary}</p>

				{#if project.skills?.length}
					<div class="mt-4 flex flex-wrap gap-2">
						{#each project.skills as skill}
							<span class="rounded bg-white/10 px-2 py-1 text-xs text-white">{skill}</span>
						{/each}
					</div>
				{/if}
			</button>
		{/each}
	</div>
</section>

{#if modalOpen}
	<div class="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-6">
		<div class="relative w-full max-w-3xl rounded-xl bg-[#171123] p-6 text-white shadow-2xl">
			<button class="absolute top-4 right-6 text-xl" on:click={closeModal}>✕</button>
			<h2 class="mb-4 text-4xl font-bold text-orange-400">{projects[activeIndex].title}</h2>

			<div class="mb-4 flex gap-4 border-b border-gray-600 pb-2">
				{#each ['summary', 'challenges', 'role', 'tools', 'outcomes', 'skills'] as tab}
					<button
						class="border-b-2 pb-1 text-sm tracking-wider uppercase"
						class:border-orange-400={activeTab === tab}
						class:border-transparent={activeTab !== tab}
						on:click={() => (activeTab = tab)}
					>
						{tab}
					</button>
				{/each}
			</div>

			{#if activeTab === 'summary'}
				<p class="text-gray-300">{projects[activeIndex].summary}</p>
			{:else if activeTab === 'challenges'}
				<ul class="list-disc space-y-2 pl-5">
					{#each projects[activeIndex].challenges as ch}
						<li><strong>{ch.title}</strong>: {ch.solution}</li>
					{/each}
				</ul>
			{:else if activeTab === 'role'}
				<ul class="list-disc pl-5">
					{#each projects[activeIndex].role as role}
						<li>{role}</li>
					{/each}
				</ul>
			{:else if activeTab === 'tools'}
				<div class="flex flex-wrap gap-2">
					{#each projects[activeIndex].tools as tool}
						<span class="rounded bg-gray-700 px-2 py-1 text-sm">{tool.name}</span>
					{/each}
				</div>
			{:else if activeTab === 'outcomes'}
				<ul class="list-disc pl-5">
					{#each projects[activeIndex].outcomes as o}
						<li>{o}</li>
					{/each}
				</ul>
			{:else if activeTab === 'skills'}
				<div class="flex flex-wrap gap-2">
					{#each projects[activeIndex].skills as skill}
						<span class="rounded bg-orange-500 px-2 py-1 text-sm">{skill}</span>
					{/each}
				</div>
			{/if}
		</div>
	</div>
{/if}
