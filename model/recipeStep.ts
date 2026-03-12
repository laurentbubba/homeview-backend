import { RecipeStep as RecipeStepPrisma } from '../generated/prisma';
import { Ingredient as IngredientPrisma } from '../generated/prisma';
import { Ingredient } from './ingredient';

export class RecipeStep {
    readonly id?: number;
    readonly order: number;
    readonly title: string;
    readonly description: string;
    readonly time: number;
    readonly ingredients: Ingredient[];

    constructor(recipeStep: {
        id?: number;
        order: number;
        title: string;
        description: string;
        time: number;
        ingredients: Ingredient[];
    }) {
        this.validate(recipeStep);
        this.id = recipeStep.id;
        this.order = recipeStep.order;
        this.title = recipeStep.title;
        this.description = recipeStep.description;
        this.time = recipeStep.time;
        this.ingredients = recipeStep.ingredients;
    }

    validate(recipeStep: {
        order: number;
        title: string;
        description: string;
        time: number;
    }) {
        if (recipeStep.order === undefined) {
            throw new Error('Order is required');
        }
        if (!recipeStep.title.trim()) {
            throw new Error('Title is required');
        }
        if (!recipeStep.description.trim()) {
            throw new Error('Description is required');
        }
        if (recipeStep.time === undefined || recipeStep.time < 0) {
            throw new Error('Time is required');
        }
    }

    getId(): number | undefined {
        return this.id;
    }

    getTitle(): string {
        return this.title;
    }

    getDescription(): string {
        return this.description;
    }

    getTime(): number {
        return this.time;
    }

    getIngredients(): Ingredient[] {
        return this.ingredients;
    }

    static from({ id, order, title, description, time, ingredients }: RecipeStepPrisma & { ingredients: (IngredientPrisma)[] }) {
        return new RecipeStep({
            id,
            order,
            title,
            description,
            time,
            ingredients: ingredients.map(ing => Ingredient.from(ing))
        });
    }
}

