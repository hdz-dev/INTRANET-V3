<script>
	import { onMount } from 'svelte';
	import WelcomeCard from './components/welcomeCard.svelte';
	import NewsSection from './components/newsSection.svelte';
	import QuickAccess from './components/quickAccess.svelte';
	import PerformanceMetrics from './components/performanceMetrics.svelte';
	import UpcomingEvents from './components/upcomingEvents.svelte';
	import ActivityFeed from './components/activityFeed.svelte';
	import FrequentContacts from './components/frecuentContacts.svelte';
	import BirthdayList from './components/birthDayList.svelte';
	import SideBar from './components/sideBar.svelte';
	import { getDashboardData } from '$lib/services/dashboardService.js';

	const dashboard = getDashboardData();
	let activeSection = 'inicio';
	let isMobileMenuOpen = false;
	let isSidebarCollapsed = true;
	let currentDate = '';

	function formatDate(dateString) {
		return new Date(dateString).toLocaleDateString('es-CO', {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		});
	}

	function formatDateTime(dateTimeString) {
		return new Date(dateTimeString).toLocaleDateString('es-CO', {
			year: 'numeric',
			month: 'long',
			day: 'numeric',
			hour: '2-digit',
			minute: '2-digit'
		});
	}

	function navigateTo(section) {
		activeSection = section;
		if (window.innerWidth < 768) isMobileMenuOpen = false;
		window.scrollTo({ top: 0, behavior: 'smooth' });
	}

	function calculatePercentage(value, target) {
		return target > 0 ? Math.min((value / target) * 100, 100) : 0;
	}

	onMount(() => {
		const updateDate = () => {
			currentDate = new Date().toLocaleDateString('es-CO', {
				weekday: 'long',
				year: 'numeric',
				month: 'long',
				day: 'numeric'
			});
		};
		updateDate();
	});
</script>

<div class="min-h-screen overflow-y-auto bg-transparent">
	<div class="flex">
		<SideBar {isSidebarCollapsed} {isMobileMenuOpen} {activeSection} {navigateTo} />

		<main
			class="min-w-0 flex-1 transition-[margin] duration-300"
			style="margin-left: {isSidebarCollapsed ? '5rem' : '16rem'}"
		>
			<div class="container mx-auto space-y-8 px-4 py-8 pt-20">
				<WelcomeCard userData={dashboard.userData} {currentDate} {formatDateTime} />
				<div class="grid grid-cols-1 gap-8 lg:grid-cols-3">
					<div class="space-y-6 lg:col-span-2">
						<QuickAccess quickAccess={dashboard.quickAccess} {navigateTo} />
						<NewsSection latestNews={dashboard.latestNews} {formatDate} />
						<PerformanceMetrics
							performanceMetrics={dashboard.performanceMetrics}
							{calculatePercentage}
							projectProgress={dashboard.projectProgress}
						/>
					</div>
					<div class="space-y-8">
						<UpcomingEvents upcomingEvents={dashboard.upcomingEvents} {formatDateTime} />
						<ActivityFeed recentActivity={dashboard.recentActivity} />
						<FrequentContacts frequentContacts={dashboard.frequentContacts} />
						<BirthdayList birthdaysThisMonth={dashboard.birthdaysThisMonth} />
					</div>
				</div>
			</div>
		</main>
	</div>
</div>
