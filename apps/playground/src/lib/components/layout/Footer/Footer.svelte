<script lang="ts">
  export let className = '';
</script>

<footer class="footer {className}">
  <div class="footer-left">
    <slot name="left" />
  </div>
  <div class="footer-center">
    <slot name="center" />
  </div>
  <div class="footer-right">
    <slot name="right" />
  </div>
</footer>

<style>
  .footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--gap-base, 1rem);
    padding: var(--spacing-4, 1rem);
    background-color: var(--background-panel, #f9f9f9);

    color: var(--base-font-color, #333);
    font-size: var(--font-size-sm, 0.875rem);
  }

  .footer-left,
  .footer-center,
  .footer-right {
    display: flex;
    align-items: center;
    gap: var(--gap-small, 0.5rem);
  }

  .footer-center {
    flex: 1;
    justify-content: center;
    text-align: center;
  }

  .footer-right {
    justify-content: flex-end;
  }

  @media (max-width: 640px) {
    .footer {
      flex-direction: column;
      align-items: stretch;
      text-align: center;
    }

    .footer-left,
    .footer-right {
      justify-content: center;
    }
  }
</style>
