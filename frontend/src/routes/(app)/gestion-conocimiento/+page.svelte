<script>
	import Hero from './components/sections/hero.svelte';
	import QuickAccess from './components/sections/quickAccess.svelte';
	import LastPosts from './components/sections/lastPosts.svelte';
	import RecentDocuments from './components/sections/recentDocuments.svelte';
	import Documentation from './components/sections/documentation.svelte';

	let activeSection = 'home';

	// Datos de ejemplo para demostración
	const posts = [
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
		{
			id: 2,
			title: 'Base de Conocimiento',
			icon: 'icons/book-open.svg',
			path: 'knowledge'
		},
		{
			id: 3,
			title: 'Capacitación',
			icon: 'icons/graduation-cap.svg',
			path: 'training'
		},
		{
			id: 4,
			title: 'Proyectos',
			icon: 'icons/briefcase.svg',
			path: 'projects'
		}
	];

	function navigateTo(section) {
		activeSection = section;
		window.scrollTo(0, 0);
	}
</script>

<div
	class="max-h-screen min-h-screen overflow-y-auto bg-[url('/bg-2.jpg')] bg-cover bg-center bg-repeat"
>
	<!-- <Header {isMobileMenuOpen} {activeSection} {navigateTo} /> -->

	<main class="container mx-auto px-4 py-6">
		<!-- <Navigation {activeSection} {navigateTo} /> -->

		{#if activeSection === 'home'}
			<div class="space-y-8">
				<Hero />
				<QuickAccess {quickAccess} {navigateTo} />
				<LastPosts {posts} />
				<RecentDocuments {recentDocuments} />
			</div>
		{/if}

		{#if activeSection === 'documentation'}
			<Documentation {recentDocuments} />
		{/if}
	</main>

	<!-- <Footer /> -->
</div>
