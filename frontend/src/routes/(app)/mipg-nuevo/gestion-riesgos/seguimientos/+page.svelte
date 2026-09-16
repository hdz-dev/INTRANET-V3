<script>
	import RiskLabBadge from '../components/RiskLabBadge.svelte';
	import { riskLabRisks } from '$lib/risk-lab-data.js';

	let filter = $state('Todos');
	let risks = $derived(riskLabRisks.filter((risk) => filter === 'Todos' || risk.status === filter));
</script>

<svelte:head><title>Seguimientos | Riesgos Lab</title></svelte:head>
<main class="px-4 py-8 sm:px-6 lg:px-10">
	<div class="mx-auto max-w-7xl space-y-6">
		<section class="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
			<div>
				<p class="text-xs font-bold uppercase tracking-[0.18em] text-blue-700">Bandeja unificada</p>
				<h1 class="mt-2 text-3xl font-bold tracking-tight text-slate-950">
					Seguimientos y acciones
				</h1>
				<p class="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
					Una vista para atender revisiones, vencimientos, observaciones y materializaciones sin
					navegar por cada matriz.
				</p>
			</div>
			<button
				type="button"
				class="rounded-xl bg-blue-700 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-800"
				>Registrar seguimiento</button
			>
		</section>
		<section class="grid gap-3 sm:grid-cols-3">
			<div class="rounded-2xl border border-red-100 bg-red-50 p-5">
				<p class="text-xs font-bold uppercase tracking-wider text-red-700">Vencen hoy</p>
				<p class="mt-2 text-3xl font-bold text-red-950">2</p>
				<p class="mt-1 text-xs text-red-800">requieren atención</p>
			</div>
			<div class="rounded-2xl border border-orange-100 bg-orange-50 p-5">
				<p class="text-xs font-bold uppercase tracking-wider text-orange-700">Observaciones</p>
				<p class="mt-2 text-3xl font-bold text-orange-950">3</p>
				<p class="mt-1 text-xs text-orange-800">2 por responder</p>
			</div>
			<div class="rounded-2xl border border-blue-100 bg-blue-50 p-5">
				<p class="text-xs font-bold uppercase tracking-wider text-blue-700">Próximos 7 días</p>
				<p class="mt-2 text-3xl font-bold text-blue-950">8</p>
				<p class="mt-1 text-xs text-blue-800">acciones planificadas</p>
			</div>
		</section>
		<section class="glass-3 overflow-hidden rounded-2xl">
			<div class="flex flex-wrap items-center gap-2 border-b border-slate-200/70 p-4">
				<span class="mr-2 text-sm font-bold text-slate-800">Mostrar:</span
				>{#each ['Todos', 'En elaboración', 'En revisión', 'Listo para revisión'] as item (item)}<button
						type="button"
						class={`rounded-lg px-3 py-2 text-xs font-semibold ${filter === item ? 'bg-blue-700 text-white' : 'bg-white text-slate-600 hover:bg-slate-50'}`}
						onclick={() => (filter = item)}>{item}</button
					>{/each}
			</div>
			<div class="divide-y divide-slate-100">
				{#each risks as risk (risk.id)}<article
						class="flex flex-col justify-between gap-4 p-5 md:flex-row md:items-center"
					>
						<div class="flex min-w-0 gap-4">
							<div
								class="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-sm font-bold text-blue-700"
							>
								{risk.controls}
							</div>
							<div class="min-w-0">
								<p class="font-bold text-slate-900">{risk.code}</p>
								<p class="mt-1 max-w-2xl text-sm text-slate-600">{risk.description}</p>
								<div class="mt-2 flex flex-wrap gap-2">
									<RiskLabBadge tone="blue">{risk.typology}</RiskLabBadge><span
										class="text-xs text-slate-500">{risk.process}</span
									>
								</div>
							</div>
						</div>
						<div class="flex shrink-0 items-center gap-3">
							<div class="text-right">
								<p class="text-xs font-semibold text-slate-500">Próximo corte</p>
								<p class="mt-1 text-sm font-bold text-slate-800">30 sep 2026</p>
							</div>
							<a
								href={`/mipg-nuevo/gestion-riesgos/matrices/matriz-2026-tic/riesgos/${risk.id}`}
								class="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-blue-700 hover:bg-blue-50"
								>Abrir</a
							>
						</div>
					</article>{/each}
			</div>
		</section>
	</div>
</main>
