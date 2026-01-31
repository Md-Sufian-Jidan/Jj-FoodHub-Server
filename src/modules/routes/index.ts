import { Router } from "express";
import { mealRouter } from "../meal/meal.route";
import { categoryRouter } from "../category/category.route";
import { cartRouter } from "../cart/cart.route";
import { orderRouter } from "../order/order.route";
import { profileRouter } from "../customer/profile.route";
import { reviewRouter } from "../customer/review.route";
import { providerMealRouter } from "../provider/providerMeal.route";

const router = Router();

router.use("/meals", mealRouter);
router.use('/category', categoryRouter);
router.use("/cart", cartRouter);
router.use("/orders", orderRouter);
router.use("/profile", profileRouter);
router.use("/api/reviews", reviewRouter);
router.use("/provider/meals", providerMealRouter);


export default router;
