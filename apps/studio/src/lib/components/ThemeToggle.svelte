<script>
  import { onMount } from 'svelte';

  let isDark = false;

  onMount(() => {
    const stored = localStorage.getItem('theme');
    if (stored) {
      isDark = stored === 'dark';
    } else {
      isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    updateTheme();
  });

  function toggleTheme() {
    isDark = !isDark;
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    updateTheme();
  }

  function updateTheme() {
    document.documentElement.classList.toggle('dark', isDark);
  }
</script>

<!-- Animated Toggle Switch -->
<button
  on:click={toggleTheme}
  class="relative inline-flex h-8 w-16 items-center rounded-full transition bg-(--color-indigo)"
  aria-label="Toggle dark mode"
>
  <span
    class="absolute left-1 h-6 w-6 rounded-full bg-white transition-transform duration-300"
    class:translate-x-8={isDark}
  ></span>
  <span class="sr-only">Toggle dark mode</span>
</button>


  
  
  
  
  