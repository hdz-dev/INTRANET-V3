<script>
	const documents = [
		{
			nombre: 'Guía para la gestión integral del riesgo en entidades públicas (V7)',
			descripcion: 'Documento base del Departamento Administrativo de la Función Pública (DAFP) que define la metodología oficial.',
			href: '/docs/gestion-riesgos/Guia_gestion_integral_riesgo_v7.pdf',
			formato: 'PDF'
		}
	];

	const anexos = [
		{
			nombre: 'Anexo 1 · Formato mapa de riesgos integral',
			href: '/docs/gestion-riesgos/anexos/Anexo_1_Formato_mapa_riesgos_integral.xlsx',
			formato: 'XLSX'
		},
		{
			nombre: 'Anexo 2 · Glosario de la guía de gestión integral de riesgos',
			href: '/docs/gestion-riesgos/anexos/Anexo_2_glosario_guia_gestion_integral_riesgos.pdf',
			formato: 'PDF'
		},
		{
			nombre: 'Anexo 3 · Catálogo indicativo de puntos de riesgo fiscal',
			href: '/docs/gestion-riesgos/anexos/Anexo_3_Catalogo_indicativo_puntos_riesgo_fiscal.docx',
			formato: 'DOCX'
		},
		{
			nombre: 'Anexo 4 · Herramienta de diagnóstico del modelo de madurez ERM',
			href: '/docs/gestion-riesgos/anexos/Anexo_4_Herramienta_diagnostico_modelo_madurez_erm_vf.xlsx',
			formato: 'XLSX'
		},
		{
			nombre: 'Anexo 5 · Matriz de riesgos de seguridad de la información',
			href: '/docs/gestion-riesgos/anexos/Anexo_5_matriz_riesgos_seguridad.xlsx',
			formato: 'XLSX'
		}
	];
</script>

<svelte:head>
	<title>Metodología | Gestión Integral de Riesgos</title>
	<meta name="description" content="Decisiones metodológicas del módulo de Gestión Integral de Riesgos." />
</svelte:head>

<main class="min-h-screen px-4 py-8 sm:px-6 lg:px-10">
	<div class="mx-auto max-w-6xl space-y-8">
		<nav aria-label="Ruta de navegación" class="text-sm text-gray-500"><a class="text-primary font-medium hover:underline" href="/mipg">MIPG</a><span class="mx-2" aria-hidden="true">/</span><a class="text-primary font-medium hover:underline" href="/mipg/gestion-riesgos">Riesgos</a><span class="mx-2" aria-hidden="true">/</span><span>Metodología</span></nav>
		<section class="glass-3 relative overflow-hidden rounded-2xl p-6 sm:p-10"><div class="bg-primary/10 absolute -top-20 -right-16 h-64 w-64 rounded-full blur-3xl"></div><div class="relative max-w-3xl"><p class="text-primary text-sm font-semibold tracking-[0.18em] uppercase">Marco de referencia</p><h1 class="mt-2 text-3xl font-bold text-gray-900 sm:text-4xl">Metodología de riesgos</h1><p class="mt-4 text-base leading-7 text-gray-600">Esta vista separa las decisiones conceptuales cerradas de las reglas que requieren validación oficial antes de convertirse en lógica del sistema.</p></div></section>
		<section class="glass-3 rounded-xl p-6 sm:p-8"><h2 class="text-xl font-semibold text-gray-900">Fuentes del módulo</h2><p class="mt-2 max-w-3xl text-sm leading-6 text-gray-600">La especificación funcional, el modelo conceptual, el modelo lógico y la documentación metodológica de la carpeta de conocimiento son la fuente normativa.</p><div class="mt-6 flex flex-wrap gap-3"><span class="rounded-full bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-700">Guía DAFP V7</span><span class="rounded-full bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-700">Modelo conceptual</span><span class="rounded-full bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-700">Modelo lógico</span><span class="rounded-full bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-700">Anexos oficiales pendientes de validación</span></div></section>

		<section class="glass-3 rounded-xl p-6 sm:p-8" aria-labelledby="doc-title">
			<div class="flex items-center gap-3">
				<span class="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-primary" aria-hidden="true">📄</span>
				<h2 id="doc-title" class="text-xl font-semibold text-gray-900">Documento guía</h2>
			</div>
			<ul class="mt-6 space-y-3">
				{#each documents as doc (doc.href)}
					<li class="flex flex-col gap-3 rounded-lg border border-gray-200/70 bg-white/50 p-4 sm:flex-row sm:items-center sm:justify-between">
						<div>
							<p class="text-sm font-semibold text-gray-800">{doc.nombre}</p>
							<p class="mt-1 text-xs leading-5 text-gray-500">{doc.descripcion}</p>
						</div>
						<a
							href={doc.href}
							download
							class="bg-primary inline-flex shrink-0 items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
						>
							Descargar {doc.formato} <span aria-hidden="true">↓</span>
						</a>
					</li>
				{/each}
			</ul>
		</section>

		<section class="glass-3 rounded-xl p-6 sm:p-8" aria-labelledby="anexos-title">
			<div class="flex items-center gap-3">
				<span class="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-primary" aria-hidden="true">📎</span>
				<h2 id="anexos-title" class="text-xl font-semibold text-gray-900">Anexos oficiales</h2>
			</div>
			<p class="mt-2 max-w-3xl text-sm leading-6 text-gray-600">Formatos y herramientas complementarias de la guía. Su aplicación en el sistema aún está pendiente de validación metodológica.</p>
			<ul class="mt-6 grid gap-3 md:grid-cols-2">
				{#each anexos as anexo (anexo.href)}
					<li class="flex items-center justify-between gap-3 rounded-lg border border-gray-200/70 bg-white/50 p-4">
						<div class="flex items-center gap-3">
							<span class="rounded-md bg-gray-100 px-2 py-1 text-[0.65rem] font-bold tracking-wide text-gray-600 uppercase">{anexo.formato}</span>
							<p class="text-sm font-medium text-gray-800">{anexo.nombre}</p>
						</div>
						<a
							href={anexo.href}
							download
							class="text-primary inline-flex shrink-0 items-center gap-1 text-sm font-semibold hover:underline"
						>
							Descargar <span aria-hidden="true">↓</span>
						</a>
					</li>
				{/each}
			</ul>
		</section>

		<div><a href="/mipg/gestion-riesgos" class="text-primary text-sm font-semibold hover:underline">← Volver a Gestión Integral de Riesgos</a></div>
	</div>
</main>
