<script lang="ts">
  export let label: string;
  export let title: string | undefined;
  export let href: string | undefined;
  export let align: 'top' | 'bottom' | 'left' | 'right' = 'bottom';

  let open = false;
  const id = `tooltip-${Math.random().toString(36).slice(2)}`;

  const show = () => (open = true);
  const hide = () => (open = false);

  const toggle = () => (open = !open);

  const onKeydown = (event: KeyboardEvent) => {
    if (event.key === 'Escape') hide();
  };
</script>

<span class="relative inline-flex">
  <!-- Trigger -->
  <button
    type="button"
    class="inline-flex items-center gap-1 rounded px-0.5 py-0.5 text-(--color-primary-700) underline decoration-dotted underline-offset-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-(--color-accent-500) focus-visible:ring-offset-2 focus-visible:ring-offset-(--color-bg)"
    aria-expanded={open}
    aria-describedby={open ? id : undefined}
    on:mouseenter={show}
    on:focus={show}
    on:click={toggle}
    on:keydown={onKeydown}
  >
    {label}
  </button>

  {#if open}
    <div
      id={id}
      role="tooltip"
      class="absolute z-60 w-72 rounded-xl border border-(--color-surface-700) bg-(--color-surface-900) px-3 py-3 text-left text-xs shadow-xl text-(--color-surface-50)
        [&_a]:underline [&_a]:underline-offset-2"
      on:mouseenter={show}
      on:mouseleave={hide}
      style={
        align === 'top'
          ? 'bottom: 100%; left: 50%; transform: translateX(-50%); margin-bottom: 0.5rem;'
        : align === 'bottom'
          ? 'top: 100%; left: 50%; transform: translateX(-50%); margin-top: 0.5rem;'
        : align === 'left'
          ? 'right: 100%; top: 50%; transform: translateY(-50%); margin-right: 0.5rem;'
        : 'left: 100%; top: 50%; transform: translateY(-50%); margin-left: 0.5rem;'
      }
    >
      {#if title}
        <div class="mb-1 text-[0.7rem] font-semibold uppercase tracking-wide text-(--color-surface-200)">
          {title}
        </div>
      {/if}

      <div class="text-[0.75rem] leading-snug text-(--color-surface-100)">
        <slot />
      </div>

      {#if href}
        <a
          href={href}
          target="_blank"
          rel="noreferrer"
          class="mt-2 inline-flex items-center text-[0.7rem] text-(--color-primary-300)"
        >
          Learn more →
        </a>
      {/if}
    </div>
  {/if}
</span>

