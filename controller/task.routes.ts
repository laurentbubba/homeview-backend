/**
 * @swagger
 *   components:
 *    securitySchemes:
 *     bearerAuth:
 *      type: http
 *      scheme: bearer
 *      bearerFormat: JWT
 *    schemas:
 *      Task:
 *          type: object
 *          properties:
 *            id:
 *              type: number
 *              format: int64
 *            name:
 *              type: string
 *              description: Task name.
 *            description:
 *              type: string
 *              description: Task description.
 *            isFinished:
 *              type: boolean
 *              description: Whether task is finished.
 *      TaskResponse:
 *          type: object
 *          properties:
 *            id:
 *              type: number
 *              format: int64
 *            name:
 *              type: string
 *              description: Task name.
 *            description:
 *              type: string
 *              description: Task description.
 *            isFinished:
 *              type: boolean
 *              description: Whether task is finished.
 *      TaskRequest:
 *          type: object
 *          properties:
 *            name:
 *              type: string
 *              description: Task name.
 *            description:
 *              type: string
 *              description: Task description.
 *            isFinished:
 *              type: boolean
 *              description: Whether task is finished.
 */
import express, { NextFunction, Request, Response } from 'express';
import taskService from '../service/task.service'; // TODO: make this a relative path in tsconfig
import { TaskInput } from '../types/index';

const taskRouter = express.Router();

/**
 * @swagger
 * /tasks:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Get a list of all tasks.
 *     responses:
 *       200:
 *         description: A list of tasks.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                  $ref: '#/components/schemas/Task'
 */
taskRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const tasks = await taskService.getAllTasks();
        res.status(200).json(tasks);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /tasks/create:
 *  post:
 *      security:
 *         - bearerAuth: []
 *      summary: Create a Task
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/TaskRequest'
 *      responses:
 *          200:
 *              description: The created Task object.
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/TaskResponse'
 */
taskRouter.post('/create', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const taskInput = <TaskInput>req.body;
        const taskResponse = await taskService.createTask(taskInput);
        res.status(200).json(taskResponse);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /tasks/finish/{taskId}:
 *  put:
 *      security:
 *         - bearerAuth: []
 *      summary: Finish a Task
 *      parameters:
 *       - in: path
 *         name: taskId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The Task ID
 *      responses:
 *          200:
 *              description: The updated Task object.
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/TaskResponse'
 */
taskRouter.put('/finish/:taskId', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const taskId = Number(req.params.taskId);
        const taskResponse = await taskService.finishTask(taskId);
        res.status(200).json(taskResponse);
    } catch (error) {
        next(error);
    }
});

export { taskRouter };