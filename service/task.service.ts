import { TaskInput } from 'types';
import { Task } from '../model/task';
import taskDb from '../repository/task.db';

const getAllTasks = async (): Promise<Task[]> => taskDb.getAllTasks();

const createTask = async ({
    name,
    description,
    isFinished,
}: TaskInput): Promise<Task> => {
    
    const task = new Task({ name, description, isFinished });
 
    return await taskDb.createTask(task);
}

const finishTask = async (id: number): Promise<Task | null> => {
    
    const task = await taskDb.getTaskById(id);
    if (!id) {
        throw new Error(`Task with id ${id} does not exist.`);
    }

    return await taskDb.finishTaskById(id);
}

// const getTaskById = async (id: number): Promise<Task> => {
//     const task = await taskDb.getTaskById({ id });
//     if (!task) throw new Error(`Task with id ${id} does not exist.`);
//     return task;
// };

export default {
    getAllTasks,
    createTask,
    finishTask,
};