import { Request, Response } from "express";
import { providerService } from "./provider.service";

const getOrders = async (req: Request, res: Response) => {
    try {
        const providerId = req.user!.id;
        const orders = await providerService.getProviderOrders(providerId);
        res.json({ success: true, count: orders.length, orders });
    } catch (error: any) {
        res.status(500).json({ success: false, message: error.message });
    }
}

const getOrderDetails = async (req: Request, res: Response) => {
    try {
        const providerId = req.user!.id;
        const { id: orderId } = req.params;
        const order = await providerService.getOrderDetails(providerId, orderId as string);
        res.json({ success: true, order });
    } catch (error: any) {
        res.status(404).json({ success: false, message: error.message });
    }
}

const updateOrderStatus = async (req: Request, res: Response) => {
    try {
        const providerId = req.user!.id;
        const { id: orderId } = req.params;
        const { status } = req.body;

        if (!status) {
            return res.status(400).json({ success: false, message: "Status is required" });
        }

        const updatedOrder = await providerService.updateOrderStatus(providerId, orderId as string, status);
        res.json({ success: true, message: "Order status updated", order: updatedOrder });
    } catch (error: any) {
        res.status(400).json({ success: false, message: error.message });
    }
}

export const providerController = {
    getOrders,
    getOrderDetails,
    updateOrderStatus
};
