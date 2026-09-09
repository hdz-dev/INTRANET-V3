<script>
	export let posts;
</script>

<section>
	<h2 class="mb-4 text-xl font-semibold text-gray-800">Ultimas Publicaciones</h2>
	<div class="grid grid-cols-1 gap-6 md:grid-cols-3">
		{#each posts as news (news.id)}
			<div class="glass-3 overflow-hidden rounded-xl">
				<img
					src={news.image || '/placeholder.svg'}
					alt={news.title}
					class="h-60 w-full object-cover"
				/>
				<div class="p-4">
					<p class="mb-1 text-sm text-blue-600">
						{new Date(news.date).toLocaleDateString('es-ES', {
							year: 'numeric',
							month: 'long',
							day: 'numeric'
						})}
					</p>
					<h3 class="mb-2 font-medium text-gray-800">{news.title}</h3>
					<button class="text-sm text-blue-600 hover:text-blue-800">Leer más...</button>
				</div>
			</div>
		{/each}
	</div>
</section>
