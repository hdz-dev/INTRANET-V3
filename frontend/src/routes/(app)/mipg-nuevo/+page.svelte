<script>
	import { mipgAlerts, mipgDimensions, mipgMetrics, mipgTasks } from '$lib/mipg-new-data.js';
	import DrawerBase from './components/DrawerBase.svelte';

	let selectedTask = $state(null);
	let drawerOpen = $state(false);
</script>

<main class="px-4 py-8 sm:px-6 lg:px-10">
	<div class="mx-auto max-w-7xl space-y-6">
		<section class="glass-3 relative overflow-hidden rounded-2xl p-6 sm:p-8">
			<div
				class="absolute inset-y-0 right-0 hidden w-2/5 bg-gradient-to-l from-blue-100/70 to-transparent lg:block"
			></div>
			<div class="relative max-w-2xl">
				<p class="text-primary text-xs font-bold uppercase tracking-[0.2em]">
					Modelo Integrado de Planeación y Gestión
				</p>
				<h1 class="mt-2 text-3xl font-bold text-gray-900 sm:text-4xl">MIPG</h1>
				<p class="mt-3 text-sm leading-6 text-gray-600">
					Vista general del avance institucional, dimensiones, políticas y tareas prioritarias.
				</p>
			</div>
		</section>

		<section class="grid gap-4 sm:grid-cols-2 xl:grid-cols-4" aria-label="Indicadores generales">
			{#each mipgMetrics as metric (metric.label)}<article class="glass-3 rounded-xl p-5">
					<p class="text-xs font-medium text-gray-500">{metric.label}</p>
					<p class="mt-2 text-2xl font-bold text-gray-900">{metric.value}</p>
					<p class="mt-1 text-xs text-gray-500">{metric.detail}</p>
				</article>{/each}
		</section>

		<section class="grid gap-6 xl:grid-cols-[1.35fr_0.65fr]">
			<div class="glass-3 rounded-xl p-6">
				<div class="flex items-center justify-between">
					<div>
						<h2 class="text-xl font-semibold text-gray-900">Dimensiones de MIPG</h2>
						<p class="mt-1 text-sm text-gray-500">Explora el avance de cada dimensión.</p>
					</div>
					<span class="text-xs text-gray-500">Vista inicial</span>
				</div>
				<div class="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
					{#each mipgDimensions as dimension (dimension.id)}<article
							class="rounded-xl border border-gray-200/70 bg-white/55 p-4"
						>
							<div class="flex items-center justify-between">
								<span class="text-xs font-semibold text-gray-500">{dimension.code}</span><span
									class="text-sm font-bold text-gray-800">{dimension.progress}%</span
								>
							</div>
							<h3 class="mt-3 text-sm font-semibold text-gray-900">{dimension.name}</h3>
							<div class="mt-3 h-2 rounded-full bg-gray-200">
								<div
									class="h-2 rounded-full bg-emerald-500"
									style={`width: ${dimension.progress}%`}
								></div>
							</div>
							<p class="mt-2 text-xs text-gray-500">{dimension.policies} políticas asociadas</p>
						</article>{/each}
				</div>
			</div>
			<aside class="space-y-6">
				<section class="glass-3 rounded-xl p-6">
					<h2 class="text-lg font-semibold text-gray-900">Acciones rápidas</h2>
					<div class="mt-4 grid gap-2">
						<span class="rounded-lg bg-blue-50 px-4 py-3 text-sm font-semibold text-blue-700"
							>Autodiagnósticos · Próximamente</span
						><span class="rounded-lg bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700"
							>Planes de acción · Próximamente</span
						><a
							href="/mipg/gestion-riesgos/nuevo"
							class="rounded-lg bg-violet-50 px-4 py-3 text-sm font-semibold text-violet-700 hover:bg-violet-100"
							>Nuevo riesgo</a
						>
					</div>
				</section>
				<section class="glass-3 rounded-xl p-6">
					<h2 class="text-lg font-semibold text-gray-900">Mis tareas</h2>
					<div class="mt-4 space-y-3">
						{#each mipgTasks.slice(0, 3) as task (task.title)}<button
								type="button"
								class="block w-full border-b border-gray-200/70 pb-3 text-left last:border-0 hover:bg-white/60"
								onclick={() => {
									selectedTask = task;
									drawerOpen = true;
								}}
								><p class="text-sm font-semibold text-gray-800">{task.title}</p>
								<p class="mt-1 text-xs text-gray-500">{task.owner} · {task.due}</p></button
							>{/each}
					</div>
				</section>
			</aside>
		</section>

		<section class="glass-3 rounded-xl p-6">
			<div class="flex items-center justify-between">
				<div>
					<h2 class="text-xl font-semibold text-gray-900">Alertas y novedades</h2>
					<p class="mt-1 text-sm text-gray-500">Información que requiere atención.</p>
				</div>
				<span class="text-xs text-gray-500">Vista inicial</span>
			</div>
			<div class="mt-5 grid gap-3 md:grid-cols-3">
				{#each mipgAlerts as alert (alert.title)}<div
						class="rounded-lg border border-gray-200/70 bg-white/55 p-4"
					>
						<p class="text-sm font-semibold text-gray-800">{alert.title}</p>
						<p class="mt-1 text-xs text-gray-500">{alert.detail}</p>
					</div>{/each}
			</div>
		</section>
	</div>
</main>

<DrawerBase bind:open={drawerOpen} title={selectedTask?.title || 'Detalle de tarea'}>
	{#if selectedTask}<p class="text-xs font-semibold uppercase tracking-wide text-gray-500">
			Tarea MIPG
		</p>
		<p class="mt-3 text-sm leading-6 text-gray-600">
			Esta tarea está preparada para conectar posteriormente con su fuente real de seguimiento.
		</p>
		<dl class="mt-6 space-y-4 text-sm">
			<div>
				<dt class="text-xs text-gray-500">Responsable</dt>
				<dd class="mt-1 font-semibold text-gray-800">{selectedTask.owner}</dd>
			</div>
			<div>
				<dt class="text-xs text-gray-500">Fecha</dt>
				<dd class="mt-1 font-semibold text-gray-800">{selectedTask.due}</dd>
			</div>
			<div>
				<dt class="text-xs text-gray-500">Estado</dt>
				<dd class="mt-1 font-semibold text-orange-700">{selectedTask.state}</dd>
			</div>
		</dl>{/if}
</DrawerBase>
