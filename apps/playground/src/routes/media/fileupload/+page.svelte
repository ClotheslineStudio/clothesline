<script lang="ts">
  import FileUpload from '$lib/components/media/FileUpload/FileUpload.svelte';

  let selectedFiles: FileList | null = null;

  function handleFiles(files: FileList | null) {
    selectedFiles = files;
  }
</script>

<h1 class="text-2xl font-bold mb-4">FileUpload Component</h1>

<div class="space-y-6">

  <!-- Basic single upload -->
  <FileUpload label="Upload a file" accept=".pdf,.jpg,.png" onChange={handleFiles} />

  <!-- Multiple upload -->
  <FileUpload label="Upload multiple files" multiple={true} onChange={handleFiles} />

  {#if selectedFiles}
    <div class="mt-4">
      <h2 class="text-lg font-semibold mb-2">Selected Files</h2>
      <ul class="list-disc pl-4 text-sm">
        {#each Array.from(selectedFiles) as file}
          <li>{file.name} — {(file.size / 1024).toFixed(1)} KB</li>
        {/each}
      </ul>
    </div>
  {/if}

</div>
