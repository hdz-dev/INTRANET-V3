<script>
	export let performanceMetrics;
	export let calculatePercentage;
	export let projectProgress;
</script>

<div class="grid gap-6 md:grid-cols-1 xl:grid-cols-2">
	<!-- {#each performanceMetrics as metric}
      <div class="backdrop-blur-md bg-white/60 rounded-xl p-6 border border-gray-200/50 shadow-sm">
        <h3 class="text-sm font-medium text-gray-600 mb-2">{metric.name}</h3>
        <div class="flex items-baseline justify-between mb-2">
          <p class="text-2xl font-bold text-gray-800">
            {metric.value}{metric.unit}
          </p>
          <p class="text-sm text-gray-500">
            Meta: {metric.target}{metric.unit}
          </p>
        </div>
        <div class="relative h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            class="absolute top-0 left-0 h-full {getProgressColor(calculatePercentage(metric.value, metric.target))}"
            style="width: {calculatePercentage(metric.value, metric.target)}%"
          ></div>
        </div>
      </div>
    {/each} -->

	<div class="space-y-6 lg:col-span-2">
		<h2 class="mb-4 text-xl font-semibold text-gray-800">Reportes e Indicadores</h2>
		<div class="glass-3 rounded-xl border border-gray-200/50 p-6 shadow-sm">
			<div class="grid grid-cols-1 gap-6 md:grid-cols-2">
				<!-- Indicadores clave -->
				<div>
					<h3 class="mb-4 text-lg font-medium text-gray-800">Indicadores de Desempeño</h3>
					<div class="space-y-4">
						{#each performanceMetrics as metric (metric.id)}
							<div>
								<div class="mb-1 flex justify-between">
									<span class="text-sm font-medium text-gray-700">{metric.name}</span>
									<span class="text-sm font-medium text-gray-700"
										>{metric.value}{metric.unit} / {metric.target}{metric.unit}</span
									>
								</div>
								<div class="h-2.5 w-full rounded-full bg-gray-200">
									<div
										class="h-2.5 rounded-full bg-blue-600"
										style="width: {calculatePercentage(metric.value, metric.target)}%"
									></div>
								</div>
							</div>
						{/each}
					</div>
				</div>

				<!-- Gráfico de progreso -->
				<div>
					<h3 class="mb-4 text-lg font-medium text-gray-800">Avance de Proyectos</h3>
					<div class="flex h-64 items-end space-x-2">
						{#each projectProgress as item (item.name)}
							<div class="flex flex-1 flex-col items-center">
								<div class="w-full rounded-t-lg bg-blue-600" style="height: {item.value}%"></div>
								<span class="mt-2 text-xs font-medium text-gray-600">{item.name}</span>
							</div>
						{/each}
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
