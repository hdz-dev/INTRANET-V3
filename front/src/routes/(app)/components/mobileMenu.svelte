<script>
	export let activeSection;
	export let navigateTo;

	const menuItems = [
		{ id: 'home', label: 'Inicio', icon: 'fa-home' },
		{ id: 'documentation', label: 'Documentación', icon: 'fa-file-alt' },
		{ id: 'knowledge', label: 'Base de Conocimiento', icon: 'fa-book' },
		{ id: 'training', label: 'Capacitación', icon: 'fa-graduation-cap' },
		{ id: 'projects', label: 'Proyectos', icon: 'fa-project-diagram' },
		{ id: 'forum', label: 'Foro', icon: 'fa-comments' }
	];
</script>

<div class="fixed inset-0 z-40 md:hidden">
	<!-- Fondo oscuro -->
	<div class="bg-opacity-75 absolute inset-0 bg-gray-600 backdrop-blur-sm"></div>

	<!-- Panel de navegación -->
	<nav
		id="mobile-navigation"
		aria-label="Navegación principal móvil"
		class="relative h-full w-64 bg-white"
	>
		<div class="h-full overflow-y-auto px-4 py-6">
			<!-- Encabezado del menú -->
			<div class="mb-8 flex items-center justify-between">
				<h2 class="text-lg font-bold text-gray-900">Menú Principal</h2>
			</div>

			<!-- Lista de enlaces -->
			<div class="space-y-1">
				{#each menuItems as item (item.id)}
					<button
						class="flex w-full items-center rounded-lg px-4 py-2 text-left text-sm font-medium {activeSection ===
						item.id
							? 'bg-primary text-white'
							: 'text-gray-700 hover:bg-gray-50'}"
						on:click={() => navigateTo(item.id)}
					>
						<i class="fas {item.icon} mr-3 h-5 w-5"></i>
						{item.label}
					</button>
				{/each}
			</div>

			<!-- Pie del menú -->
			<div class="mt-8 border-t border-gray-200 pt-8">
				<div class="space-y-1">
					<button
						class="flex w-full items-center rounded-lg px-4 py-2 text-left text-sm font-medium text-gray-700 hover:bg-gray-50"
					>
						<i class="fas fa-cog mr-3 h-5 w-5"></i>
						Configuración
					</button>
					<button
						class="flex w-full items-center rounded-lg px-4 py-2 text-left text-sm font-medium text-red-600 hover:bg-gray-50"
					>
						<i class="fas fa-sign-out-alt mr-3 h-5 w-5"></i>
						Cerrar Sesión
					</button>
				</div>
			</div>
		</div>
	</nav>
</div>
