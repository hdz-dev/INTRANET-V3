export const mipgMetrics = [
	{ label: 'Avance general', value: '68%', detail: 'Meta anual 90%', tone: 'green' },
	{ label: 'Dimensiones', value: '7', detail: 'En seguimiento', tone: 'blue' },
	{ label: 'Políticas', value: '19', detail: 'Implementadas', tone: 'violet' },
	{ label: 'Riesgos altos', value: '4', detail: 'Requieren atención', tone: 'red' }
];

export const mipgDimensions = [
	{ id: 'talento', name: 'Talento Humano', code: '01', progress: 85, policies: 3, tone: 'green' },
	{ id: 'direccionamiento', name: 'Direccionamiento Estratégico', code: '02', progress: 70, policies: 3, tone: 'blue' },
	{ id: 'gestion-valores', name: 'Gestión con Valores', code: '03', progress: 65, policies: 4, tone: 'violet' },
	{ id: 'evaluacion', name: 'Evaluación de Resultados', code: '04', progress: 75, policies: 2, tone: 'orange' },
	{ id: 'informacion', name: 'Información y Comunicación', code: '05', progress: 60, policies: 3, tone: 'cyan' },
	{ id: 'conocimiento', name: 'Gestión del Conocimiento', code: '06', progress: 55, policies: 2, tone: 'red' },
	{ id: 'control', name: 'Control Interno', code: '07', progress: 78, policies: 2, tone: 'blue' }
];

export const mipgTasks = [
	{ title: 'Completar autodiagnóstico', owner: 'Talento Humano', state: 'Urgente', due: 'Hoy' },
	{ title: 'Revisar plan de acción', owner: 'Gestión con Valores', state: 'En curso', due: 'En 5 días' },
	{ title: 'Cargar evidencia', owner: 'Direccionamiento Estratégico', state: 'Pendiente', due: 'En 8 días' },
	{ title: 'Atender observaciones', owner: 'Control Interno', state: 'En curso', due: 'En 12 días' }
];

export const mipgAlerts = [
	{ title: 'Nueva guía DAFP 2024', detail: 'Disponible en biblioteca normativa', tone: 'blue' },
	{ title: 'Plazo FURAG', detail: 'Se acerca la fecha de reporte institucional', tone: 'orange' },
	{ title: 'Actualización de instrumento', detail: 'Revisa los cambios publicados', tone: 'green' }
];

export const selfAssessments = [
	{ name: 'Gestión Estratégica del Talento Humano', dimension: 'Talento Humano', status: 'En curso', progress: 85, updated: '09/09/2026' },
	{ name: 'Integridad', dimension: 'Gestión con Valores', status: 'Completado', progress: 100, updated: '28/08/2026' },
	{ name: 'Planeación Institucional', dimension: 'Direccionamiento Estratégico', status: 'Pendiente', progress: 0, updated: 'Sin actualización' },
	{ name: 'Transparencia y Acceso a la Información', dimension: 'Información y Comunicación', status: 'En curso', progress: 60, updated: '01/09/2026' },
	{ name: 'Gestión del Conocimiento', dimension: 'Gestión del Conocimiento', status: 'En curso', progress: 45, updated: '30/08/2026' },
	{ name: 'Control Interno', dimension: 'Control Interno', status: 'Completado', progress: 100, updated: '26/08/2026' }
];

export const actionPlans = [
	{ title: 'Fortalecer inducción institucional', process: 'Talento Humano', owner: 'Responsable de dimensión', status: 'En curso', progress: 70, due: '15/10/2026' },
	{ title: 'Actualizar política de comunicación', process: 'Información y Comunicación', owner: 'Líder de proceso', status: 'Pendiente', progress: 20, due: '30/10/2026' },
	{ title: 'Implementar controles de seguimiento', process: 'Control Interno', owner: 'Segunda línea', status: 'Completado', progress: 100, due: '20/08/2026' }
];

export const mipgReports = [
	{ label: 'Avance general', value: '68%', detail: 'vs. meta 90%', tone: 'blue' },
	{ label: 'Dimensiones en meta', value: '4 de 7', detail: '57% del total', tone: 'green' },
	{ label: 'Políticas en ejecución', value: '15', detail: '4 pendientes', tone: 'violet' },
	{ label: 'Acciones vencidas', value: '2', detail: 'Requieren gestión', tone: 'red' }
];
