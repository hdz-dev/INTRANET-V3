<script>
	import Logo from './logo.svelte';
</script>

<footer class="mt-12 border-t border-gray-200/50 bg-white/70 backdrop-blur-md">
	<div class="container mx-auto px-4 py-8">
		<div class="grid grid-cols-1 gap-8 md:grid-cols-4">
			<!-- Logo y descripción -->
			<div>
				<Logo />
				<p class="my-4 mb-4 text-sm text-gray-600">
					Plataforma oficial de gestión del conocimiento de la alcaldía.
				</p>
				<div class="flex space-x-4">
					<!-- Iconos de redes sociales -->
				</div>
			</div>

			<!-- Enlaces rápidos -->
			<div>
				<h3 class="mb-4 font-semibold text-gray-800">Enlaces rápidos</h3>
				<ul class="space-y-2 text-sm">
					<li><a href="#" class="text-gray-600 hover:text-blue-600">Inicio</a></li>
					<li>
						<a href="#" class="text-gray-600 hover:text-blue-600">Documentación Institucional</a>
					</li>
					<li><a href="#" class="text-gray-600 hover:text-blue-600">Base de Conocimiento</a></li>
					<li>
						<a href="#" class="text-gray-600 hover:text-blue-600">Capacitación y Formación</a>
					</li>
					<li>
						<a href="#" class="text-gray-600 hover:text-blue-600">Repositorio de Proyectos</a>
					</li>
				</ul>
			</div>

			<!-- Recursos -->
			<div>
				<h3 class="mb-4 font-semibold text-gray-800">Recursos</h3>
				<ul class="space-y-2 text-sm">
					<li><a href="#" class="text-gray-600 hover:text-blue-600">Preguntas frecuentes</a></li>
					<li><a href="#" class="text-gray-600 hover:text-blue-600">Soporte técnico</a></li>
					<li><a href="#" class="text-gray-600 hover:text-blue-600">Tutoriales</a></li>
					<li><a href="#" class="text-gray-600 hover:text-blue-600">Glosario</a></li>
					<li><a href="#" class="text-gray-600 hover:text-blue-600">Mapa del sitio</a></li>
				</ul>
			</div>

			<!-- Contacto -->
			<div>
				<h3 class="mb-4 font-semibold text-gray-800">Contacto</h3>
				<ul class="space-y-2 text-sm">
					<li class="flex items-start space-x-2">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="h-5 w-5 text-gray-500"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
							/>
						</svg>
						<span class="text-gray-600">contacto@alcaldia.gov.co</span>
					</li>
					<li class="flex items-start space-x-2">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="h-5 w-5 text-gray-500"
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
						<span class="text-gray-600">(+57) 123 456 7890</span>
					</li>
					<li class="flex items-start space-x-2">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="h-5 w-5 text-gray-500"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
							/>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
							/>
						</svg>
						<span class="text-gray-600">Calle Principal #123, Ciudad</span>
					</li>
				</ul>
			</div>
		</div>
		<div class="mt-8 border-t border-gray-200/50 pt-8 text-center">
			<p class="text-sm text-gray-500">&copy; Alcaldía de Jamundi - Oficina TIC 2025.</p>
		</div>
	</div>
</footer>
