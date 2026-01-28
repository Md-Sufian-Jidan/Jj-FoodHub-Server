import { NextFunction, Request, Response } from "express";
import { auth as betterAuth } from '../lib/auth'

export enum UserRole {
    CUSTOMER = "CUSTOMER",
    PROVIDER = "PROVIDER",
    ADMIN = "ADMIN"
};

declare global {
    namespace Express {
        interface Request {
            user?: {
                id: string;
                email: string;
                name: string;
                role: string;
                emailVerified: boolean;
            }
        }
    }
}

const auth = (...roles: UserRole[]) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {

            const session = await betterAuth.api.getSession({
                headers: req.headers as any
            });

            if (!session) {
                return res.status(401).json({
                    success: false,
                    message: "Unauthorized"
                })
            }

            if (!session.user.emailVerified) {
                return res.status(403).json({
                    success: false,
                    message: "Email is not verified!!!. Please verify your email"
                })
            }

            req.user = {
                id: session.user.id,
                name: session.user.name,
                email: session.user.email,
                role: session.user.role as string,
                emailVerified: session.user.emailVerified
            }

            if (!roles.length && !roles.includes(req.user.role as UserRole)) {

                return res.status(403).json({
                    success: false,
                    message: "Forbidden!!!"
                })
            }

            next()

        } catch (error: any) {
            return res.status(error.status || 500).json({
                success: false,
                message: error.message || "Something went wrong while creating the meal.",
                error: error,
            });
        }
    }
};

export default auth;