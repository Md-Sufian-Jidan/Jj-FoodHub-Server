import { prisma } from "../../lib/prisma";

const getAllUsers = async () => {
    return prisma.user.findMany({
        select: {
            id: true,
            name: true,
            email: true,
            role: true,
            status: true,
            createdAt: true,
            updatedAt: true,
        },
        orderBy: { createdAt: "desc" },
    });
}

const updateUserStatus = async (userId: string, status: "ACTIVE" | "BANNED") => {
    const user = await prisma.user.update({
        where: { id: userId },
        data: { status },
        select: { id: true, name: true, email: true, status: true, role: true },
    });
    return user;
}

// Orders
const getAllOrders = async () => {
    return prisma.order.findMany({
        include: {
            items: { include: { meal: true } },
            user: true,
            provider: { include: { user: true } },
        },
        orderBy: { createdAt: "desc" },
    });
}

// Categories
const createCategory = async (name: string, image?: string) => {
    const existing = await prisma.category.findUnique({ where: { name } });
    if (existing) throw new Error("Category already exists");

    return prisma.category.create({ data: { name, image } });
}

const updateCategory = async (categoryId: string, name?: string, image?: string) => {
    return prisma.category.update({
        where: { id: categoryId },
        data: { ...(name && { name }), ...(image && { image }) },
    });
}

const deleteCategory = async (categoryId: string) => {
    return prisma.category.delete({ where: { id: categoryId } });
}

export const adminService = {
    getAllUsers,
    updateUserStatus,
    getAllOrders,
    createCategory,
    updateCategory,
    deleteCategory
};
