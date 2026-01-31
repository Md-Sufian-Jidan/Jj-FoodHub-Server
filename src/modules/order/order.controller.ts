import { Request, Response } from "express";
import { orderService } from "./order.service";

const checkout = async (req: Request, res: Response) => {
    try {
        const userId = req.user!.id;
        const { address } = req.body;
        if (!address) {
            return res.status(400).json({ success: false, message: "Delivery address required" });
        }

        const order = await orderService.createOrder(userId, { address });
        res.status(201).json({ success: true, message: "Order placed successfully!", order });
    } catch (error: any) {
        res.status(500).json({ success: false, message: error.message });
    }
}

const getOrders = async (req: Request, res: Response) => {
    try {
        const userId = req.user!.id;
        const orders = await orderService.getUserOrders(userId);
        res.json({ success: true, count: orders.length, orders });
    } catch (error: any) {
        res.status(500).json({ success: false, message: error.message });
    }
}

const getOrderDetails = async (req: Request, res: Response) => {
    try {
        const userId = req.user!.id;
        const { id: orderId } = req.params;
        const order = await orderService.getOrderDetails(orderId as string, userId);
        res.json({ success: true, order });
    } catch (error: any) {
        res.status(404).json({ success: false, message: error.message });
    }
}

export const orderController = {
    checkout, getOrders, getOrderDetails
};
