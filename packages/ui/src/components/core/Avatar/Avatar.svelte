<script lang="ts">
  export let src: string = '';
  export let alt: string = '';
  export let name: string = '';
  export let size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' = 'md';
  export let shape: 'circle' | 'square' = 'circle';

  const initials = (name ?? '')
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .map((n) => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  const sizeVarMap = {
    xs: 'var(--avatar-size-xs)',
    sm: 'var(--avatar-size-sm)',
    md: 'var(--avatar-size-md)',
    lg: 'var(--avatar-size-lg)',
    xl: 'var(--avatar-size-xl)'
  } as const;

  $: sizeStyle = `width: ${sizeVarMap[size]}; height: ${sizeVarMap[size]};`;
</script>

<figure
  class="cl-avatar relative inline-flex items-center justify-center overflow-hidden"
  style="{sizeStyle}; border-radius: {shape === 'circle' ? 'var(--radius-avatar, 9999rem)' : 'var(--radius-base, 0.375rem)'};"
>
  {#if src}
    <img
      src={src}
      alt={alt}
      class="h-full w-full object-cover"
      style="border-radius: {shape === 'circle' ? 'var(--radius-avatar, 9999rem)' : 'var(--radius-base, 0.375rem)'};"
    />
  {:else}
    <span class="cl-avatar__initials" style="line-height: 1;">
      {initials}
    </span>
  {/if}
</figure>

<style>

  .cl-avatar {
    background: var(--avatar-bg);
    color: var(--avatar-text);
    border: var(--avatar-border);
    }


  .cl-avatar__initials {
    width: 100%;
    height: 100%;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    user-select: none;
  }
</style>







