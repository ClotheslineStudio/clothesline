<script lang="ts">
  export let src: string;
  export let title: string = 'Embedded content';
  export let provider: 'figma' | 'codepen' | 'trello' | 'loom' | 'generic' = 'generic';
  export let aspectRatio: string = '16 / 9';
  export let border: boolean = true;
</script>

<div class="cl-embed-frame {provider} {border ? 'with-border' : ''}" style={`aspect-ratio: ${aspectRatio};`}>
  <iframe
    src={src}
    title={title}
    loading="lazy"
    allowfullscreen
    allow="clipboard-write; encrypted-media; fullscreen; picture-in-picture"
    sandbox="allow-scripts allow-same-origin allow-popups"
  ></iframe>
</div>

<style>
  .cl-embed-frame {
    width: 100%;
    max-width: 100%;
    overflow: hidden;
    border-radius: var(--radius-md);
    background: var(--background-panel);
    position: relative;
  }

  .cl-embed-frame.with-border {
    border: 1px solid var(--border-default-color, #ccc);
  }

  .cl-embed-frame iframe {
    width: 100%;
    height: 100%;
    border: none;
    display: block;
  }

  /* Optional provider-specific tweaks */
  .cl-embed-frame.figma {
    background: #f4f4f4;
  }

  .cl-embed-frame.codepen {
    background: #1e1e1e;
  }

  .cl-embed-frame.trello {
    background: #026aa7;
  }

  .cl-embed-frame.loom {
    background: #fff3f0;
  }
</style>
