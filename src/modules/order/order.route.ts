import express from "express";
import auth, { UserRole } from "../../middlewares/auth";
import { orderController } from "./order.controller";

const router = express.Router();

router.post("/", auth(UserRole.CUSTOMER), orderController.checkout);
router.get("/", auth(UserRole.CUSTOMER), orderController.getOrders);
router.get("/:id", auth(UserRole.CUSTOMER), orderController.getOrderDetails);

export const orderRouter = router;
