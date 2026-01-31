import express from "express";
import auth, { UserRole } from "../../middlewares/auth";
import { cartController } from "./cart.controller";

const router = express.Router();

router.get("/", auth(UserRole.CUSTOMER), cartController.getCart);
router.post("/", auth(UserRole.CUSTOMER), cartController.addToCart);
router.put("/:cartItemId", auth(UserRole.CUSTOMER), cartController.updateCartItem);
router.delete("/:cartItemId", auth(UserRole.CUSTOMER), cartController.removeCartItem);

export const cartRouter = router;
