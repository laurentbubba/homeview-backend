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

export default {
    getAllTasks,
};