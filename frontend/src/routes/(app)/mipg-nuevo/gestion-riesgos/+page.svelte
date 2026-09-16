<script>
	import RiskLabBadge from './components/RiskLabBadge.svelte';
	import RiskLabZone from './components/RiskLabZone.svelte';
	import { riskLabMatrices, riskLabSummary, riskLabTasks } from '$lib/risk-lab-data.js';

	const statusTone = {
		'En elaboración': 'blue',
		'En revisión': 'orange',
		Publicada: 'green',
		'Listo para revisión': 'blue'
	};
	const activity = [
		{
			title: 'Se actualizó el riesgo R-GIC-SIN-001',
			detail: 'Laura Méndez · hace 18 minutos',
			tone: 'blue'
		},
		{
			title: 'La matriz de Gestión Financiera pasó a revisión',
			detail: 'Andrés Rojas · ayer, 16:10',
			tone: 'orange'
		},
		{
			title: 'Se publicó la matriz de Talento Humano',
			detail: 'Camila Torres · 12 sep 2026',
			tone: 'green'
		}
	];
</script>

<svelte:head><title>Centro de trabajo | Riesgos Lab</title></svelte:head>

<main class="px-4 py-8 sm:px-6 lg:px-10">
	<div class="mx-auto max-w-7xl space-y-6">
		<section
			class="relative overflow-hidden rounded-3xl bg-slate-950 px-6 py-7 text-white shadow-xl sm:px-8"
		>
			<div class="absolute -right-16 -top-24 h-64 w-64 rounded-full bg-blue-500/20 blur-3xl"></div>
			<div class="relative flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
				<div>
					<div class="flex flex-wrap items-center gap-2 text-xs font-semibold text-slate-300">
						<span class="rounded-full bg-white/10 px-3 py-1 text-blue-200">AMBIENTE DE PRUEBA</span>
						<span>Gestión Integral de Riesgos alternativa</span>
					</div>
					<h1 class="mt-4 max-w-2xl text-3xl font-bold tracking-tight sm:text-4xl">
						Tu próxima decisión, en un solo lugar.
					</h1>
					<p class="mt-3 max-w-xl text-sm leading-6 text-slate-300">
						Centro de trabajo para elaborar, revisar y publicar matrices por proceso sin salir del
						contexto de la vigencia actual.
					</p>
				</div>
				<div class="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur">
					<p class="text-xs font-semibold uppercase tracking-wider text-slate-400">
						Contexto actual
					</p>
					<p class="mt-2 font-semibold">Gestión de la Información y las Comunicaciones</p>
					<p class="mt-1 text-sm text-slate-300">
						Vigencia 2026 · Matriz v2 · Responsable: Laura Méndez
					</p>
				</div>
			</div>
		</section>

		<section class="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
			{#each riskLabSummary as metric (metric.label)}
				<div class="glass-3 rounded-2xl p-5">
					<div class="flex items-start justify-between gap-4">
						<p class="text-sm font-semibold text-slate-600">{metric.label}</p>
						<span
							class={`h-2.5 w-2.5 rounded-full ${metric.tone === 'red' ? 'bg-red-500' : metric.tone === 'orange' ? 'bg-orange-500' : metric.tone === 'green' ? 'bg-emerald-500' : 'bg-blue-500'}`}
						></span>
					</div>
					<p class="mt-3 text-3xl font-bold text-slate-950">{metric.value}</p>
					<p class="mt-1 text-xs text-slate-500">{metric.detail}</p>
				</div>
			{/each}
		</section>

		<section class="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
			<div class="glass-3 rounded-2xl p-6">
				<div class="flex items-start justify-between gap-4">
					<div>
						<p class="text-xs font-bold uppercase tracking-[0.18em] text-blue-700">
							Continuar donde quedaste
						</p>
						<h2 class="mt-2 text-xl font-bold text-slate-950">Completa la clasificación CIA</h2>
						<p class="mt-2 max-w-xl text-sm leading-6 text-slate-600">
							El riesgo de seguridad digital tiene activos relacionados, pero necesita confirmar las
							propiedades afectadas antes de enviarse a revisión.
						</p>
					</div>
					<RiskLabZone zone="Alto" />
				</div>
				<div class="mt-6 flex flex-wrap items-center gap-3">
					<a
						href="/mipg-nuevo/gestion-riesgos/matrices/matriz-2026-tic/riesgos/RL-001"
						class="rounded-xl bg-blue-700 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
						>Continuar riesgo</a
					><a
						href="/mipg-nuevo/gestion-riesgos/matrices/matriz-2026-tic"
						class="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
						>Ver matriz</a
					>
				</div>
			</div>
			<div class="rounded-2xl border border-blue-100 bg-blue-50/70 p-6">
				<p class="text-xs font-bold uppercase tracking-[0.18em] text-blue-700">Próxima acción</p>
				<h2 class="mt-2 text-xl font-bold text-slate-950">Publicar no es el primer paso</h2>
				<p class="mt-2 text-sm leading-6 text-slate-600">
					La matriz avanza cuando cada riesgo tiene información suficiente, controles relacionados y
					una revisión trazable.
				</p>
				<ol class="mt-5 space-y-3 text-sm text-slate-700">
					<li class="flex gap-3">
						<span
							class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-700 text-xs font-bold text-white"
							>1</span
						><span>Completa el riesgo y sus activos.</span>
					</li>
					<li class="flex gap-3">
						<span
							class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-700 text-xs font-bold text-white"
							>2</span
						><span>Envía la matriz a segunda línea.</span>
					</li>
					<li class="flex gap-3">
						<span
							class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-700 text-xs font-bold text-white"
							>3</span
						><span>Publica el corte aprobado.</span>
					</li>
				</ol>
			</div>
		</section>

		<section class="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
			<div class="glass-3 rounded-2xl p-6">
				<div class="flex items-center justify-between">
					<div>
						<h2 class="text-xl font-bold text-slate-950">Actividades prioritarias</h2>
						<p class="mt-1 text-sm text-slate-500">Lo que requiere tu atención primero.</p>
					</div>
					<a
						class="text-sm font-semibold text-blue-700 hover:text-blue-900"
						href="/mipg-nuevo/gestion-riesgos/seguimientos">Ver todas</a
					>
				</div>
				<div class="mt-5 divide-y divide-slate-200/70">
					{#each riskLabTasks as task (task.label)}<a
							href={task.href}
							class="flex items-center justify-between gap-4 py-4 first:pt-0 last:pb-0"
							><div class="flex min-w-0 items-center gap-3">
								<span
									class={`h-2.5 w-2.5 shrink-0 rounded-full ${task.tone === 'red' ? 'bg-red-500' : task.tone === 'orange' ? 'bg-orange-500' : 'bg-blue-500'}`}
								></span>
								<div class="min-w-0">
									<p class="truncate text-sm font-semibold text-slate-800">{task.label}</p>
									<p class="mt-1 truncate text-xs text-slate-500">{task.context}</p>
								</div>
							</div>
							<span class="shrink-0 text-xs font-semibold text-slate-500">{task.due}</span></a
						>{/each}
				</div>
			</div>
			<div class="glass-3 rounded-2xl p-6">
				<div class="flex items-center justify-between">
					<div>
						<h2 class="text-xl font-bold text-slate-950">Actividad reciente</h2>
						<p class="mt-1 text-sm text-slate-500">Trazabilidad del trabajo del equipo.</p>
					</div>
					<a
						class="text-sm font-semibold text-blue-700 hover:text-blue-900"
						href="/mipg-nuevo/gestion-riesgos/matrices">Matrices</a
					>
				</div>
				<div class="mt-5 space-y-4">
					{#each activity as item (item.title)}<div class="flex gap-3">
							<span
								class={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${item.tone === 'green' ? 'bg-emerald-500' : item.tone === 'orange' ? 'bg-orange-500' : 'bg-blue-500'}`}
							></span>
							<div>
								<p class="text-sm font-semibold text-slate-800">{item.title}</p>
								<p class="mt-1 text-xs text-slate-500">{item.detail}</p>
							</div>
						</div>{/each}
				</div>
			</div>
		</section>

		<section class="glass-3 rounded-2xl p-6">
			<div class="flex items-end justify-between gap-4">
				<div>
					<p class="text-xs font-bold uppercase tracking-[0.18em] text-blue-700">
						Matrices activas
					</p>
					<h2 class="mt-2 text-xl font-bold text-slate-950">Elige un espacio de trabajo</h2>
				</div>
				<a
					href="/mipg-nuevo/gestion-riesgos/matrices"
					class="hidden text-sm font-semibold text-blue-700 sm:block">Ver matriz institucional</a
				>
			</div>
			<div class="mt-5 grid gap-3 md:grid-cols-3">
				{#each riskLabMatrices as matrix (matrix.id)}<a
						href={`/mipg-nuevo/gestion-riesgos/matrices/${matrix.id}`}
						class="rounded-xl border border-slate-200 bg-white/70 p-4 transition hover:-translate-y-0.5 hover:border-blue-300 hover:shadow-md"
						><div class="flex items-start justify-between gap-3">
							<p class="text-sm font-bold text-slate-900">{matrix.process}</p>
							<RiskLabBadge tone={statusTone[matrix.status]}>{matrix.status}</RiskLabBadge>
						</div>
						<p class="mt-3 text-xs text-slate-500">
							{matrix.validity} · {matrix.version} · {matrix.riskCount} riesgos
						</p>
						<div class="mt-4 h-1.5 rounded-full bg-slate-100">
							<div class="h-1.5 rounded-full bg-blue-600" style={`width:${matrix.progress}%`}></div>
						</div></a
					>{/each}
			</div>
		</section>
	</div>
</main>
