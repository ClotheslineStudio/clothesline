<script>
  export let quote = '';
  export let author = '';
</script>

<blockquote class="quote-block px-6 py-8 rounded-xl bg-surface shadow text-on-surface-strong text-xl italic">
  <span>“{quote}”</span>
  {#if author}
    <footer class="mt-4 text-on-surface-muted text-base">— {author}</footer>
  {/if}
</blockquote>
