<script>
	import { onMount } from 'svelte';
	import { getAssetById } from '$lib/services/activosService.js';
	let { data } = $props();
	let asset;
	onMount(() => (asset = getAssetById(data.id)));
	const fields = [
		['Proceso', 'process'], ['Subproceso', 'subProcess'], ['Dependencia', 'dependency'], ['Tipo', 'type'], ['Cantidad', 'quantity'],
		['Propietario', 'owner'], ['Custodio', 'custodian'], ['Medio de conservación', 'medium'], ['Formato', 'format'],
		['Confidencialidad', 'confidentiality'], ['Integridad', 'integrity'], ['Disponibilidad', 'availability'], ['Criticidad', 'criticality'],
		['Publicación', 'publication'], ['Lugar de consulta', 'location'], ['Datos personales', 'containsPersonalData'], ['Estado', 'status']
	];
</script>
<svelte:head><title>{asset?.identifier || 'Activo'} | Activos de información</title></svelte:head>
<main class="min-h-screen px-4 py-8 sm:px-6 lg:px-10"><div class="mx-auto max-w-5xl space-y-8"><nav class="text-sm text-gray-500"><a class="text-primary font-medium" href="/mipg/activos-informacion/matriz">Matriz de activos</a><span class="mx-2">/</span><span>{asset?.identifier || 'Detalle'}</span></nav>{#if asset}<section class="glass-3 rounded-2xl p-6 sm:p-10"><p class="text-primary text-sm font-semibold tracking-[0.18em] uppercase">Consulta individual</p><div class="mt-3 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between"><div><h1 class="font-mono text-3xl font-bold text-gray-900">{asset.identifier}</h1><p class="mt-2 text-xl font-semibold text-gray-800">{asset.name}</p><p class="mt-3 text-gray-600">{asset.description || 'Sin descripción registrada.'}</p></div><span class="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">{asset.status}</span></div></section><section class="glass-3 rounded-xl p-6 sm:p-8"><h2 class="text-xl font-semibold text-gray-900">Ficha del activo</h2><dl class="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{#each fields as field (field[1])}<div class="rounded-lg border border-gray-200/70 bg-white/50 p-4"><dt class="text-xs text-gray-500">{field[0]}</dt><dd class="mt-1 text-sm font-semibold text-gray-800">{asset[field[1]] || 'No registrado'}</dd></div>{/each}</dl></section><div class="flex gap-3"><a class="button-secondary" href="/mipg/activos-informacion/matriz">Volver a matriz</a><a class="button-primary" href={`/mipg/activos-informacion/nuevo?edit=${asset.id}`}>Editar activo</a></div>{:else}<section class="glass-3 rounded-xl p-8 text-center"><h1 class="text-2xl font-bold text-gray-900">Activo no encontrado</h1><a class="text-primary mt-5 inline-flex font-semibold" href="/mipg/activos-informacion/matriz">Volver a matriz</a></section>{/if}</div></main>
<style>.button-primary,.button-secondary{border-radius:.5rem;padding:.65rem 1rem;font-size:.875rem;font-weight:600}.button-primary{background:#1d4ed8;color:white}.button-secondary{border:1px solid #d1d5db;background:rgb(255 255 255/.7);color:#374151}</style>
