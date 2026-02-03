<script lang="ts">
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { MAX_SOURCE_FILE_BYTES } from '$lib/constants/uploads';
	import { readErrorMessage } from '$lib/client/http';
	import { validateHttpUrl, validatePdfFile } from '$lib/validation/sources';

	type Mode = 'pdf' | 'url';

	let mode: Mode = 'pdf';

	// Common
	$: workspaceId = $page.url.searchParams.get('workspaceId') ?? 'ws_demo';

	let error = '';

	// URL mode
	let title = '';
	let url = '';
	let isSubmitting = false;

	// PDF mode
	let pdfTitle = '';
	let file: File | null = null;
	let isUploading = false;

	function formatBytes(bytes: number) {
		const units = ['B', 'KB', 'MB', 'GB'];
		let i = 0;
		let v = bytes;
		while (v >= 1024 && i < units.length - 1) {
			v /= 1024;
			i++;
		}
		return `${v.toFixed(i === 0 ? 0 : 1)} ${units[i]}`;
	}

	function validateUrl(raw: string): string | null {
		const v = raw.trim();
		if (!v) return 'URL is required.';
		try {
			const u = new URL(v);
			if (u.protocol !== 'http:' && u.protocol !== 'https:') {
				return 'URL must start with http:// or https://';
			}
			return null;
		} catch {
			return 'Invalid URL format. Include http:// or https://';
		}
	}

	async function submitUrl() {
		error = '';

		const t = title.trim();
		if (!t) {
			error = 'Title is required (v1).';
			return;
		}

		const v = validateHttpUrl(url);
		if (!v.ok) {
			error = v.message;
			return;
		}

		isSubmitting = true;
		try {
			const res = await fetch('/api/sources/url', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					workspaceId: workspaceId.trim(),
					title: t,
					url: v.normalized
				})
			});

			if (!res.ok) {
				error = await readErrorMessage(res);
				return;
			}

			const created = await res.json(); // { ok: true, source }
			const id = created?.source?.id;
			// v1 success behavior: refresh list
			await goto(
				`/sources?workspaceId=${encodeURIComponent(workspaceId)}&created=${encodeURIComponent(id)}`
			);
		} catch (e) {
			error = e instanceof Error ? e.message : 'Unexpected error creating URL source.';
		} finally {
			isSubmitting = false;
		}
	}

	async function uploadPdf() {
		error = '';

		if (!file) {
			error = 'Please choose a PDF file.';
			return;
		}

		// Client-side checks (server enforces too) — shared validator
		const v = validatePdfFile(file);
		if (!v.ok) {
			error = v.message;
			return;
		}

		isUploading = true;
		try {
			const form = new FormData();
			form.set('workspaceId', workspaceId.trim());
			if (pdfTitle.trim()) form.set('title', pdfTitle.trim());
			form.set('file', file);

			const res = await fetch('/api/sources', {
				method: 'POST',
				body: form
			});

			if (!res.ok) {
				error = await readErrorMessage(res);
				return;
			}

			const created = await res.json(); // { ok: true, source }
			const id = created?.source?.id;
			await goto(
				`/sources?workspaceId=${encodeURIComponent(workspaceId)}&created=${encodeURIComponent(id)}`
			);
		} catch (e) {
			error = e instanceof Error ? e.message : 'Unexpected error uploading PDF.';
		} finally {
			isUploading = false;
		}
	}
</script>

<div class="mx-auto max-w-3xl px-6 py-8">
	<div class="mb-6">
		<div class="text-sm text-zinc-500">Workspace: {workspaceId}</div>
		<h1 class="mt-1 text-2xl font-semibold">Add Source</h1>
		<p class="mt-1 text-sm text-zinc-600">
			Upload a PDF or add a URL. This creates a Source record in the workspace.
		</p>
	</div>

	<!-- Tabs -->
	<div class="mb-6 inline-flex rounded-lg border border-zinc-200 bg-white p-1">
		<button
			class={`rounded-md px-3 py-1.5 text-sm ${mode === 'pdf' ? 'bg-zinc-900 text-white' : 'text-zinc-700 hover:bg-zinc-100'}`}
			on:click={() => (mode = 'pdf')}
			type="button"
		>
			Upload PDF
		</button>
		<button
			class={`rounded-md px-3 py-1.5 text-sm ${mode === 'url' ? 'bg-zinc-900 text-white' : 'text-zinc-700 hover:bg-zinc-100'}`}
			on:click={() => (mode = 'url')}
			type="button"
		>
			Add URL
		</button>
	</div>

	{#if error}
		<div class="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
			{error}
		</div>
	{/if}

	{#if mode === 'pdf'}
		<div class="rounded-xl border border-zinc-200 bg-white p-6">
			<h2 class="text-sm font-medium text-zinc-900">Upload PDF</h2>

			<div class="mt-4 grid gap-4">
				<label class="grid gap-1">
					<span class="text-sm text-zinc-700">Title (optional)</span>
					<input
						class="rounded-lg border border-zinc-200 px-3 py-2 text-sm"
						bind:value={pdfTitle}
						placeholder="If blank, filename is used"
					/>
				</label>

				<label class="grid gap-1">
					<span class="text-sm text-zinc-700">PDF file</span>
					<input
						class="rounded-lg border border-zinc-200 px-3 py-2 text-sm"
						type="file"
						accept="application/pdf"
						on:change={(e) => {
							const input = e.currentTarget as HTMLInputElement;
							file = input.files?.[0] ?? null;
						}}
					/>
					<span class="text-xs text-zinc-500">Max size: {formatBytes(MAX_SOURCE_FILE_BYTES)}</span>
				</label>

				<div class="flex gap-2">
					<button
						class="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white disabled:opacity-60"
						on:click|preventDefault={uploadPdf}
						disabled={isUploading}
						type="button"
					>
						{isUploading ? 'Uploading…' : 'Upload PDF'}
					</button>

					<button
						class="rounded-lg border border-zinc-200 px-4 py-2 text-sm text-zinc-700 hover:bg-zinc-50"
						on:click={() => goto(`/sources?workspaceId=${encodeURIComponent(workspaceId)}`)}
						type="button"
					>
						Cancel
					</button>
				</div>
			</div>
		</div>
	{:else}
		<div class="rounded-xl border border-zinc-200 bg-white p-6">
			<h2 class="text-sm font-medium text-zinc-900">Add URL</h2>

			<div class="mt-4 grid gap-4">
				<label class="grid gap-1">
					<span class="text-sm text-zinc-700">Title (required)</span>
					<input
						class="rounded-lg border border-zinc-200 px-3 py-2 text-sm"
						bind:value={title}
						placeholder="Ex: IDEA Part B Guidance (2026)"
					/>
				</label>

				<label class="grid gap-1">
					<span class="text-sm text-zinc-700">URL (required)</span>
					<input
						class="rounded-lg border border-zinc-200 px-3 py-2 text-sm"
						bind:value={url}
						placeholder="https://…"
					/>
				</label>

				<div class="flex gap-2">
					<button
						class="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white disabled:opacity-60"
						on:click|preventDefault={submitUrl}
						disabled={isSubmitting}
						type="button"
					>
						{isSubmitting ? 'Saving…' : 'Create URL Source'}
					</button>

					<button
						class="rounded-lg border border-zinc-200 px-4 py-2 text-sm text-zinc-700 hover:bg-zinc-50"
						on:click={() => goto(`/sources?workspaceId=${encodeURIComponent(workspaceId)}`)}
						type="button"
					>
						Cancel
					</button>
				</div>
			</div>
		</div>
	{/if}
</div>
