<script lang="ts">
	import { page } from '$app/stores';

	export let data: {
		docs: { slug: string; title: string }[];
	};
</script>

<div class="min-h-screen bg-[var(--color-surface-50)] text-[var(--color-text)]">
	<div class="cl-container flex gap-0 pt-6 pb-10">
		<!-- Sidebar -->
		<aside
			class="sticky top-24 hidden h-[calc(100vh-6rem)] w-64 flex-col gap-4 overflow-y-auto border-r border-[var(--color-border-subtle)] bg-[var(--color-surface)] p-6 shadow-sm lg:flex"
		>
			<h2 class="text-sm font-semibold uppercase tracking-wide text-[var(--color-text-muted)]">
				Docs
			</h2>

			<ul class="mt-1 flex flex-col gap-1">
				{#each data.docs as doc}
					{@const isActive = $page.params.slug === doc.slug}
					<li>
						<a
							href={`/docs/${doc.slug}`}
							aria-current={isActive ? 'page' : undefined}
							class={`flex items-center rounded-md px-3 py-2 text-sm transition-all
								${isActive
									? 'bg-[var(--color-primary-100-vis)] text-[var(--color-primary-900-vis)] font-medium shadow-xs'
									: 'text-[var(--color-text-muted)] hover:bg-[var(--color-surface-100)] hover:text-[var(--color-text)]'}`}
						>
							{doc.title}
						</a>
					</li>
				{/each}
			</ul>
		</aside>

		<!-- Main Content -->
		<main class="flex-1 overflow-y-auto lg:pl-8">
			<div class="w-full">
				<slot />
			</div>
		</main>
	</div>
</div>



