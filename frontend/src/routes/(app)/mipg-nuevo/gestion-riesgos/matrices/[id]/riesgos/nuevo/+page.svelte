<script>
	import { onMount } from 'svelte';
	import RiskLabBadge from '../../../../components/RiskLabBadge.svelte';
	import RiskLabZone from '../../../../components/RiskLabZone.svelte';
	import DrawerBase from '../../../../../components/DrawerBase.svelte';
	import ModalBase from '../../../../../components/ModalBase.svelte';
	import { riskLabAssets } from '$lib/risk-lab-data.js';

	let activeStep = $state(0);
	let typology = $state('Gestión');
	let previousTypology = $state('Gestión');
	let pendingTypology = $state('');
	let typologyModal = $state(false);
	let assetDrawer = $state(false);
	let assetQuery = $state('');
	let selectedAssets = $state([]);
	let controls = $state([]);
	let treatments = $state([]);
	let risk = $state({
		code: 'Se generará al guardar',
		date: new Date().toISOString().slice(0, 10),
		process: 'Gestión de la Información y las Comunicaciones',
		subprocess: '',
		responsible: '',
		status: 'Borrador',
		event: '',
		immediateCause: '',
		rootCause: '',
		consequences: '',
		generalImpacts: ['Económica'],
		fiscalImpacts: [],
		securityProperties: [],
		frequency: '',
		probability: '',
		economicImpact: '',
		reputationalImpact: '',
		fiscalPoint: '',
		fiscalResources: '',
		fiscalEffect: '',
		threat: '',
		vulnerability: '',
		securityRiskType: '',
		description: ''
	});
	const steps = ['Identificación', 'Valoración', 'Controles', 'Tratamiento', 'Revisión'];
	const typologies = ['Gestión', 'Fiscal', 'Integridad pública', 'Seguridad digital'];
	const probabilities = [
		{ level: 'Muy Baja', value: 20, criterion: 'Máximo 2 veces por año' },
		{ level: 'Baja', value: 40, criterion: 'Entre 3 y 24 veces por año' },
		{ level: 'Media', value: 60, criterion: 'Entre 25 y 500 veces por año' },
		{ level: 'Alta', value: 80, criterion: 'Más de 500 y hasta 5.000 veces por año' },
		{ level: 'Muy Alta', value: 100, criterion: 'Más de 5.000 veces por año' }
	];
	const impacts = [
		{ level: 'Leve', value: 20, criterion: 'Afectación menor a 10 SMLMV' },
		{ level: 'Menor', value: 40, criterion: 'Mayor a 10 y menor a 50 SMLMV' },
		{ level: 'Moderado', value: 60, criterion: 'Mayor a 50 y menor a 100 SMLMV' },
		{ level: 'Mayor', value: 80, criterion: 'Mayor a 100 y menor a 500 SMLMV' },
		{ level: 'Catastrófico', value: 100, criterion: 'Mayor a 500 SMLMV' }
	];
	const reputationalImpacts = impacts.map((item, index) => ({
		...item,
		criterion: [
			'Afecta la imagen de un área',
			'Afecta la imagen interna',
			'Afecta usuarios relevantes',
			'Efecto sostenido municipal o departamental',
			'Efecto sostenido nacional'
		][index]
	}));
	const fiscalImpacts = [
		'Recursos públicos',
		'Bienes públicos',
		'Intereses patrimoniales de naturaleza pública'
	];
	const securityProperties = ['Confidencialidad', 'Integridad', 'Disponibilidad'];
	const frequencies = [
		'Diariamente',
		'Semanalmente',
		'Mensualmente',
		'Trimestralmente',
		'Semestralmente',
		'Anualmente',
		'Cada vez que se ejecuta',
		'Continuamente',
		'Cuando se presenta el evento',
		'Eventualmente'
	];
	const controlTypes = ['Preventivo', 'Detectivo', 'Correctivo'];
	const implementations = ['Manual', 'Automático'];
	const treatmentOptions = ['Aceptar', 'Reducir', 'Evitar', 'Transferir / Compartir'];
	const matrix = {
		'Muy Alta': {
			Leve: 'Alto',
			Menor: 'Alto',
			Moderado: 'Alto',
			Mayor: 'Alto',
			Catastrófico: 'Extremo'
		},
		Alta: {
			Leve: 'Moderado',
			Menor: 'Moderado',
			Moderado: 'Alto',
			Mayor: 'Alto',
			Catastrófico: 'Extremo'
		},
		Media: {
			Leve: 'Moderado',
			Menor: 'Moderado',
			Moderado: 'Moderado',
			Mayor: 'Alto',
			Catastrófico: 'Extremo'
		},
		Baja: {
			Leve: 'Bajo',
			Menor: 'Moderado',
			Moderado: 'Moderado',
			Mayor: 'Alto',
			Catastrófico: 'Extremo'
		},
		'Muy Baja': {
			Leve: 'Bajo',
			Menor: 'Bajo',
			Moderado: 'Moderado',
			Mayor: 'Alto',
			Catastrófico: 'Extremo'
		}
	};
	const filteredAssets = $derived(
		riskLabAssets.filter((asset) =>
			`${asset.id} ${asset.name} ${asset.process}`.toLowerCase().includes(assetQuery.toLowerCase())
		)
	);
	const applicableEconomic = $derived(
		typology === 'Fiscal' ||
			typology === 'Seguridad digital' ||
			risk.generalImpacts.includes('Económica')
	);
	const applicableReputational = $derived(
		typology !== 'Fiscal' &&
			(typology === 'Seguridad digital' || risk.generalImpacts.includes('Reputacional'))
	);
	const probabilityValue = $derived(
		(probabilities.find((item) => item.level === risk.probability)?.value || 0) / 100
	);
	const economicValue = $derived(
		(impacts.find((item) => item.level === risk.economicImpact)?.value || 0) / 100
	);
	const reputationalValue = $derived(
		(reputationalImpacts.find((item) => item.level === risk.reputationalImpact)?.value || 0) / 100
	);
	const impactValue = $derived(
		Math.max(applicableEconomic ? economicValue : 0, applicableReputational ? reputationalValue : 0)
	);
	const impactLevel = $derived(
		impacts.find((item) => item.value / 100 === impactValue)?.level || 'Pendiente'
	);
	const inherentZone = $derived(matrix[risk.probability]?.[impactLevel] || 'Pendiente');
	const generatedDescription = $derived(buildDescription());
	const residual = $derived(calculateResidual());
	const hasSpecificData = $derived(
		(typology === 'Fiscal' && risk.fiscalImpacts.length) ||
			(typology === 'Seguridad digital' && selectedAssets.length && risk.securityProperties.length)
	);

	onMount(() => {
		risk.description = generatedDescription;
	});
	function id() {
		return globalThis.crypto?.randomUUID?.() || `${Date.now()}-${Math.random()}`;
	}
	function toggle(list, value) {
		return list.includes(value) ? list.filter((item) => item !== value) : [...list, value];
	}
	function buildDescription() {
		const affected =
			typology === 'Fiscal'
				? risk.fiscalImpacts.join(' y ').toLowerCase()
				: typology === 'Seguridad digital'
					? risk.securityProperties.join(', ').toLowerCase()
					: risk.generalImpacts.join(' y ').toLowerCase();
		if (!risk.event && !risk.immediateCause && !risk.rootCause) return '';
		return `Posibilidad de ${affected || 'una afectación'}: ${risk.event || 'evento por definir'}${risk.immediateCause ? ` por ${risk.immediateCause.replace(/^por\s+/i, '')}` : ''}${risk.rootCause ? `, debido a ${risk.rootCause.replace(/^debido a\s+/i, '')}` : ''}.`;
	}
	function changeTypology(event) {
		pendingTypology = event.currentTarget.value;
		if (
			pendingTypology !== previousTypology &&
			(risk.event || risk.immediateCause || selectedAssets.length || risk.fiscalImpacts.length)
		)
			typologyModal = true;
		else applyTypology();
	}
	function applyTypology() {
		typology = pendingTypology || typology;
		previousTypology = typology;
		typologyModal = false;
		if (typology !== 'Fiscal') risk.fiscalImpacts = [];
		if (typology !== 'Seguridad digital') {
			selectedAssets = [];
			risk.securityProperties = [];
			risk.threat = '';
			risk.vulnerability = '';
		}
	}
	function cancelTypology() {
		pendingTypology = previousTypology;
		typologyModal = false;
	}
	function addControl() {
		controls = [
			...controls,
			{
				id: id(),
				responsible: '',
				action: '',
				complement: '',
				deviation: '',
				frequency: '',
				type: '',
				implementation: '',
				documentation: '',
				evidence: '',
				execution: ''
			}
		];
	}
	function removeControl(controlId) {
		controls = controls.filter((control) => control.id !== controlId);
	}
	function addTreatment() {
		treatments = [
			...treatments,
			{ id: id(), option: '', justification: '', action: '', responsible: '', due: '' }
		];
	}
	function removeTreatment(treatmentId) {
		treatments = treatments.filter((item) => item.id !== treatmentId);
	}
	function effectiveness(control) {
		return (
			({ Preventivo: 0.25, Detectivo: 0.15, Correctivo: 0.1 }[control.type] || 0) +
			({ Automático: 0.25, Manual: 0.15 }[control.implementation] || 0)
		);
	}
	function calculateResidual() {
		let probability = probabilityValue;
		let impact = impactValue;
		for (const control of controls) {
			const effect = effectiveness(control);
			if (control.type === 'Preventivo' || control.type === 'Detectivo') probability *= 1 - effect;
			if (control.type === 'Correctivo') impact *= 1 - effect;
		}
		const probabilityLevel =
			probabilities.find(
				(item) => probability > (item.value - 20) / 100 && probability <= item.value / 100
			)?.level || (probability ? 'Muy Baja' : 'Pendiente');
		const impactLevelResult =
			impacts.find((item) => impact > (item.value - 20) / 100 && impact <= item.value / 100)
				?.level || (impact ? 'Leve' : 'Pendiente');
		return {
			probability,
			impact,
			probabilityLevel,
			impactLevel: impactLevelResult,
			zone: matrix[probabilityLevel]?.[impactLevelResult] || 'Pendiente'
		};
	}
	function next() {
		if (activeStep < steps.length - 1) activeStep += 1;
	}
	function previous() {
		if (activeStep > 0) activeStep -= 1;
	}
	function toggleAsset(assetId) {
		selectedAssets = toggle(selectedAssets, assetId);
	}
</script>

<svelte:head><title>Nuevo riesgo | Riesgos Lab</title></svelte:head>
<main class="px-4 py-8 sm:px-6 lg:px-10">
	<div class="mx-auto max-w-7xl space-y-6">
		<section>
			<p class="text-xs font-bold uppercase tracking-[0.18em] text-blue-700">
				Formulario guiado · Ambiente de prueba
			</p>
			<h1 class="mt-2 text-3xl font-bold tracking-tight text-slate-950">Crear un riesgo</h1>
			<p class="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
				La tipología cambia campos, preguntas, catálogos y validaciones sin cambiar la entidad
				conceptual Riesgo.
			</p>
		</section>
		<div class="grid gap-6 xl:grid-cols-[1fr_340px]">
			<section class="glass-3 rounded-2xl p-5 sm:p-7">
				<nav class="grid grid-cols-5 gap-1" aria-label="Etapas del formulario">
					{#each steps as step, index (step)}<button
							type="button"
							class={`rounded-xl px-2 py-3 text-center text-xs font-bold ${index === activeStep ? 'bg-blue-700 text-white' : index < activeStep ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-500'}`}
							onclick={() => (activeStep = index)}
							><span class="block text-base">{index + 1}</span><span class="mt-1 hidden sm:block"
								>{step}</span
							></button
						>{/each}
				</nav>
				<div class="mt-8 space-y-6">
					{#if activeStep === 0}<section class="space-y-5">
							<div>
								<h2 class="text-xl font-bold text-slate-950">Identificación y contexto</h2>
								<p class="mt-1 text-sm text-slate-500">
									Información administrativa y núcleo común.
								</p>
							</div>
							<div class="grid gap-4 sm:grid-cols-2">
								<label class="field">Código institucional<input value={risk.code} readonly /></label
								><label class="field"
									>Fecha de identificación<input type="date" bind:value={risk.date} /></label
								><label class="field"
									>Proceso<select bind:value={risk.process}
										><option>Gestión de la Información y las Comunicaciones</option><option
											>Gestión Financiera</option
										><option>Gestión del Talento Humano</option><option
											>Direccionamiento Estratégico</option
										></select
									></label
								><label class="field"
									>Subproceso o dependencia<input
										bind:value={risk.subprocess}
										placeholder="Área relacionada"
									/></label
								><label class="field sm:col-span-2"
									>Responsable del riesgo<input
										bind:value={risk.responsible}
										placeholder="Cargo o usuario responsable"
									/></label
								>
							</div>
							<div class="rounded-xl border border-blue-100 bg-blue-50/70 p-4">
								<label class="field"
									>Tipología del riesgo<select value={typology} onchange={changeTypology}
										>{#each typologies as item (item)}<option>{item}</option>{/each}</select
									></label
								>
								<p class="mt-3 text-xs leading-5 text-blue-800">
									Al cambiar la tipología, los datos compatibles se conservan y la información
									específica que deja de aplicar se identifica antes de retirarse.
								</p>
							</div>
							{#if typology === 'Fiscal'}<div
									class="rounded-xl border border-orange-200 bg-orange-50/70 p-4"
								>
									<h3 class="font-bold text-orange-950">Particularidad fiscal</h3>
									<p class="mt-1 text-sm text-orange-900">
										Selecciona los bienes, recursos o intereses patrimoniales que podrían afectarse.
									</p>
									<div class="mt-3 grid gap-2 sm:grid-cols-3">
										{#each fiscalImpacts as item (item)}<label class="check-card"
												><input
													type="checkbox"
													checked={risk.fiscalImpacts.includes(item)}
													onchange={() => (risk.fiscalImpacts = toggle(risk.fiscalImpacts, item))}
												/><span>{item}</span></label
											>{/each}
									</div>
									<div class="mt-3 grid gap-3 sm:grid-cols-2">
										<label class="field"
											>Punto de riesgo fiscal<input
												bind:value={risk.fiscalPoint}
												placeholder="Catálogo indicativo"
											/></label
										><label class="field"
											>Recursos o bienes relacionados<input
												bind:value={risk.fiscalResources}
												placeholder="Describe el contexto"
											/></label
										>
									</div>
								</div>{:else if typology === 'Seguridad digital'}<div
									class="rounded-xl border border-blue-200 bg-blue-50 p-4"
								>
									<div class="flex items-start justify-between gap-3">
										<div>
											<h3 class="font-bold text-blue-950">Seguridad digital</h3>
											<p class="mt-1 text-xs leading-5 text-blue-800">
												Relaciona uno o varios activos autorizados. Sin activo no se puede
												continuar.
											</p>
										</div>
										<RiskLabBadge tone={selectedAssets.length ? 'green' : 'orange'}
											>{selectedAssets.length} activos</RiskLabBadge
										>
									</div>
									<button
										type="button"
										class="mt-4 rounded-lg bg-blue-700 px-3 py-2 text-sm font-semibold text-white hover:bg-blue-800"
										onclick={() => (assetDrawer = true)}>Buscar y seleccionar activos</button
									>
									<div class="mt-3 grid gap-2 sm:grid-cols-2">
										{#each securityProperties as property (property)}<label class="check-card"
												><input
													type="checkbox"
													checked={risk.securityProperties.includes(property)}
													onchange={() =>
														(risk.securityProperties = toggle(risk.securityProperties, property))}
												/><span>{property}</span></label
											>{/each}
									</div>
								</div>{:else}<div class="rounded-xl border border-slate-200 bg-white/60 p-4">
									<h3 class="font-bold text-slate-900">Afectaciones generales</h3>
									<p class="mt-1 text-sm text-slate-500">
										Selecciona una o ambas posibilidades de afectación.
									</p>
									<div class="mt-3 flex flex-wrap gap-2">
										{#each ['Económica', 'Reputacional'] as item (item)}<label class="check-card"
												><input
													type="checkbox"
													checked={risk.generalImpacts.includes(item)}
													onchange={() => (risk.generalImpacts = toggle(risk.generalImpacts, item))}
												/><span>{item}</span></label
											>{/each}
									</div>
								</div>{/if}
						</section>{:else if activeStep === 1}<section class="space-y-5">
							<div>
								<h2 class="text-xl font-bold text-slate-950">
									Causas, evento y valoración inherente
								</h2>
								<p class="mt-1 text-sm text-slate-500">
									Preguntas en lenguaje natural, con resultados calculados separados.
								</p>
							</div>
							<div class="grid gap-4 md:grid-cols-2">
								<label class="field"
									>¿Qué podría suceder?<textarea
										bind:value={risk.event}
										rows="3"
										placeholder="Describe el evento de riesgo"
									></textarea></label
								><label class="field"
									>¿Por qué podría suceder?<textarea
										bind:value={risk.immediateCause}
										rows="3"
										placeholder="por ..."
									></textarea></label
								><label class="field"
									>¿Cuál es la causa raíz?<textarea
										bind:value={risk.rootCause}
										rows="3"
										placeholder="debido a ..."
									></textarea></label
								><label class="field"
									>¿Qué consecuencias produciría?<textarea
										bind:value={risk.consequences}
										rows="3"
										placeholder="Describe las consecuencias"
									></textarea></label
								>
							</div>
							{#if typology === 'Seguridad digital'}<div
									class="grid gap-4 rounded-xl border border-blue-100 bg-blue-50/60 p-4 sm:grid-cols-2"
								>
									<label class="field"
										>Amenaza<textarea
											bind:value={risk.threat}
											rows="2"
											placeholder="Amenaza inmediata"
										></textarea></label
									><label class="field"
										>Vulnerabilidad<textarea
											bind:value={risk.vulnerability}
											rows="2"
											placeholder="Vulnerabilidad o causa raíz"
										></textarea></label
									><label class="field sm:col-span-2"
										>Tipo de riesgo de seguridad<input
											bind:value={risk.securityRiskType}
											placeholder="Tipo de evento o afectación"
										/></label
									>
								</div>{/if}
							<div class="rounded-xl border border-blue-100 bg-blue-50/50 p-4">
								<p class="text-xs font-bold uppercase tracking-wider text-blue-700">
									Vista previa de redacción consolidada
								</p>
								<p class="mt-2 text-sm leading-6 text-slate-800">
									{generatedDescription ||
										'Completa el evento y las causas para construir la descripción.'}
								</p>
							</div>
							<div class="grid gap-4 sm:grid-cols-2">
								<label class="field"
									>¿Cuántas veces ocurre la actividad al año?<input
										type="number"
										min="0"
										bind:value={risk.frequency}
										placeholder="Ej. 120"
									/></label
								><label class="field"
									>Nivel de probabilidad<select bind:value={risk.probability}
										><option value="">Selecciona</option
										>{#each probabilities as item (item.level)}<option>{item.level}</option
											>{/each}</select
									><small
										>Resultado de referencia: {probabilities.find(
											(item) => item.level === risk.probability
										)?.criterion || 'selecciona un nivel'}</small
									></label
								>{#if applicableEconomic}<label class="field"
										>{typology === 'Fiscal'
											? 'Cuantía o impacto fiscal'
											: 'Impacto económico'}<select bind:value={risk.economicImpact}
											><option value="">Selecciona</option
											>{#each impacts as item (item.level)}<option value={item.level}
													>{item.level} ({item.value} %) · {item.criterion}</option
												>{/each}</select
										></label
									>{/if}{#if applicableReputational}<label class="field"
										>Impacto reputacional<select bind:value={risk.reputationalImpact}
											><option value="">Selecciona</option
											>{#each reputationalImpacts as item (item.level)}<option value={item.level}
													>{item.level} ({item.value} %) · {item.criterion}</option
												>{/each}</select
										></label
									>{/if}
							</div>
							<div class="grid gap-3 sm:grid-cols-3">
								<div class="result">
									<span>Probabilidad</span><strong>{risk.probability || 'Pendiente'}</strong>
								</div>
								<div class="result"><span>Impacto</span><strong>{impactLevel}</strong></div>
								<div class="result">
									<span>Zona inherente</span><RiskLabZone zone={inherentZone} />
								</div>
							</div>
						</section>{:else if activeStep === 2}<section class="space-y-5">
							<div>
								<h2 class="text-xl font-bold text-slate-950">Controles relacionados</h2>
								<p class="mt-1 text-sm text-slate-500">
									Cada control conserva responsable, acción, complemento, desviación, tipo,
									implementación y trazabilidad.
								</p>
							</div>
							{#each controls as control, index (control.id)}<article
									class="rounded-xl border border-slate-200 bg-white/70 p-4"
								>
									<div class="flex items-center justify-between gap-3">
										<h3 class="font-bold text-slate-900">Control {index + 1}</h3>
										<button
											type="button"
											class="text-sm font-semibold text-red-600"
											onclick={() => removeControl(control.id)}>Quitar</button
										>
									</div>
									<div class="mt-4 grid gap-4 md:grid-cols-2">
										<label class="field"
											>Responsable<input
												bind:value={control.responsible}
												placeholder="Cargo responsable"
											/></label
										><label class="field"
											>Frecuencia<select bind:value={control.frequency}
												><option value="">Selecciona</option
												>{#each frequencies as frequency (frequency)}<option>{frequency}</option
													>{/each}</select
											></label
										><label class="field"
											>Acción<textarea
												bind:value={control.action}
												rows="2"
												placeholder="Inicia con un verbo"
											></textarea></label
										><label class="field"
											>Complemento<textarea
												bind:value={control.complement}
												rows="2"
												placeholder="Cómo, con qué o para qué"
											></textarea></label
										><label class="field"
											>Desviación y manejo<textarea
												bind:value={control.deviation}
												rows="2"
												placeholder="Qué ocurre si falla"
											></textarea></label
										><label class="field"
											>Tipo<select bind:value={control.type}
												><option value="">Selecciona</option
												>{#each controlTypes as type (type)}<option>{type}</option>{/each}</select
											></label
										><label class="field"
											>Implementación<select bind:value={control.implementation}
												><option value="">Selecciona</option
												>{#each implementations as implementation (implementation)}<option
														>{implementation}</option
													>{/each}</select
											></label
										><label class="field"
											>Documentación<input
												bind:value={control.documentation}
												placeholder="Procedimiento, sistema u otro"
											/></label
										><label class="field"
											>Evidencia esperada<input
												bind:value={control.evidence}
												placeholder="Registro o soporte"
											/></label
										><label class="field"
											>Ejecución<select bind:value={control.execution}
												><option value="">Selecciona</option><option>Interna</option><option
													>Externa</option
												><option>Mixta</option></select
											></label
										>
									</div>
									<p class="mt-4 text-xs text-slate-500">
										Efectividad estimada: <strong class="text-blue-700"
											>{effectiveness(control)
												? `${Math.round(effectiveness(control) * 100)} %`
												: 'Pendiente'}</strong
										>
										· {control.type === 'Correctivo'
											? 'afecta impacto'
											: control.type
												? 'afecta probabilidad'
												: 'define el tipo para determinar el componente'}
									</p>
								</article>{:else}<div
									class="rounded-xl border border-dashed border-slate-300 p-5 text-sm text-slate-500"
								>
									No hay controles asociados todavía.
								</div>{/each}<button
								type="button"
								class="rounded-xl border border-dashed border-blue-300 bg-blue-50 px-4 py-3 text-sm font-semibold text-blue-700 hover:bg-blue-100"
								onclick={addControl}>+ Agregar control</button
							>
							<div class="grid gap-3 sm:grid-cols-3">
								<div class="result">
									<span>Probabilidad residual</span><strong>{residual.probabilityLevel}</strong>
								</div>
								<div class="result">
									<span>Impacto residual</span><strong>{residual.impactLevel}</strong>
								</div>
								<div class="result">
									<span>Zona residual</span><RiskLabZone zone={residual.zone} />
								</div>
							</div>
						</section>{:else if activeStep === 3}<section class="space-y-5">
							<div>
								<h2 class="text-xl font-bold text-slate-950">Tratamiento y acciones</h2>
								<p class="mt-1 text-sm text-slate-500">
									El tratamiento se relaciona con el riesgo residual y puede contener varias
									acciones.
								</p>
							</div>
							{#each treatments as treatment, index (treatment.id)}<article
									class="rounded-xl border border-slate-200 bg-white/70 p-4"
								>
									<div class="flex justify-between">
										<h3 class="font-bold text-slate-900">Acción {index + 1}</h3>
										<button
											type="button"
											class="text-sm font-semibold text-red-600"
											onclick={() => removeTreatment(treatment.id)}>Quitar</button
										>
									</div>
									<div class="mt-4 grid gap-4 sm:grid-cols-2">
										<label class="field"
											>Opción<select bind:value={treatment.option}
												><option value="">Selecciona</option
												>{#each treatmentOptions as option (option)}<option>{option}</option
													>{/each}</select
											></label
										><label class="field"
											>Responsable<input
												bind:value={treatment.responsible}
												placeholder="Cargo responsable"
											/></label
										><label class="field sm:col-span-2"
											>Descripción de la acción<textarea
												bind:value={treatment.action}
												rows="2"
												placeholder="Qué se hará"
											></textarea></label
										><label class="field sm:col-span-2"
											>Justificación<input bind:value={treatment.justification} /></label
										><label class="field"
											>Fecha límite<input type="date" bind:value={treatment.due} /></label
										>
									</div>
								</article>{:else}<div
									class="rounded-xl border border-dashed border-slate-300 p-5 text-sm text-slate-500"
								>
									No hay acciones de tratamiento.
								</div>{/each}<button
								type="button"
								class="rounded-xl border border-dashed border-blue-300 bg-blue-50 px-4 py-3 text-sm font-semibold text-blue-700"
								onclick={addTreatment}>+ Agregar acción</button
							>
						</section>{:else}<section class="space-y-5">
							<div>
								<h2 class="text-xl font-bold text-slate-950">Revisión antes de enviar</h2>
								<p class="mt-1 text-sm text-slate-500">
									Verifica la información aportada y los resultados calculados.
								</p>
							</div>
							<div class="grid gap-3 sm:grid-cols-2">
								<div class="result"><span>Tipología</span><strong>{typology}</strong></div>
								<div class="result">
									<span>Activos relacionados</span><strong
										>{selectedAssets.length || 'No aplica'}</strong
									>
								</div>
								<div class="result">
									<span>Riesgo inherente</span><RiskLabZone zone={inherentZone} />
								</div>
								<div class="result">
									<span>Riesgo residual</span><RiskLabZone zone={residual.zone} />
								</div>
							</div>
							{#if !hasSpecificData && (typology === 'Fiscal' || typology === 'Seguridad digital')}<div
									class="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800"
								>
									Falta información específica de {typology}. Completa la etapa de identificación
									antes de enviar.
								</div>{:else}<div
									class="rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-800"
								>
									El borrador está listo para revisión conceptual. En esta fase la acción es
									demostrativa y no publica información.
								</div>{/if}<label class="field"
								>Observación del elaborador<textarea
									bind:value={risk.description}
									rows="3"
									placeholder="Notas para segunda línea"
								></textarea></label
							>
						</section>{/if}
					<div class="flex justify-between gap-3 border-t border-slate-200 pt-5">
						<button
							type="button"
							class="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 disabled:opacity-40"
							disabled={activeStep === 0}
							onclick={previous}>Anterior</button
						>{#if activeStep < steps.length - 1}<button
								type="button"
								class="rounded-xl bg-blue-700 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-800"
								onclick={next}>Guardar y continuar</button
							>{:else}<button
								type="button"
								class="rounded-xl bg-blue-700 px-4 py-2.5 text-sm font-semibold text-white disabled:bg-slate-300"
								disabled={!hasSpecificData &&
									(typology === 'Fiscal' || typology === 'Seguridad digital')}
								>Enviar a revisión</button
							>{/if}
					</div>
				</div>
			</section>
			<aside class="space-y-5">
				<div class="glass-3 rounded-2xl p-5">
					<p class="text-xs font-bold uppercase tracking-[0.18em] text-blue-700">
						Resumen contextual
					</p>
					<h2 class="mt-2 text-lg font-bold text-slate-950">
						{generatedDescription || 'La redacción aparecerá aquí'}
					</h2>
					<div class="mt-4 space-y-2 text-sm text-slate-600">
						<p><strong>Tipología:</strong> {typology}</p>
						<p>
							<strong>Afectación:</strong>
							{typology === 'Fiscal'
								? risk.fiscalImpacts.join(', ') || 'Pendiente'
								: typology === 'Seguridad digital'
									? risk.securityProperties.join(', ') || 'Pendiente'
									: risk.generalImpacts.join(', ') || 'Pendiente'}
						</p>
						<p><strong>Controles:</strong> {controls.length}</p>
						<p><strong>Estado:</strong> Borrador</p>
					</div>
				</div>
				<div class="rounded-2xl border border-slate-200 bg-white/70 p-5">
					<p class="text-xs font-bold uppercase tracking-wider text-slate-500">Datos calculados</p>
					<div class="mt-3 space-y-2 text-sm">
						<p class="flex justify-between">
							<span>Probabilidad</span><strong>{risk.probability || 'Pendiente'}</strong>
						</p>
						<p class="flex justify-between"><span>Impacto</span><strong>{impactLevel}</strong></p>
						<p class="flex justify-between">
							<span>Zona inherente</span><RiskLabZone zone={inherentZone} />
						</p>
						<p class="flex justify-between">
							<span>Zona residual</span><RiskLabZone zone={residual.zone} />
						</p>
					</div>
				</div>
			</aside>
		</div>
		<DrawerBase bind:open={assetDrawer} title="Seleccionar activos de información"
			><div class="space-y-3">
				<label class="field"
					>Buscar activos<input
						bind:value={assetQuery}
						placeholder="Nombre o identificador"
					/></label
				>{#each filteredAssets as asset (asset.id)}<label
						class="flex cursor-pointer gap-3 rounded-xl border border-slate-200 p-3 hover:border-blue-300"
						><input
							type="checkbox"
							checked={selectedAssets.includes(asset.id)}
							onchange={() => toggleAsset(asset.id)}
							class="mt-1 h-4 w-4 accent-blue-700"
						/><span
							><strong class="block text-sm text-slate-900">{asset.name}</strong><span
								class="mt-1 block text-xs text-slate-500">{asset.id} · {asset.process}</span
							><span class="mt-2 block text-xs text-slate-600"
								>C: {asset.confidentiality} · I: {asset.integrity} · D: {asset.availability}</span
							></span
						></label
					>{/each}
			</div></DrawerBase
		>
		<ModalBase bind:open={typologyModal} title="Cambiar tipología"
			><p class="text-sm leading-6 text-slate-600">
				Al cambiar de <strong>{previousTypology}</strong> a <strong>{pendingTypology}</strong>, los
				campos comunes se conservarán. La información específica que deja de aplicar se retirará del
				formulario activo y permanecerá registrada en el historial del borrador.
			</p>
			<div class="mt-6 flex justify-end gap-3">
				<button
					type="button"
					class="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700"
					onclick={cancelTypology}>Cancelar</button
				><button
					type="button"
					class="rounded-xl bg-blue-700 px-4 py-2.5 text-sm font-semibold text-white"
					onclick={applyTypology}>Confirmar cambio</button
				>
			</div></ModalBase
		>
	</div>
</main>

<style>
	.field {
		display: block;
		color: #334155;
		font-size: 0.875rem;
		font-weight: 600;
	}
	.field input,
	.field select,
	.field textarea {
		display: block;
		margin-top: 0.5rem;
		width: 100%;
		border: 1px solid #cbd5e1;
		border-radius: 0.75rem;
		background: rgb(255 255 255 / 0.8);
		padding: 0.7rem 0.8rem;
		font-size: 0.875rem;
		font-weight: 400;
		outline: none;
	}
	.field input:focus,
	.field select:focus,
	.field textarea:focus {
		border-color: #2563eb;
		box-shadow: 0 0 0 3px rgb(219 234 254);
	}
	.field small {
		display: block;
		margin-top: 0.4rem;
		color: #64748b;
		font-size: 0.72rem;
		font-weight: 400;
		line-height: 1.35;
	}
	.check-card {
		display: flex;
		align-items: flex-start;
		gap: 0.55rem;
		border: 1px solid #dbe3ef;
		border-radius: 0.75rem;
		background: rgb(255 255 255 / 0.7);
		padding: 0.7rem;
		color: #334155;
		font-size: 0.8rem;
		font-weight: 600;
	}
	.check-card input {
		margin-top: 0.15rem;
		accent-color: #1d4ed8;
	}
	.result {
		display: flex;
		flex-direction: column;
		gap: 0.45rem;
		border: 1px solid #e2e8f0;
		border-radius: 0.8rem;
		background: rgb(248 250 252 / 0.85);
		padding: 0.85rem;
		color: #64748b;
		font-size: 0.7rem;
		font-weight: 700;
		text-transform: uppercase;
	}
	.result strong {
		color: #0f172a;
		font-size: 0.95rem;
		text-transform: none;
	}
</style>
