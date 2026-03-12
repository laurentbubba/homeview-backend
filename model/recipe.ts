import { Recipe as RecipePrisma, RecipeStep as RecipeStepPrisma, Ingredient as IngredientPrisma } from '../generated/prisma';
import { RecipeType as RecipeTypePrisma } from '../generated/prisma';
import { RecipeStep } from './recipeStep';
import { RecipeType } from './recipeType';

export class Recipe {
    readonly id?: number;
    readonly name: string;
    readonly type: RecipeType;
    readonly cookingDescription: string;
    readonly steps: RecipeStep[];
    
    constructor(recipe: {
        id?: number;
        name: string;
        type: RecipeType;
        cookingDescription: string;
        steps: RecipeStep[];
    }) {
        this.validate(recipe);
        this.id = recipe.id;
        this.name = recipe.name;
        this.type = recipe.type;
        this.cookingDescription = recipe.cookingDescription;
        this.steps = recipe.steps;
    }

    validate(recipe: {
        name: string;
        type: RecipeType;
        cookingDescription: string;
    }) {
        if (!recipe.name.trim()) {
            throw new Error('Name is required');
        }
        if (!recipe.type) {
            throw new Error('Type is required');
        }
        if (!recipe.cookingDescription.trim()) {
            throw new Error('Cooking description is required');
        }
    }

    getId(): number | undefined {
        return this.id;
    }

    getName(): string {
        return this.name;
    }

    getType(): RecipeType {
        return this.type;
    }

    getCookingDescription(): string {
        return this.cookingDescription;
    }

    getSteps(): RecipeStep[] {
        return this.steps;
    }

    static from({ id, name, type, cookingDescription, steps }: RecipePrisma & { 
    type: RecipeTypePrisma,
    steps: (RecipeStepPrisma 
        & { ingredients: IngredientPrisma[] })[] } 
    & { type: RecipeTypePrisma }) {
        return new Recipe({
            id,
            name,
            type: RecipeType.from(type),
            cookingDescription,
            steps: steps.map(step => RecipeStep.from(step))
        });
    }
}

