<script>
	import { deleteStoredRisk, getRiskSamples, getStoredRisks } from '$lib/services/riesgosService.js';
	import { onMount } from 'svelte';

	let risks = getRiskSamples();
	let selectedType = 'Todas';
	let selectedZone = 'Todas';
	let selectedStatus = 'Todos';
	let search = '';
	const types = ['Gestión', 'Fiscal', 'Seguridad de la Información', 'Integridad Pública', 'LA/FT'];
	const zones = ['Bajo', 'Moderado', 'Alto', 'Extremo'];
	const statuses = ['Activo', 'Inactivo'];
	onMount(() => {
		risks = [...risks, ...getStoredRisks()];
	});
	function removeRisk(risk) {
		if (!window.confirm(`¿Quieres eliminar el riesgo ${risk.codigo}? Esta acción no se puede deshacer.`)) return;
		deleteStoredRisk(risk.id);
		risks = risks.filter((item) => item.id !== risk.id);
	}

	$: filteredRisks = risks.filter((risk) => {
		const query = search.trim().toLowerCase();
		const status = risk.estado || 'Activo';
		return (
			(selectedType === 'Todas' || risk.tipologia === selectedType) &&
			(selectedZone === 'Todas' || risk.zona === selectedZone) &&
			(selectedStatus === 'Todos' || status === selectedStatus) &&
			(!query || `${risk.codigo} ${risk.proceso} ${risk.descripcion}`.toLowerCase().includes(query))
		);
	});
</script>

<svelte:head>
	<title>Matriz de riesgos | MIPG</title>
	<meta name="description" content="Matriz consolidada de riesgos institucionales de GIGA." />
</svelte:head>

<main class="min-h-screen px-4 py-8 sm:px-6 lg:px-10">
	<div class="mx-auto max-w-7xl space-y-8">
		<nav aria-label="Ruta de navegación" class="text-sm text-gray-500">
			<a href="/mipg" class="text-primary font-medium hover:underline">MIPG</a><span
				class="mx-2"
				aria-hidden="true">/</span
			><a href="/mipg/gestion-riesgos" class="text-primary font-medium hover:underline">Riesgos</a
			><span class="mx-2" aria-hidden="true">/</span><span>Matriz</span>
		</nav>
		<section class="glass-3 rounded-2xl p-6 sm:p-10">
			<p class="text-primary text-sm font-semibold tracking-[0.18em] uppercase">
				Consulta consolidada
			</p>
			<div class="mt-2 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
				<div>
					<h1 class="text-3xl font-bold text-gray-900 sm:text-4xl">Matriz de riesgos</h1>
					<p class="mt-3 max-w-2xl text-base leading-7 text-gray-600">
						Vista de referencia construida desde registros normalizados. La matriz no reemplaza el
						formulario de captura.
					</p>
				</div>
				<a
					href="/mipg/gestion-riesgos/nuevo"
					class="bg-primary inline-flex items-center rounded-lg px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
					>Nuevo riesgo <span class="ml-2" aria-hidden="true">+</span></a
				>
			</div>
		</section>
		<section class="glass-3 rounded-xl p-6 sm:p-8" aria-labelledby="matrix-title">
			<div class="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
				<div>
					<h2 id="matrix-title" class="text-xl font-semibold text-gray-900">Registros</h2>
					<p class="mt-1 text-sm text-gray-600">
						{filteredRisks.length} de {risks.length} riesgos de referencia
					</p>
				</div>
				<div class="flex flex-col gap-3 sm:flex-row">
					<label class="sr-only" for="matrix-search">Buscar riesgos</label><input
						id="matrix-search"
						bind:value={search}
						type="search"
						placeholder="Código, proceso o descripción"
						class="focus:border-primary focus:ring-primary/20 rounded-lg border border-gray-300 bg-white/70 px-3 py-2 text-sm focus:ring-2 focus:outline-none"
					/><label class="sr-only" for="matrix-type">Filtrar tipología</label><select
						id="matrix-type"
						bind:value={selectedType}
						class="rounded-lg border border-gray-300 bg-white/70 px-3 py-2 text-sm"
						><option>Todas</option>{#each types as type (type)}<option>{type}</option
							>{/each}</select
					><label class="sr-only" for="matrix-zone">Filtrar zona</label><select
						id="matrix-zone"
						bind:value={selectedZone}
						class="rounded-lg border border-gray-300 bg-white/70 px-3 py-2 text-sm"
						><option>Todas</option>{#each zones as zone (zone)}<option>{zone}</option
							>{/each}</select
					><label class="sr-only" for="matrix-status">Filtrar estado</label><select
						id="matrix-status"
						bind:value={selectedStatus}
						class="rounded-lg border border-gray-300 bg-white/70 px-3 py-2 text-sm"
						><option>Todos</option>{#each statuses as status (status)}<option>{status}</option
							>{/each}</select
					>
				</div>
			</div>
			<div class="mt-6 overflow-x-auto rounded-lg border border-gray-200/70">
				<table class="min-w-full divide-y divide-gray-200/70 text-left text-sm">
					<thead class="bg-gray-50/80 text-xs tracking-wide text-gray-500 uppercase"
						><tr
							><th class="px-4 py-3">Código</th><th class="px-4 py-3">Proceso</th><th
								class="px-4 py-3">Tipología</th
							><th class="px-4 py-3">Probabilidad</th><th class="px-4 py-3">Impacto</th><th
								class="px-4 py-3">Zona</th
							><th class="px-4 py-3">Estado</th><th class="px-4 py-3">Acción</th></tr
						></thead
					><tbody class="divide-y divide-gray-200/70 bg-white/30"
						>{#each filteredRisks as risk (risk.id)}<tr class="hover:bg-white/60"
								><td
									class="text-primary px-4 py-4 font-mono text-xs font-semibold whitespace-nowrap"
									>{risk.codigo}</td
								><td class="min-w-56 px-4 py-4 text-gray-700">{risk.proceso}</td><td
									class="px-4 py-4 whitespace-nowrap text-gray-600">{risk.tipologia}</td
								><td class="px-4 py-4 whitespace-nowrap text-gray-600">{risk.probabilidad}</td><td
									class="px-4 py-4 whitespace-nowrap text-gray-600">{risk.impacto}</td
								><td class="px-4 py-4 whitespace-nowrap"
									><span
										class={`zone-badge zone-${(risk.zona || '').toLowerCase()}`}
										>{risk.zona}</span
									></td
								><td class="px-4 py-4 whitespace-nowrap text-gray-600">{risk.estado || 'Activo'}</td
								><td class="px-4 py-4 whitespace-nowrap"
									><a
										href={`/mipg/gestion-riesgos/${risk.id}`}
										class="text-primary text-xs font-semibold hover:underline">Ver detalle</a>
									{#if risk.form}<a
										href={`/mipg/gestion-riesgos/nuevo?edit=${risk.id}`}
										class="text-primary ml-3 text-xs font-semibold hover:underline">Editar</a
									><button
										type="button"
										class="ml-3 text-xs font-semibold text-red-600 hover:underline"
										on:click={() => removeRisk(risk)}>Eliminar</button
									>{/if}</td
								></tr
							>{:else}<tr
								><td colspan="8" class="px-4 py-10 text-center text-sm text-gray-500"
									>No hay riesgos que coincidan con los filtros.</td
								></tr
							>{/each}</tbody
					>
				</table>
			</div>
		</section>
		<div>
			<a href="/mipg/gestion-riesgos" class="text-primary text-sm font-semibold hover:underline"
				>← Volver a Gestión Integral de Riesgos</a
			>
		</div>
	</div>
</main>

<style>
	:global(.zone-badge) { display: inline-flex; border: 1px solid; border-radius: 9999px; padding: .3rem .65rem; font-size: .75rem; font-weight: 700; }
	:global(.zone-bajo) { border-color: rgb(34 197 94 / 45%); background: rgb(220 252 231 / 68%); color: #166534; }
	:global(.zone-moderado) { border-color: rgb(234 179 8 / 48%); background: rgb(254 249 195 / 72%); color: #854d0e; }
	:global(.zone-alto) { border-color: rgb(249 115 22 / 48%); background: rgb(255 237 213 / 72%); color: #9a3412; }
	:global(.zone-extremo) { border-color: rgb(239 68 68 / 52%); background: rgb(254 226 226 / 76%); color: #991b1b; }
</style>
