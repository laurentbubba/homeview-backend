import { Category as CategoryPrisma } from '../generated/prisma';

export class Category {
    readonly id?: number;
    readonly name: string;
    readonly description: string;

    constructor(category: {
        id?: number;
        name: string;
        description: string;
    }) {
        this.id = category.id;
        this.name = category.name;
        this.description = category.description;
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

    equals(category: Category): boolean {
        return (
            this.name === category.getName() &&
            this.description === category.getDescription()
        );
    }

    static from({ id, name, description}: CategoryPrisma) {
        return new Category({
            id,
            name,
            description: description ?? ''
        });
    }
}