<script>
	import '../../app.css';
	import { goto } from '$app/navigation';
	import { user } from '$lib/authStore.js';
	import MainHeader from './components/mainHeader.svelte';
	import Footer from './components/footer.svelte';

	let { children } = $props();
	let isMobileMenuOpen = $state(false);
	let activeSection = $state('inicio');

	function navigateTo(section) {
		activeSection = section;
		const item = section === 'inicio' ? '/' : `/${section}`;
		goto(item);
	}
</script>

<MainHeader userData={$user || undefined} {isMobileMenuOpen} {activeSection} {navigateTo} />
{@render children()}
<Footer />
