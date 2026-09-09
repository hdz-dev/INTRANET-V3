<script>
	import { logout } from '$lib/api/auth.js';
	let isDropdownOpen = false;
	export let notificationCount = 0;
	export let messageCount = 0;
	export let userData = { name: 'Carlos Hernandez', email: '', avatar: 'carlos-perf.png', position: '' };
	$: avatarSource = getAvatarSource(userData);

	function getAvatarSource(data) {
		const avatar = data?.avatar || data?.Avatar || '/carlos-perf.png';
		if (/^(https?:|data:|blob:|\/)/.test(avatar)) return avatar;
		return `/${avatar}`;
	}

	function toggleDropdown() {
		isDropdownOpen = !isDropdownOpen;
	}

	function handleClickOutside(event) {
		if (isDropdownOpen && !event.target.closest('.user-dropdown')) {
			isDropdownOpen = false;
		}
	}

	async function handleLogout() {
		isDropdownOpen = false;
		await logout();
	}
</script>

<svelte:window on:click={handleClickOutside} />

<div class="user-dropdown relative">
	<div class="flex items-center space-x-1 sm:space-x-4">
		<!-- Notifications -->
		<div class="relative">
			<button
				aria-label="Ver notificaciones"
				class="rounded-full p-2 text-gray-600 hover:bg-gray-100/50 hover:text-gray-900 focus:outline-none"
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
						d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
					/>
				</svg>
				{#if notificationCount > 0}
					<span
						class="absolute top-0 right-0 inline-flex translate-x-1/2 -translate-y-1/2 transform items-center justify-center rounded-full bg-red-600 px-2 py-1 text-xs leading-none font-bold text-white"
						>{notificationCount}</span
					>
				{/if}
			</button>
		</div>

		<!-- Messages -->
		<div class="relative">
			<button
				aria-label="Ver mensajes"
				class="rounded-full p-2 text-gray-600 hover:bg-gray-100/50 hover:text-gray-900 focus:outline-none"
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
						d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
					/>
				</svg>
				{#if messageCount > 0}
					<span
						class="absolute top-0 right-0 inline-flex translate-x-1/2 -translate-y-1/2 transform items-center justify-center rounded-full bg-blue-600 px-2 py-1 text-xs leading-none font-bold text-white"
						>{messageCount}</span
					>
				{/if}
			</button>
		</div>

		<!-- User profile -->
		<button
			class="flex items-center space-x-2 rounded-full px-2 py-1.5 transition-colors hover:bg-gray-100"
			on:click={toggleDropdown}
		>
			<div class="hidden text-right sm:block">
				<p class="text-sm font-medium text-gray-700">{userData?.name}</p>
				<p class="text-xs text-gray-500">{userData?.position}</p>
			</div>
			<div
				class="flex h-14 w-14 items-center justify-center overflow-hidden rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-xs font-medium text-white"
			>
				<img
					src={avatarSource}
					alt={userData?.name || 'Usuario'}
					class="h-full w-full object-cover"
					on:error={(event) => (event.currentTarget.src = '/placeholder.svg')}
				/>
			</div>
		</button>
	</div>

	<!-- <button
		class="flex items-center space-x-3 rounded-full px-2 py-1.5 transition-colors hover:bg-gray-100"
		on:click={toggleDropdown}
	>
		<img src={user.avatar} alt="Foto de perfil" class="h-14 w-14 rounded-full object-cover" />
		<span class="text-md hidden font-medium text-gray-700 md:block">
			{user.name}
		</span>
	</button> -->

	{#if isDropdownOpen}
		<div
			class="absolute right-0 mt-2 w-60 rounded-md border border-gray-200 bg-white py-1 shadow-lg"
		>
			<div class="px-4 py-2">
				<p class="text-sm font-medium text-gray-900">{userData?.name}</p>
				<p class="text-xs text-gray-500">{userData?.email}</p>
			</div>
			<hr class="my-1 border-gray-200" />
			<a href="#perfil" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
				Mi Perfil
			</a>
			<a href="#configuracion" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
				Configuración
			</a>
			<hr class="my-1 border-gray-200" />
			<button type="button" on:click={handleLogout} class="block w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-gray-100">
				Cerrar Sesión
			</button>
		</div>
	{/if}
</div>
