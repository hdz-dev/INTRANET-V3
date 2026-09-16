<script>
	import { mipgReports } from '$lib/mipg-new-data.js';

	let periodFilter = $state('2026');
	let scopeFilter = $state('INSTITUCIONAL');

	const reportRows = [
		{ dimension: 'Talento Humano', progress: 85, policies: 3, status: 'En meta' },
		{
			dimension: 'Direccionamiento Estratégico',
			progress: 70,
			policies: 3,
			status: 'En seguimiento'
		},
		{ dimension: 'Gestión con Valores', progress: 65, policies: 4, status: 'En seguimiento' },
		{ dimension: 'Evaluación de Resultados', progress: 75, policies: 2, status: 'En meta' },
		{
			dimension: 'Información y Comunicación',
			progress: 60,
			policies: 3,
			status: 'En seguimiento'
		},
		{
			dimension: 'Gestión del Conocimiento',
			progress: 55,
			policies: 2,
			status: 'Requiere atención'
		},
		{ dimension: 'Control Interno', progress: 78, policies: 2, status: 'En meta' }
	];
</script>

<svelte:head><title>Reportes | MIPG Nuevo</title></svelte:head>

<main class="px-4 py-8 sm:px-6 lg:px-10">
	<div class="mx-auto max-w-7xl space-y-6">
		<section class="glass-3 rounded-2xl p-6 sm:p-8">
			<div class="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
				<div>
					<p class="text-primary text-xs font-bold uppercase tracking-[0.2em]">MIPG</p>
					<h1 class="mt-2 text-3xl font-bold text-gray-900">Reportes</h1>
					<p class="mt-2 max-w-2xl text-sm leading-6 text-gray-600">
						Consulta indicadores consolidados para revisar el avance institucional y orientar la
						toma de decisiones.
					</p>
				</div>
				<div class="flex flex-col gap-3 sm:flex-row">
					<label class="text-xs font-semibold text-gray-600"
						>Vigencia<select
							bind:value={periodFilter}
							class="focus:border-primary focus:ring-primary/25 mt-1 block rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm font-normal shadow-sm focus:outline-none focus:ring-2"
							><option value="2026">2026</option><option value="2025">2025</option></select
						></label
					>
					<label class="text-xs font-semibold text-gray-600"
						>Alcance<select
							bind:value={scopeFilter}
							class="focus:border-primary focus:ring-primary/25 mt-1 block rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm font-normal shadow-sm focus:outline-none focus:ring-2"
							><option value="INSTITUCIONAL">Institucional</option><option value="DIMENSIONES"
								>Por dimensión</option
							></select
						></label
					>
				</div>
			</div>
		</section>

		<section class="grid gap-4 sm:grid-cols-2 xl:grid-cols-4" aria-label="Indicadores del reporte">
			{#each mipgReports as report (report.label)}
				<article class="glass-3 rounded-xl p-5">
					<p class="text-xs font-medium text-gray-500">{report.label}</p>
					<p class="mt-2 text-2xl font-bold text-gray-900">{report.value}</p>
					<p class="mt-1 text-xs text-gray-500">{report.detail}</p>
				</article>
			{/each}
		</section>

		<section class="glass-3 overflow-x-auto rounded-xl p-3 sm:p-4">
			<div class="flex items-center justify-between gap-4 px-4 py-3">
				<div>
					<h2 class="text-xl font-semibold text-gray-900">Avance por dimensión</h2>
					<p class="mt-1 text-sm text-gray-500">
						Vigencia {periodFilter} · alcance {scopeFilter === 'INSTITUCIONAL'
							? 'institucional'
							: 'por dimensión'}
					</p>
				</div>
				<span
					class="hidden rounded-lg bg-blue-50 px-3 py-2 text-xs font-semibold text-blue-700 sm:inline-flex"
					>Datos consolidados</span
				>
			</div>
			<table
				class="w-full min-w-[700px] border-collapse text-sm [&_tbody_tr:hover]:bg-white/45 [&_tbody_tr]:border-t [&_tbody_tr]:border-gray-200/70 [&_td]:px-4 [&_td]:py-4 [&_th]:px-4 [&_th]:py-3"
			>
				<thead
					><tr class="text-left text-xs uppercase tracking-wide text-gray-500"
						><th>Dimensión</th><th>Políticas</th><th>Avance</th><th>Estado</th></tr
					></thead
				>
				<tbody
					>{#each reportRows as row (row.dimension)}<tr
							><td class="font-semibold text-gray-900">{row.dimension}</td><td class="text-gray-600"
								>{row.policies}</td
							><td
								><div class="flex items-center gap-2">
									<div class="h-2 w-28 rounded-full bg-gray-200">
										<div
											class="h-2 rounded-full bg-emerald-500"
											style={`width: ${row.progress}%`}
										></div>
									</div>
									<span class="text-xs text-gray-500">{row.progress}%</span>
								</div></td
							><td
								><span
									class="rounded-full px-2 py-1 text-xs font-semibold"
									class:bg-emerald-100={row.status === 'En meta'}
									class:text-emerald-700={row.status === 'En meta'}
									class:bg-amber-100={row.status === 'En seguimiento'}
									class:text-amber-700={row.status === 'En seguimiento'}
									class:bg-red-100={row.status === 'Requiere atención'}
									class:text-red-700={row.status === 'Requiere atención'}>{row.status}</span
								></td
							></tr
						>{/each}</tbody
				>
			</table>
		</section>
	</div>
</main>
