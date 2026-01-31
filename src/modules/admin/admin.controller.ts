import { adminService } from "./admin.service";

const getAllMeals = async (req: Request, res: Response) => {
    try {
        const result = await adminService.getAllUsers();

        return res.status(200).json({
            success: true,
            message: "All users retrieved successfully",
            count: result.length,
            data: result,
        });
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: "Failed to fetch meals",
            error: error.message,
        });
    }
};

export const adminController = {
    getAllMeals
}