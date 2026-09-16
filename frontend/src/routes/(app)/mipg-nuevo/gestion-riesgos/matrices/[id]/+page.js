import { error } from '@sveltejs/kit';
import { riskLabMatrices } from '$lib/risk-lab-data.js';

export function load({ params }) {
	const matrix = riskLabMatrices.find((item) => item.id === params.id);
	if (!matrix) error(404, 'Matriz no encontrada');
	return { matrix };
}
