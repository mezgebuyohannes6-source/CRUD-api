import { z } from 'zod';

export const createTaskSchema = z.object({
    title:z.string().min(1),
    done: z.boolean().optional()
});

export const updateTaskSchema = z.object({
    title: z.string().min(1).optional(),
    done: z.boolean().optional()
});