const riskSamples = [
	{
		id: 'risk-001',
		codigo: 'R-GTH-GES-001',
		proceso: 'Gestión del Talento Humano',
		tipologia: 'Gestión',
		descripcion: 'Demoras en la actualización de la información del personal por inconsistencias en los registros.',
		probabilidad: 'Media',
		impacto: 'Mayor',
		zona: 'Alto',
		controles: 3,
		estado: 'Activo'
	},
	{
		id: 'risk-002',
		codigo: 'R-GFI-FIS-001',
		proceso: 'Gestión Financiera',
		tipologia: 'Fiscal',
		descripcion: 'Pérdida de recursos públicos por deficiencias en la revisión de obligaciones financieras.',
		probabilidad: 'Baja',
		impacto: 'Catastrófico',
		zona: 'Alto',
		controles: 4,
		estado: 'Activo'
	},
	{
		id: 'risk-003',
		codigo: 'R-GIC-SIN-001',
		proceso: 'Gestión de la Información y las Comunicaciones',
		tipologia: 'Seguridad de la Información',
		descripcion: 'Pérdida de disponibilidad de servicios institucionales por fallas en la infraestructura tecnológica.',
		probabilidad: 'Alta',
		impacto: 'Moderado',
		zona: 'Alto',
		controles: 5,
		estado: 'Activo'
	},
	{
		id: 'risk-004',
		codigo: 'R-DE-INP-001',
		proceso: 'Direccionamiento Estratégico',
		tipologia: 'Integridad Pública',
		descripcion: 'Decisiones institucionales influenciadas por conflictos de interés no declarados.',
		probabilidad: 'Muy Baja',
		impacto: 'Mayor',
		zona: 'Moderado',
		controles: 2,
		estado: 'Activo'
	}
];

const storedRisksKey = 'giga-risks-v1';
const followUpRecordsKey = 'giga-risk-follow-ups-v1';

export const riskFormOptions = {
	types: ['Gestión', 'Fiscal', 'Seguridad de la Información', 'Integridad Pública', 'LA/FT'],
	probabilities: [
		{ level: 'Muy Baja', value: '20 %', criterion: 'Máximo 2 veces por año' },
		{ level: 'Baja', value: '40 %', criterion: 'Entre 3 y 24 veces por año' },
		{ level: 'Media', value: '60 %', criterion: 'Entre 25 y 500 veces por año' },
		{ level: 'Alta', value: '80 %', criterion: 'Más de 500 y hasta 5.000 veces por año' },
		{ level: 'Muy Alta', value: '100 %', criterion: 'Más de 5.000 veces por año' }
	],
		economicImpacts: [
		{ level: 'Leve', value: '20 %', criterion: 'Afectación menor a 10 SMLMV' },
		{ level: 'Menor', value: '40 %', criterion: 'Mayor a 10 y menor a 50 SMLMV' },
		{ level: 'Moderado', value: '60 %', criterion: 'Mayor a 50 y menor a 100 SMLMV' },
		{ level: 'Mayor', value: '80 %', criterion: 'Mayor a 100 y menor a 500 SMLMV' },
		{ level: 'Catastrófico', value: '100 %', criterion: 'Mayor a 500 SMLMV' }
	],
	reputationalImpacts: [
		{ level: 'Leve', value: '20 %', criterion: 'Afecta la imagen de alguna área de la entidad' },
		{ level: 'Menor', value: '40 %', criterion: 'Afecta la imagen interna: alta dirección y/o proveedores' },
		{ level: 'Moderado', value: '60 %', criterion: 'Afecta la imagen con usuarios de relevancia frente a los objetivos' },
		{ level: 'Mayor', value: '80 %', criterion: 'Efecto publicitario sostenido a nivel departamental o municipal' },
		{ level: 'Catastrófico', value: '100 %', criterion: 'Afecta la imagen a nivel nacional con efecto publicitario sostenido' }
	],
	controlTypes: ['Preventivo', 'Detectivo', 'Correctivo'],
	controlImplementations: ['Manual', 'Automático'],
	controlFrequencies: ['Diariamente', 'Semanalmente', 'Mensualmente', 'Trimestralmente', 'Semestralmente', 'Anualmente', 'Cada vez que se ejecuta', 'Continuamente', 'Cuando se presenta el evento', 'Eventualmente'],
	treatments: ['Aceptar', 'Reducir', 'Evitar', 'Transferir / Compartir'],
	generalImpacts: ['Económica', 'Reputacional'],
	fiscalImpacts: ['Recursos públicos', 'Bienes públicos', 'Intereses patrimoniales de naturaleza pública'],
	securityProperties: ['Confidencialidad', 'Integridad', 'Disponibilidad'],
	processes: [
		'Gestión del Talento Humano',
		'Gestión Financiera',
		'Gestión de la Información y las Comunicaciones',
		'Direccionamiento Estratégico'
	],
	processSiglas: {
		'Gestión del Talento Humano': 'GTH',
		'Gestión Financiera': 'GFI',
		'Gestión de la Información y las Comunicaciones': 'GIC',
		'Direccionamiento Estratégico': 'DE'
	},
	typeSiglas: {
		Gestión: 'GES',
		Fiscal: 'FIS',
		'Seguridad de la Información': 'SIN',
		'Integridad Pública': 'INP',
		'LA/FT': 'LFT'
	}
};

export const riskMethodology = {
	controlTypeWeights: { Preventivo: 0.25, Detectivo: 0.15, Correctivo: 0.1 },
	implementationWeights: { Manual: 0.15, Automático: 0.25 },
	matrix: {
		'Muy Alta': { Leve: 'Alto', Menor: 'Alto', Moderado: 'Alto', Mayor: 'Alto', Catastrófico: 'Extremo' },
		Alta: { Leve: 'Moderado', Menor: 'Moderado', Moderado: 'Alto', Mayor: 'Alto', Catastrófico: 'Extremo' },
		Media: { Leve: 'Moderado', Menor: 'Moderado', Moderado: 'Moderado', Mayor: 'Alto', Catastrófico: 'Extremo' },
		Baja: { Leve: 'Bajo', Menor: 'Moderado', Moderado: 'Moderado', Mayor: 'Alto', Catastrófico: 'Extremo' },
		'Muy Baja': { Leve: 'Bajo', Menor: 'Bajo', Moderado: 'Moderado', Mayor: 'Alto', Catastrófico: 'Extremo' }
	}
};

export function getControlEffectiveness(control) {
	return (riskMethodology.controlTypeWeights[control?.type] || 0) + (riskMethodology.implementationWeights[control?.implementation] || 0);
}

export function getProbabilityLevel(value) {
	if (!value) return '';
	if (value > 0.8) return 'Muy Alta';
	if (value > 0.6) return 'Alta';
	if (value > 0.4) return 'Media';
	if (value > 0.2) return 'Baja';
	return 'Muy Baja';
}

export function getImpactLevel(value) {
	if (!value) return '';
	if (value > 0.8) return 'Catastrófico';
	if (value > 0.6) return 'Mayor';
	if (value > 0.4) return 'Moderado';
	if (value > 0.2) return 'Menor';
	return 'Leve';
}

export function getRiskZone(probabilityLevel, impactLevel) {
	return riskMethodology.matrix[probabilityLevel]?.[impactLevel] || 'Pendiente';
}

export function getIntensityClass(level) {
	if (['Muy Baja', 'Baja', 'Leve'].includes(level)) return 'intensity-low';
	if (['Media', 'Moderado', 'Menor'].includes(level)) return 'intensity-medium';
	if (['Alta', 'Mayor'].includes(level)) return 'intensity-high';
	if (['Muy Alta', 'Catastrófico', 'Extremo'].includes(level)) return 'intensity-extreme';
	return 'intensity-pending';
}

export function getRiskSamples() {
	return structuredClone(riskSamples);
}

export function getStoredRisks() {
	if (typeof localStorage === 'undefined') return [];
	try {
		const stored = JSON.parse(localStorage.getItem(storedRisksKey) || '[]');
		return Array.isArray(stored) ? stored : [];
	} catch {
		return [];
	}
}

export function saveStoredRisk(risk) {
	if (typeof localStorage === 'undefined') return;
	const storedRisks = getStoredRisks();
	const previous = storedRisks.find((storedRisk) => storedRisk.id === risk.id);
	const historyEntry = {
		at: new Date().toISOString(),
		action: previous ? 'MODIFICACION' : 'CREACION',
		code: risk.codigo,
		snapshot: structuredClone({ ...risk, history: undefined })
	};
	const normalizedRisk = normalizeRisk({
		...risk,
		history: [...(previous?.history || []), historyEntry]
	});
	const risks = storedRisks.filter((storedRisk) => storedRisk.id !== risk.id);
	localStorage.setItem(storedRisksKey, JSON.stringify([...risks, normalizedRisk]));
}

export function deleteStoredRisk(id) {
	if (typeof localStorage === 'undefined') return;
	const risks = getStoredRisks().filter((risk) => risk.id !== id);
	localStorage.setItem(storedRisksKey, JSON.stringify(risks));
}

function normalizeRisk(value, key = '') {
	if (Array.isArray(value)) return value.map((entry) => normalizeRisk(entry, key));
	if (!value || typeof value !== 'object') {
		if (typeof value === 'string') {
			const normalized = value.trim();
			if (['N/A', 'NA', 'NO_APLICA'].includes(normalized.toUpperCase())) return 'No aplica';
			return normalized || null;
		}
		if (value === 0 && !['controles', 'quantity'].includes(key)) return null;
		return value;
	}
	return Object.fromEntries(Object.entries(value).map(([entryKey, entry]) => [entryKey, normalizeRisk(entry, entryKey)]));
}

export function getRiskById(id) {
	return getAllRisks().find((risk) => risk.id === id) || null;
}

export function getAllRisks() {
	const stored = getStoredRisks();
	const storedIds = new Set(stored.map((risk) => risk.id));
	return [
		...stored.map((risk) => ({ ...risk, controls: risk.controls || [] })),
		...riskSamples.filter((risk) => !storedIds.has(risk.id)).map((risk) => ({ ...risk, controls: risk.controls || [] }))
	];
}

export function getFollowUpRecords() {
	if (typeof localStorage === 'undefined') return [];
	try {
		const stored = JSON.parse(localStorage.getItem(followUpRecordsKey) || '[]');
		return Array.isArray(stored) ? stored : [];
	} catch {
		return [];
	}
}

export function getFollowUpsForRisk(riskId) {
	return getFollowUpRecords().filter((record) => record.riskId === riskId).sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
}

export function createFollowUpDraft(risk) {
	return {
		id: crypto.randomUUID(),
		riskId: risk.id,
		period: 'T1',
		type: 'Segunda línea',
		reviewer: '',
		status: 'Borrador',
		date: new Date().toISOString().slice(0, 10),
		nextReviewDate: '',
		conclusion: '',
		observations: [],
		controlEvaluations: (risk.controls || []).map((control) => ({
			controlId: control.id,
			implementation: 'No evaluado',
			compliance: 'No evaluado',
			effectiveness: 'No evaluado',
			observation: '',
			evidence: ''
		})),
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString()
	};
}

export function saveFollowUpRecord(record) {
	if (typeof localStorage === 'undefined') return;
	const records = getFollowUpRecords().filter((item) => item.id !== record.id);
	localStorage.setItem(followUpRecordsKey, JSON.stringify([...records, { ...record, updatedAt: new Date().toISOString() }]));
}

export function getRiskSummary(risks) {
	return {
		total: risks.length,
		active: risks.filter((risk) => risk.estado === 'Activo').length,
		high: risks.filter((risk) => risk.zona === 'Alto').length,
		extreme: risks.filter((risk) => risk.zona === 'Extremo').length,
		byType: risks.reduce((summary, risk) => {
			summary[risk.tipologia] = (summary[risk.tipologia] || 0) + 1;
			return summary;
		}, {})
	};
}
