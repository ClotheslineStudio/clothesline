<script>
    import { onMount, createEventDispatcher } from 'svelte';
    import { writable } from 'svelte/store';
    import { browser } from '$app/environment';
  
    const settings = writable({
      largeText: false,
      highContrast: false,
      reduceMotion: false,
      dyslexicFont: false
    });
  
    const dispatch = createEventDispatcher();
  
    onMount(() => {
      if (browser) {
        const saved = localStorage.getItem('a11y-settings');
        if (saved) settings.set(JSON.parse(saved));
      }
    });
  
    $: if (browser) {
      localStorage.setItem('a11y-settings', JSON.stringify($settings));
  
      document.documentElement.classList.toggle('a11y-large-text', $settings.largeText);
      document.documentElement.classList.toggle('a11y-contrast', $settings.highContrast);
      document.documentElement.classList.toggle('a11y-reduce-motion', $settings.reduceMotion);
      document.documentElement.classList.toggle('a11y-dyslexic', $settings.dyslexicFont);
    }
  </script>
  
  <div class="fixed bottom-20 right-4 bg-[var(--color-bg)] text-[var(--color-text)] border border-[var(--color-plum)] rounded-xl p-4 shadow-lg z-50 w-64">
    <h2 class="text-lg font-bold mb-2">Accessibility Settings</h2>
    <ul class="space-y-2 text-sm">
      <li><label><input type="checkbox" bind:checked={$settings.largeText}> Large Text</label></li>
      <li><label><input type="checkbox" bind:checked={$settings.highContrast}> High Contrast</label></li>
      <li><label><input type="checkbox" bind:checked={$settings.reduceMotion}> Reduce Motion</label></li>
      <li><label><input type="checkbox" bind:checked={$settings.dyslexicFont}> Dyslexia-Friendly Font</label></li>
    </ul>
    <button
      class="mt-4 text-sm underline"
      on:click={() => dispatch('close')}
    >Close</button>
  </div>
  
  