<script lang="ts">
  export let value: string = '';
  export let placeholder: string = '';
  export let className: string = '';
</script>

<input
  type="text"
  class="input-base {className}"
  bind:value
  placeholder={placeholder}
/>