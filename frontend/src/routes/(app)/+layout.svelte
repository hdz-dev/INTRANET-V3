<script>
	import '../../app.css';
	import { goto } from '$app/navigation';
	import { user } from '$lib/authStore.js';
	import MainHeader from './components/mainHeader.svelte';
	import Footer from './components/footer.svelte';
	import SideBar from './components/sideBar.svelte';

	let { children } = $props();
	let isMobileMenuOpen = $state(false);
	let activeSection = $state('inicio');
	let isSidebarCollapsed = $state(true);

	function navigateTo(routeOrSection, section) {
		const route = section ? routeOrSection : routeOrSection === 'home' ? '/' : `/${routeOrSection}`;
		activeSection = section;
		if (!section) activeSection = route === '/' ? 'inicio' : route.slice(1);
		isMobileMenuOpen = false;
		goto(route);
	}
</script>

<MainHeader userData={$user || undefined} {isMobileMenuOpen} {activeSection} {navigateTo} />
<SideBar bind:isSidebarCollapsed {isMobileMenuOpen} {activeSection} {navigateTo} />
<div class="min-h-screen transition-[margin] duration-300" style="margin-left: {isSidebarCollapsed ? '4rem' : '18rem'}">
	{@render children()}
</div>
<Footer />
