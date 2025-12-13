<script lang="ts">
	import { onMount } from 'svelte';
	import type { ComponentType } from 'svelte';

	export let data: {
		content: ComponentType;
		metadata: { title?: string };
	};

	let toc: { id: string; text: string; level: number }[] = [];

	onMount(() => {
		const headings = Array.from(
			document.querySelectorAll('article h2, article h3')
		) as HTMLHeadingElement[];

		toc = headings.map((heading) => ({
			id: heading.id || heading.innerText.toLowerCase().replace(/\s+/g, '-'),
			text: heading.innerText,
			level: heading.tagName === 'H2' ? 2 : 3
		}));

		headings.forEach((heading, index) => {
			if (!heading.id) {
				heading.id = toc[index].id;
			}
		});
	});
</script>

<div class="min-h-screen bg-[var(--color-bg)] text-[var(--color-text)]">
	<div class="mx-auto flex w-full max-w-6xl gap-10 px-6 py-10 lg:px-10">
		<!-- Main content column -->
		<main class="flex-1 min-w-0">
			<!-- Breadcrumb navigation -->
			<nav class="mb-6 flex flex-wrap items-center gap-2 text-sm text-black/60 dark:text-white/70">
				<a
					href="/"
					class="hover:text-[var(--color-accent)] hover:underline"
				>
					Home
				</a>
				<span class="opacity-60">/</span>
				<a
					href="/docs"
					class="hover:text-[var(--color-accent)] hover:underline"
				>
					Docs
				</a>
				<span class="opacity-60">/</span>
				<span class="font-medium text-[var(--color-text)]">
					{data.metadata.title ?? 'Untitled'}
				</span>
			</nav>

			<!-- Article -->
			<article
				class="prose prose-slate max-w-none
					prose-headings:text-[var(--color-accent)]
					prose-a:text-[var(--color-accent)]
					prose-strong:text-[var(--color-text)]
					prose-code:text-[var(--color-text)]
					prose-pre:bg-[var(--color-night)]
					prose-pre:text-white
					rounded-2xl border border-black/5 bg-[var(--color-card-bg)] px-6 py-8 shadow-sm
					dark:border-white/10"
			>
				{#if data.content}
					<svelte:component this={data.content} />
				{:else}
					<p>Loading...</p>
				{/if}
			</article>
		</main>

		<!-- Table of Contents -->
		{#if toc.length > 1}
			<aside
				class="sticky top-24 hidden w-64 flex-shrink-0 self-start rounded-2xl border border-black/5 bg-[var(--color-card-bg)] p-4 text-sm shadow-sm dark:border-white/10 lg:block"
			>
				<h2 class="mb-3 text-xs font-semibold uppercase tracking-wide text-black/60 dark:text-white/70">
					On this page
				</h2>
				<div class="space-y-1">
					{#each toc as item}
						<a
							href={'#' + item.id}
							class={`block rounded px-2 py-1 transition-colors
								${item.level === 3 ? 'ml-4 text-xs' : 'text-sm'}
								text-black/70 dark:text-white/70
								hover:bg-[var(--color-bg)]
								hover:text-[var(--color-accent)]`}
						>
							{item.text}
						</a>
					{/each}
				</div>
			</aside>
		{/if}
	</div>
</div>
