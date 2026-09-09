<script>
	let isDropdownOpen = false;

	const user = {
		name: 'Juan Pérez',
		email: 'juan.perez@jamundi.gov.co',
		avatar: '/usuario.png'
	};

	function toggleDropdown() {
		isDropdownOpen = !isDropdownOpen;
	}

	function handleClickOutside(event) {
		if (isDropdownOpen && !event.target.closest('.user-dropdown')) {
			isDropdownOpen = false;
		}
	}
</script>

<svelte:window on:click={handleClickOutside} />

<div class="user-dropdown relative">
	<button
		class="flex items-center space-x-3 rounded-full px-2 py-1.5 transition-colors hover:bg-gray-100"
		on:click={toggleDropdown}
	>
		<img src={user.avatar} alt="Foto de perfil" class="h-8 w-8 rounded-full object-cover" />
		<span class="hidden text-sm font-medium text-gray-700 md:block">
			{user.name}
		</span>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			class="h-5 w-5 text-gray-400"
			viewBox="0 0 20 20"
			fill="currentColor"
		>
			<path
				fill-rule="evenodd"
				d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
				clip-rule="evenodd"
			/>
		</svg>
	</button>

	{#if isDropdownOpen}
		<div
			class="absolute right-0 mt-2 w-48 rounded-md border border-gray-200 bg-white py-1 shadow-lg"
		>
			<div class="px-4 py-2">
				<p class="text-sm font-medium text-gray-900">{user.name}</p>
				<p class="text-xs text-gray-500">{user.email}</p>
			</div>
			<hr class="my-1 border-gray-200" />
			<a href="#perfil" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
				Mi Perfil
			</a>
			<a href="#configuracion" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
				Configuración
			</a>
			<hr class="my-1 border-gray-200" />
			<button class="block w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-gray-100">
				Cerrar Sesión
			</button>
		</div>
	{/if}
</div>
