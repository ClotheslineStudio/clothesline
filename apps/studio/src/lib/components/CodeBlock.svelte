<script lang="ts">
	import { onMount } from 'svelte';
	export let lang = 'bash';
	export let label = '';
	export let code = '';

	let highlightedCode = '';

	async function highlight() {
		const Prism = (await import('prismjs')).default;
		await import(`prismjs/components/prism-${lang}.js`).catch(() => {}); // Fallback if not found
		highlightedCode = Prism.highlight(code, Prism.languages[lang] || Prism.languages.markup, lang);
	}

	onMount(highlight);

	async function copyCode() {
		try {
			await navigator.clipboard.writeText(code);
			alert('Copied to clipboard!');
		} catch (e) {
			console.error('Failed to copy:', e);
		}
	}
</script>

<div
	class="my-8 overflow-hidden rounded-lg border border-gray-200 bg-white dark:border-gray-700 dark:bg-[#1a1a1a]"
>
	{#if label}
		<div
			class="flex items-center justify-between bg-gray-100 px-4 py-2 text-xs font-semibold tracking-wide text-gray-600 uppercase dark:bg-gray-800 dark:text-gray-400"
		>
			<span>{label}</span>
			<button
				on:click={copyCode}
				class="text-xs text-gray-500 transition hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
			>
				Copy
			</button>
		</div>
	{/if}

	<pre class="relative overflow-x-auto p-4 text-sm">
      <code class="language-{lang}" on:click|stopPropagation>{@html highlightedCode}</code>
    </pre>
</div>

<style>
	code {
		font-family: 'Fira Code', Menlo, Monaco, 'Courier New', monospace;
		font-size: 0.875rem;
		line-height: 1.5;
	}

	pre code {
		display: block;
		white-space: pre;
	}

	:global(pre) {
		background-color: var(--tw-prose-pre-bg, #f9fafb);
	}

	:global(html.dark) pre {
		background-color: var(--tw-prose-pre-bg, #1a1a1a);
	}

	:global(.token.comment),
	:global(.token.prolog),
	:global(.token.doctype),
	:global(.token.cdata) {
		color: #999;
	}
	:global(.token.punctuation) {
		color: #ccc;
	}
	:global(.token.property),
	:global(.token.tag),
	:global(.token.boolean),
	:global(.token.number),
	:global(.token.constant),
	:global(.token.symbol),
	:global(.token.deleted) {
		color: #f87171; /* red-400 */
	}
	:global(.token.selector),
	:global(.token.attr-name),
	:global(.token.string),
	:global(.token.char),
	:global(.token.builtin),
	:global(.token.inserted) {
		color: #34d399; /* green-400 */
	}
	:global(.token.operator),
	:global(.token.entity),
	:global(.token.url),
	:global(.language-css .token.string),
	:global(.style .token.string),
	:global(.token.variable) {
		color: #fbbf24; /* yellow-400 */
	}
	:global(.token.atrule),
	:global(.token.attr-value),
	:global(.token.function),
	:global(.token.class-name) {
		color: #60a5fa; /* blue-400 */
	}
	:global(.token.keyword) {
		color: #c084fc; /* purple-400 */
	}
</style>
