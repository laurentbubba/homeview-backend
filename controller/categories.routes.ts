/**
 * @swagger
 *   components:
 *    securitySchemes:
 *     bearerAuth:
 *      type: http
 *      scheme: bearer
 *      bearerFormat: JWT
 *    schemas:
 *      Category:
 *          type: object
 *          properties:
 *            id:
 *              type: number
 *              format: int64
 *            name:
 *              type: string
 *              description: Category name.
 *            description:
 *              type: string
 *              description: Category description.
 *      CategoryResponse:
 *          type: object
 *          properties:
 *            id:
 *              type: number
 *              format: int64
 *            name:
 *              type: string
 *              description: Category name.
 *            description:
 *              type: string
 *              description: Category description.
 *      CategoryRequest:
 *          type: object
 *          properties:
 *            name:
 *              type: string
 *              description: Category name.
 *            description:
 *              type: string
 *              description: Category description.
 */
import express, { NextFunction, Request, Response } from 'express';
import categoryService from '../service/category.service'; // TODO: make this a relative path in tsconfig
import { CategoryInput } from '../types/index';

const categoryRouter = express.Router();

/**
 * @swagger
 * /categories:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Get a list of all categories.
 *     responses:
 *       200:
 *         description: A list of categories.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                  $ref: '#/components/schemas/Category'
 */
categoryRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const categories = await categoryService.getAllCategories();
        res.status(200).json(categories);
    } catch (error) {
        next(error);
    }
});