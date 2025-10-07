<script context="module" lang="ts">
  export type Tone =
    | 'default'
    | 'muted'
    | 'primary'
    | 'success'
    | 'warning'
    | 'error'
    | 'info';
</script>

<script lang="ts">
  import Text from '../Text/Text.svelte';

  export let level: 1 | 2 | 3 | 4 | 5 | 6 = 2; // semantic <h1>…<h6>
  export let tone: Tone = 'default';
  export let align: 'start' | 'center' | 'end' | 'justify' = 'start';
  export let weight: number | 'normal' | 'medium' | 'semibold' | 'bold' | null = null;
  export let underline = false;
  export let className = '';

  // Map levels to visual variants (tweak to taste)
  const variantByLevel: Record<number, 'heading' | 'subheading' | 'body' | 'caption'> = {
    1: 'heading',
    2: 'heading',
    3: 'subheading',
    4: 'subheading',
    5: 'body',
    6: 'caption'
  };
</script>

<Text
  variant={variantByLevel[level]}
  as={`h${level}`}
  {tone}
  {align}
  {weight}
  underline={underline}
  className={className}
>
  <slot />
</Text>
