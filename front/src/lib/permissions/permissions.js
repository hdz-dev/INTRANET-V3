export const permissions = {
	VIEW_DASHBOARD: 'dashboard.view',
	MANAGE_USERS: 'users.manage',
	MANAGE_ROLES: 'roles.manage',
	VIEW_REPORTS: 'reports.view'
};

export function hasPermission(userPermissions = [], requiredPermission) {
	if (!requiredPermission) return true;
	return userPermissions.includes(requiredPermission);
}

export function canAccess(user, requiredPermission) {
	return hasPermission(user?.permissions || [], requiredPermission);
}
