import { getSession } from '../domain/auth/session.js';

export async function requireAuth(request, response, next) {
  const session = await getSession(request);
  if (!session) return response.status(401).json({ message: 'No autenticado.' });
  request.auth = { session, user: session.user };
  return next();
}

export function requirePermission(permission) {
  return (request, response, next) => {
    const assignments = request.auth?.user?.roleAssignments || [];
    const allowed = assignments.some((assignment) =>
      assignment.role?.active && assignment.role.permissions.some((item) => item.permission.code === permission)
    );
    if (!allowed) return response.status(403).json({ message: 'No autorizado.' });
    return next();
  };
}
