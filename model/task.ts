import { Task as TaskPrisma } from '../generated/prisma';
import { Category as CategoryPrisma } from '../generated/prisma';
import { Category } from './category';

export class Task {
    readonly id?: number;
    readonly name: string;
    readonly description: string;
    readonly category: Category;
    readonly isFinished: boolean;

    constructor(task: {
        id?: number;
        name: string;
        description: string;
        category: Category;
        isFinished: boolean;
    }) {
        this.validate(task)
        this.id = task.id;
        this.name = task.name;
        this.description = task.description;
        this.category = task.category;
        this.isFinished = task.isFinished;
    }

    validate(task: {
        name: string;
        category: Category;
    }) {
        if (!task.name.trim()) {
            throw new Error('Name is required');
        }
        if (!task.category) {
            throw new Error('Category is required');
        }
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

    getCategory(): Category {
        return this.category;
    }

    getIsFinished(): boolean {
        return this.isFinished;
    }

    equals(task: Task): boolean {
        return (
            this.name === task.getName() &&
            this.description === task.getDescription() &&
            this.category === task.getCategory() &&
            this.isFinished === task.getIsFinished()
        );
    }

    static from({ id, name, description, category, isFinished }: TaskPrisma & {category: CategoryPrisma}) {
        return new Task({
            id,
            name,
            description: description ?? '',
            category: Category.from(category),
            isFinished
        });
    }
}