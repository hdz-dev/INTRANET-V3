<script>
	import {
		getRiskSamples,
		getStoredRisks,
		riskFormOptions,
		saveStoredRisk,
		getControlEffectiveness,
		getImpactLevel,
		getProbabilityLevel,
		getRiskZone,
		getIntensityClass
	} from '$lib/services/riesgosService.js';
	import { getAssetsForSelection } from '$lib/services/activosService.js';
	import Modal from '$lib/components/modal.svelte';
	import { onMount } from 'svelte';
	const {
		types,
		processes,
		processSiglas,
		typeSiglas,
		probabilities,
		economicImpacts,
		reputationalImpacts,
		controlTypes,
		controlImplementations,
		controlFrequencies
	} = riskFormOptions;
	let existingRisks = getRiskSamples();
	let informationAssets = [];
	const followUpPeriods = [
		{ key: 't1', label: 'Seguimiento primer trimestre', sub: 'Corte 31 de marzo' },
		{ key: 't2', label: 'Seguimiento segundo trimestre', sub: 'Corte 30 de junio' },
		{ key: 't3', label: 'Seguimiento tercer trimestre', sub: 'Corte 30 de septiembre' },
		{ key: 't4', label: 'Seguimiento cuarto trimestre', sub: 'Corte 31 de diciembre' }
	];
	function createFollowUps() {
		return followUpPeriods.map((period) => ({ ...period, date: '', status: '', notes: '' }));
	}
	function todayISO() {
		const today = new Date();
		const month = String(today.getMonth() + 1).padStart(2, '0');
		const day = String(today.getDate()).padStart(2, '0');
		return `${today.getFullYear()}-${month}-${day}`;
	}
	onMount(() => {
		informationAssets = getAssetsForSelection();
		existingRisks = [...getRiskSamples(), ...getStoredRisks()];

		const editId = new URLSearchParams(window.location.search).get('edit');
		const storedRisk = editId && getStoredRisks().find((risk) => risk.id === editId);

		if (storedRisk?.form) {
			editingId = storedRisk.id;
			form = storedRisk.form;
			controls = storedRisk.controls || [];
			treatments = storedRisk.treatments || [];
			followUps = storedRisk.followUps || [];
			materializations = storedRisk.materializations || [];
			evidences = storedRisk.evidences || [];

			if (storedRisk.form && !storedRisk.form.informationAssetId && storedRisk.form.informationAsset) {
				const asset = informationAssets.find((item) => item.name === storedRisk.form.informationAsset);
				if (asset) form.informationAssetId = asset.identifier;
			}
		}
	});
	let saved = false;
	let editingId = '';
	let currentStep = 1;
	const steps = [
		{ number: 1, label: 'Identificación' },
		{ number: 2, label: 'Valoración inherente' },
		{ number: 3, label: 'Controles y Valoración residual' }
	];
	let validationErrors = [];
	let controls = [];
	let controlToRemove = null;
	let treatments = [];
	let followUps = createFollowUps();
	let materializations = [];
	let evidences = [];
	let manualDescription = false;
	let form = {
		code: '',
		date: todayISO(),
		process: '',
		subProcess: '',
		responsible: '',
		status: 'Activo',
		type: '',
		generalImpacts: [],
		fiscalImpacts: [],
		securityProperties: [],
		informationAsset: '',
		informationAssetId: '',
		probability: '',
		economicImpact: '',
		reputationalImpact: '',
		immediateCause: '',
		rootCause: '',
		description: ''
	};
	$: generatedCode = generateRiskCode(form.process, form.type);
	$: hasDescriptionData = Boolean(form.immediateCause?.trim() && form.rootCause?.trim());
	$: generatedDescription = hasDescriptionData
		? `Probabilidad de ${getAffectedText()} por ${getImmediateCauseText()}, debido a ${withoutPrefix(form.rootCause, 'debido a')}.`
		: '';
	$: assistedDescription = manualDescription ? form.description : generatedDescription;
	$: inherentCalculation = calculateInherentRisk(form);
	$: residualCalculation = calculateResidualRisk(inherentCalculation, controls);
	function onTypeChange(event) {
		form = {
			...form,
			type: event.currentTarget.value,
			fiscalImpacts: [],
			generalImpacts: [],
			securityProperties: [],
			informationAsset: '',
			informationAssetId: '',
			economicImpact: '',
			reputationalImpact: ''
		};
	}
	function createId() {
		return (
			globalThis.crypto?.randomUUID?.() || `${Date.now()}-${Math.random().toString(36).slice(2)}`
		);
	}
	function toggle(list, value) {
		return list.includes(value) ? list.filter((item) => item !== value) : [...list, value];
	}
	function optionDescription(option) {
		const descriptions = {
			'Recursos públicos': 'Pérdida o afectación de dinero y recursos de la entidad.',
			'Bienes públicos': 'Daño, pérdida o uso indebido de bienes públicos.',
			'Intereses patrimoniales de naturaleza pública': 'Afectación del patrimonio o intereses económicos públicos.',
			Confidencialidad: 'Acceso o divulgación de información por personas no autorizadas.',
			Integridad: 'Alteración, modificación o destrucción no autorizada de la información.',
			Disponibilidad: 'Imposibilidad de acceder o utilizar la información cuando se necesita.',
			Económica: 'Posibles pérdidas, costos adicionales o afectación de recursos.',
			Reputacional: 'Daño a la imagen, confianza o credibilidad institucional.'
		};
		return descriptions[option] || '';
	}
	function generateRiskCode(process, type) {
		const processCode = processSiglas[process] || 'GEN';
		const typeCode = typeSiglas[type] || 'GEN';
		const prefix = `R-${processCode}-${typeCode}-`;
		const highestNumber = existingRisks.reduce((highest, risk) => {
			if (risk.id === editingId) return highest;
			if (!risk.codigo?.startsWith(prefix)) return highest;
			const number = Number.parseInt(risk.codigo.slice(prefix.length), 10);
			return Number.isNaN(number) ? highest : Math.max(highest, number);
		}, 0);
		return `${prefix}${String(highestNumber + 1).padStart(3, '0')}`;
	}
	function calculateInherentRisk(risk) {
		const probability = risk.probability?.value ? Number.parseFloat(risk.probability.value) / 100 : 0;
		const candidates = [];
		if (risk.type === 'Fiscal' || risk.type === 'Seguridad de la Información' || risk.generalImpacts.includes('Económica')) {
			if (risk.economicImpact?.value) candidates.push(risk.economicImpact);
		}
		if (risk.type !== 'Fiscal' && (risk.type === 'Seguridad de la Información' || risk.generalImpacts.includes('Reputacional'))) {
			if (risk.reputationalImpact?.value) candidates.push(risk.reputationalImpact);
		}
		const impact = candidates.reduce(
			(highest, candidate) =>
				!highest || Number.parseFloat(candidate.value) > Number.parseFloat(highest.value)
					? candidate
					: highest,
			null
		);
		const impactValue = impact ? Number.parseFloat(impact.value) / 100 : 0;
		const score = probability * impactValue;
		const zone = getRiskZone(risk.probability?.level, impact?.level);
		return {
			label: probability && impact ? `${risk.probability.level} + ${impact.level} · ${zone}` : 'Pendiente',
			probability,
			probabilityLevel: risk.probability?.level || '',
			impactValue,
			impact,
			impactLevel: impact?.level || '',
			score,
			zone: probability && impact ? zone : ''
		};
	}
	function calculateResidualRisk(inherent, riskControls) {
		let probability = inherent.probability;
		let impact = inherent.impactValue;
		let probabilityReduction = 0;
		let impactReduction = 0;
		for (const control of riskControls) {
			const effectiveness = getControlEffectiveness(control);
			if (control.type === 'Preventivo' || control.type === 'Detectivo') {
				probability *= 1 - effectiveness;
				probabilityReduction = inherent.probability ? 1 - probability / inherent.probability : 0;
			}
			if (control.type === 'Correctivo') {
				impact *= 1 - effectiveness;
				impactReduction = inherent.impactValue ? 1 - impact / inherent.impactValue : 0;
			}
		}
		const score = probability * impact;
		const probabilityLevel = getProbabilityLevel(probability);
		const impactLevel = getImpactLevel(impact);
		const zone = getRiskZone(probabilityLevel, impactLevel);
		return {
			probability,
			impact,
			score,
			probabilityReduction,
			impactReduction,
			probabilityLevel,
			impactLevel,
			zone: probability && impact ? zone : 'Pendiente',
			label: probability && impact ? `${probabilityLevel} + ${impactLevel} · ${zone}` : 'Pendiente',
			controlCount: riskControls.length
		};
	}
	function controlEffectiveness(control) {
		return getControlEffectiveness(control);
	}
	function controlDescription(control) {
		if (control.manualDescription) return control.description || '';
		const responsibleFrequency = control.responsibleFrequency?.trim() || [control.responsible?.trim(), control.frequency?.toLowerCase()].filter(Boolean).join(' ');
		const action = lowerFirst(control.action?.trim());
		const complement = control.actionComplement?.trim();
		if (!responsibleFrequency || !action || !complement) return '';
		return `${removeEndingPunctuation(responsibleFrequency)} ${removeEndingPunctuation(action)} ${removeEndingPunctuation(complement)}.`;
	}
	function lowerFirst(value) {
		return value ? value.charAt(0).toLowerCase() + value.slice(1) : value;
	}
	function removeEndingPunctuation(value) {
		return value.replace(/[.;:,]+$/, '').trim();
	}
	function toggleControlDescription(control) {
		control.manualDescription = !control.manualDescription;
		if (control.manualDescription && !control.description) control.description = controlDescription(control);
	}
	function updateControlDescription(control, event) {
		control.description = event.currentTarget.value;
	}
	function handleSubmit() {
		validationErrors = validateForm();
		if (validationErrors.length) {
			saved = false;
			return;
		}
		saveStoredRisk({
			id: editingId || createId(),
			codigo: generatedCode,
			proceso: form.process,
			tipologia: form.type,
			descripcion: assistedDescription,
			probabilidad: form.probability.level,
			impacto: inherentCalculation.impact?.level || '',
			probabilidadDecimal: inherentCalculation.probability,
			impactoDecimal: inherentCalculation.impactValue,
			calificacionInherente: inherentCalculation.score,
			probabilidadResidualNivel: residualCalculation.probabilityLevel,
			impactoResidualNivel: residualCalculation.impactLevel,
			zonaResidual: residualCalculation.zone,
			zona: residualCalculation.zone,
			controles: controls.length,
			estado: form.status,
			metodologiaResidual: 'ANEXO_1_SECUENCIAL_MATRIZ_NIVELES',
			form,
			controls,
			treatments,
			followUps,
			materializations,
			evidences
		});
		saved = true;
	}
	function validateStep(step) {
		const errors = [];
		if (step === 1) {
			if (!form.date) errors.push('Selecciona la fecha de identificación.');
			if (!String(form.responsible || '').trim()) errors.push('Indica el responsable del riesgo.');
			if (!form.process) errors.push('Selecciona el proceso institucional.');
			if (!form.type) errors.push('Selecciona la tipología del riesgo.');
			if (form.type === 'Fiscal' && !form.fiscalImpacts.length) errors.push('Selecciona al menos un efecto dañoso fiscal.');
			if (form.type === 'Seguridad de la Información' && !form.informationAssetId) errors.push('Selecciona el activo de información desde el inventario.');
			if (form.type === 'Seguridad de la Información' && !form.securityProperties.length) errors.push('Selecciona al menos una propiedad de seguridad: Confidencialidad, Integridad o Disponibilidad.');
			if (form.type !== 'Fiscal' && form.type !== 'Seguridad de la Información' && !form.generalImpacts.length) errors.push('Selecciona al menos una afectación general.');
		}
		if (step === 2) {
			if (!form.rootCause?.trim()) errors.push('Describe la causa raíz.');
			if (!form.immediateCause?.trim()) errors.push('Describe la causa inmediata.');
			if (!form.probability) errors.push('Selecciona la probabilidad.');
			if ((form.type === 'Fiscal' || form.type === 'Seguridad de la Información' || form.generalImpacts.includes('Económica')) && !form.economicImpact && form.type !== 'Seguridad de la Información') errors.push('Selecciona el impacto económico.');
			if (form.type === 'Seguridad de la Información' && !form.economicImpact && !form.reputationalImpact) errors.push('Selecciona al menos un impacto económico o reputacional.');
			if (form.type !== 'Fiscal' && form.type !== 'Seguridad de la Información' && form.generalImpacts.includes('Reputacional') && !form.reputationalImpact) errors.push('Selecciona el impacto reputacional.');
		}
		return errors;
	}
	function goNext() {
		validationErrors = validateStep(currentStep);
		if (!validationErrors.length) currentStep = Math.min(3, currentStep + 1);
	}
	function goPrevious() {
		validationErrors = [];
		currentStep = Math.max(1, currentStep - 1);
	}
	function validateForm() {
		const errors = [];
		if (!form.date) errors.push('Selecciona la fecha de identificación.');
		if (!String(form.responsible || '').trim()) errors.push('Indica el responsable del riesgo.');
		if (!form.process) errors.push('Selecciona el proceso institucional.');
		if (!form.type) errors.push('Selecciona la tipología del riesgo.');
		if (form.type === 'Fiscal' && !form.fiscalImpacts.length) {
			errors.push('Selecciona al menos un efecto dañoso para el riesgo fiscal.');
		}
		if (form.type !== 'Fiscal' && form.type !== 'Seguridad de la Información' && !form.generalImpacts.length) {
			errors.push('Selecciona al menos un tipo de afectación.');
		}
		if (form.type === 'Seguridad de la Información') {
			if (!form.informationAssetId) errors.push('Selecciona el activo de información desde el inventario.');
			if (!form.securityProperties.length) errors.push('Selecciona al menos una propiedad afectada.');
		}
		if (!form.immediateCause.trim()) {
			errors.push('Describe la causa inmediata.');
		}
		if (!String(form.rootCause || '').trim()) errors.push('Describe la causa raíz.');
		if (!form.probability) errors.push('Selecciona la probabilidad.');
		if (form.type !== 'Fiscal' && form.type !== 'Seguridad de la Información' && form.generalImpacts.includes('Económica') && !form.economicImpact) {
			errors.push('Selecciona el impacto económico.');
		}
		if (form.type === 'Seguridad de la Información' && !form.economicImpact && !form.reputationalImpact) {
			errors.push('Selecciona al menos un impacto económico o reputacional.');
		}
		if (form.type !== 'Fiscal' && form.type !== 'Seguridad de la Información' && form.generalImpacts.includes('Reputacional') && !form.reputationalImpact) {
			errors.push('Selecciona el impacto reputacional.');
		}
		return errors;
	}
	function toggleManualDescription() {
		manualDescription = !manualDescription;
		if (manualDescription && !form.description) form.description = generatedDescription;
		if (!manualDescription) form.description = '';
	}
	function getAffectedText() {
		const affected = form.type === 'Fiscal' ? form.fiscalImpacts : form.generalImpacts;
		if (form.type === 'Fiscal') {
			if (affected.length === 0) return 'un efecto dañoso sobre los recursos, bienes o intereses patrimoniales de naturaleza pública';
			const fiscalText = affected.map((item) => item.replace(/^Efecto dañoso sobre /i, '').toLowerCase());
			return `un efecto dañoso sobre ${joinList(fiscalText)}`;
		}
		if (form.type === 'Seguridad de la Información') {
			const properties = form.securityProperties || [];
			if (!properties.length) return 'una afectación a la información';
			const propertyText = properties.map((property) => property.toLowerCase());
			return `una afectación a la ${joinList(propertyText)} de la información`;
		}
		if (affected.length === 0) return 'una afectación';
		return `una afectación ${affected.length === 1 ? affected[0].toLowerCase() : joinList(affected.map((item) => item.toLowerCase()))}`;
	}

	function getImmediateCauseText() {
		return withoutPrefix(form.immediateCause, 'por') || '…';
	}

	function joinList(items) {
		if (items.length <= 1) return items[0] || '';
		return `${items.slice(0, -1).join(', ')} y ${items.at(-1)}`;
	}

	function withoutPrefix(value, prefix) {
		return String(value || '').trim().replace(new RegExp(`^${prefix}\\s+`, 'i'), '').trim();
	}
	function updateDescription(event) {
		form.description = event.currentTarget.value;
	}
	function addControl() {
		controls = [
			...controls,
			{
				id: createId(),
				responsible: '',
				responsibleFrequency: '',
				frequency: '',
				action: '',
				actionComplement: '',
				deviation: '',
					description: '',
					manualDescription: false,
				type: '',
				implementation: ''
			}
		];
	}
	function requestRemoveControl(control) {
		controlToRemove = control;
	}
	function cancelRemoveControl() {
		controlToRemove = null;
	}
	function confirmRemoveControl() {
		if (!controlToRemove) return;
		controls = controls.filter((item) => item.id !== controlToRemove.id);
		controlToRemove = null;
	}
	function addTreatment() {
		treatments = [...treatments, { id: createId(), option: '', reason: '', action: '' }];
	}
	function removeTreatment(id) {
		treatments = treatments.filter((item) => item.id !== id);
	}
	function addMaterialization() {
		materializations = [
			...materializations,
			{ id: createId(), date: '', description: '', consequences: '' }
		];
	}
	function removeMaterialization(id) {
		materializations = materializations.filter((item) => item.id !== id);
	}
	function addEvidence() {
		evidences = [...evidences, { id: createId(), name: '', type: '', relatedTo: '' }];
	}
	function removeEvidence(id) {
		evidences = evidences.filter((item) => item.id !== id);
	}

</script>

<svelte:head
	><title>Nuevo riesgo | Gestión Integral de Riesgos</title><meta
		name="description"
		content="Formulario inicial para identificar un riesgo institucional."
	/></svelte:head
>

<main class="min-h-screen px-4 py-8 sm:px-6 lg:px-10">
	<div class="mx-auto max-w-6xl space-y-8">
		<nav aria-label="Ruta de navegación" class="text-sm text-gray-500">
			<a class="text-primary font-medium hover:underline" href="/mipg">MIPG</a><span
				class="mx-2"
				aria-hidden="true">/</span
			><a class="text-primary font-medium hover:underline" href="/mipg/gestion-riesgos">Riesgos</a
			><span class="mx-2" aria-hidden="true">/</span><span>Nuevo riesgo</span>
		</nav>
		<section class="glass-3 rounded-2xl p-6 sm:p-10">
			<p class="text-primary text-sm font-semibold tracking-[0.18em] uppercase">Identificación</p>
			<h1 class="mt-3 text-3xl font-bold text-gray-900 sm:text-4xl">Registrar nuevo riesgo</h1>
			<p class="mt-3 max-w-2xl text-base leading-7 text-gray-600">
				Diligencia la información y revisa la captura antes de conectarla con persistencia.
			</p>
		</section>
		{#if saved}<div role="status" class="validation-toast save-toast">
				<div class="flex items-start justify-between gap-4">
					<p class="font-semibold">Riesgo guardado localmente. Puedes continuar la gestión desde el detalle del riesgo.</p>
					<button type="button" class="validation-close" aria-label="Cerrar notificación" on:click={() => (saved = false)}>×</button>
				</div>
			</div>{/if}
		{#if validationErrors.length}<div role="alert" class="validation-toast">
				<div class="flex items-start justify-between gap-4">
					<p class="font-semibold">Revisa la información antes de continuar:</p>
					<button type="button" class="validation-close" aria-label="Cerrar notificación" on:click={() => (validationErrors = [])}>×</button>
				</div>
				<ul class="mt-2 list-disc space-y-1 pl-5">
					{#each validationErrors as error (error)}<li>{error}</li>{/each}
				</ul>
			</div>{/if}
		<Modal
			isModalOpen={Boolean(controlToRemove)}
			title="¿Quitar este control?"
			message="Esta acción eliminará el control del riesgo."
			confirmLabel="Eliminar"
			tone="danger"
			on:cancel={cancelRemoveControl}
			on:confirm={confirmRemoveControl}
		/>
		<form class="space-y-6" on:submit|preventDefault={handleSubmit}>
			<nav class="stepper" aria-label="Progreso del formulario">
				{#each steps as step (step.number)}
					<button type="button" disabled={step.number > currentStep} class:step-active={currentStep === step.number} class:step-complete={currentStep > step.number} on:click={() => (currentStep = step.number)}>{step.number}<span>{step.label}</span></button>
				{/each}
			</nav>
			{#if currentStep === 1}
			<fieldset class="glass-3 rounded-xl p-6 sm:p-8">
				<div class="fieldset-title">1. Datos del registro</div>
				<div class="mt-6 grid gap-5 md:grid-cols-2">
					<label
						>Código institucional<input
							value={generatedCode}
							readonly
							class="control"
							placeholder="Se generará automáticamente"
						/></label
					><label
						>Fecha de identificación<input
							bind:value={form.date}
							type="date"
							class="control"
						/></label
					><label
						>Proceso institucional<select required bind:value={form.process} class="control"
							><option value="">Selecciona un proceso</option
							>{#each processes as process (process)}<option value={process}>{process}</option
								>{/each}</select
						></label
					><label
						>Subproceso o dependencia<input
							bind:value={form.subProcess}
							class="control"
							placeholder="Área relacionada"
						/></label
					><label class="md:col-span-2"
						>Responsable del riesgo<input
							bind:value={form.responsible}
							class="control"
							placeholder="Cargo o usuario responsable"
						/></label
					><label
						>Estado del riesgo<select bind:value={form.status} class="control"
							><option value="Activo">Activo</option><option value="Inactivo">Inactivo</option></select
						></label
					>
				</div>
			</fieldset>
			<fieldset class="glass-3 rounded-xl p-6 sm:p-8">
				<div class="fieldset-title">2. Tipología y contexto</div><label
					>Tipología del riesgo<select required bind:value={form.type} on:change={onTypeChange} class="control"
						><option value="">Selecciona una tipología</option>{#each types as type (type)}<option
								value={type}>{type}</option
							>{/each}</select
					></label
				>
				{#if form.type === 'LA/FT'}
					<p class="mt-3 rounded-lg border border-amber-200 bg-amber-50/70 p-3 text-sm leading-6 text-amber-800">
						LA/FT se muestra como referencia del prototipo; su ubicación definitiva dentro de Integridad Pública sigue pendiente de validación metodológica.
					</p>
				{/if}
			</fieldset>
			{#if form.type === 'Fiscal'}<fieldset class="glass-3 rounded-xl p-6 sm:p-8">
					<div class="fieldset-title">3. Información fiscal</div>
					<p class="mt-2 text-sm text-gray-600">Selecciona el tipo de efecto dañoso que podría afectar recursos, bienes o intereses patrimoniales de naturaleza pública.</p>
					<div class="mt-5 grid gap-3 sm:grid-cols-3">
						{#each riskFormOptions.fiscalImpacts as item (item)}<label class="pill option-pill"
								><input
									type="checkbox"
									checked={form.fiscalImpacts.includes(item)}
									on:change={() => (form.fiscalImpacts = toggle(form.fiscalImpacts, item))}
								/><span><strong>{item}</strong><small>{optionDescription(item)}</small></span></label
							>{/each}
					</div>
				</fieldset>
			{:else if String(form.type || '').trim() === 'Seguridad de la Información'}
				<fieldset class="glass-3 rounded-xl p-6 sm:p-8">
					<div class="fieldset-title">3. Seguridad de la Información</div>
					<p class="mt-2 text-sm text-gray-600">Relaciona el riesgo con un activo y selecciona una o varias propiedades afectadas: Confidencialidad, Integridad o Disponibilidad.</p>
					<div class="grid gap-5 md:grid-cols-2">
						<label class="md:col-span-2">Activo de información<select required bind:value={form.informationAssetId} class="control" on:change={(event) => (form.informationAsset = informationAssets.find((asset) => asset.identifier === event.currentTarget.value)?.name || '')}><option value="">Selecciona un activo del inventario</option>{#each informationAssets as asset (asset.identifier)}<option value={asset.identifier}>{asset.identifier} · {asset.name}{asset.isExample ? ' (ejemplo)' : ''}</option>{/each}</select><span class="field-hint">Se asocia mediante el identificador funcional del inventario de Activos de Información.</span></label>
						<div class="md:col-span-2">
							<p>Propiedad afectada</p>
							<div class="mt-3 flex flex-wrap gap-3">
								{#each riskFormOptions.securityProperties as property (property)}<label class="pill option-pill"><input type="checkbox" checked={form.securityProperties.includes(property)} on:change={() => (form.securityProperties = toggle(form.securityProperties, property))} /><span><strong>{property}</strong><small>{optionDescription(property)}</small></span></label>{/each}
							</div>
						</div>
					</div>
				</fieldset>
			{:else if form.type}
				<fieldset class="glass-3 rounded-xl p-6 sm:p-8">
					<div class="fieldset-title">3. Afectaciones generales</div>
					<p class="mt-2 text-sm text-gray-600">Selecciona una o ambas afectaciones para identificar si el riesgo puede generar consecuencias económicas, reputacionales o ambas.</p>
					<div class="mt-5 flex flex-wrap gap-3">
						{#each riskFormOptions.generalImpacts as item (item)}<label class="pill option-pill"><input type="checkbox" checked={form.generalImpacts.includes(item)} on:change={() => (form.generalImpacts = toggle(form.generalImpacts, item))} /><span><strong>{item}</strong><small>{optionDescription(item)}</small></span></label>{/each}
					</div>
				</fieldset>
			{/if}
			{/if}
			{#if currentStep === 2}
			<fieldset class="glass-3 rounded-xl p-6 sm:p-8">
				<div class="fieldset-title">4. Causas y descripción</div>
				<div class="mt-6 grid gap-5 md:grid-cols-2">
					<label
						>Causa inmediata <span class="field-hint">Evento o situación por la cual se genera el riesgo. Ejemplo: por demoras en la validación.</span><textarea bind:value={form.immediateCause} rows="4" class="control" placeholder="por ..."
						></textarea></label
					><label
						>Causa raíz <span class="field-hint">Origen de la causa por la cual se genera el riesgo. Ejemplo: debido a controles manuales insuficientes.</span><textarea bind:value={form.rootCause} rows="4" class="control" placeholder="debido a ..."
						></textarea></label
					><div class="md:col-span-2"><span>Descripción</span><textarea
							value={assistedDescription}
							on:input={updateDescription}
							readonly={!manualDescription}
							rows="4"
							class="control"
							placeholder="Ejemplo: Probabilidad de una afectación económica por demoras en la validación, debido a controles manuales insuficientes."
						></textarea><label class="manual-toggle"><input type="checkbox" checked={manualDescription} on:change={toggleManualDescription} /> Corregir Descripción</label></div
					>
				</div>
			</fieldset>
			<fieldset class="glass-3 rounded-xl p-6 sm:p-8">
				<div class="fieldset-title">5. Valoración inherente preliminar</div>
				<div class="mt-6 grid gap-5 md:grid-cols-2">
					<label
						>Probabilidad<select
							value={form.probability?.level || ''}
							on:change={(e) => {
								const selected = probabilities.find((opt) => opt.level === e.target.value);
								form.probability = selected || '';
							}}
							class="control"
							><option value="">Selecciona un nivel</option
							>{#each probabilities as option (option.level)}<option value={option.level}>{option.level} ({option.value}) — {option.criterion}</option>{/each}</select
						></label
					>{#if form.type === 'Fiscal' || form.type === 'Seguridad de la Información' || form.generalImpacts.includes('Económica') || (form.type && !form.generalImpacts.length)}<label
						>{form.type === 'Fiscal' ? 'Cuantía del efecto dañoso' : 'Impacto económico'}<select
							value={form.economicImpact?.level || ''}
							on:change={(e) => {
								const selected = economicImpacts.find((opt) => opt.level === e.target.value);
								form.economicImpact = selected || '';
							}}
							class="control"
							><option value="">Selecciona un nivel</option>{#each economicImpacts as level (level.level)}<option
								value={level.level}>{level.level} ({level.value}) — {level.criterion}</option
								>{/each}</select
						></label
					>{/if}{#if form.type !== 'Fiscal' && (form.type === 'Seguridad de la Información' || form.generalImpacts.includes('Reputacional') || (form.type && !form.generalImpacts.length))}<label
						>Impacto reputacional<select
							value={form.reputationalImpact?.level || ''}
							on:change={(e) => {
								const selected = reputationalImpacts.find((opt) => opt.level === e.target.value);
								form.reputationalImpact = selected || '';
							}}
							class="control"
							><option value="">Selecciona un nivel</option>{#each reputationalImpacts as level (level.level)}<option
								value={level.level}>{level.level} ({level.value}) — {level.criterion}</option
								>{/each}</select
						></label
					>{/if}
					
				</div>
				<div class="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
					<div class="summary-box">
						<div class="flex items-center gap-2">
							Probabilidad inherente
							<div class="h-3 w-3 rounded-full" class:bg-green-600={inherentCalculation.probabilityLevel === 'Muy Baja' || inherentCalculation.probabilityLevel === 'Baja'} class:bg-yellow-600={inherentCalculation.probabilityLevel === 'Media'} class:bg-orange-600={inherentCalculation.probabilityLevel === 'Alta'} class:bg-red-600={inherentCalculation.probabilityLevel === 'Muy Alta'} class:bg-gray-400={!inherentCalculation.probabilityLevel}></div>
						</div>
						<strong class={getIntensityClass(inherentCalculation.probabilityLevel)}>{inherentCalculation.probabilityLevel || 'Pendiente'}{inherentCalculation.probability ? ` (${Math.round(inherentCalculation.probability * 100)} %)` : ''}</strong>
					</div>
					<div class="summary-box">
						<div class="flex items-center gap-2">
							Impacto inherente
							<div class="h-3 w-3 rounded-full" class:bg-green-600={inherentCalculation.impactLevel === 'Leve'} class:bg-yellow-600={inherentCalculation.impactLevel === 'Menor' || inherentCalculation.impactLevel === 'Moderado'} class:bg-orange-600={inherentCalculation.impactLevel === 'Mayor'} class:bg-red-600={inherentCalculation.impactLevel === 'Catastrófico'} class:bg-gray-400={!inherentCalculation.impactLevel}></div>
						</div>
						<strong class={getIntensityClass(inherentCalculation.impactLevel)}>{inherentCalculation.impactLevel || 'Pendiente'}{inherentCalculation.impactValue ? ` (${Math.round(inherentCalculation.impactValue * 100)} %)` : ''}</strong>
					</div>
					<div class="summary-box zone-card">
						<div class="flex items-center gap-2">
							Zona inherente
							<div class="h-3 w-3 rounded-full" class:bg-green-600={inherentCalculation.zone === 'Bajo'} class:bg-yellow-600={inherentCalculation.zone === 'Moderado'} class:bg-orange-600={inherentCalculation.zone === 'Alto'} class:bg-red-600={inherentCalculation.zone === 'Extremo'} class:bg-gray-400={!inherentCalculation.zone}></div>
						</div>
						<strong class={getIntensityClass(inherentCalculation.zone)}>{inherentCalculation.zone || 'Pendiente'}</strong>
					</div>
				</div>
			</fieldset>
			{/if}
			{#if currentStep === 3}
			<fieldset class="glass-3 rounded-xl p-6 sm:p-8">
				<div class="fieldset-title">6. Controles Asociados</div
				>{#each controls as control, index (control.id)}<div
						class="mt-4 rounded-xl border border-gray-200/70 bg-white/50 p-4"
					>
						<div class="mb-3 flex justify-between">
							<h3>Control {index + 1}</h3>
							<button
								type="button"
								class="text-sm text-red-600"
								on:click={() => requestRemoveControl(control)}>Quitar</button
							>
						</div>
						<div class="grid gap-4 md:grid-cols-3">
							<label>Responsable <span class="field-hint">Escribe el cargo responsable, no el nombre de una persona.</span><input aria-label="Responsable del control" bind:value={control.responsible} class="control" placeholder="Auxiliar administrativa" /></label>
							<label>Frecuencia <span class="field-hint">Indica cada cuánto se ejecuta el control en condiciones normales.</span><select aria-label="Frecuencia del control" bind:value={control.frequency} class="control"><option value="">Selecciona</option>{#each controlFrequencies as frequency (frequency)}<option>{frequency}</option>{/each}</select></label>
							<label>Acción <span class="field-hint">Inicia con un verbo.</span><textarea aria-label="Acción del control" bind:value={control.action} rows="2" class="control" placeholder="asistirá a las jornadas de capacitación"></textarea></label>
							<label>Complemento <span class="field-hint">Cómo, con qué o para qué se realiza el control.</span><textarea aria-label="Complemento de la acción" bind:value={control.actionComplement} rows="2" class="control" placeholder="para conocer las actualizaciones y garantizar el uso adecuado del SISNET"></textarea></label>
							<label>Desviación y manejo <span class="field-hint">Qué ocurre cuando el control no se ejecuta o se presenta una desviación.</span><textarea aria-label="Desviación y manejo" bind:value={control.deviation} rows="2" class="control" placeholder="Describir la acción ante una desviación"></textarea></label>
							<label>Tipo de control <span class="field-hint">Indica en qué momento actúa el control: antes del evento, durante su detección o después de la materialización.</span><select aria-label="Tipo de control" bind:value={control.type} class="control"><option value="">Selecciona</option>{#each controlTypes as type (type)}<option>{type}</option>{/each}</select></label>
							<label>Implementación <span class="field-hint">Indica si el control requiere intervención humana o si se ejecuta principalmente mediante un sistema.</span><select aria-label="Implementación del control" bind:value={control.implementation} class="control"><option value="">Selecciona</option>{#each controlImplementations as implementation (implementation)}<option>{implementation}</option>{/each}</select></label>
						</div>
						<p class="mt-4 text-xs text-gray-500">Efectividad estimada: <strong class="text-primary">{controlEffectiveness(control) ? `${Math.round(controlEffectiveness(control) * 100)} %` : 'Pendiente'}</strong>{#if control.type === 'Correctivo'} — reduce el impacto{:else if control.type} — reduce la probabilidad{:else} — define tipo para determinar el efecto{/if}</p>
						<div class="mt-4 border-t border-gray-200/70 pt-4">
							<div class="flex flex-wrap items-center justify-between gap-2">
								<label class="text-sm font-semibold text-gray-700" for={`control-description-${control.id}`}>Descripción redactada del control</label>
								<label class="manual-toggle"><input type="checkbox" checked={control.manualDescription} on:change={() => toggleControlDescription(control)} /> Corregir descripción</label>
							</div>
							<textarea id={`control-description-${control.id}`} aria-label="Descripción redactada del control" value={controlDescription(control)} on:input={(event) => updateControlDescription(control, event)} readonly={!control.manualDescription} rows="4" class="control" placeholder="Ejemplo: El auxiliar administrativo semanalmente revisa los soportes para validar la información registrada."></textarea>
						</div>
					</div>{:else}<p class="mt-4 text-sm text-gray-500">
						No hay controles asociados.
					</p>{/each}<button type="button" class="action-button" on:click={addControl}
					>+ Agregar control</button
				>
			</fieldset>
			<fieldset class="glass-3 rounded-xl p-6 sm:p-8">
				<div class="fieldset-title">7. Valoración residual</div>
				<p class="mt-2 text-sm text-gray-600">
					Valoración por niveles según el Anexo 1 oficial: los controles se aplican secuencialmente y el resultado se cruza en la matriz de severidad.
				</p>
				<div class="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
					<div class="summary-box">
						<div class="flex items-center gap-2">
							Probabilidad residual
							<div class="h-3 w-3 rounded-full" class:bg-green-600={residualCalculation.probabilityLevel === 'Muy Baja' || residualCalculation.probabilityLevel === 'Baja'} class:bg-yellow-600={residualCalculation.probabilityLevel === 'Media'} class:bg-orange-600={residualCalculation.probabilityLevel === 'Alta'} class:bg-red-600={residualCalculation.probabilityLevel === 'Muy Alta'} class:bg-gray-400={!residualCalculation.probabilityLevel}></div>
						</div>
						<strong class={getIntensityClass(residualCalculation.probabilityLevel)}>{residualCalculation.probabilityLevel || 'Pendiente'}{residualCalculation.probability ? ` (${Math.round(residualCalculation.probability * 100)} %)` : ''}</strong>
					</div>
					<div class="summary-box">
						<div class="flex items-center gap-2">
							Impacto residual
							<div class="h-3 w-3 rounded-full" class:bg-green-600={residualCalculation.impactLevel === 'Leve'} class:bg-yellow-600={residualCalculation.impactLevel === 'Menor' || residualCalculation.impactLevel === 'Moderado'} class:bg-orange-600={residualCalculation.impactLevel === 'Mayor'} class:bg-red-600={residualCalculation.impactLevel === 'Catastrófico'} class:bg-gray-400={!residualCalculation.impactLevel}></div>
						</div>
						<strong class={getIntensityClass(residualCalculation.impactLevel)}>{residualCalculation.impactLevel || 'Pendiente'}{residualCalculation.impact ? ` (${Math.round(residualCalculation.impact * 100)} %)` : ''}</strong>
					</div>
					<div class="summary-box zone-card">
						<div class="flex items-center gap-2">
							Zona residual
							<div class="h-3 w-3 rounded-full" class:bg-green-600={residualCalculation.zone === 'Bajo'} class:bg-yellow-600={residualCalculation.zone === 'Moderado'} class:bg-orange-600={residualCalculation.zone === 'Alto'} class:bg-red-600={residualCalculation.zone === 'Extremo'} class:bg-gray-400={!residualCalculation.zone}></div>
						</div>
						<strong class={getIntensityClass(residualCalculation.zone)}>{residualCalculation.zone}</strong>
					</div>
				</div>
				<p class="mt-4 text-sm text-gray-600">Riesgo inherente: <strong>{inherentCalculation.probabilityLevel || 'Pendiente'} ({inherentCalculation.probability ? `${Math.round(inherentCalculation.probability * 100)} %` : '—'}) + {inherentCalculation.impactLevel || 'Pendiente'} ({inherentCalculation.impactValue ? `${Math.round(inherentCalculation.impactValue * 100)} %` : '—'})</strong> = <strong>{inherentCalculation.zone || 'Pendiente'}</strong></p>
				<p class="mt-3 text-xs text-gray-500">
					Controles aplicados: {residualCalculation.controlCount}. Reducción de probabilidad: {Math.round(residualCalculation.probabilityReduction * 100)} %. Reducción de impacto: {Math.round(residualCalculation.impactReduction * 100)} %.
				</p>
			</fieldset>
			{/if}
			{#if false}
			<fieldset class="glass-3 rounded-xl p-6 sm:p-8">
				<div class="fieldset-title">8. Tratamiento y acciones</div
				>{#each treatments as treatment, index (treatment.id)}<div
						class="mt-4 rounded-xl border bg-white/50 p-4"
					>
						<div class="mb-3 flex justify-between">
							<h3>Tratamiento {index + 1}</h3>
							<button
								type="button"
								class="text-sm text-red-600"
								on:click={() => removeTreatment(treatment.id)}>Quitar</button
							>
						</div>
						<div class="grid gap-4 md:grid-cols-2">
							<select aria-label="Tratamiento" bind:value={treatment.option} class="control"
								><option value="">Opción de tratamiento</option
								>{#each riskFormOptions.treatments as option (option)}<option>{option}</option
									>{/each}</select
							><input
								aria-label="Justificación"
								bind:value={treatment.reason}
								class="control"
								placeholder="Justificación o responsable"
							/><input
								aria-label="Acción"
								bind:value={treatment.action}
								class="control md:col-span-2"
								placeholder="Acción propuesta"
							/>
						</div>
					</div>{:else}<p class="mt-4 text-sm text-gray-500">
						No hay tratamientos asociados.
					</p>{/each}<button type="button" class="action-button" on:click={addTreatment}
					>+ Agregar tratamiento</button
				>
			</fieldset>
			<fieldset class="glass-3 rounded-xl p-6 sm:p-8">
				<div class="fieldset-title">9. Seguimiento y materialización</div
				>
				<div class="grid gap-6 lg:grid-cols-2">
					<div>
						{#each followUps as item (item.key)}<div
								class="mt-4 rounded-xl border bg-white/50 p-4"
							>
								<div class="mb-3 flex justify-between">
									<div><h3>{item.label}</h3><p class="text-xs font-normal text-gray-500">{item.sub}</p></div>
								</div>
								<div class="grid gap-3">
									<input
										aria-label="Fecha"
										bind:value={item.date}
										type="date"
										class="control"
									/><input
										aria-label="Estado"
										bind:value={item.status}
										class="control"
										placeholder="Estado"
									/><input
										aria-label="Observaciones"
										bind:value={item.notes}
										class="control"
										placeholder="Observaciones"
									/>
								</div>
							</div>{/each}
					</div>
					<div>
						{#each materializations as item, index (item.id)}<div
								class="mt-4 rounded-xl border bg-white/50 p-4"
							>
								<div class="mb-3 flex justify-between">
									<h3>Materialización {index + 1}</h3>
									<button
										type="button"
										class="text-sm text-red-600"
										on:click={() => removeMaterialization(item.id)}>Quitar</button
									>
								</div>
								<input
									aria-label="Fecha"
									bind:value={item.date}
									type="date"
									class="control"
								/><textarea
									aria-label="Descripción"
									bind:value={item.description}
									rows="2"
									class="control mt-3"
									placeholder="Descripción y consecuencias"
								></textarea>
							</div>{:else}<p class="mt-4 text-sm text-gray-500">
								No hay materializaciones.
							</p>{/each}<button type="button" class="action-button" on:click={addMaterialization}
							>+ Registrar materialización</button
						>
					</div>
				</div>
			</fieldset>
			<fieldset class="glass-3 rounded-xl p-6 sm:p-8">
				<div class="fieldset-title">10. Evidencias</div
				>{#each evidences as evidence, index (evidence.id)}<div
						class="mt-4 grid gap-3 rounded-xl border bg-white/50 p-4 md:grid-cols-3"
					>
						<input
							aria-label="Nombre"
							bind:value={evidence.name}
							class="control"
							placeholder="Nombre"
						/><input
							aria-label="Tipo"
							bind:value={evidence.type}
							class="control"
							placeholder="Tipo"
						/><select aria-label="Asociación" bind:value={evidence.relatedTo} class="control"
							><option value="">Asociada a</option><option>Control</option><option
								>Tratamiento</option
							><option>Seguimiento</option><option>Materialización</option></select
						><button
							type="button"
							class="text-left text-sm text-red-600 md:col-span-3"
							on:click={() => removeEvidence(evidence.id)}>Quitar evidencia {index + 1}</button
						>
					</div>{:else}<p class="mt-4 text-sm text-gray-500">
						No hay evidencias preparadas.
					</p>{/each}<button type="button" class="action-button" on:click={addEvidence}
					>+ Agregar evidencia</button
				>
			</fieldset>
			{/if}
			<div class="flex flex-wrap justify-end gap-3">
				{#if currentStep > 1}<button
					type="button"
					class="rounded-lg border border-gray-300 bg-white/60 px-5 py-2.5 text-sm font-semibold text-gray-700"
					on:click={goPrevious}>Anterior</button
				>{/if}{#if currentStep < 3}<button
					type="button"
					class="bg-primary rounded-lg px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
					on:click={goNext}>Siguiente</button
				>{:else}<button
					type="submit"
					class="bg-primary rounded-lg px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
					>Guardar riesgo</button
				>{/if}
			</div>
		</form>
	</div>
</main>

<style>
	.stepper {
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		gap: 0.75rem;
		margin-bottom: 1.5rem;
		border: 1px solid rgb(255 255 255 / 70%);
		border-radius: 0.75rem;
		background: rgb(255 255 255 / 52%);
		padding: 0.5rem;
		box-shadow: 0 6px 20px rgb(31 41 55 / 8%);
		backdrop-filter: blur(12px);
		-webkit-backdrop-filter: blur(12px);
	}
	.stepper button {
		display: flex;
		align-items: center;
		gap: 0.65rem;
		border-bottom: 2px solid rgb(209 213 219 / 70%);
		padding: 0.75rem 0.25rem;
		color: #6b7280;
		font-size: 0.875rem;
		font-weight: 600;
		text-align: left;
		transition: border-color 180ms ease, color 180ms ease;
	}
	.stepper button:hover:not(:disabled) { color: #1d4ed8; }
	.stepper button span {
		line-height: 1.25rem;
	}
	.stepper button:disabled {
		cursor: not-allowed;
		opacity: 0.55;
	}
	.stepper .step-active {
		border-bottom-color: #2563eb;
		color: #1d4ed8;
	}
	.stepper .step-complete {
		border-bottom-color: #2563eb;
		color: #2563eb;
	}
	@media (max-width: 640px) {
		.stepper { gap: 0.35rem; padding: 0.35rem; }
		.stepper button { display: grid; gap: 0.15rem; font-size: 0.75rem; }
	}
	:global(fieldset) {
		min-width: 0;
		padding-top: 1.5rem;
	}

	:global(.fieldset-title) {
		display: block !important;
		box-sizing: border-box;
		width: 100%;
		margin: 0 0 1.5rem;
		padding: 0;
		background: transparent;
		color: #111827;
		font-size: 1.25rem;
		font-weight: 600;
		line-height: 1.75rem;
	}

	:global(label) {
		display: block;
		color: #374151;
		font-size: 0.875rem;
		font-weight: 500;
	}
	:global(.field-hint) {
		display: block;
		box-sizing: border-box;
		height: 50px;
		margin-top: 0.25rem;
		color: #6b7280;
		font-size: 0.75rem;
		font-weight: 400;
		line-height: 1.25rem;
	}
	:global(.manual-toggle) {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		margin: 0 0 0.5rem;
		color: #4b5563;
		font-size: 0.75rem;
		font-weight: 500;
	}
	:global(.control) {
		margin-top: 0.5rem;
		width: 100%;
		border: 1px solid #d1d5db;
		border-radius: 0.5rem;
		background: rgb(255 255 255 / 70%);
		padding: 0.625rem 0.75rem;
	}
	:global(.pill) {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		margin-top: 0;
		border-radius: 9999px;
		padding: 0.5rem 1rem;
	}
	:global(.option-pill) {
		align-items: flex-start;
	}
	:global(.option-pill span) {
		display: flex;
		flex-direction: column;
		gap: 0.15rem;
	}
	:global(.option-pill small) {
		max-width: 17rem;
		color: #6b7280;
		font-size: 0.72rem;
		font-weight: 400;
		line-height: 1.25;
		text-transform: none;
	}
	.validation-toast {
		position: fixed;
		top: 9.5rem;
		left: 50%;
		z-index: 50;
		width: min(42rem, calc(100% - 2rem));
		transform: translateX(-50%);
		border-radius: 0.75rem;
		background: rgb(254 226 226 / 68%);
		padding: 0.75rem 1rem;
		box-shadow: 0 12px 30px rgb(127 29 29 / 24%);
		backdrop-filter: blur(8px);
		color: #991b1b;
		font-size: 0.875rem;
	}
	.save-toast {
		background: rgb(220 252 231 / 78%);
		color: #166534;
		backdrop-filter: blur(4px);
	}
	.save-toast .validation-close {
		color: #166534;
	}
	.save-toast .validation-close:hover {
		background: rgb(34 197 94 / 16%);
	}
	.validation-close {
		flex: 0 0 auto;
		border-radius: 0.375rem;
		padding: 0.125rem 0.375rem;
		color: #991b1b;
		font-size: 1.25rem;
		line-height: 1;
	}
	.validation-close:hover {
		background: rgb(239 68 68 / 16%);
	}
	:global(.action-button) {
		margin-top: 1.25rem;
		border: 1px solid #4b6bfb;
		border-radius: 0.5rem;
		padding: 0.625rem 1rem;
		color: #4b6bfb;
		font-size: 0.875rem;
		font-weight: 600;
	}
	:global(.summary-box) {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		border: 1px solid rgb(229 231 235 / 70%);
		border-radius: 0.75rem;
		background: rgb(255 255 255 / 50%);
		padding: 1rem;
		color: #6b7280;
		font-size: 0.75rem;
		text-transform: uppercase;
	}
	:global(.summary-box strong) {
		color: #1f2937;
		font-size: 1rem;
		text-transform: none;
	}
	:global(.summary-box.pending) {
		border-color: #fde68a;
		background: rgb(254 243 199 / 70%);
	}
	:global(.zone-card) { border-width: 1px; }
	:global(.zone-bajo) { border-color: rgb(34 197 94 / 45%); background: rgb(220 252 231 / 58%); }
	:global(.zone-moderado) { border-color: rgb(234 179 8 / 48%); background: rgb(254 249 195 / 62%); }
	:global(.zone-alto) { border-color: rgb(249 115 22 / 48%); background: rgb(255 237 213 / 62%); }
	:global(.zone-extremo) { border-color: rgb(239 68 68 / 52%); background: rgb(254 226 226 / 66%); }
	:global(.zone-card strong) { color: #374151; }
</style>
