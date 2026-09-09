import argon2 from 'argon2';
import { z } from 'zod';
import { env } from '../config/env.js';
import { prisma } from '../infrastructure/prisma.js';
import { createSession, getSession, revokeSession, sessionCookieOptions } from '../domain/auth/session.js';
import { tryRecordAudit } from '../domain/audit/audit.js';

const credentialsSchema = z.object({ email: z.string().trim().email().max(254), password: z.string().min(1).max(256) });
const passwordChangeSchema = z.object({ currentPassword: z.string().min(1).max(256), newPassword: z.string().min(12).max(256) });

export function publicUser(user) {
  const permissions = [...new Set((user.roleAssignments || []).flatMap((assignment) => assignment.role?.permissions?.map((item) => item.permission.code) || []))];
  return { id: user.id, email: user.email, name: user.name, status: user.status, mfaRequired: user.mfaRequired, permissions };
}

export async function login(request, response) {
  const result = credentialsSchema.safeParse(request.body);
  if (!result.success) return response.status(400).json({ message: 'Credenciales inválidas.' });
  const user = await prisma.user.findUnique({ where: { email: result.data.email.toLowerCase() } });
  const valid = user && user.status === 'ACTIVE' && await argon2.verify(user.passwordHash, result.data.password);
  if (!valid) {
    await tryRecordAudit({ request, actorId: null, action: 'LOGIN_FAILED', entity: 'Session', metadata: {} });
    return response.status(401).json({ message: 'Credenciales inválidas.' });
  }
  const session = await createSession(user, request);
  await prisma.user.update({ where: { id: user.id }, data: { lastLoginAt: new Date() } });
  await tryRecordAudit({ request, actorId: user.id, action: 'LOGIN_SUCCEEDED', entity: 'Session', entityId: session.id, metadata: {} });
  response.cookie(env.SESSION_COOKIE_NAME, session.token, sessionCookieOptions());
  return response.json({ user: publicUser(user), expiresAt: session.expiresAt.toISOString() });
}

export async function logout(request, response) {
  await revokeSession(request);
  await tryRecordAudit({ request, actorId: null, action: 'LOGOUT', entity: 'Session', metadata: {} });
  response.clearCookie(env.SESSION_COOKIE_NAME, { ...sessionCookieOptions(), maxAge: undefined });
  return response.status(204).send();
}

export async function currentUser(request, response) {
  const session = await getSession(request);
  if (!session) return response.status(401).json({ message: 'No autenticado.' });
  return response.json({ user: publicUser(session.user), session: { expiresAt: session.expiresAt.toISOString() } });
}

export async function changePassword(request, response) {
  const result = passwordChangeSchema.safeParse(request.body);
  if (!result.success) return response.status(400).json({ message: 'La contraseña nueva no cumple los requisitos.' });
  const user = await prisma.user.findUnique({ where: { id: request.auth.user.id }, select: { id: true, passwordHash: true } });
  const valid = user && await argon2.verify(user.passwordHash, result.data.currentPassword);
  if (!valid) return response.status(400).json({ message: 'La contraseña actual no es válida.' });
  const passwordHash = await argon2.hash(result.data.newPassword, { type: argon2.argon2id });
  await prisma.$transaction([
    prisma.user.update({ where: { id: user.id }, data: { passwordHash } }),
    prisma.session.updateMany({ where: { userId: user.id, id: { not: request.auth.session.id }, revokedAt: null }, data: { revokedAt: new Date(), revokeReason: 'password_changed' } })
  ]);
  await tryRecordAudit({ request, actorId: user.id, action: 'PASSWORD_CHANGED', entity: 'User', entityId: user.id, metadata: {} });
  return response.status(204).send();
}