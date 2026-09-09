<script>
	export let quickAccess;
</script>

<!--   
  <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
    {#each quickAccess as item}
      <button
        class="backdrop-blur-md bg-white/60 rounded-xl p-6 border border-gray-200/50 shadow-sm hover:shadow-md transition-shadow flex items-center space-x-4"
        on:click={() => navigateTo(item.path)}
      >
        <div class="flex-shrink-0 w-12 h-12 rounded-full {colorClasses[item.color]} flex items-center justify-center">
          <i class="fas fa-{item.icon}"></i>
        </div>
        <div class="flex-1 text-left">
          <h3 class="font-medium text-gray-800">{item.title}</h3>
        </div>
        <i class="fas fa-chevron-right text-gray-400"></i>
      </button>
    {/each}
  </div> -->

<section>
	<h2 class="mb-4 text-xl font-semibold text-gray-800">Accesos Directos</h2>
	<div class="grid grid-cols-2 gap-4 md:grid-cols-3">
		{#each quickAccess as item (item.id)}
			<div class=" glass-3 flex cursor-pointer flex-col items-center rounded-xl p-4 text-center">
				<div
					class={`mb-3 flex h-12 w-12 items-center justify-center rounded-full ${
						item.color === 'blue'
							? 'bg-blue-100/80 text-blue-600'
							: item.color === 'purple'
								? 'bg-purple-100/80 text-purple-600'
								: item.color === 'green'
									? 'bg-green-100/80 text-green-600'
									: item.color === 'orange'
										? 'bg-orange-100/80 text-orange-600'
										: item.color === 'red'
											? 'bg-red-100/80 text-red-600'
											: 'bg-teal-100/80 text-teal-600'
					}`}
				>
					<img class="h-6 w-6" src={item.icon} alt="" />
				</div>
				<h3 class="text-sm font-medium text-gray-800">{item.title}</h3>
			</div>
		{/each}
	</div>
</section>
