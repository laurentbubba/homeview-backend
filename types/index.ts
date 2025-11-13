import { Category } from "model/category";

type TaskInput = {
    name: string;
    description: string;
    categoryId: number;
    isFinished: boolean;
};

type CategoryInput = {
    name: string;
    description: string;
};

export { TaskInput, CategoryInput };