<script lang="ts">
  import Text from '$lib/components/core/Text/Text.svelte';
</script>

<h1 class="text-2xl font-bold mb-4">Text Component</h1>

<div class="flex flex-col gap-4">

  <Text variant="heading" as="h1">Heading Variant (h1)</Text>
  <Text variant="subheading" as="h2">Subheading Variant (h2)</Text>
  <Text variant="lead" as="p">Lead text — a prominent paragraph style</Text>
  <Text variant="body" as="p">Body text — for normal paragraphs and blocks of content.</Text>
  <Text variant="caption" as="p">Caption text — often used for small notes or labels.</Text>
  <Text variant="overline" as="span">Overline text — uppercase label styling.</Text>
  <Text variant="code" as="code">const a = 42;</Text>

</div>
