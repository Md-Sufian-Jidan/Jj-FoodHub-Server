import { Request, Response } from "express";
import { providerMealService } from "./providerMeal.service";

export const providerMealController = {
    createMeal: async (req: Request, res: Response) => {
        try {
            const providerId = req.user!.id;
            const mealData = req.body;
            const meal = await providerMealService.createMeal(providerId, mealData);
            res.status(201).json({ success: true, message: "Meal created", meal });
        } catch (error: any) {
            res.status(400).json({ success: false, message: error.message });
        }
    },

    updateMeal: async (req: Request, res: Response) => {
        try {
            const providerId = req.user!.id;
            const { id: mealId } = req.params;
            const mealData = req.body;
            const updatedMeal = await providerMealService.updateMeal(providerId, mealId, mealData);
            res.json({ success: true, message: "Meal updated", meal: updatedMeal });
        } catch (error: any) {
            res.status(400).json({ success: false, message: error.message });
        }
    },

    deleteMeal: async (req: Request, res: Response) => {
        try {
            const providerId = req.user!.id;
            const { id: mealId } = req.params;
            const result = await providerMealService.deleteMeal(providerId, mealId);
            res.json({ success: true, ...result });
        } catch (error: any) {
            res.status(400).json({ success: false, message: error.message });
        }
    },

    getMeals: async (req: Request, res: Response) => {
        try {
            const providerId = req.user!.id;
            const meals = await providerMealService.getProviderMeals(providerId);
            res.json({ success: true, count: meals.length, meals });
        } catch (error: any) {
            res.status(400).json({ success: false, message: error.message });
        }
    },
};
