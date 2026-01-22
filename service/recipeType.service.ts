import { RecipeTypeInput } from 'types';
import { RecipeType } from "../model/recipeType";
import recipeTypeDb from "../repository/recipeType.db";

const getAllRecipeTypes = async (): Promise<RecipeType[]> => recipeTypeDb.getAllRecipeTypes();

const createRecipeType = async ({
    name,
    description,
}: RecipeTypeInput): Promise<RecipeType> => {
    
    const recipeType = new RecipeType({ name, description});
 
    return await recipeTypeDb.createRecipeType(recipeType);
}

export default {
    getAllRecipeTypes,
    createRecipeType,
};