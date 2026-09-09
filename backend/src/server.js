import { app } from './app.js';
import { env } from './config/env.js';
import { disconnectPrisma } from './infrastructure/prisma.js';
import { logger } from './infrastructure/logger.js';

const server = app.listen(env.PORT, () => logger.info({ port: env.PORT }, 'giga_backend_started'));

async function shutdown(signal) {
  logger.info({ signal }, 'giga_backend_shutdown');
  server.close(async () => {
    await disconnectPrisma();
    process.exit(0);
  });
}

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
