<script>
	export let recentDocuments;

	// Categorías de documentación
	const categories = [
		{ id: 'all', label: 'Todos' },
		{ id: 'policies', label: 'Políticas y Normativas' },
		{ id: 'procedures', label: 'Procedimientos' },
		{ id: 'manuals', label: 'Manuales' },
		{ id: 'forms', label: 'Formularios' }
	];

	let selectedCategory = 'all';
</script>

<div class="space-y-6">
	<div class="flex flex-col space-y-2">
		<h1 class="text-2xl font-bold text-gray-800">Documentación Institucional</h1>
		<p class="text-gray-600">
			Accede a todos los documentos oficiales, políticas, procedimientos y manuales de la
			institución.
		</p>
	</div>

	<!-- Filtros y búsqueda -->
	<div class="flex flex-wrap items-center justify-between gap-4">
		<!-- Categorías -->
		<div class="flex flex-wrap gap-2">
			{#each categories as category (category.id)}
				<button
					class="rounded-full px-4 py-1 text-sm font-medium transition-colors {selectedCategory ===
					category.id
						? 'bg-primary text-white'
						: 'bg-gray-100 text-gray-600 hover:bg-gray-200'}"
					on:click={() => (selectedCategory = category.id)}
				>
					{category.label}
				</button>
			{/each}
		</div>

		<!-- Búsqueda -->
		<div class="relative">
			<input
				type="text"
				placeholder="Buscar documentos..."
				class="glass-3 rounded-full py-2 pr-4 pl-10 focus:ring-2 focus:ring-blue-500/50 focus:outline-none"
			/>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="absolute top-2.5 left-3 h-5 w-5 text-gray-400"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
				/>
			</svg>
		</div>
	</div>

	<!-- Lista de documentos -->
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
						>
							Título
						</th>
						<th
							scope="col"
							class="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
						>
							Tipo
						</th>
						<th
							scope="col"
							class="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
						>
							Fecha
						</th>
						<th
							scope="col"
							class="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
						>
							Autor
						</th>
						<th
							scope="col"
							class="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
						>
							Acciones
						</th>
					</tr>
				</thead>
				<tbody class="divide-y divide-gray-200/50 bg-white/20 backdrop-blur-sm">
					{#each recentDocuments as doc (doc.id)}
						<tr class="hover:bg-gray-50/50">
							<td class="px-6 py-4 text-sm font-medium whitespace-nowrap text-gray-800"
								>{doc.title}</td
							>
							<td class="px-6 py-4 whitespace-nowrap">
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
								<button class="text-primary hover:text-primary-dark">Descargar</button>
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	</div>

	<!-- Paginación -->
	<div
		class="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6"
	>
		<div class="flex flex-1 justify-between sm:hidden">
			<button
				class="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
			>
				Anterior
			</button>
			<button
				class="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
			>
				Siguiente
			</button>
		</div>
		<div class="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
			<div>
				<p class="text-sm text-gray-700">
					Mostrando <span class="font-medium">1</span> a <span class="font-medium">10</span> de
					<span class="font-medium">20</span> resultados
				</p>
			</div>
			<div>
				<nav class="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
					<button
						class="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-gray-300 ring-inset hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
					>
						<span class="sr-only">Anterior</span>
						<svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
							<path
								fill-rule="evenodd"
								d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
								clip-rule="evenodd"
							/>
						</svg>
					</button>
					<button
						class="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-gray-300 ring-inset hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
					>
						1
					</button>
					<button
						class="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-gray-300 ring-inset hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
					>
						<span class="sr-only">Siguiente</span>
						<svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
							<path
								fill-rule="evenodd"
								d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
								clip-rule="evenodd"
							/>
						</svg>
					</button>
				</nav>
			</div>
		</div>
	</div>
</div>
