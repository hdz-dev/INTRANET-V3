<script>
	export let birthdaysThisMonth;
</script>

<section>
	<h2 class="mb-4 text-xl font-semibold text-gray-800">Cumpleaños del Mes</h2>
	<div class="rounded-xl border border-gray-200/50 bg-white/60 p-6 shadow-sm backdrop-blur-md">
		{#if birthdaysThisMonth.length > 0}
			<div class="space-y-3">
				{#each birthdaysThisMonth as birthday (birthday.name)}
					<div class="flex items-center space-x-3">
						<div
							class="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-purple-100 text-purple-600"
						>
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
									d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.701 2.701 0 00-1.5-.454M9 6v2m3-2v2m3-2v2M9 3h.01M12 3h.01M15 3h.01M21 21v-7a2 2 0 00-2-2H5a2 2 0 00-2 2v7h18zm-3-9v-2a2 2 0 00-2-2H8a2 2 0 00-2 2v2h12z"
								/>
							</svg>
						</div>
						<div>
							<p class="text-sm font-medium text-gray-800">{birthday.name}</p>
							<p class="text-xs text-gray-600">
								{birthday.department} - Día {birthday.day}
							</p>
						</div>
					</div>
				{/each}
			</div>
		{:else}
			<p class="text-sm text-gray-500">No hay cumpleaños próximos este mes.</p>
		{/if}
	</div>
</section>
