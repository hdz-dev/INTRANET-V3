<script>
	import { Bar } from 'svelte-chartjs';
	import { Chart, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';
	export let label;
	export let labels;
	export let dataset;

	console.log('comp data horbar: ', labels, dataset);
	const data = {
		labels: labels,
		datasets: [
			{
				axis: 'y',
				label,
				data: dataset,
				fill: false,
				backgroundColor: ['#45C341'],
				borderColor: ['#45C341'],
				borderWidth: 1
			}
		]
	};

	const config = {
		responsive: true,
		indexAxis: 'y'
	};

	Chart.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);
</script>

<Bar {data} options={config} />
