<script>
	export let upcomingEvents;
	//export let formatTime;

	function formatTime(dateString) {
		return new Date(dateString).toLocaleTimeString('es-CO', {
			hour: '2-digit',
			minute: '2-digit'
		});
	}
</script>

<h2 class="mb-4 text-xl font-semibold text-gray-800">Próximos Eventos</h2>
<div class="rounded-xl border border-gray-200/50 bg-white/60 p-6 shadow-sm backdrop-blur-md">
	<div class="space-y-4">
		{#each upcomingEvents as event (event.id)}
			<div class="flex items-start space-x-4">
				<div
					class="flex h-14 w-14 flex-shrink-0 flex-col items-center justify-center rounded-lg bg-blue-100 text-blue-700"
				>
					<span class="text-sm font-bold">{new Date(event.date).getDate()}</span>
					<span class="text-xs"
						>{new Date(event.date).toLocaleString('es-CO', { month: 'short' })}</span
					>
				</div>
				<div>
					<h3 class="font-medium text-gray-800">{event.title}</h3>
					<p class="text-sm text-gray-600">
						{formatTime(event.date)} - {event.location}
					</p>
					<button class="mt-1 text-xs text-blue-600 hover:text-blue-800">Ver detalles</button>
				</div>
			</div>
		{/each}
	</div>
	<div class="mt-4 border-t border-gray-200/50 pt-4 text-center">
		<button class="text-sm font-medium text-blue-600 hover:text-blue-800"
			>Ver calendario completo →</button
		>
	</div>
</div>
