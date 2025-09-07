<script lang="ts">
  export let checked = false;
  export let className: string = '';
</script>

<label class="checkbox-label {className}">
  <input type="checkbox" bind:checked />
  <slot />
</label>