import { Category } from "model/category";

type TaskInput = {
    name: string;
    description: string;
    categoryName: string;
    isFinished: boolean;
};

type CategoryInput = {
    name: string;
    description: string;
};

export { TaskInput, CategoryInput };