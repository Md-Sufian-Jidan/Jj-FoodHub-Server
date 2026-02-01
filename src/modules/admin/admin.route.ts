import express from "express";
import auth, { UserRole } from "../../middlewares/auth";
import { adminController } from "./admin.controller";

const router = express.Router();

// Users
router.get("/users", auth(UserRole.ADMIN), adminController.getAllUsers);
router.patch("/users/:id", auth(UserRole.ADMIN), adminController.updateUserStatus);

// Orders
router.get("/orders", auth(UserRole.ADMIN), adminController.getAllOrders);

// Categories
router.get("/get-all-category", auth(UserRole.ADMIN), adminController.getAllCategories);
router.post("/categories", auth(UserRole.ADMIN), adminController.createCategory);
router.patch("/categories/:id", auth(UserRole.ADMIN), adminController.updateCategory);
router.delete("/categories/:id", auth(UserRole.ADMIN), adminController.deleteCategory);

export const adminRouter = router;
