<script>
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
		const dayNames = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
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
	// Calcula los nombres de los días de la semana
	let dayNames = Array.from({ length: 7 }, (_, i) => getDayName(i));
</script>

<!-- HTML para mostrar el calendario -->
<div class="calendar rounded-lg border bg-white p-4 shadow-md">
	<h2 class="mb-4 text-lg font-semibold">{monthName} {currentYear}</h2>
	<div class="grid grid-cols-7 gap-1">
		{#each dayNames as dayName (dayName)}
			<div class="bg-gray-200 py-2 text-center text-sm font-semibold text-gray-600">{dayName}</div>
		{/each}
	</div>
	<div class="grid grid-cols-7 gap-2">
		{#each Array.from({ length: daysInMonth }, (_, i) => i + 1) as day (day)}
			<div class="bg-white py-2 text-center text-gray-800">{day}</div>
		{/each}
	</div>
</div>
