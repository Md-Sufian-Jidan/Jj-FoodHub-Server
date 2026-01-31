import { Request, Response } from "express";
import { mealServices } from "./meal.service";

const createMeal = async (req: Request, res: Response) => {
    try {
        const mealData = req.body;
        const userId = req.user!.id;

        const result = await mealServices.createMealInDB(mealData, userId);

        return res.status(201).json({
            success: true,
            message: "Meal created successfully! 🍽️",
            data: result,
        });
    } catch (error: any) {
        return res.status(error.status || 500).json({
            success: false,
            message: error.message || "Something went wrong while creating the meal.",
            error: error,
        });
    }
};

const getAllMeals = async (req: Request, res: Response) => {
    try {
        const filters = req.query;
        const result = await mealServices.getAllMealsFromDB(filters);

        return res.status(200).json({
            success: true,
            message: "Meals retrieved successfully",
            count: result.length,
            data: result,
        });
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: "Failed to fetch meals",
            error: error.message,
        });
    }
};

export const mealController = {
    createMeal,
    getAllMeals
};