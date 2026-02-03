
<script lang="ts">
	import SkillBadge from './SkillBadge.svelte';
	export let id: string = '';
	export let label: string = '';
	export let iconSrc: string = '';
	export let alt: string = '';
	export let stack: string = '';
	export let band: 'Core' | 'Active' | 'Familiar' | 'Occasional' | 'Legacy' = 'Familiar';
	export let lastUsed: string = '';
	export let context: string = '';
	export let proof: any = [];
	export let useCases: any = [];
</script>

<SkillBadge
	{id}
	{label}
	{iconSrc}
	{alt}
	{stack}
	{band}
	{lastUsed}
	{context}
	{proof}
	{useCases}
/>
