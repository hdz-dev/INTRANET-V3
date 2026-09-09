import { prisma } from '../../infrastructure/prisma.js';

export async function recordAudit({ request, actorId, action, entity, entityId, metadata = {} }) {
  return prisma.auditEvent.create({
    data: {
      actorId,
      action,
      entity,
      entityId,
      metadata,
      ipAddress: request.ip
    }
  });
}

export async function tryRecordAudit(event) {
  try {
    await recordAudit(event);
  } catch {
    // La auditoría no debe impedir el funcionamiento de autenticación.
  }
}