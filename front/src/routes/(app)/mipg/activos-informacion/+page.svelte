<script>
	import { onMount } from 'svelte';
	import { getStoredAssets } from '$lib/services/activosService.js';

	let assets = [];
	onMount(() => (assets = getStoredAssets()));
	$: highCriticality = assets.filter((asset) => asset.criticality === 'ALTA').length;
	$: classified = assets.filter(
		(asset) => asset.confidentiality === 'Información pública clasificada'
	).length;
	$: personalData = assets.filter((asset) => asset.containsPersonalData === 'Sí').length;
	$: minorsData = assets.filter((asset) => asset.containsMinors === 'Sí').length;
</script>

<svelte:head
	><title>Activos de información | MIPG</title><meta
		name="description"
		content="Inventario institucional de activos de información."
	/></svelte:head
>
<main class="min-h-screen px-4 py-8 sm:px-6 lg:px-10">
	<div class="mx-auto max-w-7xl space-y-8">
		<nav aria-label="Ruta de navegación" class="text-sm text-gray-500">
			<a href="/mipg" class="text-primary font-medium hover:underline">MIPG</a><span class="mx-2"
				>/</span
			><span>Activos de información</span>
		</nav>
		<section class="glass-3 rounded-2xl p-6 sm:p-10">
			<p class="text-primary text-sm font-semibold tracking-[0.18em] uppercase">
				Inventario institucional
			</p>
			<div class="mt-3 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
				<div>
					<h1 class="text-3xl font-bold text-gray-900 sm:text-4xl">Activos de información</h1>
					<p class="mt-3 max-w-2xl text-base leading-7 text-gray-600">
						Registra, clasifica y consulta los activos que soportan la información institucional.
					</p>
				</div>
				<div class="flex gap-3">
					<a
						href="/mipg/activos-informacion/matriz"
						class="rounded-lg border border-gray-300 bg-white/60 px-4 py-2.5 text-sm font-semibold text-gray-700"
						>Ver matriz</a
					><a
						href="/mipg/activos-informacion/nuevo"
						class="bg-primary rounded-lg px-4 py-2.5 text-sm font-semibold text-white"
						>Nuevo activo</a
					>
				</div>
			</div>
		</section>
		<section class="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
			<div class="metric"><span>Total</span><strong>{assets.length}</strong></div>
			<div class="metric"><span>Criticidad alta</span><strong>{highCriticality}</strong></div>
			<div class="metric"><span>Clasificados</span><strong>{classified}</strong></div>
			<div class="metric"><span>Datos personales</span><strong>{personalData}</strong></div>
			<div class="metric"><span>Datos de menores</span><strong>{minorsData}</strong></div>
		</section>
		<section class="glass-3 rounded-xl p-6 sm:p-8">
			<h2 class="text-xl font-semibold text-gray-900">Ruta funcional</h2>
			<div class="mt-5 grid gap-3 sm:grid-cols-3">
				<a class="route-link" href="/mipg/activos-informacion/nuevo">1. Registrar activo</a><a
					class="route-link"
					href="/mipg/activos-informacion/matriz">2. Consultar matriz</a
				><span class="route-link opacity-60">3. Relacionar con riesgos de información</span>
			</div>
		</section>
	</div>
</main>

<style>
	.metric {
		border: 1px solid rgb(209 213 219/0.7);
		border-radius: 0.75rem;
		background: rgb(255 255 255/0.55);
		padding: 1rem 1.25rem;
	}
	.metric span {
		display: block;
		color: #6b7280;
		font-size: 0.75rem;
	}
	.metric strong {
		display: block;
		margin-top: 0.5rem;
		color: #111827;
		font-size: 1.75rem;
	}
	.route-link {
		display: block;
		border: 1px solid rgb(209 213 219/0.7);
		border-radius: 0.5rem;
		background: rgb(255 255 255/0.5);
		padding: 1rem;
		font-size: 0.875rem;
		font-weight: 600;
		color: #374151;
	}
</style>
