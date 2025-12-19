<script>
    import { onMount, createEventDispatcher } from 'svelte';
    import { writable } from 'svelte/store';
    import { browser } from '$app/environment';
    import { Checkbox } from '@clothesline/ui';
  
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

  <div
    style="
      position: fixed;
      bottom: var(--spacing-20, 5rem);
      right: var(--spacing-4, 1rem);
      background: var(--background-elevation-2, var(--color-bg, #fff));
      color: var(--on-surface, #1a202c);
      border: var(--default-border-width, 1px) solid var(--color-primary-200, #e0e7ff);
      border-radius: var(--radius-xl, 0.75rem);
      padding: var(--spacing-4, 1rem);
      box-shadow: var(--elevation-2, 0 4px 12px rgba(0,0,0,0.10));
      z-index: 50;
      width: 18rem;
    "
  >
    <h2 style="font-size: var(--type-lg-size, 1.125rem); font-weight: var(--heading-font-weight, 800); margin-bottom: var(--spacing-2, 0.5rem);">Accessibility Settings</h2>
    <ul style="display: flex; flex-direction: column; gap: var(--spacing-2, 0.5rem); font-size: var(--type-sm-size, 0.875rem);">
      <li><Checkbox label="Large Text" bind:checked={$settings.largeText} /></li>
      <li><Checkbox label="High Contrast" bind:checked={$settings.highContrast} /></li>
      <li><Checkbox label="Reduce Motion" bind:checked={$settings.reduceMotion} /></li>
      <li><Checkbox label="Dyslexia-Friendly Font" bind:checked={$settings.dyslexicFont} /></li>
    </ul>
    <button
      style="
        margin-top: var(--spacing-4, 1rem);
        font-size: var(--type-sm-size, 0.875rem);
        color: var(--color-accent-500, #f59e42);
        background: none;
        border: none;
        text-decoration: underline;
        cursor: pointer;
        padding: 0;
      "
      on:click={() => dispatch('close')}
    >Close</button>
  </div>
  
  