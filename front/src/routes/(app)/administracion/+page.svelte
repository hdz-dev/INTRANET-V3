<script>
	import { apiRequest } from '$lib/api/client.js';
	import { authStore } from '$lib/authStore.js';
	import { onMount } from 'svelte';

	let activeTab = 'users';
	let loading = true;
	let errorMessage = '';
	let data = { users: [], roles: [], permissions: [], dependencies: [], processes: [], sessions: [], events: [] };
	let roleForm = { name: '', description: '', critical: false, permissionIds: [] };
	let roleMessage = '';
	let userForm = { name: '', email: '', password: '', dependencyId: '' };
	let userMessage = '';

	const tabs = [
		['users', 'Usuarios'],
		['roles', 'Roles'],
		['permissions', 'Permisos'],
		['organization', 'Organización'],
		['sessions', 'Sesiones'],
		['audit', 'Auditoría']
	];

	$: canView = $authStore.permissions?.includes('users.read') || $authStore.permissions?.includes('roles.read');

	onMount(loadAdministration);

	async function loadAdministration() {
		loading = true;
		errorMessage = '';
		try {
			const responses = await Promise.allSettled([
				apiRequest('/api/admin/users'),
				apiRequest('/api/admin/roles'),
				apiRequest('/api/admin/permissions'),
				apiRequest('/api/admin/dependencies'),
				apiRequest('/api/admin/processes'),
				apiRequest('/api/admin/sessions'),
				apiRequest('/api/admin/audit')
			]);
			const [users, roles, permissions, dependencies, processes, sessions, events] = responses;
			data = {
				users: users.status === 'fulfilled' ? users.value.users : [],
				roles: roles.status === 'fulfilled' ? roles.value.roles : [],
				permissions: permissions.status === 'fulfilled' ? permissions.value.permissions : [],
				dependencies: dependencies.status === 'fulfilled' ? dependencies.value.dependencies : [],
				processes: processes.status === 'fulfilled' ? processes.value.processes : [],
				sessions: sessions.status === 'fulfilled' ? sessions.value.sessions : [],
				events: events.status === 'fulfilled' ? events.value.events : []
			};
			if (!responses.some((item) => item.status === 'fulfilled')) errorMessage = 'No fue posible cargar la administración.';
		} catch {
			errorMessage = 'No fue posible cargar la administración.';
		} finally {
			loading = false;
		}
	}

	async function createRole() {
		roleMessage = '';
		try {
			await apiRequest('/api/admin/roles', { method: 'POST', body: JSON.stringify(roleForm) });
			roleForm = { name: '', description: '', critical: false, permissionIds: [] };
			roleMessage = 'Rol creado correctamente.';
			await loadAdministration();
		} catch (error) {
			roleMessage = error.message || 'No fue posible crear el rol.';
		}
	}

	function togglePermission(permissionId) {
		roleForm.permissionIds = roleForm.permissionIds.includes(permissionId)
			? roleForm.permissionIds.filter((id) => id !== permissionId)
			: [...roleForm.permissionIds, permissionId];
	}

	async function createUser() {
		userMessage = '';
		try {
			await apiRequest('/api/admin/users', { method: 'POST', body: JSON.stringify({ ...userForm, dependencyId: userForm.dependencyId || undefined }) });
			userForm = { name: '', email: '', password: '', dependencyId: '' };
			userMessage = 'Usuario creado correctamente.';
			await loadAdministration();
		} catch (error) {
			userMessage = error.message || 'No fue posible crear el usuario.';
		}
	}

	async function updateUserStatus(user, status) {
		try {
			await apiRequest(`/api/admin/users/${user.id}/status`, { method: 'PATCH', body: JSON.stringify({ status }) });
			await loadAdministration();
		} catch (error) {
			userMessage = error.message || 'No fue posible actualizar el estado.';
		}
	}
</script>

<svelte:head><title>Administración | GIGA</title></svelte:head>

<main class="min-h-screen px-4 py-8 sm:px-6 lg:px-10">
	<div class="mx-auto max-w-7xl space-y-6">
		<section class="glass-3 rounded-2xl p-6 sm:p-8">
			<p class="text-primary text-sm font-semibold tracking-[0.18em] uppercase">GIGA</p>
			<h1 class="mt-2 text-3xl font-bold text-gray-900">Administración</h1>
			<p class="mt-2 text-gray-600">Usuarios, accesos, organización y sesiones.</p>
		</section>

		{#if !canView}
			<section class="glass-3 rounded-xl p-6 text-red-700">No tienes permisos para consultar este módulo.</section>
		{:else}
			<nav class="flex flex-wrap gap-2" aria-label="Secciones de administración">
				{#each tabs as [key, label] (key)}
					<button type="button" class:active-tab={activeTab === key} class="tab-button" on:click={() => (activeTab = key)}>{label}</button>
				{/each}
			</nav>

			{#if errorMessage}<p role="alert" class="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{errorMessage}</p>{/if}
			{#if loading}
				<section class="glass-3 rounded-xl p-8 text-gray-600">Cargando administración...</section>
			{:else if activeTab === 'users'}
				<section class="grid gap-6 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.5fr)]"><form class="glass-3 rounded-xl p-6" on:submit|preventDefault={createUser}><h2 class="mb-4 text-xl font-semibold">Nuevo usuario</h2><input required bind:value={userForm.name} class="control" placeholder="Nombre completo" /><input required bind:value={userForm.email} type="email" class="control mt-3" placeholder="Correo institucional" /><input required minlength="12" bind:value={userForm.password} type="password" class="control mt-3" placeholder="Contraseña temporal" /><select bind:value={userForm.dependencyId} class="control mt-3"><option value="">Sin dependencia</option>{#each data.dependencies as dependency (dependency.id)}<option value={dependency.id}>{dependency.name}</option>{/each}</select>{#if userMessage}<p class="mt-4 text-sm text-gray-700">{userMessage}</p>{/if}<button type="submit" class="bg-primary mt-5 rounded-lg px-4 py-2 text-sm font-semibold text-white">Crear usuario</button></form><section class="glass-3 overflow-x-auto rounded-xl p-6"><h2 class="mb-4 text-xl font-semibold">Usuarios ({data.users.length})</h2><table class="admin-table"><thead><tr><th>Nombre</th><th>Correo</th><th>Estado</th><th>Roles</th><th>Acción</th></tr></thead><tbody>{#each data.users as item (item.id)}<tr><td>{item.name}</td><td>{item.email}</td><td>{item.status}</td><td>{item.roleAssignments.map((assignment) => assignment.role.name).join(', ') || 'Sin roles'}</td><td>{#if item.status === 'ACTIVE'}<button type="button" class="text-sm text-red-700" on:click={() => updateUserStatus(item, 'DISABLED')}>Desactivar</button>{:else}<button type="button" class="text-sm text-green-700" on:click={() => updateUserStatus(item, 'ACTIVE')}>Activar</button>{/if}</td></tr>{/each}</tbody></table></section></section>
			{:else if activeTab === 'roles'}
				<section class="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)]"><form class="glass-3 rounded-xl p-6" on:submit|preventDefault={createRole}><h2 class="mb-4 text-xl font-semibold">Nuevo rol</h2><input required bind:value={roleForm.name} class="control" placeholder="Nombre del rol" /><textarea required bind:value={roleForm.description} class="control mt-3" placeholder="Descripción"></textarea><label class="mt-3 flex items-center gap-2 text-sm"><input type="checkbox" bind:checked={roleForm.critical} /> Rol crítico</label><p class="mt-4 text-sm font-semibold">Permisos</p><div class="mt-2 max-h-64 space-y-2 overflow-y-auto">{#each data.permissions as permission (permission.id)}<label class="flex items-start gap-2 text-sm"><input type="checkbox" checked={roleForm.permissionIds.includes(permission.id)} on:change={() => togglePermission(permission.id)} /><span>{permission.code}<small class="block text-gray-500">{permission.description}</small></span></label>{/each}</div>{#if roleMessage}<p class="mt-4 text-sm text-gray-700">{roleMessage}</p>{/if}<button type="submit" class="bg-primary mt-5 rounded-lg px-4 py-2 text-sm font-semibold text-white">Crear rol</button></form><div class="glass-3 rounded-xl p-6"><h2 class="mb-4 text-xl font-semibold">Roles ({data.roles.length})</h2><div class="grid gap-3">{#each data.roles as item (item.id)}<article class="rounded-xl bg-white/50 p-4"><h3 class="font-semibold">{item.name}</h3><p class="text-sm text-gray-600">{item.description}</p><p class="mt-2 text-xs text-gray-500">{item.permissions.length} permisos {item.critical ? '· crítico' : ''}</p></article>{/each}</div></div></section>
			{:else if activeTab === 'permissions'}
				<section class="glass-3 overflow-x-auto rounded-xl p-6"><h2 class="mb-4 text-xl font-semibold">Permisos ({data.permissions.length})</h2><table class="admin-table"><thead><tr><th>Código</th><th>Descripción</th><th>Módulo</th></tr></thead><tbody>{#each data.permissions as item (item.id)}<tr><td>{item.code}</td><td>{item.description}</td><td>{item.module.name}</td></tr>{/each}</tbody></table></section>
			{:else if activeTab === 'organization'}
				<section class="grid gap-6 lg:grid-cols-2"><div class="glass-3 rounded-xl p-6"><h2 class="mb-4 text-xl font-semibold">Dependencias ({data.dependencies.length})</h2>{#each data.dependencies as item (item.id)}<p class="border-b border-gray-200/60 py-2">{item.code} · {item.name}</p>{/each}</div><div class="glass-3 rounded-xl p-6"><h2 class="mb-4 text-xl font-semibold">Procesos ({data.processes.length})</h2>{#each data.processes as item (item.id)}<p class="border-b border-gray-200/60 py-2">{item.code} · {item.name}</p>{/each}</div></section>
			{:else if activeTab === 'sessions'}
				<section class="glass-3 overflow-x-auto rounded-xl p-6"><h2 class="mb-4 text-xl font-semibold">Sesiones activas ({data.sessions.length})</h2><table class="admin-table"><thead><tr><th>Usuario</th><th>Última actividad</th><th>Expira</th><th>IP</th></tr></thead><tbody>{#each data.sessions as item (item.id)}<tr><td>{item.user.name}</td><td>{new Date(item.lastSeenAt).toLocaleString()}</td><td>{new Date(item.expiresAt).toLocaleString()}</td><td>{item.ipAddress || 'No registrada'}</td></tr>{/each}</tbody></table></section>
			{:else}
				<section class="glass-3 overflow-x-auto rounded-xl p-6"><h2 class="mb-4 text-xl font-semibold">Auditoría ({data.events.length})</h2><table class="admin-table"><thead><tr><th>Fecha</th><th>Acción</th><th>Entidad</th><th>Actor</th></tr></thead><tbody>{#each data.events as item (item.id)}<tr><td>{new Date(item.createdAt).toLocaleString()}</td><td>{item.action}</td><td>{item.entity}</td><td>{item.actor?.email || 'Sistema'}</td></tr>{/each}</tbody></table></section>
			{/if}
		{/if}
	</div>
</main>

<style>
	.tab-button { border: 1px solid rgb(209 213 219 / 70%); border-radius: 0.5rem; background: rgb(255 255 255 / 55%); padding: 0.625rem 0.9rem; color: #374151; font-size: 0.875rem; font-weight: 600; }
	.active-tab { border-color: #2563eb; background: rgb(239 246 255 / 80%); color: #1d4ed8; }
	.admin-table { width: 100%; border-collapse: collapse; font-size: 0.875rem; }
	.admin-table th, .admin-table td { border-bottom: 1px solid rgb(209 213 219 / 60%); padding: 0.75rem; text-align: left; white-space: nowrap; }
	.admin-table th { color: #4b5563; font-size: 0.75rem; text-transform: uppercase; }
</style>
