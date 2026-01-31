import express from "express";
import auth, { UserRole } from "../../middlewares/auth";
import { reviewController } from "./review.controller";

const router = express.Router();


router.use(auth(UserRole.CUSTOMER));

router.post("/", reviewController.createReview);
router.get("/meal/:mealId", reviewController.getReviewsByMeal);
router.get("/user", reviewController.getReviewsByUser);

export const reviewRouter = router;