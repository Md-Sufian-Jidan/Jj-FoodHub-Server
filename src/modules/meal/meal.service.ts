import { prisma } from "../../lib/prisma";

interface MealData {
    name: string;
    description: string;
    price: number;
    image: string;
    categoryName: string;
}

const createMealInDB = async (mealData: MealData, userId: string) => {
    const category = await prisma.category.findUnique({
        where: { name: mealData.categoryName }
    });

    if (!category) {
        throw new Error(`Category '${mealData.categoryName}' does not exist.`);
    }

    const providerProfile = await prisma.providerProfile.findUnique({
        where: { userId }
    });

    if (!providerProfile) {
        throw new Error("You must have a Provider Profile to create meals.");
    }
    console.log("Meal data console from meal service", mealData);
    // 3. Create the Meal using the found IDs
    const result = await prisma.meal.create({
        data: {
            name: mealData.name,
            description: mealData.description,
            price: Number(mealData.price),
            image: mealData.image,
            categoryId: category.id,
            providerId: providerProfile.id
        },
        // include: {
        //     category: true
        // }
    });

    return result;
};

// Getting all meals (useful for the /meals route we built)
const getAllMealsFromDB = async (filters: any) => {
    return await prisma.meal.findMany({
        where: {
            isAvailable: true,
            ...(filters.category && { categoryId: filters.category }),
            ...(filters.searchTerm && {
                name: { contains: filters.searchTerm, mode: 'insensitive' }
            })
        },
        include: {
            category: true,
            provider: {
                include: { user: true }
            }
        }
    });
};

export const mealServices = {
    createMealInDB,
    getAllMealsFromDB
};