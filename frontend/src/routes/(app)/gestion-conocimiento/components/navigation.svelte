<script>
	export let activeSection;
	export let navigateTo;

	const sections = [
		{ id: 'home', label: 'Inicio' },
		{ id: 'documentation', label: 'Documentación Institucional' },
		{ id: 'knowledge', label: 'Base de Conocimiento' },
		{ id: 'training', label: 'Capacitación y Formación' },
		{ id: 'projects', label: 'Repositorio de Proyectos' },
		{ id: 'forum', label: 'Foro de Discusión' },
		{ id: 'internal', label: 'Gestión del Conocimiento Interno' },
		{ id: 'admin', label: 'Administración' }
	];
</script>

<div class="mb-6 hidden border-b border-gray-200/50 md:flex">
	<nav class="flex space-x-1">
		{#each sections as section (section.id)}
			<button
				class="px-4 py-2 text-sm font-medium {activeSection === section.id
					? 'border-b-2 border-blue-600 text-blue-600'
					: 'text-gray-600 hover:bg-gray-50/50 hover:text-gray-900'}"
				on:click={() => navigateTo(section.id)}
			>
				{section.label}
			</button>
		{/each}
	</nav>
</div>
