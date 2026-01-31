import { prisma } from "../../lib/prisma";

const getProviderOrders = async (providerId: string) => {
    return prisma.order.findMany({
        where: { providerId },
        orderBy: { createdAt: "desc" },
        include: {
            items: { include: { meal: true } },
            user: true,
        },
    });
}

// Get a single order by id (only if belongs to this provider)
const getOrderDetails = async (providerId: string, orderId: string) => {
    const order = await prisma.order.findFirst({
        where: { id: orderId, providerId },
        include: { items: { include: { meal: true } }, user: true },
    });

    if (!order) throw new Error("Order not found");

    return order;
}

// Update order status
const updateOrderStatus = async (providerId: string, orderId: string, status: string) => {
    const order = await prisma.order.findFirst({
        where: { id: orderId, providerId },
    });

    if (!order) throw new Error("Order not found");

    const updatedOrder = await prisma.order.update({
        where: { id: orderId },
        data: { status},
    });

    return updatedOrder;
}

export const providerService = {
    getProviderOrders,
    getOrderDetails,
    updateOrderStatus

};
