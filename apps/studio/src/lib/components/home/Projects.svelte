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

<section style="background: var(--color-surface-900, #18181b); color: var(--on-surface, #fff); padding: var(--spacing-section, var(--spacing-8));">
	<h2 style="
		margin-bottom: var(--spacing-12, 3rem);
		font-size: var(--type-display-size, 2.25rem);
		font-family: var(--heading-font-family, var(--type-heading-family));
		font-weight: var(--heading-font-weight, 800);
		letter-spacing: var(--heading-letter-spacing, -0.01em);
		line-height: var(--type-heading-leading, 1.1);
		color: var(--color-accent-400, #fb923c);"
	>Projects</h2>

	<div class="grid auto-rows-[minmax(200px,1fr)] grid-cols-1 sm:grid-cols-2 lg:grid-cols-4" style="gap: var(--spacing-6, 1.5rem);">
		{#each projects as project, i}
			<button
				type="button"
				class={`group flex cursor-pointer flex-col justify-between transition-all duration-300
					${i === 0 ? 'lg:col-span-2 lg:row-span-2' : ''}
					${i === 3 ? 'lg:col-span-4' : ''}
					${i !== 0 && i !== 3 ? 'lg:col-span-1' : ''}
				`}
				aria-label={`Open details for ${project.title}`}
				on:click={() => openModal(i)}
				style="
					border-radius: var(--radius-card, var(--radius-lg, 1rem));
					background: var(--color-plum, #a78bfa);
					padding: var(--spacing-5, 1rem);
					box-shadow: var(--elevation-card, 0px 1px 3px rgba(0,0,0,0.10));
					border: var(--default-border-width, 1px) solid transparent;
					transition: box-shadow 0.3s, transform 0.3s;
				"
				on:mouseover={(e) => {
					const el = e.currentTarget as HTMLElement;
					el.style.transform = 'translateY(-4px)';
					el.style.boxShadow = 'var(--elevation-highest, 0px 8px 16px rgba(0,0,0,0.16))';
				}}
				on:focus={(e) => {
					const el = e.currentTarget as HTMLElement;
					el.style.transform = 'translateY(-4px)';
					el.style.boxShadow = 'var(--elevation-highest, 0px 8px 16px rgba(0,0,0,0.16))';
				}}
				on:mouseout={(e) => {
					const el = e.currentTarget as HTMLElement;
					el.style.transform = 'none';
					el.style.boxShadow = 'var(--elevation-card, 0px 1px 3px rgba(0,0,0,0.10))';
				}}
				on:blur={(e) => {
					const el = e.currentTarget as HTMLElement;
					el.style.transform = 'none';
					el.style.boxShadow = 'var(--elevation-card, 0px 1px 3px rgba(0,0,0,0.10))';
				}}
			>
				<img
					src={project.cover}
					alt={project.title}
					style="margin-bottom: var(--spacing-4, 1rem); height: 10rem; width: 100%; border-radius: var(--radius-md, 0.5rem); object-fit: cover;"
					on:error={(e) => { const img = e.target as HTMLImageElement; if (img) img.src = 'https://via.placeholder.com/300x200?text=Project'; }}
				/>

				<h3 style="
					font-size: var(--type-heading-size, 1.25rem);
					font-family: var(--heading-font-family, var(--type-heading-family));
					font-weight: var(--heading-font-weight, 700);
					color: var(--color-accent, #fb923c);"
				>{project.title}</h3>
				<p style="margin-top: var(--spacing-2, 0.5rem); font-size: var(--type-body-size, 1rem); color: var(--on-surface, #fff); opacity: 0.9;">{project.summary}</p>

				{#if project.skills?.length}
					<div style="margin-top: var(--spacing-4, 1rem); display: flex; flex-wrap: wrap; gap: var(--spacing-2, 0.5rem);">
						{#each project.skills as skill}
							<span style="border-radius: var(--radius-sm, 0.25rem); background: rgba(255,255,255,0.10); padding: var(--spacing-1, 0.25rem) var(--spacing-2, 0.5rem); font-size: var(--type-caption-size, 0.75rem); color: var(--on-surface, #fff);">{skill}</span>
						{/each}
					</div>
				{/if}
			</button>
		{/each}
	</div>
</section>

{#if modalOpen}
	<div style="position: fixed; inset: 0; z-index: var(--z-modal, 1000); display: flex; align-items: center; justify-content: center; background: rgba(0,0,0,0.7); padding: var(--spacing-6, 1.5rem);">
		<div style="position: relative; width: 100%; max-width: 48rem; border-radius: var(--radius-xl, 1rem); background: var(--color-surface-900, #171123); padding: var(--spacing-6, 1.5rem); color: var(--on-surface, #fff); box-shadow: var(--elevation-highest, 0px 8px 16px rgba(0,0,0,0.16));">
			<button style="position: absolute; top: var(--spacing-4, 1rem); right: var(--spacing-6, 1.5rem); font-size: var(--type-heading-size, 1.25rem); color: var(--on-surface, #fff); background: none; border: none; cursor: pointer;" on:click={closeModal}>✕</button>
			<h2 style="margin-bottom: var(--spacing-4, 1rem); font-size: var(--type-display-size, 2.25rem); font-family: var(--heading-font-family, var(--type-heading-family)); font-weight: var(--heading-font-weight, 700); color: var(--color-accent-400, #fb923c);">{projects[activeIndex].title}</h2>

			<div style="margin-bottom: var(--spacing-4, 1rem); display: flex; gap: var(--spacing-4, 1rem); border-bottom: var(--default-border-width, 1px) solid var(--color-surface-700, #444); padding-bottom: var(--spacing-2, 0.5rem);">
				{#each ['summary', 'challenges', 'role', 'tools', 'outcomes', 'skills'] as tab}
					<button
						style="border-bottom: var(--default-border-width, 2px) solid; border-color: ${activeTab === tab ? 'var(--color-accent-400, #fb923c)' : 'transparent'}; padding-bottom: var(--spacing-1, 0.25rem); font-size: var(--type-label-size, 0.875rem); letter-spacing: var(--type-label-tracking, 0.02em); text-transform: uppercase; background: none; color: var(--on-surface, #fff); cursor: pointer;"
						on:click={() => (activeTab = tab)}
					>
						{tab}
					</button>
				{/each}
			</div>

			{#if activeTab === 'summary'}
				<p style="color: var(--on-surface-subtle, #d1d5db);">{projects[activeIndex].summary}</p>
			{:else if activeTab === 'challenges'}
				<ul style="list-style: disc; padding-left: var(--spacing-5, 1rem); display: flex; flex-direction: column; gap: var(--spacing-2, 0.5rem);">
					{#each projects[activeIndex].challenges as ch}
						<li><strong>{ch.title}</strong>: {ch.solution}</li>
					{/each}
				</ul>
			{:else if activeTab === 'role'}
				<ul style="list-style: disc; padding-left: var(--spacing-5, 1rem);">
					{#each projects[activeIndex].role as role}
						<li>{role}</li>
					{/each}
				</ul>
			{:else if activeTab === 'tools'}
				<div style="display: flex; flex-wrap: wrap; gap: var(--spacing-2, 0.5rem);">
					{#each projects[activeIndex].tools as tool}
						<span style="border-radius: var(--radius-sm, 0.25rem); background: var(--color-surface-700, #444); padding: var(--spacing-1, 0.25rem) var(--spacing-2, 0.5rem); font-size: var(--type-caption-size, 0.75rem); color: var(--on-surface, #fff);">{tool.name}</span>
					{/each}
				</div>
			{:else if activeTab === 'outcomes'}
				<ul style="list-style: disc; padding-left: var(--spacing-5, 1rem);">
					{#each projects[activeIndex].outcomes as o}
						<li>{o}</li>
					{/each}
				</ul>
			{:else if activeTab === 'skills'}
				<div style="display: flex; flex-wrap: wrap; gap: var(--spacing-2, 0.5rem);">
					{#each projects[activeIndex].skills as skill}
						<span style="border-radius: var(--radius-sm, 0.25rem); background: var(--color-accent-500, #f97316); padding: var(--spacing-1, 0.25rem) var(--spacing-2, 0.5rem); font-size: var(--type-caption-size, 0.75rem); color: var(--on-surface, #fff);">{skill}</span>
					{/each}
				</div>
			{/if}
		</div>
	</div>
{/if}
