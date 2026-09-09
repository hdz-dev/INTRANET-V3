<svelte:head>
	<title>MIPG | GIGA</title>
	<meta name="description" content="Módulo de gestión institucional MIPG de la plataforma GIGA." />
</svelte:head>

<main class="min-h-screen px-4 py-8 sm:px-6 lg:px-10">
	<div class="mx-auto max-w-7xl space-y-8">
		<section class="glass-3 relative overflow-hidden rounded-2xl p-6 sm:p-10">
			<div class="bg-primary/10 absolute -top-20 -right-16 h-56 w-56 rounded-full blur-2xl"></div>
			<div class="relative max-w-3xl">
				<p class="text-primary mb-3 text-sm font-semibold tracking-[0.18em] uppercase">
					Gestión institucional
				</p>
				<h1 class="text-3xl font-bold text-gray-900 sm:text-5xl">MIPG</h1>
				<p class="mt-4 max-w-2xl text-base leading-7 text-gray-600 sm:text-lg">
					Modelo Integrado de Planeación y Gestión para organizar, medir y fortalecer la gestión
					institucional.
				</p>
			</div>
		</section>

		<section aria-labelledby="mipg-sections-title">
			<div class="mb-4">
				<h2 id="mipg-sections-title" class="text-xl font-semibold text-gray-900">
					Áreas de gestión
				</h2>
				<p class="mt-1 text-sm text-gray-600">
					Selecciona un área para continuar con su desarrollo en GIGA.
				</p>
			</div>

			<div class="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
				<a
					href="/mipg/gestion-riesgos"
					class="glass-3 group focus-visible:ring-primary rounded-xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg focus-visible:ring-2"
				>
					<span
						class="bg-primary/10 text-primary mb-5 flex h-12 w-12 items-center justify-center rounded-xl"
						aria-hidden="true"
					>
						<svg
							class="h-6 w-6"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="1.8"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M12 3 4.5 6v5.5c0 4.7 3.1 7.7 7.5 9.5 4.4-1.8 7.5-4.8 7.5-9.5V6L12 3Z"
							/>
							<path stroke-linecap="round" stroke-linejoin="round" d="m9 12 2 2 4-4" />
						</svg>
					</span>
					<h3 class="text-lg font-semibold text-gray-900">Gestión Integral de Riesgos</h3>
					<p class="mt-2 text-sm leading-6 text-gray-600">
						Identificación, valoración, controles y seguimiento de riesgos institucionales.
					</p>
					<span class="text-primary mt-5 inline-flex items-center text-sm font-semibold">
						Abrir módulo <span
							class="ml-2 transition-transform group-hover:translate-x-1"
							aria-hidden="true">→</span
						>
					</span>
				</a>

				<a
					href="/mipg/activos-informacion"
					class="glass-3 group focus-visible:ring-primary rounded-xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg focus-visible:ring-2"
				>
					<span class="bg-primary/10 text-primary mb-5 flex h-12 w-12 items-center justify-center rounded-xl" aria-hidden="true">AI</span>
					<h3 class="text-lg font-semibold text-gray-900">Activos de información</h3>
					<p class="mt-2 text-sm leading-6 text-gray-600">Inventario, clasificación, custodia y consulta de activos institucionales.</p>
					<span class="text-primary mt-5 inline-flex items-center text-sm font-semibold">Abrir módulo <span class="ml-2" aria-hidden="true">→</span></span>
				</a>

				{#each [{ title: 'Planeación institucional', text: 'Área preparada para futuras funcionalidades de planeación.', icon: '▦' }, { title: 'Control interno', text: 'Área preparada para seguimiento y evaluación institucional.', icon: '✓' }, { title: 'Desempeño institucional', text: 'Área preparada para indicadores y resultados de gestión.', icon: '↗' }] as section (section.title)}
					<div class="glass-3 rounded-xl p-6 opacity-75">
						<span
							class="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-gray-100 text-lg font-semibold text-gray-500"
							aria-hidden="true"
						>
							{section.icon}
						</span>
						<h3 class="text-lg font-semibold text-gray-900">{section.title}</h3>
						<p class="mt-2 text-sm leading-6 text-gray-600">{section.text}</p>
						<span
							class="mt-5 inline-flex rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-500"
							>Próximamente</span
						>
					</div>
				{/each}
			</div>
		</section>
	</div>
</main>
