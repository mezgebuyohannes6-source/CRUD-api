import { z } from 'zod';

export const createTaskSchema = z.object({
    title:z.string().min(1),
    status: z.enum(['pending', 'active','done']).optional()
});

export const updateTaskSchema = z.object({
    title: z.string().min(1).optional(),
    status: z.enum(['pending', 'active', 'done']).optional()
});