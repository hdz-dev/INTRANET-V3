import cors from 'cors';
import cookieParser from 'cookie-parser';
import express from 'express';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import pinoHttp from 'pino-http';
import { env } from './config/env.js';
import { logger } from './infrastructure/logger.js';
import mainRoutes from './routes/main.routes.js';
import { errorHandler, notFound } from './middleware/errors.js';

export const app = express();

app.disable('x-powered-by');
app.set('trust proxy', 1);
app.use(helmet());
app.use(cors({ origin: env.FRONTEND_ORIGIN, credentials: true, methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'] }));
app.use(express.json({ limit: '32kb' }));
app.use(cookieParser());
app.use(pinoHttp({ logger }));

const authLimiter = rateLimit({ windowMs: 15 * 60 * 1000, limit: 20, standardHeaders: 'draft-8', legacyHeaders: false, message: { message: 'Demasiados intentos. Intenta nuevamente más tarde.' } });
app.use('/api/auth/login', authLimiter);
app.use('/api/auth/password/change', authLimiter);
app.use('/api', mainRoutes);

app.get('/health', (request, response) => response.json({ status: 'ok' }));
app.use(notFound);
app.use(errorHandler);
