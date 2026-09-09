<script>
	import { Bar } from 'svelte-chartjs';

	import { Chart, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';

	export let label;
	export let labels;
	export let dataset;

	console.log('comp data verbar: ', labels, dataset);

	export const data = {
		labels: labels,
		datasets: [
			{
				label: label,
				data: dataset,
				backgroundColor: ['#45C341'],
				borderWidth: 2,
				borderColor: ['#45C341']
			}
		]
	};

	const config = {
		responsive: true,
		indexAxis: 'x'
	};

	Chart.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);
</script>

<Bar {data} options={config} />
