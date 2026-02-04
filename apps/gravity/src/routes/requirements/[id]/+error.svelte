<script lang="ts">
  export let error: any;
</script>

<div class="wrap">
  <h1>Requirement not found</h1>
  <p class="muted">{error?.message ?? 'This requirement does not exist (or you don’t have access).'}</p>
  <a href="/requirements">← Back to Requirements</a>
</div>

<style>
  .wrap { padding: 18px; max-width: 900px; margin: 0 auto; }
  .muted { opacity: 0.75; }
  a { display:inline-block; margin-top: 10px; }
</style>
