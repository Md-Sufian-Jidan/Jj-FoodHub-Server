import { Request, Response } from "express";
import { cartService } from "./cart.service";

const getCart = async (req: Request, res: Response) => {
    try {
        const cart = await cartService.getCart(req.user!.id);
        res.json({ success: true, cart });
    } catch (error: any) {
        res.status(500).json({ success: false, message: error.message });
    }
}

const addToCart = async (req: Request, res: Response) => {
    try {
        const { mealId, quantity } = req.body;
        if (!mealId || !quantity) {
            return res.status(400).json({ success: false, message: "mealId and quantity required" });
        }

        const cartItem = await cartService.addToCart(req.user!.id, { mealId, quantity });
        res.status(201).json({ success: true, message: "Added to cart", cartItem });
    } catch (error: any) {
        res.status(500).json({ success: false, message: error.message });
    }
}

const updateCartItem = async (req: Request, res: Response) => {
    try {
        const { cartItemId } = req.params;
        const { quantity } = req.body;

        const updatedItem = await cartService.updateCartItem(cartItemId as string, quantity);
        res.json({ success: true, message: "Cart updated", updatedItem });
    } catch (error: any) {
        res.status(500).json({ success: false, message: error.message });
    }
}

const removeCartItem = async (req: Request, res: Response) => {
    try {
        const { cartItemId } = req.params;
        await cartService.removeCartItem(cartItemId as string);
        res.json({ success: true, message: "Item removed from cart" });
    } catch (error: any) {
        res.status(500).json({ success: false, message: error.message });
    }
}
export const cartController = {
    addToCart,
    getCart,
    updateCartItem,
    removeCartItem
};
