import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getAllTasks = () => {
    return prisma.task.findMany();
};

export const getTaskById = (id: number) => {
    return prisma.task.findUnique({ where: { id } });

};

export const createTask = (data:{ title: string; done?: boolean }) => {
    return prisma.task.create({ data });
};

export const updateTask = (id: number, data: { title?: string; done?: boolean }) => {
    return prisma.task.update({ where: { id }, data});

};
  
export const deleteTask = (id: number) => {
    return prisma.task.delete({ where: { id }});
};
