import crypto from 'node:crypto';
import { env } from '../../config/env.js';
import { prisma } from '../../infrastructure/prisma.js';

export function createSessionToken() {
  return crypto.randomBytes(32).toString('base64url');
}

export function hashSessionToken(token) {
  return crypto.createHash('sha256').update(token).digest('hex');
}

export function sessionCookieOptions() {
  return {
    httpOnly: true,
    secure: env.COOKIE_SECURE,
    sameSite: env.COOKIE_SECURE ? 'none' : 'lax',
    path: '/',
    maxAge: env.SESSION_TTL_DAYS * 24 * 60 * 60 * 1000
  };
}

export async function createSession(user, request) {
  const token = createSessionToken();
  const expiresAt = new Date(Date.now() + env.SESSION_TTL_DAYS * 24 * 60 * 60 * 1000);
  const session = await prisma.session.create({
    data: {
      tokenHash: hashSessionToken(token),
      userId: user.id,
      expiresAt,
      ipAddress: request.ip,
      userAgent: request.get('user-agent')?.slice(0, 512)
    }
  });
  return { id: session.id, token, expiresAt };
}

export async function getSession(request) {
  const token = request.cookies[env.SESSION_COOKIE_NAME];
  if (!token) return null;
  const session = await prisma.session.findUnique({
    where: { tokenHash: hashSessionToken(token) },
    include: {
      user: {
        include: {
          roleAssignments: {
            where: { active: true },
            include: { role: { include: { permissions: { include: { permission: true } } } } }
          }
        }
      }
    }
  });
  if (!session || session.revokedAt || session.expiresAt <= new Date() || session.user.status !== 'ACTIVE') return null;
  await prisma.session.update({ where: { id: session.id }, data: { lastSeenAt: new Date() } });
  return session;
}

export async function revokeSession(request, reason = 'logout') {
  const token = request.cookies[env.SESSION_COOKIE_NAME];
  if (!token) return;
  await prisma.session.updateMany({
    where: { tokenHash: hashSessionToken(token), revokedAt: null },
    data: { revokedAt: new Date(), revokeReason: reason }
  });
}