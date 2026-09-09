const dashboardData = {
	userData: {
		name: 'Carlos Hernandez',
		position: 'Gestión de Sistemas Información',
		department: 'Oficina de Tecnologías',
		avatar: '/carlos perf.png?height=100&width=100',
		lastLogin: '2023-05-15T08:30:00'
	},
	notificationCount: 3,
	messageCount: 2,
	latestNews: [
		{
			id: 1,
			title: 'Actualización del Plan de Desarrollo Municipal',
			summary:
				'Se ha publicado la actualización del Plan de Desarrollo Municipal con los ajustes aprobados en el último Concejo.',
			date: '2023-05-15',
			image:
				'https://jamundi.gov.co/NuestraAlcaldia/SaladePrensa/PublishingImages/20240904_172327.jpg',
			priority: 'high'
		},
		{
			id: 2,
			title: 'Capacitación obligatoria en SECOP II',
			summary:
				'Todos los funcionarios de contratación deben completar la capacitación en la nueva versión de SECOP II antes del 30 de mayo.',
			date: '2023-05-14',
			image:
				'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqU4uKQV9DrYOwL-Kqo0jMDyExcmYR11_zJQ&sheight=200&width=400',
			priority: 'medium'
		},
		{
			id: 3,
			title: 'Mantenimiento programado de la red municipal',
			summary:
				'El próximo sábado se realizará mantenimiento de la infraestructura de red. Algunos servicios no estarán disponibles.',
			date: '2023-05-13',
			image:
				'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2mvk8mphpqx9MPteZXeZqd9vHKZeToVsaMg&s?height=200&width=400',
			priority: 'medium'
		}
	],
	upcomingEvents: [
		{
			id: 1,
			title: 'Comité de Gestión y Desempeño',
			date: '2023-05-18T09:00:00',
			location: 'Sala de Juntas Principal'
		},
		{
			id: 2,
			title: 'Rendición de Cuentas Trimestral',
			date: '2023-05-25T14:00:00',
			location: 'Auditorio Municipal'
		},
		{
			id: 3,
			title: 'Capacitación MIPG',
			date: '2023-05-20T10:00:00',
			location: 'Sala de Capacitación 2'
		}
	],
	quickAccess: [
		{
			id: 1,
			title: 'Gestión de correspondencia - SISNET',
			icon: '/icons/file-text.svg',
			path: 'radicacion',
			color: 'blue'
		},
		{
			id: 2,
			title: 'Gestión de calendario',
			icon: '/icons/calendar.svg',
			path: 'permisos',
			color: 'purple'
		},
		{
			id: 3,
			title: 'Comunicación interna',
			icon: '/icons/message-square.svg',
			path: 'pqrs',
			color: 'green'
		},
		{
			id: 4,
			title: 'Directorio telefónico',
			icon: '/icons/phone.svg',
			path: 'directorio',
			color: 'orange'
		},
		{
			id: 5,
			title: 'Soporte técnico - Mesa de ayuda',
			icon: '/icons/tool.svg',
			path: 'soporte',
			color: 'red'
		},
		{
			id: 6,
			title: 'Reserva de espacios',
			icon: '/icons/map-pin.svg',
			path: 'espacios',
			color: 'teal'
		}
	],
	recentActivity: [
		{
			id: 1,
			action: 'Documento aprobado',
			detail: 'Resolución 123-2023',
			time: 'Hace 2 horas',
			icon: '/icons/check-circle.svg',
			color: 'green'
		},
		{
			id: 2,
			action: 'Solicitud enviada',
			detail: 'Permiso laboral - 24 mayo',
			time: 'Hace 5 horas',
			icon: '/icons/send.svg',
			color: 'blue'
		},
		{
			id: 3,
			action: 'Comentario en proyecto',
			detail: 'Renovación Parque Central',
			time: 'Ayer, 15:30',
			icon: '/icons/message-circle.svg',
			color: 'purple'
		},
		{
			id: 4,
			action: 'Documento rechazado',
			detail: 'Formato de viáticos',
			time: 'Ayer, 11:20',
			icon: '/icons/x-circle.svg',
			color: 'red'
		}
	],
	performanceMetrics: [
		{ id: 1, name: 'Cumplimiento Plan de Acción', value: 78, target: 100, unit: '%' },
		{ id: 2, name: 'Ejecución Presupuestal', value: 42, target: 100, unit: '%' },
		{ id: 3, name: 'PQRS Atendidas a Tiempo', value: 92, target: 100, unit: '%' },
		{ id: 4, name: 'Proyectos en Ejecución', value: 24, target: 30, unit: '' }
	],
	projectProgress: [
		{ name: 'Ene', value: 30 },
		{ name: 'Feb', value: 40 },
		{ name: 'Mar', value: 45 },
		{ name: 'Abr', value: 55 },
		{ name: 'May', value: 65 }
	],
	frequentContacts: [
		{
			id: 1,
			name: 'Damaris Mayor',
			position: 'Secretaria de Hacienda',
			status: 'online',
			avatar: ''
		},
		{
			id: 2,
			name: 'Eduardo Calonge',
			position: 'Secretaria de Planeación',
			status: 'offline',
			avatar: ''
		},
		{ id: 3, name: 'María Rodríguez', position: 'Jurídica', status: 'busy', avatar: '' },
		{ id: 4, name: 'Andres Ruiz', position: 'Oficina TIC', status: 'away', avatar: '' }
	],
	birthdaysThisMonth: [
		{ name: 'María Rodríguez', department: 'Recursos Humanos', day: 18 },
		{ name: 'José Martínez', department: 'Sistemas', day: 22 },
		{ name: 'Laura Sánchez', department: 'Planeación', day: 25 }
	]
};

export function getDashboardData() {
	return structuredClone(dashboardData);
}
