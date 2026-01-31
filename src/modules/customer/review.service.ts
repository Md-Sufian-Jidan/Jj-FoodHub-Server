import { prisma } from "../../lib/prisma";

interface CreateReviewData {
    mealId: string;
    rating: number;
    comment?: string;
}

const createReview = async (userId: string, data: CreateReviewData) => {
    const { mealId, rating, comment } = data;

    // 1. Check if user has ordered this meal
    const orderItem = await prisma.orderItem.findFirst({
        where: {
            mealId,
            order: {
                userId,
                status: { not: "CANCELLED" }, // only allow reviewing non-cancelled orders
            },
        },
    });

    if (!orderItem) {
        throw new Error("You can only review meals you have ordered");
    }

    // 2. Check if user already reviewed this meal
    const existingReview = await prisma.review.findUnique({
        where: { userId_mealId: { userId, mealId } },
    });

    if (existingReview) {
        throw new Error("You have already reviewed this meal");
    }

    // 3. Create review
    const review = await prisma.review.create({
        data: {
            userId,
            mealId,
            rating,
            comment,
        },
    });

    return review;
}

const getReviewsByMeal = async (mealId: string) => {
    return prisma.review.findMany({
        where: { mealId },
        orderBy: { createdAt: "desc" },
        include: { user: true },
    });
}

const getReviewsByUser = async (userId: string) => {
    return prisma.review.findMany({
        where: { userId },
        orderBy: { createdAt: "desc" },
        include: { meal: true },
    });
}
export const reviewService = {
    createReview,
    getReviewsByMeal,
    getReviewsByUser
};
