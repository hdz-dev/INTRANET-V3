<script>
	export let frequentContacts;

	function getStatusColor(status) {
		const colors = {
			online: 'bg-green-500',
			busy: 'bg-red-500',
			away: 'bg-yellow-500',
			offline: 'bg-gray-400'
		};
		return colors[status];
	}
</script>

<section>
	<h2 class="mb-4 text-xl font-semibold text-gray-800">Directorio de funcionarios</h2>
	<div class="rounded-xl border border-gray-200/50 bg-white/60 p-6 shadow-sm backdrop-blur-md">
		<div class="space-y-4">
			{#each frequentContacts as contact (contact.id)}
				<div class="flex items-center justify-between">
					<div class="flex items-center space-x-3">
						<div class="relative">
							<img
								src={contact.avatar || '/usuario.png'}
								alt={contact.name}
								class="h-10 w-10 rounded-full"
							/>
							<span
								class={`absolute right-0 bottom-0 h-3 w-3 rounded-full border-2 border-white ${getStatusColor(contact.status)}`}
							></span>
						</div>
						<div>
							<p class="text-sm font-medium text-gray-800">{contact.name}</p>
							<p class="text-xs text-gray-600">{contact.position}</p>
						</div>
					</div>
					<div class="flex space-x-2">
						<button class="rounded-full p-2 text-gray-600 hover:bg-blue-50 hover:text-blue-600">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="h-5 w-5"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
								/>
							</svg>
						</button>
						<button class="rounded-full p-2 text-gray-600 hover:bg-green-50 hover:text-green-600">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="h-5 w-5"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
								/>
							</svg>
						</button>
					</div>
				</div>
			{/each}
		</div>
		<div class="mt-4 border-t border-gray-200/50 pt-4">
			<button
				class="w-full rounded-lg bg-blue-50 py-2 text-sm font-medium text-blue-600 hover:bg-blue-100"
			>
				Ver directorio completo
			</button>
		</div>
	</div>
</section>
