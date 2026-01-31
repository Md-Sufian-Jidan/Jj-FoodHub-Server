import { Router } from "express";
import auth, { UserRole } from "../../middlewares/auth";
// import { createOrder, getMyOrders } from "./order.controller";

const router = Router();

// router.post(
//     "/",
//     auth(UserRole.CUSTOMER),
//     createOrder
// );

// router.get(
//     "/",
//     auth(UserRole.CUSTOMER),
//     getMyOrders
// );

export const orderRouter= router;
