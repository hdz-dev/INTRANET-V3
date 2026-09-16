<script>
	import { actionPlans } from '$lib/mipg-new-data.js';
	import DrawerBase from '../components/DrawerBase.svelte';

	let search = $state('');
	let statusFilter = $state('ALL');
	let selectedPlan = $state(null);
	let drawerOpen = $state(false);

	let filteredPlans = $derived(
		actionPlans.filter((plan) => {
			const term = search.trim().toLowerCase();
			const matchesSearch =
				!term || `${plan.title} ${plan.process} ${plan.owner}`.toLowerCase().includes(term);
			return matchesSearch && (statusFilter === 'ALL' || plan.status === statusFilter);
		})
	);

	const statuses = ['En curso', 'Pendiente', 'Completado'];
	const completedPlans = actionPlans.filter((plan) => plan.status === 'Completado').length;
	const activePlans = actionPlans.filter((plan) => plan.status !== 'Completado').length;
</script>

<svelte:head><title>Planes de acción | MIPG Nuevo</title></svelte:head>

<main class="px-4 py-8 sm:px-6 lg:px-10">
	<div class="mx-auto max-w-7xl space-y-6">
		<section class="glass-3 rounded-2xl p-6 sm:p-8">
			<p class="text-primary text-xs font-bold uppercase tracking-[0.2em]">MIPG</p>
			<h1 class="mt-2 text-3xl font-bold text-gray-900">Planes de acción</h1>
			<p class="mt-2 max-w-2xl text-sm leading-6 text-gray-600">
				Organiza las acciones de mejora, responsables, fechas objetivo y avance institucional.
			</p>
			<div class="mt-6 grid gap-3 sm:grid-cols-3">
				<div class="rounded-xl border border-blue-100 bg-blue-50/70 p-4">
					<p class="text-xs font-semibold uppercase tracking-wide text-blue-700">Planes activos</p>
					<p class="mt-2 text-2xl font-bold text-gray-900">{activePlans}</p>
				</div>
				<div class="rounded-xl border border-emerald-100 bg-emerald-50/70 p-4">
					<p class="text-xs font-semibold uppercase tracking-wide text-emerald-700">Completados</p>
					<p class="mt-2 text-2xl font-bold text-gray-900">{completedPlans}</p>
				</div>
				<div class="rounded-xl border border-orange-100 bg-orange-50/70 p-4">
					<p class="text-xs font-semibold uppercase tracking-wide text-orange-700">
						Avance promedio
					</p>
					<p class="mt-2 text-2xl font-bold text-gray-900">
						{Math.round(
							actionPlans.reduce((total, plan) => total + plan.progress, 0) / actionPlans.length
						)}%
					</p>
				</div>
			</div>
		</section>

		<section class="glass-3 rounded-xl p-6">
			<div class="grid gap-3 lg:grid-cols-[minmax(0,1fr)_14rem]">
				<input
					bind:value={search}
					class="focus:border-primary focus:ring-primary/25 block w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2"
					placeholder="Buscar plan, proceso o responsable..."
					aria-label="Buscar planes de acción"
				/>
				<select
					bind:value={statusFilter}
					class="focus:border-primary focus:ring-primary/25 block w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2"
					aria-label="Filtrar planes por estado"
					><option value="ALL">Todos los estados</option>{#each statuses as status (status)}<option
							value={status}>{status}</option
						>{/each}</select
				>
			</div>
		</section>

		<section class="glass-3 overflow-x-auto rounded-xl p-3 sm:p-4">
			<table
				class="w-full min-w-[820px] border-collapse text-sm [&_tbody_tr:hover]:bg-white/45 [&_tbody_tr]:border-t [&_tbody_tr]:border-gray-200/70 [&_td]:px-4 [&_td]:py-4 [&_th]:px-4 [&_th]:py-3"
			>
				<thead
					><tr class="text-left text-xs uppercase tracking-wide text-gray-500"
						><th>Plan de acción</th><th>Responsable</th><th>Estado</th><th>Avance</th><th
							>Fecha objetivo</th
						><th class="text-right">Acción</th></tr
					></thead
				>
				<tbody>
					{#if filteredPlans.length === 0}<tr
							><td colspan="6" class="py-12 text-center text-gray-500"
								>No hay planes que coincidan con los filtros.</td
							></tr
						>
					{:else}{#each filteredPlans as plan (plan.title)}<tr
								><td
									><strong class="block text-gray-900">{plan.title}</strong><span
										class="text-xs text-gray-500">{plan.process}</span
									></td
								><td class="text-gray-600">{plan.owner}</td><td
									><span
										class="rounded-full px-2 py-1 text-xs font-semibold"
										class:bg-emerald-100={plan.status === 'Completado'}
										class:text-emerald-700={plan.status === 'Completado'}
										class:bg-blue-100={plan.status === 'En curso'}
										class:text-blue-700={plan.status === 'En curso'}
										class:bg-amber-100={plan.status === 'Pendiente'}
										class:text-amber-700={plan.status === 'Pendiente'}>{plan.status}</span
									></td
								><td
									><div class="flex items-center gap-2">
										<div class="h-2 w-24 rounded-full bg-gray-200">
											<div
												class="h-2 rounded-full bg-emerald-500"
												style={`width: ${plan.progress}%`}
											></div>
										</div>
										<span class="text-xs text-gray-500">{plan.progress}%</span>
									</div></td
								><td class="text-gray-500">{plan.due}</td><td class="text-right"
									><button
										type="button"
										class="text-primary focus-visible:ring-primary text-xs font-semibold hover:underline focus-visible:outline-none focus-visible:ring-2"
										onclick={() => {
											selectedPlan = plan;
											drawerOpen = true;
										}}>Ver detalle</button
									></td
								></tr
							>{/each}{/if}
				</tbody>
			</table>
		</section>
	</div>
</main>

<DrawerBase bind:open={drawerOpen} title={selectedPlan?.title || 'Detalle del plan'}>
	{#if selectedPlan}
		<p class="text-xs font-semibold uppercase tracking-wide text-gray-500">Seguimiento de acción</p>
		<p class="mt-3 text-sm leading-6 text-gray-600">
			Consulta el estado actual del plan y su fecha objetivo.
		</p>
		<dl class="mt-6 space-y-4 text-sm">
			<div>
				<dt class="text-xs text-gray-500">Proceso</dt>
				<dd class="mt-1 font-semibold text-gray-800">{selectedPlan.process}</dd>
			</div>
			<div>
				<dt class="text-xs text-gray-500">Responsable</dt>
				<dd class="mt-1 font-semibold text-gray-800">{selectedPlan.owner}</dd>
			</div>
			<div>
				<dt class="text-xs text-gray-500">Avance</dt>
				<dd class="mt-1 font-semibold text-emerald-700">
					{selectedPlan.progress}% · {selectedPlan.status}
				</dd>
			</div>
			<div>
				<dt class="text-xs text-gray-500">Fecha objetivo</dt>
				<dd class="mt-1 font-semibold text-gray-800">{selectedPlan.due}</dd>
			</div>
		</dl>
	{/if}
</DrawerBase>
