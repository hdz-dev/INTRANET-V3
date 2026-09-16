<script>
	import RiskLabBadge from '../../../../components/RiskLabBadge.svelte';
	import RiskLabZone from '../../../../components/RiskLabZone.svelte';
	import { riskLabAssets, riskLabControls } from '$lib/risk-lab-data.js';
	import DrawerBase from '../../../../../components/DrawerBase.svelte';

	let { data } = $props();
	let assetDrawer = $state(false);
	let activeStage = $state('Identificación');
	const stages = ['Identificación', 'Valoración', 'Controles', 'Tratamiento', 'Revisión'];
	const riskAssets = $derived(riskLabAssets.filter((asset) => data.risk.assets.includes(asset.id)));
</script>

<svelte:head><title>{data.risk.code} | Riesgos Lab</title></svelte:head>
<main class="px-4 py-8 sm:px-6 lg:px-10">
	<div class="mx-auto max-w-7xl space-y-6">
		<section class="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
			<div>
				<div class="flex flex-wrap items-center gap-2 text-xs font-semibold text-slate-500">
					<a href="/mipg-nuevo/gestion-riesgos/matrices" class="text-blue-700 hover:underline"
						>Matrices</a
					><span>/</span><span>{data.risk.process}</span>
				</div>
				<h1 class="mt-3 text-3xl font-bold text-slate-950">Detalle del riesgo</h1>
				<p class="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
					Vista de trabajo para revisar identificación, valoración, controles y trazabilidad sin
					perder el contexto del proceso.
				</p>
			</div>
			<RiskLabBadge tone="blue">Ambiente de prueba</RiskLabBadge>
		</section>
		<section class="grid gap-6 xl:grid-cols-[1fr_340px]">
			<div class="space-y-6">
				<div class="glass-3 rounded-2xl p-6">
					<div class="flex flex-wrap items-start justify-between gap-4">
						<div>
							<p class="text-xs font-bold uppercase tracking-[0.18em] text-blue-700">
								{data.risk.code}
							</p>
							<h2 class="mt-2 max-w-2xl text-2xl font-bold text-slate-950">
								{data.risk.description}
							</h2>
						</div>
						<RiskLabBadge tone={data.risk.status === 'Publicada' ? 'green' : 'orange'}
							>{data.risk.status}</RiskLabBadge
						>
					</div>
					<div class="mt-5 flex flex-wrap gap-2">
						<RiskLabBadge tone="blue">{data.risk.typology}</RiskLabBadge><span
							class="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600"
							>{data.risk.process}</span
						>{#if data.risk.alert}<span
								class="rounded-full bg-orange-50 px-2.5 py-1 text-xs font-semibold text-orange-700"
								>Requiere revisión</span
							>{/if}
					</div>
				</div>
				<div class="glass-3 rounded-2xl p-6">
					<div class="flex items-center justify-between">
						<div>
							<p class="text-xs font-bold uppercase tracking-[0.18em] text-blue-700">
								Formulario guiado
							</p>
							<h2 class="mt-2 text-xl font-bold text-slate-950">Avance del riesgo</h2>
						</div>
						<span class="text-sm font-semibold text-slate-500">3 de 5 etapas</span>
					</div>
					<nav class="mt-5 grid grid-cols-5 gap-1" aria-label="Etapas del riesgo">
						{#each stages as stage, index (stage)}<button
								type="button"
								class={`rounded-lg px-2 py-2 text-center text-[11px] font-bold ${activeStage === stage ? 'bg-blue-700 text-white' : index < 3 ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-500'}`}
								onclick={() => (activeStage = stage)}
								><span class="block">{index + 1}</span><span class="mt-1 hidden sm:block"
									>{stage}</span
								></button
							>{/each}
					</nav>
					<div class="mt-6 rounded-xl border border-slate-200 bg-white/70 p-5">
						<p class="text-xs font-bold uppercase tracking-wider text-slate-500">
							Etapa {activeStage}
						</p>
						{#if activeStage === 'Identificación'}<p class="mt-2 text-sm leading-6 text-slate-700">
								La redacción se construye con el evento, las causas y las consecuencias. Los campos
								comunes permanecen separados de las reglas de tipología.
							</p>{:else if activeStage === 'Valoración'}<div
								class="mt-4 grid gap-3 sm:grid-cols-2"
							>
								<div>
									<p class="text-xs text-slate-500">Riesgo inherente</p>
									<div class="mt-2 flex items-center gap-2">
										<RiskLabZone zone={data.risk.inherent.zone} /><span
											class="text-sm text-slate-600"
											>{data.risk.inherent.probability} · {data.risk.inherent.impact}</span
										>
									</div>
								</div>
								<div>
									<p class="text-xs text-slate-500">Riesgo residual calculado</p>
									<div class="mt-2 flex items-center gap-2">
										<RiskLabZone zone={data.risk.residual.zone} /><span
											class="text-sm text-slate-600"
											>{data.risk.residual.probability} · {data.risk.residual.impact}</span
										>
									</div>
								</div>
							</div>{:else if activeStage === 'Controles'}<div class="mt-4 space-y-3">
								{#each riskLabControls as control (control.id)}<div
										class="rounded-xl border border-slate-200 p-3"
									>
										<div class="flex justify-between gap-3">
											<p class="text-sm font-semibold text-slate-800">{control.action}</p>
											<RiskLabBadge tone="blue">{control.type}</RiskLabBadge>
										</div>
										<p class="mt-2 text-xs text-slate-500">
											{control.owner} · {control.frequency} · afecta {control.effect.toLowerCase()}
										</p>
									</div>{/each}
							</div>{:else}<p class="mt-2 text-sm leading-6 text-slate-700">
								Esta etapa queda preparada para el prototipo de tratamiento y revisión. La
								información se conserva como datos sintéticos y no genera efectos institucionales.
							</p>{/if}
					</div>
				</div>
			</div>
			<aside class="space-y-6">
				<div class="glass-3 rounded-2xl p-5">
					<h2 class="text-lg font-bold text-slate-950">Resumen contextual</h2>
					<dl class="mt-4 space-y-3 text-sm">
						<div class="flex justify-between gap-3">
							<dt class="text-slate-500">Tipología</dt>
							<dd class="text-right font-semibold text-slate-800">{data.risk.typology}</dd>
						</div>
						<div class="flex justify-between gap-3">
							<dt class="text-slate-500">Controles</dt>
							<dd class="font-semibold text-slate-800">{data.risk.controls}</dd>
						</div>
						<div class="flex justify-between gap-3">
							<dt class="text-slate-500">Activos</dt>
							<dd class="font-semibold text-slate-800">{data.risk.assets.length || 'No aplica'}</dd>
						</div>
					</dl>
					{#if data.risk.typology === 'Seguridad digital'}<button
							type="button"
							class="mt-5 w-full rounded-xl border border-blue-200 bg-blue-50 px-3 py-2.5 text-sm font-semibold text-blue-700 hover:bg-blue-100"
							onclick={() => (assetDrawer = true)}>Consultar activos relacionados</button
						>{/if}
				</div>
				<div class="rounded-2xl border border-orange-200 bg-orange-50/80 p-5">
					<p class="text-xs font-bold uppercase tracking-wider text-orange-700">
						Alertas metodológicas
					</p>
					<p class="mt-2 text-sm leading-6 text-orange-900">
						{data.risk.alert || 'Sin alertas abiertas en este corte.'}
					</p>
				</div>
			</aside>
		</section>
		<DrawerBase bind:open={assetDrawer} title="Activos relacionados"
			><div class="space-y-4">
				{#each riskAssets as asset (asset.id)}<article
						class="rounded-xl border border-slate-200 bg-white p-4"
					>
						<div class="flex justify-between gap-3">
							<div>
								<p class="text-sm font-bold text-slate-900">{asset.name}</p>
								<p class="mt-1 text-xs text-slate-500">{asset.id} · {asset.type}</p>
							</div>
							<RiskLabBadge tone="green">Relacionado</RiskLabBadge>
						</div>
						<div class="mt-4 grid grid-cols-3 gap-2 text-center text-xs">
							<span class="rounded-lg bg-slate-50 p-2"
								><strong class="block text-slate-800">C</strong>{asset.confidentiality}</span
							><span class="rounded-lg bg-slate-50 p-2"
								><strong class="block text-slate-800">I</strong>{asset.integrity}</span
							><span class="rounded-lg bg-slate-50 p-2"
								><strong class="block text-slate-800">D</strong>{asset.availability}</span
							>
						</div>
					</article>{/each}
			</div></DrawerBase
		>
	</div>
</main>
