<script lang="ts">
  import type { RampColors } from '$lib/theme/types';

  let { ramps }: { ramps: RampColors } = $props();

  const primary = $derived(ramps.primary[500]);
  const surface = $derived(ramps.neutral[50]);
  const surfaceStrong = $derived(ramps.neutral[100]);
  const text = $derived(ramps.neutral[900]);
</script>

<article class="login-card" style={`--preview-primary:${primary}; --preview-surface:${surface}; --preview-surface-strong:${surfaceStrong}; --preview-text:${text};`}>
  <h3>Login</h3>
  <label>
    Email
    <input type="email" value="hello@clothesline.dev" />
  </label>
  <label>
    Password
    <input type="password" value="password" />
  </label>
  <button type="button">Sign in</button>
</article>

<style>
  .login-card {
    width: min(320px, 100%);
    border-radius: var(--radius-container, 0.9rem);
    padding: var(--tg-preview-gap, 1rem);
    display: grid;
    gap: 0.75rem;
    border: 1px solid color-mix(in oklab, var(--preview-text) 15%, transparent);
    background: linear-gradient(160deg, var(--preview-surface), var(--preview-surface-strong));
    color: var(--preview-text);
    font-family: var(--base-font-family, inherit);
  }

  h3 {
    margin: 0;
    font-size: 1rem;
  }

  label {
    display: grid;
    gap: 0.3rem;
    font-size: 0.78rem;
    font-weight: 600;
  }

  input {
    border-radius: var(--radius-interactive, 0.55rem);
    border: 1px solid color-mix(in oklab, var(--preview-text) 15%, transparent);
    background: color-mix(in oklab, var(--preview-surface) 72%, white);
    padding: 0.5rem 0.65rem;
    color: var(--preview-text);
  }

  button {
    border: none;
    border-radius: var(--radius-interactive, 0.65rem);
    padding: 0.6rem 0.75rem;
    font-weight: 700;
    background: var(--preview-primary);
    color: white;
  }
</style>
