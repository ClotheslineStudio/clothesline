<script lang="ts">
  export let steps: { id: string; label: string }[] = [];
  export let currentStep = 0;
  export let onStepClick: (index: number) => void = () => {};

  function handleClick(index: number) {
    if (index <= currentStep) onStepClick(index);
  }
</script>

<ol class="cl-stepper" role="list">
  {#each steps as step, i}
    <li role="listitem" aria-current={i === currentStep ? 'step' : undefined}>
      <button
        type="button"
        class="cl-step {i < currentStep ? 'complete' : ''} {i === currentStep ? 'active' : ''}"
        on:click={() => handleClick(i)}
        tabindex="0"
        aria-disabled={i > currentStep}
      >
        <span class="step-index">{i + 1}</span>
        <span class="step-label">{step.label}</span>
      </button>
    </li>
  {/each}
</ol>

<style>
  .cl-stepper {
    display: flex;
    gap: var(--spacing-4, 1rem);
    padding: 1rem 0;
    counter-reset: step;
  }

  .cl-step {
    display: flex;
    align-items: center;
    gap: var(--spacing-2, 0.5rem);
    padding: 0.5rem 1rem;
    border-radius: var(--radius-sm, 0.25rem);
    background: var(--color-surface-50, #f9fafb);
    color: var(--color-primary-700, #1d4ed8);
    font-weight: 500;
    cursor: pointer;
    transition: background 0.2s ease;
  }

  .cl-step:hover {
    background: var(--color-surface-100, #f3f4f6);
  }

  .cl-step.complete {
    background: var(--color-success-100, #dcfce7);
    color: var(--color-success-800, #065f46);
  }

  .cl-step.active {
    background: var(--color-primary-100, #dbeafe);
    font-weight: 600;
  }

  .step-index {
    background: var(--color-primary-200, #bfdbfe);
    color: var(--color-primary-900, #1e3a8a);
    border-radius: 50%;
    width: 1.5rem;
    height: 1.5rem;
    display: grid;
    place-items: center;
    font-size: 0.75rem;
    font-weight: bold;
  }
</style>
