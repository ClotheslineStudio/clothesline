<script lang="ts">
  export let icon;
  export let size: number = 24;

  const handleSelect = () => {
    dispatch("select");
  };


	function dispatch(arg0: string) {
		throw new Error("Function not implemented.");
	}
</script>

<div
  tabindex="0"
  role="button"
  on:click={handleSelect}
  on:keydown={(e) => e.key === 'Enter' && handleSelect()}
  class="
    group
    p-4 
    rounded-lg 
    border 
    border-(--color-surface-300)
    bg-(--color-surface-100)
    hover:bg-(--color-surface-200)
    dark:hover:bg-(--color-surface-700)
    cursor-pointer 
    transition 
    flex 
    items-center 
    justify-center
  "
>
  <icon.component 
    size={size} 
    class="text-(--color-surface-900) dark:text-(--color-surface-50)"
  />

  <!-- optional: icon name on hover -->
  <div
    class="
      absolute 
      opacity-0 
      group-hover:opacity-100 
      text-xs 
      mt-2 
      text-center 
      transition-opacity 
      text-(--color-surface-600)
    "
  >
    {icon.name}
  </div>
</div>

<style>
  div[role="button"]:focus {
    outline: var(--focus-ring, 2px solid var(--color-primary-500));
    outline-offset: 2px;
  }
</style>
