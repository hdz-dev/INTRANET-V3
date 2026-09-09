<script>
	import { createEventDispatcher } from 'svelte';
	export let label = '';
	export let value;
	export let disabled = false;
	export let upercase = false;
	export let placeholder = '';
	export let autocomplete = 'off';
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

<div class="mb-6 px-2">
	<label for="number" class="text-secondary block font-medium">{label}</label>
	<input
		{placeholder}
		{autocomplete}
		{disabled}
		id={label}
		name={label}
		use:typeAction
		bind:value
		on:input={upercase ? handleInput : null}
		class="text-secondary focus:border-primary focus:ring-primary mt-1 block w-full rounded-xl border border-gray-300 bg-white py-2 pl-3 shadow-sm focus:outline-none sm:text-sm"
	/>
</div>
