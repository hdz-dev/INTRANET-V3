<script>
	let { children } = $props();

	const navigation = [
		['/', 'Vista general'],
		['/autodiagnosticos', 'Autodiagnósticos'],
		['/dimensiones', 'Dimensiones'],
		['/planes-accion', 'Planes de acción'],
		['/seguimiento', 'Seguimiento'],
		['/gestion-riesgos', 'Riesgos'],
		['/reportes', 'Reportes']
	];
</script>

<svelte:head><title>MIPG Nuevo | GIGA</title></svelte:head>

<div class="min-h-screen bg-slate-50/35">
	<div class="mx-auto max-w-7xl px-4 pt-6 sm:px-6 lg:px-10">
		<nav class="glass-3 rounded-xl p-2" aria-label="Navegación MIPG">
			<div class="flex gap-1 overflow-x-auto">
				{#each navigation as [href, label] (href)}
					<a href={`/mipg-nuevo${href}`} class="whitespace-nowrap rounded-lg px-3 py-2 text-xs font-semibold text-gray-600 transition hover:bg-white/80 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">{label}</a>
				{/each}
			</div>
		</nav>
	</div>
	{@render children()}
</div>
