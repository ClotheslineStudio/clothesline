<script>
  export let title = '';
  export let subtitle = '';
  export let image = '';
</script>

<section class="hero-section py-16 px-4 text-on-surface bg-surface">
  <div class="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-10">
    {#if image}
      <img src={image} alt="Hero" class="rounded-3xl shadow-xl w-64 h-64 object-cover" />
    {/if}
    <div class="flex-1 space-y-4">
      <h1 class="text-5xl font-bold text-on-accent">{title}</h1>
      <p class="text-lg text-on-surface-muted">{subtitle}</p>
    </div>
  </div>
</section>
