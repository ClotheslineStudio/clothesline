<script lang="ts">
  export let src: string;
  export let type: string = 'audio/mpeg';
  export let controls: boolean = true;
  export let autoplay: boolean = false;
  export let loop: boolean = false;
  export let muted: boolean = false;
  export let className: string = '';
</script>

<audio
  class="cl-audio-player {className}"
  {controls}
  {autoplay}
  {loop}
  {muted}
>
  <source src={src} type={type} />
  Your browser does not support the audio element.
</audio>

<style>
  .cl-audio-player {
    width: 100%;
    max-width: 100%;
    background-color: var(--color-surface-100, #f5f5f5);
    border-radius: var(--radius-sm, 0.25rem);
    box-shadow: var(--shadow-sm, 0 1px 2px rgba(0, 0, 0, 0.05));
    padding: var(--spacing-1, 0.25rem);
  }

  .cl-audio-player:focus {
    outline: 2px solid var(--color-primary-500, #3399ff);
    outline-offset: 2px;
  }
</style>
