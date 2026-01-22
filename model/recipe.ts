import { Recipe as RecipePrisma } from '../generated/prisma';
import { Ingredient as IngredientPrisma } from '../generated/prisma';
import { RecipeType as RecipeTypePrisma } from '../generated/prisma';
import { Ingredient } from './ingredient';
import { RecipeType } from './recipeType';

export class Recipe {
    readonly id?: number;
    readonly name: string;
    readonly type: RecipeType;
    readonly cookingDescription: string;
    readonly ingredients: Ingredient[];

    constructor(recipe: {
        id?: number;
        name: string;
        type: RecipeType;
        cookingDescription: string;
        ingredients: Ingredient[];
    }) {
        this.validate(recipe);
        this.id = recipe.id;
        this.name = recipe.name;
        this.type = recipe.type;
        this.cookingDescription = recipe.cookingDescription;
        this.ingredients = recipe.ingredients;
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

    getIngredients(): Ingredient[] {
        return this.ingredients;
    }

    static from({ id, name, type, cookingDescription, ingredients }: RecipePrisma & { ingredients: (IngredientPrisma)[] } & { type: RecipeTypePrisma }) {
        return new Recipe({
            id,
            name,
            type: RecipeType.from(type),
            cookingDescription,
            ingredients: ingredients.map(ing => Ingredient.from(ing))
        });
    }
}

