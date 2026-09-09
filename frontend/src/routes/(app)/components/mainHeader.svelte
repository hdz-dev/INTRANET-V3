<script>
	import Logo from './logo.svelte';
	import SearchBar from './searchBar.svelte';
	import MobileMenuButton from './mobileMenuButton.svelte';
	import UserProfile from './userProfile.svelte';
	import MobileMenu from './mobileMenu.svelte';

	export let userData = { name: 'Carlos Hernandez', position: '', avatar: 'carlos-perf.png' };
	export let isMobileMenuOpen = false;
	export let activeSection = 'inicio';
	export let notificationCount = 0;
	export let messageCount = 0;
	export let navigateTo = () => {};
	const SearchBarPlaceholder = 'Buscar documentos, personas, trámites...';
</script>

<header class="sticky top-0 z-50">
	<div class="glass-3 border-b p-0 shadow-sm">
		<!-- Logo y Búsqueda -->
		<div class="container mx-auto px-4 py-3">
			<div class="flex items-center justify-between">
				<Logo />
				<SearchBar {SearchBarPlaceholder} />
				<MobileMenuButton bind:isMobileMenuOpen />
				<UserProfile {notificationCount} {messageCount} {userData} />
			</div>
		</div>
	</div>

	<!-- Búsqueda móvil -->
	<!-- <MobileSearch /> -->

	<!-- Menú móvil -->
	{#if isMobileMenuOpen}
		<MobileMenu {activeSection} {navigateTo} />
	{/if}
</header>
