<script>
	export let label = '';
	export let value;
	export let placeholder;

	let showPassword = false;

	function togglePassword() {
		showPassword = !showPassword;
		if (showPassword) {
			document.getElementById('password').type = 'text';
		} else {
			document.getElementById('password').type = 'password';
		}
	}
</script>

<!-- type={showPassword ? "text" : "password"} -->
<div class="relative mb-6 px-2">
	<label for="password" class="text-secondary block font-medium">{label}</label>
	<input
		{placeholder}
		id="password"
		name={label}
		type="password"
		bind:value
		class="text-secondary focus:border-primary focus:ring-primary mt-1 block w-full rounded-xl border border-gray-300 bg-white py-2 pl-3 shadow-sm focus:outline-none sm:text-sm"
	/>
	<button on:click={togglePassword} class="absolute inset-y-0 right-0 flex items-center pt-8 pr-4">
		{#if !showPassword}
			<img src="eye-close.svg" alt="" class="w-9" />
		{:else}
			<img src="eye-open.svg" alt="" class="w-9" />
		{/if}
	</button>
</div>
