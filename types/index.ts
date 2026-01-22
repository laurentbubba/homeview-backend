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

type RecipeInput = {
    name: string;
    typeString: string;
    cookingDescription: string;
    ingredients: IngredientInput[];
};

type RecipeTypeInput = {
    name: string;
    description: string;
};

type IngredientInput = {
    name: string;
    quantity: number;
    unit: string;
};

export { TaskInput, CategoryInput, RecipeInput, IngredientInput, RecipeTypeInput };