<script>
	import { onMount } from 'svelte';
	import { apiRequest } from '$lib/api/client.js';
	import { authStore } from '$lib/authStore.js';

	let activeTab = 'users';
	let loading = true;
	let saving = false;
	let errorMessage = '';
	let message = '';
	let searchTerm = '';
	let roleFilter = 'ALL';
	let showUserModal = false;
	let editingUser = null;
	let userForm = {
		documentId: '',
		name: '',
		email: '',
		password: '',
		dependencyId: '',
		areaId: '',
		roleId: '',
		scopeType: 'GLOBAL',
		processId: ''
	};
	let roleForm = { name: '', description: '', critical: false, permissionIds: [] };
	let data = {
		users: [],
		roles: [],
		permissions: [],
		dependencies: [],
		areas: [],
		processes: [],
		sessions: [],
		events: []
	};

	const tabs = [
		['users', 'Usuarios'],
		['roles', 'Roles'],
		['permissions', 'Permisos'],
		['organization', 'Organización'],
		['sessions', 'Sesiones'],
		['audit', 'Auditoría']
	];

	$: canView =
		$authStore.permissions?.includes('users.read') ||
		$authStore.permissions?.includes('roles.read');
	$: filteredUsers = data.users.filter((user) => {
		const term = searchTerm.trim().toLowerCase();
		const matchesSearch =
			!term || user.name.toLowerCase().includes(term) || user.email.toLowerCase().includes(term);
		const matchesRole =
			roleFilter === 'ALL' || user.roleAssignments.some((item) => item.role.id === roleFilter);
		return matchesSearch && matchesRole;
	});

	onMount(loadAdministration);

	async function loadAdministration() {
		loading = true;
		errorMessage = '';
		try {
			const results = await Promise.allSettled([
				apiRequest('/api/admin/users'),
				apiRequest('/api/admin/roles'),
				apiRequest('/api/admin/permissions'),
				apiRequest('/api/admin/dependencies'),
				apiRequest('/api/admin/areas'),
				apiRequest('/api/admin/processes'),
				apiRequest('/api/admin/sessions'),
				apiRequest('/api/admin/audit')
			]);
			const [users, roles, permissions, dependencies, areas, processes, sessions, events] = results;
			data = {
				users: users.status === 'fulfilled' ? users.value.users : [],
				roles: roles.status === 'fulfilled' ? roles.value.roles : [],
				permissions: permissions.status === 'fulfilled' ? permissions.value.permissions : [],
				dependencies: dependencies.status === 'fulfilled' ? dependencies.value.dependencies : [],
				areas: areas.status === 'fulfilled' ? areas.value.areas : [],
				processes: processes.status === 'fulfilled' ? processes.value.processes : [],
				sessions: sessions.status === 'fulfilled' ? sessions.value.sessions : [],
				events: events.status === 'fulfilled' ? events.value.events : []
			};
			if (!results.some((item) => item.status === 'fulfilled'))
				errorMessage = 'No fue posible cargar la administración.';
		} catch {
			errorMessage = 'No fue posible cargar la administración.';
		} finally {
			loading = false;
		}
	}

	function openUserModal(user = null) {
		editingUser = user;
		userForm = user
			? {
					documentId: user.documentId || '',
					name: user.name,
					email: user.email,
					password: '',
					dependencyId: user.dependency?.id || '',
					areaId: user.area?.id || '',
					roleId: '',
					scopeType: 'GLOBAL',
					processId: ''
				}
			: {
					documentId: '',
					name: '',
					email: '',
					password: '',
					dependencyId: '',
					areaId: '',
					roleId: '',
					scopeType: 'GLOBAL',
					processId: ''
				};
		showUserModal = true;
		message = '';
	}

	function closeUserModal() {
		showUserModal = false;
		editingUser = null;
	}

	async function createUser() {
		saving = true;
		errorMessage = '';
		try {
			const payload = {
				...userForm,
				dependencyId: userForm.dependencyId || undefined,
				areaId: userForm.areaId || undefined,
				roleId: userForm.roleId || undefined,
				processId: userForm.processId || undefined
			};
			if (!payload.password) delete payload.password;
			if (editingUser) {
				delete payload.roleId;
				delete payload.scopeType;
				delete payload.processId;
				if (!payload.documentId) delete payload.documentId;
			}
			await apiRequest(editingUser ? `/api/admin/users/${editingUser.id}` : '/api/admin/users', {
				method: editingUser ? 'PATCH' : 'POST',
				body: JSON.stringify(payload)
			});
			closeUserModal();
			message = editingUser
				? 'Usuario actualizado correctamente.'
				: 'Usuario creado correctamente.';
			await loadAdministration();
		} catch (error) {
			errorMessage = error.message || 'No fue posible crear el usuario.';
		} finally {
			saving = false;
		}
	}

	async function updateUserStatus(user, status) {
		const previousStatus = user.status;
		data = {
			...data,
			users: data.users.map((item) => (item.id === user.id ? { ...item, status } : item))
		};
		saving = true;
		try {
			await apiRequest(`/api/admin/users/${user.id}/status`, {
				method: 'PATCH',
				body: JSON.stringify({ status })
			});
			message = 'Estado de usuario actualizado.';
			await loadAdministration();
		} catch (error) {
			data = {
				...data,
				users: data.users.map((item) =>
					item.id === user.id ? { ...item, status: previousStatus } : item
				)
			};
			errorMessage = error.message || 'No fue posible actualizar el usuario.';
		} finally {
			saving = false;
		}
	}

	async function deleteUser(user) {
		if (!confirm(`¿Eliminar a ${user.name}? Esta acción no se puede deshacer.`)) return;
		const previousUsers = data.users;
		data = { ...data, users: data.users.filter((item) => item.id !== user.id) };
		saving = true;
		try {
			await apiRequest(`/api/admin/users/${user.id}`, { method: 'DELETE' });
			message = 'Usuario eliminado correctamente.';
		} catch (error) {
			data = { ...data, users: previousUsers };
			errorMessage = error.message || 'No fue posible eliminar el usuario.';
		} finally {
			saving = false;
		}
	}

	function togglePermission(permissionId) {
		roleForm.permissionIds = roleForm.permissionIds.includes(permissionId)
			? roleForm.permissionIds.filter((id) => id !== permissionId)
			: [...roleForm.permissionIds, permissionId];
	}

	async function createRole() {
		saving = true;
		try {
			await apiRequest('/api/admin/roles', { method: 'POST', body: JSON.stringify(roleForm) });
			roleForm = { name: '', description: '', critical: false, permissionIds: [] };
			message = 'Rol creado correctamente.';
			await loadAdministration();
		} catch (error) {
			errorMessage = error.message || 'No fue posible crear el rol.';
		} finally {
			saving = false;
		}
	}

	async function revokeSession(session) {
		saving = true;
		try {
			await apiRequest(`/api/admin/sessions/${session.id}/revoke`, { method: 'POST' });
			message = 'Sesión revocada correctamente.';
			await loadAdministration();
		} catch (error) {
			errorMessage = error.message || 'No fue posible revocar la sesión.';
		} finally {
			saving = false;
		}
	}
</script>

<svelte:head><title>Administración | GIGA</title></svelte:head>

<main class="min-h-screen px-4 py-8 sm:px-6 lg:px-10">
	<div class="mx-auto max-w-7xl space-y-5">
		{#if !canView}
			<section class="glass-3 rounded-xl p-6 text-red-700">
				No tienes permisos para consultar este módulo.
			</section>
		{:else}
			{#if errorMessage}<p
					role="alert"
					class="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
				>
					{errorMessage}
				</p>{/if}
			{#if message}<p
					role="status"
					class="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700"
				>
					{message}
				</p>{/if}
			<nav class="flex flex-wrap gap-2" aria-label="Secciones de administración">
				{#each tabs as [key, label] (key)}<button
						type="button"
						class="rounded-lg border border-gray-300/70 bg-white/55 px-3.5 py-2 text-sm font-semibold text-gray-700 hover:bg-white/80"
						class:border-blue-600={activeTab === key}
						class:bg-blue-50={activeTab === key}
						class:text-blue-700={activeTab === key}
						on:click={() => (activeTab = key)}>{label}</button
					>{/each}
			</nav>

			{#if activeTab === 'users'}
				<section class="glass-3 rounded-xl p-5 sm:p-6">
					<div class="mb-4 flex flex-wrap items-start justify-between gap-4">
						<div>
							<h1 class="text-2xl font-bold text-gray-900">Gestión de Usuarios</h1>
							<p class="text-sm text-gray-600">Administrar funcionarios y permisos del sistema</p>
						</div>
						<button
							type="button"
							class="bg-primary inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700"
							on:click={openUserModal}>+ Nuevo Usuario</button
						>
					</div>
					<div class="grid gap-3 sm:grid-cols-[minmax(0,1fr)_12rem_auto]">
						<input
							bind:value={searchTerm}
							class="focus:border-primary focus:ring-primary/25 block w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm text-gray-600 shadow-sm focus:outline-none focus:ring-2"
							placeholder="Buscar por nombre o correo..."
							aria-label="Buscar usuarios"
						/><select
							bind:value={roleFilter}
							class="focus:border-primary focus:ring-primary/25 block w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm text-gray-600 shadow-sm focus:outline-none focus:ring-2"
							aria-label="Filtrar por rol"
							><option value="ALL">Todos los roles</option
							>{#each data.roles as role (role.id)}<option value={role.id}>{role.name}</option
								>{/each}</select
						><button
							type="button"
							class="rounded-xl bg-gray-100/85 px-3 py-2 text-base font-bold text-gray-600 hover:bg-gray-200"
							title="Actualizar lista"
							aria-label="Actualizar lista"
							on:click={loadAdministration}>⟳</button
						>
					</div>
				</section>

				<section class="glass-3 overflow-x-auto rounded-xl p-3 sm:p-4">
					<table class="min-w-[1120px] w-full border-collapse text-sm [&_tbody_tr]:border-t [&_tbody_tr]:border-gray-200/70 [&_tbody_tr]:transition-colors [&_tbody_tr:hover]:bg-white/45 [&_td]:px-4 [&_td]:py-4 [&_th]:px-4 [&_th]:py-3">
						<thead
							><tr class="text-left"><th class="w-[24%]">Usuario</th><th class="w-[14%]">Documento</th><th class="w-[20%]">Dependencia / Área</th><th class="w-[17%]">Rol</th><th>Estado</th><th class="w-[12%]">Fecha</th><th class="w-[13%] text-right">Acciones</th></tr
							></thead
						><tbody>
							{#if loading}<tr><td colspan="7" class="py-12 text-center text-gray-500">Cargando usuarios...</td></tr>
							{:else if filteredUsers.length === 0}<tr><td colspan="7" class="py-12 text-center text-gray-500">No se encontraron usuarios.</td></tr>
							{:else}{#each filteredUsers as user (user.id)}<tr
										><td
											><button
												type="button"
												class="flex items-center gap-3 text-left"
												on:click={() => openUserModal(user)}
												><span
													class="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#3f51f5] text-xs font-bold text-white"
													>{user.name.charAt(0).toUpperCase()}</span
												><span
													><strong class="block text-sm text-gray-900">{user.name}</strong><small
														class="text-gray-500">{user.email}</small
													></span
												></button
											></td
										><td class="text-sm text-gray-700">{user.documentId || 'Sin documento'}</td><td
											><span class="block">{user.dependency?.name || 'Sin dependencia'}</span><span
												class="text-xs text-gray-500">{user.area?.name || 'Sin área'}</span
											></td
										><td
											><div class="flex flex-wrap gap-1">
												{#each user.roleAssignments as assignment (assignment.id)}<span
														class="inline-flex rounded-full bg-blue-100/85 px-2 py-1 text-xs font-semibold text-blue-700"
														>{assignment.role.name}</span
													>{/each}{#if !user.roleAssignments.length}<span
														class="text-xs text-gray-500">Sin rol</span
													>{/if}
											</div></td
										><td
											><button
												class="inline-flex items-center rounded-lg px-1.5 py-1"
												type="button"
												title={user.status === 'ACTIVE' ? 'Desactivar Usuario' : 'Activar Usuario'}
												aria-label={user.status === 'ACTIVE'
													? `Desactivar ${user.name}`
													: `Activar ${user.name}`}
												on:click={() =>
													updateUserStatus(user, user.status === 'ACTIVE' ? 'DISABLED' : 'ACTIVE')}
												disabled={saving}
											>
												<span
													class:status-dot-active={user.status === 'ACTIVE'}
													class:status-dot-disabled={user.status !== 'ACTIVE'}
													class="mr-2 h-2 w-2 rounded-full"
												></span>
												<span
													class="text-sm font-medium text-center"
													class:text-green-700={user.status === 'ACTIVE'}
													class:text-gray-600={user.status !== 'ACTIVE'}
													>{user.status === 'ACTIVE' ? 'Activo' : "Inactivo"}</span
												>
												<span
													class:translate-x-4={user.status === 'ACTIVE'}
													class:translate-x-0={user.status !== 'ACTIVE'}
													class="m-2 inline-flex h-5 w-9 items-center rounded-full bg-gray-300 p-0.5 transition-colors"
													class:bg-green-500={user.status === 'ACTIVE'}
													><span class="h-4 w-4 rounded-full bg-white shadow"></span></span
												>
											</button></td
										><td class="text-sm text-gray-500"
											>{user.createdAt
												? new Date(user.createdAt).toLocaleDateString('es-CO')
												: '—'}</td
										><td class="text-right"
											><div class="flex items-center justify-end space-x-2">
												<button
													type="button"
													class="bg-primary inline-flex h-8 w-8 items-center justify-center rounded-full p-2 text-white transition-transform hover:scale-105"
													title="Editar Usuario"
													aria-label={`Gestionar ${user.name}`}
													on:click={() => openUserModal(user)}
													><svg class="h-5 w-5" fill="none" stroke="white" viewBox="0 0 24 24"
														><path
															stroke-linecap="round"
															stroke-linejoin="round"
															stroke-width="2"
															d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
														/></svg
													></button
												><button
													type="button"
													class="inline-flex h-8 w-8 items-center justify-center rounded-full bg-red-500 p-2 text-white transition-transform hover:scale-105"
													title="Eliminar Usuario"
													aria-label={`Eliminar ${user.name}`}
													on:click={() => deleteUser(user)}
													disabled={saving}
													><svg class="h-5 w-5" fill="none" stroke="white" viewBox="0 0 24 24"
														><path
															stroke-linecap="round"
															stroke-linejoin="round"
															stroke-width="2"
															d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
														/></svg
													></button
												>
											</div></td
										></tr
									>{/each}{/if}
						</tbody>
					</table>
				</section>
			{:else if activeTab === 'roles'}
				<section class="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)]">
					<form class="glass-3 rounded-xl p-6" on:submit|preventDefault={createRole}>
						<h2 class="mb-4 text-xl font-semibold">Nuevo rol</h2>
						<input
							required
							bind:value={roleForm.name}
							class="focus:border-primary focus:ring-primary/25 block w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm text-gray-600 shadow-sm focus:outline-none focus:ring-2"
							placeholder="Nombre del rol"
						/><textarea
							required
							bind:value={roleForm.description}
							class="focus:border-primary focus:ring-primary/25 mt-3 block w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm text-gray-600 shadow-sm focus:outline-none focus:ring-2"
							placeholder="Descripción"
						></textarea><label class="mt-3 flex items-center gap-2 text-sm"
							><input type="checkbox" bind:checked={roleForm.critical} /> Rol crítico</label
						>
						<p class="mt-4 text-sm font-semibold">Permisos</p>
						<div class="mt-2 max-h-64 space-y-2 overflow-y-auto">
							{#each data.permissions as permission (permission.id)}<label
									class="flex items-start gap-2 text-sm"
									><input
										type="checkbox"
										checked={roleForm.permissionIds.includes(permission.id)}
										on:change={() => togglePermission(permission.id)}
									/><span
										>{permission.code}<small class="block text-gray-500"
											>{permission.description}</small
										></span
									></label
								>{/each}
						</div>
						<button
							type="submit"
							class="bg-primary mt-5 rounded-lg px-4 py-2 text-sm font-semibold text-white"
							disabled={saving}>Crear rol</button
						>
					</form>
					<div class="glass-3 rounded-xl p-6">
						<h2 class="mb-4 text-xl font-semibold">Roles ({data.roles.length})</h2>
						{#each data.roles as role (role.id)}<article class="mb-3 rounded-xl bg-white/50 p-4">
								<h3 class="font-semibold">{role.name}</h3>
								<p class="text-sm text-gray-600">{role.description}</p>
								<p class="mt-2 text-xs text-gray-500">
									{role.permissions.length} permisos {role.critical ? '· crítico' : ''}
								</p>
							</article>{/each}
					</div>
				</section>
			{:else if activeTab === 'permissions'}<section class="glass-3 overflow-x-auto rounded-xl p-6">
					<h2 class="mb-4 text-xl font-semibold">Permisos ({data.permissions.length})</h2>
					<table class="w-full border-collapse text-sm">
						<thead><tr><th>Código</th><th>Descripción</th><th>Módulo</th></tr></thead><tbody
							>{#each data.permissions as permission (permission.id)}<tr
									><td>{permission.code}</td><td>{permission.description}</td><td
										>{permission.module.name}</td
									></tr
								>{/each}</tbody
						>
					</table>
				</section>
			{:else if activeTab === 'organization'}<section class="grid gap-6 lg:grid-cols-2">
					<div class="glass-3 rounded-xl p-6">
						<h2 class="mb-4 text-xl font-semibold">Dependencias ({data.dependencies.length})</h2>
						{#each data.dependencies as dependency (dependency.id)}<p
								class="border-b border-gray-200/60 py-2"
							>
								{dependency.code} · {dependency.name}
							</p>{/each}
					</div>
					<div class="glass-3 rounded-xl p-6">
						<h2 class="mb-4 text-xl font-semibold">Procesos ({data.processes.length})</h2>
						{#each data.processes as process (process.id)}<p
								class="border-b border-gray-200/60 py-2"
							>
								{process.code} · {process.name}
							</p>{/each}
					</div>
				</section>
			{:else if activeTab === 'sessions'}<section class="glass-3 overflow-x-auto rounded-xl p-6">
					<h2 class="mb-4 text-xl font-semibold">Sesiones activas ({data.sessions.length})</h2>
					<table class="w-full border-collapse text-sm">
						<thead
							><tr><th>Usuario</th><th>Última actividad</th><th>Expira</th><th>IP</th><th></th></tr
							></thead
						><tbody
							>{#each data.sessions as session (session.id)}<tr
									><td
										>{session.user.name}<span class="block text-xs text-gray-500"
											>{session.user.email}</span
										></td
									><td>{new Date(session.lastSeenAt).toLocaleString()}</td><td
										>{new Date(session.expiresAt).toLocaleString()}</td
									><td>{session.ipAddress || 'No registrada'}</td><td
										><button
											type="button"
											class="action-delete"
											on:click={() => revokeSession(session)}
											disabled={saving}>Revocar</button
										></td
									></tr
								>{/each}</tbody
						>
					</table>
				</section>
			{:else}<section class="glass-3 overflow-x-auto rounded-xl p-6">
					<h2 class="mb-4 text-xl font-semibold">Auditoría ({data.events.length})</h2>
					<table class="w-full border-collapse text-sm">
						<thead><tr><th>Fecha</th><th>Acción</th><th>Entidad</th><th>Actor</th></tr></thead
						><tbody
							>{#each data.events as event (event.id)}<tr
									><td>{new Date(event.createdAt).toLocaleString()}</td><td>{event.action}</td><td
										>{event.entity}</td
									><td>{event.actor?.email || 'Sistema'}</td></tr
								>{/each}</tbody
						>
					</table>
				</section>{/if}
		{/if}
	</div>
</main>

{#if showUserModal}
	<div
		class="fixed inset-0 z-[70] flex items-center justify-center bg-slate-900/55 p-4 backdrop-blur-[3px]"
		role="presentation"
		on:click={(event) => event.currentTarget === event.target && closeUserModal()}
	>
		<form
			class="glass-3 w-full max-w-lg overflow-hidden border border-white/60 p-0"
			on:submit|preventDefault={createUser}
		>
			<header class="flex items-center justify-between bg-[#3f51f5] px-5 py-4">
				<div>
					<span class="text-xs font-semibold uppercase tracking-wide text-blue-100"
						>Administración</span
					>
					<h2 class="text-lg font-bold text-white">
						{editingUser ? 'Editar Usuario' : 'Nuevo Usuario'}
					</h2>
				</div>
				<button
					type="button"
					class="text-2xl leading-none text-white/80"
					aria-label="Cerrar"
					on:click={closeUserModal}>×</button
				>
			</header>
			<div class="space-y-4 p-5">
				<div>
					<p class="block text-xs font-semibold text-gray-700">Avatar del usuario</p>
					<div
						class="flex min-h-20 flex-col items-center justify-center gap-0.5 rounded-lg border border-dashed border-slate-300 bg-slate-50/45 text-slate-500"
					>
						<span class="text-xl text-slate-600">♙</span><strong class="text-xs text-slate-700"
							>Seleccionar imagen</strong
						><small>o arrastrar aquí</small><small>Máximo 5 MB</small>
					</div>
				</div>
				<label class="block text-xs font-semibold text-gray-700"
					>Documento de identidad *<input
						required
						bind:value={userForm.documentId}
						class="focus:border-primary focus:ring-primary/25 mt-1 block w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm text-gray-600 shadow-sm focus:outline-none focus:ring-2"
						placeholder="Número de documento"
					/></label
				>
				<label class="block text-xs font-semibold text-gray-700"
					>Nombre de usuario *<input
						required
						bind:value={userForm.name}
						class="focus:border-primary focus:ring-primary/25 mt-1 block w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm text-gray-600 shadow-sm focus:outline-none focus:ring-2"
						placeholder="Ingrese el nombre de usuario"
					/></label
				><label class="block text-xs font-semibold text-gray-700"
					>Email *<input
						required
						type="email"
						bind:value={userForm.email}
						class="focus:border-primary focus:ring-primary/25 mt-1 block w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm text-gray-600 shadow-sm focus:outline-none focus:ring-2"
						placeholder="usuario@ejemplo.com"
					/></label
				><label class="block text-xs font-semibold text-gray-700"
					>Contraseña {editingUser ? '(opcional)' : '*'}<input
						required={!editingUser}
						minlength="12"
						type="password"
						bind:value={userForm.password}
						class="focus:border-primary focus:ring-primary/25 mt-1 block w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm text-gray-600 shadow-sm focus:outline-none focus:ring-2"
						placeholder="Mínimo 12 caracteres"
					/></label
				><label class="block text-xs font-semibold text-gray-700"
					>Dependencia<select
						required={!editingUser}
						bind:value={userForm.dependencyId}
						class="focus:border-primary focus:ring-primary/25 mt-1 block w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm text-gray-600 shadow-sm focus:outline-none focus:ring-2"
						><option value="">Sin dependencia</option
						>{#each data.dependencies as dependency (dependency.id)}<option value={dependency.id}
								>{dependency.name}</option
							>{/each}</select
					></label
				><label class="block text-xs font-semibold text-gray-700"
					>Área<select
						required={!editingUser}
						bind:value={userForm.areaId}
						class="focus:border-primary focus:ring-primary/25 mt-1 block w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm text-gray-600 shadow-sm focus:outline-none focus:ring-2"
						><option value="">Selecciona un área</option
						>{#each data.areas.filter((area) => !userForm.dependencyId || area.dependencyId === userForm.dependencyId) as area (area.id)}<option
								value={area.id}>{area.name}</option
							>{/each}</select
					></label
				><label class="block text-xs font-semibold text-gray-700"
					>Rol inicial<select
						required={!editingUser}
						bind:value={userForm.roleId}
						class="focus:border-primary focus:ring-primary/25 mt-1 block w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm text-gray-600 shadow-sm focus:outline-none focus:ring-2"
						><option value="">Sin rol inicial</option>{#each data.roles as role (role.id)}<option
								value={role.id}>{role.name}</option
							>{/each}</select
					></label
				>
				{#if userForm.roleId}<label class="block text-xs font-semibold text-gray-700"
						>Alcance del rol<select
							bind:value={userForm.scopeType}
							class="focus:border-primary focus:ring-primary/25 mt-1 block w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm text-gray-600 shadow-sm focus:outline-none focus:ring-2"
							><option value="GLOBAL">Global</option><option value="DEPENDENCY">Dependencia</option
							><option value="PROCESS">Proceso</option><option value="DEPENDENCY_PROCESS"
								>Dependencia y proceso</option
							></select
						></label
					>
					{#if userForm.scopeType.includes('PROCESS')}<label
							class="block text-xs font-semibold text-gray-700"
							>Proceso<select
								bind:value={userForm.processId}
								class="focus:border-primary focus:ring-primary/25 mt-1 block w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm text-gray-600 shadow-sm focus:outline-none focus:ring-2"
								required
								><option value="">Selecciona un proceso</option
								>{#each data.processes as process (process.id)}<option value={process.id}
										>{process.name}</option
									>{/each}</select
							></label
						>{/if}
				{/if}
			</div>
			<footer class="flex justify-end gap-3 border-t border-gray-300/60 px-5 py-4">
				<button
					type="button"
					class="rounded-lg bg-gray-100/90 px-4 py-2 text-sm font-semibold text-gray-600 hover:bg-gray-200"
					on:click={closeUserModal}>Cancelar</button
				><button
					type="submit"
					class="bg-primary rounded-lg px-4 py-2 text-sm font-semibold text-white"
					disabled={saving}>{saving ? 'Guardando...' : 'Guardar'}</button
				>
			</footer>
		</form>
	</div>
{/if}
