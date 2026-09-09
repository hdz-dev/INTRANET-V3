<script>
	import { createEventDispatcher } from 'svelte';
	export let label = '';
	export let value;

	const dispatch = createEventDispatcher();
	function handleInput() {
		value = value.toUpperCase();
		console.log(value, label);
		dispatch('clickEvent', value);
	}
	export let type;
	function typeAction(node) {
		node.type = type;
	}
</script>

<div class="">
	<label for="number" class="text-secondary block font-medium">{label}</label>
	<input
		id={label}
		name={label}
		use:typeAction
		bind:value
		on:input={handleInput}
		class=" text-secondary focus:border-primary focus:ring-primary h-12 w-52 rounded-2xl bg-gray-100 px-4 focus:outline-none sm:text-sm"
	/>
</div>
