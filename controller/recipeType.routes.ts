/**
 * @swagger
 *   components:
 *    securitySchemes:
 *     bearerAuth:
 *      type: http
 *      scheme: bearer
 *      bearerFormat: JWT
 *    schemas:
 *      RecipeType:
 *          type: object
 *          properties:
 *            id:
 *              type: number
 *              format: int64
 *            name:
 *              type: string
 *              description: Recipe type name.
 *            description:
 *              type: string
 *              description: Recipe type description.
 *      RecipeTypeResponse:
 *          type: object
 *          properties:
 *            id:
 *              type: number
 *              format: int64
 *            name:
 *              type: string
 *              description: Recipe type name.
 *            description:
 *              type: string
 *              description: Recipe type description.
 *      RecipeTypeRequest:
 *          type: object
 *          properties:
 *            name:
 *              type: string
 *              description: Recipe type name.
 *            description:
 *              type: string
 *              description: Recipe type description.
 */
import express, { NextFunction, Request, Response } from 'express';
import recipeTypeService from '../service/recipeType.service'; // TODO: make this a relative path in tsconfig
import { RecipeTypeInput } from '../types/index';

const recipeTypeRouter = express.Router();

/**
 * @swagger
 * /recipeTypes:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Get a list of all recipe types.
 *     responses:
 *       200:
 *         description: A list of recipe types.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                  $ref: '#/components/schemas/RecipeType'
 */
recipeTypeRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const recipeTypes = await recipeTypeService.getAllRecipeTypes();
        res.status(200).json(recipeTypes);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /recipeTypes/create:
 *  post:
 *      security:
 *         - bearerAuth: []
 *      summary: Create a Recipe Type
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/RecipeTypeRequest'
 *      responses:
 *          200:
 *              description: The created Recipe Type object.
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/RecipeTypeResponse'
 */
recipeTypeRouter.post('/create', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const recipeTypeInput = <RecipeTypeInput>req.body;
        const recipeTypeResponse = await recipeTypeService.createRecipeType(recipeTypeInput);
        res.status(200).json(recipeTypeResponse);
    } catch (error) {
        next(error);
    }
});

export { recipeTypeRouter };