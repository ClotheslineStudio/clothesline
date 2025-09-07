<script lang="ts">
  import Dropdown from '$lib/components/overlays/Dropdown/Dropdown.svelte';
  import ComponentPreview from '$lib/components/dev/ComponentPreview/ComponentPreview.svelte';

  const githubUrl =
    'https://github.com/clotheslinestudio/ui/blob/main/src/components/overlays/Dropdown/Dropdown.svelte';

  let selected = 'All';

  const codeDefault = `<Dropdown on:select={(e) => selected = e.detail.value}>
  <button slot="trigger" class="btn">Filter: {selected}</button>
  <button data-menu-item value="All">All</button>
  <button data-menu-item value="Active">Active</button>
  <button data-menu-item value="Archived">Archived</button>
</Dropdown>`;

  const codeAlignEnd = `<Dropdown align="end">
  <button slot="trigger" class="btn">Actions</button>
  <button data-menu-item value="Rename">Rename</button>
  <button data-menu-item value="Duplicate">Duplicate</button>
  <button data-menu-item value="Delete">Delete</button>
</Dropdown>`;

  const codeTopPlacement = `<Dropdown placement="top">
  <button slot="trigger" class="btn">Top menu</button>
  <button data-menu-item value="One">One</button>
  <button data-menu-item value="Two">Two</button>
  <button data-menu-item value="Three">Three</button>
</Dropdown>`;

  const codeNoCloseOnSelect = `<Dropdown closeOnSelect={false} on:select={(e) => selected = e.detail.value}>
  <button slot="trigger" class="btn">Stay open</button>
  <button data-menu-item value="A">A</button>
  <button data-menu-item value="B">B</button>
  <button data-menu-item value="C">C</button>
</Dropdown>`;

  function handleSelect(event: CustomEvent<{ value: string }>) {
    selected = event.detail.value;
  }
</script>

<h1 class="text-2xl font-bold mb-4">Dropdown Component</h1>

<section class="space-y-10">
  <!-- Default -->
  <div class="space-y-2">
    <h2 class="text-lg font-semibold">Default</h2>
    <ComponentPreview {githubUrl} code={codeDefault}>
      <Dropdown on:select={handleSelect}>
        <button slot="trigger" class="btn">Filter: {selected}</button>
        <button data-menu-item value="All">All</button>
        <button data-menu-item value="Active">Active</button>
        <button data-menu-item value="Archived">Archived</button>
      </Dropdown>
    </ComponentPreview>
  </div>

  <!-- Align: end -->
  <div class="space-y-2">
    <h2 class="text-lg font-semibold">Align: end</h2>
    <ComponentPreview {githubUrl} code={codeAlignEnd}>
      <div class="flex justify-end">
        <Dropdown align="end" on:select={handleSelect}>
          <button slot="trigger" class="btn">Actions</button>
          <button data-menu-item value="Rename">Rename</button>
          <button data-menu-item value="Duplicate">Duplicate</button>
          <button data-menu-item value="Delete">Delete</button>
        </Dropdown>
      </div>
    </ComponentPreview>
  </div>

  <!-- Placement: top -->
  <div class="space-y-2">
    <h2 class="text-lg font-semibold">Placement: top</h2>
    <ComponentPreview {githubUrl} code={codeTopPlacement}>
      <Dropdown placement="top" on:select={handleSelect}>
        <button slot="trigger" class="btn">Top menu</button>
        <button data-menu-item value="One">One</button>
        <button data-menu-item value="Two">Two</button>
        <button data-menu-item value="Three">Three</button>
      </Dropdown>
    </ComponentPreview>
  </div>

  <!-- Stay Open -->
  <div class="space-y-2">
    <h2 class="text-lg font-semibold">Stay Open (closeOnSelect = false)</h2>
    <ComponentPreview {githubUrl} code={codeNoCloseOnSelect}>
      <Dropdown on:select={handleSelect}>
        <button slot="trigger" class="btn">Stay open</button>
        <button data-menu-item value="A">A</button>
        <button data-menu-item value="B">B</button>
        <button data-menu-item value="C">C</button>
      </Dropdown>
    </ComponentPreview>
  </div>
</section>


