<script lang="ts">
  export let src: string;
  export let alt: string = 'Image';
  export let width: string = '100%';
  export let height: string = 'auto';
  export let loading: 'lazy' | 'eager' = 'lazy';
  export let objectFit: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down' = 'cover';
  export let className: string = '';
</script>

<img
  src={src}
  alt={alt}
  class={`cl-image ${className}`}
  loading={loading}
  style={`width: ${width}; height: ${height}; object-fit: ${objectFit};`}
/>

<style>
  .cl-image {
    display: block;
    max-width: 100%;
    border-radius: var(--radius-sm, 0.25rem);
    box-shadow: var(--shadow-sm, 0 1px 2px rgba(0, 0, 0, 0.05));
    background-color: var(--background-surface, #f9f9f9);
  }
</style>

