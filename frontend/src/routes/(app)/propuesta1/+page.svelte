<script>
	

	import Calendar2 from '$lib/components/calendar2.svelte';
	import Publicaciones from '$lib/components/publicaciones.svelte';
	import Title from '$lib/components/title.svelte';

	let publicaciones = [
		{
			imagen:
				'https://www.bancodebogota.com/wps/wcm/connect/banco-de-bogota/f86791a2-b7bc-426e-b0ca-7e100efa052d/suplantacion-funcionarios-movil.jpg?MOD=AJPERES&CACHEID=f86791a2-b7bc-426e-b0ca-7e100efa052d',
			fecha: '12 de Agosto de 2024',
			titulo: 'Inicia la implementación de INTRANET',
			parrafo:
				'Se inicia la implementación de la intranet, la cual marca un hito tecnologico en la entidad pues su desarrollo se realizo desde la oficina TIC.'
		},
		{
			imagen: 'https://www.elinformador.com.co/images/stories/magdalena/2024/04-abril/16dist_6.jpg',
			fecha: '16 de Abril de 2024',
			titulo: 'Funcionarios son capacitados en herramientas TIC',
			parrafo:
				'Desde el area de apropiación de la oficina TIC se iniciaron una serie de capacitaciones con el fin de que los funcionarios implementen tecnologias.'
		},
		{
			imagen:
				'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTL5LxVSGigtUkgMcRrJH_DkK7d4V7lR4wRvCgJh0OLbw&s',
			fecha: '22 de marzo de 2024',
			titulo: 'Corte falla en contra de decreto Nacional Salarial',
			parrafo:
				'Se declara inconstitucional decreto que impedia la negociacion directa entre empleados y en entes territoriales.'
		},
		{
			imagen:
				'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRLlIb7SyIWELp33JA_MU6bM07AtcCbRmzFw&s',
			fecha: '20 de Febrero de 2024',
			titulo: 'Simulacro anual de desastres en alcaldia de Jamundí',
			parrafo:
				'En la alcaldia de jamundi se llevara a cabo el simulacro anual de desastres en el año 2024, el cual involucra todas las entidades del orden territorial.'
		}
	];
</script>

<main
	class="min-h-screenx h-screenx items-centerx xbg-[url('/src/lib/assets/2.jpg')]x max-h-screen justify-end overflow-y-auto bg-gradient-to-br from-blue-500 to-purple-700 bg-cover bg-center bg-repeat p-6"
	style="background-image: url('/src/lib/assets/bg-2.jpg'); "
>
	<div class="mx-auto max-w-[1080px]">
		<!--  topbar component  -->
		<container class=" -nav bar- flex h-28 w-full flex-row pb-8">
			<section class="p-4x lg:w-full">
				<!-- <div
				class=" bg-opacity-10 shadow-secondary/40 flex h-full w-full flex-row items-center rounded-2xl border border-white/30 bg-gray-300 bg-clip-padding p-2 backdrop-blur-sm backdrop-filter"
			> -->
				<div class=" glass-2 flex h-full w-full flex-row items-center rounded-2xl">
					<!-- <nav class="flex flex-row items-center w-full"> -->

					<img
						style="filter: drop-shadow(0 0 0.50rem black);"
						class="p-4x drop-shadow-mdx drop-shadow-[0 0 0.50rem black] h-20 w-auto py-2"
						src="/src/lib/assets/logo1.png"
						alt=""
					/>

					<div class="p-4x w-2/3">
						<Title title="" />
					</div>
					<!--  <div class="navbar-end w-1/3 justify-end">
			<div class="hidden lg:flex">
				<ul class="menu menu-horizontal px-1">
					{#each navItems as item}
						<li>
							<a class="hover:text-primary text-white" href={item.href}>{item.label}</a>
						</li>
					{/each}
				</ul>
			</div> -->

					<!-- </nav> -->
				</div>
			</section>
		</container>
		<!-- seccion 1  -->
		<container class="p-2x flex h-[720px] w-full gap-6">
			<section class="-glass- py-4 lg:w-1/2">
				<div class="glass-2 flex h-full w-full flex-col items-center rounded-2xl p-2">
					<Title title="COMUNICACIONES" />

					<Publicaciones {publicaciones} />
				</div>
			</section>

			<section class=" py-4 lg:w-1/4">
				<div class="h-full w-full">
					<div class=" glass-2 flex h-full w-full flex-col items-center rounded-2xl p-2">
						<Title title="CATEGORIAS" />

						<div class=" h-full w-full rounded-xl bg-white p-4">
							<h1 class="text-shadow-md text-primary font-bold">Noticias</h1>
						</div>

						<div class=" my-4 h-full w-full rounded-xl bg-white p-4">
							<h1 class="text-shadow-md text-primary font-bold">Directorio</h1>
						</div>

						<div class=" h-full w-full rounded-xl bg-white p-4">
							<h1 class="text-shadow-md text-primary font-bold">MIPG</h1>
						</div>
					</div>
				</div>
			</section>

			<section class="- calendar- s-glass- py-4 lg:w-1/4">
				<div class="glass-2 flex h-full w-full flex-col items-center rounded-2xl p-2">
					<Title title="CALENDARIO" />
					<Calendar2 />
				</div>
			</section>
		</container>

		<container class="p-2x flex h-[720px] w-full">
			<section class="-glass- p-4 lg:w-full">
				<div class="glass-2 flex h-full w-full flex-col items-center rounded-2xl p-2">
					<Title title="COMUNICACIONES" />

					<Publicaciones {publicaciones} />
				</div>
			</section>
		</container>
		<footer class="w-full">
			<Title title="OFICINA TIC - 2024" />
		</footer>
	</div>
</main>
