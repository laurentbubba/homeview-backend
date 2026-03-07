/**
 * @swagger
 *   components:
 *    securitySchemes:
 *     cookieAuth:
 *      type: apiKey
 *      in: cookie
 *      name: token
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
 *       - cookieAuth: []
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
 * /tasks:
 *   get:
 *     security:
 *       - cookieAuth: []
 *     summary: Get a list of all tasks on priority.
 *     responses:
 *       200:
 *         description: A list of tasks by priorities.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                  $ref: '#/components/schemas/Task'
 */
taskRouter.get('/onPriority', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const tasks = await taskService.getUnfinishedTasksOnPriority();
        res.status(200).json(tasks);
    } catch (error) {
        next(error);
    }
});



/**
 * @swagger
 * /tasks/byCategory/{categoryName}:
 *   get:
 *     security:
 *       - cookieAuth: []
 *     summary: Get a list of all tasks of a certain category.
 *     parameters:
 *       - in: path
 *         name: categoryName
 *         required: true
 *         schema:
 *           type: string
 *         description: The Category name
 *     responses:
 *       200:
 *         description: A list of tasks of a certain category.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                  $ref: '#/components/schemas/Task'
 */
taskRouter.get('/byCategory/:categoryName', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const categoryName = req.params.categoryName as string;
        const tasks = await taskService.getUnfinishedTasksByCategoryName(categoryName);
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
 *         - cookieAuth: []
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
 *         - cookieAuth: []
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

/**
 * @swagger
 * /tasks/changePriority/{taskId}:
 *  put:
 *      security:
 *         - cookieAuth: []
 *      summary: Change the priority of a Task
 *      parameters:
 *       - in: path
 *         name: taskId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The Task ID
 *      requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 priority:
 *                   type: integer
 *         description: The new priority for the task
 *      responses:
 *          200:
 *              description: The updated Task object.
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/TaskResponse'
 */
taskRouter.put('/updatePriority/:taskId', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const taskId = Number(req.params.taskId);
        const { priority } = req.body;
        const taskResponse = await taskService.changePriority(taskId, priority);
        res.status(200).json(taskResponse);
    } catch (error) {
        next(error);
    }
});



export { taskRouter };