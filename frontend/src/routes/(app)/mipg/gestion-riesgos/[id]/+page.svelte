<script>
	import { onMount } from 'svelte';
	import { getRiskById, getStoredRisks } from '$lib/services/riesgosService.js';

	let { data } = $props();
	let risk = getRiskById(data.id);
	onMount(() => {
		risk = getStoredRisks().find((storedRisk) => storedRisk.id === data.id) || risk;
	});
</script>

<svelte:head>
	<title>{risk ? `${risk.codigo} | Gestión Integral de Riesgos` : 'Riesgo no encontrado | GIGA'}</title>
</svelte:head>

<main class="min-h-screen px-4 py-8 sm:px-6 lg:px-10">
	<div class="mx-auto max-w-5xl space-y-8">
		<nav aria-label="Ruta de navegación" class="text-sm text-gray-500">
			<a class="text-primary font-medium hover:underline" href="/mipg">MIPG</a>
			<span class="mx-2" aria-hidden="true">/</span>
			<a class="text-primary font-medium hover:underline" href="/mipg/gestion-riesgos">Riesgos</a>
			<span class="mx-2" aria-hidden="true">/</span>
			<span>{risk?.codigo || 'Detalle'}</span>
		</nav>

		{#if risk}
			<section class="glass-3 rounded-2xl p-6 sm:p-10">
				<div class="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
					<div>
						<p class="text-primary text-sm font-semibold tracking-[0.18em] uppercase">Detalle del riesgo</p>
						<h1 class="mt-2 font-mono text-2xl font-bold text-gray-900 sm:text-3xl">{risk.codigo}</h1>
						<p class="mt-3 max-w-3xl text-base leading-7 text-gray-600">{risk.descripcion}</p>
					</div>
					<span class="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">{risk.estado}</span>
				</div>
			</section>

			<section class="grid gap-6 sm:grid-cols-2 lg:grid-cols-4" aria-label="Resumen del riesgo">
				<div class="glass-3 rounded-xl p-5"><p class="text-xs font-medium text-gray-500">Proceso</p><p class="mt-2 text-sm font-semibold text-gray-800">{risk.proceso}</p></div>
				<div class="glass-3 rounded-xl p-5"><p class="text-xs font-medium text-gray-500">Tipología</p><p class="mt-2 text-sm font-semibold text-gray-800">{risk.tipologia}</p></div>
				<div class="glass-3 rounded-xl p-5"><p class="text-xs font-medium text-gray-500">Probabilidad</p><p class="mt-2 text-sm font-semibold text-gray-800">{risk.probabilidad}</p></div>
				<div class="glass-3 rounded-xl p-5"><p class="text-xs font-medium text-gray-500">Impacto</p><p class="mt-2 text-sm font-semibold text-gray-800">{risk.impacto}</p></div>
			</section>

			<section class="grid gap-6 lg:grid-cols-2">
				<div class="glass-3 rounded-xl p-6"><h2 class="text-xl font-semibold text-gray-900">Valoración</h2><div class={`zone-panel zone-${(risk.zona || '').toLowerCase()}`}><div><p class="text-xs font-semibold tracking-wide uppercase">Zona inherente referencial</p><p class="mt-2 text-2xl font-bold">{risk.zona}</p></div><span class="text-3xl" aria-hidden="true">◈</span></div><p class="mt-4 text-sm leading-6 text-gray-600">La zona inherente se presenta según la matriz de niveles vigente.</p></div>
				<div class="glass-3 rounded-xl p-6"><h2 class="text-xl font-semibold text-gray-900">Controles asociados</h2><div class="mt-5 flex items-center gap-4"><span class="bg-primary/10 text-primary flex h-14 w-14 items-center justify-center rounded-xl text-2xl font-bold">{risk.controles}</span><p class="text-sm leading-6 text-gray-600">controles registrados como referencia para este riesgo.</p></div><p class="mt-5 rounded-lg border border-dashed border-gray-300 px-4 py-4 text-sm text-gray-500">La gestión detallada se realiza desde la sección posterior del riesgo.</p></div>
			</section>
			<a href={`/mipg/gestion-riesgos/${data.id}/gestionar`} class="bg-primary inline-flex rounded-lg px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700">Gestionar controles, tratamiento y seguimiento</a>
		{:else}
			<section class="glass-3 rounded-2xl p-8 text-center"><h1 class="text-2xl font-bold text-gray-900">Riesgo no encontrado</h1><p class="mt-3 text-sm text-gray-600">El registro solicitado no está disponible en los datos de referencia.</p><a href="/mipg/gestion-riesgos" class="text-primary mt-6 inline-flex text-sm font-semibold hover:underline">Volver a riesgos</a></section>
		{/if}
	</div>
</main>

<style>
	:global(.zone-panel) { display: flex; align-items: center; justify-content: space-between; margin-top: 1.25rem; border: 1px solid; border-radius: .75rem; padding: 1.25rem; }
	:global(.zone-bajo) { border-color: rgb(34 197 94 / 45%); background: rgb(220 252 231 / 62%); color: #166534; }
	:global(.zone-moderado) { border-color: rgb(234 179 8 / 48%); background: rgb(254 249 195 / 66%); color: #854d0e; }
	:global(.zone-alto) { border-color: rgb(249 115 22 / 48%); background: rgb(255 237 213 / 66%); color: #9a3412; }
	:global(.zone-extremo) { border-color: rgb(239 68 68 / 52%); background: rgb(254 226 226 / 70%); color: #991b1b; }
</style>
