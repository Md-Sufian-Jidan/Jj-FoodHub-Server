import express from "express"
import { mealController } from "./meal.controller";
import auth, { UserRole } from "../../middlewares/auth";

const router = express.Router();

router.post(
    '/create-meal',
    auth(UserRole.ADMIN, UserRole.PROVIDER),
    mealController.createMeal
);

router.get(
    '/get-all-meals',
    mealController.getAllMeals
);

export const mealRouter = router;