<script>
	import RiskLabBadge from '../components/RiskLabBadge.svelte';

	let exportOpen = $state(false);
	let output = $state('Excel institucional completo');
	const indicators = [
		{ label: 'Matriz institucional', value: '22', detail: 'riesgos publicados', tone: 'blue' },
		{ label: 'Zona residual alta', value: '5', detail: 'requieren seguimiento', tone: 'orange' },
		{ label: 'Controles valorados', value: '86%', detail: 'del inventario activo', tone: 'green' },
		{ label: 'Cortes publicados', value: '3', detail: 'vigencia 2026', tone: 'violet' }
	];
</script>

<svelte:head><title>Reportes | Riesgos Lab</title></svelte:head>
<main class="px-4 py-8 sm:px-6 lg:px-10">
	<div class="mx-auto max-w-7xl space-y-6">
		<section class="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
			<div>
				<p class="text-xs font-bold uppercase tracking-[0.18em] text-blue-700">
					Reportes e indicadores
				</p>
				<h1 class="mt-2 text-3xl font-bold tracking-tight text-slate-950">Lectura institucional</h1>
				<p class="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
					Explora cortes aprobados y prepara una exportación con los filtros aplicados. Todos los
					valores son sintéticos.
				</p>
			</div>
			<button
				type="button"
				class="rounded-xl bg-blue-700 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-800"
				onclick={() => (exportOpen = true)}>Configurar exportación</button
			>
		</section>
		<section class="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
			{#each indicators as indicator (indicator.label)}<div class="glass-3 rounded-2xl p-5">
					<p class="text-sm font-semibold text-slate-600">{indicator.label}</p>
					<p class="mt-3 text-3xl font-bold text-slate-950">{indicator.value}</p>
					<p class="mt-1 text-xs text-slate-500">{indicator.detail}</p>
				</div>{/each}
		</section>
		<section class="grid gap-6 lg:grid-cols-[1fr_0.8fr]">
			<div class="glass-3 rounded-2xl p-6">
				<div class="flex items-center justify-between">
					<div>
						<h2 class="text-xl font-bold text-slate-950">Panorama por zona residual</h2>
						<p class="mt-1 text-sm text-slate-500">Riesgos publicados en la vigencia 2026.</p>
					</div>
					<RiskLabBadge tone="blue">Corte actual</RiskLabBadge>
				</div>
				<div class="mt-6 space-y-5">
					{#each [{ label: 'Bajo', value: 6, width: 28, color: 'bg-emerald-500' }, { label: 'Moderado', value: 8, width: 38, color: 'bg-amber-500' }, { label: 'Alto', value: 5, width: 24, color: 'bg-orange-500' }, { label: 'Extremo', value: 3, width: 14, color: 'bg-red-500' }] as item (item.label)}<div
						>
							<div class="flex justify-between text-sm">
								<span class="font-semibold text-slate-700">{item.label}</span><span
									class="text-slate-500">{item.value}</span
								>
							</div>
							<div class="mt-2 h-2 rounded-full bg-slate-100">
								<div class={`h-2 rounded-full ${item.color}`} style={`width:${item.width}%`}></div>
							</div>
						</div>{/each}
				</div>
			</div>
			<div class="rounded-2xl border border-blue-100 bg-blue-50/70 p-6">
				<p class="text-xs font-bold uppercase tracking-[0.18em] text-blue-700">Publicación</p>
				<h2 class="mt-2 text-xl font-bold text-slate-950">Vista previa del corte</h2>
				<p class="mt-2 text-sm leading-6 text-slate-600">
					Verifica qué se publicará antes de descargar: solo matrices publicadas, sin IDs,
					auditoría, activos o evidencias restringidas.
				</p>
				<a
					href="/mipg-nuevo/gestion-riesgos/reportes/preview"
					class="mt-5 inline-flex rounded-xl border border-blue-200 bg-white px-4 py-2.5 text-sm font-semibold text-blue-700 hover:bg-blue-50"
					>Abrir vista previa</a
				>
			</div>
		</section>
	</div>
</main>

{#if exportOpen}<div
		class="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/30 p-4"
		role="presentation"
		onclick={(event) => event.currentTarget === event.target && (exportOpen = false)}
	>
		<section
			class="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl"
			role="dialog"
			aria-modal="true"
			aria-label="Configurar exportación"
		>
			<div class="flex items-start justify-between">
				<div>
					<p class="text-xs font-bold uppercase tracking-wider text-blue-700">Exportación</p>
					<h2 class="mt-2 text-xl font-bold text-slate-950">Configura tu archivo</h2>
				</div>
				<button
					type="button"
					class="text-xl text-slate-500"
					aria-label="Cerrar"
					onclick={() => (exportOpen = false)}>×</button
				>
			</div>
			<div class="mt-5 space-y-4">
				<label class="block text-sm font-semibold text-slate-700"
					>Salida<select
						bind:value={output}
						class="mt-2 w-full rounded-xl border border-slate-200 px-3 py-3 text-sm"
						><option>Excel institucional completo</option><option>Excel para publicación</option
						></select
					></label
				><label class="block text-sm font-semibold text-slate-700"
					>Vigencia<select class="mt-2 w-full rounded-xl border border-slate-200 px-3 py-3 text-sm"
						><option>2026</option><option>2025</option></select
					></label
				>
				<div class="rounded-xl bg-slate-50 p-4 text-xs leading-5 text-slate-600">
					Se registrará quién genera el archivo, la fecha, el tipo de salida y los filtros
					aplicados.
				</div>
			</div>
			<div class="mt-5 flex justify-end gap-3">
				<button
					type="button"
					class="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700"
					onclick={() => (exportOpen = false)}>Cancelar</button
				><button
					type="button"
					class="rounded-xl bg-blue-700 px-4 py-2.5 text-sm font-semibold text-white"
					onclick={() => (exportOpen = false)}>Preparar {output}</button
				>
			</div>
		</section>
	</div>{/if}
