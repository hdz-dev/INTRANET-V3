<script>
	export let publicaciones = [];
</script>

<div class="flex h-full flex-col gap-4 overflow-y-auto p-4">
	{#each publicaciones as publicacion, index (publicacion.id || index)}
		<div class="flex h-full items-center space-x-4 rounded-2xl bg-white">
			<div class="h-full w-1/3">
				<img
					src={publicacion.imagen}
					alt="Imagen de la publicación"
					class="h-full w-full rounded-l-2xl object-cover"
				/>
			</div>
			<div class=" h-full w-2/3 p-6">
				<p class="text-sm text-gray-500">{publicacion.fecha}</p>
				<h2 class="text-primary py-2 text-lg font-semibold">{publicacion.titulo}</h2>
				<p class="text-gray-700">{publicacion.parrafo}</p>
			</div>
		</div>
	{/each}
</div>

<style>
	::-webkit-scrollbar {
		display: none;
	}
</style>
