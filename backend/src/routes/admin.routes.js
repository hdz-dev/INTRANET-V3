import { Router } from 'express';
import { assignRole, createRole, createUser, deleteUser, listAreas, listAuditEvents, listDependencies, listPermissions, listProcesses, listRoles, listSessions, listUsers, revokeSessionById, updateRolePermissions, updateUser, updateUserStatus } from '../controllers/admin.controller.js';
import { requireAuth, requirePermission } from '../middleware/auth.js';

const router = Router();
router.use(requireAuth);
router.get('/users', requirePermission('users.read'), listUsers);
router.post('/users', requirePermission('users.create'), createUser);
router.patch('/users/:id', requirePermission('users.update'), updateUser);
router.patch('/users/:id/status', requirePermission('users.disable'), updateUserStatus);
router.delete('/users/:id', requirePermission('users.disable'), deleteUser);
router.post('/users/:id/roles', requirePermission('roles.manage'), assignRole);
router.get('/dependencies', requirePermission('dependencies.read'), listDependencies);
router.get('/areas', requirePermission('dependencies.read'), listAreas);
router.get('/processes', requirePermission('processes.read'), listProcesses);
router.get('/sessions', requirePermission('sessions.read'), listSessions);
router.post('/sessions/:id/revoke', requirePermission('sessions.revoke'), revokeSessionById);
router.get('/audit', requirePermission('audit.read'), listAuditEvents);
router.get('/roles', requirePermission('roles.read'), listRoles);
router.post('/roles', requirePermission('roles.manage'), createRole);
router.put('/roles/:id/permissions', requirePermission('roles.manage'), updateRolePermissions);
router.get('/permissions', requirePermission('permissions.read'), listPermissions);

export default router;