import { prisma } from "../../lib/prisma";

const createCategoryInDB = async (payload: { name: string; image?: string }) => {
    const result = await prisma.category.create({
        data: payload,
    });
    return result;
};

const getAllCategoriesFromDB = async () => {
    const result = await prisma.category.findMany({
        include: {
            _count: {
                select: { meals: true } // Useful for showing "12 Meals" on the frontend
            }
        }
    });
    return result;
};

export const categoryServices = {
    createCategoryInDB,
    getAllCategoriesFromDB,
};