import { prisma } from "../../lib/prisma";

interface UpdateProfileData {
    name?: string;
    email?: string;
    image?: string;
}

const getProfile = async (userId: string) => {
    const user = await prisma.user.findUnique({
        where: { id: userId },
        select: {
            id: true,
            name: true,
            email: true,
            image: true,
            role: true,
            status: true,
            createdAt: true,
            updatedAt: true,
        },
    });

    if (!user) {
        throw new Error("User not found");
    }

    return user;
}

const updateProfile = async (userId: string, data: UpdateProfileData) => {
    // Optional: check if email is being updated and unique
    if (data.email) {
        const existingUser = await prisma.user.findUnique({
            where: { email: data.email },
        });
        if (existingUser && existingUser.id !== userId) {
            throw new Error("Email is already in use");
        }
    }

    const updatedUser = await prisma.user.update({
        where: { id: userId },
        data: {
            name: data.name,
            email: data.email,
            image: data.image,
        },
        select: {
            id: true,
            name: true,
            email: true,
            image: true,
            role: true,
            status: true,
            updatedAt: true,
        },
    });

    return updatedUser;
}
export const profileService = {
    getProfile,
    updateProfile
};
