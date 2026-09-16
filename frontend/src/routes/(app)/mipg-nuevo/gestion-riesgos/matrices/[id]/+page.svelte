<script>
	import RiskLabBadge from '../../components/RiskLabBadge.svelte';
	import RiskLabZone from '../../components/RiskLabZone.svelte';
	import { riskLabRisks } from '$lib/risk-lab-data.js';

	let { data } = $props();
	let tab = $state('Riesgos');
	let selectedRisk = $state(null);
	let processRisks = $derived(riskLabRisks.filter((risk) => risk.process === data.matrix.process));
	const tabs = [
		'Panorama',
		'Riesgos',
		'Seguimientos',
		'Observaciones',
		'Materializaciones',
		'Historial'
	];
</script>

<svelte:head><title>{data.matrix.process} | Riesgos Lab</title></svelte:head>
<main class="px-4 py-8 sm:px-6 lg:px-10">
	<div class="mx-auto max-w-7xl space-y-6">
		<section class="glass-3 rounded-2xl p-6">
			<div class="flex flex-col justify-between gap-5 lg:flex-row lg:items-start">
				<div>
					<div class="flex flex-wrap items-center gap-2 text-xs font-semibold text-slate-500">
						<a href="/mipg-nuevo/gestion-riesgos/matrices" class="text-blue-700 hover:underline"
							>Matrices</a
						><span>/</span><span>{data.matrix.processCode}</span><RiskLabBadge tone="blue"
							>Ambiente de prueba</RiskLabBadge
						>
					</div>
					<h1 class="mt-4 text-3xl font-bold tracking-tight text-slate-950">
						{data.matrix.process}
					</h1>
					<p class="mt-2 text-sm text-slate-600">
						Vigencia {data.matrix.validity} · {data.matrix.version} · Responsable: {data.matrix
							.owner}
					</p>
				</div>
				<div class="flex flex-wrap gap-2">
					<RiskLabBadge
						tone={data.matrix.status === 'Publicada'
							? 'green'
							: data.matrix.status === 'En revisión'
								? 'orange'
								: 'blue'}>{data.matrix.status}</RiskLabBadge
					><a
						href="/mipg-nuevo/gestion-riesgos/matrices/{data.matrix.id}/riesgos/nuevo"
						class="rounded-xl bg-blue-700 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-800"
						>Nuevo riesgo</a
					>
				</div>
			</div>
			<nav
				class="mt-6 flex gap-1 overflow-x-auto border-t border-slate-200/70 pt-4"
				aria-label="Secciones de matriz"
			>
				{#each tabs as item (item)}<button
						type="button"
						class={`whitespace-nowrap rounded-lg px-3 py-2 text-sm font-semibold ${tab === item ? 'bg-blue-50 text-blue-700' : 'text-slate-500 hover:bg-slate-50'}`}
						onclick={() => (tab = item)}>{item}</button
					>{/each}
			</nav>
		</section>
		{#if tab === 'Riesgos'}<section class="glass-3 overflow-hidden rounded-2xl">
				<div
					class="flex flex-col justify-between gap-3 border-b border-slate-200/70 p-5 sm:flex-row sm:items-center"
				>
					<div>
						<h2 class="text-xl font-bold text-slate-950">Riesgos de la matriz</h2>
						<p class="mt-1 text-sm text-slate-500">
							{processRisks.length} riesgos visibles en este corte.
						</p>
					</div>
					<div class="flex gap-2">
						<button
							type="button"
							class="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700"
							>Filtros</button
						><a
							href="/mipg-nuevo/gestion-riesgos/matrices/{data.matrix.id}/riesgos/nuevo"
							class="rounded-xl bg-blue-700 px-3 py-2 text-sm font-semibold text-white">Agregar</a
						>
					</div>
				</div>
				<div class="overflow-x-auto">
					<table class="w-full min-w-[900px] text-left text-sm">
						<thead class="bg-slate-50/80 text-xs uppercase tracking-wider text-slate-500"
							><tr
								><th class="px-5 py-3">Riesgo</th><th class="px-5 py-3">Tipología</th><th
									class="px-5 py-3">Inherente</th
								><th class="px-5 py-3">Residual</th><th class="px-5 py-3">Estado</th><th
									class="px-5 py-3">Acción</th
								></tr
							></thead
						><tbody class="divide-y divide-slate-100"
							>{#each processRisks as risk (risk.id)}<tr class="hover:bg-blue-50/30"
									><td class="max-w-[330px] px-5 py-4"
										><p class="font-bold text-slate-900">{risk.code}</p>
										<p class="mt-1 text-xs leading-5 text-slate-500">{risk.description}</p></td
									><td class="px-5 py-4"
										><RiskLabBadge tone="blue">{risk.typology}</RiskLabBadge></td
									><td class="px-5 py-4"><RiskLabZone zone={risk.inherent.zone} /></td><td
										class="px-5 py-4"><RiskLabZone zone={risk.residual.zone} /></td
									><td class="px-5 py-4 text-xs font-semibold text-slate-600">{risk.status}</td><td
										class="px-5 py-4"
										><button
											type="button"
											class="font-semibold text-blue-700 hover:underline"
											onclick={() => (selectedRisk = risk)}>Ver resumen</button
										></td
									></tr
								>{/each}</tbody
						>
					</table>
				</div>
			</section>{:else}<section class="glass-3 rounded-2xl p-8">
				<p class="text-xs font-bold uppercase tracking-[0.18em] text-blue-700">{tab}</p>
				<h2 class="mt-3 text-2xl font-bold text-slate-950">
					Este espacio conserva el contexto de la matriz
				</h2>
				<p class="mt-3 max-w-2xl text-sm leading-6 text-slate-600">
					La vista está preparada para integrar datos de prueba de {tab.toLowerCase()}, sin duplicar
					información ni alterar el módulo actual.
				</p>
			</section>{/if}
		{#if selectedRisk}<div
				class="fixed inset-0 z-40 bg-slate-900/30"
				role="presentation"
				onclick={(event) => event.currentTarget === event.target && (selectedRisk = null)}
			>
				<aside
					class="ml-auto flex h-full w-full max-w-lg flex-col bg-white p-6 shadow-2xl"
					role="dialog"
					aria-modal="true"
					aria-label="Resumen del riesgo"
				>
					<div class="flex items-start justify-between">
						<div>
							<p class="text-xs font-bold uppercase tracking-wider text-blue-700">
								Resumen contextual
							</p>
							<h2 class="mt-2 text-xl font-bold text-slate-950">{selectedRisk.code}</h2>
						</div>
						<button
							type="button"
							class="rounded-lg px-2 py-1 text-xl text-slate-500 hover:bg-slate-100"
							aria-label="Cerrar resumen"
							onclick={() => (selectedRisk = null)}>×</button
						>
					</div>
					<div class="mt-6 space-y-5 overflow-y-auto">
						<p class="text-sm leading-6 text-slate-700">{selectedRisk.description}</p>
						<div class="grid grid-cols-2 gap-3">
							<div class="rounded-xl bg-slate-50 p-3">
								<p class="text-xs text-slate-500">Inherente</p>
								<div class="mt-2"><RiskLabZone zone={selectedRisk.inherent.zone} /></div>
							</div>
							<div class="rounded-xl bg-slate-50 p-3">
								<p class="text-xs text-slate-500">Residual</p>
								<div class="mt-2"><RiskLabZone zone={selectedRisk.residual.zone} /></div>
							</div>
						</div>
						<div>
							<p class="text-xs font-bold uppercase tracking-wider text-slate-500">Controles</p>
							<p class="mt-2 text-sm text-slate-700">
								{selectedRisk.controls} controles relacionados · activos: {selectedRisk.assets
									.length || 'No aplica'}
							</p>
						</div>
						{#if selectedRisk.alert}<div
								class="rounded-xl border border-orange-200 bg-orange-50 p-4 text-sm text-orange-800"
							>
								{selectedRisk.alert}
							</div>{/if}<a
							href={`/mipg-nuevo/gestion-riesgos/matrices/${data.matrix.id}/riesgos/${selectedRisk.id}`}
							class="block rounded-xl bg-blue-700 px-4 py-3 text-center text-sm font-semibold text-white hover:bg-blue-800"
							>Abrir detalle completo</a
						>
					</div>
				</aside>
			</div>{/if}
	</div>
</main>
