<script lang="ts">
  export let href: string = '#';
  export let external: boolean = false;
  export let className = '';
  export let underline: boolean = false;
  export let target: '_blank' | '_self' | '_parent' | '_top' = '_self';
  export let rel: string = 'noopener noreferrer';
</script>

{#if external}
  <a
    href={href}
    class={`cl-link ${underline ? 'cl-link-underline' : ''} ${className}`}
    target={target}
    rel={rel}
  >
    <slot />
  </a>
{:else}
  <a
    href={href}
    class={`cl-link ${underline ? 'cl-link-underline' : ''} ${className}`}
  >
    <slot />
  </a>
{/if}

<style>
  .cl-link {
    color: var(--color-primary-700, #1d4ed8);
    text-decoration: none;
    font-weight: 500;
    transition: color 0.2s ease;
  }

  .cl-link:hover {
    color: var(--color-primary-900, #1e3a8a);
    text-decoration: underline;
  }

  .cl-link-underline {
    text-decoration: underline;
  }
</style>
