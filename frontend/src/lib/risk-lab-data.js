export const riskLabMatrices = [
	{
		id: 'matriz-2026-tic',
		process: 'Gestión de la Información y las Comunicaciones',
		processCode: 'GIC',
		owner: 'Laura Méndez',
		validity: '2026',
		version: 'v2',
		status: 'En elaboración',
		riskCount: 6,
		progress: 72,
		updated: 'Hoy, 09:42'
	},
	{
		id: 'matriz-2026-fin',
		process: 'Gestión Financiera',
		processCode: 'GFI',
		owner: 'Andrés Rojas',
		validity: '2026',
		version: 'v1',
		status: 'En revisión',
		riskCount: 9,
		progress: 100,
		updated: 'Ayer, 16:10'
	},
	{
		id: 'matriz-2026-th',
		process: 'Gestión del Talento Humano',
		processCode: 'GTH',
		owner: 'Camila Torres',
		validity: '2026',
		version: 'v1',
		status: 'Publicada',
		riskCount: 7,
		progress: 100,
		updated: '12 sep 2026'
	}
];

export const riskLabRisks = [
	{
		id: 'RL-001',
		code: 'R-GIC-SIN-001',
		process: 'Gestión de la Información y las Comunicaciones',
		typology: 'Seguridad digital',
		description:
			'Interrupción de servicios institucionales por fallas en la infraestructura tecnológica.',
		status: 'En elaboración',
		inherent: { probability: 'Alta', impact: 'Mayor', zone: 'Alto' },
		residual: { probability: 'Media', impact: 'Mayor', zone: 'Alto' },
		controls: 4,
		assets: ['AI-TEST-001', 'AI-TEST-004'],
		alert: 'Requiere validar clasificación CIA',
		updated: 'Hoy, 09:42'
	},
	{
		id: 'RL-002',
		code: 'R-GIC-GES-002',
		process: 'Gestión de la Información y las Comunicaciones',
		typology: 'Gestión',
		description: 'Pérdida de información operativa por respaldos incompletos o no verificables.',
		status: 'Listo para revisión',
		inherent: { probability: 'Media', impact: 'Mayor', zone: 'Alto' },
		residual: { probability: 'Baja', impact: 'Mayor', zone: 'Alto' },
		controls: 3,
		assets: [],
		alert: '',
		updated: 'Ayer, 15:18'
	},
	{
		id: 'RL-003',
		code: 'R-GFI-FIS-001',
		process: 'Gestión Financiera',
		typology: 'Fiscal',
		description:
			'Afectación de recursos públicos por revisión insuficiente de obligaciones financieras.',
		status: 'En revisión',
		inherent: { probability: 'Baja', impact: 'Catastrófico', zone: 'Extremo' },
		residual: { probability: 'Muy Baja', impact: 'Mayor', zone: 'Alto' },
		controls: 5,
		assets: [],
		alert: 'Observación de segunda línea abierta',
		updated: 'Ayer, 16:10'
	},
	{
		id: 'RL-004',
		code: 'R-GTH-INP-001',
		process: 'Gestión del Talento Humano',
		typology: 'Integridad pública',
		description:
			'Decisiones institucionales influenciadas por conflictos de interés no declarados.',
		status: 'Publicada',
		inherent: { probability: 'Muy Baja', impact: 'Mayor', zone: 'Alto' },
		residual: { probability: 'Muy Baja', impact: 'Moderado', zone: 'Moderado' },
		controls: 2,
		assets: [],
		alert: '',
		updated: '12 sep 2026'
	}
];

export const riskLabAssets = [
	{
		id: 'AI-TEST-001',
		name: 'Sistema de gestión documental',
		type: 'Sistema de información',
		process: 'Gestión de la Información y las Comunicaciones',
		confidentiality: 'Pública clasificada',
		integrity: 'Alta',
		availability: 'Alta'
	},
	{
		id: 'AI-TEST-002',
		name: 'Expedientes contractuales de prueba',
		type: 'Documento',
		process: 'Gestión Financiera',
		confidentiality: 'Pública clasificada',
		integrity: 'Alta',
		availability: 'Media'
	},
	{
		id: 'AI-TEST-003',
		name: 'Base de datos de funcionarios',
		type: 'Base de datos',
		process: 'Gestión del Talento Humano',
		confidentiality: 'Pública reservada',
		integrity: 'Alta',
		availability: 'Alta'
	},
	{
		id: 'AI-TEST-004',
		name: 'Portal de servicios institucionales',
		type: 'Servicio',
		process: 'Gestión de la Información y las Comunicaciones',
		confidentiality: 'Pública',
		integrity: 'Media',
		availability: 'Alta'
	}
];

export const riskLabTasks = [
	{
		label: 'Completar clasificación CIA de activos',
		context: 'R-GIC-SIN-001 · Seguridad digital',
		due: 'Hoy',
		tone: 'red',
		href: '/mipg-nuevo/gestion-riesgos/matrices/matriz-2026-tic/riesgos/RL-001'
	},
	{
		label: 'Responder observación metodológica',
		context: 'R-GFI-FIS-001 · Segunda línea',
		due: 'En 2 días',
		tone: 'orange',
		href: '/mipg-nuevo/gestion-riesgos/revision'
	},
	{
		label: 'Registrar seguimiento trimestral',
		context: '3 riesgos de GIC',
		due: 'En 6 días',
		tone: 'blue',
		href: '/mipg-nuevo/gestion-riesgos/seguimientos'
	}
];

export const riskLabSummary = [
	{ label: 'Riesgos publicados', value: '22', detail: '3 matrices vigentes', tone: 'blue' },
	{ label: 'Requieren atención', value: '5', detail: '2 de prioridad alta', tone: 'orange' },
	{ label: 'Seguimientos próximos', value: '8', detail: 'Antes del 30 sep', tone: 'green' },
	{ label: 'Observaciones abiertas', value: '3', detail: '2 por responder', tone: 'red' }
];

export const riskLabControls = [
	{
		id: 'C-001',
		action: 'Verificar disponibilidad de los servicios críticos',
		type: 'Preventivo',
		implementation: 'Automático',
		owner: 'Equipo de infraestructura',
		frequency: 'Continuo',
		effect: 'Probabilidad'
	},
	{
		id: 'C-002',
		action: 'Revisar alertas y registrar desviaciones',
		type: 'Detectivo',
		implementation: 'Manual',
		owner: 'Mesa de servicios',
		frequency: 'Diario',
		effect: 'Probabilidad'
	},
	{
		id: 'C-003',
		action: 'Ejecutar recuperación ante interrupciones',
		type: 'Correctivo',
		implementation: 'Manual',
		owner: 'Equipo de infraestructura',
		frequency: 'Cuando ocurre el evento',
		effect: 'Impacto'
	}
];

export const riskLabZones = {
	Bajo: 'bg-emerald-50 text-emerald-700 ring-emerald-200',
	Moderado: 'bg-amber-50 text-amber-700 ring-amber-200',
	Alto: 'bg-orange-50 text-orange-700 ring-orange-200',
	Extremo: 'bg-red-50 text-red-700 ring-red-200'
};
