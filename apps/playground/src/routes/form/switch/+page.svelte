<script lang="ts">
  import Switch from '$lib/components/form/Switch/Switch.svelte';

  let darkMode = false;

  function handleSwitchChange(val: boolean) {
    console.log('Dark Mode toggled:', val);
  }
</script>

<h1 class="text-2xl font-bold mb-4">Switch Component</h1>

<div class="space-y-6">

  <!-- Basic switch -->
  <div>
    <Switch
      id="darkMode"
      bind:checked={darkMode}
      label="Enable Dark Mode"
      onChange={handleSwitchChange}
    />
    <p class="text-sm text-muted-foreground mt-1">
      Dark Mode: {darkMode ? 'On' : 'Off'}
    </p>
  </div>

  <!-- Disabled switch -->
  <div>
    <Switch id="notifications" checked={true} disabled={true} label="Notifications" />
  </div>

</div>
