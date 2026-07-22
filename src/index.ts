import 'dotenv/config';
import express from 'express';
import taskRoutes from './routes/taskRoutes';
import prisma from './db';
import logger from './logger';
import { requestLogger } from './middleware/requestLogger';


const app = express();
app.use(express.json());
app.use(requestLogger);

app.use('/tasks', taskRoutes);

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => logger.info(`Server running on port ${PORT}`));

// graceful shutdown and we can use logger.info instead console.log...
const  shutdown = async (signal:string) => {
  logger.info(`\n${signal} received.shutting down gracefully...`);
 server.close(async () => {
  logger.info('HTTP server closed.');
  await prisma.$disconnect();
 logger.info('Prisma disconnected.');
  process.exit(0);
 });

 setTimeout(() => {
  logger.error('Forcing shutdown after timeout.');
  process.exit(1);
 }, 5000);
};

process.on('SIGINT', () => shutdown('SIGINT'));
process.on ('SIGTERM', () => shutdown( 'SIGTERM'));