<script>
	import { onMount } from 'svelte';

	export let location = 'london';
	export let weatherInfo = {
		icon: 'sun',
		temperature: 0,
		condition: '',
		humidity: 0,
		location: ''
	};

	const weatherIcons = {
		'01d': 'fas fa-sun',
		'02d': 'fas fa-cloud-sun',
		'03d': 'fas fa-cloud',
		'04d': 'fas fa-cloud',
		'09d': 'fas fa-cloud-showers-heavy',
		'10d': 'fas fa-cloud-rain',
		'11d': 'fas fa-bolt',
		'13d': 'fas fa-snowflake',
		'50d': 'fas fa-smog'
	};

	const apiKey = 'YOUR_API_KEY_HERE';
	const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`;

	async function fetchWeather() {
		const response = await fetch(apiUrl);
		const data = await response.json();
		weatherInfo = {
			icon: data.weather[0].icon,
			temperature: data.main.temp,
			condition: data.weather[0].description,
			humidity: data.main.humidity,
			location: data.name
		};
		console.log(data);
	}

	onMount(() => {
		fetchWeather();
	});
</script>

<div class="flex items-center space-x-3 rounded-lg bg-blue-50 p-3">
	<div class="flex-shrink-0">
		<i class="{weatherIcons[weatherInfo.icon]} text-2xl text-blue-500"></i>
	</div>
	<div>
		<div class="flex items-baseline">
			<span class="text-xl font-bold text-gray-800">{weatherInfo.temperature}°C</span>
			<span class="ml-1 text-sm text-gray-600">{weatherInfo.condition}</span>
		</div>
		<p class="text-xs text-gray-500">
			{weatherInfo.location} | Humedad: {weatherInfo.humidity}%
		</p>
	</div>
</div>
