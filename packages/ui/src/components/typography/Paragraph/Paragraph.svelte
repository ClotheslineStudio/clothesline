<!-- packages/ui/src/components/typography/Paragraph/Paragraph.svelte -->
<script context="module" lang="ts">
  // Define the Tone type for paragraph tone options
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

  // Props
  export let tone: Tone = 'default';
  export let align: 'start' | 'center' | 'end' | 'justify' = 'start';
  export let weight: number | 'normal' | 'medium' | 'semibold' | 'bold' | null = null;
  export let lead = false;                    // larger intro paragraph
  export let italic = false;
  export let underline = false;
  export let truncate = false;
  export let clamp: number | null = null;     // multi-line clamp
  export let as: keyof HTMLElementTagNameMap = 'p'; // override if needed (e.g., 'div')
  export let className = '';
</script>

<Text
  variant={lead ? 'lead' : 'body'}
  {as}
  {tone}
  {align}
  {weight}
  {italic}
  {underline}
  {truncate}
  {clamp}
  className={className}
>
  <slot />
</Text>
