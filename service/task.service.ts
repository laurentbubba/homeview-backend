import { TaskInput } from 'types';
import { Task } from '../model/task';
import taskDb from '../repository/task.db';
import categoryDb from '../repository/category.db';

const getAllTasks = async (): Promise<Task[]> => taskDb.getAllTasks();

const getUnfinishedTasksByCategoryName = async (categoryName: string): Promise<Task[]> => taskDb.getUnfinishedTasksByCategoryName(categoryName);

const getUnfinishedTasksOnPriority = async (): Promise<Task[]> => taskDb.getUnfinishedTasksOnPriority();

const getUnfinishedTasksOnSmartPriority = async (): Promise<Task[]> => {
    const tasks = await taskDb.getUnfinishedTasksRaw();

    return tasks.sort((a, b) => {
        const highPriocategories = a.category.priority >= 3 ? 1 : 0;
        const lowPrioCategories = b.category.priority >= 3 ? 1 : 0;
        
        if (highPriocategories !== lowPrioCategories) return lowPrioCategories - highPriocategories;

        const highPrioCategoryTaskIsCrit = a.priority === 5 ? 1 : 0;
        const lowPrioCategoryTaskIsCrit = b.priority === 5 ? 1 : 0;

        if (highPrioCategoryTaskIsCrit !== lowPrioCategoryTaskIsCrit) return lowPrioCategoryTaskIsCrit - highPrioCategoryTaskIsCrit;

        if (a.category.priority !== b.category.priority) {
            return b.category.priority - a.category.priority;
        }

        return b.priority - a.priority;
    });
};

const createTask = async ({
    name,
    description,
    categoryName,
    isFinished,
    priority
}: TaskInput): Promise<Task> => {
    
    const category = await categoryDb.getCategoryByName(categoryName);
    if (!category) {
        throw new Error(`Category with name ${categoryName} does not exist.`);
    }

    const task = new Task({ name, description, category, isFinished, priority });
 
    return await taskDb.createTask(task);
}

const finishTask = async (id: number): Promise<Task | null> => {
    
    const task = await taskDb.getTaskById(id);
    if (!id) {
        throw new Error(`Task with id ${id} does not exist.`);
    }

    return await taskDb.finishTaskById(id);
}

const changePriority = async (id: number, priority: number): Promise<Task | null> => {
    
    const task = await taskDb.getTaskById(id);
    if (!id) {
        throw new Error(`Task with id ${id} does not exist.`);
    }

    return await taskDb.changePriorityById(id, priority);
}

export default {
    getAllTasks,
    createTask,
    finishTask,
    getUnfinishedTasksByCategoryName,
    getUnfinishedTasksOnPriority,
    getUnfinishedTasksOnSmartPriority,
    changePriority,
};