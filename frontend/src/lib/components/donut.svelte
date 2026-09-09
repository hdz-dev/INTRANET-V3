<script>
	import { Doughnut } from 'svelte-chartjs';
	export let labels;
	export let dataset;

	import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale } from 'chart.js';

	console.log('comp data donut', labels);
	const data = {
		labels: labels,
		datasets: [
			{
				data: dataset,
				backgroundColor: ['#45C341', '#46BFBD', '#949FB1', '#4D5360', 'bg-red-500', 'bg-black-500'],
				hoverBackgroundColor: [
					'#45C341',
					'#5AD3D1',
					'#A8B3C5',
					'#616774',
					'bg-red-500',
					'bg-black-500'
				]
			}
		]
	};

	ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale);
</script>

<Doughnut {data} options={{ responsive: true }} />
