<script lang="ts">
  import { Field, Textarea } from '@clothesline/ui';
</script>

<Field
  label="Project Summary"
  forId="summary"
  hint="Short summaries work best in documentation."
>
  <Textarea id="summary" rows={4} placeholder="Summarize what this component solves..." />
</Field>
