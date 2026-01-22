import { Recipe } from '../model/recipe';
import database from './database';

const getAllRecipes = async (): Promise<Recipe[]> => {
    try {
        const recipesPrisma = await database.recipe.findMany({
            orderBy: {
                createdAt: 'desc',
            },
            include: { 
                ingredients: true,
                type: true
             }
        });
        return recipesPrisma.map((recipePrisma: any) => Recipe.from(recipePrisma));
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const getRecipesByType = async (type: string): Promise<Recipe[]> => {
    try {
        const recipesPrisma = await database.recipe.findMany({
            where: {
                type: {
                    name: type
                },
            },
            include: { 
                ingredients: true,
                type: true
            }
        });
        
        return recipesPrisma.map((recipePrisma: any) => Recipe.from(recipePrisma));
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const createRecipe = async ({
    name,
    type,
    cookingDescription,
    ingredients,
}: Recipe): Promise<Recipe> => {
    try {
        const recipePrisma = await database.recipe.create({
            data: { 
                name, 
                type: {
                    connect: {
                        id: type.id,
                    },
                },
                cookingDescription,
                ingredients: {
                    create: ingredients.map(ing => ({
                        name: ing.getName(),
                        quantity: ing.getQuantity(),
                        unit: ing.getUnit()
                    }))
                }
            },
            include: { 
                ingredients: true,
                type: true
            }
        });
        return Recipe.from(recipePrisma);
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const getRecipeById = async (id: number): Promise<Recipe | null> => {
    try {
        const recipePrisma = await database.recipe.findUnique({
            where: { id },
            include: { 
                ingredients: true,
                type: true
             }
        });
        return recipePrisma ? Recipe.from(recipePrisma) : null;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

export default {
    getAllRecipes,
    createRecipe,
    getRecipeById,
    getRecipesByType,
};
