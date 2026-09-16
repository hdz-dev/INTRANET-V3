<script>
	let { children } = $props();

	const navigation = [
		{ href: '/', label: 'Vista general', available: true },
		{ href: '/autodiagnosticos', label: 'Autodiagnósticos', available: true },
		{ href: '/dimensiones', label: 'Dimensiones', available: true },
		{ href: '/planes-accion', label: 'Planes de acción', available: true },
		{ href: '/seguimiento', label: 'Seguimiento', available: true },
		{ href: '/gestion-riesgos', label: 'Riesgos', available: true },
		{ href: '/reportes', label: 'Reportes', available: true }
	];
</script>

<svelte:head><title>MIPG Nuevo | GIGA</title></svelte:head>

<div class="min-h-screen bg-slate-50/35">
	<div class="mx-auto max-w-7xl px-4 pt-6 sm:px-6 lg:px-10">
		<nav class="glass-3 rounded-xl p-2" aria-label="Navegación MIPG">
			<div class="flex gap-1 overflow-x-auto">
				{#each navigation as item (item.href)}
					{#if item.available}<a
							href={`/mipg-nuevo${item.href}`}
							class="hover:text-primary focus-visible:ring-primary whitespace-nowrap rounded-lg px-3 py-2 text-xs font-semibold text-gray-600 transition hover:bg-white/80 focus-visible:outline-none focus-visible:ring-2"
							>{item.label}</a
						>
					{:else}<span
							class="whitespace-nowrap rounded-lg px-3 py-2 text-xs font-semibold text-gray-400"
							title="Disponible en una etapa posterior"
							aria-disabled="true">{item.label} · Próximamente</span
						>{/if}
				{/each}
			</div>
		</nav>
	</div>
	{@render children()}
</div>
