<!-- SkillBadge.svelte -->
<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  export let skillId: string;
  export let icon: string = '';
  export let label: string;

  const dispatch = createEventDispatcher<{
    select: { skillId: string };
  }>();

  function handleClick() {
    dispatch('select', { skillId });
  }

  function handleMouseOver(event: MouseEvent) {
    const target = event.currentTarget as HTMLButtonElement;
    target.style.transform = 'scale(1.05)';
    target.style.background = 'var(--color-surface-200, #e5e7eb)';
  }

  function handleMouseOut(event: MouseEvent) {
    const target = event.currentTarget as HTMLButtonElement;
    target.style.transform = 'none';
    target.style.background = 'var(--color-surface-100, #f3f4f6)';
  }
</script>


<button
  type="button"
  style="
    display: flex;
    align-items: center;
    gap: var(--button-gap, var(--spacing-2));
    padding: var(--button-padding-y, var(--spacing-1)) var(--button-padding-x, var(--spacing-3));
    border-radius: var(--button-radius, var(--radius-full));
    border: var(--button-border, var(--default-border-width, 1px) solid var(--color-primary-500, #6366f1));
    font-size: var(--type-button-size, 0.875rem);
    font-family: var(--type-button-family, var(--base-font-family));
    font-weight: var(--type-button-weight, var(--base-font-weight));
    color: var(--button-text, var(--on-primary));
    background: var(--button-bg, var(--color-primary-50, #f3f4f6));
    box-shadow: var(--button-shadow, var(--elevation-1));
    transition: var(--button-transition, box-shadow 0.2s, background 0.2s, transform 0.2s);
    cursor: pointer;
  "
  on:click={handleClick}
  on:mouseover={(event: MouseEvent) => {
    const btn = event.currentTarget as HTMLButtonElement | null;
    if (btn) {
      btn.style.transform = 'scale(1.05)';
      btn.style.background = 'var(--button-bg-hover, var(--color-primary-100, #e0e7ff))';
    }
  }}
  on:mouseout={(event: MouseEvent) => {
    const btn = event.currentTarget as HTMLButtonElement | null;
    if (btn) {
      btn.style.transform = 'none';
      btn.style.background = 'var(--button-bg, var(--color-primary-50, #f3f4f6))';
    }
  }}
  on:focus={(event: FocusEvent) => {
    const btn = event.currentTarget as HTMLButtonElement | null;
    if (btn) {
      btn.style.transform = 'scale(1.05)';
      btn.style.background = 'var(--button-bg-hover, var(--color-primary-100, #e0e7ff))';
    }
  }}
  on:blur={(event: FocusEvent) => {
    const btn = event.currentTarget as HTMLButtonElement | null;
    if (btn) {
      btn.style.transform = 'none';
      btn.style.background = 'var(--button-bg, var(--color-primary-50, #f3f4f6))';
    }
  }}>
  {#if icon}
    <span style="width: 1rem; height: 1rem; display: inline-flex; align-items: center; justify-content: center;" aria-hidden="true">
      {@html icon}
    </span>
  {/if}
  <span>{label}</span>
</button>


  