<script lang="ts">
  export let src: string = '';
  export let alt: string = '';
  export let name: string = '';
  export let size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' = 'md';

  const initials = name
    .split(' ')
    .map((n) => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  const sizeMap = {
    xs: '1.5rem',
    sm: '2rem',
    md: '2.5rem',
    lg: '3rem',
    xl: '4rem'
  };

  const sizeStyle = `width: ${sizeMap[size]}; height: ${sizeMap[size]};`;
</script>

<figure
  class="relative rounded-full overflow-hidden inline-flex items-center justify-center border"
  style={sizeStyle}
>
  {#if src}
    <img
      src={src}
      alt={alt}
      class="w-full h-full object-cover"
    />
  {:else}
    <span
      class="w-full h-full flex items-center justify-center font-bold text-[var(--avatar-text)] bg-[var(--avatar-bg)]"
      style="line-height: 1;"
    >
      {initials}
    </span>
  {/if}
</figure>






