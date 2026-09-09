<script>
	import { onMount } from 'svelte';
	import {
		createFollowUpDraft,
		getAllRisks,
		getFollowUpsForRisk,
		saveFollowUpRecord
	} from '$lib/services/riesgosService.js';

	let risks = $state([]);
	let records = $state([]);
	let selectedRiskId = $state('');
	let activeTab = $state('resumen');
	let search = $state('');
	let processFilter = $state('ALL');
	let periodFilter = $state('ALL');
	let statusFilter = $state('ALL');
	let followUp = $state(null);
	let message = $state('');

	const tabs = [
		['resumen', 'Resumen'],
		['controles', 'Controles'],
		['observaciones', 'Observaciones'],
		['historial', 'Historial']
	];
	const periods = ['T1', 'T2', 'T3', 'T4'];
	const statuses = ['Borrador', 'En curso', 'Con observaciones', 'Finalizado'];
	const implementationOptions = [
		'No iniciado',
		'En implementación',
		'Implementado',
		'Suspendido',
		'No aplica'
	];
	const complianceOptions = ['Cumple', 'Cumple parcialmente', 'No cumple', 'No evaluado'];
	const effectivenessOptions = ['Efectivo', 'Parcialmente efectivo', 'Inefectivo', 'No evaluado'];

	let selectedRisk = $derived(risks.find((risk) => risk.id === selectedRiskId));
	let filteredRisks = $derived(
		risks.filter((risk) => {
			const term = search.trim().toLowerCase();
			const latest = records
				.filter((item) => item.riskId === risk.id)
				.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))[0];
			return (
				(!term ||
					`${risk.codigo} ${risk.descripcion} ${risk.proceso}`.toLowerCase().includes(term)) &&
				(processFilter === 'ALL' || risk.proceso === processFilter) &&
				(periodFilter === 'ALL' || latest?.period === periodFilter) &&
				(statusFilter === 'ALL' || latest?.status === statusFilter)
			);
		})
	);

	onMount(() => {
		risks = getAllRisks();
		records = getAllFollowUps();
	});

	function getAllFollowUps() {
		return risks.flatMap((risk) => getFollowUpsForRisk(risk.id));
	}

	function selectRisk(risk) {
		selectedRiskId = risk.id;
		activeTab = 'resumen';
		const existing = getFollowUpsForRisk(risk.id)[0];
		followUp = existing ? structuredClone(existing) : createFollowUpDraft(risk);
		message = '';
	}

	function saveCurrentFollowUp() {
		if (!followUp || !selectedRisk) return;
		saveFollowUpRecord(followUp);
		records = getAllFollowUps();
		message = 'Seguimiento guardado localmente.';
	}

	function updateControl(controlId, field, value) {
		followUp = {
			...followUp,
			controlEvaluations: followUp.controlEvaluations.map((item) =>
				item.controlId === controlId ? { ...item, [field]: value } : item
			)
		};
	}

	function addObservation() {
		followUp = {
			...followUp,
			observations: [
				...followUp.observations,
				{
					id: crypto.randomUUID(),
					author: '',
					date: new Date().toISOString().slice(0, 10),
					comment: '',
					relatedTo: 'Riesgo general',
					response: '',
					responseDate: '',
					status: 'Abierta'
				}
			]
		};
	}
</script>

<svelte:head><title>Seguimiento de Riesgos | GIGA</title></svelte:head>

<main class="min-h-screen px-4 py-8 sm:px-6 lg:px-10">
	<div class="mx-auto max-w-7xl space-y-6">
		<nav aria-label="Ruta de navegación" class="text-sm text-gray-500">
			<a class="text-primary font-medium hover:underline" href="/mipg">MIPG</a><span class="mx-2"
				>/</span
			><a class="text-primary font-medium hover:underline" href="/mipg/gestion-riesgos">Riesgos</a
			><span class="mx-2">/</span><span>Seguimiento</span>
		</nav>
		<section class="glass-3 rounded-2xl p-6 sm:p-8">
			<div class="flex flex-wrap items-start justify-between gap-4">
				<div>
					<p class="text-primary text-sm font-semibold uppercase tracking-[0.18em]">
						Gestión Integral de Riesgos
					</p>
					<h1 class="mt-2 text-3xl font-bold text-gray-900">Seguimiento de Riesgos</h1>
					<p class="mt-2 max-w-2xl text-gray-600">
						Monitoreo de riesgos, evaluación independiente de controles y trazabilidad de
						observaciones.
					</p>
				</div>
				<a href="/mipg/gestion-riesgos" class="text-primary text-sm font-semibold hover:underline"
					>Volver a riesgos</a
				>
			</div>
		</section>

		{#if !selectedRisk}
			<section class="glass-3 rounded-xl p-5 sm:p-6">
				<div class="grid gap-3 lg:grid-cols-[minmax(0,1fr)_16rem_10rem_12rem]">
					<input
						bind:value={search}
						class="focus:border-primary focus:ring-primary/25 block w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2"
						placeholder="Buscar por código, proceso o descripción"
						aria-label="Buscar riesgos"
					/><select
						bind:value={processFilter}
						class="block w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm"
						><option value="ALL">Todos los procesos</option
						>{#each [...new Set(risks.map((risk) => risk.proceso))] as process (process)}<option
								value={process}>{process}</option
							>{/each}</select
					><select
						bind:value={periodFilter}
						class="block w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm"
						><option value="ALL">Todos los periodos</option
						>{#each periods as period (period)}<option value={period}>{period}</option
							>{/each}</select
					><select
						bind:value={statusFilter}
						class="block w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm"
						><option value="ALL">Todos los estados</option
						>{#each statuses as status (status)}<option value={status}>{status}</option
							>{/each}</select
					>
				</div>
			</section>
			<section class="glass-3 overflow-x-auto rounded-xl p-3 sm:p-4">
				<table
					class="w-full min-w-[980px] border-collapse text-sm [&_tbody_tr:hover]:bg-white/45 [&_tbody_tr]:border-t [&_tbody_tr]:border-gray-200/70 [&_td]:px-4 [&_td]:py-4 [&_th]:px-4 [&_th]:py-3"
				>
					<thead
						><tr class="text-left text-xs uppercase tracking-wide text-gray-500"
							><th>Riesgo</th><th>Proceso</th><th>Zona residual</th><th>Último seguimiento</th><th
								>Estado</th
							><th class="text-right">Acción</th></tr
						></thead
					><tbody
						>{#each filteredRisks as risk (risk.id)}<tr
								><td
									><strong class="block text-gray-900">{risk.codigo}</strong><span
										class="line-clamp-2 text-xs text-gray-500">{risk.descripcion}</span
									></td
								><td>{risk.proceso}</td><td
									><span
										class="rounded-full bg-orange-100 px-2 py-1 text-xs font-semibold text-orange-800"
										>{risk.zona || 'Pendiente'}</span
									></td
								><td>{getFollowUpsForRisk(risk.id)[0]?.date || 'Sin seguimiento'}</td><td
									>{getFollowUpsForRisk(risk.id)[0]?.status || 'Pendiente'}</td
								><td class="text-right"
									><button
										type="button"
										class="bg-primary rounded-lg px-3 py-2 text-xs font-semibold text-white hover:bg-blue-700"
										onclick={() => selectRisk(risk)}>Consultar</button
									></td
								></tr
							>{:else}<tr
								><td colspan="6" class="py-12 text-center text-gray-500"
									>No hay riesgos que coincidan con los filtros.</td
								></tr
							>{/each}</tbody
					>
				</table>
			</section>
		{:else}
			<section class="glass-3 rounded-2xl p-6 sm:p-8">
				<div class="flex flex-wrap items-start justify-between gap-4">
					<div>
						<p class="text-primary font-mono text-xs font-semibold uppercase">
							{selectedRisk.codigo}
						</p>
						<h2 class="mt-2 text-2xl font-bold text-gray-900">{selectedRisk.proceso}</h2>
						<p class="mt-2 max-w-3xl text-sm leading-6 text-gray-600">{selectedRisk.descripcion}</p>
					</div>
					<button
						type="button"
						class="rounded-lg border border-gray-300 px-3 py-2 text-sm font-semibold text-gray-700 hover:bg-white"
						onclick={() => (selectedRiskId = '')}>Volver a bandeja</button
					>
				</div>
				<div class="mt-5 flex flex-wrap gap-2" role="tablist" aria-label="Detalle del seguimiento">
					{#each tabs as [key, label] (key)}<button
							type="button"
							role="tab"
							aria-selected={activeTab === key}
							class:font-bold={activeTab === key}
							class:text-primary={activeTab === key}
							class="rounded-lg px-3 py-2 text-sm text-gray-600 hover:bg-white/60"
							onclick={() => (activeTab = key)}>{label}</button
						>{/each}
				</div>
			</section>
			{#if activeTab === 'resumen'}<section class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
					{#each [['Tipología', selectedRisk.tipologia], ['Probabilidad', selectedRisk.probabilidad], ['Impacto', selectedRisk.impacto], ['Zona residual', selectedRisk.zona]] as item (item[0])}<div
							class="glass-3 rounded-xl p-5"
						>
							<p class="text-xs text-gray-500">{item[0]}</p>
							<p class="mt-2 font-semibold text-gray-900">{item[1] || 'Pendiente'}</p>
						</div>{/each}
				</section>
				<section class="glass-3 rounded-xl p-6">
					<h3 class="text-lg font-semibold text-gray-900">Seguimiento actual</h3>
					<div class="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
						<label class="text-xs font-semibold text-gray-700"
							>Periodo<select
								bind:value={followUp.period}
								class="mt-1 block w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm"
								><option>T1</option><option>T2</option><option>T3</option><option>T4</option
								></select
							></label
						><label class="text-xs font-semibold text-gray-700"
							>Tipo<select
								bind:value={followUp.type}
								class="mt-1 block w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm"
								><option>Segunda línea</option><option>Control Interno</option></select
							></label
						><label class="text-xs font-semibold text-gray-700"
							>Estado<select
								bind:value={followUp.status}
								class="mt-1 block w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm"
								>{#each statuses as status (status)}<option>{status}</option>{/each}</select
							></label
						><label class="text-xs font-semibold text-gray-700"
							>Próxima revisión<input
								type="date"
								bind:value={followUp.nextReviewDate}
								class="mt-1 block w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm"
							/></label
						>
					</div>
					<label class="mt-4 block text-xs font-semibold text-gray-700"
						>Revisor<input
							bind:value={followUp.reviewer}
							class="mt-1 block w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm"
							placeholder="Nombre o perfil revisor"
						/></label
					><label class="mt-4 block text-xs font-semibold text-gray-700"
						>Conclusión<textarea
							bind:value={followUp.conclusion}
							class="mt-1 block w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm"
							rows="4"
							placeholder="Conclusión general del seguimiento"
						></textarea></label
					>
				</section>
			{:else if activeTab === 'controles'}<section class="space-y-4">
					{#each selectedRisk.controls as control, index (control.id)}<article
							class="glass-3 rounded-xl p-5"
						>
							<div class="mb-4">
								<p class="text-xs uppercase tracking-wide text-gray-500">Control {index + 1}</p>
								<h3 class="mt-1 font-semibold text-gray-900">
									{control.description || control.action || 'Control sin descripción'}
								</h3>
								<p class="mt-1 text-sm text-gray-500">
									Responsable: {control.responsible || 'No definido'} · Frecuencia: {control.frequency ||
										'No definida'}
								</p>
							</div>
							<div class="grid gap-3 md:grid-cols-3">
								<label class="text-xs font-semibold text-gray-700"
									>Implementación<select
										class="mt-1 block w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm"
										value={followUp.controlEvaluations.find((item) => item.controlId === control.id)
											?.implementation || 'No evaluado'}
										onchange={(event) =>
											updateControl(control.id, 'implementation', event.currentTarget.value)}
										>{#each implementationOptions as option (option)}<option>{option}</option
											>{/each}</select
									></label
								><label class="text-xs font-semibold text-gray-700"
									>Cumplimiento<select
										class="mt-1 block w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm"
										value={followUp.controlEvaluations.find((item) => item.controlId === control.id)
											?.compliance || 'No evaluado'}
										onchange={(event) =>
											updateControl(control.id, 'compliance', event.currentTarget.value)}
										>{#each complianceOptions as option (option)}<option>{option}</option
											>{/each}</select
									></label
								><label class="text-xs font-semibold text-gray-700"
									>Efectividad observada<select
										class="mt-1 block w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm"
										value={followUp.controlEvaluations.find((item) => item.controlId === control.id)
											?.effectiveness || 'No evaluado'}
										onchange={(event) =>
											updateControl(control.id, 'effectiveness', event.currentTarget.value)}
										>{#each effectivenessOptions as option (option)}<option>{option}</option
											>{/each}</select
									></label
								>
							</div>
							<label class="mt-4 block text-xs font-semibold text-gray-700"
								>Observación<textarea
									class="mt-1 block w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm"
									rows="3"
									value={followUp.controlEvaluations.find((item) => item.controlId === control.id)
										?.observation || ''}
									oninput={(event) =>
										updateControl(control.id, 'observation', event.currentTarget.value)}
								></textarea></label
							><label class="mt-4 block text-xs font-semibold text-gray-700"
								>Evidencia o referencia<input
									class="mt-1 block w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm"
									value={followUp.controlEvaluations.find((item) => item.controlId === control.id)
										?.evidence || ''}
									oninput={(event) =>
										updateControl(control.id, 'evidence', event.currentTarget.value)}
								/></label
							>
						</article>{:else}<section class="glass-3 rounded-xl p-6 text-sm text-gray-500">
							Este riesgo no tiene controles registrados.
						</section>{/each}
				</section>
			{:else if activeTab === 'observaciones'}<section class="glass-3 rounded-xl p-6">
					<div class="flex items-center justify-between">
						<div>
							<h3 class="text-lg font-semibold text-gray-900">Observaciones</h3>
							<p class="text-sm text-gray-500">
								Intercambio entre seguimiento y responsable del proceso.
							</p>
						</div>
						<button
							type="button"
							class="bg-primary rounded-lg px-3 py-2 text-sm font-semibold text-white"
							onclick={addObservation}>Agregar observación</button
						>
					</div>
					{#each followUp.observations as observation, index (observation.id)}<article
							class="mt-4 rounded-xl border border-gray-200/70 bg-white/50 p-4"
						>
							<div class="grid gap-3 md:grid-cols-3">
								<input
									class="rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm"
									placeholder="Autor"
									value={observation.author}
									oninput={(event) =>
										(followUp.observations[index].author = event.currentTarget.value)}
								/><input
									type="date"
									class="rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm"
									bind:value={observation.date}
								/><select
									class="rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm"
									bind:value={observation.status}
									><option>Abierta</option><option>En gestión</option><option>Atendida</option
									><option>Cerrada</option></select
								>
							</div>
							<textarea
								class="mt-3 block w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm"
								rows="3"
								placeholder="Comentario"
								bind:value={observation.comment}
							></textarea><textarea
								class="mt-3 block w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm"
								rows="2"
								placeholder="Respuesta del responsable"
								bind:value={observation.response}
							></textarea>
						</article>{:else}<p class="mt-6 text-sm text-gray-500">
							No hay observaciones registradas.
						</p>{/each}
				</section>
			{:else}<section class="glass-3 overflow-x-auto rounded-xl p-4">
					<table class="w-full min-w-[760px] text-sm">
						<thead
							><tr
								class="border-b border-gray-200 text-left text-xs uppercase tracking-wide text-gray-500"
								><th class="px-4 py-3">Periodo</th><th class="px-4 py-3">Fecha</th><th
									class="px-4 py-3">Tipo</th
								><th class="px-4 py-3">Revisor</th><th class="px-4 py-3">Estado</th><th
									class="px-4 py-3">Observaciones</th
								></tr
							></thead
						><tbody
							>{#each getFollowUpsForRisk(selectedRisk.id) as record (record.id)}<tr
									class="border-b border-gray-200/70"
									><td class="px-4 py-3">{record.period}</td><td class="px-4 py-3">{record.date}</td
									><td class="px-4 py-3">{record.type}</td><td class="px-4 py-3"
										>{record.reviewer || 'No definido'}</td
									><td class="px-4 py-3">{record.status}</td><td class="px-4 py-3"
										>{record.observations?.length || 0}</td
									></tr
								>{:else}<tr
									><td colspan="6" class="px-4 py-10 text-center text-gray-500"
										>Aún no hay historial.</td
									></tr
								>{/each}</tbody
						>
					</table>
				</section>{/if}
			<div class="flex flex-wrap items-center justify-between gap-3">
				<button
					type="button"
					class="bg-primary rounded-lg px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
					onclick={saveCurrentFollowUp}>Guardar seguimiento local</button
				>{#if message}<p
						role="status"
						class="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800"
					>
						{message}
					</p>{/if}
			</div>
		{/if}
	</div>
</main>
