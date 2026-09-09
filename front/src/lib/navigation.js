export const navigationItems = [
	{ id: 'inicio', label: 'Inicio', href: '/', icon: 'home', group: 'Principal' },
	{
		id: 'radicacion',
		label: 'Correspondencia',
		href: '/radicacion',
		icon: 'file-text',
		group: 'Servicios'
	},
	{
		id: 'calendario',
		label: 'Calendario',
		href: '/permisos',
		icon: 'calendar',
		group: 'Servicios'
	},
	{
		id: 'comunicaciones',
		label: 'Comunicaciones',
		href: '/pqrs',
		icon: 'message-square',
		group: 'Servicios'
	},
	{ id: 'directorio', label: 'Directorio', href: '/directorio', icon: 'phone', group: 'Servicios' },
	{ id: 'soporte', label: 'Soporte técnico', href: '/soporte', icon: 'tool', group: 'Servicios' },
	{
		id: 'conocimiento',
		label: 'Gestión del conocimiento',
		href: '/gestion-conocimiento',
		icon: 'book-open',
		group: 'Gestión'
	}
];

export function getNavigationItem(id) {
	return navigationItems.find((item) => item.id === id);
}
