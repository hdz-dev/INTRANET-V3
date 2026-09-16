import { error } from '@sveltejs/kit';
import { riskLabRisks } from '$lib/risk-lab-data.js';

export function load({ params }) {
	const risk = riskLabRisks.find((item) => item.id === params.riskId);
	if (!risk) error(404, 'Riesgo no encontrado');
	return { risk };
}
