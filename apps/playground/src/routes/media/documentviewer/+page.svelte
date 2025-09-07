<script lang="ts">
  import DocumentViewer from '$lib/components/media/DocumentViewer/DocumentViewer.svelte';

  const pdfFile = 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf';
  const imageFile = 'https://via.placeholder.com/600x400.png?text=Example+Image';
  const unknownFile = 'https://example.com/data.docx';
</script>

<h1 class="text-2xl font-bold mb-4">DocumentViewer Component</h1>

<section class="space-y-8">

  <div>
    <h2 class="text-lg font-semibold mb-2">PDF Document</h2>
    <DocumentViewer src={pdfFile} alt="Sample PDF" />
  </div>

  <div>
    <h2 class="text-lg font-semibold mb-2">Image Document</h2>
    <DocumentViewer src={imageFile} alt="Sample Image" />
  </div>

  <div>
    <h2 class="text-lg font-semibold mb-2">Unsupported File Type</h2>
    <DocumentViewer src={unknownFile} fallbackText="Cannot preview this file type." />
  </div>

</section>
