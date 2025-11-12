import { Task as TaskPrisma } from '../generated/prisma';

export class Task {
    readonly id?: number;
    readonly name: string;
    readonly description: string;
    readonly isFinished: boolean;
    // TODO: priority
    // TODO: is of a category (which is new class)

    constructor(task: {
        id?: number;
        name: string;
        description: string;
        isFinished: boolean;
    }) {
        this.id = task.id;
        this.name = task.name;
        this.description = task.description;
        this.isFinished = task.isFinished;
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

    getIsFinished(): boolean {
        return this.isFinished;
    }

    equals(task: Task): boolean {
        return (
            this.name === task.getName() &&
            this.description === task.getDescription() &&
            this.isFinished === task.getIsFinished()
        );
    }

    static from({ id, name, description, isFinished }: TaskPrisma) {
        return new Task({
            id,
            name,
            description: description ?? '',
            isFinished
        });
    }
}