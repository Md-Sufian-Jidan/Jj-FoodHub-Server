import { prisma } from "../../lib/prisma";

interface CheckoutData {
    address: string;
}

const createOrder = async (userId: string, data: CheckoutData) => {
    const cart = await prisma.cart.findUnique({
        where: { userId },
        include: { items: { include: { meal: true } } },
    });

    if (!cart || cart.items.length === 0) {
        throw new Error("Cart is empty, cannot place order");
    }

    const providerIds = new Set(cart.items.map(item => item.meal.providerId));
    if (providerIds.size > 1) {
        throw new Error("All items in a single order must be from the same provider");
    }
    const providerId = cart.items[0].meal.providerId;

    const totalAmount = cart.items.reduce(
        (sum, item) => sum + Number(item.meal.price) * item.quantity,
        0
    );

    const order = await prisma.order.create({
        data: {
            userId,
            providerId,
            address: data.address,
            totalAmount,
            status: "PENDING",
            items: {
                create: cart.items.map(item => ({
                    mealId: item.mealId,
                    quantity: item.quantity,
                    price: item.meal.price,
                })),
            },
        },
        include: { items: { include: { meal: true } }, provider: true },
    });

    await prisma.cartItem.deleteMany({ where: { cartId: cart.id } });
    return order;
}

const getUserOrders = async (userId: string) => {
    return prisma.order.findMany({
        where: { userId },
        orderBy: { createdAt: "desc" },
        include: { items: { include: { meal: true } }, provider: true },
    });
}

const getOrderDetails = async (orderId: string, userId: string) => {
    const order = await prisma.order.findFirst({
        where: { id: orderId, userId },
        include: { items: { include: { meal: true } }, provider: true },
    });
    if (!order) {
        throw new Error("Order not found");
    }
    return order;
}

export const orderService = {
    createOrder,
    getUserOrders,
    getOrderDetails
};
