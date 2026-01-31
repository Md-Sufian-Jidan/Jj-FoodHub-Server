import express from "express";
import auth, { UserRole } from "../../middlewares/auth";
import { providerMealController } from "./providerMeal.controller";

const router = express.Router();

router.post("/", auth(UserRole.PROVIDER), providerMealController.createMeal);
router.get("/", auth(UserRole.PROVIDER), providerMealController.getMeals);
router.patch("/:id", auth(UserRole.PROVIDER), providerMealController.updateMeal);
router.delete("/:id", auth(UserRole.PROVIDER), providerMealController.deleteMeal);

export const providerMealRouter = router;
