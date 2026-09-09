<script>
	export let latestNews;
	export let formatDate;
</script>

<!-- Noticias y comunicados -->

<h2 class="mb-4 text-xl font-semibold text-gray-800">Noticias y Comunicados</h2>
<div class="space-y-4">
	{#each latestNews as news (news.id)}
		<div
			class="glass-3 h-80 overflow-hidden rounded-xl border border-gray-200/50 shadow-sm transition-shadow hover:shadow-md"
		>
			<div class="md:flex">
				<img
					src={news.image || '/placeholder.svg'}
					alt={news.title}
					class="h-80 w-1/3 object-cover"
				/>

				<div class="ml-auto w-2/3 p-12">
					<div class="mb-6 flex items-center">
						<span
							class={`rounded-full px-2 py-1 text-xs font-semibold ${news.priority === 'high' ? 'bg-red-100 text-red-800' : news.priority === 'medium' ? 'bg-amber-100 text-amber-800' : 'bg-blue-100 text-blue-800'}`}
						>
							{news.priority === 'high'
								? 'Importante'
								: news.priority === 'medium'
									? 'Destacado'
									: 'Informativo'}
						</span>
						<span class="ml-2 text-sm text-gray-500">{formatDate(news.date)}</span>
					</div>
					<h3 class="mb-6 text-lg font-semibold text-gray-800">{news.title}</h3>
					<p class="mb-4 text-gray-600">{news.summary}</p>
					<button class="text-sm font-medium text-blue-600 hover:text-blue-800">Leer más...</button>
				</div>
			</div>
		</div>
	{/each}
	<div class="text-center">
		<button class="text-sm font-medium text-blue-600 hover:text-blue-800"
			>Ver todas las noticias →</button
		>
	</div>
</div>
