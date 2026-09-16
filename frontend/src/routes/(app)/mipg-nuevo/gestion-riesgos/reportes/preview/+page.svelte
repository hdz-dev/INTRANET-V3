<script>
	import RiskLabBadge from '../../components/RiskLabBadge.svelte';
	import RiskLabZone from '../../components/RiskLabZone.svelte';
	import { riskLabRisks } from '$lib/risk-lab-data.js';
</script>

<svelte:head><title>Vista previa de publicación | Riesgos Lab</title></svelte:head>
<main class="px-4 py-8 sm:px-6 lg:px-10">
	<div class="mx-auto max-w-7xl space-y-6">
		<section class="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
			<div>
				<p class="text-xs font-bold uppercase tracking-[0.18em] text-blue-700">
					Publicación · Anexo 1
				</p>
				<h1 class="mt-2 text-3xl font-bold tracking-tight text-slate-950">
					Vista previa del corte
				</h1>
				<p class="mt-2 text-sm leading-6 text-slate-600">
					Solo se muestran registros publicados y columnas compatibles con el formato de Función
					Pública.
				</p>
			</div>
			<RiskLabBadge tone="green">Listo para revisión final</RiskLabBadge>
		</section>
		<section class="rounded-2xl border border-emerald-200 bg-emerald-50 p-5">
			<p class="text-sm font-bold text-emerald-950">Salida pública segura</p>
			<p class="mt-1 text-sm leading-6 text-emerald-800">
				Se excluirán borradores, observaciones internas, IDs técnicos, evidencias, activos de
				información y hojas de fórmulas. La información completa queda en la salida institucional.
			</p>
		</section>
		<section class="glass-3 overflow-hidden rounded-2xl">
			<div
				class="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200/70 p-5"
			>
				<div>
					<h2 class="text-xl font-bold text-slate-950">Mapa integral de riesgos</h2>
					<p class="mt-1 text-sm text-slate-500">
						Entidad de prueba · Vigencia 2026 · 2 riesgos publicables
					</p>
				</div>
				<button
					type="button"
					class="rounded-xl bg-blue-700 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-800"
					>Descargar Excel</button
				>
			</div>
			<div class="overflow-x-auto">
				<table class="w-full min-w-[1000px] text-left text-sm">
					<thead class="bg-slate-50 text-xs uppercase tracking-wider text-slate-500"
						><tr
							><th class="px-5 py-3">No. riesgo</th><th class="px-5 py-3">Proceso</th><th
								class="px-5 py-3">Tipología</th
							><th class="px-5 py-3">Descripción del riesgo</th><th class="px-5 py-3">Inherente</th
							><th class="px-5 py-3">Residual</th><th class="px-5 py-3">Estado</th></tr
						></thead
					><tbody class="divide-y divide-slate-100"
						>{#each riskLabRisks.filter((risk) => risk.status === 'Publicada') as risk (risk.id)}<tr
								><td class="px-5 py-4 font-bold text-slate-900">{risk.code}</td><td
									class="px-5 py-4 text-slate-700">{risk.process}</td
								><td class="px-5 py-4"><RiskLabBadge tone="blue">{risk.typology}</RiskLabBadge></td
								><td class="max-w-[340px] px-5 py-4 text-slate-700">{risk.description}</td><td
									class="px-5 py-4"><RiskLabZone zone={risk.inherent.zone} /></td
								><td class="px-5 py-4"><RiskLabZone zone={risk.residual.zone} /></td><td
									class="px-5 py-4"><RiskLabBadge tone="green">Publicada</RiskLabBadge></td
								></tr
							>{/each}</tbody
					>
				</table>
			</div>
		</section>
	</div>
</main>
