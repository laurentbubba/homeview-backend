"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Task = void 0;
class Task {
    // TODO: priority
    // TODO: is of a category (which is new class)
    constructor(task) {
        this.id = task.id;
        this.name = task.name;
        this.description = task.description;
        this.isFinished = task.isFinished;
    }
    getId() {
        return this.id;
    }
    getName() {
        return this.name;
    }
    getDescription() {
        return this.description;
    }
    getIsFinished() {
        return this.isFinished;
    }
    equals(task) {
        return (this.name === task.getName() &&
            this.description === task.getDescription() &&
            this.isFinished === task.getIsFinished());
    }
    static from({ id, name, description, isFinished }) {
        return new Task({
            id,
            name,
            description,
            isFinished
        });
    }
}
exports.Task = Task;
