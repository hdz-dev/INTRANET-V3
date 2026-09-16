<script>
	import RiskLabBadge from '../components/RiskLabBadge.svelte';
	import { riskLabMatrices } from '$lib/risk-lab-data.js';

	let query = $state('');
	let status = $state('Todas');
	let filtered = $derived(
		riskLabMatrices.filter(
			(matrix) =>
				`${matrix.process} ${matrix.owner}`.toLowerCase().includes(query.toLowerCase()) &&
				(status === 'Todas' || matrix.status === status)
		)
	);
</script>

<svelte:head><title>Matrices | Riesgos Lab</title></svelte:head>
<main class="px-4 py-8 sm:px-6 lg:px-10">
	<div class="mx-auto max-w-7xl space-y-6">
		<section class="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
			<div>
				<p class="text-xs font-bold uppercase tracking-[0.18em] text-blue-700">Espacio de matriz</p>
				<h1 class="mt-2 text-3xl font-bold tracking-tight text-slate-950">Matrices por proceso</h1>
				<p class="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
					Cada matriz reúne una vigencia, una versión y un flujo de trabajo. La consolidada se
					calcula desde estas fuentes.
				</p>
			</div>
			<a
				href="/mipg-nuevo/gestion-riesgos/matrices/nueva"
				class="rounded-xl bg-blue-700 px-4 py-2.5 text-center text-sm font-semibold text-white hover:bg-blue-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
				>Nueva matriz</a
			>
		</section>
		<section class="glass-3 rounded-2xl p-4">
			<div class="grid gap-3 md:grid-cols-[1fr_180px]">
				<label class="text-sm font-semibold text-slate-700"
					>Buscar matriz<input
						bind:value={query}
						placeholder="Proceso o responsable"
						class="mt-2 w-full rounded-xl border border-slate-200 bg-white/80 px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
					/></label
				><label class="text-sm font-semibold text-slate-700"
					>Estado<select
						bind:value={status}
						class="mt-2 w-full rounded-xl border border-slate-200 bg-white/80 px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
						><option>Todas</option><option>En elaboración</option><option>En revisión</option
						><option>Publicada</option></select
					></label
				>
			</div>
		</section>
		<section class="grid gap-4 lg:grid-cols-3">
			{#each filtered as matrix (matrix.id)}<a
					href={`/mipg-nuevo/gestion-riesgos/matrices/${matrix.id}`}
					class="glass-3 rounded-2xl p-5 transition hover:-translate-y-0.5 hover:shadow-lg"
					><div class="flex items-start justify-between gap-3">
						<span class="text-xs font-bold uppercase tracking-wider text-slate-400"
							>{matrix.processCode} · {matrix.validity}</span
						><RiskLabBadge
							tone={matrix.status === 'Publicada'
								? 'green'
								: matrix.status === 'En revisión'
									? 'orange'
									: 'blue'}>{matrix.status}</RiskLabBadge
						>
					</div>
					<h2 class="mt-5 text-lg font-bold text-slate-950">{matrix.process}</h2>
					<p class="mt-2 text-sm text-slate-600">Responsable: {matrix.owner}</p>
					<div class="mt-5 flex items-end justify-between text-xs text-slate-500">
						<span>{matrix.riskCount} riesgos · {matrix.version}</span><strong class="text-slate-800"
							>{matrix.progress}% completo</strong
						>
					</div>
					<div class="mt-2 h-2 rounded-full bg-slate-100">
						<div class="h-2 rounded-full bg-blue-600" style={`width:${matrix.progress}%`}></div>
					</div>
					<p class="mt-4 text-xs text-slate-400">Actualizada {matrix.updated}</p></a
				>{/each}
		</section>
		{#if filtered.length === 0}<div class="glass-3 rounded-2xl p-10 text-center">
				<h2 class="text-lg font-bold text-slate-900">No hay matrices con estos filtros</h2>
				<p class="mt-2 text-sm text-slate-500">Prueba otra búsqueda o cambia el estado.</p>
			</div>{/if}
	</div>
</main>
