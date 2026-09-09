<script>
	export let isSidebarCollapsed = false;
	export let isMobileMenuOpen = false;
	export let activeSection = 'inicio';
	export let navigateTo;

	const menuItems = [
		{
			route: '/',
			id: 'inicio',
			label: 'Inicio',
			icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6'
		},
		{
			id: 'comunicacion',
			label: 'Comunicación Interna',
			route: '/comunicacion',
			icon: 'M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z'
		},
		{
			id: 'conocimiento',
			label: 'Gestión del Conocimiento',
			route: '/gestion-conocimiento',
			icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253'
		},
		{
			id: 'mipg',
			label: 'MIPG',
			route: '/mipg',
			icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z'
		},
		{
			id: 'documental',
			label: 'Gestión Documental',
			route: '/gestion-documental',
			icon: 'M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2'
		},
		{
			id: 'rrhh',
			label: 'Recursos Humanos',
			route: '/recursos-humanos',
			icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zm-8 2a2 2 0 11-4 0 2 2 0 014 0z'
		},
		{
			id: 'proyectos',
			label: 'Gestión de Proyectos',
			route: '/proyectos',
			icon: 'M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
		},
		{
			id: 'tramites',
			label: 'Trámites Internos',
			route: '/tramites',
			icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2'
		},
		{
			id: 'tecnologia',
			label: 'Infraestructura TI',
			route: '/tecnologia',
			icon: 'M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
		},
		{
			id: 'transparencia',
			label: 'Transparencia',
			route: '/transparencia',
			icon: 'M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3'
		},
		{
			id: 'administracion',
			label: 'Administración',
			route: '/administracion',
			icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z'
		}
	];
</script>

<!-- Sidebar - Desktop -->
<aside
	class="glass-3 fixed top-42 bottom-4 left-0 z-40 hidden overflow-hidden rounded-r-2xl border-r md:block"
	style="width: {isSidebarCollapsed ? '4rem' : '18rem'}"
	on:mouseenter={() => (isSidebarCollapsed = false)}
	on:mouseleave={() => (isSidebarCollapsed = true)}
>
	<div class="h-full overflow-y-auto px-3 py-4">
		<ul class="m-auto space-y-2 font-medium">
			{#each menuItems as item (item.id)}
				<li>
					<button
						class={`group text-primaryx flex w-full items-center rounded-lg p-2 text-gray-900 hover:bg-gray-100/90 hover:shadow-xl ${
							activeSection === item.id ? 'bg-blue-50 text-blue-700' : ''
						}`}
						aria-current={activeSection === item.id ? 'page' : undefined}
						aria-label={isSidebarCollapsed ? item.label : undefined}
						type="button"
						on:click={() => navigateTo(item.route, item.id)}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="h-5 w-5"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d={item.icon} />
						</svg>
						<span class={`ml-3 ${isSidebarCollapsed ? 'hidden' : 'block'}`}>
							{item.label}
						</span>
					</button>
				</li>
			{/each}
		</ul>
	</div>
</aside>

{#if isMobileMenuOpen}
	<div class="bg-opacity-50 fixed inset-0 z-40 bg-gray-800 backdrop-blur-sm md:hidden">
		<div
			class="fixed inset-y-0 left-0 z-40 w-64 border-r border-gray-200/50 bg-white/90 shadow-lg backdrop-blur-md"
		>
			<div class="flex justify-end p-4">
				<button
					class="rounded-md p-2 text-gray-600 hover:text-gray-900 focus:outline-none"
					aria-label="Cerrar menú"
					on:click={() => (isMobileMenuOpen = false)}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-6 w-6"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M6 18L18 6M6 6l12 12"
						/>
					</svg>
				</button>
			</div>
			<div class="overflow-y-auto px-3 py-4">
				<ul class="space-y-2 font-medium">
					{#each menuItems as item (item.id)}
						<li>
							<button
								class={`group flex w-full items-center rounded-lg p-2 text-gray-900 hover:bg-gray-100/50 ${
									activeSection === item.id ? 'bg-blue-50 text-blue-700' : ''
								}`}
								type="button"
								on:click={() => navigateTo(item.route, item.id)}
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									class="h-5 w-5"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d={item.icon}
									/>
								</svg>
								<span class="ml-3">{item.label}</span>
							</button>
						</li>
					{/each}
				</ul>
			</div>
		</div>
	</div>
{/if}
