import { Request, Response } from "express";
import { profileService } from "./profile.service";

const getProfile = async (req: Request, res: Response) => {
    try {
        const userId = req.user!.id;
        const profile = await profileService.getProfile(userId);
        res.json({ success: true, profile });
    } catch (error: any) {
        res.status(404).json({ success: false, message: error.message });
    }
}

const updateProfile = async (req: Request, res: Response) => {
    try {
        const userId = req.user!.id;
        const data = req.body;
        const updatedProfile = await profileService.updateProfile(userId, data);
        res.json({ success: true, message: "Profile updated successfully", profile: updatedProfile });
    } catch (error: any) {
        res.status(400).json({ success: false, message: error.message });
    }
}

export const profileController = {
    getProfile,
    updateProfile
};
