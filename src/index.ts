import 'dotenv/config';
import express from 'express';
import taskRoutes from './routes/taskRoutes';
import prisma from './db';


const app = express();
app.use(express.json());

app.use('/tasks', taskRoutes);

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// graceful shutdown 
const  shutdown = async (signal:string) => {
  console.log(`\n${signal} received.shutting down gracefully...`);
 server.close(async () => {
  console.log('HTTP server closed.');
  await prisma.$disconnect();
  console.log('Prisma disconnected.');
  process.exit(0);
 });

 setTimeout(() => {
  console.error('Forcing shutdown after timeout.');
  process.exit(1);
 }, 5000);
};

process.on('SIGINT', () => shutdown('SIGINT'));
process.on ('SIGTERM', () => shutdown( 'SIGTERM'));