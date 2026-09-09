<script>
	import { getRiskSamples } from '$lib/services/riesgosService.js';

	const risks = getRiskSamples();
</script>

<svelte:head>
	<title>Gestión Integral de Riesgos | MIPG</title>
	<meta
		name="description"
		content="Espacio preparado para el módulo de Gestión Integral de Riesgos de GIGA."
	/>
</svelte:head>
					<a
						href="/mipg/gestion-riesgos/seguimiento"
						class="inline-flex items-center rounded-lg border border-primary/40 bg-white/55 px-5 py-2.5 text-sm font-semibold text-primary transition hover:bg-white focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
					>
						Abrir seguimiento <span class="ml-2" aria-hidden="true">→</span>
					</a>

<main class="min-h-screen px-4 py-8 sm:px-6 lg:px-10">
	<div class="mx-auto max-w-7xl space-y-8">
		<nav aria-label="Ruta de navegación" class="text-sm text-gray-500">
			<a class="text-primary font-medium hover:underline" href="/mipg">MIPG</a>
			<span class="mx-2" aria-hidden="true">/</span>
			<span>Gestión Integral de Riesgos</span>
		</nav>

		<section class="glass-3 relative overflow-hidden rounded-2xl p-6 sm:p-10">
			<div
				class="bg-primary/10 absolute -right-12 -bottom-24 h-64 w-64 rounded-full blur-2xl"
			></div>
			<div class="relative max-w-3xl">
				<p class="text-primary mb-3 text-sm font-semibold tracking-[0.18em] uppercase">MIPG</p>
				<h1 class="text-3xl font-bold text-gray-900 sm:text-4xl">Gestión Integral de Riesgos</h1>
				<p class="mt-4 text-base leading-7 text-gray-600">
					Este espacio será la base para gestionar la identificación, valoración, controles,
					tratamiento y seguimiento de los riesgos institucionales.
				</p>
				<div class="mt-6 flex flex-wrap gap-3">
					<a
						href="/mipg/gestion-riesgos/nuevo"
						class="bg-primary inline-flex items-center rounded-lg px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
					>
						Iniciar identificación <span class="ml-2" aria-hidden="true">→</span>
					</a>
					<a
						href="/mipg/gestion-riesgos/metodologia"
						class="bg-primary inline-flex items-center rounded-lg px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
					>
						Consultar metodología <span class="ml-2" aria-hidden="true">↗</span>
					</a>
					<a
						href="/mipg/gestion-riesgos/matriz"
						class="bg-primary inline-flex items-center rounded-lg px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
					>
						Abrir matriz <span class="ml-2" aria-hidden="true">↗</span>
					</a>
				</div>
			</div>
		</section>

		<section class="grid gap-6 lg:grid-cols-[1.3fr_0.7fr]" aria-label="Estado del módulo">
			<div class="glass-3 rounded-xl p-6 sm:p-8">
				<div class="flex items-center gap-3">
					<span
						class="bg-primary/10 text-primary flex h-10 w-10 items-center justify-center rounded-xl"
						aria-hidden="true">1</span
					>
					<div>
						<h2 class="text-xl font-semibold text-gray-900">Componentes disponibles</h2>
						<p class="text-sm text-gray-500">Primera versión funcional del módulo</p>
					</div>
				</div>
				<div class="mt-6 grid gap-3 sm:grid-cols-2">
					{#each ['Identificación del riesgo', 'Valoración inherente', 'Controles múltiples', 'Valoración residual', 'Tratamiento', 'Seguimiento'] as item (item)}
						<div
							class="rounded-lg border border-gray-200/70 bg-white/50 px-4 py-3 text-sm text-gray-700"
						>
							<span class="text-primary mr-2" aria-hidden="true">•</span>{item}
						</div>
					{/each}
				</div>
			</div>

			<aside class="glass-3 rounded-xl p-6">
				<h2 class="text-lg font-semibold text-gray-900">Estado</h2>
				<div class="mt-5 flex items-center gap-3">
					<span class="h-3 w-3 rounded-full bg-amber-400" aria-hidden="true"></span>
					<span class="text-sm font-medium text-gray-700">Prototipo funcional local</span>
				</div>
				<p class="mt-4 text-sm leading-6 text-gray-600">
					La interfaz permite explorar el flujo completo. La persistencia y las reglas metodológicas
					definitivas se incorporarán después de validar el modelo técnico.
				</p>
				<a href="/mipg" class="text-primary mt-6 inline-flex text-sm font-semibold hover:underline">
					Volver a MIPG <span class="ml-2" aria-hidden="true">←</span>
				</a>
			</aside>
		</section>

		<section class="glass-3 rounded-xl p-6 sm:p-8" aria-labelledby="risk-reference-title">
			<div class="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
				<div>
					<h2 id="risk-reference-title" class="text-xl font-semibold text-gray-900">Riesgos de referencia</h2>
					<p class="mt-1 text-sm text-gray-600">Consulta el detalle de los ejemplos preparados para validar la experiencia del módulo.</p>
				</div>
				<span class="text-xs text-gray-500">Datos locales de demostración</span>
			</div>
			<div class="mt-5 grid gap-3 md:grid-cols-2">
				{#each risks as risk (risk.id)}
					<a href={`/mipg/gestion-riesgos/${risk.id}`} class="group rounded-lg border border-gray-200/70 bg-white/50 p-4 transition hover:-translate-y-0.5 hover:bg-white hover:shadow-md focus-visible:ring-2 focus-visible:ring-primary">
						<div class="flex items-start justify-between gap-3"><span class="font-mono text-xs font-semibold text-primary">{risk.codigo}</span><span class={`zone-badge zone-${(risk.zona || '').toLowerCase()}`}>{risk.zona}</span></div>
						<h3 class="mt-3 text-sm font-semibold text-gray-800">{risk.proceso}</h3>
						<p class="mt-1 line-clamp-2 text-xs leading-5 text-gray-500">{risk.descripcion}</p>
						<span class="text-primary mt-3 inline-flex text-xs font-semibold">Ver detalle <span class="ml-1 transition-transform group-hover:translate-x-1" aria-hidden="true">→</span></span>
					</a>
				{/each}
			</div>
		</section>
	</div>
</main>

<style>
	:global(.zone-badge) { display: inline-flex; border: 1px solid; border-radius: 9999px; padding: .3rem .65rem; font-size: .7rem; font-weight: 700; }
	:global(.zone-bajo) { border-color: rgb(34 197 94 / 45%); background: rgb(220 252 231 / 68%); color: #166534; }
	:global(.zone-moderado) { border-color: rgb(234 179 8 / 48%); background: rgb(254 249 195 / 72%); color: #854d0e; }
	:global(.zone-alto) { border-color: rgb(249 115 22 / 48%); background: rgb(255 237 213 / 72%); color: #9a3412; }
	:global(.zone-extremo) { border-color: rgb(239 68 68 / 52%); background: rgb(254 226 226 / 76%); color: #991b1b; }
</style>
