<script>
	export let recentActivity;
</script>

<section>
	<h2 class="mb-4 text-xl font-semibold text-gray-800">Actividad y Tareas</h2>
	<div
		class="overflow-hidden rounded-xl border border-gray-200/50 bg-white/60 shadow-sm backdrop-blur-md"
	>
		<div class="border-b border-gray-200/50 bg-gray-50/50 px-6 py-4">
			<div class="flex space-x-2">
				<button class="border-b-2 border-blue-600 px-4 py-2 text-sm font-medium text-blue-600"
					>Actividad Reciente</button
				>
				<button class="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900"
					>Tareas Pendientes</button
				>
			</div>
		</div>
		<div class="p-6">
			<div class="space-y-4">
				{#each recentActivity as activity (activity.id)}
					<div class="flex items-start space-x-3">
						<div
							class={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full ${
								activity.color === 'green'
									? 'bg-green-100 text-green-600'
									: activity.color === 'blue'
										? 'bg-blue-100 text-blue-600'
										: activity.color === 'purple'
											? 'bg-purple-100 text-purple-600'
											: 'bg-red-100 text-red-600'
							}`}
						>
							<img class="h-5 w-5" src={activity.icon} alt="" />
						</div>
						<div>
							<p class="text-sm font-medium text-gray-800">{activity.action}</p>
							<p class="text-xs text-gray-600">{activity.detail}</p>
							<p class="mt-1 text-xs text-gray-500">{activity.time}</p>
						</div>
					</div>
				{/each}
			</div>
		</div>
	</div>
</section>
