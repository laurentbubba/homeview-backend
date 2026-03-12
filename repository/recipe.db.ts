import { RecipeInput } from 'types';
import { Recipe } from '../model/recipe';
import database from './database';

const getAllRecipes = async (): Promise<Recipe[]> => {
    try {
const recipesPrisma = await database.recipe.findMany({
            orderBy: {
                name: 'desc',
            },
            include: { 
                // Include the steps
                steps: {
                    orderBy: {
                        order: 'asc' // Keeps your 1, 2, 3 order intact
                    },
                    include: {
                        ingredients: true 
                    }
                },
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
            orderBy: {
                name: 'desc',
            },
            include: { 
                // Include the steps
                steps: {
                    orderBy: {
                        order: 'asc' // Keeps your 1, 2, 3 order intact
                    },
                    include: {
                        ingredients: true 
                    }
                },
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
    typeString,
    cookingDescription,
    steps,
}: RecipeInput, typeId: number): Promise<Recipe> => {
    try {
        const recipePrisma = await database.recipe.create({
            data: { 
                name, 
                type: {
                    connect: {
                        id: typeId,
                    },
                },
                cookingDescription,
                steps: {
                    create: steps.map(step => ({
                        order: step.order,
                        title: step.title,
                        description: step.description,
                        time: step.time,
                        // Nest the ingredients inside each specific step
                        ingredients: {
                            create: step.ingredients.map(ing => ({
                                name: ing.name,
                                quantity: ing.quantity,
                                unit: ing.unit
                            }))
                        }
                    }))
                }
            },
            include: { 
                type: true,
                steps: {
                    include: {
                        ingredients: true
                    }
                }
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
                steps: {
                    include: {
                        ingredients: true
                    }
                },
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
