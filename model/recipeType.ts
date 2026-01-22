import { RecipeType as RecipeTypePrisma } from '../generated/prisma';

export class RecipeType {
    readonly id?: number;
    readonly name: string;
    readonly description: string;

    constructor(recipeType: {
        id?: number;
        name: string;
        description: string;
    }) {
        this.id = recipeType.id;
        this.name = recipeType.name;
        this.description = recipeType.description;
    }

    getId(): number | undefined {
        return this.id;
    }

    getName(): string {
        return this.name;
    }

    getDescription(): string {
        return this.description;
    }

    equals(recipeType: RecipeType): boolean {
        return (
            this.name === recipeType.getName() &&
            this.description === recipeType.getDescription()
        );
    }

    static from({ id, name, description}: RecipeTypePrisma) {
        return new RecipeType({
            id,
            name,
            description: description ?? ''
        });
    }
}