import { Ingredient as IngredientPrisma } from '../generated/prisma';

export class Ingredient {
    readonly id?: number;
    readonly name: string;
    readonly quantity: number;
    readonly unit: string;
    readonly recipeId: number;

    constructor(ingredient: {
        id?: number;
        name: string;
        quantity: number;
        unit: string;
        recipeId: number;
    }) {
        this.validate(ingredient);
        this.id = ingredient.id;
        this.name = ingredient.name;
        this.quantity = ingredient.quantity;
        this.unit = ingredient.unit;
        this.recipeId = ingredient.recipeId;
    }

    validate(ingredient: {
        name: string;
        quantity: number;
        unit: string;
    }) {
        if (!ingredient.name.trim()) {
            throw new Error('Ingredient name is required');
        }
        if (ingredient.quantity <= 0) {
            throw new Error('Quantity must be greater than 0');
        }
        if (!ingredient.unit.trim()) {
            throw new Error('Unit is required (e.g., g, ml, cups, tsp)');
        }
    }

    getId(): number | undefined {
        return this.id;
    }

    getName(): string {
        return this.name;
    }

    getQuantity(): number {
        return this.quantity;
    }

    getUnit(): string {
        return this.unit;
    }

    getRecipeId(): number {
        return this.recipeId;
    }

    static from({ id, name, quantity, unit, recipeId }: IngredientPrisma) {
        return new Ingredient({
            id,
            name,
            quantity,
            unit,
            recipeId
        });
    }
}
