<script lang="ts">
  import { navigating } from '$app/stores';
</script>

{#if $navigating}
  <div class="loading" role="progressbar" aria-label="Loading"></div>
{/if}

<slot />

<style>
  .loading {
    position: fixed;
    top: 0;
    left: 0;
    height: 2px;
    width: 100%;
    z-index: 9999;

    background: rgba(120, 180, 255, 0.25);
    overflow: hidden;
  }

  .loading::before {
    content: "";
    position: absolute;
    inset: 0;
    width: 40%;
    background: rgba(120, 180, 255, 0.9);
    animation: sweep 1s ease-in-out infinite;
  }

  @keyframes sweep {
    0% { transform: translateX(-60%); }
    100% { transform: translateX(260%); }
  }
</style>
