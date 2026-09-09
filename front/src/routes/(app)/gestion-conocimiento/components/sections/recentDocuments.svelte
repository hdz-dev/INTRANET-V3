<script>
	export let recentDocuments;
</script>

<section>
	<div class="mb-4 flex items-center justify-between">
		<h2 class="text-xl font-semibold text-gray-800">Últimos documentos añadidos</h2>
		<button class="text-primary text-sm hover:text-blue-800">Ver todos →</button>
	</div>
	<div
		class="overflow-hidden rounded-xl border border-gray-200/50 bg-white/60 shadow-sm backdrop-blur-md"
	>
		<div class="overflow-x-auto">
			<table class="min-w-full divide-y divide-gray-200/50">
				<thead class="bg-gray-50/50">
					<tr>
						<th
							scope="col"
							class="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
							>Título</th
						>
						<th
							scope="col"
							class="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
							>Tipo</th
						>
						<th
							scope="col"
							class="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
							>Fecha</th
						>
						<th
							scope="col"
							class="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
							>Autor</th
						>
						<th
							scope="col"
							class="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
							>Acción</th
						>
					</tr>
				</thead>
				<tbody class="divide-y divide-gray-200/50 bg-white/20 backdrop-blur-sm">
					{#each recentDocuments as doc (doc.id)}
						<tr class="hover:bg-gray-50/50">
							<td class="px-6 py-4 text-sm font-medium whitespace-nowrap text-gray-800"
								>{doc.title}</td
							>
							<td class="px-6 py-4 text-sm whitespace-nowrap text-gray-500">
								<span
									class="inline-flex rounded-full bg-blue-100 px-2 text-xs leading-5 font-semibold text-blue-800"
								>
									{doc.type}
								</span>
							</td>
							<td class="px-6 py-4 text-sm whitespace-nowrap text-gray-500">
								{new Date(doc.date).toLocaleDateString('es-ES')}
							</td>
							<td class="px-6 py-4 text-sm whitespace-nowrap text-gray-500">{doc.author}</td>
							<td class="px-6 py-4 text-sm whitespace-nowrap">
								<button class="text-blue-600 hover:text-blue-800">Descargar</button>
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	</div>
</section>
