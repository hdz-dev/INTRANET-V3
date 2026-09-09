import argon2 from 'argon2';
import { z } from 'zod';
import { prisma } from '../infrastructure/prisma.js';
import { recordAudit } from '../domain/audit/audit.js';

const createUserSchema = z.object({
  documentId: z.string().trim().min(5).max(30),
  email: z.string().trim().email().max(254),
  name: z.string().trim().min(2).max(120),
  password: z.string().min(12).max(256),
  dependencyId: z.string().cuid(),
  areaId: z.string().cuid(),
  roleId: z.string().cuid(),
  scopeType: z.enum(['GLOBAL', 'DEPENDENCY', 'PROCESS', 'DEPENDENCY_PROCESS']).default('GLOBAL'),
  processId: z.string().cuid().optional(),
  status: z.enum(['ACTIVE', 'SUSPENDED', 'DISABLED']).default('ACTIVE')
}).superRefine((value, context) => {
  if (value.scopeType.includes('DEPENDENCY') && !value.dependencyId) context.addIssue({ code: 'custom', path: ['dependencyId'], message: 'La dependencia es obligatoria.' });
  if (value.scopeType.includes('PROCESS') && !value.processId) context.addIssue({ code: 'custom', path: ['processId'], message: 'El proceso es obligatorio.' });
  if (value.roleId && !value.dependencyId && value.scopeType !== 'GLOBAL') context.addIssue({ code: 'custom', path: ['dependencyId'], message: 'La dependencia es obligatoria para el alcance seleccionado.' });
});

const statusSchema = z.object({ status: z.enum(['ACTIVE', 'SUSPENDED', 'DISABLED']) });
const updateUserSchema = z.object({
  name: z.string().trim().min(2).max(120).optional(),
  documentId: z.string().trim().min(5).max(30).optional(),
  email: z.string().trim().email().max(254).optional(),
  password: z.string().min(12).max(256).optional(),
  dependencyId: z.string().cuid().nullable().optional()
  ,areaId: z.string().cuid().nullable().optional()
});
const roleAssignmentSchema = z.object({
  roleId: z.string().cuid(),
  scopeType: z.enum(['GLOBAL', 'DEPENDENCY', 'PROCESS', 'DEPENDENCY_PROCESS']).default('GLOBAL'),
  dependencyId: z.string().cuid().optional(),
  processId: z.string().cuid().optional(),
  startsAt: z.coerce.date().optional(),
  endsAt: z.coerce.date().optional()
}).superRefine((value, context) => {
  if (['DEPENDENCY', 'DEPENDENCY_PROCESS'].includes(value.scopeType) && !value.dependencyId) context.addIssue({ code: 'custom', path: ['dependencyId'], message: 'La dependencia es obligatoria para este alcance.' });
  if (['PROCESS', 'DEPENDENCY_PROCESS'].includes(value.scopeType) && !value.processId) context.addIssue({ code: 'custom', path: ['processId'], message: 'El proceso es obligatorio para este alcance.' });
});
const roleSchema = z.object({
  name: z.string().trim().min(2).max(80),
  description: z.string().trim().min(2).max(240),
  critical: z.boolean().default(false),
  permissionIds: z.array(z.string().cuid()).default([])
});

export async function listUsers(request, response) {
  const users = await prisma.user.findMany({
    select: { id: true, documentId: true, email: true, name: true, status: true, createdAt: true, mfaRequired: true, mfaEnabled: true, dependency: { select: { id: true, name: true, code: true } }, area: { select: { id: true, name: true, code: true } }, roleAssignments: { where: { active: true }, select: { id: true, scopeType: true, role: { select: { id: true, name: true } } } } },
    orderBy: { name: 'asc' }
  });
  return response.json({ users });
}

export async function listRoles(request, response) {
  const roles = await prisma.role.findMany({ where: { active: true }, select: { id: true, name: true, description: true, critical: true, permissions: { select: { permission: { select: { id: true, code: true, description: true } } } } }, orderBy: { name: 'asc' } });
  return response.json({ roles });
}

export async function createRole(request, response) {
  const result = roleSchema.safeParse(request.body);
  if (!result.success) return response.status(400).json({ message: 'Datos de rol inválidos.', issues: result.error.issues });
  const data = result.data;
  const role = await prisma.role.create({
    data: {
      name: data.name,
      description: data.description,
      critical: data.critical,
      createdById: request.auth.user.id,
      permissions: { create: data.permissionIds.map((permissionId) => ({ permission: { connect: { id: permissionId } } })) }
    },
    include: { permissions: { select: { permissionId: true } } }
  });
  await recordAudit({ request, actorId: request.auth.user.id, action: 'ROLE_CREATED', entity: 'Role', entityId: role.id, metadata: { name: role.name, critical: role.critical } });
  return response.status(201).json({ role });
}

export async function updateRolePermissions(request, response) {
  const result = z.object({ permissionIds: z.array(z.string().cuid()) }).safeParse(request.body);
  if (!result.success) return response.status(400).json({ message: 'Permisos inválidos.', issues: result.error.issues });
  const role = await prisma.role.findUnique({ where: { id: request.params.id }, select: { id: true, name: true, critical: true } });
  if (!role) return response.status(404).json({ message: 'Rol no encontrado.' });
  if (role.critical && role.name === 'Superadministrador') return response.status(400).json({ message: 'El rol Superadministrador está protegido.' });
  await prisma.$transaction([
    prisma.rolePermission.deleteMany({ where: { roleId: role.id } }),
    ...result.data.permissionIds.map((permissionId) => prisma.rolePermission.create({ data: { roleId: role.id, permissionId } }))
  ]);
  await recordAudit({ request, actorId: request.auth.user.id, action: 'ROLE_PERMISSIONS_UPDATED', entity: 'Role', entityId: role.id, metadata: { permissionCount: result.data.permissionIds.length } });
  return response.status(204).send();
}

export async function listPermissions(request, response) {
  const permissions = await prisma.permission.findMany({ select: { id: true, code: true, description: true, module: { select: { id: true, code: true, name: true } } }, orderBy: { code: 'asc' } });
  return response.json({ permissions });
}

export async function listAreas(request, response) {
  const areas = await prisma.area.findMany({ where: { active: true }, orderBy: { name: 'asc' }, select: { id: true, name: true, code: true, dependencyId: true } });
  return response.json({ areas });
}

export async function createUser(request, response) {
  const result = createUserSchema.safeParse(request.body);
  if (!result.success) return response.status(400).json({ message: 'Datos de usuario inválidos.' });
  const data = result.data;
  const existingDocument = await prisma.user.findUnique({ where: { documentId: data.documentId } });
  if (existingDocument) return response.status(409).json({ message: 'El documento ya está registrado.' });
  const existing = await prisma.user.findUnique({ where: { email: data.email.toLowerCase() } });
  if (existing) return response.status(409).json({ message: 'El correo ya está registrado.' });
  const area = await prisma.area.findUnique({ where: { id: data.areaId } });
  if (!area) return response.status(404).json({ message: 'Área no encontrada.' });
  if (area.dependencyId && area.dependencyId !== data.dependencyId) return response.status(400).json({ message: 'El área no pertenece a la dependencia seleccionada.' });
  if (!(await prisma.role.findFirst({ where: { id: data.roleId, active: true } }))) return response.status(404).json({ message: 'Rol no encontrado.' });
  const user = await prisma.$transaction(async (transaction) => {
    const created = await transaction.user.create({ data: { documentId: data.documentId, email: data.email.toLowerCase(), name: data.name, passwordHash: await argon2.hash(data.password, { type: argon2.argon2id }), status: data.status, dependencyId: data.dependencyId, areaId: data.areaId }, select: { id: true, documentId: true, email: true, name: true, status: true, dependencyId: true, areaId: true } });
    await transaction.roleAssignment.create({ data: { userId: created.id, roleId: data.roleId, scopeType: data.scopeType, dependencyId: data.dependencyId, processId: data.processId } });
    return created;
  });
  await recordAudit({ request, actorId: request.auth.user.id, action: 'USER_CREATED', entity: 'User', entityId: user.id, metadata: { email: user.email } });
  return response.status(201).json({ user });
}

export async function updateUserStatus(request, response) {
  const result = statusSchema.safeParse(request.body);
  if (!result.success) return response.status(400).json({ message: 'Estado inválido.' });
  if (request.params.id === request.auth.user.id) return response.status(400).json({ message: 'No puedes cambiar tu propio estado.' });
  const user = await prisma.user.update({ where: { id: request.params.id }, data: { status: result.data.status }, select: { id: true, email: true, name: true, status: true } });
  await recordAudit({ request, actorId: request.auth.user.id, action: 'USER_STATUS_UPDATED', entity: 'User', entityId: user.id, metadata: { status: user.status } });
  return response.json({ user });
}

export async function updateUser(request, response) {
  const result = updateUserSchema.safeParse(request.body);
  if (!result.success) return response.status(400).json({ message: 'Datos de usuario inválidos.', issues: result.error.issues });
  if (request.params.id === request.auth.user.id) return response.status(400).json({ message: 'No puedes editar tu propia cuenta desde este módulo.' });
  const data = result.data;
  if (data.email) {
    const existing = await prisma.user.findFirst({ where: { email: data.email.toLowerCase(), id: { not: request.params.id } } });
    if (existing) return response.status(409).json({ message: 'El correo ya está registrado.' });
  }
  const updateData = { ...data, email: data.email?.toLowerCase() };
  if (data.password) updateData.passwordHash = await argon2.hash(data.password, { type: argon2.argon2id });
  delete updateData.password;
  const user = await prisma.user.update({ where: { id: request.params.id }, data: updateData, select: { id: true, email: true, name: true, status: true, createdAt: true, dependency: { select: { id: true, name: true, code: true } } } });
  await recordAudit({ request, actorId: request.auth.user.id, action: 'USER_UPDATED', entity: 'User', entityId: user.id, metadata: { email: user.email } });
  return response.json({ user });
}

export async function deleteUser(request, response) {
  if (request.params.id === request.auth.user.id) return response.status(400).json({ message: 'No puedes eliminar tu propia cuenta.' });
  const user = await prisma.user.findUnique({ where: { id: request.params.id }, select: { id: true, email: true, name: true } });
  if (!user) return response.status(404).json({ message: 'Usuario no encontrado.' });
  await prisma.$transaction(async (transaction) => {
    await transaction.auditEvent.updateMany({ where: { actorId: user.id }, data: { actorId: null } });
    await transaction.role.updateMany({ where: { createdById: user.id }, data: { createdById: null } });
    await transaction.dependency.updateMany({ where: { createdById: user.id }, data: { createdById: null } });
    await transaction.process.updateMany({ where: { createdById: user.id }, data: { createdById: null } });
    await transaction.user.delete({ where: { id: user.id } });
  });
  await recordAudit({ request, actorId: request.auth.user.id, action: 'USER_DELETED', entity: 'User', entityId: user.id, metadata: { email: user.email } });
  return response.status(204).send();
}

export async function assignRole(request, response) {
  const result = roleAssignmentSchema.safeParse({ ...request.body, userId: request.params.id });
  if (!result.success) return response.status(400).json({ message: 'Asignación de rol inválida.', issues: result.error.issues });
  const data = result.data;
  const [user, role] = await Promise.all([
    prisma.user.findUnique({ where: { id: request.params.id } }),
    prisma.role.findUnique({ where: { id: data.roleId } })
  ]);
  if (!user || !role || !role.active) return response.status(404).json({ message: 'Usuario o rol no encontrado.' });
  if (data.dependencyId && !(await prisma.dependency.findUnique({ where: { id: data.dependencyId } }))) return response.status(404).json({ message: 'Dependencia no encontrada.' });
  if (data.processId && !(await prisma.process.findUnique({ where: { id: data.processId } }))) return response.status(404).json({ message: 'Proceso no encontrado.' });
  const assignment = await prisma.roleAssignment.create({ data: { userId: user.id, roleId: role.id, scopeType: data.scopeType, dependencyId: data.dependencyId, processId: data.processId, startsAt: data.startsAt, endsAt: data.endsAt }, include: { role: { select: { id: true, name: true } } } });
  await recordAudit({ request, actorId: request.auth.user.id, action: 'ROLE_ASSIGNED', entity: 'RoleAssignment', entityId: assignment.id, metadata: { userId: user.id, roleId: role.id, scopeType: data.scopeType } });
  return response.status(201).json({ assignment });
}

export async function listDependencies(request, response) {
  const dependencies = await prisma.dependency.findMany({ orderBy: { name: 'asc' } });
  return response.json({ dependencies });
}

export async function listProcesses(request, response) {
  const processes = await prisma.process.findMany({ include: { dependency: { select: { id: true, name: true, code: true } } }, orderBy: { name: 'asc' } });
  return response.json({ processes });
}

export async function listSessions(request, response) {
  const sessions = await prisma.session.findMany({ where: { revokedAt: null, expiresAt: { gt: new Date() } }, select: { id: true, userId: true, createdAt: true, expiresAt: true, lastSeenAt: true, ipAddress: true, userAgent: true, user: { select: { id: true, email: true, name: true } } }, orderBy: { lastSeenAt: 'desc' } });
  return response.json({ sessions });
}

export async function revokeSessionById(request, response) {
  const session = await prisma.session.findUnique({ where: { id: request.params.id }, select: { id: true, userId: true, revokedAt: true } });
  if (!session) return response.status(404).json({ message: 'Sesión no encontrada.' });
  if (!session.revokedAt) await prisma.session.update({ where: { id: session.id }, data: { revokedAt: new Date(), revokeReason: 'admin_revoke' } });
  await recordAudit({ request, actorId: request.auth.user.id, action: 'SESSION_REVOKED', entity: 'Session', entityId: session.id, metadata: { userId: session.userId } });
  return response.status(204).send();
}

export async function listAuditEvents(request, response) {
  const events = await prisma.auditEvent.findMany({ take: 100, include: { actor: { select: { id: true, email: true, name: true } } }, orderBy: { createdAt: 'desc' } });
  return response.json({ events });
}