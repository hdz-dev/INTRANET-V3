<script>
	import { Radar } from 'svelte-chartjs';

	export let label;
	export let labels;
	export let dataset;

	console.log('comp data radar: ', labels, dataset);
	import {
		Chart as ChartJS,
		Title,
		Tooltip,
		Legend,
		PointElement,
		RadialLinearScale,
		LineElement
	} from 'chart.js';

	export const data = {
		labels: labels,
		datasets: [
			{
				label: label,
				backgroundColor: '#45C341',
				borderColor: '#45C341',
				data: dataset
			}
		]
	};

	ChartJS.register(Title, Tooltip, Legend, PointElement, RadialLinearScale, LineElement);
</script>

<Radar {data} options={{ responsive: true }} />
