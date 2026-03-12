import { Category } from "model/category";

type TaskInput = {
    name: string;
    description: string;
    categoryName: string;
    isFinished: boolean;
    priority: number;
};

type CategoryInput = {
    name: string;
    description: string;
    priority: number;
};

type RecipeInput = {
    name: string;
    typeString: string;
    cookingDescription: string;
    steps: RecipeStepInput[];
};

type RecipeStepInput = {
    title: string;
    order: number;
    description: string;
    time: number;
    ingredients: IngredientInput[];
};

type IngredientInput = {
    name: string;
    quantity: number;
    unit: string;
};

type RecipeTypeInput = {
    name: string;
    description: string;
};


type UserInput = {
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
};

type AuthenticationInput = {
    username: string;
    password: string;
};

type AuthenticationResponse = {
    token: string;
    user: {
        id: number | undefined;
        username: string;
        firstName: string;
        lastName: string;
        email: string;
    }
};

export { TaskInput, CategoryInput, RecipeInput, RecipeStepInput, IngredientInput, RecipeTypeInput, UserInput, AuthenticationInput, AuthenticationResponse };