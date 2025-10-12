<script lang="ts">
  export let title = '';
  export let right: unknown = null;
</script>

<section class="mb-6">
  <div class="flex items-center justify-between mb-2">
    <h3 class="label font-semibold">{title}</h3>
    {#if right}{@html right}{/if}
  </div>
  <div class="cl-section">
    <slot />
  </div>
</section>
