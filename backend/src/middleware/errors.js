import { logger } from '../infrastructure/logger.js';

export function notFound(request, response) {
  response.status(404).json({ message: 'Recurso no encontrado.' });
}

export function errorHandler(error, request, response, next) {
  logger.error({ err: error, path: request.path, method: request.method }, 'request_failed');
  if (response.headersSent) return next(error);
  return response.status(error.statusCode || 500).json({ message: 'Error interno del servidor.' });
}
