<script>
	import Logo from './logo.svelte';
	import SearchBar from './searchBar.svelte';
	import MobileMenuButton from './mobileMenuButton.svelte';
	import UserProfile from './userProfile.svelte';
	import MobileMenu from './mobileMenu.svelte';
	export let isMobileMenuOpen;
	export let activeSection;
	export let navigateTo;
</script>

<header class="sticky top-0 z-50">
	<div class="glass border-b p-0 shadow-sm">
		<!-- Logo y Búsqueda -->
		<div class="container mx-auto px-4 py-3">
			<div class="flex items-center justify-between">
				<Logo />
				<SearchBar />
				<MobileMenuButton bind:isMobileMenuOpen />
				<UserProfile />
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
