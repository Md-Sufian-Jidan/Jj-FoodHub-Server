import express from "express";
import auth, { UserRole } from "../../middlewares/auth";
import { providerController } from "./provider.controller";

const router = express.Router();

router.get("/orders", auth(UserRole.PROVIDER), providerController.getOrders);
router.get("/orders/:id", auth(UserRole.PROVIDER), providerController.getOrderDetails);
router.patch("/orders/:id", auth(UserRole.PROVIDER), providerController.updateOrderStatus);

export const providerRouter = router;
