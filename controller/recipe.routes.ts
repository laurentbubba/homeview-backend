/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     RecipeStepResponse:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *           format: int64
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: When the ingredient was created.
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: When the ingredient was last updated.
 *         order:
 *           type: number
 *           description: Order of the step in the recipe.
 *         title:
 *           type: string
 *           description: Title of the step.
 *         description:
 *           type: string
 *           description: Description of the step.
 *         time:
 *           type: number
 *           description: Time required to complete the step.
 *         recipeId:
 *           type: number
 *           format: int64
 *           description: ID of the recipe this ingredient belongs to.
 *         ingredients:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/IngredientResponse'
 *           description: List of ingredients for the step.
 *     IngredientResponse:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *           format: int64
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: When the ingredient was created.
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: When the ingredient was last updated.
 *         name:
 *           type: string
 *           description: Ingredient name.
 *         quantity:
 *           type: number
 *           format: float
 *           description: Quantity of the ingredient.
 *         unit:
 *           type: string
 *           description: Unit of measurement (e.g., grams, ml, cups).
 *         recipeId:
 *           type: number
 *           format: int64
 *           description: ID of the recipe this ingredient belongs to.
 *     RecipeResponse:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *           format: int64
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: When the recipe was created.
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: When the recipe was last updated.
 *         name:
 *           type: string
 *           description: Recipe name.
 *         type:
 *           type: string
 *           description: Type of recipe (e.g., dessert, main course, appetizer).
 *         cookingDescription:
 *           type: string
 *           description: Instructions for cooking the recipe.
 *         steps:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/RecipeStepResponse'
 *           description: List of steps for the recipe.
 *     RecipeStepRequest:
 *       type: object
 *       properties:
 *         order:
 *           type: number
 *           description: Order of the step in the recipe.
 *         title:
 *           type: string
 *           description: Title of the step.
 *         description:
 *           type: string
 *           description: Description of the step.
 *         time:
 *           type: number
 *           description: Time required to complete the step.
 *         ingredients:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/IngredientRequest'
 *           description: List of ingredients for the step.
 *     IngredientRequest:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: Ingredient name.
 *         quantity:
 *           type: number
 *           format: float
 *           description: Quantity of the ingredient.
 *         unit:
 *           type: string
 *           description: Unit of measurement (e.g., grams, ml, cups).
 *     RecipeRequest:
 *       type: object
 *       required:
 *         - name
 *         - type
 *         - cookingDescription
 *       properties:
 *         name:
 *           type: string
 *           description: Recipe name.
 *         type:
 *           type: string
 *           description: Type of recipe (e.g., dessert, main course, appetizer).
 *         cookingDescription:
 *           type: string
 *           description: Instructions for cooking the recipe.
 *         steps:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/RecipeStepRequest'
 *             description: List of steps for the recipe.
 */
import express, { NextFunction, Request, Response } from 'express';
import recipeService from '../service/recipe.service'; // TODO: make this a relative path in tsconfig
import { RecipeInput } from '../types/index';

const recipeRouter = express.Router();

/**
 * @swagger
 * /recipes:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Get a list of all recipes.
 *     responses:
 *       200:
 *         description: A list of recipes.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                  $ref: '#/components/schemas/RecipeResponse'
 */
recipeRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const recipes = await recipeService.getAllRecipes();
        res.status(200).json(recipes);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /recipes/byType/{type}:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Get a list of all recipes of a certain type.
 *     parameters:
 *       - in: path
 *         name: type
 *         required: true
 *         schema:
 *           type: string
 *         description: The Recipe type
 *     responses:
 *       200:
 *         description: A list of recipes of a certain type.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                  $ref: '#/components/schemas/RecipeResponse'
 */
recipeRouter.get('/byType/:type', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const type = req.params.type as string;
        const recipes = await recipeService.getRecipesByType(type);
        res.status(200).json(recipes);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /recipes/{id}:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Get a list of all recipes of a certain type.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The Recipe ID
 *     responses:
 *       200:
 *         description: A list of recipes of a certain type.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                  $ref: '#/components/schemas/RecipeResponse'
 */
recipeRouter.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = parseInt(`${req.params.id}`, 10);
        const recipe = await recipeService.getRecipeById(id);
        res.status(200).json(recipe);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /recipes/create:
 *  post:
 *      security:
 *         - bearerAuth: []
 *      summary: Create a Recipe
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/RecipeRequest'
 *      responses:
 *          200:
 *              description: The created Recipe object.
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/RecipeResponse'
 */
recipeRouter.post('/create', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const recipeInput = <RecipeInput>req.body;
        const recipeResponse = await recipeService.createRecipe(recipeInput);
        res.status(200).json(recipeResponse);
    } catch (error) {
        next(error);
    }
});

export { recipeRouter };
