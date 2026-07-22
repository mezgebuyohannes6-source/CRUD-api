import prisma from '../db';
import logger from '../logger';

export const getAllTasks = () => {
    return prisma.task.findMany();
};

export const getTaskById = (id: number) => {
    return prisma.task.findUnique({ where: { id } });

};

export const createTask = async (data:{ title: string; status?: 'pending' | 'active' | 'done' }) => {
    const task = await prisma.task.create({ data });
    logger.info(`Task created: id=${task.id}, title="${task.title}"`); 
    return task;
};

export const updateTask = async  (id: number, data: { title?: string; status?: 'pending' | 'active' | 'done' }) => {
    const existingTask = await prisma.task.findUnique({where: { id } });
    if (!existingTask) {
    return null;
   }

   const updatedTask = await prisma.task.update({where: { id }, data });
   logger.info(`Task updated: id=${updatedTask.id}, title="${updatedTask.title}"`); 
   return updatedTask;
};
  
export const deleteTask = async (id: number) => {
    const existingTask = await prisma.task.findUnique({ where: { id } });
    if (!existingTask) {
    return null;
   }
   
   await prisma.task.delete({ where: { id }});
   logger.info(`Task deleted: id=${id}, title="${existingTask.title}"`);
   return existingTask;
};
