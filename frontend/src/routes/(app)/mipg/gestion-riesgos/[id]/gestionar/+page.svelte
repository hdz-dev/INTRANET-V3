<script>
	import { onMount } from 'svelte';
	import { getControlEffectiveness, getImpactLevel, getProbabilityLevel, getRiskById, getRiskZone, getStoredRisks, saveStoredRisk } from '$lib/services/riesgosService.js';

	let { data } = $props();
	let risk = $state();
	let activeTab = $state('controles');
	let controls = $state([]);
	let treatments = $state([]);
	let followUps = $state([]);
	let materializations = $state([]);
	let evidences = $state([]);
	let message = $state('');

	const tabs = [
		{ key: 'controles', label: 'Controles y residual' },
		{ key: 'tratamiento', label: 'Tratamiento' },
		{ key: 'seguimiento', label: 'Seguimiento' },
		{ key: 'materializaciones', label: 'Materializaciones' },
		{ key: 'evidencias', label: 'Evidencias' }
	];
	const periods = [
		{ key: 't1', label: 'Primer trimestre', sub: 'Corte 31 de marzo' },
		{ key: 't2', label: 'Segundo trimestre', sub: 'Corte 30 de junio' },
		{ key: 't3', label: 'Tercer trimestre', sub: 'Corte 30 de septiembre' },
		{ key: 't4', label: 'Cuarto trimestre', sub: 'Corte 31 de diciembre' }
	];

	onMount(() => {
		const stored = getStoredRisks().find((item) => item.id === data.id);
		risk = stored || getRiskById(data.id);
		controls = stored?.controls || [];
		treatments = stored?.treatments || [];
		followUps = stored?.followUps?.length ? stored.followUps : periods.map((period) => ({ ...period, date: '', status: '', notes: '' }));
		materializations = stored?.materializations || [];
		evidences = stored?.evidences || [];
	});

	const residual = $derived(calculateResidual(risk?.form, controls));
	function calculateResidual(form, riskControls) {
		const inherentProbability = form?.probabilidadDecimal || (form?.probability?.value ? Number.parseFloat(form.probability.value) / 100 : 0);
		const impactCandidates = [form?.economicImpact, form?.reputationalImpact].filter((candidate) => candidate?.value).map((candidate) => Number.parseFloat(candidate.value) / 100);
		const inherentImpact = form?.impactoDecimal || Math.max(...impactCandidates, 0);
		let probability = inherentProbability;
		let impact = inherentImpact;
		for (const control of riskControls) {
			const effectiveness = getControlEffectiveness(control);
			if (control.type === 'Preventivo' || control.type === 'Detectivo') probability *= 1 - effectiveness;
			if (control.type === 'Correctivo') impact *= 1 - effectiveness;
		}
		const probabilityLevel = getProbabilityLevel(probability);
		const impactLevel = getImpactLevel(impact);
		return { probability, impact, score: probability * impact, probabilityLevel, impactLevel, zone: probabilityLevel && impactLevel ? getRiskZone(probabilityLevel, impactLevel) : 'Pendiente' };
	}

	function addControl() {
		controls = [...controls, { id: crypto.randomUUID(), responsible: '', frequency: '', action: '', actionComplement: '', deviation: '', type: '', implementation: '', manualDescription: false, description: '' }];
	}
	function controlDescription(control) {
		if (control.manualDescription) return control.description || '';
		const responsible = control.responsible?.trim() || '[responsable]';
		const frequency = control.frequency || '[frecuencia]';
		const action = (control.action?.trim() || '[acción de control]').replace(/^./, (letter) => letter.toLowerCase());
		const complement = control.actionComplement?.trim() || '[complemento del control]';
		return `${responsible} ${frequency.toLowerCase()} ${action} ${complement}.`;
	}
	function addTreatment() {
		treatments = [...treatments, { id: crypto.randomUUID(), option: '', reason: '', action: '' }];
	}
	function addMaterialization() {
		materializations = [...materializations, { id: crypto.randomUUID(), date: '', description: '' }];
	}
	function addEvidence() {
		evidences = [...evidences, { id: crypto.randomUUID(), name: '', type: '', relatedTo: '' }];
	}
	function saveManagement() {
		if (!risk) return;
		saveStoredRisk({ ...risk, controls, treatments, followUps, materializations, evidences });
		message = 'Gestión del riesgo guardada localmente.';
	}
</script>

<svelte:head><title>Gestionar {risk?.codigo || 'riesgo'} | GIGA</title></svelte:head>

<main class="min-h-screen px-4 py-8 sm:px-6 lg:px-10">
	<div class="mx-auto max-w-6xl space-y-8">
		<nav aria-label="Ruta de navegación" class="text-sm text-gray-500">
			<a class="text-primary font-medium hover:underline" href="/mipg/gestion-riesgos">Riesgos</a>
			<span class="mx-2" aria-hidden="true">/</span><span>Gestión posterior</span>
		</nav>
		{#if risk}
			<section class="glass-3 rounded-2xl p-6 sm:p-10">
				<p class="text-primary text-sm font-semibold tracking-[0.18em] uppercase">Gestión posterior</p>
				<h1 class="mt-2 font-mono text-2xl font-bold text-gray-900 sm:text-3xl">{risk.codigo}</h1>
				<p class="mt-3 max-w-3xl text-base leading-7 text-gray-600">{risk.descripcion}</p>
				<div class="mt-6 flex flex-wrap gap-2" role="tablist" aria-label="Etapas de gestión">
					{#each tabs as tab (tab.key)}
						<button type="button" role="tab" aria-selected={activeTab === tab.key} class:active-tab={activeTab === tab.key} class="tab-button" on:click={() => (activeTab = tab.key)}>{tab.label}</button>
					{/each}
				</div>
			</section>
			{#if activeTab === 'controles'}
					<section class="glass-3 rounded-xl p-6 sm:p-8">
					<h2 class="text-xl font-semibold text-gray-900">Controles y riesgo residual</h2>
					<p class="mt-2 text-sm text-gray-600">Registra los controles que actúan sobre el riesgo inherente.</p>
					<div class="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
						<div class="summary-box">
							<div class="flex items-center gap-2">
								Probabilidad residual
								<div class="h-3 w-3 rounded-full" class:bg-green-600={residual.probabilityLevel === 'Muy Baja' || residual.probabilityLevel === 'Baja'} class:bg-yellow-600={residual.probabilityLevel === 'Media'} class:bg-orange-600={residual.probabilityLevel === 'Alta'} class:bg-red-600={residual.probabilityLevel === 'Muy Alta'} class:bg-gray-400={!residual.probabilityLevel}></div>
							</div>
							<strong>{residual.probabilityLevel || 'Pendiente'}{residual.probability ? ` (${Math.round(residual.probability * 100)} %)` : ''}</strong>
						</div>
						<div class="summary-box">
							<div class="flex items-center gap-2">
								Impacto residual
								<div class="h-3 w-3 rounded-full" class:bg-green-600={residual.impactLevel === 'Leve'} class:bg-yellow-600={residual.impactLevel === 'Moderado'} class:bg-orange-600={residual.impactLevel === 'Mayor'} class:bg-red-600={residual.impactLevel === 'Crítico'} class:bg-gray-400={!residual.impactLevel}></div>
							</div>
							<strong>{residual.impactLevel || 'Pendiente'}{residual.impact ? ` (${Math.round(residual.impact * 100)} %)` : ''}</strong>
						</div>
						<div class={`summary-box zone-card zone-${residual.zone.toLowerCase()}`}>
							<div class="flex items-center gap-2">
								Zona residual
								<div class="h-3 w-3 rounded-full" class:bg-green-600={residual.zone === 'Bajo'} class:bg-yellow-600={residual.zone === 'Moderado'} class:bg-orange-600={residual.zone === 'Alto'} class:bg-red-600={residual.zone === 'Extremo'} class:bg-gray-400={!residual.zone}></div>
							</div>
							<strong>{residual.zone}</strong>
						</div>
					</div>
					{#each controls as control, index (control.id)}
						<div class="mt-4 grid gap-3 rounded-xl border border-gray-200/70 bg-white/50 p-4 md:grid-cols-2">
							<h3 class="md:col-span-2 font-semibold">Control {index + 1}</h3>
							<label>Responsable<input aria-label="Responsable del control" bind:value={control.responsible} class="control" placeholder="Cargo responsable" /></label>
							<label>Frecuencia<input aria-label="Frecuencia del control" bind:value={control.frequency} class="control" placeholder="Mensualmente" /></label>
							<label>Acción<textarea aria-label="Acción del control" bind:value={control.action} class="control" placeholder="Verifica los soportes" /></label>
							<label>Complemento<textarea aria-label="Complemento de la acción" bind:value={control.actionComplement} class="control" placeholder="antes de aprobar la obligación" /></label>
							<label>Desviación y manejo<textarea aria-label="Desviaciones del control" bind:value={control.deviation} class="control" placeholder="Manejo de desviaciones"></textarea></label>
							<select aria-label="Tipo de control" bind:value={control.type} class="control"><option value="">Tipo</option><option>Preventivo</option><option>Detectivo</option><option>Correctivo</option></select>
							<select aria-label="Implementación del control" bind:value={control.implementation} class="control"><option value="">Implementación</option><option>Manual</option><option>Automático</option></select>
							<div class="md:col-span-2"><p class="text-xs text-gray-500">Efectividad estimada: <strong class="intensity-high">{getControlEffectiveness(control) ? `${Math.round(getControlEffectiveness(control) * 100)} %` : 'Pendiente'}</strong></p><p class="mt-2 text-xs font-semibold text-gray-600">Descripción del control</p><p class="mt-1 rounded-lg border border-gray-200/70 bg-white/40 p-3 text-sm text-gray-700">{controlDescription(control)}</p></div>
						</div>
					{:else}<p class="mt-5 text-sm text-gray-500">No hay controles asociados.</p>{/each}
					<button type="button" class="action-button mt-4" on:click={addControl}>+ Agregar control</button>
				</section>
			{:else if activeTab === 'tratamiento'}
				<section class="glass-3 rounded-xl p-6 sm:p-8"><h2 class="text-xl font-semibold text-gray-900">Tratamiento y acciones</h2>
					{#each treatments as treatment, index (treatment.id)}<div class="mt-4 grid gap-3 rounded-xl border border-gray-200/70 bg-white/50 p-4 md:grid-cols-2"><h3 class="md:col-span-2 font-semibold">Acción {index + 1}</h3><select aria-label="Opción de tratamiento" bind:value={treatment.option} class="control"><option value="">Selecciona una opción</option><option>Aceptar</option><option>Reducir</option><option>Evitar</option><option>Transferir / Compartir</option></select><input aria-label="Responsable del tratamiento" bind:value={treatment.reason} class="control" placeholder="Responsable o justificación" /><input aria-label="Acción propuesta" bind:value={treatment.action} class="control md:col-span-2" placeholder="Acción propuesta" /></div>{:else}<p class="mt-5 text-sm text-gray-500">No hay acciones registradas.</p>{/each}
					<button type="button" class="action-button mt-4" on:click={addTreatment}>+ Agregar acción</button>
				</section>
			{:else if activeTab === 'seguimiento'}
				<section class="glass-3 rounded-xl p-6 sm:p-8"><h2 class="text-xl font-semibold text-gray-900">Seguimiento trimestral</h2>
					{#each followUps as item (item.key)}<div class="mt-4 rounded-xl border border-gray-200/70 bg-white/50 p-4"><h3 class="font-semibold">{item.label}</h3><p class="text-xs text-gray-500">{item.sub}</p><div class="mt-3 grid gap-3 md:grid-cols-2"><input aria-label="Fecha de seguimiento" bind:value={item.date} type="date" class="control" /><input aria-label="Estado del seguimiento" bind:value={item.status} class="control" placeholder="Estado" /><textarea aria-label="Observaciones del seguimiento" bind:value={item.notes} class="control md:col-span-2" placeholder="Observaciones"></textarea></div></div>{/each}
				</section>
			{:else if activeTab === 'materializaciones'}
				<section class="glass-3 rounded-xl p-6 sm:p-8"><h2 class="text-xl font-semibold text-gray-900">Materializaciones</h2>
					{#each materializations as item, index (item.id)}<div class="mt-4 grid gap-3 rounded-xl border border-gray-200/70 bg-white/50 p-4"><h3 class="font-semibold">Materialización {index + 1}</h3><input aria-label="Fecha de materialización" bind:value={item.date} type="date" class="control" /><textarea aria-label="Descripción de materialización" bind:value={item.description} class="control" placeholder="Descripción y consecuencias"></textarea></div>{:else}<p class="mt-5 text-sm text-gray-500">No hay materializaciones registradas.</p>{/each}
					<button type="button" class="action-button mt-4" on:click={addMaterialization}>+ Registrar materialización</button>
				</section>
			{:else}
				<section class="glass-3 rounded-xl p-6 sm:p-8"><h2 class="text-xl font-semibold text-gray-900">Evidencias</h2>
					{#each evidences as evidence, index (evidence.id)}<div class="mt-4 grid gap-3 rounded-xl border border-gray-200/70 bg-white/50 p-4 md:grid-cols-3"><h3 class="md:col-span-3 font-semibold">Evidencia {index + 1}</h3><input aria-label="Nombre de evidencia" bind:value={evidence.name} class="control" placeholder="Nombre" /><input aria-label="Tipo de evidencia" bind:value={evidence.type} class="control" placeholder="Tipo" /><select aria-label="Asociación de evidencia" bind:value={evidence.relatedTo} class="control"><option value="">Asociada a</option><option>Control</option><option>Tratamiento</option><option>Seguimiento</option><option>Materialización</option></select></div>{:else}<p class="mt-5 text-sm text-gray-500">No hay evidencias registradas.</p>{/each}
					<button type="button" class="action-button mt-4" on:click={addEvidence}>+ Agregar evidencia</button>
				</section>
			{/if}
			<div class="flex flex-wrap justify-between gap-3"><a href={`/mipg/gestion-riesgos/${data.id}`} class="text-primary text-sm font-semibold hover:underline">← Volver al detalle</a><button type="button" class="bg-primary rounded-lg px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700" on:click={saveManagement}>Guardar gestión</button></div>
			{#if message}<p role="status" class="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">{message}</p>{/if}
		{:else}<section class="glass-3 rounded-xl p-8 text-center"><h1 class="text-2xl font-bold text-gray-900">Riesgo no encontrado</h1></section>{/if}
	</div>
</main>

<style>
	:global(.control) { width: 100%; border: 1px solid #d1d5db; border-radius: 0.5rem; background: rgb(255 255 255 / 70%); padding: 0.625rem 0.75rem; }
	.tab-button { border: 1px solid #d1d5db; border-radius: 0.5rem; padding: 0.625rem 0.9rem; color: #374151; font-size: 0.875rem; font-weight: 600; }
	.active-tab { border-color: #1d4ed8; background: #eff6ff; color: #1d4ed8; }
	.summary-box { display: flex; flex-direction: column; gap: .35rem; border: 1px solid rgb(209 213 219 / .7); border-radius: .75rem; background: rgb(255 255 255 / .5); padding: 1rem; color: #6b7280; font-size: .72rem; text-transform: uppercase; }
	.summary-box strong { color: #1f2937; font-size: 1rem; text-transform: none; }
	:global(.zone-bajo) { border-color: rgb(34 197 94 / 45%); background: rgb(220 252 231 / 58%); }
	:global(.zone-moderado) { border-color: rgb(234 179 8 / 48%); background: rgb(254 249 195 / 62%); }
	:global(.zone-alto) { border-color: rgb(249 115 22 / 48%); background: rgb(255 237 213 / 62%); }
	:global(.zone-extremo) { border-color: rgb(239 68 68 / 52%); background: rgb(254 226 226 / 66%); }
</style>
