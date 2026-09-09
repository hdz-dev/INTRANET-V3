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
	let selectedUser = null;
	let showUserModal = false;
	let editingUser = null;
	let userForm = { name: '', email: '', password: '', dependencyId: '' };
	let assignmentForm = { roleId: '', scopeType: 'GLOBAL', dependencyId: '', processId: '' };
	let roleForm = { name: '', description: '', critical: false, permissionIds: [] };
	let data = {
		users: [],
		roles: [],
		permissions: [],
		dependencies: [],
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
				apiRequest('/api/admin/processes'),
				apiRequest('/api/admin/sessions'),
				apiRequest('/api/admin/audit')
			]);
			const [users, roles, permissions, dependencies, processes, sessions, events] = results;
			data = {
				users: users.status === 'fulfilled' ? users.value.users : [],
				roles: roles.status === 'fulfilled' ? roles.value.roles : [],
				permissions: permissions.status === 'fulfilled' ? permissions.value.permissions : [],
				dependencies: dependencies.status === 'fulfilled' ? dependencies.value.dependencies : [],
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
			? { name: user.name, email: user.email, password: '', dependencyId: user.dependency?.id || '' }
			: { name: '', email: '', password: '', dependencyId: '' };
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
			const payload = { ...userForm, dependencyId: userForm.dependencyId || null };
			if (!payload.password) delete payload.password;
			await apiRequest(editingUser ? `/api/admin/users/${editingUser.id}` : '/api/admin/users', {
				method: editingUser ? 'PATCH' : 'POST',
				body: JSON.stringify(payload)
			});
			closeUserModal();
			message = editingUser ? 'Usuario actualizado correctamente.' : 'Usuario creado correctamente.';
			await loadAdministration();
		} catch (error) {
			errorMessage = error.message || 'No fue posible crear el usuario.';
		} finally {
			saving = false;
		}
	}

	async function updateUserStatus(user, status) {
		const previousStatus = user.status;
		data = { ...data, users: data.users.map((item) => item.id === user.id ? { ...item, status } : item) };
		saving = true;
		try {
			await apiRequest(`/api/admin/users/${user.id}/status`, {
				method: 'PATCH',
				body: JSON.stringify({ status })
			});
			message = 'Estado de usuario actualizado.';
			await loadAdministration();
		} catch (error) {
			data = { ...data, users: data.users.map((item) => item.id === user.id ? { ...item, status: previousStatus } : item) };
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
			if (selectedUser?.id === user.id) selectedUser = null;
			message = 'Usuario eliminado correctamente.';
		} catch (error) {
			data = { ...data, users: previousUsers };
			errorMessage = error.message || 'No fue posible eliminar el usuario.';
		} finally {
			saving = false;
		}
	}

	function selectUser(user) {
		selectedUser = user;
		assignmentForm = { roleId: '', scopeType: 'GLOBAL', dependencyId: '', processId: '' };
	}

	async function assignRole() {
		if (!selectedUser || !assignmentForm.roleId) return;
		saving = true;
		try {
			await apiRequest(`/api/admin/users/${selectedUser.id}/roles`, {
				method: 'POST',
				body: JSON.stringify({
					...assignmentForm,
					dependencyId: assignmentForm.dependencyId || undefined,
					processId: assignmentForm.processId || undefined
				})
			});
			message = 'Rol asignado correctamente.';
			await loadAdministration();
			selectedUser = data.users.find((user) => user.id === selectedUser.id) || null;
		} catch (error) {
			errorMessage = error.message || 'No fue posible asignar el rol.';
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
							class="admin-input"
							placeholder="Buscar por nombre o correo..."
							aria-label="Buscar usuarios"
						/><select bind:value={roleFilter} class="admin-input" aria-label="Filtrar por rol"
							><option value="ALL">Todos los roles</option
							>{#each data.roles as role (role.id)}<option value={role.id}>{role.name}</option
								>{/each}</select
						><button
							type="button"
							class="refresh-button"
							title="Actualizar lista"
							aria-label="Actualizar lista"
							on:click={loadAdministration}>⟳</button
						>
					</div>
				</section>

				<section class="glass-3 overflow-x-auto rounded-xl">
					<table class="admin-table">
						<thead
							><tr
								><th>Usuario</th><th>Dependencia</th><th>Rol</th><th>Estado</th><th>Fecha</th><th
									>Acciones</th
								></tr
							></thead
						><tbody>
							{#if loading}<tr
									><td colspan="6" class="py-12 text-center text-gray-500">Cargando usuarios...</td
									></tr
								>
							{:else if filteredUsers.length === 0}<tr
									><td colspan="6" class="py-12 text-center text-gray-500"
										>No se encontraron usuarios.</td
									></tr
								>
							{:else}{#each filteredUsers as user (user.id)}<tr
										class:selected-row={selectedUser?.id === user.id}
										><td
											><button
												type="button"
												class="flex items-center gap-3 text-left"
												on:click={() => openUserModal(user)}
												><span class="avatar">{user.name.charAt(0).toUpperCase()}</span><span
													><strong class="block text-sm text-gray-900">{user.name}</strong><small
														class="text-gray-500">{user.email}</small
													></span
												></button
											></td
										><td>{user.dependency?.name || 'Sin dependencia'}</td><td
											><div class="flex flex-wrap gap-1">
												{#each user.roleAssignments as assignment (assignment.id)}<span
														class="role-badge">{assignment.role.name}</span
													>{/each}{#if !user.roleAssignments.length}<span
														class="text-xs text-gray-500">Sin rol</span
													>{/if}
											</div></td
										><td
											><button
												class="status-control"
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
													class="status-dot"
												></span>
												<span class="status-text">{user.status === 'ACTIVE' ? 'Activo' : user.status}</span>
												<span class:toggle-on={user.status === 'ACTIVE'} class:toggle-off={user.status !== 'ACTIVE'} class="status-toggle"><span></span></span>
											</button></td
										><td class="text-sm text-gray-500"
											>{user.createdAt
												? new Date(user.createdAt).toLocaleDateString('es-CO')
												: '—'}</td
										><td class="text-right"
											><div class="flex items-center justify-end space-x-2">
												<button
													type="button"
													class="icon-action icon-edit"
													title="Editar Usuario"
													aria-label={`Gestionar ${user.name}`}
													on:click={() => selectUser(user)}
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
													class="icon-action icon-delete"
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
							class="admin-input"
							placeholder="Nombre del rol"
						/><textarea
							required
							bind:value={roleForm.description}
							class="admin-input mt-3"
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
					<table class="admin-table">
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
					<table class="admin-table">
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
					<table class="admin-table">
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
		class="modal-backdrop"
		role="presentation"
		on:click={(event) => event.currentTarget === event.target && closeUserModal()}
	>
		<form class="user-modal glass-3" on:submit|preventDefault={createUser}>
			<header class="modal-header">
				<div>
					<span class="text-xs font-semibold uppercase tracking-wide text-blue-100"
						>Administración</span
					>
					<h2 class="text-lg font-bold text-white">{editingUser ? 'Editar Usuario' : 'Nuevo Usuario'}</h2>
				</div>
				<button type="button" class="modal-close" aria-label="Cerrar" on:click={closeUserModal}
					>×</button
				>
			</header>
			<div class="space-y-4 p-5">
				<div>
					<p class="field-label">Avatar del usuario</p>
					<div class="avatar-upload">
						<span class="upload-icon">♙</span><strong>Seleccionar imagen</strong><small
							>o arrastrar aquí</small
						><small>Máximo 5 MB</small>
					</div>
				</div>
				<label class="field-label"
					>Nombre de usuario *<input
						required
						bind:value={userForm.name}
						class="admin-input mt-1"
						placeholder="Ingrese el nombre de usuario"
					/></label
				><label class="field-label"
					>Email *<input
						required
						type="email"
						bind:value={userForm.email}
						class="admin-input mt-1"
						placeholder="usuario@ejemplo.com"
					/></label
				><label class="field-label"
					>Contraseña {editingUser ? '(opcional)' : '*'}<input
						required={!editingUser}
						minlength="12"
						type="password"
						bind:value={userForm.password}
						class="admin-input mt-1"
						placeholder="Mínimo 12 caracteres"
					/></label
				><label class="field-label"
					>Dependencia<select bind:value={userForm.dependencyId} class="admin-input mt-1"
						><option value="">Sin dependencia</option
						>{#each data.dependencies as dependency (dependency.id)}<option value={dependency.id}
								>{dependency.name}</option
							>{/each}</select
					></label
				>
			</div>
			<footer class="modal-footer">
				<button type="button" class="cancel-button" on:click={closeUserModal}>Cancelar</button
				><button
					type="submit"
					class="bg-primary rounded-lg px-4 py-2 text-sm font-semibold text-white"
					disabled={saving}>{saving ? 'Guardando...' : 'Guardar'}</button
				>
			</footer>
		</form>
	</div>
{/if}

<style>
	.tab-button {
		border: 1px solid rgb(209 213 219 / 70%);
		border-radius: 0.5rem;
		background: rgb(255 255 255 / 55%);
		padding: 0.625rem 0.9rem;
		color: #374151;
		font-size: 0.875rem;
		font-weight: 600;
	}
	.active-tab {
		border-color: #2563eb;
		background: rgb(239 246 255 / 80%);
		color: #1d4ed8;
	}
	.admin-table {
		width: 100%;
		border-collapse: collapse;
		font-size: 0.875rem;
	}
	.admin-table th,
	.admin-table td {
		border-bottom: 1px solid rgb(209 213 219 / 60%);
		padding: 0.9rem 1rem;
		text-align: left;
		white-space: nowrap;
	}
	.admin-table th {
		background: rgb(248 250 252 / 55%);
		color: #6b7280;
		font-size: 0.7rem;
		text-transform: uppercase;
	}
	.selected-row {
		background: rgb(239 246 255 / 65%);
	}
	.avatar {
		display: inline-flex;
		height: 2rem;
		width: 2rem;
		align-items: center;
		justify-content: center;
		border-radius: 999px;
		background: #3f51f5;
		color: white;
		font-size: 0.8rem;
		font-weight: 700;
	}
	.role-badge,
	.status-badge {
		display: inline-flex;
		border-radius: 999px;
		padding: 0.2rem 0.55rem;
		font-size: 0.7rem;
		font-weight: 600;
	}
	.role-badge {
		background: rgb(219 234 254 / 85%);
		color: #1d4ed8;
	}
	.status-dot {
		margin-right: 0.5rem;
		height: 0.5rem;
		width: 0.5rem;
		border-radius: 999px;
	}
	.status-dot-active {
		background: #4ade80;
	}
	.status-dot-disabled {
		background: #9ca3af;
	}
	.status-text {
		font-size: 0.875rem;
		font-weight: 500;
	}
	.status-text-active {
		color: #15803d;
	}
	.status-text-disabled {
		color: #4b5563;
	}
	.status-control {
		display: inline-flex;
		align-items: center;
		border-radius: 0.5rem;
		padding: 0.25rem 0.35rem;
	}
	.status-control:hover {
		background: rgb(243 244 246 / 75%);
	}
	.status-toggle {
		position: relative;
		display: inline-flex;
		height: 1.25rem;
		width: 2.25rem;
		align-items: center;
		border-radius: 999px;
		margin-left: 0.55rem;
		padding: 0.15rem;
		transition: background-color 150ms ease;
	}
	.status-toggle span {
		display: block;
		height: 0.9rem;
		width: 0.9rem;
		border-radius: 999px;
		background: white;
		box-shadow: 0 1px 2px rgb(0 0 0 / 20%);
		transition: transform 150ms ease;
	}
	.toggle-on {
		background: #22c55e;
	}
	.toggle-on span {
		transform: translateX(1rem);
	}
	.toggle-off {
		background: #cbd5e1;
	}
	.icon-action {
		display: inline-flex;
		height: 2rem;
		width: 2rem;
		align-items: center;
		justify-content: center;
		border-radius: 999px;
		padding: 0.5rem;
		transition: transform 150ms ease;
	}
	.icon-action:hover {
		transform: scale(1.05);
	}
	.icon-edit {
		background: var(--color-primary);
	}
	.icon-delete {
		background: #ef4444;
	}
	.field-label {
		display: block;
		color: #374151;
		font-size: 0.75rem;
		font-weight: 600;
	}
	.admin-input {
		display: block;
		width: 100%;
		border: 1px solid #d1d5db;
		border-radius: 0.75rem;
		background: white;
		padding: 0.5rem 0.75rem;
		color: #4b5563;
		font-size: 0.875rem;
		box-shadow: 0 1px 2px rgb(0 0 0 / 5%);
	}
	.admin-input:focus {
		border-color: var(--color-primary);
		outline: 2px solid color-mix(in srgb, var(--color-primary) 25%, transparent);
		outline-offset: 1px;
	}
	.refresh-button {
		border-radius: 0.75rem;
		background: rgb(243 244 246 / 85%);
		padding: 0.5rem 0.75rem;
		color: #4b5563;
		font-size: 1rem;
		font-weight: 700;
	}
	.refresh-button:hover {
		background: rgb(229 231 235 / 90%);
	}
	.modal-backdrop {
		position: fixed;
		inset: 0;
		z-index: 70;
		display: flex;
		align-items: center;
		justify-content: center;
		background: rgb(15 23 42 / 55%);
		padding: 1rem;
		backdrop-filter: blur(3px);
	}
	.user-modal {
		width: min(100%, 31rem);
		overflow: hidden;
		border: 1px solid rgb(255 255 255 / 60%);
		padding: 0;
	}
	.modal-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		background: #3f51f5;
		padding: 1rem 1.25rem;
	}
	.modal-close {
		color: rgb(255 255 255 / 80%);
		font-size: 1.5rem;
		line-height: 1;
	}
	.modal-footer {
		display: flex;
		justify-content: flex-end;
		gap: 0.75rem;
		border-top: 1px solid rgb(209 213 219 / 60%);
		padding: 1rem 1.25rem;
	}
	.cancel-button {
		border-radius: 0.5rem;
		background: rgb(243 244 246 / 90%);
		padding: 0.5rem 1rem;
		font-size: 0.8rem;
		font-weight: 600;
		color: #4b5563;
	}
	.avatar-upload {
		display: flex;
		min-height: 5rem;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 0.15rem;
		border: 1px dashed #cbd5e1;
		border-radius: 0.5rem;
		background: rgb(248 250 252 / 45%);
		color: #64748b;
	}
	.avatar-upload strong {
		font-size: 0.7rem;
		color: #334155;
	}
	.avatar-upload small {
		font-size: 0.65rem;
		font-weight: 400;
	}
	.upload-icon {
		font-size: 1.2rem;
		color: #475569;
	}
</style>
