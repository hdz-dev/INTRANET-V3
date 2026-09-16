<script>
	import { riskLabZones } from '$lib/risk-lab-data.js';

	let { zone } = $props();
</script>

<span
	class={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ${riskLabZones[zone] || 'bg-slate-100 text-slate-700 ring-slate-200'}`}
>
	{zone}
</span>
