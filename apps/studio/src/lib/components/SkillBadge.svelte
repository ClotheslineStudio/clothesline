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
</script>

<button
  type="button"
  class="flex items-center gap-2 px-3 py-1 rounded-full border border-(--color-indigo)
         text-xs md:text-sm text-(--color-text) bg-(--color-surface-100)
         hover:scale-105 hover:bg-(--color-surface-200) transition shadow-sm"
  on:click={handleClick}
>
  {#if icon}
    <span class="w-4 h-4" aria-hidden="true">
      {@html icon}
    </span>
  {/if}
  <span>{label}</span>
</button>


  