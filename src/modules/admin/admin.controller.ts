import { Request, Response } from "express";
import { adminService } from "./admin.service";

const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await adminService.getAllUsers();
        res.json({ success: true, count: users.length, users });
    } catch (error: any) {
        res.status(500).json({ success: false, message: error.message });
    }
}

const updateUserStatus = async (req: Request, res: Response) => {
    try {
        const { id: userId } = req.params;
        const { status } = req.body;
        if (!status) return res.status(400).json({ success: false, message: "Status is required" });

        const updatedUser = await adminService.updateUserStatus(userId as string, status);
        res.json({ success: true, message: "User status updated", user: updatedUser });
    } catch (error: any) {
        res.status(400).json({ success: false, message: error.message });
    }
}

// Orders
const getAllOrders = async (req: Request, res: Response) => {
    try {
        const orders = await adminService.getAllOrders();
        res.json({ success: true, count: orders.length, orders });
    } catch (error: any) {
        res.status(500).json({ success: false, message: error.message });
    }
}

// Categories
const createCategory = async (req: Request, res: Response) => {
    try {
        const { name, image } = req.body;
        if (!name) return res.status(400).json({ success: false, message: "Name is required" });

        const category = await adminService.createCategory(name, image);
        res.status(201).json({ success: true, message: "Category created", category });
    } catch (error: any) {
        res.status(400).json({ success: false, message: error.message });
    }
}

const updateCategory = async (req: Request, res: Response) => {
    try {
        const { id: categoryId } = req.params;
        const { name, image } = req.body;

        const updated = await adminService.updateCategory(categoryId as string, name, image);
        res.json({ success: true, message: "Category updated", category: updated });
    } catch (error: any) {
        res.status(400).json({ success: false, message: error.message });
    }
}

const deleteCategory = async (req: Request, res: Response) => {
    try {
        const { id: categoryId } = req.params;
        await adminService.deleteCategory(categoryId as string);
        res.json({ success: true, message: "Category deleted" });
    } catch (error: any) {
        res.status(400).json({ success: false, message: error.message });
    }
}

export const adminController = {
    getAllUsers,
    updateUserStatus,
    getAllOrders,
    createCategory,
    updateCategory,
    deleteCategory

};
