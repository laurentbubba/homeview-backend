import { Task } from '../model/task';
import taskDb from '../repository/task.db';

const getAllTasks = async (): Promise<Task[]> => taskDb.getAllTasks();

// const getTaskById = async (id: number): Promise<Task> => {
//     const task = await taskDb.getTaskById({ id });
//     if (!task) throw new Error(`Task with id ${id} does not exist.`);
//     return task;
// };

export default { getAllTasks, };