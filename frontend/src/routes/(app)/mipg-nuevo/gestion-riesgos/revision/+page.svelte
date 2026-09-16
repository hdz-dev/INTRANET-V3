<script>
	import ModalBase from '../../components/ModalBase.svelte';
	import RiskLabBadge from '../components/RiskLabBadge.svelte';
	import RiskLabZone from '../components/RiskLabZone.svelte';
	import { riskLabControls, riskLabRisks } from '$lib/risk-lab-data.js';

	let selected = $state(riskLabRisks[2]);
	let filter = $state('Pendientes');
	let queueQuery = $state('');
	let reviewTab = $state('Resumen');
	let observationOpen = $state(false);
	let decisionOpen = $state(false);
	let observation = $state('');
	let decision = $state('Aprobar y publicar');
	let message = $state('');

	const reviewTabs = ['Resumen', 'Metodología', 'Controles', 'Historial'];
	const queue = $derived(
		riskLabRisks.filter((risk) => {
			const matchesFilter =
				filter === 'Pendientes'
					? risk.status !== 'Publicada'
					: filter === 'Observados'
						? Boolean(risk.alert)
						: true;
			return (
				matchesFilter &&
				`${risk.code} ${risk.process} ${risk.typology}`
					.toLowerCase()
					.includes(queueQuery.toLowerCase())
			);
		})
	);
	const observations = $derived(riskLabRisks.filter((risk) => risk.alert).length);

	function selectRisk(risk) {
		selected = risk;
		reviewTab = 'Resumen';
		message = '';
	}

	function submitObservation() {
		if (!observation.trim()) return;
		message = 'Observación enviada al líder del proceso. La matriz quedó devuelta para ajuste.';
		observationOpen = false;
		observation = '';
	}

	function confirmDecision() {
		message =
			decision === 'Aprobar y publicar'
				? 'Matriz aprobada y publicada en el corte de prueba.'
				: 'Matriz aprobada para el siguiente paso del flujo.';
		decisionOpen = false;
	}
</script>

<svelte:head><title>Revisión de segunda línea | Riesgos Lab</title></svelte:head>

<main class="px-4 py-8 sm:px-6 lg:px-10">
	<div class="mx-auto max-w-7xl space-y-6">
		<section class="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
			<div>
				<div
					class="flex flex-wrap items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-blue-700"
				>
					<span>Segunda línea</span><span class="text-slate-300">/</span><span>Ámbito fiscal</span
					><RiskLabBadge tone="blue">Ambiente de prueba</RiskLabBadge>
				</div>
				<h1 class="mt-3 text-3xl font-bold tracking-tight text-slate-950">
					Bandeja de revisión metodológica
				</h1>
				<p class="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
					La segunda línea no diligencia el riesgo por el proceso: revisa la calidad, verifica la
					metodología, formula observaciones y decide si el corte puede aprobarse y publicarse.
				</p>
			</div>
			<div class="rounded-2xl border border-slate-200 bg-white/70 p-4 text-sm shadow-sm">
				<p class="text-xs font-semibold uppercase tracking-wider text-slate-500">Tu jornada</p>
				<p class="mt-2 font-bold text-slate-900">3 matrices · 8 riesgos pendientes</p>
				<p class="mt-1 text-xs text-slate-500">Corte de revisión: 14 sep 2026</p>
			</div>
		</section>

		<section class="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
			<div class="glass-3 rounded-2xl p-5">
				<p class="text-xs font-bold uppercase tracking-wider text-slate-500">Por revisar</p>
				<p class="mt-2 text-3xl font-bold text-slate-950">8</p>
				<p class="mt-1 text-xs text-slate-500">en tu ámbito</p>
			</div>
			<div class="rounded-2xl border border-orange-100 bg-orange-50 p-5">
				<p class="text-xs font-bold uppercase tracking-wider text-orange-700">Con observaciones</p>
				<p class="mt-2 text-3xl font-bold text-orange-950">{observations}</p>
				<p class="mt-1 text-xs text-orange-800">requieren respuesta</p>
			</div>
			<div class="rounded-2xl border border-red-100 bg-red-50 p-5">
				<p class="text-xs font-bold uppercase tracking-wider text-red-700">Alto o extremo</p>
				<p class="mt-2 text-3xl font-bold text-red-950">5</p>
				<p class="mt-1 text-xs text-red-800">prioridad metodológica</p>
			</div>
			<div class="rounded-2xl border border-emerald-100 bg-emerald-50 p-5">
				<p class="text-xs font-bold uppercase tracking-wider text-emerald-700">
					Aprobadas este corte
				</p>
				<p class="mt-2 text-3xl font-bold text-emerald-950">4</p>
				<p class="mt-1 text-xs text-emerald-800">listas para publicar</p>
			</div>
		</section>

		{#if message}<div
				class="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-800"
				role="status"
			>
				{message}
			</div>{/if}

		<section class="grid gap-6 xl:grid-cols-[360px_1fr]">
			<aside class="glass-3 rounded-2xl p-4">
				<div class="flex items-center justify-between">
					<h2 class="font-bold text-slate-950">Cola de trabajo</h2>
					<RiskLabBadge tone="orange">{queue.length} visibles</RiskLabBadge>
				</div>
				<label class="mt-4 block text-xs font-semibold text-slate-600"
					>Buscar<input
						bind:value={queueQuery}
						placeholder="Código, proceso o tipología"
						class="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
					/></label
				>
				<div class="mt-3 flex gap-1 rounded-xl bg-slate-100 p-1">
					<button
						type="button"
						class={`flex-1 rounded-lg px-2 py-2 text-xs font-bold ${filter === 'Pendientes' ? 'bg-white text-blue-700 shadow-sm' : 'text-slate-500'}`}
						onclick={() => (filter = 'Pendientes')}>Pendientes</button
					><button
						type="button"
						class={`flex-1 rounded-lg px-2 py-2 text-xs font-bold ${filter === 'Observados' ? 'bg-white text-orange-700 shadow-sm' : 'text-slate-500'}`}
						onclick={() => (filter = 'Observados')}>Observados</button
					><button
						type="button"
						class={`flex-1 rounded-lg px-2 py-2 text-xs font-bold ${filter === 'Todos' ? 'bg-white text-slate-700 shadow-sm' : 'text-slate-500'}`}
						onclick={() => (filter = 'Todos')}>Todos</button
					>
				</div>
				<div class="mt-4 space-y-2">
					{#each queue as risk (risk.id)}<button
							type="button"
							class={`w-full rounded-xl border p-4 text-left transition ${selected.id === risk.id ? 'border-blue-400 bg-blue-50 shadow-sm' : 'border-slate-200 bg-white/70 hover:border-blue-200'}`}
							onclick={() => selectRisk(risk)}
							><div class="flex items-start justify-between gap-2">
								<strong class="text-sm text-slate-900">{risk.code}</strong><RiskLabZone
									zone={risk.residual.zone}
								/>
							</div>
							<p class="mt-2 text-xs font-semibold text-slate-500">
								{risk.typology} · {risk.process}
							</p>
							<p class="mt-2 line-clamp-2 text-xs leading-5 text-slate-600">{risk.description}</p>
							{#if risk.alert}<p class="mt-3 text-xs font-semibold text-orange-700">
									Requiere revisión
								</p>{/if}</button
						>{/each}
				</div>
			</aside>

			<section class="glass-3 min-w-0 rounded-2xl p-5 sm:p-6">
				<div
					class="flex flex-col justify-between gap-4 border-b border-slate-200/70 pb-5 sm:flex-row sm:items-start"
				>
					<div>
						<div class="flex flex-wrap items-center gap-2">
							<RiskLabBadge tone="orange">{selected.status}</RiskLabBadge><span
								class="text-xs text-slate-500">Última actualización: {selected.updated}</span
							>
						</div>
						<h2 class="mt-3 text-2xl font-bold text-slate-950">{selected.code}</h2>
						<p class="mt-2 max-w-3xl text-sm leading-6 text-slate-600">{selected.description}</p>
					</div>
					<a
						href={`/mipg-nuevo/gestion-riesgos/matrices/matriz-2026-fin/riesgos/${selected.id}`}
						class="shrink-0 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-blue-700 hover:bg-blue-50"
						>Abrir ficha</a
					>
				</div>
				<nav class="mt-5 flex gap-1 overflow-x-auto" aria-label="Secciones de revisión">
					{#each reviewTabs as tab (tab)}<button
							type="button"
							class={`whitespace-nowrap rounded-lg px-3 py-2 text-sm font-semibold ${reviewTab === tab ? 'bg-blue-700 text-white' : 'text-slate-500 hover:bg-slate-50'}`}
							onclick={() => (reviewTab = tab)}>{tab}</button
						>{/each}
				</nav>

				{#if reviewTab === 'Resumen'}<div class="mt-6 space-y-6">
						<div class="grid gap-3 sm:grid-cols-3">
							<div class="rounded-xl bg-slate-50 p-4">
								<p class="text-xs text-slate-500">Riesgo inherente</p>
								<div class="mt-2"><RiskLabZone zone={selected.inherent.zone} /></div>
								<p class="mt-2 text-xs text-slate-600">
									{selected.inherent.probability} · {selected.inherent.impact}
								</p>
							</div>
							<div class="rounded-xl bg-slate-50 p-4">
								<p class="text-xs text-slate-500">Riesgo residual</p>
								<div class="mt-2"><RiskLabZone zone={selected.residual.zone} /></div>
								<p class="mt-2 text-xs text-slate-600">
									{selected.residual.probability} · {selected.residual.impact}
								</p>
							</div>
							<div class="rounded-xl bg-slate-50 p-4">
								<p class="text-xs text-slate-500">Controles evaluados</p>
								<p class="mt-2 text-2xl font-bold text-slate-900">{selected.controls}</p>
								<p class="mt-1 text-xs text-slate-500">colección relacionada</p>
							</div>
						</div>
						<div class="grid gap-4 lg:grid-cols-2">
							<div class="rounded-xl border border-slate-200 bg-white/60 p-4">
								<h3 class="font-bold text-slate-900">Lista de verificación</h3>
								<div class="mt-4 space-y-3 text-sm">
									<p class="flex gap-2">
										<span class="text-emerald-600">✓</span> Proceso y responsable identificados
									</p>
									<p class="flex gap-2">
										<span class="text-emerald-600">✓</span> Causas y descripción estructuradas
									</p>
									<p class="flex gap-2">
										<span class="text-orange-600">!</span> Criterio de impacto requiere confirmación
									</p>
									<p class="flex gap-2">
										<span class="text-orange-600">!</span> Control correctivo requiere soporte
									</p>
								</div>
							</div>
							<div class="rounded-xl border border-orange-200 bg-orange-50 p-4">
								<p class="text-xs font-bold uppercase tracking-wider text-orange-700">
									Observación activa
								</p>
								<p class="mt-2 text-sm leading-6 text-orange-950">
									{selected.alert || 'No hay observaciones abiertas para este riesgo.'}
								</p>
								<button
									type="button"
									class="mt-4 text-sm font-bold text-orange-700 hover:underline"
									onclick={() => (observationOpen = true)}>Agregar observación</button
								>
							</div>
						</div>
					</div>{:else if reviewTab === 'Metodología'}<div class="mt-6 grid gap-4 md:grid-cols-2">
						<div class="rounded-xl border border-slate-200 p-4">
							<p class="text-xs font-bold uppercase tracking-wider text-slate-500">
								Perfil aplicado
							</p>
							<p class="mt-2 font-bold text-slate-900">Guía V7 · Fiscal</p>
							<p class="mt-2 text-sm leading-6 text-slate-600">
								Revisa afectación fiscal, criterio de impacto, causa, evento, consecuencias y
								tratamiento antes de aprobar.
							</p>
						</div>
						<div class="rounded-xl border border-slate-200 p-4">
							<p class="text-xs font-bold uppercase tracking-wider text-slate-500">
								Alertas automáticas
							</p>
							<ul class="mt-3 space-y-2 text-sm text-slate-700">
								<li>• El impacto inherente debe explicar el efecto fiscal.</li>
								<li>• Los controles deben indicar responsable, acción y evidencia.</li>
								<li>• La zona se obtiene de la matriz de severidad.</li>
							</ul>
						</div>
					</div>{:else if reviewTab === 'Controles'}<div class="mt-6 space-y-3">
						{#each riskLabControls as control (control.id)}<article
								class="rounded-xl border border-slate-200 bg-white/60 p-4"
							>
								<div class="flex flex-col justify-between gap-2 sm:flex-row">
									<div>
										<p class="font-bold text-slate-900">{control.action}</p>
										<p class="mt-1 text-xs text-slate-500">
											Responsable: {control.owner} · {control.frequency}
										</p>
									</div>
									<RiskLabBadge tone="blue">{control.type}</RiskLabBadge>
								</div>
								<div class="mt-3 grid gap-2 text-xs text-slate-600 sm:grid-cols-3">
									<span>Implementación: <strong>{control.implementation}</strong></span><span
										>Afecta: <strong>{control.effect}</strong></span
									><span>Evidencia: <strong>Por verificar</strong></span>
								</div>
							</article>{/each}
					</div>{:else}<div class="mt-6 space-y-3">
						<div class="border-l-2 border-blue-300 pl-4">
							<p class="text-sm font-semibold text-slate-800">Enviado a segunda línea</p>
							<p class="mt-1 text-xs text-slate-500">Andrés Rojas · ayer, 16:10</p>
						</div>
						<div class="border-l-2 border-orange-300 pl-4">
							<p class="text-sm font-semibold text-slate-800">Observación creada</p>
							<p class="mt-1 text-xs text-slate-500">Segunda línea · hoy, 08:15</p>
						</div>
						<div class="border-l-2 border-slate-300 pl-4">
							<p class="text-sm font-semibold text-slate-800">Riesgo actualizado por el proceso</p>
							<p class="mt-1 text-xs text-slate-500">Andrés Rojas · ayer, 15:40</p>
						</div>
					</div>{/if}

				<div
					class="mt-7 flex flex-col justify-between gap-3 border-t border-slate-200/70 pt-5 sm:flex-row sm:items-center"
				>
					<p class="text-xs text-slate-500">
						La decisión queda registrada con tu rol, fecha, observaciones y evidencia.
					</p>
					<div class="flex flex-wrap gap-2">
						<button
							type="button"
							class="rounded-xl border border-orange-200 bg-white px-4 py-2.5 text-sm font-semibold text-orange-700 hover:bg-orange-50"
							onclick={() => (observationOpen = true)}>Devolver con observaciones</button
						><button
							type="button"
							class="rounded-xl bg-blue-700 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-800"
							onclick={() => (decisionOpen = true)}>Aprobar matriz</button
						>
					</div>
				</div>
			</section>
		</section>
	</div>
</main>

<ModalBase bind:open={observationOpen} title="Devolver matriz con observaciones"
	><p class="text-sm leading-6 text-slate-600">
		La matriz regresará al líder del proceso. Especifica qué debe corregirse y en qué elemento.
	</p>
	<textarea
		bind:value={observation}
		rows="5"
		class="mt-4 w-full rounded-xl border border-slate-200 px-3 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
		placeholder="Ejemplo: revisar el criterio de impacto fiscal y adjuntar evidencia del control correctivo."
	></textarea>
	<div class="mt-5 flex justify-end gap-3">
		<button
			type="button"
			class="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700"
			onclick={() => (observationOpen = false)}>Cancelar</button
		><button
			type="button"
			class="rounded-xl bg-orange-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-orange-700"
			disabled={!observation.trim()}
			onclick={submitObservation}>Enviar devolución</button
		>
	</div></ModalBase
>
<ModalBase bind:open={decisionOpen} title="Confirmar decisión"
	><p class="text-sm leading-6 text-slate-600">
		La decisión se aplicará al corte de prueba y quedará en el historial de la matriz.
	</p>
	<label class="field mt-4"
		>Siguiente estado<select
			bind:value={decision}
			class="mt-2 w-full rounded-xl border border-slate-200 px-3 py-3 text-sm"
			><option>Aprobar y publicar</option><option>Aprobar para publicación posterior</option
			></select
		></label
	>
	<div class="mt-5 flex justify-end gap-3">
		<button
			type="button"
			class="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700"
			onclick={() => (decisionOpen = false)}>Cancelar</button
		><button
			type="button"
			class="rounded-xl bg-blue-700 px-4 py-2.5 text-sm font-semibold text-white"
			onclick={confirmDecision}>Confirmar aprobación</button
		>
	</div></ModalBase
>
