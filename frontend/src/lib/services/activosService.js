const storageKey = 'giga-activos-informacion-v1';

const exampleAssets = [
	{ identifier: 'AI-EJ-001', name: 'Sistema de información SISNET', type: 'Sistema de información', process: 'Gestión de la Información y las Comunicaciones', isExample: true },
	{ identifier: 'AI-EJ-002', name: 'Base de datos de funcionarios', type: 'Base de datos', process: 'Gestión del Talento Humano', isExample: true },
	{ identifier: 'AI-EJ-003', name: 'Expedientes contractuales', type: 'Documento', process: 'Gestión Financiera', isExample: true }
];

export const assetOptions = {
	processes: ['Gestión del Talento Humano', 'Gestión Financiera', 'Gestión de la Información y las Comunicaciones', 'Direccionamiento Estratégico'],
	types: ['Software', 'Servicio', 'Información', 'Base de datos', 'Documento', 'Hardware', 'Repositorio', 'Sistema de información', 'Otro'],
	mediums: ['Digital', 'Físico', 'Mixto', 'Otro'],
	formats: ['Sistema de información', 'Base de datos', 'Documento electrónico', 'Documento físico', 'Hoja de cálculo', 'Correo electrónico', 'Imagen', 'Audio', 'Video', 'Repositorio', 'Otro'],
	confidentialities: ['Información pública', 'Información pública clasificada', 'Información pública reservada'],
	levels: ['Baja', 'Media', 'Alta'],
	criticalities: ['BAJA', 'MEDIA', 'ALTA'],
	publicationStatuses: ['Publicada', 'No publicada o disponible', 'Publicación parcial'],
	locations: ['Archivo físico', 'Servidor institucional', 'Sistema de información', 'Portal web institucional', 'Portal web de terceros', 'Repositorio', 'Google Drive', 'Otro'],
	personalDataTypes: ['Identificación', 'Contacto', 'Ubicación', 'Financieros', 'Laborales', 'Académicos', 'Biométricos', 'Salud', 'Datos sensibles', 'Otros']
};

export function getStoredAssets() {
	if (typeof localStorage === 'undefined') return [];
	try {
		const value = JSON.parse(localStorage.getItem(storageKey) || '[]');
		return Array.isArray(value) ? value : [];
	} catch {
		return [];
	}
}

export function getAssetsForSelection() {
	return [...exampleAssets, ...getStoredAssets()];
}

export function saveStoredAsset(asset) {
	if (typeof localStorage === 'undefined') return;
	const assets = getStoredAssets().filter((item) => item.id !== asset.id);
	localStorage.setItem(storageKey, JSON.stringify([...assets, structuredClone(asset)]));
}

export function nextAssetIdentifier() {
	const highest = getStoredAssets().reduce((max, asset) => {
		const number = Number.parseInt(String(asset.identifier || '').replace('AI-', ''), 10);
		return Number.isNaN(number) ? max : Math.max(max, number);
	}, 0);
	return `AI-${String(highest + 1).padStart(6, '0')}`;
}

export function getAssetById(id) {
	return getStoredAssets().find((asset) => asset.id === id) || null;
}
