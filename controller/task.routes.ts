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
 */
import express, { NextFunction, Request, Response } from 'express';
import taskService from '../service/task.service'; // TODO: make this a relative path in tsconfig

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

// /**
//  * @swagger
//  * /lecturers/{id}:
//  *  get:
//  *      security:
//  *         - bearerAuth: []
//  *      summary: Get a lecturer by id.
//  *      parameters:
//  *          - in: path
//  *            name: id
//  *            schema:
//  *              type: integer
//  *              required: true
//  *              description: The lecturer id.
//  *      responses:
//  *          200:
//  *              description: A lecturer object.
//  *              content:
//  *                  application/json:
//  *                      schema:
//  *                          $ref: '#/components/schemas/Lecturer'
//  */
// lecturerRouter.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         const lecturer = await lecturerService.getLecturerById(Number(req.params.id));
//         res.status(200).json(lecturer);
//     } catch (error) {
//         next(error);
//     }
// });

export { taskRouter };