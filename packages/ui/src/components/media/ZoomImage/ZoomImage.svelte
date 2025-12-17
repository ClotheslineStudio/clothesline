<script lang="ts">
  export let src: string;
  export let alt: string = '';
  export let zoomOnClick: boolean = true;

  let zoomed = false;

  function toggleZoom() {
    if (zoomOnClick) {
      zoomed = !zoomed;
    }
  }
</script>

{#if zoomed}
  <button
    type="button"
    class="cl-zoom-backdrop"
    on:click={toggleZoom}
    aria-label="Close zoomed image"
  >
    <img src={src} alt={alt} loading="lazy" />
  </button>
{:else}
  <button
    type="button"
    class="cl-zoom-image"
    class:zoomed={zoomed}
    on:click={toggleZoom}
    aria-pressed={zoomed}
    aria-label="Zoom image"
  >
    <img src={src} alt={alt} loading="lazy" />
  </button>
{/if}

<style>
  .cl-zoom-image {
    cursor: zoom-in;
    display: inline-block;
    transition: transform 0.3s ease;
    border: none;
    background: none;
    padding: 0;
    margin: 0;
    font: inherit;
  }

  .cl-zoom-image img {
    max-width: 100%;
  }

  .cl-zoom-backdrop {
    position: fixed;
    inset: 0;
    background-color: rgba(0, 0, 0, 0.85);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 100;
    cursor: zoom-out;
    border: none;
    padding: 0;
    margin: 0;
    width: 100vw;
    height: 100vh;
  }

</style>
