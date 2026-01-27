import { prisma } from "../lib/prisma";
import { UserRole } from "../middlewares/auth";

const APP_URL = process.env.APP_URL;

async function seedAdmin() {
    try {
        const adminData = {
            name: "Super Admin 1",
            email: "superadmin@gmail.com",
            password: "superadmin123$",
            role: UserRole.ADMIN
        };

        const existingUser = await prisma.user.findUnique({
            where: { email: adminData.email }
        });

        if (existingUser) {
            console.log("⏩ Admin already exists. Skipping...");
            return;
        }

        const signUpAdmin = await fetch(`${APP_URL}/api/auth/sign-up/email`, {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(adminData)
        });

        if (signUpAdmin.ok) {
            await prisma.user.update({
                where: { email: adminData.email },
                data: {
                    emailVerified: true,
                }
            });
            console.log("✅ Super Admin created and verified successfully.");
        } else {
            const errorData = await signUpAdmin.json();
            console.error("❌ Sign up failed:", errorData);
        }

    } catch (error) {
        console.error("🚨 Seeding error:", error);
    }
}

seedAdmin();