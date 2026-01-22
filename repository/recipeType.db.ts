import { RecipeType } from '../model/recipeType';
import database from './database';

const getAllRecipeTypes = async (): Promise<RecipeType[]> => {
    try {
        const recipeTypesPrisma = await database.recipeType.findMany({
            include: { recipes: true }
        });
        return recipeTypesPrisma.map((recipeTypePrisma: any) => RecipeType.from(recipeTypePrisma));
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const createRecipeType = async ({
    name,
    description,
}: RecipeType): Promise<RecipeType> => {
    try {
        const recipeTypePrisma = await database.recipeType.create({
            data: { name, description },
        });
        return RecipeType.from(recipeTypePrisma);
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const getRecipeTypeById = async (id: number): Promise<RecipeType | null> => {
    try {
        const recipeTypePrisma = await database.recipeType.findUnique({
            where: { id },
            include: { recipes: true }
        });
        return recipeTypePrisma ? RecipeType.from(recipeTypePrisma) : null;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const getRecipeTypeName = async (name: string): Promise<RecipeType | null> => {
    try {
        const recipeTypeName = await database.recipeType.findUnique({
            where: { name },
            include: { recipes: true }
        });
        return recipeTypeName ? RecipeType.from(recipeTypeName) : null;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

export default {
    getAllRecipeTypes,
    createRecipeType,
    getRecipeTypeById,
    getRecipeTypeName,
};  