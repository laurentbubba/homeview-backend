import { Recipe } from '../model/recipe';
import { Ingredient } from '../model/ingredient';
import recipeDb from '../repository/recipe.db';
import { RecipeType } from '../model/recipeType';
import { RecipeInput, IngredientInput } from 'types';
import database from '../repository/database';

const getAllRecipes = async (): Promise<Recipe[]> => recipeDb.getAllRecipes();

const getRecipesByType = async (type: string): Promise<Recipe[]> => recipeDb.getRecipesByType(type);

const createRecipe = async ({
    name,
    typeString,
    cookingDescription,
    ingredients,
}: RecipeInput): Promise<Recipe> => {
    
    const recipeType = await database.recipeType.findFirst({
        where: { name: typeString }
    });

    if (!recipeType) {
        throw new Error(`Recipe type "${typeString}" does not exist.`);
    }

    const createdPrismaRecipe = await database.recipe.create({
        data: {
            name,
            cookingDescription,
            type: { connect: { id: recipeType.id } },
            ingredients: {
                create: ingredients.map(ing => ({
                    name: ing.name,
                    quantity: ing.quantity,
                    unit: ing.unit,
                }))
            }
        },
        include: {
            ingredients: true,
            type: true
        }
    });

    return Recipe.from(createdPrismaRecipe);
};

export default {
    getAllRecipes,
    createRecipe,
    getRecipesByType,
};
