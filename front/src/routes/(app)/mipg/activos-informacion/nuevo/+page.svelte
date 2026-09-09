<script>
	import {
		assetOptions,
		getAssetById,
		nextAssetIdentifier,
		saveStoredAsset
	} from '$lib/services/activosService.js';
	import { onMount } from 'svelte';
	let editingId = '';
	let errors = [];
	let saved = false;
	let form = blankAsset();
	function blankAsset() {
		return {
			identifier: nextAssetIdentifier(),
			documentCode: '',
			process: '',
			subProcess: '',
			dependency: '',
			type: '',
			name: '',
			quantity: 1,
			description: '',
			series: '',
			subseries: '',
			owner: '',
			generationDate: '',
			custodian: '',
			archiveDate: '',
			medium: '',
			format: '',
			confidentiality: '',
			integrity: '',
			availability: '',
			criticality: '',
			publication: '',
			location: '',
			locationDetail: '',
			exceptionObject: '',
			constitutionalBasis: '',
			legalBasis: '',
			exceptionScope: '',
			classificationDate: '',
			classificationTime: '',
			classificationUnit: 'AÑOS',
			containsPersonalData: '',
			containsMinors: '',
			personalDataTypes: [],
			personalDataPurpose: '',
			treatmentAuthorization: '',
			status: 'ACTIVO'
		};
	}
	onMount(() => {
		const id = new URLSearchParams(window.location.search).get('edit');
		const asset = id && getAssetById(id);
		if (asset) {
			editingId = asset.id;
			form = asset;
		}
	});
	$: requiresException =
		form.confidentiality === 'Información pública clasificada' ||
		form.confidentiality === 'Información pública reservada';
	function toggle(value) {
		form.personalDataTypes = form.personalDataTypes.includes(value)
			? form.personalDataTypes.filter((item) => item !== value)
			: [...form.personalDataTypes, value];
	}
	function validate() {
		const result = [];
		for (const [field, label] of [
			['process', 'Proceso'],
			['type', 'Tipo'],
			['name', 'Nombre'],
			['dependency', 'Dependencia'],
			['owner', 'Propietario'],
			['custodian', 'Custodio'],
			['medium', 'Medio de conservación'],
			['format', 'Formato'],
			['confidentiality', 'Confidencialidad'],
			['integrity', 'Integridad'],
			['availability', 'Disponibilidad'],
			['criticality', 'Criticidad']
		])
			if (!String(form[field] || '').trim()) result.push(`Completa ${label.toLowerCase()}.`);
		if (!Number.isInteger(Number(form.quantity)) || Number(form.quantity) < 1)
			result.push('La cantidad debe ser un entero mayor o igual a 1.');
		if (requiresException && !form.exceptionScope)
			result.push('Selecciona si la excepción es total o parcial.');
		if (form.containsPersonalData === 'Sí' && !form.personalDataPurpose.trim())
			result.push('Indica la finalidad de la recolección de datos personales.');
		return result;
	}
	function submit() {
		errors = validate();
		if (errors.length) return;
		saveStoredAsset({
			...form,
			id: editingId || crypto.randomUUID(),
			quantity: Number(form.quantity)
		});
		saved = true;
	}
</script>

<svelte:head
	><title>{editingId ? 'Editar' : 'Nuevo'} activo de información | GIGA</title></svelte:head
>
<main class="min-h-screen px-4 py-8 sm:px-6 lg:px-10">
	<div class="mx-auto max-w-6xl space-y-8">
		<nav class="text-sm text-gray-500">
			<a class="text-primary font-medium" href="/mipg/activos-informacion">Activos de información</a
			><span class="mx-2">/</span><span>{editingId ? 'Editar' : 'Nuevo'}</span>
		</nav>
		<section class="glass-3 rounded-2xl p-6 sm:p-10">
			<p class="text-primary text-sm font-semibold tracking-[0.18em] uppercase">
				Inventario institucional
			</p>
			<h1 class="mt-3 text-3xl font-bold text-gray-900">
				{editingId ? 'Editar activo' : 'Registrar activo de información'}
			</h1>
			<p class="mt-3 text-gray-600">
				Completa la ficha estructurada del activo y sus condiciones de seguridad.
			</p>
		</section>
		{#if errors.length}<div
				role="alert"
				class="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800"
			>
				<ul class="list-disc space-y-1 pl-5">
					{#each errors as error (error)}<li>{error}</li>{/each}
				</ul>
			</div>{/if}{#if saved}<div
				role="status"
				class="rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-800"
			>
				Activo guardado localmente. Puedes consultarlo en la matriz.
			</div>{/if}
		<form class="space-y-6" on:submit|preventDefault={submit}>
			<fieldset>
				<h2>1. Ubicación institucional</h2>
				<div class="grid gap-4 md:grid-cols-3">
					<label
						>Proceso<select bind:value={form.process} class="control"
							><option value="">Selecciona</option>{#each assetOptions.processes as item (item)}<option
									>{item}</option
								>{/each}</select
						></label
					><label>Subproceso<input bind:value={form.subProcess} class="control" /></label><label
						>Dependencia<input required bind:value={form.dependency} class="control" /></label
					>
				</div>
			</fieldset>
			<fieldset>
				<h2>2. Identificación del activo</h2>
				<div class="grid gap-4 md:grid-cols-3">
					<label>Identificador<input value={form.identifier} readonly class="control" /></label
					><label
						>Tipo<select bind:value={form.type} class="control"
							><option value="">Selecciona</option>{#each assetOptions.types as item (item)}<option
									>{item}</option
								>{/each}</select
						></label
					><label>Nombre<input bind:value={form.name} class="control" /></label><label
						>Cantidad<input
							type="number"
							min="1"
							step="1"
							bind:value={form.quantity}
							class="control"
						/></label
					><label class="md:col-span-2"
						>Código del sistema de gestión documental<input
							bind:value={form.documentCode}
							class="control"
						/></label
					><label class="md:col-span-3"
						>Descripción<textarea bind:value={form.description} class="control"></textarea></label
					>
				</div>
			</fieldset>
			<fieldset>
				<h2>3. Gestión documental, propiedad y custodia</h2>
				<div class="grid gap-4 md:grid-cols-3">
					<label>Serie documental<input bind:value={form.series} class="control" /></label><label
						>Subserie documental<input bind:value={form.subseries} class="control" /></label
					><label>Propietario / cargo<input bind:value={form.owner} class="control" /></label><label
						>Fecha de generación<input
							type="date"
							bind:value={form.generationDate}
							class="control"
						/></label
					><label>Custodio / cargo<input bind:value={form.custodian} class="control" /></label
					><label
						>Fecha de ingreso al archivo<input
							type="date"
							bind:value={form.archiveDate}
							class="control"
						/></label
					>
				</div>
			</fieldset>
			<fieldset>
				<h2>4. Conservación y formato</h2>
				<div class="grid gap-4 md:grid-cols-2">
					<label
						>Medio de conservación<select bind:value={form.medium} class="control"
							><option value="">Selecciona</option>{#each assetOptions.mediums as item (item)}<option
									>{item}</option
								>{/each}</select
						></label
					><label
						>Formato<select bind:value={form.format} class="control"
							><option value="">Selecciona</option>{#each assetOptions.formats as item (item)}<option
									>{item}</option
								>{/each}</select
						></label
					>
				</div>
			</fieldset>
			<fieldset>
				<h2>5. Clasificación y seguridad</h2>
				<div class="grid gap-4 md:grid-cols-3">
					<label
						>Confidencialidad<select bind:value={form.confidentiality} class="control"
							><option value="">Selecciona</option
							>{#each assetOptions.confidentialities as item (item)}<option>{item}</option>{/each}</select
						></label
					><label
						>Integridad<select bind:value={form.integrity} class="control"
							><option value="">Selecciona</option>{#each assetOptions.levels as item (item)}<option
									>{item}</option
								>{/each}</select
						></label
					><label
						>Disponibilidad<select bind:value={form.availability} class="control"
							><option value="">Selecciona</option>{#each assetOptions.levels as item (item)}<option
									>{item}</option
								>{/each}</select
						></label
					><label
						>Criticidad<select bind:value={form.criticality} class="control"
							><option value="">Selecciona</option>{#each assetOptions.criticalities as item (item)}<option
									>{item}</option
								>{/each}</select
						></label
					>
				</div>
			</fieldset>
			<fieldset>
				<h2>6. Publicación y excepción</h2>
				<div class="grid gap-4 md:grid-cols-2">
					<label
						>Información publicada<select bind:value={form.publication} class="control"
							><option value="">Selecciona</option
							>{#each assetOptions.publicationStatuses as item (item)}<option>{item}</option
								>{/each}</select
						></label
					><label
						>Lugar de consulta<select bind:value={form.location} class="control"
							><option value="">Selecciona</option>{#each assetOptions.locations as item (item)}<option
									>{item}</option
								>{/each}</select
						></label
					><label class="md:col-span-2"
						>Detalle de ubicación<input bind:value={form.locationDetail} class="control" /></label
					>{#if requiresException}<label
							>Objeto legítimo de la excepción<input
								bind:value={form.exceptionObject}
								class="control"
							/></label
						><label
							>Fundamento constitucional o legal<input
								bind:value={form.constitutionalBasis}
								class="control"
							/></label
						><label>Fundamento jurídico<input bind:value={form.legalBasis} class="control" /></label
						><label
							>Excepción<select bind:value={form.exceptionScope} class="control"
								><option value="">Selecciona</option><option>TOTAL</option><option>PARCIAL</option
								></select
							></label
						><label
							>Fecha de clasificación<input
								type="date"
								bind:value={form.classificationDate}
								class="control"
							/></label
						><label
							>Tiempo de clasificación<input
								type="number"
								min="1"
								bind:value={form.classificationTime}
								class="control"
							/></label
						><label
							>Unidad<select bind:value={form.classificationUnit} class="control"
								><option>DÍAS</option><option>MESES</option><option>AÑOS</option></select
							></label
						>{/if}
				</div>
			</fieldset>
			<fieldset>
				<h2>7. Datos personales</h2>
				<label
					>¿Contiene datos personales?<select bind:value={form.containsPersonalData} class="control"
						><option value="">Selecciona</option><option>Sí</option><option>No</option></select
					></label
				>{#if form.containsPersonalData === 'Sí'}<div class="mt-4 grid gap-4 md:grid-cols-2">
						<label
							>¿Contiene datos de niños, niñas o adolescentes?<select
								bind:value={form.containsMinors}
								class="control"
								><option value="">Selecciona</option><option>Sí</option><option>No</option></select
							></label
						>
						<div>
							<p class="text-sm font-medium">Tipos de datos personales</p>
							<div class="mt-2 flex flex-wrap gap-2">
								{#each assetOptions.personalDataTypes as item (item)}<label class="pill"
										><input
											type="checkbox"
											checked={form.personalDataTypes.includes(item)}
											on:change={() => toggle(item)}
										/>{item}</label
									>{/each}
							</div>
						</div>
						<label class="md:col-span-2"
							>Finalidad de la recolección<textarea
								bind:value={form.personalDataPurpose}
								class="control"
							></textarea></label
						><label
							>Autorización para tratamiento<select
								bind:value={form.treatmentAuthorization}
								class="control"
								><option value="">Selecciona</option><option>Sí</option><option>No</option><option
									>No aplica</option
								></select
							></label
						>
					</div>{/if}
			</fieldset>
			<div class="flex justify-end gap-3">
				<a href="/mipg/activos-informacion" class="button-secondary">Cancelar</a><button
					class="button-primary"
					type="submit">Guardar activo</button
				>
			</div>
		</form>
	</div>
</main>

<style>
	fieldset {
		border-radius: 0.75rem;
		border: 1px solid rgb(209 213 219/0.7);
		background: rgb(255 255 255/0.42);
		padding: 1.5rem;
	}
	fieldset h2 {
		margin-bottom: 1.25rem;
		font-size: 1.1rem;
		font-weight: 600;
		color: #111827;
	}
	.control {
		margin-top: 0.4rem;
		width: 100%;
		border: 1px solid #d1d5db;
		border-radius: 0.5rem;
		background: rgb(255 255 255/0.7);
		padding: 0.625rem 0.75rem;
	}
	.pill {
		display: inline-flex;
		align-items: center;
		gap: 0.4rem;
		border-radius: 999px;
		background: rgb(255 255 255/0.7);
		padding: 0.45rem 0.7rem;
		font-size: 0.8rem;
	}
	.button-primary {
		border-radius: 0.5rem;
		background: #1d4ed8;
		padding: 0.65rem 1rem;
		color: white;
		font-size: 0.875rem;
		font-weight: 600;
	}
	.button-secondary {
		border-radius: 0.5rem;
		border: 1px solid #d1d5db;
		background: rgb(255 255 255/0.7);
		padding: 0.65rem 1rem;
		color: #374151;
		font-size: 0.875rem;
		font-weight: 600;
	}
</style>
