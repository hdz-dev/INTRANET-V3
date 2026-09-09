<script>
	//importar iconos de la carpeta assets de lib
	//import Briefcase from '$lib/assets/icons/briefcase.svelte';
	//import BookOpen from '$lib/assets/icons/book-open.svelte';
	//import FileText from '/icons/file-text.svg';
	//import GraduationCap from '$lib/assets/icons/graduation-cap.svelte';

	import { onMount } from 'svelte';

	// Estado de navegación
	let activeSection = 'home';
	let isMobileMenuOpen = false;

	// Datos de ejemplo para demostración
	const featuredNews = [
		{
			id: 1,
			title: 'Nueva política de gestión documental',
			date: '2023-05-15',
			image:
				'https://www.bancodebogota.com/wps/wcm/connect/banco-de-bogota/f86791a2-b7bc-426e-b0ca-7e100efa052d/suplantacion-funcionarios-movil.jpg?MOD=AJPERES&CACHEID=f86791a2-b7bc-426e-b0ca-7e100efa052d'
		},
		{
			id: 2,
			title: 'Capacitación en herramientas digitales',
			date: '2023-05-10',
			image:
				'https://www.elinformador.com.co/images/stories/magdalena/2024/04-abril/16dist_6.jpg?height=200&width=400'
		},
		{
			id: 3,
			title: 'Lanzamiento del nuevo portal ciudadano',
			date: '2023-05-05',
			image:
				'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTL5LxVSGigtUkgMcRrJH_DkK7d4V7lR4wRvCgJh0OLbw&s?height=200&width=400'
		}
	];

	const recentDocuments = [
		{
			id: 1,
			title: 'Manual de Funciones 2025',
			type: 'PDF',
			date: '2025-05-12',
			author: 'Gestion Institucional'
		},
		{
			id: 2,
			title: 'Plan Estratégico 2023-2025',
			type: 'DOCX',
			date: '2025-05-08',
			author: 'Secretaria general General'
		},
		{
			id: 3,
			title: 'Informe Trimestral Q1',
			type: 'PDF',
			date: '2023-04-30',
			author: 'Secretaria de Hacienda'
		},
		{
			id: 4,
			title: 'Protocolo de Atención Ciudadana',
			type: 'PDF',
			date: '2025-04-25',
			author: 'Atención al Ciudadano'
		}
	];

	const quickAccess = [
		{
			id: 1,
			title: 'Documentación Institucional',
			icon: 'icons/file-text.svg',
			path: 'documentation'
		},
		{ id: 2, title: 'Base de Conocimiento', icon: 'icons/book-open.svg', path: 'knowledge' },
		{ id: 3, title: 'Capacitación', icon: 'icons/graduation-cap.svg', path: 'training' },
		{ id: 4, title: 'Proyectos', icon: 'icons/briefcase.svg', path: 'projects' }
	];

	// Manejo de navegación
	function navigateTo(section) {
		activeSection = section;
		isMobileMenuOpen = false;
		window.scrollTo(0, 0);
	}

	// Para propósitos de demostración
	onMount(() => {
		console.log('Componente montado');
	});
</script>

<!-- Contenedor principal -->
<div
	class="min-h-screen bg-gradient-to-br bg-[url('/bg-2.jpg')] from-blue-50 to-purple-50 bg-cover bg-center bg-repeat"
>
	<!-- Patrón de fondo -->
	<div
		class="fixed inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMzYjgyZjYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djZoNnYtNmgtNnptMCAwdjZoNnYtNmgtNnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-50"
	></div>

	<!-- Encabezado -->
	<header class="sticky top-0 z-50">
		<div class="backdrop-blur-mdx bg-white/70x border-gray-200/50x glass border-b shadow-sm">
			<div class="container mx-auto px-4 py-3">
				<div class="flex items-center justify-between">
					<!-- Logo y título -->
					<div class="flex items-center space-x-3">
						<div
							class=" bg-primary flex h-10 w-10 items-center justify-center rounded-full font-bold text-white"
						>
							GC
						</div>
						<h1 class="to-purple-700x bg-primary bg-clip-text text-xl font-bold text-transparent">
							Gestión del Conocimiento
						</h1>
					</div>

					<!-- Barra de búsqueda - escritorio -->
					<div class="mx-4 hidden max-w-md flex-1 md:block">
						<div class="relative">
							<input
								type="text"
								placeholder="Buscar documentos, proyectos, capacitaciones..."
								class="w-full rounded-full border border-gray-300/50 bg-white/80 py-2 pr-4 pl-10 backdrop-blur-sm focus:ring-2 focus:ring-blue-500/50 focus:outline-none"
							/>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="absolute top-2.5 left-3 h-5 w-5 text-gray-400"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
								/>
							</svg>
						</div>
					</div>

					<!-- Botón de menú móvil -->
					<button
						class="rounded-md p-2 text-gray-600 hover:text-gray-900 focus:outline-none md:hidden"
						on:click={() => (isMobileMenuOpen = !isMobileMenuOpen)}
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
								d={isMobileMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
							/>
						</svg>
					</button>

					<!-- Perfil de usuario -->
					<div class="hidden items-center space-x-4 md:flex">
						<div class="relative">
							<button class="flex items-center space-x-1 text-sm text-gray-700 hover:text-blue-600">
								<span>Notificaciones</span>
								<div class="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></div>
							</button>
						</div>
						<div class="h-6 w-px bg-gray-300"></div>
						<div class="flex items-center space-x-2">
							<div
								class=" bg-primary flex h-8 w-8 items-center justify-center rounded-full from-blue-500 text-xs font-medium text-white"
							>
								US
							</div>
							<span class="text-sm font-medium text-gray-700">Usuario</span>
						</div>
					</div>
				</div>
			</div>
		</div>

		<!-- Búsqueda móvil - solo visible en móvil -->
		<div class="border-b border-gray-200/50 bg-white/70 px-4 py-2 backdrop-blur-md md:hidden">
			<div class="relative">
				<input
					type="text"
					placeholder="Buscar..."
					class="w-full rounded-full border border-gray-300/50 bg-white/80 py-2 pr-4 pl-10 backdrop-blur-sm focus:ring-2 focus:ring-blue-500/50 focus:outline-none"
				/>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="absolute top-2.5 left-3 h-5 w-5 text-gray-400"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
					/>
				</svg>
			</div>
		</div>

		<!-- Menú móvil -->
		{#if isMobileMenuOpen}
			<div class="border-b border-gray-200/50 bg-white/90 shadow-lg backdrop-blur-md md:hidden">
				<nav class="space-y-1 px-4 py-3">
					{#each ['home', 'documentation', 'knowledge', 'training', 'projects', 'forum', 'internal', 'admin'] as section (section)}
						<button
							class="block w-full rounded-md px-3 py-2 text-left {activeSection === section
								? 'bg-blue-50 text-blue-700'
								: 'text-gray-700 hover:bg-gray-50'}"
							on:click={() => navigateTo(section)}
						>
							{section === 'home'
								? 'Inicio'
								: section === 'documentation'
									? 'Documentación Institucional'
									: section === 'knowledge'
										? 'Base de Conocimiento'
										: section === 'training'
											? 'Capacitación y Formación'
											: section === 'projects'
												? 'Repositorio de Proyectos'
												: section === 'forum'
													? 'Foro de Discusión'
													: section === 'internal'
														? 'Gestión del Conocimiento Interno'
														: 'Administración'}
						</button>
					{/each}

					<!-- Perfil de usuario móvil -->
					<div class="mt-4 border-t border-gray-200/50 pt-4">
						<div class="flex items-center space-x-3 px-3 py-2">
							<div
								class="to-purple-500x flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 text-xs font-medium text-white"
							>
								US
							</div>
							<div>
								<p class="text-sm font-medium text-gray-700">Usuario</p>
								<p class="text-xs text-gray-500">usuario@alcaldia.gov.co</p>
							</div>
						</div>
						<button
							class="mt-2 w-full rounded-md px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50"
						>
							Cerrar sesión
						</button>
					</div>
				</nav>
			</div>
		{/if}
	</header>

	<!-- Contenido principal -->
	<main class="container mx-auto px-4 py-6">
		<!-- Navegación de escritorio -->
		<div class="mb-6 hidden border-b border-gray-200/50 md:flex">
			<nav class="flex space-x-1">
				{#each ['home', 'documentation', 'knowledge', 'training', 'projects', 'forum', 'internal', 'admin'] as section (section)}
					<button
						class="px-4 py-2 text-sm font-medium {activeSection === section
							? 'border-b-2 border-blue-600 text-blue-600'
							: 'text-gray-600 hover:bg-gray-50/50 hover:text-gray-900'}"
						on:click={() => navigateTo(section)}
					>
						{section === 'home'
							? 'Inicio'
							: section === 'documentation'
								? 'Documentación Institucional'
								: section === 'knowledge'
									? 'Base de Conocimiento'
									: section === 'training'
										? 'Capacitación y Formación'
										: section === 'projects'
											? 'Repositorio de Proyectos'
											: section === 'forum'
												? 'Foro de Discusión'
												: section === 'internal'
													? 'Gestión del Conocimiento Interno'
													: 'Administración'}
					</button>
				{/each}
			</nav>
		</div>

		<!-- Contenido de la página de inicio -->
		{#if activeSection === 'home'}
			<div class="space-y-8">
				<!-- Sección de héroe con noticias destacadas -->
				<section class="relative overflow-hidden rounded-2xl">
					<div class="bg-primary rounded-2xl p-8 text-white">
						<div class="max-w-2xl">
							<h2 class="mb-4 text-3xl font-bold">Plataforma de Gestión del Conocimiento</h2>
							<p class="mb-6 text-blue-100">
								Accede a toda la documentación, capacitaciones y recursos de la alcaldía en un solo
								lugar.
							</p>
							<button
								class="text-primary rounded-full bg-white px-6 py-2 font-medium transition-colors hover:bg-blue-50"
							>
								Explorar recursos
							</button>
						</div>
					</div>
				</section>

				<!-- Tarjetas de acceso rápido -->
				<section>
					<h2 class="mb-4 text-xl font-semibold text-gray-800">Accesos rápidos</h2>
					<div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
						{#each quickAccess as item (item.id)}
							<button
								class="glass-3 cursor-pointer rounded-xl p-6"
								on:click={() => navigateTo(item.path)}
								aria-label={item.title}
							>
								<div
									class="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100/80 text-blue-600"
								>
									<img class="h-6 w-6" src={item.icon} alt="" />
								</div>
								<h3 class="font-medium text-gray-800">{item.title}</h3>
							</button>
						{/each}
					</div>
				</section>

				<!-- carrusel noticas destacadas -->
				<section>
					<h2 class="mb-4 text-xl font-semibold text-gray-800">Noticias destacadas</h2>
					<div class="grid grid-cols-1 gap-6 md:grid-cols-3">
						{#each featuredNews as news (news.id)}
							<div
								class="overflow-hidden rounded-xl border border-gray-200/50 bg-white/60 shadow-sm backdrop-blur-md transition-shadow hover:shadow-md"
							>
								<img
									src={news.image || '/placeholder.svg'}
									alt={news.title}
									class="h-60 w-full object-cover"
								/>
								<div class="p-4">
									<p class="mb-1 text-sm text-blue-600">
										{new Date(news.date).toLocaleDateString('es-ES', {
											year: 'numeric',
											month: 'long',
											day: 'numeric'
										})}
									</p>
									<h3 class="mb-2 font-medium text-gray-800">{news.title}</h3>
									<button class="text-sm text-blue-600 hover:text-blue-800">Leer más...</button>
								</div>
							</div>
						{/each}
					</div>
				</section>

				<!-- Documentos recientes -->
				<section>
					<div class="mb-4 flex items-center justify-between">
						<h2 class="text-xl font-semibold text-gray-800">Últimos documentos añadidos</h2>
						<button class="text-primary text-sm hover:text-blue-800">Ver todos →</button>
					</div>
					<div
						class="overflow-hidden rounded-xl border border-gray-200/50 bg-white/60 shadow-sm backdrop-blur-md"
					>
						<div class="overflow-x-auto">
							<table class="min-w-full divide-y divide-gray-200/50">
								<thead class="bg-gray-50/50">
									<tr>
										<th
											scope="col"
											class="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
											>Título</th
										>
										<th
											scope="col"
											class="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
											>Tipo</th
										>
										<th
											scope="col"
											class="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
											>Fecha</th
										>
										<th
											scope="col"
											class="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
											>Autor</th
										>
										<th
											scope="col"
											class="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
											>Acción</th
										>
									</tr>
								</thead>
								<tbody class="divide-y divide-gray-200/50 bg-white/20 backdrop-blur-sm">
									{#each recentDocuments as doc (doc.id)}
										<tr class="hover:bg-gray-50/50">
											<td class="px-6 py-4 text-sm font-medium whitespace-nowrap text-gray-800"
												>{doc.title}</td
											>
											<td class="px-6 py-4 text-sm whitespace-nowrap text-gray-500">
												<span
													class="inline-flex rounded-full bg-blue-100 px-2 text-xs leading-5 font-semibold text-blue-800"
												>
													{doc.type}
												</span>
											</td>
											<td class="px-6 py-4 text-sm whitespace-nowrap text-gray-500"
												>{new Date(doc.date).toLocaleDateString('es-ES')}</td
											>
											<td class="px-6 py-4 text-sm whitespace-nowrap text-gray-500">{doc.author}</td
											>
											<td class="px-6 py-4 text-sm whitespace-nowrap">
												<button class="text-blue-600 hover:text-blue-800">Descargar</button>
											</td>
										</tr>
									{/each}
								</tbody>
							</table>
						</div>
					</div>
				</section>
			</div>
		{/if}

		<!-- Sección de documentación -->
		{#if activeSection === 'documentation'}
			<div class="space-y-6">
				<div
					class="rounded-xl border border-gray-200/50 bg-white/60 p-6 shadow-sm backdrop-blur-md"
				>
					<h2 class="mb-4 text-2xl font-bold text-gray-800">Documentación Institucional</h2>
					<p class="mb-6 text-gray-600">
						Accede a todos los documentos oficiales de la institución, organizados por categorías y
						con opciones de búsqueda avanzada.
					</p>

					<!-- Búsqueda y filtros -->
					<div class="mb-6 flex flex-col gap-4 md:flex-row">
						<div class="flex-1">
							<div class="relative">
								<input
									type="text"
									placeholder="Buscar documentos..."
									class="w-full rounded-lg border border-gray-300/50 bg-white/80 py-2 pr-4 pl-10 backdrop-blur-sm focus:ring-2 focus:ring-blue-500/50 focus:outline-none"
								/>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									class="absolute top-2.5 left-3 h-5 w-5 text-gray-400"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
									/>
								</svg>
							</div>
						</div>
						<div class="flex gap-2">
							<select
								class="rounded-lg border border-gray-300/50 bg-white/80 px-4 py-2 text-gray-700 backdrop-blur-sm focus:ring-2 focus:ring-blue-500/50 focus:outline-none"
							>
								<option value="">Tipo de documento</option>
								<option value="manual">Manuales</option>
								<option value="policy">Políticas</option>
								<option value="procedure">Procedimientos</option>
								<option value="report">Informes</option>
							</select>
							<select
								class="rounded-lg border border-gray-300/50 bg-white/80 px-4 py-2 text-gray-700 backdrop-blur-sm focus:ring-2 focus:ring-blue-500/50 focus:outline-none"
							>
								<option value="">Categoría</option>
								<option value="hr">Recursos Humanos</option>
								<option value="finance">Finanzas</option>
								<option value="operations">Operaciones</option>
								<option value="legal">Legal</option>
							</select>
						</div>
					</div>

					<!-- Categorías de documentos -->
					<div class="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
						<div class="rounded-lg border border-blue-100/50 bg-blue-50/70 p-4 backdrop-blur-md">
							<div class="flex items-center space-x-3">
								<div
									class="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-600"
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
											d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
										/>
									</svg>
								</div>
								<div>
									<h3 class="font-medium text-gray-800">Manuales</h3>
									<p class="text-sm text-gray-600">24 documentos</p>
								</div>
							</div>
						</div>
						<div
							class="rounded-lg border border-purple-100/50 bg-purple-50/70 p-4 backdrop-blur-md"
						>
							<div class="flex items-center space-x-3">
								<div
									class="flex h-10 w-10 items-center justify-center rounded-full bg-purple-100 text-purple-600"
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
											d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"
										/>
									</svg>
								</div>
								<div>
									<h3 class="font-medium text-gray-800">Políticas</h3>
									<p class="text-sm text-gray-600">18 documentos</p>
								</div>
							</div>
						</div>
						<div class="rounded-lg border border-green-100/50 bg-green-50/70 p-4 backdrop-blur-md">
							<div class="flex items-center space-x-3">
								<div
									class="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 text-green-600"
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
											d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
										/>
									</svg>
								</div>
								<div>
									<h3 class="font-medium text-gray-800">Informes</h3>
									<p class="text-sm text-gray-600">32 documentos</p>
								</div>
							</div>
						</div>
					</div>

					<!-- Lista de documentos -->
					<div
						class="overflow-hidden rounded-xl border border-gray-200/50 bg-white/60 shadow-sm backdrop-blur-md"
					>
						<div class="overflow-x-auto">
							<table class="min-w-full divide-y divide-gray-200/50">
								<thead class="bg-gray-50/50">
									<tr>
										<th
											scope="col"
											class="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
											>Título</th
										>
										<th
											scope="col"
											class="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
											>Tipo</th
										>
										<th
											scope="col"
											class="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
											>Fecha</th
										>
										<th
											scope="col"
											class="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
											>Autor</th
										>
										<th
											scope="col"
											class="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
											>Acción</th
										>
									</tr>
								</thead>
								<tbody class="divide-y divide-gray-200/50 bg-white/20 backdrop-blur-sm">
									{#each recentDocuments as doc (doc.id)}
										<tr class="hover:bg-gray-50/50">
											<td class="px-6 py-4 text-sm font-medium whitespace-nowrap text-gray-800"
												>{doc.title}</td
											>
											<td class="px-6 py-4 text-sm whitespace-nowrap text-gray-500">
												<span
													class="inline-flex rounded-full bg-blue-100 px-2 text-xs leading-5 font-semibold text-blue-800"
												>
													{doc.type}
												</span>
											</td>
											<td class="px-6 py-4 text-sm whitespace-nowrap text-gray-500"
												>{new Date(doc.date).toLocaleDateString('es-ES')}</td
											>
											<td class="px-6 py-4 text-sm whitespace-nowrap text-gray-500">{doc.author}</td
											>
											<td class="px-6 py-4 text-sm whitespace-nowrap">
												<button class="text-blue-600 hover:text-blue-800">Descargar</button>
											</td>
										</tr>
									{/each}
								</tbody>
							</table>
						</div>
						<div
							class="flex items-center justify-between border-t border-gray-200/50 bg-gray-50/50 px-6 py-3"
						>
							<p class="text-sm text-gray-500">Mostrando 1-10 de 48 documentos</p>
							<div class="flex space-x-1">
								<button
									class="rounded border border-gray-300/50 px-3 py-1 text-gray-500 hover:bg-gray-50"
									>Anterior</button
								>
								<button class="rounded border border-gray-300/50 bg-blue-50 px-3 py-1 text-blue-600"
									>1</button
								>
								<button
									class="rounded border border-gray-300/50 px-3 py-1 text-gray-500 hover:bg-gray-50"
									>2</button
								>
								<button
									class="rounded border border-gray-300/50 px-3 py-1 text-gray-500 hover:bg-gray-50"
									>3</button
								>
								<button
									class="rounded border border-gray-300/50 px-3 py-1 text-gray-500 hover:bg-gray-50"
									>Siguiente</button
								>
							</div>
						</div>
					</div>
				</div>
			</div>
		{/if}
	</main>

	<!-- Pie de página -->
	<footer class="mt-12 border-t border-gray-200/50 bg-white/70 backdrop-blur-md">
		<div class="container mx-auto px-4 py-8">
			<div class="grid grid-cols-1 gap-8 md:grid-cols-4">
				<div>
					<div class="mb-4 flex items-center space-x-3">
						<div
							class="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-xs font-bold text-white"
						>
							GC
						</div>
						<h3 class="font-bold text-gray-800">Gestión del Conocimiento</h3>
					</div>
					<p class="mb-4 text-sm text-gray-600">
						Plataforma oficial de gestión del conocimiento de la alcaldía.
					</p>
					<div class="flex space-x-4">
						<a href="#" class="text-gray-400 hover:text-blue-600">
							<span class="sr-only">Facebook</span>
							<svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
								<path
									fill-rule="evenodd"
									d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
									clip-rule="evenodd"
								/>
							</svg>
						</a>
						<a href="#" class="text-gray-400 hover:text-blue-600">
							<span class="sr-only">Twitter</span>
							<svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
								<path
									d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"
								/>
							</svg>
						</a>
						<a href="#" class="text-gray-400 hover:text-blue-600">
							<span class="sr-only">YouTube</span>
							<svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
								<path
									fill-rule="evenodd"
									d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z"
									clip-rule="evenodd"
								/>
							</svg>
						</a>
					</div>
				</div>
				<div>
					<h3 class="mb-4 font-semibold text-gray-800">Enlaces rápidos</h3>
					<ul class="space-y-2 text-sm">
						<li><a href="#" class="text-gray-600 hover:text-blue-600">Inicio</a></li>
						<li>
							<a href="#" class="text-gray-600 hover:text-blue-600">Documentación Institucional</a>
						</li>
						<li><a href="#" class="text-gray-600 hover:text-blue-600">Base de Conocimiento</a></li>
						<li>
							<a href="#" class="text-gray-600 hover:text-blue-600">Capacitación y Formación</a>
						</li>
						<li>
							<a href="#" class="text-gray-600 hover:text-blue-600">Repositorio de Proyectos</a>
						</li>
					</ul>
				</div>
				<div>
					<h3 class="mb-4 font-semibold text-gray-800">Recursos</h3>
					<ul class="space-y-2 text-sm">
						<li><a href="#" class="text-gray-600 hover:text-blue-600">Preguntas frecuentes</a></li>
						<li><a href="#" class="text-gray-600 hover:text-blue-600">Soporte técnico</a></li>
						<li><a href="#" class="text-gray-600 hover:text-blue-600">Tutoriales</a></li>
						<li><a href="#" class="text-gray-600 hover:text-blue-600">Glosario</a></li>
						<li><a href="#" class="text-gray-600 hover:text-blue-600">Mapa del sitio</a></li>
					</ul>
				</div>
				<div>
					<h3 class="mb-4 font-semibold text-gray-800">Contacto</h3>
					<ul class="space-y-2 text-sm">
						<li class="flex items-start space-x-2">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="h-5 w-5 text-gray-500"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
								/>
							</svg>
							<span class="text-gray-600">contacto@alcaldia.gov.co</span>
						</li>
						<li class="flex items-start space-x-2">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="h-5 w-5 text-gray-500"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
								/>
							</svg>
							<span class="text-gray-600">(+57) 123 456 7890</span>
						</li>
						<li class="flex items-start space-x-2">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="h-5 w-5 text-gray-500"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
								/>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
								/>
							</svg>
							<span class="text-gray-600">Calle Principal #123, Ciudad</span>
						</li>
					</ul>
				</div>
			</div>
			<div class="mt-8 border-t border-gray-200/50 pt-8 text-center">
				<p class="text-sm text-gray-500">
					&copy; 2023 Plataforma de Gestión del Conocimiento. Todos los derechos reservados.
				</p>
			</div>
		</div>
	</footer>
</div>
<!-- 
  <style>
    /* Se pueden añadir estilos adicionales aquí si es necesario */
    :global(body) {
      font-family:
        'Inter',
        -apple-system,
        BlinkMacSystemFont,
        'Segoe UI',
        Roboto,
        Oxygen,
        Ubuntu,
        Cantarell,
        'Open Sans',
        'Helvetica Neue',
        sans-serif;
    }
  </style> 
  -->
