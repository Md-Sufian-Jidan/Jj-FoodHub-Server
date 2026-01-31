import { Router } from "express";
import { mealRouter } from "../meal/meal.route";
import { categoryRouter } from "../category/category.route";
import { cartRouter } from "../cart/cart.route";
import { orderRouter } from "../order/order.route";
import { profileRouter } from "../customer/profile.route";
const router = Router();


router.use("/meals", mealRouter);
router.use('/category', categoryRouter);
router.use("/cart", cartRouter);
router.use("/orders", orderRouter);
router.use("/profile", profileRouter);

export default router;
