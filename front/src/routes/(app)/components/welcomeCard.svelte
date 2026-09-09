<script>
	export let userData;
	export let currentDate;
	export let formatDateTime;
</script>

<div class=" glass-3 rounded-xl p-6">
	<div class="flex flex-col justify-between md:flex-row md:items-center">
		<div>
			<h2 class="text-2xl font-bold text-gray-800">¡Bienvenido, {userData.name}!</h2>
			<p class="text-gray-600">{currentDate}</p>
		</div>
		<div class="mt-4 flex items-center space-x-4 md:mt-0">
			<div class="text-right">
				<p class="text-sm text-gray-600">Último acceso:</p>
				<p class="text-sm font-medium text-gray-800">{formatDateTime(userData.lastLogin)}</p>
			</div>
		</div>
	</div>
</div>
