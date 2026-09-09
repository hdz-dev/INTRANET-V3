<script>
	export let quickAccess;
	export let navigateTo;
</script>

<section>
	<h2 class="mb-4 text-xl font-semibold text-gray-800">Accesos rápidos</h2>
	<div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
		{#each quickAccess as item (item.id)}
			<button
				class="glass-3 cursor-pointer rounded-xl p-6"
				on:click={() => navigateTo(item.path)}
				aria-label={item.title}
			>
				<div
					class="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100/80 text-blue-600"
				>
					<img class="h-6 w-6" src={item.icon} alt="" />
				</div>
				<h3 class="text-left font-medium text-gray-800">{item.title}</h3>
			</button>
		{/each}
	</div>
</section>
