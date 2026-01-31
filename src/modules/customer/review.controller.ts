import { Request, Response } from "express";
import { reviewService } from "./review.service";

const createReview = async (req: Request, res: Response) => {
    try {
        const userId = req.user!.id;
        const { mealId, rating, comment } = req.body;

        if (!mealId || !rating) {
            return res.status(400).json({ success: false, message: "mealId and rating are required" });
        }

        const review = await reviewService.createReview(userId, { mealId, rating, comment });
        res.status(201).json({ success: true, message: "Review submitted!", review });
    } catch (error: any) {
        res.status(500).json({ success: false, message: error.message });
    }
}

const getReviewsByMeal = async (req: Request, res: Response) => {
    try {
        const { mealId } = req.params;
        const reviews = await reviewService.getReviewsByMeal(mealId as string);
        res.json({ success: true, count: reviews.length, reviews });
    } catch (error: any) {
        res.status(500).json({ success: false, message: error.message });
    }
}

const getReviewsByUser = async (req: Request, res: Response) => {
    try {
        const userId = req.user!.id;
        const reviews = await reviewService.getReviewsByUser(userId);
        res.json({ success: true, count: reviews.length, reviews });
    } catch (error: any) {
        res.status(500).json({ success: false, message: error.message });
    }
}

export const reviewController = {
    createReview,
    getReviewsByMeal,
    getReviewsByUser
};
