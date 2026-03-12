import { Recipe } from '../model/recipe';
import { Ingredient } from '../model/ingredient';
import recipeDb from '../repository/recipe.db';
import { RecipeType } from '../model/recipeType';
import { RecipeInput, IngredientInput } from 'types';
import database from '../repository/database';

const getAllRecipes = async (): Promise<Recipe[]> => recipeDb.getAllRecipes();

const getRecipesByType = async (type: string): Promise<Recipe[]> => recipeDb.getRecipesByType(type);

const getRecipeById = async (id: number): Promise<Recipe | null> => recipeDb.getRecipeById(id);

const createRecipe = async ( input: RecipeInput ): Promise<Recipe> => {
    const recipeType = await database.recipeType.findFirst({
        where: { name: input.typeString }
    });

    if (!recipeType) {
        throw new Error(`Recipe type "${input.typeString}" does not exist.`);
    }

    return await recipeDb.createRecipe(input, recipeType.id);
};

export default {
    getAllRecipes,
    createRecipe,
    getRecipesByType,
    getRecipeById,
};
