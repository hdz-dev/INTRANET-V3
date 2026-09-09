import argon2 from 'argon2';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const modules = [
  ['Administration', 'administration'],
  ['Autenticación', 'auth']
];

const permissions = [
  ['users.read', 'Consultar usuarios', 'administration'],
  ['users.create', 'Crear usuarios', 'administration'],
  ['users.update', 'Editar usuarios', 'administration'],
  ['users.disable', 'Activar o desactivar usuarios', 'administration'],
  ['roles.read', 'Consultar roles', 'administration'],
  ['roles.manage', 'Administrar roles y permisos', 'administration'],
  ['sessions.read', 'Consultar sesiones', 'administration'],
  ['sessions.revoke', 'Revocar sesiones', 'administration'],
  ['audit.read', 'Consultar auditoría', 'administration'],
  ['permissions.read', 'Consultar permisos', 'administration']
  ,['dependencies.read', 'Consultar dependencias', 'administration']
  ,['processes.read', 'Consultar procesos', 'administration']
];

const roles = [
  ['Superadministrador', 'Acceso global a la administración.', true],
  ['Administrador', 'Administración operativa autorizada.', true],
  ['Responsable de proceso', 'Acceso acotado al proceso asignado.', false],
  ['Gestor', 'Gestión operativa asignada.', false],
  ['Segunda línea', 'Monitoreo y seguimiento.', false],
  ['Control Interno', 'Consulta y control institucional.', false],
  ['Consulta', 'Acceso de solo lectura.', false]
];

async function main() {
  const moduleMap = new Map();
  for (const [name, code] of modules) moduleMap.set(code, (await prisma.module.upsert({ where: { code }, update: { name, active: true }, create: { name, code } })).id);

  const permissionMap = new Map();
  for (const [code, description, moduleCode] of permissions) {
    const permission = await prisma.permission.upsert({ where: { code }, update: { description, moduleId: moduleMap.get(moduleCode) }, create: { code, description, moduleId: moduleMap.get(moduleCode) } });
    permissionMap.set(code, permission.id);
  }

  for (const [name, description, critical] of roles) {
    const role = await prisma.role.upsert({ where: { name }, update: { description, critical, active: true }, create: { name, description, critical } });
    if (name === 'Superadministrador') {
      for (const permissionId of permissionMap.values()) await prisma.rolePermission.upsert({ where: { roleId_permissionId: { roleId: role.id, permissionId } }, update: {}, create: { roleId: role.id, permissionId } });
    }
  }

  const email = process.env.SEED_ADMIN_EMAIL;
  const password = process.env.SEED_ADMIN_PASSWORD;
  if (email && password) {
    const role = await prisma.role.findUniqueOrThrow({ where: { name: 'Superadministrador' } });
    const passwordHash = await argon2.hash(password, { type: argon2.argon2id });
    const user = await prisma.user.upsert({ where: { email: email.toLowerCase() }, update: { name: 'Administrador GIGA', passwordHash, status: 'ACTIVE' }, create: { email: email.toLowerCase(), name: 'Administrador GIGA', passwordHash } });
    await prisma.roleAssignment.upsert({ where: { id: `seed-${user.id}-${role.id}` }, update: { active: true }, create: { id: `seed-${user.id}-${role.id}`, userId: user.id, roleId: role.id, scopeType: 'GLOBAL' } });
  }
}

main().finally(() => prisma.$disconnect());
