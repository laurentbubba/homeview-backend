import { Task } from '../model/task';
import database from './database';

const getAllTasks = async (): Promise<Task[]> => {
    try {
        const tasksPrisma = await database.task.findMany({
            // include: { user: true, courses: true }, // to add category etc later
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

export default {
    getAllTasks,
    createTask,
};