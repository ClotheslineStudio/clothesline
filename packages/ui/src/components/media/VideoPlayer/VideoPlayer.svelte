<script lang="ts">
  export let src: string;
  export let type: string = 'video/mp4';
  export let controls: boolean = true;
  export let autoplay: boolean = false;
  export let loop: boolean = false;
  export let muted: boolean = false;
  export let poster: string | null = null;
  export let className: string = '';
</script>

<video
  class="cl-video-player {className}"
  {controls}
  {autoplay}
  {loop}
  {muted}
  poster={poster}
>
  <source src={src} type={type} />
  Your browser does not support the video tag.
</video>

<style>
  .cl-video-player {
    display: block;
    width: 100%;
    max-width: 100%;
    border-radius: var(--radius-md, 0.5rem);
    background-color: var(--color-surface-200, #ddd);
    box-shadow: var(--shadow-md, 0 1px 3px rgba(0, 0, 0, 0.1));
  }

  .cl-video-player:focus {
    outline: 2px solid var(--color-primary-500, #3399ff);
    outline-offset: 2px;
  }
</style>
