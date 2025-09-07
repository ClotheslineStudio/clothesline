<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { derived } from 'svelte/store';

	export let sections: {
		label: string;
		items: { label: string; href: string }[];
		collapsed?: boolean;
	}[] = [];

	const currentPath = derived(page, ($page) => $page.url.pathname);

	let openSections: Record<string, boolean> = {};

	onMount(() => {
		for (const section of sections) {
			openSections[section.label] = !section.collapsed;
		}
	});

	function toggleSection(label: string) {
		openSections[label] = !openSections[label];
	}
</script>

<aside class="cl-sidenav">
	{#each sections as section}
		<div class="cl-sidenav-group">
			<button
				class="cl-sidenav-header"
				on:click={() => toggleSection(section.label)}
				aria-expanded={openSections[section.label]}
			>
				{section.label}
			</button>

			{#if openSections[section.label]}
				<ul class="cl-sidenav-list">
					{#each section.items as item}
						<li>
							<a href={item.href} class:active={$currentPath === item.href}>
								{item.label}
							</a>
						</li>
					{/each}
				</ul>
			{/if}
		</div>
	{/each}
</aside>

<style>
	.cl-sidenav {
		width: 240px;
		padding: var(--spacing-4, 1rem);
		background: var(--background-panel, #f9fafb);
		border-right: 1px solid var(--border-default-color, #e5e7eb);
		font-size: 0.875rem;
	}

	.cl-sidenav-header {
		font-weight: bold;
		padding: 0.5rem 0;
		width: 100%;
		text-align: left;
		background: none;
		border: none;
		color: var(--base-font-color, #111);
		cursor: pointer;
	}

	.cl-sidenav-list {
		margin: 0.25rem 0 1rem 0;
		padding-left: 1rem;
		list-style: none;
	}

	.cl-sidenav-list li {
		margin-bottom: 0.25rem;
	}

	.cl-sidenav-list a {
		color: var(--link-color, #374151);
		text-decoration: none;
	}

	.cl-sidenav-list a.active {
		font-weight: 600;
		color: var(--color-primary-600, #2563eb);
	}

	.cl-sidenav-list a:hover {
		color: var(--color-primary-500, #3b82f6);
	}
</style>
