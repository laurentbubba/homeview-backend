import { Task } from '../model/task';
import database from './database';

const getAllTasks = async (): Promise<Task[]> => {
    try {
        const tasksPrisma = await database.task.findMany({
            orderBy: {
                isFinished: 'asc', 
            },
        });
        return tasksPrisma.map((taskPrisma: any) => Task.from(taskPrisma));
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const createTask = async ({
    name,
    description,
    isFinished,
}: Task): Promise<Task> => {
    try {
        const taskPrisma = await database.task.create({
            data: { name, description, isFinished },
        });
        return Task.from(taskPrisma);
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const getTaskById = async (id: number): Promise<Task | null> => {
    try {
        const taskPrisma = await database.task.findUnique({
            where: { id },
        });
        return taskPrisma ? Task.from(taskPrisma) : null;
    } catch (error) {
        throw new Error('Database error. See server log for details.');
    }
};

const finishTaskById = async (taskId: number): Promise<Task | null> => {
    try {
        const taskPrisma = await database.task.update({
            where: {id: taskId},
            data: {isFinished: true},
        });
        return taskPrisma ? Task.from(taskPrisma) : null;
    } catch (error) {
        throw new Error('Database error. See server log for details.');
    }
};

export default {
    getAllTasks,
    createTask,
    getTaskById,
    finishTaskById,
};