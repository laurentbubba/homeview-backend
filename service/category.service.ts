import { CategoryInput } from 'types';
import { Category } from '../model/category';
import categoryDb from '../repository/category.db';


const getAllCategories = async (): Promise<Category[]> => categoryDb.getAllCategories();

const createCategory = async ({
    name,
    description,
}: CategoryInput): Promise<Category> => {
    
    const category = new Category({ name, description});
 
    return await categoryDb.createCategory(category);
}

export default {
    getAllCategories,
    createCategory,
};