<script>
	import { selfAssessments } from '$lib/mipg-new-data.js';

	let search = $state('');
	let statusFilter = $state('ALL');
	let dimensionFilter = $state('ALL');

	let filteredAssessments = $derived(
		selfAssessments.filter((item) => {
			const term = search.trim().toLowerCase();
			const matchesSearch = !term || `${item.name} ${item.dimension}`.toLowerCase().includes(term);
			const matchesStatus = statusFilter === 'ALL' || item.status === statusFilter;
			const matchesDimension = dimensionFilter === 'ALL' || item.dimension === dimensionFilter;
			return matchesSearch && matchesStatus && matchesDimension;
		})
	);

	const dimensions = [...new Set(selfAssessments.map((item) => item.dimension))];
	const statuses = ['En curso', 'Pendiente', 'Completado'];
</script>

<svelte:head><title>Autodiagnósticos | MIPG Nuevo</title></svelte:head>

<main class="px-4 py-8 sm:px-6 lg:px-10">
	<div class="mx-auto max-w-7xl space-y-6">
		<section class="glass-3 rounded-2xl p-6 sm:p-8">
			<p class="text-primary text-xs font-bold uppercase tracking-[0.2em]">MIPG</p>
			<h1 class="mt-2 text-3xl font-bold text-gray-900">Autodiagnósticos</h1>
			<p class="mt-2 max-w-2xl text-sm leading-6 text-gray-600">
				Evalúa el estado de implementación de las políticas de MIPG.
			</p>
			<div class="mt-5 grid gap-3 lg:grid-cols-[minmax(0,1fr)_14rem_14rem]">
				<input
					bind:value={search}
					class="focus:border-primary focus:ring-primary/25 block w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2"
					placeholder="Buscar instrumento..."
					aria-label="Buscar instrumentos"
				/>
				<select
					bind:value={dimensionFilter}
					class="focus:border-primary focus:ring-primary/25 block w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2"
					aria-label="Filtrar por dimensión"
					><option value="ALL">Todas las dimensiones</option
					>{#each dimensions as dimension (dimension)}<option value={dimension}>{dimension}</option
						>{/each}</select
				>
				<select
					bind:value={statusFilter}
					class="focus:border-primary focus:ring-primary/25 block w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2"
					aria-label="Filtrar por estado"
					><option value="ALL">Todos los estados</option>{#each statuses as status (status)}<option
							value={status}>{status}</option
						>{/each}</select
				>
			</div>
		</section>

		<section class="glass-3 overflow-x-auto rounded-xl p-3 sm:p-4">
			<table
				class="w-full min-w-[900px] border-collapse text-sm [&_tbody_tr:hover]:bg-white/45 [&_tbody_tr]:border-t [&_tbody_tr]:border-gray-200/70 [&_td]:px-4 [&_td]:py-4 [&_th]:px-4 [&_th]:py-3"
			>
				<thead
					><tr class="text-left text-xs uppercase tracking-wide text-gray-500"
						><th>Instrumento</th><th>Dimensión</th><th>Estado</th><th>Avance</th><th
							>Última actualización</th
						><th class="text-right">Acción</th></tr
					></thead
				>
				<tbody>
					{#if filteredAssessments.length === 0}<tr
							><td colspan="6" class="py-12 text-center text-gray-500"
								>No hay instrumentos que coincidan con los filtros.</td
							></tr
						>
					{:else}{#each filteredAssessments as item (item.name)}<tr
								><td
									><strong class="block text-gray-900">{item.name}</strong><span
										class="text-xs text-gray-500">Instrumento de autodiagnóstico</span
									></td
								><td class="text-gray-600">{item.dimension}</td><td
									><span
										class="rounded-full px-2 py-1 text-xs font-semibold"
										class:bg-emerald-100={item.status === 'Completado'}
										class:text-emerald-700={item.status === 'Completado'}
										class:bg-blue-100={item.status === 'En curso'}
										class:text-blue-700={item.status === 'En curso'}
										class:bg-amber-100={item.status === 'Pendiente'}
										class:text-amber-700={item.status === 'Pendiente'}>{item.status}</span
									></td
								><td
									><div class="flex items-center gap-2">
										<div class="h-2 w-24 rounded-full bg-gray-200">
											<div
												class="h-2 rounded-full bg-emerald-500"
												style={`width: ${item.progress}%`}
											></div>
										</div>
										<span class="text-xs text-gray-500">{item.progress}%</span>
									</div></td
								><td class="text-gray-500">{item.updated}</td><td class="text-right"
									><button type="button" class="text-primary text-xs font-semibold hover:underline"
										>{item.progress === 100 ? 'Ver resultados' : 'Continuar'}</button
									></td
								></tr
							>{/each}{/if}
				</tbody>
			</table>
		</section>
	</div>
</main>
