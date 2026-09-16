<script>
	import { mipgDimensions } from '$lib/mipg-new-data.js';

	let search = $state('');
	let progressFilter = $state('ALL');

	let filteredDimensions = $derived(
		mipgDimensions.filter((dimension) => {
			const term = search.trim().toLowerCase();
			const matchesSearch =
				!term || `${dimension.name} ${dimension.code}`.toLowerCase().includes(term);
			const matchesProgress =
				progressFilter === 'ALL' ||
				(progressFilter === 'HIGH' && dimension.progress >= 75) ||
				(progressFilter === 'MEDIUM' && dimension.progress >= 60 && dimension.progress < 75) ||
				(progressFilter === 'LOW' && dimension.progress < 60);
			return matchesSearch && matchesProgress;
		})
	);

	const averageProgress = Math.round(
		mipgDimensions.reduce((total, dimension) => total + dimension.progress, 0) /
			mipgDimensions.length
	);
	const totalPolicies = mipgDimensions.reduce((total, dimension) => total + dimension.policies, 0);
	const totalInstruments = mipgDimensions.reduce(
		(total, dimension) => total + dimension.instruments,
		0
	);
	const totalPending = mipgDimensions.reduce((total, dimension) => total + dimension.pending, 0);
</script>

<svelte:head><title>Dimensiones | MIPG Nuevo</title></svelte:head>

<main class="px-4 py-8 sm:px-6 lg:px-10">
	<div class="mx-auto max-w-7xl space-y-6">
		<section class="glass-3 rounded-2xl p-6 sm:p-8">
			<p class="text-primary text-xs font-bold uppercase tracking-[0.2em]">MIPG</p>
			<h1 class="mt-2 text-3xl font-bold text-gray-900">Dimensiones</h1>
			<p class="mt-2 max-w-2xl text-sm leading-6 text-gray-600">
				Consulta el avance institucional y las políticas asociadas a cada dimensión del modelo.
			</p>
			<div class="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
				<div class="rounded-xl border border-blue-100 bg-blue-50/70 p-4">
					<p class="text-xs font-semibold uppercase tracking-wide text-blue-700">Avance promedio</p>
					<p class="mt-2 text-2xl font-bold text-gray-900">{averageProgress}%</p>
				</div>
				<div class="rounded-xl border border-emerald-100 bg-emerald-50/70 p-4">
					<p class="text-xs font-semibold uppercase tracking-wide text-emerald-700">
						Políticas asociadas
					</p>
					<p class="mt-2 text-2xl font-bold text-gray-900">{totalPolicies}</p>
				</div>
				<div class="rounded-xl border border-violet-100 bg-violet-50/70 p-4">
					<p class="text-xs font-semibold uppercase tracking-wide text-violet-700">Instrumentos</p>
					<p class="mt-2 text-2xl font-bold text-gray-900">{totalInstruments}</p>
				</div>
				<div class="rounded-xl border border-amber-100 bg-amber-50/70 p-4">
					<p class="text-xs font-semibold uppercase tracking-wide text-amber-700">Pendientes</p>
					<p class="mt-2 text-2xl font-bold text-gray-900">{totalPending}</p>
				</div>
			</div>
		</section>

		<section class="glass-3 rounded-xl p-6">
			<div class="grid gap-3 lg:grid-cols-[minmax(0,1fr)_14rem]">
				<input
					bind:value={search}
					class="focus:border-primary focus:ring-primary/25 block w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2"
					placeholder="Buscar dimensión..."
					aria-label="Buscar dimensión"
				/>
				<select
					bind:value={progressFilter}
					class="focus:border-primary focus:ring-primary/25 block w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2"
					aria-label="Filtrar por avance"
				>
					<option value="ALL">Todo el avance</option>
					<option value="HIGH">75% o más</option>
					<option value="MEDIUM">60% a 74%</option>
					<option value="LOW">Menos de 60%</option>
				</select>
			</div>
		</section>

		<section class="grid gap-4 md:grid-cols-2 xl:grid-cols-3" aria-label="Listado de dimensiones">
			{#if filteredDimensions.length === 0}
				<div
					class="glass-3 rounded-xl p-10 text-center text-sm text-gray-500 md:col-span-2 xl:col-span-3"
				>
					No hay dimensiones que coincidan con los filtros.
				</div>
			{:else}
				{#each filteredDimensions as dimension (dimension.id)}
					<article class="glass-3 rounded-xl p-5">
						<div class="flex items-center justify-between gap-3">
							<span class="rounded-lg bg-gray-100 px-2 py-1 text-xs font-bold text-gray-600"
								>{dimension.code}</span
							>
							<span class="text-sm font-bold text-gray-900">{dimension.progress}%</span>
						</div>
						<h2 class="mt-5 text-lg font-semibold text-gray-900">{dimension.name}</h2>
						<div
							class="mt-4 h-2 rounded-full bg-gray-200"
							aria-label={`Avance ${dimension.progress}%`}
						>
							<div
								class="h-2 rounded-full bg-emerald-500"
								style={`width: ${dimension.progress}%`}
							></div>
						</div>
						<div class="mt-4 flex items-center justify-between text-xs text-gray-500">
							<span>{dimension.policies} políticas asociadas</span>
							<span>{dimension.progress >= 75 ? 'En meta' : 'En seguimiento'}</span>
						</div>
						<div
							class="mt-3 grid grid-cols-2 gap-2 border-t border-gray-200/70 pt-3 text-xs text-gray-500"
						>
							<span>{dimension.instruments} instrumentos</span>
							<span class="text-right">{dimension.pending} pendientes</span>
						</div>
					</article>
				{/each}
			{/if}
		</section>
	</div>
</main>
