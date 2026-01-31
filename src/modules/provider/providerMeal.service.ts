import { prisma } from "../../lib/prisma";

interface MealData {
    name: string;
    description: string;
    price: number;
    image: string;
    categoryName: string;
}

const createMeal = async (providerId: string, data: MealData) => {
    const category = await prisma.category.findUnique({
        where: { name: data.categoryName },
    });
    if (!category) throw new Error(`Category '${data.categoryName}' does not exist.`);

    const meal = await prisma.meal.create({
        data: {
            name: data.name,
            description: data.description,
            price: data.price,
            image: data.image,
            categoryId: category.id,
            providerId,
        },
    });

    return meal;
}

const updateMeal = async (providerId: string, mealId: string, data: Partial<MealData>) => {
    // Ensure meal belongs to provider
    const meal = await prisma.meal.findUnique({ where: { id: mealId } });
    if (!meal || meal.providerId !== providerId) throw new Error("You cannot edit this meal");

    // If categoryName is provided, find its id
    let categoryId;
    if (data.categoryName) {
        const category = await prisma.category.findUnique({ where: { name: data.categoryName } });
        if (!category) throw new Error(`Category '${data.categoryName}' does not exist`);
        categoryId = category.id;
    }

    const updatedMeal = await prisma.meal.update({
        where: { id: mealId },
        data: {
            ...data,
            ...(categoryId ? { categoryId } : {}),
        },
    });

    return updatedMeal;
}

const deleteMeal = async (providerId: string, mealId: string) => {
    const meal = await prisma.meal.findUnique({ where: { id: mealId } });
    if (!meal || meal.providerId !== providerId) throw new Error("You cannot delete this meal");

    await prisma.meal.delete({ where: { id: mealId } });
    return { message: "Meal deleted successfully" };
}

const getProviderMeals = async (providerId: string) => {
    return prisma.meal.findMany({
        where: { providerId },
        include: { category: true },
        orderBy: { name: "asc" },
    });
}

export const providerMealService = {
    createMeal,
    updateMeal,
    deleteMeal,
    getProviderMeals
};
