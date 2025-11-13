import { Category } from '../model/category';
import database from './database';

const getAllCategories = async (): Promise<Category[]> => {
    try {
        const categoriesPrisma = await database.category.findMany({
        });
        return categoriesPrisma.map((categoryPrisma: any) => Category.from(categoryPrisma));
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const createCategory = async ({
    name,
    description,
}: Category): Promise<Category> => {
    try {
        const categoryPrisma = await database.category.create({
            data: { name, description},
        });
        return Category.from(categoryPrisma);
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const getCategoryById = async (id: number): Promise<Category | null> => {
    try {
        const categoryPrisma = await database.category.findUnique({
            where: { id },
        });
        return categoryPrisma ? Category.from(categoryPrisma) : null;
    } catch (error) {
        throw new Error('Database error. See server log for details.');
    }
};

export default {
    getAllCategories,
    createCategory,
    getCategoryById,
};