<script lang="ts">
  import Stepper from '$lib/components/navigation/Stepper/Stepper.svelte';

  let currentStep = 1;

  const steps = [
    { id: 'account', label: 'Account Info' },
    { id: 'profile', label: 'Profile Setup' },
    { id: 'security', label: 'Security Settings' },
    { id: 'confirm', label: 'Confirmation' }
  ];

  function handleStepClick(index: number) {
    currentStep = index;
  }
</script>

<section class="p-6 space-y-4">
  <h1 class="text-2xl font-bold">Stepper Demo</h1>
  <p>This is a stepper component for multi-step workflows.</p>

  <Stepper {steps} bind:currentStep onStepClick={handleStepClick} />

  <div class="mt-6 p-4 border rounded bg-surface-50">
    <h2 class="text-lg font-semibold">Current Step:</h2>
    <p><strong>{steps[currentStep].label}</strong></p>
  </div>
</section>
