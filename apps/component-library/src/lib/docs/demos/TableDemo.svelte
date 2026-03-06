<script lang="ts">
  import { Table } from '@clothesline/ui';

  const rows = [
    { component: 'Button', status: 'Stable', owner: 'UI Team' },
    { component: 'Textarea', status: 'Stable', owner: 'Forms Team' },
    { component: 'Dialog', status: 'Beta', owner: 'Platform Team' }
  ];
</script>

<Table>
  <svelte:fragment slot="head">
    <th>Component</th>
    <th>Status</th>
    <th>Owner</th>
  </svelte:fragment>
  <svelte:fragment slot="body">
    <tbody>
      {#each rows as row}
        <tr>
          <td>{row.component}</td>
          <td>{row.status}</td>
          <td>{row.owner}</td>
        </tr>
      {/each}
    </tbody>
  </svelte:fragment>
</Table>
