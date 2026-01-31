import { prisma } from "../../lib/prisma";

interface AddCartItemData {
    mealId: string;
    quantity: number;
}

const getCart = async (userId: string) => {
    return prisma.cart.findUnique({
        where: { userId },
        include: { items: { include: { meal: true } } },
    });
}

const addToCart = async (userId: string, data: AddCartItemData) => {
    let cart = await prisma.cart.findUnique({ where: { userId } });
    if (!cart) {
        cart = await prisma.cart.create({ data: { userId } });
    }
    const existingItem = await prisma.cartItem.findUnique({
        where: { cartId_mealId: { cartId: cart.id, mealId: data.mealId } },
    });

    if (existingItem) {
        return prisma.cartItem.update({
            where: { id: existingItem.id },
            data: { quantity: existingItem.quantity + data.quantity },
        });
    } else {
        return prisma.cartItem.create({
            data: {
                cartId: cart.id,
                mealId: data.mealId,
                quantity: data.quantity,
            },
        });
    }
}

const updateCartItem = async (cartItemId: string, quantity: number) => {
    return prisma.cartItem.update({
        where: { id: cartItemId },
        data: { quantity },
    });
}

const removeCartItem = async (cartItemId: string) => {
    return prisma.cartItem.delete({ where: { id: cartItemId } });
}

export const cartService = {
    getCart,
    addToCart,
    updateCartItem,
    removeCartItem
};
