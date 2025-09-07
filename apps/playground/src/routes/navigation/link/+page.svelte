<script lang="ts">
  import Link from '$lib/components/navigation/Link/Link.svelte';
</script>

<h1 class="text-2xl font-bold mb-4">🔗 Link Component Demo</h1>

<p>
  This is an internal link:
  <Link href="/docs" underline={true}>Go to Docs</Link>
</p>

<p>
  This is an external link:
  <Link href="https://clotheslineui.com" external={true} target="_blank">Clothesline UI</Link>
</p>
