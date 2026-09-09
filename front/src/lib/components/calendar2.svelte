<script>
	//import { onMount } from 'svelte';
	let dayx = '3';
	let eventDay = '12';
	let events = [
		{
			hora: '09:00 AM',
			title: 'Reunion Virtual MIPG',
			description: 'Discusion aprobación de cambios PSPI'
		},
		{
			hora: '02:00',
			title: 'Evaluación desempeño laboral',
			description: 'Inicia agenda de evaluación de desempeño laboral'
		},
		{
			hora: '05:00',
			title: 'Consejo de Gobierno',
			description: 'Socializacion del PETI Oficina TIC'
		}
	];

	// Función para obtener el nombre del mes
	function getMonthName(month) {
		const monthNames = [
			'Enero',
			'Febrero',
			'Marzo',
			'Abril',
			'Mayo',
			'Junio',
			'Julio',
			'Agosto',
			'Septiembre',
			'Octubre',
			'Noviembre',
			'Diciembre'
		];
		return monthNames[month];
	}

	// Función para obtener los nombres de los días de la semana
	function getDayName(day) {
		const dayNames = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];
		return dayNames[day];
	}

	// Función para obtener los días del mes
	function getDaysInMonth(month, year) {
		return new Date(year, month + 1, 0).getDate();
	}

	// Variables de estado
	let currentDate = new Date();
	let currentMonth = currentDate.getMonth();
	let currentYear = currentDate.getFullYear();

	// Calcula los días en el mes actual
	let daysInMonth = getDaysInMonth(currentMonth, currentYear);

	// Calcula el nombre del mes actual
	let monthName = getMonthName(currentMonth);

	// Calcula el primer día de la semana del mes actual
	let firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

	console.log(firstDayOfMonth);

	// Calcula los nombres de los días de la semana
	let dayNames = Array.from({ length: 7 }, (_, i) => getDayName(i));
</script>

<container class="items-centerx py-8x px-4x flex w-full justify-center overflow-y-auto">
	<div class="w-full max-w-sm shadow-lg">
		<section class="-section1">
			<div class="calendar rounded-t-lg border-b-2 border-gray-300 bg-white p-4 shadow-md">
				<div class="px-4x flex items-center justify-between">
					<p class="text-md my-4 font-semibold text-gray-800 dark:text-gray-100">
						{monthName} - {currentYear}
					</p>
					<div class="my-4 flex items-center">
						<button
							aria-label="calendar backward"
							class="text-gray-800 hover:text-gray-400 focus:text-gray-400 dark:text-gray-100"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="icon icon-tabler icon-tabler-chevron-left"
								width="24"
								height="24"
								viewBox="0 0 24 24"
								stroke-width="1.5"
								stroke="currentColor"
								fill="none"
								stroke-linecap="round"
								stroke-linejoin="round"
							>
								<path stroke="none" d="M0 0h24v24H0z" fill="none" />
								<polyline points="15 6 9 12 15 18" />
							</svg>
						</button>
						<button
							aria-label="calendar forward"
							class="ml-3 text-gray-800 hover:text-gray-400 focus:text-gray-400 dark:text-gray-100"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="icon icon-tabler icon-tabler-chevron-right"
								width="24"
								height="24"
								viewBox="0 0 24 24"
								stroke-width="1.5"
								stroke="currentColor"
								fill="none"
								stroke-linecap="round"
								stroke-linejoin="round"
							>
								<path stroke="none" d="M0 0h24v24H0z" fill="none" />
								<polyline points="9 6 15 12 9 18" />
							</svg>
						</button>
					</div>
				</div>
				<div class="grid grid-cols-7 gap-1">
					{#each dayNames as dayName, i (i)}
						<div class=" py-2 text-center text-xs font-bold text-gray-600">{dayName}</div>
					{/each}
				</div>

				<div class="grid grid-cols-7 gap-2">
					{#each Array.from({ length: daysInMonth }, (_, i) => i + 1) as day (day)}
						{#if day == eventDay || day == dayx}
							<!-- se establece el dia inicial en la semana del mes -->
							<button
								type="button"
								aria-label={`Seleccionar día ${day}`}
								class=" text-basex flex h-6 w-6 items-center justify-center rounded-full bg-indigo-700 text-xs font-medium text-white hover:bg-indigo-500 focus:bg-indigo-500 focus:ring-2 focus:ring-indigo-700 focus:ring-offset-2 focus:outline-none"
								>{day}
							</button>
						{:else}
							<button
								type="button"
								aria-label={`Seleccionar día ${day}`}
								class="cursor-pointer bg-white py-2 text-center text-xs text-gray-800">{day}</button
							>
						{/if}

						<!-- <a  role="link" tabindex="0" class="focus:outline-none  focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 focus:bg-indigo-500 hover:bg-indigo-500 text-base w-8 h-8 flex items-center justify-center font-medium text-white bg-indigo-700 rounded-full">{day}</a> -->
					{/each}
				</div>
			</div>
		</section>
		<!--  -->
		<section
			class=" - section 2 -md:py-8 md:px-16x rounded-b-2xl bg-gray-50 px-5 py-5 dark:bg-gray-700"
		>
			<div class="px-4">
				{#each events as event (event.title)}
					<div class="border-b border-dashed border-gray-400 pb-4">
						<p class="pt-4 pb-1 text-xs leading-3 font-light text-gray-500 dark:text-gray-300">
							{event.hora}
						</p>
						<button
							type="button"
							aria-label={`Ver evento ${event.title}`}
							class="mt-2 text-lg leading-5 font-medium text-gray-800 focus:outline-none dark:text-gray-100"
							>{event.title}</button
						>
						<p class="pt-2 text-sm leading-none text-gray-600 dark:text-gray-300">
							{event.description}
						</p>
					</div>
				{/each}
			</div>
		</section>
	</div>
</container>

<style>
	::-webkit-scrollbar {
		display: none;
	}
</style>
