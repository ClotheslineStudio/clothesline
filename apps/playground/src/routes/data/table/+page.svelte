<script lang="ts">
  import Table from '$lib/components/data/Table/Table.svelte';
</script>

<h1 class="text-2xl font-bold mb-4">Table Component</h1>

<Table>
  <svelte:fragment slot="caption">
    <caption class="text-left text-sm p-4 text-muted-foreground">
      List of users and their roles
    </caption>
  </svelte:fragment>

  <svelte:fragment slot="head">
    <th>Name</th>
    <th>Email</th>
    <th>Role</th>
  </svelte:fragment>

  <svelte:fragment slot="body">
    <tbody>
      <tr>
        <td>Jane Doe</td>
        <td>jane@example.com</td>
        <td>Admin</td>
      </tr>
      <tr>
        <td>John Smith</td>
        <td>john@example.com</td>
        <td>Editor</td>
      </tr>
      <tr>
        <td>Alice Jones</td>
        <td>alice@example.com</td>
        <td>Viewer</td>
      </tr>
    </tbody>
  </svelte:fragment>

  <svelte:fragment slot="foot">
    <tfoot>
      <tr>
        <td colspan="3" class="text-right px-4 py-2 text-sm text-muted-foreground">
          Showing 1–3 of 3 users
        </td>
      </tr>
    </tfoot>
  </svelte:fragment>
</Table>
