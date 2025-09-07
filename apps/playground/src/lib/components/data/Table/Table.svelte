<script lang="ts">
  export let className = '';
</script>

<div class="cl-table-wrapper {className}">
  <table class="cl-table">
    <slot name="caption" />
    <thead>
      <tr>
        <slot name="head">
          <th>Header</th>
        </slot>
      </tr>
    </thead>
    <slot name="body" />
    <slot name="foot" />
  </table>
</div>

<style>
  .cl-table-wrapper {
    overflow-x: auto;
    border-radius: var(--radius-md, 0.5rem);
    border: 1px solid var(--border-default-color, #ccc);
  }

  .cl-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 0.875rem;
    background: var(--background-surface, #fff);
    color: var(--base-font-color);
  }


  .cl-table thead {
    background-color: var(--color-surface-100, #f0f0f0);
    text-align: left;
  }

  .cl-table th {
    padding: 0.75rem 1rem;
    border-bottom: 1px solid var(--border-muted-color, #e5e7eb);
    vertical-align: top;
  }

  </style>
