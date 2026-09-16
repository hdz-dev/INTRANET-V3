<script>
	import { mipgAlerts, mipgTasks } from '$lib/mipg-new-data.js';
	import DrawerBase from '../components/DrawerBase.svelte';

	let stateFilter = $state('ALL');
	let selectedTask = $state(null);
	let drawerOpen = $state(false);

	let filteredTasks = $derived(
		mipgTasks.filter((task) => stateFilter === 'ALL' || task.state === stateFilter)
	);

	const states = ['Urgente', 'En curso', 'Pendiente'];
	const urgentCount = mipgTasks.filter((task) => task.state === 'Urgente').length;
	const activeCount = mipgTasks.filter((task) => task.state === 'En curso').length;
	const pendingCount = mipgTasks.filter((task) => task.state === 'Pendiente').length;

	function openTask(task) {
		selectedTask = task;
		drawerOpen = true;
	}
</script>

<svelte:head><title>Seguimiento | MIPG Nuevo</title></svelte:head>

<main class="px-4 py-8 sm:px-6 lg:px-10">
	<div class="mx-auto max-w-7xl space-y-6">
		<section class="glass-3 rounded-2xl p-6 sm:p-8">
			<div class="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
				<div>
					<p class="text-primary text-xs font-bold uppercase tracking-[0.2em]">MIPG</p>
					<h1 class="mt-2 text-3xl font-bold text-gray-900">Seguimiento</h1>
					<p class="mt-2 max-w-2xl text-sm leading-6 text-gray-600">Centraliza pendientes, tareas prioritarias y alertas que requieren revisión institucional.</p>
				</div>
				<label class="text-xs font-semibold text-gray-600">Estado<select bind:value={stateFilter} class="mt-1 block w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm font-normal shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/25"><option value="ALL">Todos los estados</option>{#each states as state (state)}<option value={state}>{state}</option>{/each}</select></label>
			</div>
			<div class="mt-6 grid gap-3 sm:grid-cols-3">
				<div class="rounded-xl border border-red-100 bg-red-50/70 p-4"><p class="text-xs font-semibold uppercase tracking-wide text-red-700">Urgentes</p><p class="mt-2 text-2xl font-bold text-gray-900">{urgentCount}</p><p class="mt-1 text-xs text-gray-500">Atención inmediata</p></div>
				<div class="rounded-xl border border-blue-100 bg-blue-50/70 p-4"><p class="text-xs font-semibold uppercase tracking-wide text-blue-700">En curso</p><p class="mt-2 text-2xl font-bold text-gray-900">{activeCount}</p><p class="mt-1 text-xs text-gray-500">Con actividad abierta</p></div>
				<div class="rounded-xl border border-amber-100 bg-amber-50/70 p-4"><p class="text-xs font-semibold uppercase tracking-wide text-amber-700">Pendientes</p><p class="mt-2 text-2xl font-bold text-gray-900">{pendingCount}</p><p class="mt-1 text-xs text-gray-500">Por iniciar</p></div>
			</div>
		</section>

		<section class="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
			<div class="glass-3 rounded-xl p-6">
				<div class="flex items-center justify-between gap-4"><div><h2 class="text-xl font-semibold text-gray-900">Pendientes de seguimiento</h2><p class="mt-1 text-sm text-gray-500">Selecciona una tarea para consultar su contexto.</p></div><span class="text-xs text-gray-500">{filteredTasks.length} resultados</span></div>
				<div class="mt-5 space-y-3">
					{#if filteredTasks.length === 0}<p class="rounded-xl border border-dashed border-gray-300 p-8 text-center text-sm text-gray-500">No hay pendientes con este estado.</p>
					{:else}{#each filteredTasks as task (task.title)}<button type="button" class="block w-full rounded-xl border border-gray-200/70 bg-white/55 p-4 text-left transition hover:bg-white/85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" onclick={() => openTask(task)}><div class="flex items-start justify-between gap-3"><div><p class="text-sm font-semibold text-gray-900">{task.title}</p><p class="mt-1 text-xs text-gray-500">{task.owner}</p></div><span class="rounded-full px-2 py-1 text-xs font-semibold" class:bg-red-100={task.state === 'Urgente'} class:text-red-700={task.state === 'Urgente'} class:bg-blue-100={task.state === 'En curso'} class:text-blue-700={task.state === 'En curso'} class:bg-amber-100={task.state === 'Pendiente'} class:text-amber-700={task.state === 'Pendiente'}>{task.state}</span></div><p class="mt-3 text-xs text-gray-500">Fecha objetivo: {task.due}</p></button>{/each}{/if}
				</div>
			</div>

			<aside class="glass-3 rounded-xl p-6"><h2 class="text-xl font-semibold text-gray-900">Alertas de revisión</h2><p class="mt-1 text-sm text-gray-500">Novedades que pueden requerir una acción.</p><div class="mt-5 space-y-3">{#each mipgAlerts as alert (alert.title)}<article class="rounded-xl border border-gray-200/70 bg-white/55 p-4"><p class="text-sm font-semibold text-gray-900">{alert.title}</p><p class="mt-1 text-xs leading-5 text-gray-500">{alert.detail}</p></article>{/each}</div></aside>
		</section>
	</div>
</main>

<DrawerBase bind:open={drawerOpen} title={selectedTask?.title || 'Detalle de seguimiento'}>
	{#if selectedTask}
		<p class="text-xs font-semibold uppercase tracking-wide text-gray-500">Pendiente MIPG</p>
		<p class="mt-3 text-sm leading-6 text-gray-600">Consulta la información disponible antes de actualizar el seguimiento de esta tarea.</p>
		<dl class="mt-6 space-y-4 text-sm"><div><dt class="text-xs text-gray-500">Responsable</dt><dd class="mt-1 font-semibold text-gray-800">{selectedTask.owner}</dd></div><div><dt class="text-xs text-gray-500">Estado</dt><dd class="mt-1 font-semibold text-gray-800">{selectedTask.state}</dd></div><div><dt class="text-xs text-gray-500">Fecha objetivo</dt><dd class="mt-1 font-semibold text-gray-800">{selectedTask.due}</dd></div></dl>
	{/if}
</DrawerBase>
