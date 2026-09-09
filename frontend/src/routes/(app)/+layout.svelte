<script>
	import '../../app.css';
	import { goto } from '$app/navigation';
	import { user } from '$lib/authStore.js';
	import MainHeader from './components/mainHeader.svelte';
	import Footer from './components/footer.svelte';

	let { children } = $props();
	let isMobileMenuOpen = false;
	let activeSection = 'inicio';

	function navigateTo(section) {
		activeSection = section;
		const item = section === 'inicio' ? '/' : `/${section}`;
		goto(item);
	}
</script>

<MainHeader userData={$user || undefined} {isMobileMenuOpen} {activeSection} {navigateTo} />
{@render children()}
<Footer />

<style>
	:global(body) {
		background-color: #e8eef5;
		background-image: url('$lib/assets/bg-2.jpg');
		background-size: cover;
		background-position: center;
		background-repeat: no-repeat;
		background-attachment: fixed;

		min-height: 100vh;

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
