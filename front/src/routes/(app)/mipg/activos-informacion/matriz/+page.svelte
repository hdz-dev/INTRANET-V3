<script>
	import { onMount } from 'svelte';
	import { assetOptions, getStoredAssets } from '$lib/services/activosService.js';
	let assets = [];
	let search = '';
	let process = 'Todos';
	let type = 'Todos';
	let criticality = 'Todas';
	let status = 'Todos';
	onMount(() => (assets = getStoredAssets()));
	$: filtered = assets.filter((asset) => {
		const text =
			`${asset.identifier} ${asset.name} ${asset.description} ${asset.process} ${asset.dependency}`.toLowerCase();
		return (
			(!search || text.includes(search.trim().toLowerCase())) &&
			(process === 'Todos' || asset.process === process) &&
			(type === 'Todos' || asset.type === type) &&
			(criticality === 'Todas' || asset.criticality === criticality) &&
			(status === 'Todos' || asset.status === status)
		);
	});
	function exportCsv() {
		const headers = [
			'Proceso',
			'Subproceso',
			'Identificador',
			'Tipo',
			'Dependencia',
			'Nombre',
			'Cantidad',
			'Descripción',
			'Propietario',
			'Custodio',
			'Medio de conservación',
			'Formato',
			'Confidencialidad',
			'Integridad',
			'Disponibilidad',
			'Criticidad',
			'Información publicada',
			'Lugar de consulta',
			'Datos personales',
			'Datos de menores',
			'Tipos de datos personales',
			'Finalidad',
			'Estado'
		];
		const rows = filtered.map((asset) => [
			asset.process,
			asset.subProcess,
			asset.identifier,
			asset.type,
			asset.dependency,
			asset.name,
			asset.quantity,
			asset.description,
			asset.owner,
			asset.custodian,
			asset.medium,
			asset.format,
			asset.confidentiality,
			asset.integrity,
			asset.availability,
			asset.criticality,
			asset.publication,
			asset.location,
			asset.containsPersonalData,
			asset.containsMinors,
			asset.personalDataTypes?.join(', '),
			asset.personalDataPurpose,
			asset.status
		]);
		const csv = [headers, ...rows]
			.map((row) => row.map((value) => `"${String(value ?? '').replaceAll('"', '""')}"`).join(','))
			.join('\n');
		const link = document.createElement('a');
		link.href = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' }));
		link.download = 'matriz-activos-informacion.csv';
		link.click();
		URL.revokeObjectURL(link.href);
	}
</script>

<svelte:head><title>Matriz de activos de información | GIGA</title></svelte:head>
<main class="min-h-screen px-4 py-8 sm:px-6 lg:px-10">
	<div class="mx-auto max-w-[1800px] space-y-8">
		<nav class="text-sm text-gray-500">
			<a class="text-primary font-medium" href="/mipg/activos-informacion">Activos de información</a
			><span class="mx-2">/</span><span>Matriz</span>
		</nav>
		<section class="glass-3 rounded-2xl p-6 sm:p-10">
			<div class="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
				<div>
					<p class="text-primary text-sm font-semibold tracking-[0.18em] uppercase">
						Consulta consolidada
					</p>
					<h1 class="mt-3 text-3xl font-bold text-gray-900">Matriz de activos de información</h1>
					<p class="mt-3 text-gray-600">
						{filtered.length} de {assets.length} activos registrados.
					</p>
				</div>
				<div class="flex gap-3">
					<button class="button-secondary" type="button" on:click={exportCsv}>Exportar CSV</button
					><a class="button-primary" href="/mipg/activos-informacion/nuevo">Nuevo activo</a>
				</div>
			</div>
		</section>
		<section class="glass-3 rounded-xl p-6 sm:p-8">
			<div class="grid gap-3 md:grid-cols-5">
				<input
					aria-label="Buscar activos"
					bind:value={search}
					class="control"
					placeholder="Buscar por código, nombre o proceso"
				/><select aria-label="Filtrar proceso" bind:value={process} class="control"
						><option>Todos</option>{#each assetOptions.processes as item (item)}<option>{item}</option
						>{/each}</select
				><select aria-label="Filtrar tipo" bind:value={type} class="control"
						><option>Todos</option>{#each assetOptions.types as item (item)}<option>{item}</option
						>{/each}</select
				><select aria-label="Filtrar criticidad" bind:value={criticality} class="control"
						><option>Todas</option>{#each assetOptions.criticalities as item (item)}<option>{item}</option
						>{/each}</select
				><select aria-label="Filtrar estado" bind:value={status} class="control"
					><option>Todos</option><option>ACTIVO</option><option>INACTIVO</option></select
				>
			</div>
			<div class="mt-6 overflow-x-auto rounded-lg border border-gray-200/70">
				<table class="min-w-[1800px] divide-y divide-gray-200/70 text-left text-sm">
					<thead class="sticky top-0 z-10 bg-gray-50 text-xs tracking-wide text-gray-500 uppercase"
						><tr
							><th class="sticky left-0 bg-gray-50 px-3 py-3">Identificador</th><th
								class="px-3 py-3">Proceso</th
							><th class="px-3 py-3">Subproceso</th><th class="px-3 py-3">Tipo</th><th
								class="px-3 py-3">Dependencia</th
							><th class="px-3 py-3">Nombre</th><th class="px-3 py-3">Cantidad</th><th
								class="px-3 py-3">Medio</th
							><th class="px-3 py-3">Formato</th><th class="px-3 py-3">Confidencialidad</th><th
								class="px-3 py-3">Integridad</th
							><th class="px-3 py-3">Disponibilidad</th><th class="px-3 py-3">Criticidad</th><th
								class="px-3 py-3">Datos personales</th
							><th class="px-3 py-3">Estado</th><th class="px-3 py-3">Acciones</th></tr
						></thead
					><tbody class="divide-y divide-gray-200/70 bg-white/30"
						>{#each filtered as asset (asset.id)}<tr class="hover:bg-white/60"
								><td
									class="text-primary sticky left-0 bg-white/90 px-3 py-3 font-mono text-xs font-semibold"
									>{asset.identifier}</td
								><td class="px-3 py-3">{asset.process}</td><td class="px-3 py-3"
									>{asset.subProcess}</td
								><td class="px-3 py-3">{asset.type}</td><td class="px-3 py-3">{asset.dependency}</td
								><td class="px-3 py-3 font-medium">{asset.name}</td><td class="px-3 py-3"
									>{asset.quantity}</td
								><td class="px-3 py-3">{asset.medium}</td><td class="px-3 py-3">{asset.format}</td
								><td class="px-3 py-3">{asset.confidentiality}</td><td class="px-3 py-3"
									>{asset.integrity}</td
								><td class="px-3 py-3">{asset.availability}</td><td class="px-3 py-3"
									>{asset.criticality}</td
								><td class="px-3 py-3">{asset.containsPersonalData || 'No definido'}</td><td
									class="px-3 py-3">{asset.status}</td
								><td class="px-3 py-3 whitespace-nowrap"
									><a
										class="text-primary font-semibold hover:underline"
										href={`/mipg/activos-informacion/nuevo?edit=${asset.id}`}>Editar</a
									></td
								></tr
							>{:else}<tr
								><td colspan="16" class="px-4 py-10 text-center text-gray-500"
									>No hay activos que coincidan con los filtros.</td
								></tr
							>{/each}</tbody
					>
				</table>
			</div>
		</section>
	</div>
</main>

<style>
	.control {
		width: 100%;
		border: 1px solid #d1d5db;
		border-radius: 0.5rem;
		background: rgb(255 255 255/0.7);
		padding: 0.625rem 0.75rem;
		font-size: 0.875rem;
	}
	.button-primary,
	.button-secondary {
		border-radius: 0.5rem;
		padding: 0.65rem 1rem;
		font-size: 0.875rem;
		font-weight: 600;
	}
	.button-primary {
		background: #1d4ed8;
		color: white;
	}
	.button-secondary {
		border: 1px solid #d1d5db;
		background: rgb(255 255 255/0.7);
		color: #374151;
	}
</style>
