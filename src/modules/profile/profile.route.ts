import express from "express";
import auth, { UserRole } from "../../middlewares/auth";
import { profileController } from "./profile.controller";

const router = express.Router();

router.get("/", auth(UserRole.CUSTOMER), profileController.getProfile);
router.patch("/", auth(UserRole.CUSTOMER), profileController.updateProfile);

export const profileRouter = router;
